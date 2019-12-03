// quote generator code

$(document).ready(function(){
  getNewQuote();
});

 $(".quote-btn").click(function(){
   getNewQuote();
 });

 function getNewQuote(){
   $.ajax({
  type: 'GET',
  dataType: 'json',
   cache: false,
  url: 'http://quotes.stormconsultancy.co.uk/random.json',
  success: function(data){
    $(".quote").show();
    $(".author-name").show();
    $(".text").html(data.quote + "<br>");
    $(".author-name").html(data.author);
  }
});   
  }