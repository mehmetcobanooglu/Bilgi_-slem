const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

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




const admin_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'incigiyim_adminpaneli'
});