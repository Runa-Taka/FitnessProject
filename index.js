"use strict";

const express = require('express');
const app = express();
//const argon2 = require("argon2");
const Joi = require('joi');
const path = require("path");
//const ejs = require("ejs");
//app.arguments(exoress.json());

//multer for videos
const multer = require("multer");//file will be stored in videos
const crypto = require('crypto');

//const {playListModel} = require('Models/playListModel');
const {uploadModel} = require('./Models/uploadModel');
//const {galleryModel} = require('Models/gallery');

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.static(path.join(__dirname, "Public"), {
    extensions: ['html'],
}));

const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: "somethingSecret",
    resave: false,
    saveUninitialized: false,
    name: "session", // now it is just a generic name
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 8, // 8 hours
    }
  };
app.use(session(sessionConfig));

const PORT = 7022;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(PORT, () => {
    console.log("listening to the port: " + PORT);
});
/*
const videoFile = multer({
    storage: multer.diskStorage({
        destination (req, file, cb) {
            cb(null, "upload");
          },
          filename (req, file, cb) {
            // Generate a random name
            const randomName = crypto.randomBytes(12).toString('hex');
       
            // Get the extension from the file's original name
            const [extension] = file.originalname.split(".").slice(-1);
            // Now the random name preserves the file extension
            cb(null, `${randomName}.${extension}`);
          },
    })
});
*/
/*
const videoFile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const {category} = req.body
            const path = "./Public/upload/${category}"
            cb(null, path) 
          },
          filename (req, file, cb) {
            // Generate a random name
            const randomName = crypto.randomBytes(12).toString('hex');
       
            // Get the extension from the file's original name
            const [extension] = file.originalname.split(".").slice(-1);
            // Now the random name preserves the file extension
            cb(null, `${randomName}.${extension}`);
          },
    })
});*/

const storage =  multer.diskStorage({
        destination: (req, file, cb) => {
            const {category} = req.body
            const path = "./Public/upload/${`category`}"
            cb(null, path) 
        },
        filename (req, file, cb) {
            // Generate a random name
            const randomName = crypto.randomBytes(12).toString('hex');
            // Get the extension from the file's original name
            const [extension] = file.originalname.split(".").slice(-1);
            // Now the random name preserves the file extension
            cb(null, `${randomName}.${extension}`);
        }
});

const video = multer({storage: storage}); 

app.post("/Public/upload", video.single("video"),(req, res) => {
        const file = req.body;
        console.log(req.file);
        console.log(req.body);
        res.sendStatus(200);
        if(error){
            const errorMessages = error.details.map( error => error.message );
            return res.status(400).json(errorMessages);
        }
        else{
            const videoFileInfoAdded = uploadModel.createNewFile({
                randomName,
                filename,
                category,
                path,
                videoDescription 
            });
            if (videoFileInfoAdded) {
                res.redirect('login.html');
            } else { // something went wrong
                res.sendStatus(500); // 500 Internal Server Error
            }
        }
  }
);
