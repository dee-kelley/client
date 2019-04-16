const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data')
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
        if(err){
            console.log(err)
        } else{
            res.json(data)
    };
});

router.post("/addData", (req, res)=>{
    let todo = new Data(req.body);
    todo.save().then(todo=>{
        res.json({ status: 200, 'todo': 'todo added success'})
    }).catch(err =>{
        res.status(400).send('Adding new failed')
    })
});

router.delete("/deleteData/:id", (req, res)=>{
    Data.findOneAndDelete(req.params.id);
    res.json({status: 200})
    }).catch(err=>{
        res.status(400).send("NOT deleted")
    });

router.post("/updateData/:id", (req, res)=>{
    Data.findById(req.params.id, function(err, todo){
        if(!todo)
        res.status(404).send("data not found");
        else
        todo.text = req.body.text;
        todo.id = req.body.id;
        todo.completed = req.body.completed;

        todo.save().then(todo=>{
            res.json("todo updated")
        }).catch(err =>{
            res.status(400).send("NOT updated")
        })
    })
    });
    });

/************************************************************* */

app.use("/api", router);
app.listen(port, function () {
    console.log("Server is LISTENINGGGG "+ port);
  });