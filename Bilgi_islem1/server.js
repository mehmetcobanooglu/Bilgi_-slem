const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.set('views', './public/html');



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:'talep_sistemi'
});


db.connect(err =>{
    if(err) throw err;
    console.log("mysql bağlantısı başarili");
});

app.get("/admin", (req, res) => {
    db.query("SELECT * FROM talepler ORDER BY created_at DESC", (err, results) => {
        if (err) {
            console.error("SQL Hatası:", err);
            return res.status(500).send("Veriler çekilirken hata oluştu.");
        }
        res.render("admin", { talepler: results });
    });
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
});

//Talep Kaydetme Endpoint'i
app.post("/talep", (req,res)=>{
    const { tc, adSoyad, dogumTarihi, email, birim, gorev, ogrenim, talepTuru} = req.body;

    const sql = "INSERT INTO talepler (tc,adSoyad,dogumTarihi,email,birim,gorev,ogrenim,talepTuru) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sql,[tc,adSoyad,dogumTarihi,email,birim,gorev,ogrenim,talepTuru],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message:"veri tabanina kaydedilirken hata oluştu."});
        }
        res.json({message:"talep başariyla kaydedildi."});
    });
});

app.listen(3000,()=>{
    console.log("sunucu 3000 portunda çalişiyorr.");
})




