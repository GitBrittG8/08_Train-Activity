$(function() {

  var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  $("#current-date").append(currentDate);

  // 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOhQcF1FSCTHK1-xiFVTh9meYqrm3q6Qo",
    authDomain: "train-station-62cf4.firebaseapp.com",
    databaseURL: "https://train-station-62cf4.firebaseio.com",
    projectId: "train-station-62cf4",
    storageBucket: "train-station-62cf4.appspot.com",
    messagingSenderId: "530870365803"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  // 2. Button for adding train
  $(document).on("click", "#new_train",function () {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDst = $("#dst-input").val().trim();
    var trainFirstTime = $("#time-input").val().trim();
    var trainFrq = $("#frq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dst: trainDst,
      frq: trainFrq,
      time: trainFirstTime
    };

    
    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dst);
    console.log(newTrain.time);
    console.log(newTrain.frq);

    alert("Train successfully added");

    // Clears text-boxes
    $("#name-input").val("");
    $("#dst-input").val("");
    $("#time-input").val("");
    $("#frq-input").val("");
  });

  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDst = childSnapshot.val().dst;
    var trainFrq = childSnapshot.val().frq;
    var trainTime = childSnapshot.val().time;

    // Train Info
    console.log(trainName);
    console.log(trainDst);
    console.log(trainFrq);
    console.log(trainTime);
    
    
    // Prettify the arrival time
    var trainTOA = moment(trainTime, "HH:MM"); 

    console.log(trainTOA)


    //Splices time into moment hours and mins
    if (trainFrq && trainTime) {
      var timeArr = trainTime.split(":");
      var momentTrainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), momentTrainTime);
      var tMinutes;
      var tArrival;

      // If the first train is later than the current time, sent arrival to the first train time
      if (maxMoment === momentTrainTime) {
        tArrival = momentTrainTime.format("hh:mm A");
        tMinutes = momentTrainTime.diff(moment(), "minutes");
      } else {
        // Calculate the minutes until arrival using hardcore math
        // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
        // and find the modulus between the difference and the frequency.
        var differenceTimes = moment().diff(momentTrainTime, "minutes");
        var tRemainder = differenceTimes % trainFrq;
        tMinutes = trainFrq - tRemainder;
        // To calculate the arrival time, add the tMinutes to the current time
        tArrival = moment()
          .add(tMinutes, "m")
          .format("hh:mm A");
      }
      console.log("tMinutes:", tMinutes);
      console.log("tArrival:", tArrival);
    }

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDst),
      $("<td>").text(trainFrq),
      $("<td>").text(trainTime),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });

});