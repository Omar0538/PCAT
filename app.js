const express=require("express")
const app=express()
const port=3000;

app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})
app.listen(port,()=>{
    console.log(`OUR SSEVER IS STARTING ${port}`);
})