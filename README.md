# Mision1-Cliente

# Tres en raya
Se ha decidido hacer un tres en raya porque da bastante margen de mejora. Es un juego sencillo y básico, pero se puede ampliar con nuevas funcionalidades y reglas.

## Descripción
Se trata de un tablero 3x3 en el que dos jugadores compiten por conseguir tres símbolos iguales ("X" o "O") en línea. Puede ser en horizontal, vertical o diagonal.

## Lenguajes utilizados
- HTML
- CSS
- JavaScript

## IA utilizada
### Prompt 1: 
"Hasta ahora utilizaba onclick directamente en el html, pero en los apuntes de la asignatura he visto que se utiliza addEventListener. Cómo puedo usar addEventListener en mi 3 en raya? Y Cómo funciona?"
### Resultado 1 : 
Cambié los onclicks desde HTML por listeners desde JavaScript. Seleccioné las casillas con querySelectorAll() y recorrí todas las casillas para registrar un evento click en cada una.
Comprobé el resultado probando que todas las casillas respondían al clic, y que el juego seguía funcionando correctamente.

### Prompt 2:
"He visto en los apuntes que en vez de añadir un listener a cada elemento se puede añadir un único listener al elemento padre y se hereda o algo así. Sería mejor hacerlo así en mi tres en raya?"
### Resultado 2:
La IA me explicó que esto se llama delegación de eventos y que el listener no se hereda realmente. El evento del clic se propaga hasta el elemento padre.
En vez de añadir un listener a cada una de las nueve casillas, se puede añadir un único listener al tablero y utilizar event.target para saber qué casilla ha sido pulsada.
Para verificarlo revisé los apuntes, y efectivamente era así como funcionaba.
No obstante, decidí mantener un listener por casilla en esta primera versión, ya que la solución me resulta más sencilla de entender de momento. 

## Autopsia

### Decisión 1:
Decidí añadir un addEventListener a cada una de las nueve casillas porque al tratarse de un tablero pequeño me parece una solución sencilla de entender. No obstante, más adelante se intentará añadir delegación de eventos.

### Decisión 2:
Por otro lado, decidí guardar las combinaciones ganadoras en un array y recorrerlo para ver si hay ganador. De otro modo, se tendría que hacer un if enorme de comparaciones.



  
