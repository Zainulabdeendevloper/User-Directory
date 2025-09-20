const express = require(`express`) ;
const app = express() ;
const path = require(`path`)
const userModel  = require(`./models/user`)

app.set("view engine" ,"ejs")
app.use(express.json()) ;
app.use(express.urlencoded({extended : true })) ;
app.use(express.static(path.join(__dirname , `public`)))

app.get(`/` , (req , res) => {
res.render("index")
} ) ;

app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();   // MongoDB se saare users le raha hai
    res.render("read", { users });        // EJS ko "users" bhejna zaroori hai
  } catch (err) {
    res.send(err);
  }
});



app.post(`/Create` ,async (req , res) => {
    let { name , email , image} = req.body ;
let createduser = await userModel.create({
    name, 
    email, 
    image
})

res.send(createduser) 
})



app.listen(3000) ;
