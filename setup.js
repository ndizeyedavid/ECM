const electronInstaller = require("electron-winstaller");
async function compile() {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: "./ECG-win32-x64",
      outputDirectory: "./build/app",
      authors: "My App Inc.",
      exe: "ECG.exe",
    });
    console.log("It worked!");
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}
compile();
