const { remote } = require('electron');

// Function to handle the form submission
function handleStudentFormSubmission() {
    const form = document.getElementById("newStudent");

    form.addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent the default form submission behavior

        const formData = new FormData(e.target);
        const imageInput = e.target.querySelector('input[name="image"]');

        if (imageInput && imageInput.files && imageInput.files[0]) {
            const imageFile = imageInput.files[0];
            const student = {
                name: formData.get("name"),
                class: formData.get("class"),
                gender: formData.get("gender"),
                image: imageFile.path,  // Get the full path if a file was selected
            };
            console.log('Student Data:', student);
        } else {
            console.log('No image file selected');
        }
    });
}

// Expose the function so it can be used elsewhere
module.exports = {
    handleStudentFormSubmission
};
