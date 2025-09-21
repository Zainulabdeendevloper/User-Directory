const express = require(`express`) ;
const app = express() ;
const path = require(`path`)
const userModel  = require(`./models/user`);
const user = require("./models/user");

app.set("view engine" ,"ejs")
app.use(express.json()) ;
app.use(express.urlencoded({extended : true })) ;
app.use(express.static(path.join(__dirname , `public`)))

app.get(`/` , (req , res) => {
res.render("index")
} ) ;

app.get("/delete/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);  // delete by id
    res.redirect("/read");  // back to users list
  } catch (err) {
    res.send(err);
  }
});


app.get("/edit/:userid", async (req, res) => {
  let user = await  userModel.findOne({_id: req.params.userid})
  res.render("edit", {user})
   
});

app.post("/update/:userid", async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});





app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find(); 
   userModel.find().sort({ _id: -1 }) 
    res.render("read", { users });        
  } catch (err) {
    res.send(err);
  }
});



app.post("/Create", async (req, res) => {
  let { name, email, image } = req.body;

  // agar image empty ya galat hai, ek default use karo
  if (!image || !image.startsWith("http")) {
    image = "https://i.pravatar.cc/150?u=" + email; // random avatar based on email
  }

  let createdUser = await userModel.create({
    name,
    email,
    image
  });

  res.redirect("/read");
});




app.listen(3000) ;
