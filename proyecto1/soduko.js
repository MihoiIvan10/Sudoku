//--------------------------------------------------------------------------------------------
//               Boton nuevo juego
//--------------------------------------------------------------------------------------------


const selectElement = document.querySelector('#dificultad'); 
selectElement.addEventListener('change', (event) => {
  const dificultad = event.target.value;

  if (dificultad === 'Facil' || dificultad === 'Medio' || dificultad === 'Dificil') {
    fetch(`http://localhost:8080/api/sudoku/generarTablero?dificultad=${dificultad}`)
      .then((response) => response.json())
      .then((json) => {
        procesarMatriz(json);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  } 
  else {
    console.log("Ninguna condición se cumplió");
  }
});


function procesarMatriz(matrix) {
  const sudokuBoard = document.getElementById('sodukoTablero');
  const celdas = sudokuBoard.querySelectorAll('.a');

  const tablero = 9;

  for (let fila = 0; fila < tablero; fila++) {
    for (let columna = 0; columna < tablero; columna++) {
      const numero = matrix.board[fila][columna];
      const indice = fila * tablero + columna;
      if(numero != 0){ 
        celdas[indice].textContent = numero;
      }
      else{
        celdas[indice].textContent = ' ';
      }
    }
  }
}

//-----------------------------------------------------------------------------------
//                   Boton Verificar
//-----------------------------------------------------------------------------------


function verificar() {

  const sudokuboard = document.getElementById('sodukoTablero');
  const celdas = sudokuboard.querySelectorAll('.a');
  const sodukomatrix = [];
  const tamFila = 9;

  for (let i = 0; i < celdas.length; i += tamFila) {
    const filaCeldas = Array.from(celdas).slice(i, i + tamFila);
    const valoresFila = filaCeldas.map(celda => {

      const contenidoCelda = celda.textContent.trim();
      let valorNumerico;
      if (contenidoCelda !== '') {
        valorNumerico = Number(contenidoCelda);
      } else {
        valorNumerico = 0;
      }
      return valorNumerico;

    });

    sodukomatrix.push(valoresFila);
  }

  return sodukomatrix;

}

function numMatriz(datos){

  for(let i=0; i<datos.length; i++){
    for(let j=0; j<datos.length; j++){
      if(datos[i][j] === 0){
        return false;
      }
    }
  }
  return true;
}


function enviarDatos(datos) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  };

  return fetch("http://localhost:8080/api/sudoku/verificar", option)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 400) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      } else {
        throw new Error('Error al verificar el tablero de Sudoku');
      }
    })
    .catch(error => {
      console.error('Error al verificar el tablero de Sudoku:', error);
      throw error;
    });
}

const verify = document.getElementById('verificar');

verify.addEventListener('click', function () {
  const datos = verificar();
  enviarDatos(datos)
    .then(data => {
      console.log('Respuesta del servidor:', data);
      document.getElementById('soduko-bien').style.display="block";
    })
    .catch(error => {
      console.log('Mal soduko')
      document.getElementById('soduko-mal').style.display="block";
    });
});

var celdas = document.querySelectorAll('.a');
celdas = Array.from(celdas);

for (let i = 0; i < celdas.length; i++) {
  celdas[i].addEventListener('input', function() { 
    const datos = verificar();

    if(numMatriz(datos)){
      if(celdas.every((celda) => celda.value !== "")) {
        enviarDatos(datos)
        .then(data => {
          document.getElementById('soduko-final').style.display="block";
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {

        });
      }
    }
  });
}


//----------------------------------------------------------------------------------------------------
//                     Boton Resolver
//---------------------------------------------------------------------------------------------------

function solucionar() {

  const sodukoboard = document.getElementById('sodukoTablero');
  const celdas = sodukoboard.querySelectorAll('.a');
  const sodukomatrix = [];
  const tamFila = 9;

  for (let i = 0; i < celdas.length; i += tamFila) {
    const filaCeldas = Array.from(celdas).slice(i, i + tamFila);
    const valoresFila = filaCeldas.map(celda => {

      const contenidoCelda = celda.textContent.trim();
      let valorNumerico;
      if (contenidoCelda !== '') {
        valorNumerico = Number(contenidoCelda);
      } else {
        valorNumerico = 0;
      }
      return valorNumerico;

    });

    sodukomatrix.push(valoresFila);
  }

  return sodukomatrix;

}


function mandarDatos(datos){
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  };

  return fetch("http://localhost:8080/api/sudoku/resolver", option)
  .then((response) => response.json())
  .then((json) => {
    procesarMatriz1(json);
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
} 

function procesarMatriz1(matrix) {
  const sudokuBoard = document.getElementById('sodukoTablero');
  const celdas = sudokuBoard.querySelectorAll('.a');

  const boardSize = 9;

  for (let fila = 0; fila < boardSize; fila++) {
    for (let columna = 0; columna < boardSize; columna++) {
      const numero = matrix[fila][columna];
      const indice = fila * boardSize + columna;
      celdas[indice].textContent = numero;
    }
  }
}

const resolver = document.getElementById('resolver');

resolver.addEventListener('click', function () {
  const datos = solucionar();
  mandarDatos(datos)
    .then(data => {
      console.log('Acabaste');
    })
    .catch(error => {

    });
});


//---------------------------------------------------------------------------------------


