import express from "express"

console.log("hajimemashite");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`app served on http://localhost:${port}`)
})