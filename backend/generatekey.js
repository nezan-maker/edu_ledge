import crypto from "crypto";
const key = crypto.randomBytes(32).toString("base64url");
console.log(key);
