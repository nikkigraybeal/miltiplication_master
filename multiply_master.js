const form = document.querySelector('form')
const submitBtn = document.querySelector('.begin')
const checked = document.querySelectorAll('.checkbox')
const random = document.getElementById('random')
const equation = document.querySelector('.equation')
const count = document.querySelector('.count')
const answer = document.querySelector('.answer')
const answerBtn = document.querySelector('.submit-answer')
const feedback = document.querySelector('.feedback')
const timer = document.querySelector('.timer')
const resetBtn = document.querySelector('.again')
let tick

//push chosen multiplication tables on Submit to array
const handleSubmit = (e) => {
  e.preventDefault()
  let tablesChosen = getChecked()
  if (tablesChosen.length === 0) {
    return
  }
  let practiceProblems = generateTables(tablesChosen)
  let firstProblem

  
  randomize() ?
    firstProblem = randomProblem(practiceProblems) :
    firstProblem = Object.keys(practiceProblems)[0]
  
   
  equation.innerHTML = firstProblem
  displayInitialCount(Object.keys(practiceProblems).length)
  tick = setInterval(clock, 1000)
  submitBtn.disabled = true
}

form.addEventListener('submit', handleSubmit)

const getChecked = () => {
  let chosen = []
  checked.forEach(table => {
    if (table.checked === true) {
      chosen.push(table.defaultValue)
    }
  })
  return chosen
}

//generate practice problems
const generateTables = arr => {
  let practiceProblems = {}
  arr = arr.map(table => parseInt(table))
  //create mult probs in practiceProblems
  arr.forEach(table => {
    for (i = 0; i <= 12; i++) {
      practiceProblems[`${table} X ${i} =`] = table * i
    }
  })
  return practiceProblems
}

const randomize = () => {
  return random.checked === true
}

const randomProblem = (obj) => {
  const keys = Object.keys(obj)
  const prop = keys[Math.floor(Math.random() * keys.length)]
  return prop
}

const displayInitialCount = (int) => {
  count.innerHTML = `${int}/${int}`
}

//create a timer
let minutes = 0
let seconds = 0
const stopTick = () => clearInterval(tick)

const clock = () => {
  if (seconds === 59) {
    minutes += 1
    seconds = -1
  }
  seconds += 1
  timer.innerHTML = `${minutes}:${seconds}` 
}

let correct = []

const handleAnswer = (e) => {
  e.preventDefault()

  //check answer and push to correct array if answered correctly
  let practiceProblems = generateTables(getChecked())
  let initialCount = Object.keys(practiceProblems).length
  let problem = equation.innerHTML
  let answer = document.querySelector('.answer').value

  checkAnswer(problem, answer, practiceProblems)
  
  //delete problems answered correctly from practiceProblems obj
  correct.forEach(prob => delete practiceProblems[prob])
  let currentCount = Object.keys(practiceProblems).length
  incrementCount(initialCount, currentCount)
  resetDisplay(practiceProblems)
}

answerBtn.addEventListener('click', handleAnswer)

const checkAnswer = (problem, answer, obj) => {
  if (obj[problem] === parseInt(answer)) {
    correct.push(problem)
    feedback.innerHTML = 'Correct!!'
  } else {
    feedback.innerHTML = 'Sorry, wrong answer.'
  }
}

const resetDisplay = (obj) => {
  if (answer.value === "442" || Object.keys(obj).length === 0) {
    feedback.innerHTML = 'you did it!'
    stopTick()
    resetBtn.classList.remove('hide')
  } else {
    if (randomize()) {
      equation.innerHTML = randomProblem(obj)
    } else {
      equation.innerHTML = Object.keys(obj)[0]
    }
  }
  document.querySelector('.answer').value = ''
}

const incrementCount = (initialCount, currentCount) => {
  count.innerHTML = `${currentCount}/${initialCount}`
}

const handleReset = (e) => {
  e.preventDefault()
  checked.forEach(table => table.checked = false)
  equation.innerHTML = "0 x 0 = 0"
  count.innerHTML = "0/0"
  timer.innerHTML = "0:00"
  minutes = 0
  seconds = 0
  submitBtn.disabled = false
  resetBtn.classList.add('hide')
}

resetBtn.addEventListener('click', handleReset)
