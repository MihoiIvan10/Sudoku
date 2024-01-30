//          Estilo del soduko 

var soduko = document.getElementById('sodukoTablero');
var celdas = soduko.querySelectorAll('.a');

soduko.addEventListener("click", function(event){
  
  resetear();
  var targetCell = event.target.closest('td');
  if (targetCell) {
    var filas = targetCell.parentElement.rowIndex;
    var columnas = targetCell.cellIndex;
      
    filasColor(filas);
    columnasColor(columnas);
    cuboColor(filas,columnas);
  }
});

function resetear(){

    var coloredElements = document.querySelectorAll('.color');
    for (var i = 0; i < coloredElements.length; i++) {
      coloredElements[i].classList.remove('color');
    }

}

function filasColor(filas){
  var fila = document.querySelectorAll('#sodukoTablero tr')[filas];
  fila.classList.add("color");
}

function columnasColor(columnas){
  for (let i = 0; i < 9; i++) {
    var columna = document.querySelectorAll('#sodukoTablero tr')[i].querySelectorAll('td')[columnas];
    columna.classList.add('color');
  }
}

function cuboColor(filas,columnas){
  var miniMatrix = 3;
  var fila = filas - (filas % miniMatrix);
  var columna = columnas - (columnas % miniMatrix);
  for(var i=fila; i<fila+miniMatrix; i++){
    for(var j=columna; j<columna+miniMatrix; j++){
      var cell = document.querySelectorAll('#sodukoTablero tr')[i].querySelectorAll('td')[j];
      cell.classList.add('color');
    }
  }

}

//----------------------------------------------------------------------------

//              para bloquear y que solo sean numeros 

//---------------------------------------------------------------------------------
for(var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('input', function (event) {
      var inputValue = event.target.innerText;
      if (!isValidInput(inputValue)) {
          event.target.innerText = '';
      }
  });
}

function isValidInput(value) {
  return !isNaN(value) && value >= 1 && value <= 9;
}

//--------------------------------------------------------------
//                     cronometro 
//--------------------------------------------------------------

const select = document.querySelector('#dificultad'); 
let cronometro = false;
let acumulado = 0;

select.addEventListener('change', function(event) {
  const dificultad = event.target.value;
  if (dificultad === 'Facil' || dificultad === 'Medio' || dificultad === 'Dificil') {
    cronometro = true;
  }

  let tiempo = Date.now();

  setInterval(() => {
    let tiempo1 = document.getElementById("tiempo");
    if (cronometro) {
      acumulado += Date.now() - tiempo;
    }
    tiempo = Date.now();
    tiempo1.innerHTML = formatear(acumulado);
  }, 1000 / 60);
});

var pausa = false;  

function pausar() {
  cronometro = false;
  pausa = !pausa;  
  for (var i = 0; i < celdas.length; i++) {
    celdas[i].contentEditable = !pausa;
  }
}


function reiniciar() {
  cronometro = false;
  acumulado = 0;
}

function formatear(tiempo) {
  let MS = tiempo % 1000;
  let St = Math.floor(((tiempo - MS) / 1000));
  let S = St % 60;
  let M = Math.floor((St / 60) % 60);
  let H = Math.floor((St / 60 / 60));
  Number.prototype.ceros = function (n) {
    return (this + "").padStart(n, 0);
  }
  return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2) + "." + MS.ceros(3);
}

//--------------------------------------------------------------------
