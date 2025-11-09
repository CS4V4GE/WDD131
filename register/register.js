let participantCount = 1
const addBtn = document.getElementById('addParticipant')
const form = document.getElementById('registerForm')
const summary = document.getElementById('summary')

function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <label for="first${count}">First Name</label>
    <input type="text" id="first${count}" name="first${count}" required>
    <label for="grade${count}">Grade</label>
    <input type="number" id="grade${count}" name="grade${count}" min="1" max="12" required>
    <label for="fee${count}">Fee</label>
    <input type="number" id="fee${count}" name="fee${count}" min="0" required>
  </section>`
}

addBtn.addEventListener('click', () => {
  participantCount++
  addBtn.insertAdjacentHTML('beforebegin', participantTemplate(participantCount))
})

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]")
  feeElements = [...feeElements]
  const total = feeElements.reduce((sum, el) => sum + Number(el.value || 0), 0)
  return total
}

function successTemplate(info) {
  return `
  <h2>Registration Successful</h2>
  <p>Thank you ${info.name} for registering.</p>
  <p>You have registered ${info.count} participants and owe $${info.total} in Fees.</p>`
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const name = document.getElementById('adultName').value
  const total = totalFees()
  form.style.display = 'none'
  summary.classList.remove('hide')
  summary.innerHTML = successTemplate({ name, count: participantCount, total })
})
