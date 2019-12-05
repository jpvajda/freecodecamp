// quote generator code

const newQuoteButton = document.querySelector('#new-quote');
newQuoteButton.addEventListener('click', getQuote);

const endpoint = 'https://quotes.stormconsultancy.co.uk/random.json';

function getQuote() {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayQuote(data.quote, data.author);
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

  // Tweet button functionality

  $('#tweet-quote').on("click", function () {
    var textToTweet = quote + author;
    var twtLink = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(textToTweet);
    window.open(twtLink, '_blank');

  });
};



