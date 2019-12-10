
// Sound library 

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3";
  obj.id = 'Heater-1';
  $("#Q").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3";
  obj.id = 'Heater-2';
  $("#W").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3";
  obj.id = 'Heater-3';
  $("#E").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3";
  obj.id = 'Heater-4';
  $("#A").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});


$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3";
  obj.id = 'Clap';
  $("#S").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3";
  obj.id = 'Open-HH';
  $("#D").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3";
  obj.id = 'Kick-n-Hat';
  $("#Z").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3";
  obj.id = 'Kick';
  $("#X").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});

$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3";
  obj.id = 'Closed-HH';
  $("#C").click(function () {
    obj.play();
    $("#type").text(obj.id);
  });
});




