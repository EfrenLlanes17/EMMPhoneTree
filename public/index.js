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
  if(volunteerFileNameText.textContent != "" && clientFileNameText != ""){
    const volFile = volunteerFileInput.files[0];
    const clientFile = clientFileInput.files[0];

    if (!volFile || !clientFile) return;

    const volReader = new FileReader();
    const clientReader = new FileReader();

    volReader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Convert into structured format (name + email only)
        const structuredData = jsonData.map(row => ({
            name: row["Volunteer Name"],
            email: row["Email"]
        }));

        // Store in sessionStorage
        sessionStorage.setItem("volunteers", JSON.stringify(structuredData));

        //console.log("Volunteers:", structuredData);
    };

    clientReader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Header of Client file start at row 6
        const jsonData = XLSX.utils.sheet_to_json(sheet, { range: 5});

        // Convert into structured format (name + email only)
        const structuredData = jsonData.map(row => ({
            name: `${row["First Name"]} ${row["Last Name"]}`,
            phone: row["Phone1"]
        }));

        //removed duplicate phone numbers for couples
        const seenPhones = new Set();
        const uniqueData = [];

        for (let i = 0; i < structuredData.length; i++) {
            const current = structuredData[i];
            const phone = current.phone;

            if(!phone) continue;

            if (phone && !seenPhones.has(phone)) {
                seenPhones.add(phone);
                uniqueData.push(current);
            }
        }

        // Store in sessionStorage
        sessionStorage.setItem("clients", JSON.stringify(uniqueData));

        //console.log("clients:", uniqueData);
    };

    volReader.readAsArrayBuffer(volFile); 
    clientReader.readAsArrayBuffer(clientFile); 
    window.location.href = "assignment.html";
  }
});