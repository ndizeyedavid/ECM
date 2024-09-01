const { remote } = require("electron");
const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
const html2canvas = require("html2canvas");
const QRCode = require("qrcode");

const url = window.location.href;
let current_class = url.split("?")[1].split("=")[1];
current_class = current_class.replace("%20", " ");
document.getElementById("cur-class").innerText = current_class;

// download link
document.getElementById("download-link").download = current_class + ".pdf";
document.getElementById("download-link").href =
  __dirname + "./cards/" + current_class + ".pdf";
// console.log(current_class);

// fetch all students cards
function fetchCards(curr_class) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "../tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    const card_data = parsedData[2].cards;
    for (let i = 0; i < card_data.length; i++) {
      const card = card_data[i];
      if (card.class == curr_class) {
        let division = "A'LEVEL";
        if (card.class == "S1" || card.class == "S2" || card.class == "S3") {
          division = "O'LEVEL";
        }
        document.getElementById("cards").innerHTML += ` 
        <div class="std-card">
        <div class="header">
          <img src="./header.png" alt="" />
        </div>

        <div class="card-details">
          <div class="img-container">
            <img src="${card.image}" alt="" />
          </div>
          <div class="img-ribbon">
            <div class="side"></div>
            <img src="./title.png" alt="" />
          </div>

          <div class="info">
            <table>
              <tr style="height: 50px">
                <td style="width: 30px">NAME</td>
                <td>:</td>
                <td style="width: 100%; padding-left: 10px">${card.name}</td>
              </tr>

              <tr style="height: 50px">
                <td>CLASS</td>
                <td>:</td>
                <td style="width: 100%; padding-left: 10px">${card.class}</td>
              </tr>

              <tr style="height: 50px">
                <td>DIVISION</td>
                <td>:</td>
                <td style="width: 100%; padding-left: 10px">${division}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="qr">
              <img src="./qr.webp" id="std-${i}" alt="qr-code">
              <img src="./logo.png" class="logo" alt="logo">
          </div>

        <div class="footer">
          <img src="./footer.png" alt="" />
          <p class="year">${parsedData[0].year}</p>
        </div>
      </div>
      `;

        var txt = `This card is issued to ${card.name} an ${division} student from ESSA Nyarugunga in ${card.class}. If lost, please return it to the school administration or contact the number behind`;
        QRCode.toDataURL(txt, function (error, url) {
          document.getElementById("std-" + i).src = url;
        });
      }
    }
    document.getElementById("cards").innerHTML += `
      <div class="std-card">
          <div class="header">
              <img src="./header-back.png" alt="" />
          </div>

          <div class="card-details" style="height: 420px; left: 0;z-index: 999999999999999999; position: relative;">
              <div style="width: 100%; height: 100%; background-image: url('./logo.png'); background-position: 250px; background-repeat: no-repeat; background-size: contain; position: absolute; top: 0; opacity: 0.3; transform: translate(0%, -20%);"></div>
              <div style="margin: 50px;">
                  <h3 style="font-size: 30px; font-weight: 900; color: #04496b;">TERMS & CONDITION</h3>
                  <ul
                      style="color: #04496b;list-style-position: inside; margin-left: 30px; margin-top: 10px; font-size: 20px; font-weight: 500; display: flex; flex-direction: column; gap: 10px; width: 80%;">
                      <li>The student card is intended for the exclusive use of the named cardholder and is
                          non-transferable. Any unauthorised use or sharing of the card is strictly prohibited.</li>
                      <li>In case of loss or theft of the student card, the cardholder must report it immediately to
                          the relevant authorities or the issuing institution to prevent unauthorized usage.</li>
                      <li>The student card grants access to specific facilities or services as per the institution's
                          policies. Any misuse of access may result in disciplinary actions.</li>
                  </ul>
              </div>
              <h3 style="margin-top: 90px; margin-left: 70px;font-size: 18px; font-weight: 900; color: #04496b;">HEAD
                  TEACHER'S
                  SIGNATURE & STAMP</h3>
          </div>

          <div class="footer" style="right: 400px;">
              <img src="./footer-back.png" alt="" />
          </div>
      </div>
      `;
  });
}

fetchCards(current_class);

async function saveAll() {
  const doc = new jsPDF({
    orientation: "landscape", // Or "portrait" if preferred
  });
  // const pdfPath = path.join(__dirname, "./card.pdf");

  let totalElements = document.getElementById("cards").children.length;

  const pdfPath = path.join(__dirname, "./cards/" + current_class + ".pdf");
  const progress = document.getElementById("pdfProgress");

  let currentElement = 0;
  try {
    // 1. Get the HTML content to convert (array of elements)
    const htmlElements = Array.from(document.getElementById("cards").children);

    // console.log(htmlElements);

    // 2. Iterate through each HTML element and create a new page for each
    for (const htmlElement of htmlElements) {
      const htmlContent = htmlElement.outerHTML;
      // console.log(htmlContent);

      // 3. Use html2canvas to convert HTML to an image (canvas)
      const canvas = await html2canvas(htmlElement, {
        backgroundColor: "#f8f8f8",
        scale: 1.05,
        logging: false,
        useCORS: true,
        imageSmoothingEnabled: false,
      });

      // 4. Add the image to a new page, preserving layout and formatting
      doc.addPage();

      const imageData = canvas
        .getContext("2d")
        .getImageData(0, 0, canvas.width, canvas.height);
      doc.addImage(imageData, "PNG", 0, 0);

      console.log(imageData);

      currentElement++;
      progress.value = Math.round((currentElement / totalElements) * 100);
    }
    doc.addPage();
    // doc.addImage(, 'png', 0, 0);
    // 5. Save the PDF with multiple pages
    doc.save(pdfPath);
    console.log("PDF created successfully!");
  } catch (error) {
    console.error("Error creating PDF:", error);
  }
}
