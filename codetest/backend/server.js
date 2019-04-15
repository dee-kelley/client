const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
//const Data = require('./data')
const app = express();
const port = 3001;

app.use(cors());
const router = express.Router();


//DB DB DB DB DB
const mongo = "mongodb://localhost/codetest";
mongoose.connect(mongo, {useNewUrlParser: true});
mongoose.connection.on('connected', ()=>{
    console.log(`mongoose connected to ${mongo}`)
})
mongoose.connection.on('disconnected', ()=>{
    console.log(`mongoose disconnected`)
})
mongoose.connection.on('error', (err)=>{
    console.log(err, `mongoose error`)
})
//DB DB DB DB DB

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));

//******************************************************** */
router.get("/getData", (req, res)=>{
    Data.find((err, data)=>{
        if(err) return res.json({sucess: false, error: err});
        return res.json({success: true, data: data})
    });
});

router.post("/updateData", (req, res)=>{
    const {id, update} = req.body;
    Data.findOneAndUpdate(id, update, err =>{
        if(err) return res.json({success: false, error: err});
        return res.json({success:true});
    });
});

router.delete("/deleteData", (req, res)=>{
    const {id} = req.body;
    Data.findOneAndDelete(id, err=>{
        if(err) return res.send(err);
        return res.json({success: true});
    });
});

router.post("/putData", (req, res)=>{
    let data = new Data();
    const {id, message} = req.body;
    if((!id && id !==0) || !message){
        return res.json({
            success: false,
            error: "MACHIGAI"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err=>{
        if(err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
    });

/************************************************************* */

app.use("/api", router);
app.listen(port, function () {
    console.log("Server is LISTENINGGGG "+ port);
  });