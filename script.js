const turno = document.querySelector("#turno");
const reiniciar = document.querySelector("#reiniciar");
const tablero = document.querySelector("#tablero");

const jugador1 = document.querySelector("#jugador1");
const jugador2 = document.querySelector("#jugador2");

const inicio = document.querySelector("#inicio");
const juego = document.querySelector("#juego");

const inputJugador1 = document.querySelector("#inputJugador1");
const inputJugador2 = document.querySelector("#inputJugador2");

const marcadorX = document.querySelector("#marcadorX");
const marcadorO = document.querySelector("#marcadorO");
const marcadorEmpates = document.querySelector("#marcadorEmpates");

const empezar = document.querySelector("#empezar");

let nombreJugador1 = "Jugador 1";
let nombreJugador2 = "Jugador 2";

let jugadorActual = "X";
let partidaTerminada = false;

let victoriasX = 0;
let victoriasO = 0;
let empates = 0;

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

for(let i = 0; i < 9; i++){
    const casilla = document.createElement("button");
    casilla.classList.add("casilla");
    tablero.appendChild(casilla);
}

const casillas = document.querySelectorAll(".casilla");


empezar.addEventListener("click", () => {
    nombreJugador1 = inputJugador1.value.trim() || "Jugador 1";
    nombreJugador2 = inputJugador2.value.trim() || "Jugador 2";

    jugador1.textContent = `${nombreJugador1} (X)`;
    jugador2.textContent = `${nombreJugador2} (O)`;

    actualizarTurno();
    actualizarMarcador();

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

function actualizarMarcador() {
    marcadorX.textContent = `${nombreJugador1} (X): ${victoriasX}`;
    marcadorO.textContent = `${nombreJugador2} (O): ${victoriasO}`;
    marcadorEmpates.textContent = `Empates: ${empates}`;
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

    if (partidaTerminada) {
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

        if (jugadorActual === "X") {
            victoriasX++;
        } else {
            victoriasO++;
        }

        actualizarMarcador();

        partidaTerminada = true;
        return;
    }

    if (comprobarEmpate()) {
        turno.textContent = "Empate";
        empates++;
        actualizarMarcador();
        partidaTerminada = true;
        return;
    }

    jugadorActual = cambiarJugador(jugadorActual);
    actualizarTurno();
});

reiniciar.addEventListener("click", () => {
    for (const casilla of casillas) {
        casilla.textContent = "";
    
        casilla.classList.remove("jugador-x","jugador-o","ganadora");
    }

    jugadorActual = "X";
    partidaTerminada = false;

    actualizarTurno();
});

document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT") {
        return;
    }

    if (event.key.toLowerCase() === "d") {
        document.body.classList.toggle("modo-oscuro");
    }
});

inicio.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        empezar.click();
    }
});