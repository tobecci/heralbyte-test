import express from "express"
import { initControllers } from "./controllers"
import { Sequelize, DataTypes } from 'sequelize';

async function init(){
    const sequelize = new Sequelize('postgres://hefmyxoh:U_jsxsSYHj4kArZQDwmp1_4eVgzpC1KJ@stampy.db.elephantsql.com/hefmyxoh')

    // define user model
    const User = sequelize.define('User', {
        target: DataTypes.STRING,
        network: DataTypes.STRING,
    });

    await sequelize.sync({force: true});
    
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    initControllers(app, sequelize);
    const port = process.env.PORT || 5000;
    app.listen(port, function(){
        console.log(`app served on http://localhost:${port}`)
    })
}

init();