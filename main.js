const express = require("express");
const app = express();
app.use(express.json());
const users =[
{
    name:"harkirat",
    kidneys:[
        {
            healthy:false
        }
    ]
}
]
app.get("/",(req,res)=>{
    const harkiratkidneys =users[0].kidneys;
    const numberOfKidneys = harkiratkidneys.length;
    let healthyKidney =0;
    for(let i =0;i<numberOfKidneys;i++){
        if(harkiratkidneys[i].healthy){
            healthyKidney++;
        }
    }
    let unhealthyKidneys =numberOfKidneys -healthyKidney;
    res.json({
        numberOfKidneys,
        healthyKidney,
        unhealthyKidneys
    })
})
app.post("/",(req,res)=>{
    const ishealthy =req.body.ishealthy
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({

    })
})
app.put("/",(req,res)=>{
    for(let i =0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            users[0].kidneys[i].healthy =true;
        }
    }
    res.json({
        msg:"done"
    })
})
app.delete("/",(req,res)=>{
    const atleastone =checkAtleastOneUnhealthy();
    if(atleastone){
        let newkidney =[];
        for(let i =0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
               newkidney.push(users[0].kidneys[i]) 
            }
        }
        users[0].kidneys =newkidney;
        res.json({
            msg:"done"
        })
    }else{
        res.status(411)
        res.json({
            msg:"you have healthy kidneys"
        })
    }

})
function checkAtleastOneUnhealthy(){
    // let atleastOneunhealthy=false;
    for(let i =0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
           return true;
           
        }else{
            return false;
        }
    }
}
app.listen(3000);