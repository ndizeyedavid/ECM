const { log } = require("console");
const { remote } = require("electron");
const fs = require("fs");
const path = require("path");
const Toastify = require("toastify-js");
const bcrypt = require("bcrypt");
// import "toastify-js/src/toastify.css"

let current_class = "S1";
let old = "";

function logThis(msg) {
  // console.log("working");

  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const class_data = parsedData[3].logs;
    class_data.push(msg);

    // console.log(parsedData);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getLogs();
      }
    });
  });
}

function getCardDataTable() {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    const card_data = parsedData[2].cards;
    for (let i = 0; i < card_data.length; i++) {
      const card = card_data[i];
      document.getElementById(
        "cards"
      ).innerHTML += ` <tr> <td> <img src="${card.image}" style='width: 90px; height: 90px; object-fit: cover;' alt="Image 1" class="img-thumbnail" /> </td> <td>${card.name}</td> <td>${card.class}</td> <td>${card.gender}</td> </tr>`;
    }
  });
}

function analytics() {
  document.getElementById("students-out").innerHTML = "";
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    // console.log(parsedData);

    document.getElementById("analytics-students").innerHTML =
      parsedData[0].total;
    document.getElementById("analytics-cards").innerHTML =
      parsedData[2].cards.length;
    document.getElementById("analytics-finish").innerHTML =
      Math.floor((parsedData[2].cards.length * 100) / 920) + "%";
    document.getElementById("analytics-classes").innerHTML =
      parsedData[1].classes.length;

    document.getElementById("recentActivity").innerHTML =
      parsedData[3].logs[parsedData[3].logs.length - 1];

    document.getElementById("year").value = parsedData[0].year;
    document.getElementById("totStd").value = parsedData[0].total;
    old = parsedData[0].pswd;
  });
}

analytics();

function getClasses() {
  document.getElementById("class-out").innerHTML = "";
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const classess = parsedData[1].classes;
    for (let i = 0; i < classess.length; i++) {
      var count = i + 1;
      document.getElementById("class-out").innerHTML += `
      <tr class="hover:bg-gray-50"> <td class="p-4 text-[15px] text-gray-800 w-3"> ${count} </td> <td class="p-4 text-[15px] text-gray-800 w-80"> ${classess[i]} </td> <td class="w-4 p-4"> <button class="mr-4" title="Delete" onclick="deleteClass(${i})"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24"> <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" /> <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" /> </svg> </button> </td> </tr>
      `;
      document.getElementById("classes-select").innerHTML += `
      <option value="${classess[i]}">${classess[i]}</option>
      `;
    }
  });
}

getClasses();

function insertClass(newClass) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const class_data = parsedData[1].classes;
    class_data.push(newClass);

    // console.log(parsedData);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getClasses();
        logThis("New class was created: " + newClass);
      }
    });
  });
}

function deleteClass(classId) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const class_data = parsedData[1].classes;
    class_data.splice(classId, 1);
    // console.log(class_data);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getClasses();
        logThis("A class was deleted id: " + classId);
      }
    });
  });
}

function insertCardData(std_data) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const card_data = parsedData[2].cards;
    card_data.push(std_data);

    // console.log(parsedData);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to tst.json:", err);
      } else {
        console.log("Student data saved successfully!");
        fetchStudents(current_class);
      }
    });
  });
}

function bulkyInsertCardData(std_data) {
  const directoryPath = __dirname;
  const filePath = path.join(directoryPath, "tst.json");

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let parsedData = JSON.parse(data);
        const card_data = parsedData[2].cards;
        const new_cards = [...card_data, ...std_data];
        parsedData[2].cards = new_cards;

        // console.log(parsedData);

        fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
            fetchStudents(current_class);
            logThis("Multiple students have inserted with bulky insert");
          }
        });
      }
    });
  });
}

function fetchStudents(current_class) {
  document.getElementById("students-out").innerHTML = "Loading students...";
  const directoryPath = __dirname;
  const filePath = path.join(directoryPath, "tst.json");

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const parsedData = JSON.parse(data);
        const students = parsedData[2].cards;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < students.length; i++) {
          if (current_class == students[i].class) {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-gray-50";

            const imageTd = document.createElement("td");
            imageTd.className = "p-4 text-[15px] text-gray-800";
            const imageImg = document.createElement("img");
            imageImg.src = students[i].image;
            imageImg.className = "object-cover w-20 h-20 rounded-full";
            imageTd.appendChild(imageImg);
            tr.appendChild(imageTd);

            const nameTd = document.createElement("td");
            nameTd.className = "p-4 text-[15px] text-gray-800";
            nameTd.textContent = students[i].name;
            tr.appendChild(nameTd);

            const classTd = document.createElement("td");
            classTd.className = "p-4 text-[15px] text-gray-800";
            classTd.textContent = students[i].class;
            tr.appendChild(classTd);

            const actionTd = document.createElement("td");
            actionTd.className = "px-4 py-4 text-sm text-gray-800";
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "mr-4 text-blue-600";
            editBtn.onclick = () =>
              updateStudent(
                i,
                students[i].name,
                students[i].class,
                students[i].gender
              );
            actionTd.appendChild(editBtn);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "text-red-600";
            deleteBtn.onclick = () => deleteStudent(i);
            actionTd.appendChild(deleteBtn);
            tr.appendChild(actionTd);

            fragment.appendChild(tr);
          }
        }

        document.getElementById("students-out").innerHTML = "";
        document.getElementById("students-out").appendChild(fragment);

        resolve();
      }
    });
  });
}

fetchStudents(current_class);

function deleteStudent(stdId) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const class_data = parsedData[2].cards;
    class_data.splice(stdId, 1);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        Toastify({
          text: "Error removing student data",
          className: "info",
          style: {
            background: "red",
            color: "white",
          },
        }).showToast();
      } else {
        fetchStudents(current_class);
        logThis("A student has been deleted id: " + stdId);
      }
    });
  });
}

function updateStudentCard(id, std_data) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const card_data = parsedData[2].cards[id];

    // update
    card_data.name = std_data.name;
    card_data.gender = std_data.gender;

    // console.log(parsedData);
    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to tst.json:", err);
      } else {
        console.log("Student data saved successfully!");
        fetchStudents(current_class);
      }
    });
  });
}

// fetch logs
function getLogs() {
  document.getElementById("logsOut").innerHTML = "";
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const logs = parsedData[3].logs.reverse();

    // console.log(logs);

    for (let i = 0; i < logs.length; i++) {
      // var count = i + 1;
      document.getElementById("logsOut").innerHTML += `
      <div class="p-4 text-gray-700 border-l-4 border-gray-500 bg-gray-50" role="alert">
          <p class="font-bold">${logs[i]}</p>
        </div>
      `;
    }
  });
}

getLogs();

function updateTotalStudents(count) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const total_data = (parsedData[0].total = count);
    // class_data.push(newClass);
    // console.log(parsedData);

    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getClasses();
        logThis("Total number of students updated");
      }
    });
  });
}

async function updatePassword(pswd) {
  pswd = await bcrypt.hash(pswd, 10);
  // console.log(pswd);

  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    const pswd_data = (parsedData[0].pswd = pswd);
    // class_data.push(newClass);
    // console.log(parsedData);

    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getClasses();
        logThis("Password Changed");
      }
    });
  });
}

function updateAcademicYear(year) {
  const directoryPath = __dirname;

  const filePath = path.join(directoryPath, "tst.json"); // Replace with the actual file name

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("An error occurred reading the file:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const year_data = (parsedData[0].year = year);
    // class_data.push(newClass);
    // console.log(parsedData);

    fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return false;
      } else {
        getClasses();
        logThis("Academic year Changed");
      }
    });
  });
}
