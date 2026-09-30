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

// El marcador se recupera aunque se recargue la página.
let victoriasX =
    Number(localStorage.getItem("tresEnRayaVictoriasX")) || 0;

let victoriasO =
    Number(localStorage.getItem("tresEnRayaVictoriasO")) || 0;

let empates =
    Number(localStorage.getItem("tresEnRayaEmpates")) || 0;


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

    casilla.setAttribute(
        "aria-label",
        `Casilla ${i + 1}, vacía`
    );

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
    nombreJugador1 =
        inputJugador1.value.trim() || "Jugador 1";

    modoIA = modoJuego.value === "ia";

    nombreJugador2 = modoIA
        ? "Ordenador"
        : inputJugador2.value.trim() || "Jugador 2";

    if (!validarNombres()) {
        return;
    }

    jugador1.textContent =
        `${nombreJugador1} (X)`;

    jugador2.textContent =
        `${nombreJugador2} (O)`;

    actualizarTurno();
    actualizarMarcador();

    inicio.classList.add("oculto");
    juego.classList.remove("oculto");

    casillas[0].focus();
});


function validarNombres() {
    if (
        !modoIA &&
        nombreJugador1.toLowerCase() ===
        nombreJugador2.toLowerCase()
    ) {
        errorNombre.textContent =
            "Los jugadores deben tener nombres diferentes.";

        return false;
    }

    errorNombre.textContent = "";

    return true;
}


function nombreDe(jugador) {
    return jugador === "X"
        ? nombreJugador1
        : nombreJugador2;
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


// Guarda únicamente los datos del marcador.
function guardarMarcador() {
    localStorage.setItem(
        "tresEnRayaVictoriasX",
        victoriasX
    );

    localStorage.setItem(
        "tresEnRayaVictoriasO",
        victoriasO
    );

    localStorage.setItem(
        "tresEnRayaEmpates",
        empates
    );
}


function finalizarPartida(mensaje) {
    turno.textContent = mensaje;

    actualizarMarcador();
    guardarMarcador();

    partidaTerminada = true;
}


function pintarCasilla(indice, jugador) {
    const casilla = casillas[indice];

    casilla.textContent = jugador;

    casilla.classList.add(
        jugador === "X"
            ? "jugador-x"
            : "jugador-o"
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
    const combinacion =
        combinacionesGanadoras.find(
            ([primera, segunda, tercera]) =>
                estado[primera] !== "" &&
                estado[primera] === estado[segunda] &&
                estado[primera] === estado[tercera]
        );

    return combinacion ?? null;
}


function comprobarEmpate(estado) {
    return estado.every(
        valor => valor !== ""
    );
}


// Comprueba si un jugador podría ganar en su siguiente movimiento.
function buscarJugadaGanadora(jugador) {
    for (
        let i = 0;
        i < estadoTablero.length;
        i++
    ) {
        if (estadoTablero[i] === "") {
            const estadoPrueba =
                estadoTablero.with(i, jugador);

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

    for (
        let i = 0;
        i < estadoTablero.length;
        i++
    ) {
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
    const jugadaGanadora =
        buscarJugadaGanadora("O");

    if (jugadaGanadora !== -1) {
        return jugadaGanadora;
    }

    const jugadaBloqueo =
        buscarJugadaGanadora("X");

    if (jugadaBloqueo !== -1) {
        return jugadaBloqueo;
    }

    return elegirCasillaAleatoria();
}


function jugarIA() {
    const indice = elegirCasillaIA();

    if (indice !== -1) {
        jugarEn(indice);
    }
}


// Toda jugada, humana o de la IA, pasa por esta misma función.
function jugarEn(indice) {
    if (partidaTerminada) {
        return;
    }

    if (estadoTablero[indice] !== "") {
        return;
    }

    estadoTablero[indice] = jugadorActual;

    pintarCasilla(
        indice,
        jugadorActual
    );

    const combinacionGanadora =
        comprobarGanador(estadoTablero);

    if (combinacionGanadora) {
        for (
            const posicion
            of combinacionGanadora
        ) {
            casillas[posicion]
                .classList.add("ganadora");
        }

        const nombreGanador =
            nombreDe(jugadorActual);

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

    jugadorActual =
        cambiarJugador(jugadorActual);

    actualizarTurno();

    if (
        modoIA &&
        jugadorActual === "O"
    ) {
        jugarIA();
    }
}


// Delegación de eventos: un único listener para todo el tablero.
tablero.addEventListener("click", (event) => {
    const casilla =
        event.target.closest(".casilla");

    if (
        !casilla ||
        !tablero.contains(casilla)
    ) {
        return;
    }

    const indice =
        Number(casilla.dataset.indice);

    jugarEn(indice);
});


// Permite moverse por el tablero usando las flechas del teclado.
tablero.addEventListener("keydown", (event) => {
    const casilla =
        event.target.closest(".casilla");

    if (!casilla) {
        return;
    }

    const indice =
        Number(casilla.dataset.indice);

    let nuevoIndice = indice;

    if (
        event.key === "ArrowRight" &&
        indice % 3 < 2
    ) {
        nuevoIndice = indice + 1;
    }

    if (
        event.key === "ArrowLeft" &&
        indice % 3 > 0
    ) {
        nuevoIndice = indice - 1;
    }

    if (
        event.key === "ArrowDown" &&
        indice < 6
    ) {
        nuevoIndice = indice + 3;
    }

    if (
        event.key === "ArrowUp" &&
        indice >= 3
    ) {
        nuevoIndice = indice - 3;
    }

    if (nuevoIndice !== indice) {
        event.preventDefault();

        casillas[nuevoIndice].focus();
    }
});


reiniciar.addEventListener("click", () => {
    estadoTablero.fill("");

    casillas.forEach(
        (casilla, indice) => {
            limpiarCasilla(
                casilla,
                indice
            );
        }
    );

    jugadorActual = "X";
    partidaTerminada = false;

    actualizarTurno();

    casillas[0].focus();
});


document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "SELECT"
        ) {
            return;
        }

        if (
            event.key.toLowerCase() === "d"
        ) {
            document.body.classList.toggle(
                "modo-oscuro"
            );
        }
    }
);


inicio.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "Enter" &&
            event.target.tagName === "INPUT"
        ) {
            empezar.click();
        }
    }
);


// Muestra el marcador guardado al cargar la página.
actualizarMarcador();