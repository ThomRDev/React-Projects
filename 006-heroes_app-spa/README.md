# Manipulacion de imagenes estaticas con create-react-app

## Colocarnos directamente donde esta el public

Lo que indica esto es que crearemos una carpeta con la imagenes
dentro de public y cuando se haga el `build` esta carpeta se copia
y desde react estariamos accediendo a estas imagenes con
`src={"../assets/mi-imagen.png"}` en el src de la imagen, tendriamos que buscar cual es el path

## Import

Otra forma tambien el import de la imagen, siempre y cuando
la imagen se encuentra en la carpeta `src`, te tal manera
`import imagen from "./src/assets/mi-imagen-png"`
y lo colocarios en el src de la imagen `src={imagen}`

Pero tendriamos que hacer el import de muchas imagenes para un grid

## si queremos que sea dinamica

Lo que haremos es colocar la carpeta assets en el src como en el ejemplo anterior, pero para cargar las imagenes de forma dinamica usaremos [requireContext](https://webpack.js.org/guides/dependency-management/#requirecontext)

```js
// true para que busque en los subdirectorios
  const images = require.context("pathDirectorioImagenes",true)
  <img src={images("imagen.png")} alt="">
```
