const {Router} = require("express");
const router = new Router();
const Fis = require("../models/fis");

router.post("/tutar/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTutar", {title: "search by tutar", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})
router.post("/tur/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTur", {title: "search by tur", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

router.post("/tarih/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByTarih", {title: "search by tarih", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

router.post("/no/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByNo", {title: "search by no", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

router.post("/kimden/", (req, res) => {
    Fis.find().then((result) => {
        res.render("searchByKimden", {title: "search by kimden", fisler: result});
    }).catch(err => {
        console.log(err);
    })
    
})

router.post("/search/Bykimden", (req, res) => {
    Fis.find({kimden: req.body.search.toLowerCase()}).then((result) => {
        res.render("searchByKimden", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

router.post("/search/Byno", (req, res) => {
    Fis.find({no: req.body.search}).then((result) => {
        res.render("searchByNo", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

router.post("/search/Bytarih", (req, res) => {
    Fis.find({tarih: new Date(req.body.search + "GMT")}).then((result) => {
        res.render("searchByTarih", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})

router.post("/search/Bytur", (req, res) => {
    Fis.find({tur: req.body.search.toLowerCase()}).then((result) => {
        res.render("searchByTur", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})
router.post("/search/Bytutar", (req, res) => {
    Fis.find({tutar: req.body.search}).then((result) => {
        res.render("searchByTutar", {title: req.body.search, fisler: result});
    }).catch(err => {
        console.log(err);
    })
})








module.exports = router;