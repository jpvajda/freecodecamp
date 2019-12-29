
$(document).ready(function () {
  var beep = $("#beep");
  var breakCount = parseInt($("#break-length").html());
  var sessionCount = parseInt($("#session-length").html());
  var timeCount = parseInt($("#time-left").html());

  //audio beep function 

  var audio = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound113.wav');
  function beep() {
    audio.play();
  }

  // double digit numbers function 

  function pad(val) {
    return ('00' + val).slice(-2);
  }

  // timer functionality not currently working....
  
  
  // @TODO

  // 1. on click start_stop timer based on SessionRemain variable 
  // 2. Run timer 
  // 3. on click of start_stop pause timer, (repeat 1 if clicked again)
  // 4. allow for clearing of timer and reset back to default SessionRemain 
  // 5. Time should be shown in MM:SS 
  // 6. At end of SessionRemain, start break timer using breakRemain variable,
  // 7. on click of start_stop pause timer, (repeat 6 if clicked again)
  // 8. allow for clearing of timer and reset back to default BreakRemain 
  // 9. at the end of both timers, play beep variable audio 

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


  // reset controls 

  $("#reset").click(function () {
    sessionCount = 25;
    breakCount = 5;
    timeCount = 25;
    $("#break-length").html(breakCount);
    $("#session-length").html(sessionCount);
    $("#time-left").html(timeCount);
  });
});
