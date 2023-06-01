# __CloudCanvas__

CloudCanvas is a React based web app to create, read, update and delete notes to remember tasks and other things along with user privacy via login and authentication.

## Clone the repo
* Open your terminal.

* Change the current working directory to the location where you want to clone the repository.

* Run the following command to clone the repository:
```bash
git clone https://github.com/nmnarora600/cloudcanvas.git
```


## Installing the Required Dependencies

After cloning the repo run run following commands to install required node modules.

* check in to CloudCanvas
```bash
cd cloudcanvas
```
* install node modules for frontend
```bash
npm install
```
* check in backend
```bash
cd ./backend
```
* install node modules for backend
```bash
npm install
```

## Setting Environment variables
To start using the app you must create an environment (.env) file in root of cloudcanvas folder and set following values.


```bash
PORT="PORT-TO RUN-THE-APP
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_PORT="BACKEND-PORT-ADDRESS"
```
I am using PORT=3002, and WDS_SOCKET-PORT 3003.

## How to Run

After following above steps just open the frontend folder in cmd, powershell etc.
```bash
cd Path/to/the/repo/cloudcanvas
```
* Run the following command to start app

```bash
npm run both
```
* Open your Browser and go to the following link to see your app 

```bash
http://localhost:<YOUR-FRONTEND-PORT>/
```

## Deployed Version
* Alternatively, you can also access the deployed version of this application at __[Link](https://cloudcanvas.icodewithcoffee.ml)__.

* Please note that the deployed version is primarily for demonstration purposes and may not have the complete functionality or the latest updates found in the source code.

## Disclaimer

* This application is for educational purposes only and should not be used for commercial purposes. The information, code, and data provided are meant as educational examples and should not be integrated into any commercial application.


## Contributing

* Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

* Please make sure to update tests as appropriate.

