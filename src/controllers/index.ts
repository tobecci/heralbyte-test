import { Express } from "express"
import rootController from "./root.controller";
import userController from "./user.controller"

export function initControllers(app: Express){
    const controllers = [ rootController, userController ];
    controllers.forEach((controller) => {
        controller(app);
    })
}