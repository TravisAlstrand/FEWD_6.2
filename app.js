const qwerty = document.getElementById('qwerty');
const buttons = document.querySelectorAll('button');
const phrase = document.getElementById('phrase');
const phraseUl = phrase.firstElementChild;
const overlay = document.getElementById('overlay');
const hearts = document.querySelectorAll('.tries img');
const startButton = document.querySelector('.btn__reset');

let missed = 0;
const phrases = [
  'i hate thinking of phrases',
  'greatest phrase of all time',
  'this phrase is alright i guess',
  'worst phrase ever',
  'you have never seen a better phrase'
];

startButton.addEventListener('click', () => {
  startNewGame();
});

const startNewGame = () => {
  const phraseLis = phraseUl.children;
  if (phraseLis.length) {
    phraseUl.innerHTML = '';
  }
  missed = 0;
  getRandomPhraseAsArray(phrases);
  buttons.forEach(button => {
    button.disabled = false;
    button.className = '';
  })
  hearts.forEach(heart => {
    heart.src = './images/liveHeart.png';
  })
  overlay.style.display = 'none';
};

const getRandomPhraseAsArray = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  const lettersArray = arr[randomNumber].split('');

  addPhraseToDisplay(lettersArray);
};

const addPhraseToDisplay = (arr) => {
  arr.forEach(letter => {
    const li = document.createElement('li');
    li.textContent = letter;
    if (li.textContent === ' ') {
      li.classList.add('space');
    } else {
      li.classList.add('letter');
    }
    phraseUl.appendChild(li);
  })
}

const checkLetter = (button) => {
  const btnLetter = button.innerHTML;
  const phraseLetters = document.querySelectorAll('.letter');
  let match = null;
  phraseLetters.forEach(letter => {
    if (letter.innerHTML === btnLetter) { 
      letter.classList.add('show');
      match = letter.innerHTML;
    }
  })
  return match;
};

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    button.classList.add('chosen');
    button.disabled = true;

    const letterFound = checkLetter(button);

    if (letterFound === null) {
      hearts[missed].src = './images/lostHeart.png';
      missed++;
    }

    checkWin();
  }
})

const checkWin = () => {
  const shownLetters = document.querySelectorAll('.show');
  const phraseLetters = document.querySelectorAll('.letter');
  if (shownLetters.length === phraseLetters.length && missed < 5) {
    overlay.className = '';
    overlay.classList.add('win');
    overlay.firstElementChild.innerHTML = 'You Won!';
    overlay.lastElementChild.innerHTML = 'Play Again?';
    overlay.style.display = 'inherit';
  } else if (missed >= 5) {
    overlay.className = '';
    overlay.classList.add('lose');
    overlay.firstElementChild.innerHTML = 'You Lost!';
    overlay.lastElementChild.innerHTML = 'Play Again?';
    overlay.style.display = 'inherit';
  }
}