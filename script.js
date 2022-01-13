'use strict';

let playing = true;

//SELECTING SECTION OF PLAYERS
const SECTION_ELS = document.querySelectorAll('.player');

// SELECTING DICE IMGAGE ELEMENT
const DICE_IMG_EL = document.querySelector('.dice');
DICE_IMG_EL.classList.add('hidden');

// SELECTING BUTTON ELEMENTS
const BTN_NEW_EL = document.querySelector('.btn--new');
const BTN_ROLL_EL = document.querySelector('.btn--roll');
const BTN_HOLD_EL = document.querySelector('.btn--hold');

// DECLARE START CURRENT SCORE AND MAIN SCORE OF PLAYERS
let currentScore = [0, 0];
let mainScore = [0, 0];

// SELECTING CURRENT SCORE AND MAIN SCORE ELEMENT OF PLAYERS
const CUR_SCRORE_ELS = document.querySelectorAll('.current-score');
const MAIN_SCORE_ELS = document.querySelectorAll('.score');
// Set Main Score = 0 At The Beginning
for (let i = 0; i < MAIN_SCORE_ELS.length; i++) {
  MAIN_SCORE_ELS[i].textContent = mainScore[i];
}
// RESET CURRENT SCORE FUNCTION
const resetCurrentScore = function (i) {
  currentScore[i] = 0;
  CUR_SCRORE_ELS[i].textContent = currentScore[i];
};

// ROLL DICE EVENT FUNCTIONALITY
BTN_ROLL_EL.addEventListener('click', function () {
  if (playing) {
    // Generating a radom dice roll
    let randomDiceNum = Math.trunc(Math.random() * 6) + 1;
    // Display dice image
    DICE_IMG_EL.src = `dice-${randomDiceNum}.png`;
    DICE_IMG_EL.classList.remove('hidden');
    // Check condition if roll to number 1 --> switch to other player
    for (let i = 0; i < SECTION_ELS.length; i++) {
      // If Roll To Number Different From Number 1
      if (randomDiceNum !== 1) {
        if (SECTION_ELS[i].classList.contains('player--active')) {
          console.log(`Player ${i + 1} Roll Dice : ${randomDiceNum}`);
          currentScore[i] = currentScore[i] + randomDiceNum;
          CUR_SCRORE_ELS[i].textContent = currentScore[i];
        }
        // If Roll To Nummber 1
      } else if (randomDiceNum === 1) {
        SECTION_ELS[i].classList.toggle('player--active');
        if (!SECTION_ELS[i].classList.contains('player--active')) {
          console.log(`Player ${i + 1} Roll Dice : ${randomDiceNum}`);
          // Reset Current Score When Roll Dice 1
          resetCurrentScore(i);
        }
      }
    }
  }
});

// HOLD BUTTON EVENT FUNCTIONALITY
BTN_HOLD_EL.addEventListener('click', function () {
  if (playing) {
    for (let i = 0; i < SECTION_ELS.length; i++) {
      if (SECTION_ELS[i].classList.contains('player--active')) {
        // DISPLAY MAIN SCORE WHEN PRESS HOLD
        mainScore[i] = mainScore[i] + currentScore[i];
        MAIN_SCORE_ELS[i].textContent = mainScore[i];
        // RESET CURRENT SCORE WHEN PRESS HOLD
        resetCurrentScore(i);
      }
      // WIN CONDITION
      if (mainScore[i] >= 30) {
        SECTION_ELS[i].classList.add('player--winner');
        SECTION_ELS[i].classList.remove('player--active');
        DICE_IMG_EL.classList.add('hidden');
        SECTION_ELS[i].querySelector('.name').textContent = `PLAYER ${
          i + 1
        } WIN`;
        return (playing = false);
      }
      // SWITCH TO OTHER PLAYER AFTER PRESS HOLD
      SECTION_ELS[i].classList.toggle('player--active');
    }
  }
});

// NEW BUTTON EVENT FUNCTIONALITY
BTN_NEW_EL.addEventListener('click', function () {
  for (let i = 0; i < SECTION_ELS.length; i++) {
    resetCurrentScore(i);
    mainScore[i] = 0;
    MAIN_SCORE_ELS[i].textContent = mainScore[i];
    if (SECTION_ELS[i].classList.contains('player--winner')) {
      SECTION_ELS[i].classList.remove('player--winner');
    }
    SECTION_ELS[0].classList.add('player--active');
    SECTION_ELS[i].querySelector('.name').textContent = `PLAYER ${i + 1}`;
  }
  return (playing = true);
});
