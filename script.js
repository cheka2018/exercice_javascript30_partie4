
     /* ......................................Day 26 ......................................*/

 // on va d'abords récupérer les élements dont on a besoin , les élements de la listes, ainsi que le fond ( background), et notre nav 
  var declancheurs = document.querySelectorAll('.cool > li'); 
  var background = document.querySelector('.dropdownBackground');
  var nav = document.querySelector('.top'); 

// notre première fonction, rajoute la classe 'trigger-enter', remettere display a block, et au bout de 150 miliseconde, remettre l'opacity a 1, avec l'ajout de la classe 'trigger-enter-active'.
  
  function handleEnter() {
    this.classList.add('trigger-enter');
   setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);   
    background.classList.add('open');
    var dropdown = this.querySelector('.dropdown'); 
    var dropdownCoords = dropdown.getBoundingClientRect(); 
    var navCoords = nav.getBoundingClientRect();
    var coords = {
      height: dropdownCoords.height,
      width : dropdownCoords.width,
      top   : dropdownCoords.top - navCoords.top, // pour ratrapper le décalege qui peux etre générer par la présence d'élements .
      left  : dropdownCoords.left - navCoords.left
    };
        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
    }

   function handleLeave() {
     this.classList.remove('trigger-enter', 'trigger-enter-active');
     background.classList.remove('open');
    }

declancheurs.forEach(declancheur => declancheur.addEventListener('mouseenter', handleEnter));
declancheurs.forEach(declancheur => declancheur.addEventListener('mouseleave', handleLeave));


/*.............................. Day 27 scroll avec la souris..................................... */

var slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

 slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  }); 


  /* ..................................Day 28 vidéo speed control .............................*/

var speed = document.querySelector('.speed');
var bar = speed.querySelector('.speed-bar');
var video = document.querySelector('.flex');

speed.addEventListener('mousemove', function(e) {
  var y = e.pageY - this.offsetTop;
  var pourcent = y / this.offsetHeight;

  var min = 0.4;
  var max = 4;
  var height = Math.round(pourcent * 100) + '%';
  var playbackRate = pourcent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + '×';
  video.playbackRate = playbackRate;
 
});
 
/* Day 29 */
  
 let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
   
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
   
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainderSeconds = seconds % 60;
  var display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  var end = new Date(timestamp);
  var hour = end.getHours();
  var adjustedHour = hour > 12 ? hour - 12 : hour;
  var minutes = end.getMinutes();
  endTime.textContent = `Il vous reste : ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  var seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});


/*............................................. Day 30 jeu.....................................*/

  var holes = document.querySelectorAll('.hole');
  var scoreBoard = document.querySelector('.score');
  var moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;
// création de fonction aléatoire 
 function randTime(min, max) {
  return  Math.round(Math.random() * (max - min) + min);
 }
 // trou aléatoire pour la taupe
  function randomHole(holes) {
    var idx = Math.floor(Math.random() * holes.length);
    var hole = holes[idx];
    if(hole === lastHole) {
      console.log('Ah thats the same one bud');
      return randomHole(holes);
    }
lastHole = hole;
return hole;

  }

// faire apparaitre la taupe avec l'ajout de la classe 'up'
function peep() {
  var time = randTime(200, 1000);
  var hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
   if(!timeUp) peep(); // rejouer la fonction , tant que timeUp est false
  }, time);
}

function startGame(){
  scoreBoard.textContent = 0;
  timeup = false;
  score = 0;
  peep();
  setTimeout(() => timeup = true, 10000) // le jeu s'arréte au bout de 10000 milliémes de secondes , ou timeUp = true
}
 
function bonk(e) {
  if(!e.isTrusted) return; 
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;

}
 moles.forEach(mole => mole.addEventListener('click', bonk));



 