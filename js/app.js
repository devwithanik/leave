console.log("app.js loaded");

// Store Bio ID on login form submit
function saveBioId() {
  const bioId = document.getElementById("bioId").value;
  localStorage.setItem("bioId", bioId);
}

// Redirect protection (optional)
function requireLogin() {
  if (!localStorage.getItem("bioId")) {
    window.location.href = "index.html";
  }
}
