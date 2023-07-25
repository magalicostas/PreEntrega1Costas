let adopted = false;
let name = requestAnswer("Ingresa tu nombre completo.");

let adopt = requestAnswer(
  "Hola " + name + " ¿Estás interesado en adoptar un galgo?"
);

if (adopt) {
  while (adopt.toLowerCase() === "si") {
    adopted = haveDogToAdopt();

    if (adopted === false) {
      adopt = prompt("¿Deseas volver a completar el formulario?");
    }
  }
}
if (adopted === false) {
  alert(
    "Vuelve a completar el formulario cuando quieras un compañero de 4 patas."
  );
}

function requestAnswer(question) {
  let answer = prompt(question);
  while (answer === "") {
    answer = prompt(question);
  }
  return answer;
}

function haveDogToAdopt() {
  let ageDog = prompt(
    "¿Estas interesado/a en un galgo cachorro, joven adulto o adulto?"
  );

  switch (ageDog.toLowerCase()) {
    case "cachorro":
      let castration = prompt("¿Adoptarias con compromiso de castración?");
      if (castration === "si") {
        let email = requestAnswer("Ingresa un email.");
        alert("Te enviaremos mas información a " + email + ".");
        return true;
      } else {
        alert("No permitimos adoptar galgos sin compromiso de castración.");
        return false;
      }
    case "joven adulto":
    case "adulto":
      alert(
        "No tenemos ningún galgo con estas características en este momento."
      );
      return false;
    default:
      alert(
        "La opción ingresada no es válida. Debe ingresar una opción entre cachorro, joven adulto o adulto."
      );
      return false;
  }
}
