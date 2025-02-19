const { response } = require("express")

document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/talepler")
    .then(response => response.json())
    .then(data=>{
        const tableBody = document.getElementById("talepTablo");
        tableBody.innerHTML = "";

        data.forEach(talep => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${talep.id}</td>
            <td>${talep.tc}</td>
            <td>${talep.adSoyad}</td>
            <td>${talep.dogumTarihi}</td>
            <td>${talep.email}</td>
            <td>${talep.birim}</td>
            <td>${talep.gorev}</td>
            <td>${talep.ogrenim}</td>
            <td>${talep.talepTuru}</td>
            <td>${talep.created_at}</td>`;
            tableBody.appendChild(row);
        })
    })
    .catch(error=>console.error("Hata:", error));

})


