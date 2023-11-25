require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { BskyAgent } = require("@atproto/api");
const { send } = require("process");

async function sendPostWithImage(imagePath, text) {
  if (!fs.existsSync(imagePath)) {
    throw new Error("File does not exist! Try again.");
  }

  const fileExtension = path.extname(imagePath).toLowerCase();
  if (fileExtension !== ".jpg" && fileExtension !== ".png") {
    throw new Error("Only jpg and png files are supported at this time.");
  }

  const agent = new BskyAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier: process.env.IDENTIFIER,
    password: process.env.PASSWORD,
  });

  const imageBytes = await fs.promises.readFile(imagePath);
  const encoding = fileExtension === ".jpg" ? "image/jpeg" : "image/png";

  const testUpload = await agent.uploadBlob(imageBytes, { encoding });

  return await agent.post({
    text: text,
    embed: {
      images: [
        {
          image: testUpload.data.blob,
          alt: "Greentext",
        },
      ],
      $type: "app.bsky.embed.images",
    },
  });
}

sendPostWithImage("./img/1303084653119.jpg", "Tester text")
  .then(() => {
    console.log("Post sent!");
  })
  .catch((error) => {
    console.log("Post failed:", error.message);
  });
