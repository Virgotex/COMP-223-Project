let path = require("path")
let express = require("express")
let session = require("express-session")
const bcrypt = require("bcryptjs")
const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()


let app = express();
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(
    session({
      secret: 'xAtZ4Ol4W9hV6lVg04JsNlwsFvxTbA9WI6jptSiy82yS8UyAMVEBk0MeQeKqi9BJN8u1RisI1LdBordarVY6GMF7AfKE6hnwTN6WrLQmgt9XsuDiKVdwGN3r8zZzly0o', // Change this to a secure random string
      resave: false,
      saveUninitialized: false,
    })
);

app.use(express.static(path.join(__dirname + "/public/")))
let pages_root = path.join(__dirname + "/pages/");
app.get("/shop", (req,res) => {
    if(!req.session.isLoggedIn){
        res.redirect("login")
    }
    res.sendFile(path.join(pages_root + "shop.html"))
})
app.get("/login", async (req,res) => {
    res.sendFile(path.join(pages_root + "login.html"))
})
app.get("/signup", (req,res) => {
    res.sendFile(path.join(pages_root + "signup.html"))
})
app.get("/cart", (req,res) => {
    res.sendFile(path.join(pages_root + "cart.html"))
    console.log(req.session.isLoggedIn)
})
app.get("/shipping", (req,res) => {
    res.sendFile(path.join(pages_root + "shipping.html"))
})
app.get("/payment", (req,res) => {
    res.sendFile(path.join(pages_root + "payment.html"))
})
app.get("/" , (req,res) => {
    if(!req.session.isLoggedIn){
        res.redirect("login")
    }
})
app.post("/login", async (req,res)=>{
    console.log(req.body)
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    req.session.isLoggedIn = true;
    res.redirect("shop")
})
app.post("/signup", async (req,res) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password,salt)
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if(user != null){
        console.log("User exists!");     
        req.session.isLoggedIn = false; 
        return;
    }
    await prisma.user.create({
        data: {
            name:req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        }
    })
    req.session.isLoggedIn = true;
    console.log(req.body)
    res.redirect("shop")
})
app.listen(3000, () => {
    console.log("Server successfully started")
});

