function notif(format, text) {
  if (format == "success") {
    var x = document.getElementById("snackbar-success");
    x.innerHTML = text;
  } else {
    var x = document.getElementById("snackbar-error");
    x.innerHTML = text;
  }
  // var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
}
