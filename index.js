const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

app.set("views",path.join(__dirname,"/views"));

app.set("view engine","ejs");
app.get("/",(req,res) => {
    res.render("home.ejs");
});

app.get("/hello",(req,res)=>{
    res.send("This is the hello page");
});

app.get("/rolldice", (req,res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs",{num: diceValue,diceValue: diceValue});
});

// app.get("/ig/:username", (req,res) => {
//     const followers = ["rohan","mohan","raju","sohit","mohit","lokesh"];
//     let { username } = req.params;
//     res.render("instagram.ejs",{ username, followers });
// });


app.get("/ig/:username", (req,res) => {
    const instaData = require("./data.json");
    let { username } = req.params;
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs",{ data });
    } else {
        res.render("error.ejs");
    }
    
});

app.listen(port,() => {
    console.log(`listening on port: ${port}`);
})

