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

### Automating

The easiest way to use automate this code is to use GitHub Actions.

1. Fork the repository to your own GitHub.
2. Go to repo settings.
3. Navigate to Security > Secrets and variables > Actions.
4. Add two new Repository Secrets - one for your handle, and one for your password. They'll be the same as your ```IDENTIFIER``` and ```PASSWORD``` credentials above. Make sure to name them as IDENTIFIER and PASSWORD.
5. Inside the ```.github/workflows``` directory is a file called ```post.yml``` that GitHub Actions uses to run this script. You can modify the cron here to adjust timing.
```
on:
  schedule: 
    - cron: "30 5,17 * * *"
```
This is the default setting - twice a day, at 17:30pm and 5:30am. You can use [crontab](https://crontab.guru/) to change the timing.

```
0 22 * * 1-5
```
The above will post at 10:00pm every night from Monday to Friday. Play around with the timing until you feel happy with the post.

### Known Issues

- Bluesky appears to have some minor bugs relating to image size limit and may be incorrectly calculating image sizes after compression, preventing posting under certain circumstances.

### To Do

- Improve error handling.
- Parameterize host URL, improve format checking logic.
- General code clean up.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
