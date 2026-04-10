const volunteerBtn = document.getElementById("volunteerUpload");
const volunteerFileInput = document.getElementById("volunteerFile");
const volunteerFileNameText = document.getElementById("volunteerFileName");

const clientBtn = document.getElementById("clientUpload");
const clientFileInput = document.getElementById("clientFile");
const clientFileNameText = document.getElementById("clientFileName");

const generateBtn = document.getElementById("generateBtn");

volunteerBtn.addEventListener("click", () => {
  volunteerFileInput.click();
});

volunteerFileInput.addEventListener("change", () => {
  if (volunteerFileInput.files.length > 0) {
    volunteerFileNameText.textContent = volunteerFileInput.files[0].name;
  }
});

clientBtn.addEventListener("click", () => {
  clientFileInput.click();
});

clientFileInput.addEventListener("change", () => {
  if (clientFileInput.files.length > 0) {
    clientFileNameText.textContent = clientFileInput.files[0].name;
  }
});

generateBtn.addEventListener("click",() => {
    console.log("Generate");
});