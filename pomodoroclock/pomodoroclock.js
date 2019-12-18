$(document).ready(function () {
  var beep = $("#beep");
  var breakCount = parseInt($("#break-length").html());
  var sessionCount = parseInt($("#session-length").html());
  var timeCount = parseInt($("#time-left").html());

  // timer functionality 

  $("#start_stop").click(function (){ 
    var counter = setInterval(timer, 1000);
    sessionCount*=60;

    function timer() { 
      timeCount -= 1;
      if(timeCount === 0){ 
        beep.play();
        clearInterval(counter)
      }

      $("#time-left").html(sessionCount);
    }
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



});


