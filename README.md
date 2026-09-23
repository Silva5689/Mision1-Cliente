# Mision1-Cliente

# Tres en raya
He decidido hacer un tres en raya porque da bastante margen de mejora. Es un juego sencillo y básico, pero se puede ampliar con nuevas funcionalidades y reglas.

## Descripción
Se trata de un tablero 3x3 en el que dos jugadores compiten por conseguir tres símbolos iguales ("X" o "O") en línea. Puede ser en horizontal, vertical o diagonal.

## Lenguajes utilizados
- HTML
- CSS
- JavaScript

## Uso de IA
Utilicé ChatGPT como herramienta de inteligencia artificial para ayudarme.
Principalmente la utilicé para que me explicara cómo funcionan y cómo podía implementar cosas que todavía no habíamos llegado a ver en clase.
Escribí manualmente la estructura HTML y la lógica del juego. No obstante, ChatGPT me proponía los cambios para implementar las cosas nuevas que todavía no habíamos visto en clase o que me costaban un poco más, por lo tanto, intentaba aplicarlos a mi código y comprobar que funcionaban con el navegador. Me ayudó mucho con el CSS, ya que entiendo como funciona, pero no soy muy creativo.

### Prompt 1: 
"El corrector me ha dicho que es mejor generar las 9 casillas del tablero desde JavaScript en vez de escribirlas una a una en el HTML. 
Cómo se hace?"
### Resultado 1 : 
ChatGPT me explicó que podía crear los botones con document.createElement() dentro de un bucle y añadirlos al tablero con appendChild().
Antes de este cambio guardaba la referencia a las casillas al principio del código, pero después de este cambio, tuve que mover el querySelectorAll(".casilla") a después de la creación de las casillas, ya que debe ejecutarse una vez las casillas están creadas. Sino, tendría guardado un NodeList vacío.

### Prompt 2:
"He visto en los apuntes que en vez de añadir un listener a cada elemento se puede añadir un único listener al elemento padre y se hereda o algo así. Sería mejor hacerlo así en mi tres en raya?"
### Resultado 2:
La IA me explicó que esto se llama delegación de eventos y que el listener no se hereda realmente. El evento del clic se propaga hasta el elemento padre.
En vez de añadir un listener a cada una de las nueve casillas, se puede añadir un único listener al tablero y utilizar event.target para saber qué casilla ha sido pulsada.
Para comprobarlo revisé los apuntes y probé las casillas pulsándolas.

## Autopsia

### Decisión 1:
Antes usaba un listener por cada casilla, pero al ver la presentación con la teoría de clase, vi que podía usar la propagación de eventos. 
Añadí un listener al tablero, y de esta manera, si había un click en alguna casilla ya podía detectarlo.
Poniendo 9 listeners, uno a cada casilla, también funcionaba, pero esta manera es mucho más limpia, ya que solo se pone un listener al tablero.

### Decisión 2

A la hora de guardar los nombres de los jugadores, tenía dos opciones, usar el operador "||" o el operador "??" para dar nombres por defecto si los jugadores no introducían los suyos. 
Me decanté por el operador "||", ya que si el jugador no pone nombre, input.value devuelve una cadena vacía ("", que es falsy) y se utiliza el nombre por defecto.
Utilizando el operador "??", si el jugador no escribe su nombre, no se pondrá el nombre por defecto, ya que "" (vacío) no es null ni undefined.




  
