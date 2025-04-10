let path = require("path")
let express = require("express")

let app = express();

app.use(express.static(path.join(__dirname + "/public/")))
let pages_root = path.join(__dirname + "/pages/");
app.get("/shop", (req,res) => {
    res.sendFile(path.join(pages_root + "shop.html"))
})
app.listen(3000);

