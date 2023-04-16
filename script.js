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


    
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
   
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
        } else if (blockHour === currentHour) {
            $(this).removeClass("past future"). addClass("present");
        } else {
            $(this).removeClass("past present"). addClass("future");
        }
    });
}
  
      $(document).ready(function() {
        updateTimeBlocks();

        for (var i =9; i <= 17; i++) {
            var textArea = $("#hour-" + i + " textarea");
            var savedInput = localStorage.getItem("hour-" + i);
            if (savedInput !== null) {
                textArea.val(savedInput);
            }
        }
        

        setInterval(updateTimeBlocks, 60000);
      });

