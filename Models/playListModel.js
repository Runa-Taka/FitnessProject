"use strict"
const {db} = require("./db");
const uuidV4 = require('uuid'.v4);

class playList{
    constructor(db){
        this.db = db;
    }

    
    createPlayList(PlayList){
        try{
            const sql = `
                INSERT INTO PlayList (name, category)   
                VALUES (@name, @category)
            `;

            const addPlayListStmt = db.prepare(sql);

            addPlayListStmt.run(PlayList);

            var video_Player=document.getElementById("video_player")
            links=video_Player.getElementsByTagName('a');
            for(var i=0; i<links.length; i++){
                links[i].onclick=handler;
            }

            function handler(e){
                e.preventDefault();
                videotarget=this.getAttribute("href");
                filename=videotarget.substr(0, videotarget.lastIndexOf('.'))||videotarget;
                video=document.querySelector("#video_player video");
                video.removeAttribute('poster');
                video=document.querySelector("#video_player video source");
                source[0].src=filename + ".mp4";
                source[1].src=filename + ".webm";
                video.load();
                video.play();
            }

            return true;
        }catch(err){
            console.error(err);
            return false;
        }
    }

    removePlayList(playList){

    }
}