console.log("app.js loaded");
const API = "https://script.google.com/macros/s/AKfycbzE7QoVZFSiY9deZ5kQGoHvyQCOG2RLpi4Fv_4ORCAazBX5CilPMTp-S9yYMG4pE-cHLQ/exec";

// LOGIN
function login() {
  const bioId = document.getElementById("bioId").value;

  const body = `action=login&bioId=${encodeURIComponent(bioId)}`;

  fetch(API, {
    method: "POST",
    body: body
  })
    .then(res => res.text())
    .then(text => {
      console.log("Raw response:", text);

      const data = JSON.parse(text);

      if (data.status === "ok") {
        localStorage.setItem("bioId", bioId);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid Bio ID");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Backend error");
    });
}

// ADD LEAVE
function addLeave() {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "addLeave",
      bioId: localStorage.getItem("bioId"),
      date: document.getElementById("date").value,
      reason: document.getElementById("reason").value
    })
  })
  .then(res => res.json())
  .then(() => alert("Leave Added"));
}

// SHOW TODAY
if (document.getElementById("list")) {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "todayLeaves" })
  })
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("list");
    data.data.forEach(p => {
      ul.innerHTML += `<li>${p.name} (${p.bioId})</li>`;
    });
  });
}
