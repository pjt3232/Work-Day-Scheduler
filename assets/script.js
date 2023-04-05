//.ready() is a jQuery function that waits for the HTML document to be fully loaded before running the JavaScript code inside the function
$(document).ready(function () {
    //grabs the current day for the main header
    var currentDay = dayjs().format("DD MMMM YYYY");
    $("#currentDay").text(currentDay);
    
    //sets the work hours and grabs the planner element
    var workHours = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"];
    var planner = $(".container-fluid");

    //for loop that creates the time block, time, and description for each work hour and adds classes
    for(var i = 0; i < workHours.length; i++) {
        var timeBlockEl = $("<div>").addClass("row time-block");
        var timeEl = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(workHours[i]);
        var descriptionEl = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");

        //adds different colored class depending on the dayjs().hour() function
        //i + 8 because the work hours don't start until 8AM and go till the length of the workHours array
        if(dayjs().hour() > i + 8) {
            descriptionEl.addClass("past");
        } else if (dayjs().hour() === i + 8) {
            descriptionEl.addClass("present");
        } else {
            descriptionEl.addClass("future");
        }

        //creates a save button with a save button icon class
        var saveBtn = $("<button>").addClass("saveBtn btn col-2 col-md-1").html("<i class='fas fa-save'></i>");
        saveBtn.attr("aria-label", "save");
        saveBtn.find("i").attr("aria-hidden", "true");
        //retrieves the local storage of the item that's assigned to the particular time
        var savedEvent = localStorage.getItem(workHours[i]);

        //if there's information tied to the local storage of a particular time the description value will be that value
        if(savedEvent) {
            descriptionEl.val(savedEvent);
        }

        //for each time in the workHours array there will be an appended time, description, and save button in the HTML
        timeBlockEl.append(timeEl, descriptionEl, saveBtn);
        planner.append(timeBlockEl);   
    }

    //action to be done when you click the save button
    $(".saveBtn").on("click", function() {
        //grabs where the click took place and grabs that time-block/parent element
        var timeBlock = $(this).parent() ;
        //this finds the resulting child element of the time block whose class is represented by ".description"
        var descriptionEl = timeBlock.find(".description");
        //assigns event to be the value of the descriptionEl
        var event = descriptionEl.val();
        //this finds the resulting child element of the time block whose class is represented by ".hour" and grabs its text
        var time = timeBlock.find(".hour").text();
        //sets the value of the local storage item to a key of time and then saves the event
        localStorage.setItem(time, event);
    });
});

