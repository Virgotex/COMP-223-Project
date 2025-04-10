let path = require("path")
let express = require("express")
let session = require("express-session")


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
app.get("/login", (req,res) => {
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
    res.send("Page not implemented yet.")
})
app.post("/login", (req,res)=>{
    console.log(req.body)
    req.session.isLoggedIn = true;
    res.redirect("shop")
})
app.post("/signup", (req,res) => {
    req.session.isLoggedIn = true;
    console.log(req.body)
    res.redirect("shop")
})
app.listen(3000, () => {
    console.log("Server successfully started")
});

