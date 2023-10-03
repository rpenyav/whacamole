# Whac-A-Mole PWA

Progressive Web App (PWA) del juego Whac-A-Mole. Te permite jugar al juego de golpear topos directamente en tu móvil o navegador.

## Características

- Soporte para dispositivos móviles y navegadores web.
- 3 niveles de dificultad.
- Tiempo límite de 2 minutos.

## Demo
Para probar la PWA aquí. Se encuentra alojada en Render Server.

## Capturas de Pantalla

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/rpenyav/whacamole/blob/main/2023-10-03%2013_33_58-Wac-a-mole.png" alt="Home Page" height="450">
  <img src="https://github.com/rpenyav/whacamole/blob/main/2023-10-03%2013_34_16-Wac-a-mole.png" alt="Game Page" height="450">
</div>



## Instalación
Para visualizar el desarrollo, clonar el repositorio y en el directorio raíz ejecutar

`` npm install ``

y

`` npm start ``

Para testear las características PWA en localhost, realizar la build del proyecto y arrancar. Para ello:

`` npm run build `` 

y

`` serve -s build `` 

NOTA: es necesario tener instalado serve:

`` npm install -g serve ``

Para lanzar los test:

`` npm run test `` 

Nota sobre los test: el test del hook **useGameLogic.ts** produce un warning: **Warning: ReactDOM.render is no longer supported in React 18.** pero la batería de test es positiva. Esto es debido a que react-hooks para RTL está aún en desarrollo. 

## Stack Tecnológico

- Esta PWA se basa en tecnologías web estándar como HTML, CSS y JavaScript.
- Realizada con React (create react app) y service-worker.
- Desarrollada con Typescript.
- Ilustraciones realizadas con programa de vectores Freehand MX y InkScape para los SVG.
- La arquitectura es modular.
- Contiene tests unitarios.
- Código SOLID filtrado con EsLint salvo algunas excepciones.
- Disponbible sin conexión.

## Documentación exhaustiva

- Ver la [documentación acerca](https://app.gitbook.com/o/f6sc898kolNIxiLAEsFn/s/ZkSp7jFGr2u2Ev4xSokA/) del proceso de desarrollo.

