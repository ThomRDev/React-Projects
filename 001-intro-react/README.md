# Inicios en React

Para comenzar en react no necesitamos instalar nada, si ya tenemos un proyecto
que en php o con js y html vanilla, podemos agregar enlaces en las cabeceras para poder utilizar react.
Esto se debe ya que react es una libreria.

[Documentación oficial de React con CDN](https://es.reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute)

[Enlaces](https://es.reactjs.org/docs/cdn-links.html)

```html
    <!-- Ultima version 7/04/2022 React 18 -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- tambien necesitaremos Babel -->
    <!-- Y utilizaremos babel para poder escribir jsx sino js no permitira crear elementos html en el script -->
    <!-- https://babeljs.io/docs/en/babel-standalone -->
    <!-- Implicatamente en un proyecto de React se utiliza Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```
