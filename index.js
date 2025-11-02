const { faker } = require('@faker-js/faker');
const mysql = require('mysql2')
const express = require('express');
const path = require("path");
const methodOverride = require("method-override");
const app = express();

//middlewares
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}))



const port = 8080;

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"))

require("dotenv").config();

// database se connection bnaya hai
const connection = mysql.createConnection({
     host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

 // faker function to generate fake data
let getRandomUser =() => {
  return [ 
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ];
}

// home page route 
app.get('/',(req,res)=>{
    const q = `select count(*) from user`;
    try{
        connection.query(q,(err, result) =>{
            if(err) throw err;
            const num = result[0]["count(*)"];
            res.render("home.ejs",{num})
    });

    }catch(err){
        console.log(err);
    }

 })

 // user data route
 app.get("/user",(req,res)=>{
    const q = `select * from user`;
     try{
        connection.query(q,(err, result) =>{
            if(err) throw err;
            res.render("showuser.ejs",{result})
    });

    }catch(err){
        console.log(err);
    }
 })
 
 // edit route
 app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
     const q = `select * from user where id = '${id}'`;
     try{
        connection.query(q,(err, result) =>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user})
    });

    }catch(err){
        console.log(err);
    }
 })

app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formpass, username: newUsername } = req.body;

    const q = `SELECT * FROM user WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("DB Error");
        }

        // 🧠 Add this safety check
        if (result.length === 0) {
            return res.send("User not found in database!");
        }

        let user = result[0];

        if (formpass !== user.password) {
            return res.send("Wrong password");
        }

        const q2 = `UPDATE user SET username = ? WHERE id = ?`;
        connection.query(q2, [newUsername, id], (err) => {
            if (err) {
                console.log(err);
                return res.send("Error updating user");
            }
            res.redirect("/user");
        });
    });
});


app.get("/user/add",(req,res)=>{
    res.render("adduser.ejs")
})

//add user to database
 app.post("/user/add", (req,res)=>{
    let {id,username,email,password} = req.body;
    let q = "insert into user (id,username,email,password) values (?,?,?,?)"
    try{ 
        connection.query(q,[id,username,email,password], (err,result)=>{
            if(err) throw err;
            console.log("user added successfully");
            res.redirect("/user")        
        })
    }catch(err){
        console.log(err);
    }
 })

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

