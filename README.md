# Getting Started with ReactJS Frontend Blog App

In the project directory, you can run:

## `yarn start`

This script is used to run the frontend blog app on your local env.

Before running the above script, update file .env.development. Make sure the backend server is running with a dedicated port. If the server is running on your local environment with port 9000 and ReactJS Frontend Blog App is on port 3000, then use the following configuration:
```
REACT_APP_BACKEND_SERVER_URL=http://localhost:9000
PORT=3000
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `yarn build`

Before running the above script, update file .env.production. Make sure the backend server is running with a dedicated port. If the server is running on port 9000 and ReactJS Frontend Blog App is on port 8080, then use the following configuration:
```
REACT_APP_BACKEND_SERVER_URL=<REPLACE_ME_WITH_YOUR_BACKEND_SERVER_URL>:9000
PORT=8080
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
Alternatively, you can use npm to achive the same results.
```bash
$ npm run build
```

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
