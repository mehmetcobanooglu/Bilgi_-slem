document.getElementById("talepForm").addEventListener("submit", function(event){
    event.preventDefault();

    const formData = {
        tc: document.getElementById("tc").value,
        adSoyad: document.getElementById("adSoyad").value,
        dogumTarihi: document.getElementById("dogumTarihi").value,
        email: document.getElementById("email").value,
        birim: document.getElementById("birim").value,
        gorev: document.getElementById("gorev").value,
        ogrenim: document.getElementById("ogrenim").value,
        talepTuru: document.querySelector('input[name="talepTuru"]:checked')?.value
    };

    fetch("http://localhost:3000/talep",{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data =>{
        alert(data.message);
        document.getElementById("talepForm").reset();
    })
    .catch(error => console.error("Hata:", error));
})