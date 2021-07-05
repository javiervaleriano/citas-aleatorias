window.addEventListener('DOMContentLoaded', function() {
  getQuotes();
});

const card = document.querySelector('.card'),
      newQuote = document.getElementById('new-quote');


function renderQuote(json) {
  const quotes = json.citas;
  const random = Math.floor(Math.random() * quotes.length);
  
  setTimeout(() => {
    card.querySelector('.card-img-top').src = quotes[random].imagen;
    card.querySelector('.card-img-top').alt = quotes[random].autor;
    card.querySelector('#text').textContent = quotes[random].cita;
    card.querySelector('#author').textContent = `- ${quotes[random].autor}`;
  }, 350);
  
  const color = colorReturned();
  
  document.querySelector('body').style.backgroundColor = color;
  document.querySelectorAll('.btns-container .btn').forEach(btn => {
    btn.style.backgroundColor = color;
  });
  
  document.getElementById('tweet-quote').setAttribute('href', `https://www.twitter.com/intent/tweet?hashtags=citas&related=freecodecamp&text="${quotes[random].cita}" ${quotes[random].autor}`);
}

function getQuotes() {
  fetch('https://gist.githubusercontent.com/javiervaleriano/e1e5176d7c173efca65c090d2bc3080a/raw/67b4c017be8c68d154d979792325f73df9cbfaa9/json')
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(json => {
    renderQuote(json);    
  })
  .catch(() => {
    console.log('error');
  });
}

newQuote.addEventListener('click', function() {
  const animateElements = [card.querySelector('.card-img-top'), card.querySelector('#text'), card.querySelector('#author')];
  
  animateElements.forEach(elm => {
    elm.classList.add('fade-quote');
    
    setTimeout(() => {
      elm.classList.remove('fade-quote');
    }, 1250);
  })
  
  getQuotes();
});

function colorReturned() {
  const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  
  let color = '#';
  
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * characters.length)];
  }
  
  return color;
}