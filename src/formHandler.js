// add new class
document.getElementById("newClass").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const new_class = formData.get("class");
  e.target.reset();
  if (insertClass(new_class) == undefined) {
    Toastify({
      text: "Class added successfully",
      className: "info",
      style: {
        background: "lime",
        color: "black",
      },
    }).showToast();
  }
  // console.log(new_class);
});

// insert new student
document.getElementById("newStudent").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const reader = new FileReader();
  reader.readAsDataURL(formData.get("image"));
  reader.onload = async (e) => {
    const image_base64 = e.target.result;

    let extension = image_base64.split("/")[1];
    extension = extension.split(";")[0];

    const fileName = `${formData.get("name")}.${extension}`;
    // const filePath = path.join(__dirname, 'students', fileName);
    if (!fs.existsSync(__dirname + "/students/" + current_class)) {
      fs.mkdirSync(__dirname + "/students/" + current_class);
      // console.log('file does not exist');
    }
    const filePath = path.join(__dirname, "students", current_class, fileName);

    const base64Data = image_base64.replace(
      /data:(image\/[a-zA-Z]+);base64/,
      ""
    );
    // console.log(base64Data);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
      if (err) {
        console.log("Error writing file:");
      } else {
        const student = {
          name: formData.get("name"),
          class: current_class,
          gender: formData.get("gender"),
          image: filePath,
        };
        insertCardData(student);
      }
    });
  };
  e.target.reset();
});

// update student
function updateStudent(id, name, std_class, gender) {
  // let new_std_name = prompt("Name: "+name);
  // let new_std_class = prompt("Student Class: "+std_class);
  // let new_gender = prompt("Gender: "+gender);
  const modalHTML = `
        <div id="upd_modal" class="modal fixed inset-0 p-4 flex flex-col flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div class="relative w-full max-w-lg px-8 py-6 bg-white shadow-lg rounded-3xl">
        <div class="flex items-start">
        <div class="flex-1">
        <h3 class="text-2xl font-bold text-gray-800">Update student name</h3>
        </div>
        </div>
        
        <form id="updateStudent" class="flex flex-col flex-wrap gap-4 mt-6" id="newStudent" method="POST">
        <div class="flex flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus-within:border-blue-600 min-w-[220px]">
        <input type="text" name="name" id='updName' value='${name}' placeholder="Student Name" class="w-full text-sm text-gray-500 bg-transparent outline-none" />
          </div>
          
          <div class="hidden flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus-within:border-blue-600 min-w-[220px]">
          <input type="text" name="gender" id='updGender' value='${gender}' placeholder="Student Gender" class="w-full text-sm text-gray-500 bg-transparent outline-none" />
          </div>

          
          <button type="button" onclick="updStudent(${id}, document.getElementById('updName'), document.getElementById('updGender'))" class="px-5 py-2.5 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"> Update </button>
          <button onclick="document.getElementById('upd_modal').remove()" type="button" class="px-5 py-2.5 rounded-lg text-sm tracking-wide text-black border border-blue-600"> Cancel </button>
          </form>
      </div>
      </div>
      `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function updStudent(id, name, gender) {
  const student = {
    name: name.value,
    gender: gender.value,
  };

  updateStudentCard(id, student);
  // console.log(id);
  document.getElementById("upd_modal").remove();
}

// filter table
function filterTable(set_class) {
  current_class = set_class;
  fetchStudents(current_class);
  document.getElementById("form-class").innerText = current_class;
  // console.log(current_class);
}

//////////////////////// bulky dude //////////////////////////////////
document
  .getElementById("bulky_modal")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const final_cards = [];

    const progressBar = document.getElementById("progress");
    const submitButton = document.getElementById("submit");
    const fileInput = document.getElementById("file-input");

    const formData = new FormData(e.target);
    const bulky_students = formData.getAll("images");

    // Function to read a file and return a promise
    function readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    }

    function updateProgress(current, total) {
      const percentage = (current / total) * 100;
      progressBar.style.width = percentage + "%";
    }

    submitButton.disabled = true;
    submitButton.innerText = "Loading...";
    submitButton.style.background = "gray";

    async function processFile(student) {
      const result = await readFile(student);

      const std_name = student.name.split(".")[0];
      // console.log(result);

      // mi code
      const image_base64 = result;

      let extension = image_base64.split("/")[1];
      extension = extension.split(";")[0];

      const fileName = std_name + "." + extension;
      if (!fs.existsSync(__dirname + "/students/" + current_class)) {
        fs.mkdirSync(__dirname + "/students/" + current_class);
        // console.log('file does not exist');
      }
      const filePath = path.join(
        __dirname,
        "students",
        current_class,
        fileName
      );

      const base64Data = image_base64.replace(
        /data:(image\/[a-zA-Z]+);base64/,
        ""
      );
      // // console.log(base64Data);

      fs.writeFile(filePath, base64Data, "base64", async (err) => {
        if (err) {
          console.log("Error writing file:");
        } else {
          let card_obj = {
            name: std_name,
            class: current_class,
            gender: "Male",
            image: filePath,
          };

          final_cards.push(card_obj);
        }
      });
      // mi code

      updateProgress(
        bulky_students.indexOf(student) + 1,
        bulky_students.length
      );
    }

    // Process each file one by one
    try {
      for (let i = 0; i < bulky_students.length; i++) {
        const student = bulky_students[i];
        const result = await readFile(student);

        // bulky_cards.push(card_obj);
        await processFile(bulky_students[i]);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    } finally {
      // console.log(final_cards);
      insertAll();
      submitButton.disabled = false;
      submitButton.innerText = "Publish all";
      submitButton.style.background = "rgb(37, 99, 235)";
      fileInput.children[2].value = "";
      document.getElementById("ready").style.display = "none";
      fileInput.style.display = "flex";
    }
    async function insertAll() {
      // console.log('Inserted all');
      await bulkyInsertCardData(final_cards);
    }
  });

function updateInterf() {
  document.getElementById("file-input").style.display = "none";
  document.getElementById("ready").style.display = "";
}

// updating total students count
document.getElementById("totalStudentsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());
  if (isNaN(formObject.totalStudents)) {
    console.log("Enter a number");
  } else {
    updateTotalStudents(formObject.totalStudents);
  }
});

// Update user password
document
  .getElementById("passwordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    const oldPassword = formObject.oldPswd;
    const newPassword = formObject.newPswd;

    if (await bcrypt.compare(oldPassword, old)) {
      updatePassword(newPassword);
      console.log("Password updated successfully");
    } else {
      console.log("Incorrect old password");
    }
  });

// update academic year
document.getElementById("academicForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  // console.log("Enter a number");
  updateAcademicYear(formObject.academic);
});
