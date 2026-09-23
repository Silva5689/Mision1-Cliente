const turno = document.getElementById("turno");
const reiniciar = document.getElementById("reiniciar");
const tablero = document.getElementById("tablero");

const jugador1 = document.getElementById("jugador1");
const jugador2 = document.getElementById("jugador2");

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const inputJugador1 = document.getElementById("inputJugador1");
const inputJugador2 = document.getElementById("inputJugador2");

const empezar = document.getElementById("empezar");

let nombreJugador1 = "Jugador X";
let nombreJugador2 = "Jugador O";

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

for(let i = 0; i<9; 1++){
    const casilla = document.createElement("button");
    casilla.classList.add("casilla");
    tablero.appendChild(casilla);
}

const casillas = document.querySelectorAll(".casilla");




empezar.addEventListener("click", () => {
    nombreJugador1 = inputJugador1.value || "Jugador X";
    nombreJugador2 = inputJugador2.value || "Jugador O";

    jugador1.textContent = `${nombreJugador1} (X)`;
    jugador2.textContent = `${nombreJugador2} (O)`;

    actualizarTurno();

    inicio.classList.add("oculto");
    juego.classList.remove("oculto");
});

function nombreDe(jugador) {
    return jugador === "X" ? nombreJugador1 : nombreJugador2;
}

function cambiarJugador(jugador) {
    return jugador === "X" ? "O" : "X";
}

function actualizarTurno() {
    turno.textContent = `Turno: ${nombreDe(jugadorActual)} (${jugadorActual})`;
}

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
            return combinacion;
        }
    }

    return null;
}

function comprobarEmpate() {
    for (const casilla of casillas) {
        if (casilla.textContent === "") {
            return false;
        }
    }

    return true;
}

tablero.addEventListener("click", (event) => {
    const casilla = event.target.closest(".casilla");

    if (!casilla) {
        return;
    }

    if (partidaTerminada === true) {
        return;
    }

    if (casilla.textContent !== "") {
        return;
    }

    casilla.textContent = jugadorActual;

    casilla.classList.add(
        jugadorActual === "X" ? "jugador-x" : "jugador-o"
    );

    const combinacionGanadora = comprobarGanador();

    if (combinacionGanadora) {
        for (const posicion of combinacionGanadora) {
            casillas[posicion].classList.add("ganadora");
        }

        const nombreGanador = nombreDe(jugadorActual);

        turno.textContent = `Ha ganado ${nombreGanador} (${jugadorActual})`;

        partidaTerminada = true;
        return;
    }

    if (comprobarEmpate()) {
        turno.textContent = "Empate";
        partidaTerminada = true;
        return;
    }

    jugadorActual = cambiarJugador(jugadorActual);
    actualizarTurno();
});

reiniciar.addEventListener("click", () => {
    for (const casilla of casillas) {
        casilla.textContent = "";
        casilla.classList.remove("jugador-x");
        casilla.classList.remove("jugador-o");
        casilla.classList.remove("ganadora");
    }

    jugadorActual = "X";
    partidaTerminada = false;

    actualizarTurno();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        document.body.classList.toggle("modo-oscuro");
    }
});

inicio.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        empezar.click();
    }
});