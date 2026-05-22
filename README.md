# Proyecto Left&Right
Trabajo en equipo de la asignatura de Diseño y Desarrollo de Juegos Web.

## Introducción
Left&Right es un "catcher game" en línea.

Las partidas, divididas en multijugador e individuales, presentan dos modos de juego claramente diferenciados entre sí; el multijugador se basa en el tiempo, mientras que el de un solo jugador en la minimización de errores. Aun así, ambas consisten en el desplazamiento lateral y vertical de los jugadores para conseguir el mayor número de objetos que caen, en este caso, argumentos.

## Descripción del diseño del juego
El diseño del juego varía en función del estilo de partida elegido por parte del jugador.

El modelo multijugador consiste en partidas en multijugador local de 3 minutos en las que los jugadores se desplazan mediante las teclas asociadas a cada personaje. Los elementos distintivos de este modelo de juego son, por un lado, el aumento de la velocidad de caída de los argumentos a medida que avanza el tiempo y, por el otro, el martillo como elemento de competición. Dicho objeto permite al jugador que lo recoge aturdir a su rival durante 4 segundos y, a partir del primer golpe (aunque este sea en el aire), el rival puede robarlo.

Las partidas individuales, en cambio, no disponen de temporizador, sino que progresan en base a un aumento de la dificultad, traducida en un aumento de la velocidad de caída de los argumentos, así como la generación más rápida de estos. 

## Partes relevantes de la implementación 
Con tal de balancear el relevante aumento de velocidad del estilo multijugador, se eligió que, cuando alcanza valores altos, los argumentos sean capaces de atravesar las plataformas, hecho que los realentiza ligeramente.

## Conclusiones

## Problemas hallados
Las animaciones han resultado ser el mayor problema durante la implementación; el cambio de tamaño de los sprites de la animación del golpe con el martillo en relación a las animaciones base causa un desplazamiento del centro del sprite que modifica los colisionadores, provocando que estos no respondan correctamente.
Además, el posicionamiento aleatorio de las plataformas en el modo de juego individual lo dificultaba en exceso, por lo que se tuvo que ajustar.

## Manual de usuario
Los controles básicos son los siguientes:

Comunes:
ESC - Menú de pausa

Jugador 1 (también se aplican al modo un jugador)
A - Avanzar hacia la izquierda
W - Salto
D - Avanzar hacia la derecha
S - Golpe con el martillo

Jugador 2
← - Avanzar hacia la izquierda
↑ - Salto
→ - Avanzar hacia la derecha
↓ - Golpe con el martillo
