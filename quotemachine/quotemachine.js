// quote generator code

const newQuoteButton = document.querySelector('#new-quote');
newQuoteButton.addEventListener('click', getQuote);

const tweetQuoteButton = document.querySelector('#tweet-quote');
tweetQuoteButton.addEventListener('click', tweetQuote);

const endpoint = 'https://quotes.stormconsultancy.co.uk/random.json';

function getQuote() {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayQuote(data.quote, data.author);
      // console.log(data.quote, data.author);
    })
    .catch(function () {
      console.log("An error occurred.")
    });
};

function displayQuote(quote, author) {
  const quoteText = document.querySelector('#text');
  const quoteAuthor = document.querySelector('#author');
  quoteText.textContent = quote;
  quoteAuthor.textContent = author;
};


function tweetQuote(quote){ 
  const quoteText = document.querySelector('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+ 
  encodeURIComponent('"' + quote + '" ' + author));
  quoteText.textContent = quote;
  
 

};
