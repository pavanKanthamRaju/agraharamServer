const redis = require("redis");
const client  =redis.createClient();

client.on("error",(err)=>{
    console.error("reddis Error : ",err )
})

client.on("connect",()=>{
    console.log("Redis connected successfully....")
})

client.connect();
module.exports = client;