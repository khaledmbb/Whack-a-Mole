const startGame = document.getElementsByTagName('button')[0],
  boxes = document.querySelectorAll('.box'),
  game = document.querySelector('.game'),
  welcome = document.querySelector('.welcome'),
  result = document.querySelector('.result'),
  options = document.querySelectorAll('.options .flex button'),
  optionsEl = document.querySelector('.options')

let ifClicked = false,
  score = document.querySelector('.score'),
  time = 0,
  difficult = 'Easy'

options.forEach(el => {
  el.addEventListener('click', () => {
    options.forEach(ele => {
      ele.classList.remove('active')
      difficult = null
    })
    el.classList.add('active')
    difficult = el.dataset.difficult
  })
})

startGame.addEventListener('click', () => {
  startTheGame()
  startGame.style.pointerEvents = 'none'
  console.log(difficult);
})

const startTheGame = () => {
  optionsEl.style.display = 'none'
  game.style.display = "block"
  if (difficult == 'Piece Of Cake') {
    playAgain(2000, 800)
  } else if (difficult == 'Easy') {
    playAgain(1500, 700)
  } else if (difficult == 'Medium') {
    playAgain(1200, 600)
  } else if (difficult == 'Hard') {
    playAgain(1000, 400)
  } else {
    playAgain(800, 300)
  }
}

function endDuration(randomNum, duration, dead) {
  boxes.forEach((el, index) => {
    if (index == randomNum) {
      time++
      let item = el.querySelector('.item')
      item.classList.add('show')
      ifClicked = false
      item.addEventListener('click', () => {
        ifClicked = true
      })
      setTimeout(() => {
        ifClicked == true ? score.innerHTML++ : false
        item.classList.remove('show')
        startTheGame()
      }, duration < dead ? dead : duration);
    }
  })
}

function playAgain(timeEnd, dead) {
  console.log(time);
  if (time == 20) {
    game.style.display = 'none'
    welcome.style.display = 'none'
    result.style.display = 'block'
    result.innerHTML = `<h1>Your Score Is ${score.innerHTML} In Diffuicult ${difficult}</h1><button>Play Again</button>`
    let playAgain = result.querySelector('button')
    playAgain.addEventListener('click', () => {
      startGame.style.pointerEvents = 'unset'
      optionsEl.style.display = 'block'
      result.style.display = 'none'
      game.style.display = 'none'
      welcome.style.display = 'block'
      score.innerHTML = '0'
      time = 0
    })
  } else {
    let randomNum = Math.floor(Math.random() * boxes.length),
      duration = Math.floor(Math.random() * timeEnd)
    endDuration(randomNum, duration, dead)
  }
}