var trainCount = 1;

//  On Click event associated with the add-train function
$("#add-train").on("click", function(event) {
// prevent form from submitting
event.preventDefault();

// Get values from textbox, store in variable

var tName = $("#tName").val().trim();
var tDest = $("#tDest").val().trim();
var tTime = $("#tTime").val().trim();
var tFreq = $("#tFreq").val().trim();

// Create a new variable that will hold a "<p>" tag.
var p = $("<p>").attr("id", "item-" + toDoCount);

// Then give it an ID in the following form:
// "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
// Then set the to-do "value" as text to this <p> element.
p.text(todoText);

// Create a button with unique identifiers based on what number it is in the list.
// Again use jQuery to do this.
var button = $("<button>").attr("id", toDoCount);
// Give your button a data attribute called data-to-do and a class called "checkbox".
button.attr("data-to-do", toDoCount)
button.addClass("checkbox");
// Lastly add the letter X inside.
button.text("✓");






var trainArray = [];

function addTrainHTML (trainTask) {
    var trainItem = $("<td>") //var that holds table row tag
    trainItem.attr("id","item-" + trainCount); //give id in item-# form, # equal to trainCount
    trainItem.text(trainTask); //Set train "value" as text to table row element

    var trainClose = $("<button>");
    trainClose.attr("data-to-do", trainCount);
    trainClose.addClass("checkbox");
    trainClose.text("✓");


    trainItem = trainItem.prepend(trainClose);

    $("#train-table").append(todoItem);
    $("#train-table").val("");
}

/*

    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
