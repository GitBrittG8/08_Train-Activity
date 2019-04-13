// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Calculate the minutes away. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate Next Arrival

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDOhQcF1FSCTHK1-xiFVTh9meYqrm3q6Qo",
    authDomain: "train-station-62cf4.firebaseapp.com",
    databaseURL: "https://train-station-62cf4.firebaseio.com",
    storageBucket: "train-station-62cf4.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
