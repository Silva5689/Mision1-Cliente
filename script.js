const turno = document.getElementById("turno");
const casillas = document.querySelectorAll(".casilla");
const reiniciar = document.getElementById("reiniciar");

let jugadorActual = "X";
let partidaTerminada = false;

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


function comprobarGanador() {

    for (const combinacion of combinacionesGanadoras) {

        const primera = combinacion[0];
        const segunda = combinacion[1];
        const tercera = combinacion[2];

        if (
            casillas[primera].textContent !== "" &&
            casillas[primera].textContent === casillas[segunda].textContent &&
            casillas[primera].textContent === casillas[tercera].textContent
        ) {
            return true;
        }
    }

    return false;
}


function comprobarEmpate() {

    for (const casilla of casillas) {

        if (casilla.textContent === "") {
            return false;
        }
    }

    return true;
}


for (const casilla of casillas) {

    casilla.addEventListener("click", () => {

        if (partidaTerminada === true) {
            return;
        }

        if (casilla.textContent !== "") {
            return;
        }

        casilla.textContent = jugadorActual;


        if (comprobarGanador()) {

            turno.textContent = `Ha ganado ${jugadorActual}`;

            partidaTerminada = true;

            return;
        }


        if (comprobarEmpate()) {

            turno.textContent = "Empate";

            partidaTerminada = true;

            return;
        }


        jugadorActual = jugadorActual === "X" ? "O" : "X";

        turno.textContent = `Turno: ${jugadorActual}`;
    });
}


reiniciar.addEventListener("click", () => {

    for (const casilla of casillas) {
        casilla.textContent = "";
    }

    jugadorActual = "X";
    partidaTerminada = false;

    turno.textContent = "Turno: X";
});









