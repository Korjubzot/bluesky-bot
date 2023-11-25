require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { BskyAgent } = require("@atproto/api");

async function sendPostWithImage(imagePath) {
  if (!fs.existsSync(imagePath)) {
    throw new Error("File does not exist! Try again.");
  }

  const fileName = path.basename(imagePath);

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

  const postResult = await agent.post({
    text: fileName,
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

  return { postResult, fileName };
}

sendPostWithImage("./img/1303180676400.jpg")
  .then(({ fileName }) => {
    console.log(`Post sent with image: ${fileName}!`);
  })
  .catch((error) => {
    console.log("Post failed:", error.message);
  });
