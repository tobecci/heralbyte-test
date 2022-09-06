import express from "express"
import { initControllers } from "./controllers"
import { Sequelize, Model, DataTypes } from 'sequelize';
import { join } from "path"


let pathToSqliteFile = join(__dirname, '../db.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: pathToSqliteFile
});

// define user model
const User = sequelize.define('User', {
  target: DataTypes.STRING,
  network: DataTypes.STRING,
});
sequelize.sync({force: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
initControllers(app, sequelize);
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`app served on http://localhost:${port}`)
})