<script>
let personnel = [];
let leaves = [];

// Load allowed personnel
fetch("personnel.json")
  .then(r => r.json())
  .then(data => personnel = data);

// Load leave entries (visible to everyone)
fetch("leaves.json")
  .then(r => r.json())
  .then(data => {
    leaves = data;
    renderLeaves();
  });

function renderLeaves() {
  const ul = document.getElementById("leaveList");
  ul.innerHTML = "";
  leaves.forEach(l => {
    ul.innerHTML += `
      <li>
        ${l.name} | ${l.leaveType} |
        ${l.from} → ${l.to}
      </li>
    `;
  });
}

async function submitLeave() {
  const bioId = document.getElementById("bioId").value;

  const person = personnel.find(p => p.bioId === bioId);
  if (!person) {
    alert("You are not authorized to submit leave.");
    return;
  }

  const newLeave = {
    bioId: bioId,
    name: person.name,
    leaveType: document.getElementById("leaveType").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    approved: true,
    submittedAt: new Date().toISOString()
  };

  leaves.push(newLeave);

  // HERE you would commit leaves.json via GitHub API
  alert("Leave entry prepared (commit logic here)");
}
</script>
