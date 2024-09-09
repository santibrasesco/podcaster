# Podcaster

Podcaster es una aplicación web SPA desarrollada con **Next.js** y **TypeScript** que permite visualizar el top 100 de los podcasts más escuchados, filtrar los resultados mediante un campo de búsqueda y ver los detalles de cada podcast. También es posible listar los últimos episodios de un podcast y reproducirlos desde la aplicación.

La aplicación se encuentra desplegada en el siguiente enlace:
[https://podcaster-cyan.vercel.app/](https://podcaster-cyan.vercel.app/)

## Características

- **Visualización del top 100 de podcasts**: Lista los 100 podcasts más escuchados a través de la API de iTunes de Apple.
- **Filtro de búsqueda**: Filtra los podcasts por título o autor.
- **Detalle de podcast**: Muestra información detallada sobre el podcast y sus últimos 20 episodios.
- **Reproducción de episodios**: Reproduce cualquier episodio desde el detalle del podcast.

## Tecnologías

- **Next.js**
- **React**
- **TypeScript**

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1. Clona este repositorio:
```
git clone https://github.com/tu-usuario/podcaster.git
```

2. Navega a la carpeta del proyecto:
```
cd podcaster
```

3. Instala las dependencias del proyecto utilizando npm:
 ```
 npm install
 ```

4. Ejecuta la aplicación en modo desarrollo:
``` npm run dev ```

5. Abre tu navegador web y visita http://localhost:3000 para ver la aplicación en funcionamiento.

## Modo Producción
Para ejecutar la aplicación en modo producción. Sigue estos pasos:

1. Abre una terminal en el directorio raíz de tu proyecto.

2. Ejecuta el siguiente comando para compilar los activos optimizados:
```
 npm run build
 ```

3. Para iniciar la aplicación en modo producción, utiliza:
 ```
  npm start
  ```
## Pruebas
La aplicación incluye pruebas unitarias y de integración utilizando Jest y React Testing Library. Para ejecutar las pruebas, usa el siguiente comando:
``` 
npm run test
 ```
