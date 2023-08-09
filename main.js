let galgos = [];

while (true) {
  const answer = requestAnswer(
    "Seleccione una opción:\n1) Agregar galgo al listado\n2) Listar galgos\n3) Eliminar galgo del listado\n4) Buscar galgos por atributo"
  );

  switch (answer) {
    case "1":
      const galgo = createGalgo();
      galgos.push(galgo);
      break;
    case "2":
      if (galgos.length > 0) {
        listGalgos(galgos);
      } else {
        alert("Aún no se han agregado galgos al listado!");
      }
      break;
    case "3":
      const name = requestAnswer("Ingrese el nombre del galgo a eliminar:");
      removeGalgo(name);
      break;
    case "4":
      const attribute = requestAnswer("Ingrese el atributo de busqueda:");
      const filteredGalgos = galgos.filter((galgo) =>
        galgo.attributes.includes(attribute)
      );
      listGalgos(filteredGalgos);
      break;
    default:
      alert("Opción inválida, por favor vuelva a intentarlo!");
      break;
  }
}

function createGalgo() {
  let galgo = {
    name: "",
    attributes: [],
  };
  galgo.name = requestAnswer("Ingrese el nombre del galgo:");
  let attribute = requestAnswer("Ingrese un atributo:");
  while (attribute !== "0") {
    galgo.attributes.push(attribute);
    attribute = requestAnswer(
      "Ingrese otro atributo o el número'0' para finalizar:"
    );
  }
  return galgo;
}

function removeGalgo(name) {
  if (galgos.some((galgo) => galgo.name === name)) {
    galgos = galgos.filter((galgo) => galgo.name !== name);
    alert("El galgo se elimino del listado con exito");
  } else {
    alert("No existe ningun galgo con el nombre ingresado");
  }
}

function listGalgos(galgos) {
  alert(
    galgos
      .map((galgo) => `${galgo.name}: ${galgo.attributes.join(", ")}`)
      .join("\n")
  );
}

function requestAnswer(question) {
  let answer = prompt(question);
  while (answer === "") {
    answer = prompt(question);
  }
  return answer;
}
