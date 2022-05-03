import { Express } from "express"

export default function init(app: Express){
    app.get('/', function(req, res){
        res.end("hello world oh");
    });
}