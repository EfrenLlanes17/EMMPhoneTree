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

function DynamicTable(data){
    var table = document.getElementById("MyTable");

    for(var i = 0; i < data.length; i++) {
        
        var row = `
        <tr>
            <td>
                Hello ${data[i].name},

                Here are you assigned numbers,
                ${data[i].clientData.map(client => `${client.name} - ${client.phone}`).join(", ")}

            </td>
        </tr>

        `;
        table.innerHTML += row
    }
}
console.log(assignmentData)
DynamicTable(assignmentData);