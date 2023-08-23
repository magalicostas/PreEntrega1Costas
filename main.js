let greyhounds = JSON.parse(localStorage.getItem('greyhounds'))

if (greyhounds) {
  greyhounds.forEach(greyhound => {
    createGreyhoundCard(greyhound)
  })
} else {
  greyhounds = []
}

document.getElementById('btn-create').addEventListener('click', submitForm)

// Alerts related functions
function clearAlert() {
  const alert = document.getElementById('alert');
  if (alert) {
    alert.remove()
  }
}
function createAlert(alert) {
  const alertWrapper = document.createElement('div')
  alertWrapper.id = 'alert'
  alertWrapper.className = 'alert alert-danger alert-dismissible mt-2'
  alertWrapper.setAttribute('role', 'alert')
  alertWrapper.innerHTML = `<div>${alert}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
  document.getElementById('form-container').appendChild(alertWrapper)
}

// Validate that greyhound form has valid fields
function validateGreyhoundForm(greyhound) {
  clearAlert();
  if (!greyhound.name) {
    createAlert("Debe completar el campo nombre.")
    return false
  }
  if (greyhounds.some(g => g.name.toLowerCase() === greyhound.name.toLowerCase())) {
    createAlert("Ya existe un galgo con ese nombre.")
    return false
  }

  if (!greyhound.attributes) {
    createAlert("Debe completar el campo atributos.")
    return false
  }
  return true
}

// Create greyhound card and append to list container
function createGreyhoundCard(greyhound) {
  const cardWrapper = document.createElement('div')
  cardWrapper.className = 'col-md-3 mb-4'
  cardWrapper.innerHTML = `<div class="card">
      <div class="card-body">
        <h5 class="card-title">${greyhound.name}</h5>
        <p class="card-text">${greyhound.attributes}</p>
      </div>
    </div>`
  document.getElementById('list-container').appendChild(cardWrapper)
}

// Add greyhound and persist over local storage
function addGreyhound(greyhound) {
  greyhounds.push(greyhound);
  localStorage.setItem('greyhounds', JSON.stringify(greyhounds))
}

// Submit greyhound form
function submitForm() {
  const nameInput = document.getElementById('input-name')
  const attributesInput = document.getElementById('input-attributes')
  let greyhound = {
    name: nameInput.value,
    attributes: attributesInput.value,
  }
  // Validate if greyhound name and attributes are completed
  if (validateGreyhoundForm(greyhound)) {
    // Persist greyhound on local storage
    addGreyhound(greyhound)

    // Create greyhound card
    createGreyhoundCard(greyhound)

    // Reset form values
    nameInput.value = ''
    attributesInput.value = ''
  }
}
