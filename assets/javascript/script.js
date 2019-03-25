// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Calculate the minutes away. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate Next Arrival

// 1. Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: ""
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
$("#add_button").on("click", function(event) {
    event.preventDefault();

    var Name = $("#name-input").val().trim();
    var Dst = $("#dst-input").val().trim();
    var Time = $("#time-input").val().trim();
    var Frq = $("#frq-input").val().trim();
    //var Next = ...
    //var Min = ...

    console.log(Name);
    console.log(Dst);
    console.log(Time);
    console.log(Frq);

    // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: Name,
    destination: Dst,
    time: Time,
    frequency: Frq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  console.log("Train successfully added");

  // Clears all of the text-boxes
  $("#-name-input").val("");
  $("#dst-input").val("");
  $("#time-input").val("");
  $("#frq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDst = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDst);
  console.log(trainTime);
  console.log(trainFrq);

  // Prettify the Next Arrival Time
  var nextArrivalPretty = moment.unix(nextArrival).format("HH:MM --military time");





  // Calculate the next arrival

  var nextArrival = Frq + trainTime;
  
  // Calculate the Minutes away

  var minsAway = nextArrival - currentTime;

  console.log(minsAway);






  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDst),
    $("<td>").text(trainFrq),
    $("<td>").text(nextArrivalPretty),
    $("<td>").text(minsAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
/*

    // Clear localStorage
    localStorage.clear();

    // Store all content into localStorage
    localStorage.setItem("name", Name);
    localStorage.setItem("destination", Dst);
    localStorage.setItem("time", Time);
    localStorage.setItem("frequency", Frq);
});

// By default display the content from localStorage
$("#name-display").text(localStorage.getItem("name"));
$("#destination-display").text(localStorage.getItem("destination"));
$("#time-display").text(localStorage.getItem("time"));
$("#frequency-display").text(localStorage.getItem("frequency"));

//1. Calculate when next train will arrive relative to current time and append it.
//2. Calculate the minutes away and append it.