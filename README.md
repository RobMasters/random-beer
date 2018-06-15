This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Random Beer App

### Setup instructions

Simply clone this repository, and run:

```
npm install
npm run start
```

This will start the app at http://localhost:3000 and will proxy requests
to the brewerydb API via http://localhost:3001.

### Summary

Things that have been implemented:

* Application routing:
  * `/`: generate a random beer
  * `/beer/<id>`: show beer details (can reload this URL to load specific beer)
  * `/brewery/<id>`: show brewery details (can reload this URL to load a specific brewery)
* Flow (React redux)
* Redux middleware: routing and thunks
* Ant Design library, for general layout bootstrapping
* CORS proxy server


Things that I'd like to do with more time:

* Testing
* Abstracting out common behaviours. e.g. async requests and handling their loading states
