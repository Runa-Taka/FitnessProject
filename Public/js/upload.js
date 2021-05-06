"use strict"
/*const {db} = require("./db");
const uuidV4 = require('uuid'.v4);
const { joi } = require("joi");
const multer = require("multer");

function submitForm(x) {
  x.preventDefault();
  const filename = document.getElementById("videoID");
  const files = document.getElementById("videoID");
  const discription = document.getElementsByTagName("Description");
  const formData = new FormData();
  formData.append("filename", filename.value);
      for(let i =0; i < files.files.length; i++) {
          formData.append("files", files.files[0]);
  }
  formData.append("discription", discription.value);
      for(let i =0; i < files.files.length; i++) {
          formData.append("files", files.files[i]);
  }
  formData.append("")
  
  fetch("/upload", {
      method: 'post',
      body: formData
  })
      .then((res) => console.log(res))
      .catch((err) => ("Error occured", err));
}

var upload = multer({ storage: storage })
const storage = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, "/upload");
    },
    filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
  });
*/