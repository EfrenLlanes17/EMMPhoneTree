const clientData = JSON.parse(sessionStorage.getItem("clients"));
const volunteerData = JSON.parse(sessionStorage.getItem("volunteers"));
const assignmentData = []

// document.getElementById("clients").innerText = JSON.stringify(clientData, null, 2);
// document.getElementById("volunteer").innerText = JSON.stringify(volunteerData, null, 2);

for(var i = 0; i < volunteerData.length; i++) {
    assignmentData.push(
        {name: volunteerData[i].name, clientData: []}
    )
}

var volunteerCount = 0;
while(clientData.length != 0) {
    var client = clientData.pop()
    assignmentData[volunteerCount].clientData.push(client)

    volunteerCount++;

    if(volunteerCount >= volunteerData.length) {
        volunteerCount = 0;
    }
}

function copyCellContent(button) {
    var cell = button.parentElement;
    var text = cell.innerText;

    navigator.clipboard.writeText(text)
        .then(() => {
            button.style.color = "#449ab4";
        });
}

function DynamicTable(data) {
    var table = document.getElementById("MyTable");
    table.innerHTML = "";

    for (var i = 0; i < data.length; i += 3) {
        var row = "<tr>";

        for (var j = i; j < i + 3 && j < data.length; j++) {
            row += `
                <td style="position: relative; padding: 15px;">
                    
                    <button 
                        onclick="copyCellContent(this)"
                        style="
                            position: absolute;
                            top: 6px;
                            right: 6px;
                            background: none;
                            border: none;
                            cursor: pointer;
                            font-size: 25px;
                        "
                    >
                        <i class="fa-regular fa-copy"></i>

                    </button>

                    Hello ${data[j].name},<br><br>
                    Here are your assigned numbers,<br><br>
                    ${data[j].clientData
                        .map(client => `${client.name} - ${client.phone}`)
                        .join("<br>")
                    }
                    <br><br>
                    Thank you,<br>
                    Edmond Mobile Meals
                </td>
            `;
        }

        row += "</tr>";
        table.innerHTML += row;
    }
}
console.log(assignmentData)
DynamicTable(assignmentData);