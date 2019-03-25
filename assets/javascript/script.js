//1. When Submit button is clicked...
$("#add_button").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();


//2. Grab text from namein the form.
var Name = $("#name-input").val().trim();

// 2.5 Append it to table as a new row.


//3. Grab text from destination in form and append it in new column, same row.
var Dst = $("#dst-input").val().trim();


//4. Grab text from (military time) train-time in form.
var Time = $("#time-input").val().trim();


//5. Grab text from frequency and append it.
var Frq = $("#frq-input").val().trim();

//6. Calculate when next train will arrive relative to current time and append it.


//7. Calculate the minutes away and append it.

