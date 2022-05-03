import express from "express"
import { initControllers } from "./controllers"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
initControllers(app);
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`app served on http://localhost:${port}`)
})