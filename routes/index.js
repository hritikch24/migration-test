require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Feedbacks = require('../models/feedbacks');
const Users = require('../models/users');
let jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../crypto/crypto');
const dbUri='mongodb+srv://feedback-portal:feedback-portal357@feedback-portal.nn6pa.mongodb.net/feedback?retryWrites=true&w=majority'
const ACCESS_TOKEN='vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

const connection = () =>{
mongoose.connect(dbUri, {useNewUrlParser : true, useUnifiedTopology : true})
.then(() => console.log(`Server is running on port`))
.catch((error) =>  console.log(error.message));
}
/* GET home page. */
router.get('/', function(req, res, next) {
  connection();
  res.render('index', { title: 'Express' });
});

router.post('/add-feedbacks', (req,res) =>{
  connection();
  const body = req.body;
  const {name,email,category,feedback} = body;
  const feedbacks = new Feedbacks({
    name:name,
    email:email,
    category:category,
    feedback:feedback,
    status:'New'
  });

  feedbacks.save()
    .then((result) =>{
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    })
});

router.post('/add-user',async (req,res) => {
  connection();
  const body = req.body;
  const {name,email,password} = body;
  const user = new Users({
    name:name,
    email:email,
    password: encrypt(password),
    isAdmin:false
  })

  user.save()
  .then((result) =>{
    res.send(result)
  })
  .catch((err) =>{
    console.log(err);
  })
});

router.get('/all-feedbacks', (req,res) =>{
  connection();
  Feedbacks.find().sort( { createdAt: -1 } )
    .then((result) =>{
      res.send(result);
    })
  .catch((err) =>{
    console.log(err);
  })
});

router.get('/user', (req,res) =>{
  connection();
  Users.find()
  .then((result) =>{
    console.log(result);
    res.send(result);
  })
.catch((err) =>{
  console.log(err);
})
});

router.post('/userlogin',async (req,res) =>{
  connection();
  // const body = JSON.parse(req.body.user);
  const body = req.body;
  Users.findOne({email:body.email})
    .then(async (result) =>{
      if( body.password === decrypt(result.password)){
        let data = {"login":"success", "isAdmin":result.isAdmin,email:body.email,name:result.name};
        const loginToken = jwt.sign(data,ACCESS_TOKEN)
        res.send(data);
      }
      else{
        let data = {"login":"failure"}
        res.send(data);
      }
    })
  .catch((err) =>{
    console.log(err);
    res.send('error');
  })
});

module.exports = router;