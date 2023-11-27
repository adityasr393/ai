// const express = require("express"); // Express Module Import
// const mongoose = require("mongoose"); // Mongoose Module Import
// const cors = require("cors"); // Cors Module Import
// const bcrypt = require("bcrypt"); // bcrypt Module Import
// const saltRounds = 10; // Number of Salt rounds used in Encryption of the password
// const UsersModel = require("./src/schema/Schema"); // Schema created for the Users
// const jwt = require('jsonwebtoken')

// const bodyParser = require('body-parser');
// // Creating app variable to assigning
// const blogroutes = require("./src/routes/routes");
// const app = express();
// app.use(express.json()); // The declared variable is using json() from express module
// app.use(cors());        // The declared variable will also use cors() from cors module

// // Mongoose Connection

// mongoose.connect(
//     "mongodb+srv://viddeveloper110:1234567890@vidhema-dev.n5rtjjg.mongodb.net/Admin_Panel"
// );
// app.post("/signup", async (req, res) => {
//     const username = req.body.username;
//     const userData = await UsersModel.findOne({ username: username });
//     if (!userData) {
//         const salt = await bcrypt.genSalt(saltRounds);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//         UsersModel.create(req.body)
//             .then((users) => res.json(users))
//             .catch((err) => res.json(err));
//     }
//     else {
//         res.json("Username Unavailable");
//     }
// });

// // POST API for Login Authentication

// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     const userData = await UsersModel.findOne({ username: username });
//     if (userData) {
//         const match = await bcrypt.compare(password, userData.password);
//         if (match) {
//             const token = await jwt.sign({ userId: userData._id }, 'knauezebdgbuviuegyberjdbvfiuarwjp0232823y8732fui2gu2q', { expiresIn: "1h" });
//             res.json({ message: "Success", data: userData, token: token });
//         } else {
//             console.log(match);
//             res.json("Username or password is incorrect");
//         }
//     } else {
//         res.json("User not found");
//     }
// });


// app.get("/getprofiledata/:id", async (req, res) => {
//     try {
//         let data = await UsersModel.findById(req.params.id);
//         res.json(data)
//     } catch (err) {
//         console.log(err)
//     }
// });
// app.put("/updateprofile/:id", async (req, res) => {
//     try {
//         const data = await UsersModel.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         });
//         res.json(data);
//     }catch(err){
//         console.log(err);
//     }
// });
// app.listen(3001, () => {
//     console.log(`Server is running on port 3001`);
// });


// const blog = express();
// blog.use(express.json()); // The declared variable is using json() from express module
// blog.use(cors());  

// exports.blogadd = async (req, res) => {
//     try{
   
//     // console.log(req.body);
//     const blogData = new bloguser(req.body);
//     console.log('test')
//     await blogData.save();
//     res.json({message: "bloguser added successfully", data:blogData});
//         }catch(err){
//             res.status(500).json(err)
//         }
// };
// exports.blogget = async (req, res) => {
//     try {
//         let blogData = await bloguser.find();
//         res.json({data: blogData});
//     } catch (error) {
//         console.log(error);
//         if (!error.status) {
//             error.status = 500;
//         }

//         res.status(error.status).json({ message: error.message });
//     }
// };

// exports.blogupdate = async (req, res) => {
//     try{
//             const blogData = await bloguser.findByIdAndUpdate(req.params.id, { $set: req.body },
//             { new: true });
            
//        res.json({data:blogData});
//         }catch(err){
//             res.status(500).json(err)
//         }
// };

// exports.blogdelete = async (req, res) => {
//     const blogData = await bloguser.findByIdAndDelete(req.params.id);
//     try{
//         if(!blogData){
//             res.status(400).json({message:"bloguser not found."});
//         }
//         res.status(200).json({ message: 'bloguser deleted successfully' });  
//     } catch(err){
//         res.status(500).json(err)
//     }
// };
// blog.use(bodyParser.json());
// blog.use('/', blogroutes);
// blog.listen(4000);
// console.log("Server is running on port 4000");

const db = require('./src/DataBase/mongo');
const express = require('express');
const cors = require('cors')
// const mongoose = require('mongoose');
const apis = require('./src/routes/routes');
// const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

// dotenv.config({path:'env'});
// const port = process.env.PORT;
// console.log(port);
app.use(bodyParser.json());
app.use(cors());
app.use('/',apis);


app.listen(3001, ()=>{
    console.log(`server is running on port 3001`);
});