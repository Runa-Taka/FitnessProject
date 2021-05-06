"use strict"
const {db} = require("./db");
const uuidV4 = require('uuid'.v4);

class uploadModel{
    constructor (db){
        this.db = db;
    }
    createNewFile(post){
        try{
            const sql=`
                INSERT INTO videoFile
                (randomName, filename, category, path, videoDescription)
                VALUES
                (@randomName, @filename, @category, @path, @videoDescription)
            `;
            db.prepare(sql).run(post);
            return true;
        }catch(err){
            console.error(err);
            return false;
        }

    }
}

exports.uploadModel = new this.uploadModel(db);
 





