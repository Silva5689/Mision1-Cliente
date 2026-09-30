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

const modoJuego = document.querySelector("#modoJuego");
const errorNombre = document.querySelector("#errorNombre");

const empezar = document.querySelector("#empezar");

let nombreJugador1 = "Jugador 1";
let nombreJugador2 = "Jugador 2";

let jugadorActual = "X";
let partidaTerminada = false;
let modoIA = false;

let victoriasX = 0;
let victoriasO = 0;
let empates = 0;

// El estado del juego se guarda separado de lo que se muestra en el DOM.
const estadoTablero = Array(9).fill("");

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

for (let i = 0; i < estadoTablero.length; i++) {
    const casilla = document.createElement("button");

    casilla.type = "button";
    casilla.classList.add("casilla");
    casilla.dataset.indice = i;
    casilla.setAttribute("aria-label", `Casilla ${i + 1}, vacía`);

    tablero.appendChild(casilla);
}

const casillas = document.querySelectorAll(".casilla");


modoJuego.addEventListener("change", () => {
    const contraIA = modoJuego.value === "ia";

    inputJugador2.disabled = contraIA;

    inputJugador2.placeholder = contraIA
        ? "El rival será el ordenador"
        : "Nombre jugador O";

    errorNombre.textContent = "";
});


empezar.addEventListener("click", () => {
    nombreJugador1 = inputJugador1.value.trim() || "Jugador 1";

    modoIA = modoJuego.value === "ia";

    nombreJugador2 = modoIA
        ? "Ordenador"
        : inputJugador2.value.trim() || "Jugador 2";

    if (!validarNombres()) {
        return;
    }

    jugador1.textContent = `${nombreJugador1} (X)`;
    jugador2.textContent = `${nombreJugador2} (O)`;

    actualizarTurno();
    actualizarMarcador();

    inicio.classList.add("oculto");
    juego.classList.remove("oculto");
});


function validarNombres() {
    if (
        !modoIA &&
        nombreJugador1.toLowerCase() === nombreJugador2.toLowerCase()
    ) {
        errorNombre.textContent =
            "Los jugadores deben tener nombres diferentes.";

        return false;
    }

    errorNombre.textContent = "";
    return true;
}


function nombreDe(jugador) {
    return jugador === "X" ? nombreJugador1 : nombreJugador2;
}


function cambiarJugador(jugador) {
    return jugador === "X" ? "O" : "X";
}


function actualizarTurno() {
    turno.textContent =
        `Turno: ${nombreDe(jugadorActual)} (${jugadorActual})`;
}


function actualizarMarcador() {
    marcadorX.textContent =
        `${nombreJugador1} (X): ${victoriasX}`;

    marcadorO.textContent =
        `${nombreJugador2} (O): ${victoriasO}`;

    marcadorEmpates.textContent =
        `Empates: ${empates}`;
}


function finalizarPartida(mensaje) {
    turno.textContent = mensaje;
    actualizarMarcador();
    partidaTerminada = true;
}


function pintarCasilla(indice, jugador) {
    const casilla = casillas[indice];

    casilla.textContent = jugador;

    casilla.classList.add(
        jugador === "X" ? "jugador-x" : "jugador-o"
    );

    casilla.setAttribute(
        "aria-label",
        `Casilla ${indice + 1}, ${jugador}`
    );
}


function limpiarCasilla(casilla, indice) {
    casilla.textContent = "";

    casilla.classList.remove(
        "jugador-x",
        "jugador-o",
        "ganadora"
    );

    casilla.setAttribute(
        "aria-label",
        `Casilla ${indice + 1}, vacía`
    );
}


function comprobarGanador(estado) {
    const combinacion = combinacionesGanadoras.find(
        ([primera, segunda, tercera]) =>
            estado[primera] !== "" &&
            estado[primera] === estado[segunda] &&
            estado[primera] === estado[tercera]
    );

    return combinacion ?? null;
}


function comprobarEmpate(estado) {
    return estado.every(valor => valor !== "");
}


// Comprueba si un jugador puede ganar colocando su símbolo en una casilla libre.
function buscarJugadaGanadora(jugador) {
    for (let i = 0; i < estadoTablero.length; i++) {

        if (estadoTablero[i] === "") {
            const estadoPrueba = estadoTablero.with(i, jugador);

            if (comprobarGanador(estadoPrueba)) {
                return i;
            }
        }
    }

    return -1;
}

// Devuelve una casilla libre aleatoria.
function elegirCasillaAleatoria() {
    const casillasLibres = [];

    for (let i = 0; i < estadoTablero.length; i++) {
        if (estadoTablero[i] === "") {
            casillasLibres.push(i);
        }
    }

    if (casillasLibres.length === 0) {
        return -1;
    }

    const posicionAleatoria = Math.floor(
        Math.random() * casillasLibres.length
    );

    return casillasLibres[posicionAleatoria];
}


// La IA intenta ganar, después bloquear y, si no, juega al azar.
function elegirCasillaIA() {
    const jugadaGanadora = buscarJugadaGanadora("O");

    if (jugadaGanadora !== -1) {
        return jugadaGanadora;
    }

    const jugadaBloqueo = buscarJugadaGanadora("X");

    if (jugadaBloqueo !== -1) {
        return jugadaBloqueo;
    }

    return elegirCasillaAleatoria();
}


function jugarIA() {
    const indice = elegirCasillaIA();

    if (indice !== -1) {
        casillas[indice].click();
    }
}


// Un solo listener para todo el tablero mediante delegación de eventos.
tablero.addEventListener("click", (event) => {
    const casilla = event.target.closest(".casilla");

    if (!casilla || !tablero.contains(casilla)) {
        return;
    }

    if (partidaTerminada) {
        return;
    }

    const indice = Number(casilla.dataset.indice);

    if (estadoTablero[indice] !== "") {
        return;
    }

    estadoTablero[indice] = jugadorActual;

    pintarCasilla(indice, jugadorActual);

    const combinacionGanadora =
        comprobarGanador(estadoTablero);

    if (combinacionGanadora) {
        for (const posicion of combinacionGanadora) {
            casillas[posicion].classList.add("ganadora");
        }

        const nombreGanador = nombreDe(jugadorActual);

        if (jugadorActual === "X") {
            victoriasX++;
        } else {
            victoriasO++;
        }

        finalizarPartida(
            `Ha ganado ${nombreGanador} (${jugadorActual})`
        );

        return;
    }

    if (comprobarEmpate(estadoTablero)) {
        empates++;

        finalizarPartida("Empate");

        return;
    }

    jugadorActual = cambiarJugador(jugadorActual);
    actualizarTurno();

    if (modoIA && jugadorActual === "O") {
        jugarIA();
    }
});


reiniciar.addEventListener("click", () => {
    estadoTablero.fill("");

    casillas.forEach((casilla, indice) => {
        limpiarCasilla(casilla, indice);
    });

    jugadorActual = "X";
    partidaTerminada = false;

    actualizarTurno();
});


document.addEventListener("keydown", (event) => {
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "SELECT"
    ) {
        return;
    }

    if (event.key.toLowerCase() === "d") {
        document.body.classList.toggle("modo-oscuro");
    }
});


inicio.addEventListener("keydown", (event) => {
    if (
        event.key === "Enter" &&
        event.target.tagName === "INPUT"
    ) {
        empezar.click();
    }
});