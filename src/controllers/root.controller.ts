import { Express } from "express"
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
import { join } from "path"
const csv = require('csvtojson')
import { Sequelize } from 'sequelize';
interface userList {
    'Account': string,
    'System Reference': string,
    'Customer Reference': string,
    'Operator Reference': string,
    'Vendor SIM': string,
    'Tag': string,
    'Route Tag': string,
    'Wholesaler': string,
    'App Host': string,
    'Time': string,
    'Target': string,
    'Type': string,
    'Country': string,
    'Operator Name': string,
    'Amount': string,
    'Currency': string,
    'State': string,
    'Successful': string,
    'Response Code': string,
    'Completed In': string,
    'Channel': string,
}

export default function init(app: Express, sequelize: Sequelize){
    app.get('/', function(req, res){
        res.end("hello world oh");
    });

    app.post('/convert', upload.single('csv'), async function(req, res){
        
        //if file is not present return error
        if(!req.file){
            res.status(400).json({ msg: "upload the csv file" }).end()
            return;
        }

        //get file path
        let fileName = req.file.path;
        let filePath = join(__dirname + '../../../', fileName)

        //convert the csv file to json
        const jsonArray: userList[] = await csv().fromFile(filePath);

        const userModel = sequelize.models.User;
        
        //iterate and save items to db
        jsonArray.forEach(function(item){
            // create a model and save it
            userModel.create({
                target: item['Target'],
                network: item['Operator Name']
            })
        })

        res
        .status(201)
        .json({
            "msg": "csv has been imported"
        }).end();
    })
}