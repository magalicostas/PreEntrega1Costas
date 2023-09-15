let dogs = JSON.parse(localStorage.getItem("dogs"));

if (dogs) {
  dogs.forEach((dog) => {
    createDogCard(dog);
  });
} else {
  dogs = [];
}

document.getElementById("btn-create").addEventListener("click", submitForm);

// Alerts related functions
function clearAlert() {
  const alert = document.getElementById("alert");
  if (alert) {
    alert.remove();
  }
}
function createAlert(alert) {
  const alertWrapper = document.createElement("div");
  alertWrapper.id = "alert";
  alertWrapper.className = "alert alert-danger alert-dismissible mt-2";
  alertWrapper.setAttribute("role", "alert");
  alertWrapper.innerHTML = `<div>${alert}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  document.getElementById("form-container").appendChild(alertWrapper);
}

// Validate that dog form has valid fields
function validateForm(dog) {
  clearAlert();
  if (!dog.name) {
    createAlert("Debe completar el campo nombre.");
    return false;
  }
  if (dogs.some((g) => g.name.toLowerCase() === dog.name.toLowerCase())) {
    createAlert("Ya existe un perro con ese nombre.");
    return false;
  }

  if (!dog.attributes) {
    createAlert("Debe completar el campo atributos.");
    return false;
  }
  return true;
}

// Create dog card and append to list container
function createDogCard(dog) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-md-3 mb-4";
  cardWrapper.innerHTML = `<div class="card">
      <img class="card-img-top" src="${dog.image}" alt="${dog.name} image" style="max-height: 20vw; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${dog.name}</h5>
        <p class="card-text">${dog.attributes}</p>
      </div>
    </div>`;
  document.getElementById("list-container").prepend(cardWrapper);
}

// Add dog and persist over local storage
function addDog(dog) {
  dogs = [dog, ...dogs];
  localStorage.setItem("dogs", JSON.stringify(dogs));
}

// Submit dog form
async function submitForm() {
  const nameInput = document.getElementById("input-name");
  const attributesInput = document.getElementById("input-attributes");
  let dog = {
    name: nameInput.value,
    attributes: attributesInput.value,
  };
  // Validate if dog name and attributes are completed
  if (validateForm(dog)) {
    dog = {
      ...dog,
      image: await generateDogImage(),
    };
    // Persist dog on local storage
    addDog(dog);

    // Create dog card
    createDogCard(dog);

    // Alert that dog was successfully created
    Swal.fire({
      icon: "success",
      title: "El perro se ha registrado con éxito!",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    // Reset form values
    nameInput.value = "";
    attributesInput.value = "";
  }
}

async function generateDogImage() {
  const response = await fetch(
    "https://api.thedogapi.com/v1/images/search?mime_types=jpg,png&order=Random&size=full",
    {
      headers: {
        "x-api-key":
          "live_CO3shgCBNNFc314nffyRWWutoF0GbGDkObi84pTo7vdRKhpoNPrzHcvKWRTcWwbh",
      },
    }
  );
  const responseData = await response.json();
  return responseData[0].url;
}
