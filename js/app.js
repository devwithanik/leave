console.log("app.js loaded");

function saveBioId() {
  const bioId = document.getElementById("bioId").value;
  localStorage.setItem("bioId", bioId);
}

function requireLogin() {
  const bioId = localStorage.getItem("bioId");
  if (!bioId) {
    window.location.href = "index.html";
  } else {
    const input = document.getElementById("bioId");
    if (input) input.value = bioId;
  }
}
