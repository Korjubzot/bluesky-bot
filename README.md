# bluesky-bot
Node.js script that pushes a random image to a Bluesky social media account twice a day

## Getting Started

These instructions will walk you through running this script on your local machine for development and testing purposes.

### Requirements

- Node.js
- npm
- A [Bluesky](https://bsky.app/) account

### Installation

1. Clone the repository to your local.
```
git clone https://github.com/Korjubzot/bluesky-bot
```
2. Navigate to project directory.
```
cd bluesky-bot
```
3. Install dependencies.
```
npm install
```
4. Create a .env file in your root directory and add your Bluesky credentials.
```
IDENTIFIER=your_identifier
PASSWORD=your_password
```
Identifier should be your Bluesky username, without the @ symbol attached (i.e. billywalker.bsky.social). Your password _can_ be your account password, but Bluesky recommends using App Passwords for security. You can generate one under Settings > Advanced > App Passwords.

5. Add images to the ```/img``` directory.

Bluesky currently supports just .png and .jpg file formats, and this bot requires a minimum of two images in the folder to operate properly.

### Usage

Run ```node index.js``` to run this script a single time. 

The way this code works is that it first logs in to Bluesky using your credentials, then selects a random image from the ```/img``` folder. If that images filename doesn't exist in ```usedImages.json```, it's valid to post - otherwise, it looks for a new image. 
Posting to Bluesky requires uploading the image as a Blob(```agent.uploadBlob```) then pairing that blob with a regular post request (```agent.post```). The script sends that post with our filename as the main text. Bluesky logins only last a few minutes before automatically logging out, so there's no need for a logout function.
