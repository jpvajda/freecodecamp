// JS Starter file 

$(document).ready(function(){ 
  var buzzer =$("#beep")[0];
  var count = parseInt($("#break-length").html());
 
$("#reset").hide(); 

$("#break-decrement").click(function() { 
 count -= 1;
 $("#break-length").html(count);
});

});


