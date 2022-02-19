const form = document.querySelector('form')
const submitBtn = document.querySelector('.begin')
const checked = document.querySelectorAll('.checkbox')
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
  let practiceProblems = generateTables(tablesChosen)
  let firstProblem = Object.keys(practiceProblems)[0]
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
  console.log(`problems obj: ${practiceProblems}, current prob: ${problem}, answer: ${answer}`)

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
  if (Object.keys(obj).length === 0) {
    feedback.innerHTML = 'you did it!'
    stopTick()
    resetBtn.classList.remove('hide')
  } else {
    equation.innerHTML = Object.keys(obj)[0]
  }
  document.querySelector('.answer').value = ''
}

const incrementCount = (initialCount, currentCount) => {
  count.innerHTML = `${currentCount}/${initialCount}`
}

const handleReset = () => location.reload()

resetBtn.addEventListener('click', handleReset)
