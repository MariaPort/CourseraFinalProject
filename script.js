function memojiGame() {
  let emojiArr = ['🐷', '🐞', '🐙', '🦄', '🦀', '🐵', '🐷', '🐞', '🐙', '🦄', '🦀', '🐵'];
  let cards = document.querySelectorAll('.item-img--front');
  let emojiImages = document.querySelectorAll('.item-img--back');
  let clickCounter = 0;
  let inter;

  shuffleCards(emojiArr);

  function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    emojiImages.forEach((emojiImage, i) => {
      emojiImage.innerText = arr[i];

    });
  }

  let currentPair = [];
  function addOpen(e) {

    if (clickCounter === 0){
      inter = setInterval(refresh, 1000);
      clickCounter++;
    }

    if (currentPair.length === 2) {
      currentPair.forEach(elem => {
        if (elem.classList[2] === 'incorrect') {
          elem.parentElement.classList.remove('open');
          elem.classList.remove('incorrect');
        }
      });
      currentPair = [];
    }

    e.target.parentNode.classList.add('open');

    currentPair.push(e.target.previousElementSibling);


    if (currentPair.length === 2){
      if (currentPair[0].innerHTML === currentPair[1].innerHTML){
        currentPair.forEach(elem => elem.classList.add('correct'));
        correctCardsCounter();
        currentPair = [];
      } else {
        currentPair.forEach(elem => elem.classList.add('incorrect'));
      }
    }
  }


  function correctCardsCounter() {
    let correctCards = document.querySelectorAll('.correct');
    if(correctCards.length === 12) {
      setTimeout(winPopUpOpen, 600);
    }
  }

  let popUp = document.querySelector('.pop-up-window');

  function winPopUpOpen() {
    clearInterval(inter);
    popUp.classList.add('modal-open', 'win')
  }

  function losePopUpOpen() {
    popUp.classList.add('modal-open', 'lose')
  }



  function refresh()  {
    if (document.querySelector('.timer__seconds').innerText === '00'){
      document.querySelector('.timer__seconds').innerText = '60';
    }

    let sec = document.querySelector('.timer__seconds').innerText;
    let min = '00';
    document.querySelector('.timer__minutes').innerText = min;
    let secondsSpan = document.querySelector('.timer__seconds');
    sec--;

    if (sec <= 9){
      sec="0" + sec;
    }

    secondsSpan.innerText = sec;


    if(min === '00' && sec === '00'){
      sec = "00";
      clearInterval(inter);
      losePopUpOpen();
    }
  }

  function startAgain() {
    document.querySelectorAll('.incorrect').forEach(item => item.classList.remove('incorrect'));
    document.querySelectorAll('.correct').forEach(item => item.classList.remove('correct'));
    cards.forEach(item => item.parentElement.classList.remove('open'));
    shuffleCards(emojiArr);
    document.querySelector('.timer__seconds').innerText = '00'
    document.querySelector('.timer__minutes').innerText = '01'
    clickCounter = 0;
    currentPair = [];

    if (popUp.classList[2] === 'win') {
      popUp.classList.remove('modal-open', 'win');
    } else {
      popUp.classList.remove('modal-open', 'lose');
    }
  }

  cards.forEach(card => card.addEventListener('click', addOpen));
  /*alredyClickedCards.forEach(alredyClickedCard => alredyClickedCard.addEventListener('click', preventClick));*/
  document.querySelectorAll('.pop-up__btn').forEach(item => item.addEventListener('click', startAgain));
}