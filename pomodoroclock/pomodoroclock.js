$(document).ready(function () {
  var beep = $("#beep");
  var breakCount = parseInt($("#break-length").html());
  var sessionCount = parseInt($("#session-length").html());
  var timeCount = parseInt($("#time-left").html());


  console.log(breakCount);
  console.log(sessionCount);
  console.log(timeCount);

  // timer functionality not currently working....

  $("#start_stop").click(function () {
    var seconds = 0;
    var interval;
    function timer(mins) {
      seconds = mins * 60 || 0;
      interval = setInterval(function () {
        seconds--;
        if (!seconds) {
          clearInterval(interval);
          beep.play();
        }
      }, 1000)
    }
    $("#time-left").html(sessionCount);
  });


  // break time controls

  $("#break-increment").click(function () {
    if (breakCount < 60) {
      breakCount += 1;
      $("#break-length").html(breakCount);
    }
  });

  $("#break-decrement").click(function () {
    if (breakCount > 1) {
      breakCount -= 1;
      $("#break-length").html(breakCount);
    }
  });


  // session time controls

  $("#session-increment").click(function () {
    if (sessionCount < 60) {
      sessionCount += 1;
      $("#session-length").html(sessionCount);
    }
  });

  $("#session-decrement").click(function () {
    if (sessionCount > 1) {
      sessionCount -= 1;
      $("#session-length").html(sessionCount);
    }
  });


  // Reset controls 

  $("#reset").click(function () {
    sessionCount = 25;
    breakCount = 5;
    timeCount = 25;
    $("#break-length").html(breakCount);
    $("#session-length").html(sessionCount);
    $("#time-left").html(timeCount);
  });
});


// Getting the minutes from total seconds 
// var minutes = Math.floor(time / 60);