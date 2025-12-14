const year = document.querySelector("#year")
if (year) year.textContent = new Date().getFullYear()

const questionText = document.querySelector("#questionText")
const optionsWrap = document.querySelector("#optionsWrap")
const quizForm = document.querySelector("#quizForm")
const feedback = document.querySelector("#feedback")
const nextBtn = document.querySelector("#nextBtn")
const quizCounter = document.querySelector("#quizCounter")
const quizScore = document.querySelector("#quizScore")
const progressFill = document.querySelector("#quizProgressFill")

const questions = [
  { q: "Which type stores true or false?", a: ["int", "bool", "string", "char"], c: 1 },
  { q: "Which keyword creates an object?", a: ["make", "new", "create", "var"], c: 1 },
  { q: "What does var do?", a: ["Creates global variable", "Infers type", "Makes dynamic", "Creates constant"], c: 1 },
  { q: "Which loop iterates a collection safely?", a: ["for", "while", "foreach", "do"], c: 2 },
  { q: "Which collection stores key/value pairs?", a: ["List", "Array", "Dictionary", "Stack"], c: 2 },
  { q: "What access modifier allows access anywhere?", a: ["private", "protected", "internal", "public"], c: 3 },
  { q: "What is a constructor used for?", a: ["Destroy objects", "Initialize objects", "Loop data", "Convert types"], c: 1 },
  { q: "What exception happens when using null?", a: ["IndexOutOfRange", "NullReference", "Format", "DivideByZero"], c: 1 },
  { q: "Which method adds to a List?", a: ["Push", "Append", "Add", "InsertLast"], c: 2 },
  { q: "Array indexes go from 0 to?", a: ["Length", "Length - 1", "1", "Size"], c: 1 }
]

let index = 0
let score = 0
let locked = false

function renderQuestion() {
  locked = false
  feedback.textContent = ""
  nextBtn.disabled = true

  const item = questions[index]
  questionText.textContent = item.q
  quizCounter.textContent = `Question ${index + 1} of ${questions.length}`
  quizScore.textContent = `Score: ${score}`

  optionsWrap.innerHTML = ""
  item.a.forEach((text, i) => {
    const label = document.createElement("label")
    label.className = "option"

    const input = document.createElement("input")
    input.type = "radio"
    input.name = "answer"
    input.value = i
    input.required = true

    const span = document.createElement("span")
    span.textContent = text

    label.append(input, span)
    optionsWrap.appendChild(label)
  })

  const percent = Math.round((index / questions.length) * 100)
  progressFill.style.width = `${percent}%`
}

quizForm.addEventListener("submit", e => {
  e.preventDefault()
  if (locked) return

  const selected = quizForm.querySelector("input[name='answer']:checked")
  if (!selected) return

  locked = true
  nextBtn.disabled = false

  if (Number(selected.value) === questions[index].c) {
    score++
    feedback.textContent = "Correct!"
  } else {
    feedback.textContent = "Incorrect."
  }

  quizScore.textContent = `Score: ${score}`
})

nextBtn.addEventListener("click", () => {
  if (index < questions.length - 1) {
    index++
    renderQuestion()
  } else {
    questionText.textContent = "Quiz Complete"
    optionsWrap.innerHTML = ""
    feedback.textContent = `Final Score: ${score} / ${questions.length}`
    progressFill.style.width = "100%"
    nextBtn.disabled = true
  }
})

renderQuestion()
