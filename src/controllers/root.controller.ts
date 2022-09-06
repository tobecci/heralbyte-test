import { Express } from "express"
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
import { join } from "path"
const csv = require('csvtojson')

import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';

export default function init(app: Express, sequelize: Sequelize){
    app.get('/', function(req, res){
        res.end("hello world oh");
    });

    app.post('/convert', upload.single('csv'), async function(req, res){

        // target, operator name
        // target, network

        //get file path
        let fileName = req.file.path;
        let filePath = join(__dirname + '../../../', fileName)

        const jsonArray = await csv().fromFile(filePath);

        const userModel = sequelize.models.User;
        
        // let user = new userModel({
        //     target: "test",
        //     network: "test",
        // });

        jsonArray.forEach(function(item){
            // create a model and save it
            let userInstance = new userModel({
                target: item['Target'],
                network: item['Operator Name']
            })

            userInstance.save();
        })

        //import csv to db

        res.json({
            "body": req.body,
            "file": req.file,
            "path": filePath,
            "array": jsonArray
        }).end();
    })
}