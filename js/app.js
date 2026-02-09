console.log("app.js loaded");

function saveBioId() {
  const bioId = document.getElementById("bioId").value;
  localStorage.setItem("bioId", bioId);
}
