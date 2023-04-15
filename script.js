// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM D"));

for (var hour = 9; hour <= 17; hour++) {
    
    var $row = $("<div>").addClass("row time-block");
    
    var $hourCol = $("<div>")
    .addClass("col-2 col-md-1 hour text-center py-3")
    .text(dayjs().hour(hour).format("hA"));

    var $textCol = $("<textarea>")
    .addClass("col-8 col-md-10 description")
    .val(localStorage.getItem("hour-" + hour));

    var $saveBtnCol = $("<button>")
    .addClass("btn saveBtn col-2 col-md-1")
    .attr("aria-label", "save")
    .html('<i class="fas fa-save" aria-hidden="true"></i>');

    $row.append($hourCol, $textCol, $saveBtnCol);

    $(".container-fluid").append($row);
}


    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    $(".saveBtn").on("click", function () {
        var hour = $(this).closest(".time-block").attr("id");
        var text = $(this).siblings(".description").val();
        localStorage.setItem(hour, text);
      });

      function updateTimeBlocks() {
        var currentHour = dayjs().hour();
      
    $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);

        if (blockHour < currentHour) {
            $(this).removeClass("future present").addClass("past");
        } else if (hour === currentHour) {
            $(this).removeClass("past future"). addClass("present");
        } else {
            $(this).removeClass("past present"). addClass("future");
        }
    });
}
  
      $(document).ready(function() {
        updateTimeBlocks();

        setInterval(updateTimeBlocks, 60000);
      });