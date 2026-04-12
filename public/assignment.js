const clientData = JSON.parse(sessionStorage.getItem("clients"));
const volunteertData = JSON.parse(sessionStorage.getItem("volunteers"));

document.getElementById("clients").innerText = JSON.stringify(clientData, null, 2);
document.getElementById("volunteer").innerText = JSON.stringify(volunteertData, null, 2);