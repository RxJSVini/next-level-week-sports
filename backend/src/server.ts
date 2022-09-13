import express from "express";

const app = express();

app.get('/ads', (req, res)=>{
    return res.json({
        status:true
    })
})

app.listen(process.env.PORT || 3333, () => console.log(' Backend NLW Sports 🚀'))