# Watson-Webchat

## Introduction 
This is a Node.js application that hosts a fullscreen web chat that integrates with IBM Watson Assistant. This application can be loaded into an iframe, which allows you to integrate it into a website.

## Prerequisites

- Install Node 12+ and npm (which is included with the node installer): [download page](https://nodejs.org/en/download/)
- You have a Watson Assistant project and enabled the [Web Chat integration](https://cloud.ibm.com/docs/assistant?topic=assistant-deploy-web-chat) (this requires the Plus or Premium plan)

## How to run the application

1. Open your favorite command line tool
2. `cd` to the root directory of this repository
3. Install dependencies
    - Run `npm install` (use `npm ci` when implementing CI/CD)
4. Setup environment variables
    - Copy the contents of the `env-example` file to a new file named `.env`
    - ❗️ Make sure to provide values for every variable listed below `# Required`
    - Read [Watson Assistant Web Chat - Getting started](https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=tutorials-getting-started) to find out how to get the Watson settings
5. Start the application
    - Run `npm run start`
6. The console should now show what the url is for accessing it

## Contribute

If you would like to contribute to this project, you are very welcome to do so. You can either fork this project and make Pull Requests from there, or [Create an issue](https://github.com/EdwinOtten/Watson-Webchat/issues/new) and ask me to add you as a collaborator.

## License

This software is published under the [ISC License](https://opensource.org/licenses/ISC). Which basically means _"free to use for whatever you want as long as you include the copyright notice"_, which you can find in the [LICENSE file](LICENSE)).

---

## What does it look like?

![Screenshot](readme-assets/screenshot.png)
