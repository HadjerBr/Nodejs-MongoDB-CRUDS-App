// to update => put or patch


const express = require("express");
const mongoose = require("mongoose");
const Fis = require("./models/fis");
const Adet = require("./models/adet");
const Tutar = require("./models/tutar");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config({path: "config.env"})
const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); // to attach to req.body

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

const dbUri = process.env.dbUri;
mongoose.connect(dbUri).then( (result) => {
    app.listen(PORT, () => {

        console.log("listening to port " + PORT);
       
    })
}).catch((err) =>{
    console.log(err);
})



app.get("/add", (req, res) => {
    const message = req.session.message || '';
    delete req.session.message;
    const title = "Fiş Ekle";
    res.render("fisEkle", {title: title, message: message}); // for new records
})

app.post("/", (req, res) => {
    const fisler = [];

    for (let i = 0; i<40; i++) {
        if (req.body.tarih[i].length > 0 ) {
            
            const fisObject = {
                tarih: req.body.tarih[i],
                no: req.body.no[i],
                kimden: req.body.kimden[i].toLowerCase(),
                tur: req.body.tur[i].toLowerCase(),
                tutar: req.body.tutar[i],
            }
            const fis = new Fis(fisObject);
            fisler.push(fis);
            
        
            
            
        }

        
    }

    if (fisler.length >0) {
        Fis.insertMany(fisler).then((result) => {
            req.session.message = 'Fiş Created successfully';
            res.redirect("/");
            
    
        }).catch((err) =>{
            req.session.message = 'Fiş could not be created. Please fill at least one row.';
            res.redirect("/add");
            
        });
    }

    else {
        req.session.message = 'Fiş could not be created. Please fill at least one row.';
        res.redirect("/add");
    }
    
    // const adet = new Adet({
    //     adetToplam: req.adet,
    //     adetEgitim: req.toplamE,
    //     adetSaglik: req.toplamS,
    //     adetGida: req.toplamGid,
    //     adetGiyim: req.toplamGiy,
    //     adetKira: req.toplamK
        
    // });
    // Adet.insertOne(adet).then((result) => {
    //     console.log("adet added");
    // }).catch((err) =>{
    //     console.log(err);
        
    // });
    // const tutar = new Tutar({
    //     tutarToplam: req.toplamTutar,
    //     tutarEgitim: req.etutar,
    //     tutarSaglik: req.stutar,
    //     tutarGida: req.gidtutar,
    //     tutarGiyim: req.giytutar,
    //     tutarKira: req.ktutar
        
    // });
    // Tutar.insertOne(tutar).then((result) => {
    //     console.log("tutar added");
    //     res.redirect("/", {title: "Eski Fisler", fisler: fisler, tutar:tutar, adet:adet});

    // }).catch((err) =>{
    //     console.log(err);
        
    // });

    

    
   
    
    
    
})

app.get("/", (req, res) => {
    const message = req.session.message || '';
    delete req.session.message;
    const title = "Eski Fişler";
    Fis.find().then((result) => {
        res.render("index", {title: title, fisler: result, message: message});
    }).catch(err => {
        console.log(err);
    })
})


app.post("/tutar/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTutar", {title: "search by tutar", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})
app.post("/tur/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTur", {title: "search by tur", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

app.post("/tarih/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTarih", {title: "search by tarih", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

app.post("/no/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByNo", {title: "search by no", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

app.post("/kimden/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByKimden", {title: "search by kimden", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

app.post("/search/Bykimden", (req, res) => {
    Fis.find({kimden: req.body.search.toLowerCase()}).then((result) => {
        res.render("searchByKimden", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

app.post("/search/Byno", (req, res) => {
    Fis.find({no: req.body.search}).then((result) => {
        res.render("searchByNo", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

app.post("/search/Bytarih", (req, res) => {
    Fis.find({tarih: new Date(req.body.search + "GMT")}).then((result) => {
        res.render("searchByTarih", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

app.post("/search/Bytur", (req, res) => {
    Fis.find({tur: req.body.search.toLowerCase()}).then((result) => {
        res.render("searchByTur", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})
app.post("/search/Bytutar", (req, res) => {
    Fis.find({tutar: req.body.search}).then((result) => {
        res.render("searchByTutar", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})





app.delete("/:id", (req, res) => {
    req.session.message = 'Fiş Deleted successfully';
    const id = req.params.id;
    Fis.findByIdAndDelete(id).then((result) => {
        res.json({redirect: "/", message:'Fiş Deleted successfully'});
    }).catch((err) => {
        console.log(err);
    })
})


app.get("/update/:id", (req, res) => {
    const id = req.params.id;
    Fis.findById(id).then((result) => {
        res.render("update", {fis: result, title: "Update" + result.no});
    }).catch((err) => {
        console.log(err);
    })
})

app.post("/update/:id", (req, res) => {
    
    
    const id = req.params.id;
    Fis.findByIdAndUpdate(id, {
        tarih: req.body.tarih,
        no: req.body.no,
        kimden: req.body.kimden,
        tur: req.body.tur,
        tutar: req.body.tutar
    })
    
    
    .then((result) => {
        req.session.message = 'Fiş Updated successfully';
        res.redirect("/");
        
    }).catch((err) => {
        console.log(err);
    })
})


app.use((req, res) => {
    const title = "Oops-404";
    res.render("404", {title: title});
})