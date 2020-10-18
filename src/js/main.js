var button = document.querySelector("#button");
var valor = document.querySelector("#partidas");
valor.value = localStorage.getItem("valor");

button.addEventListener("click", function() {
  valor.stepUp(1);
  localStorage.setItem("valor", valor.value);
});
