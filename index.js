require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { BskyAgent } = require("@atproto/api");

function getGreentext(dirPath) {
  const files = fs.readdirSync(dirPath);
  const index = Math.floor(Math.random() * files.length);
  return path.join(dirPath, files[index]);
}

async function sendPost(text) {
  const agent = new BskyAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier: process.env.IDENTIFIER,
    password: process.env.PASSWORD,
  });
  await agent.uploadBlob({ text });
}

const randomFile = getGreentext("./img");
console.log(randomFile);

sendPost("How's this?");
