import http from "http";
import connectDB from "./db.js";
import bcrypt from 'bcrypt'
const server = http.createServer((req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    let body  = '';
    req.on('data',(chunk)=>{
        body += body.toString()
    });
    req.on('end',()=>{
        const {name,email,password} = JSON.parse(body)
    })
    
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port on ${PORT}`);
});
