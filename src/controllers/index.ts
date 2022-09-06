import { Express } from "express"
import { Sequelize } from 'sequelize';

import rootController from "./root.controller";
import userController from "./user.controller"

export function initControllers(app: Express, sequelize: Sequelize){
    const controllers = [ rootController, userController ];
    controllers.forEach((controller) => {
        controller(app, sequelize);
    })
}