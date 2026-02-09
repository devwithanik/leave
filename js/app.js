const API = "PASTE_YOUR_APPS_SCRIPT_URL";

// LOGIN
function login() {
  const bioId = document.getElementById("bioId").value;

  fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "login", bioId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "ok") {
      localStorage.setItem("bioId", bioId);
      window.location = "dashboard.html";
    } else {
      alert("Invalid Bio ID");
    }
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
