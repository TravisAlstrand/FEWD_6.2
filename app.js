const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = phrase.firstElementChild;
const overlay = document.getElementById('overlay');
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
  overlay.style.display = 'none';
  getRandomPhraseAsArray(phrases);
})

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
  
};