_This is version 1.0.0 of the project, more updates will be done soon_

# ESSA Student Cards Management System (ECM)

This project is a desktop application built with Electron Forge to manage student cards for ESSA Nyarugunga school. It offers a user-friendly interface to streamline the creation, editing, and printing of student cards.

## Features

- Create new student cards: Enter essential student information like name, ID number, and grade level to generate new cards.
- Edit existing cards: Easily modify student details on existing cards for accurate information management.
- Print student cards: Print high-quality student cards directly from the application for efficient card distribution.
- Import data: Select a folder containing students' images with there respective names to quickly create all of them at once (Bulky Add).

## Technologies

- Tailwind css: Wonder how the beatiful design was created? Yeah, Tailwind is behind that :)
- Electron: The standalone application feature and communication with the system architecture
- bcrypt: Password encrypting and hashing to secure login form, preventing unathorised creation of the cards
- qrcode: Individiual QR Code  for each student, each with a set of information store in it
- jspdf: The main library for creating PDF from the html structure of the student cards
- html2canvas: Before creating a PDF, this library first converts the html structure to an JPEG image with 75% compression for quality and optimised result

## Getting Started

Prerequisites:

- Node.js (version 14 or later): [https://nodejs.org/en](https://nodejs.org/en)
- npm (included with Node.js installation)

Installation:

1. Clone this repository:

   ```bash
   git clone https://github.com/ndizeyeDavid/ECM.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ECM
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm start
   ```

This will launch the ECM application in a development window. You can interact with the features and make changes to the code. To rebuild and restart in development mode:

## Building for Production

To create a production-ready executable for your specific operating system, use the following commands:

```bash
npx @electron/packager . ECM
```

## Contributing

I welcome contributions to this project! If you have any bug fixes, improvements, or new features, please consider creating a pull request. Before submitting a pull request, please ensure that your code adheres to the project's coding style and formatting guidelines (if any).

## License

This project is licensed under the [MIT License](https://github.com/user-attachments/files/16827411/license.txt).

## Contact

If you have any questions or suggestions, feel free to create an issue on this repository or contact davidndizeye101@gmail.com

## Known bug

When saving a pdf, i don't know how it's happening but a blank page is first created at the beginning of the pdf document. If you know how to correct that, please help. I would be grateful

## Screeshots
![Screenshot 2024-09-01 065300](https://github.com/user-attachments/assets/953a7225-a16c-46e4-ae28-6c4bec756fa8)
![Screenshot 2024-09-01 065335](https://github.com/user-attachments/assets/6f9af6f2-8d7a-4cd7-90b2-ae99145aa093)
![Screenshot 2024-09-01 065320](https://github.com/user-attachments/assets/08233b32-8dba-4eff-aacc-11d541d4afb8)
![Screenshot 2024-09-01 065444](https://github.com/user-attachments/assets/dbc64432-e7bf-4dc1-b5dc-9c1fa63989f1)
![Screenshot 2024-09-01 065421](https://github.com/user-attachments/assets/32b062f4-f985-417d-9765-9b4ef34b25fd)
![Screenshot 2024-09-01 065409](https://github.com/user-attachments/assets/7a134492-63cf-40a1-82ba-86a6f55127f5)
![Screenshot 2024-09-01 065357](https://github.com/user-attachments/assets/2a2f3286-b3dc-443c-af6e-8e793486cb10)
