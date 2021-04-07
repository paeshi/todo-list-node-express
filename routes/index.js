const express = require('express');
const router = express.Router();
const todoCtrl = require('../controllers/index')

router.get("/", todoCtrl.index);



router.get('/:customListName', todoCtrl.show);


router.post("/", todoCtrl.listing);

router.post('/delete', todoCtrl.deleteThis);

router.get("/work", todoCtrl.showNew);

router.get("/about", todoCtrl.aboutPage);



  
module.exports = router;


