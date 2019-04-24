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
    

    // trainTOA = trainTime + trainFrq
    // trainMinutesAway = trainTime - currentTime
    

    // Calculate the next time of arrival
    var trainTOA = trainTime;
    
    // Prettify the next arrival time
    var PrettyTOA = moment(trainTime, "HH:MM"); 


    // Calculate the Minutes Away
    // var trainMinutesAway = PrettyTOA - currentTime;
    

    console.log(trainTOA)
    console.log(PrettyTOA);
    //console.log(trainMinutesAway);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDst),
      $("<td>").text(trainFrq),
      $("<td>").text(trainTime)
      //$("<td>").text(trainTOA),
      //$("<td>").text(trainMinutesAway)
      
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });

});