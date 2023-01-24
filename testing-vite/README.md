# **Testing Library with vite**

## Configuraciones

```sh
  # https://jestjs.io/
  # se trabajara con testing library y jest
  npm i jest -D # or yarn add --dev jest
  npm i @types/jest -D
  # y luego agregar un scripts llamaddo test en el package.json
  {
    "scripts":{
      "test":"jest" # "test" :"jest --watchAll" # sino ponemos el --watchAll no se recargara si hay cambiaos y tendremos que 
      # cancelar y volver a ejecutar
    }
  }
  #configuracion con babel para el codigo moderno
  npm i -D babel-jest @babel/core @babel/preset-env

  #crear un archivo de babel.config.js
  babel.config.js
  module.exports = {
    presets: [['@babel/preset-env',{ targets : { node: 'current' } }]]
  }

  # otra configuracion
  # indicandole de como quiero que trabaje jest
  jest.config.js
  module.exports = {
    setupFiles: ['./jest.setup.js']
  }

  # creando jest.setup.js esto se ejucutará justo cuando inician las pruebas
  # polifylls etc, ejemplo si estamos utilizando fetch en una version menor que la 18
  npm i -D whatwg-fetch
  # dentro del jest.setup.js
  import 'whatwg-fetch'

  # ejecutar las pruebas
  npm test

  # configuracion para los test con react ya que jest es muy limitado para interactuar con componente en react
  # https://jestjs.io/docs/tutorial-react
  # https://testing-library.com/docs/react-testing-library/intro
  # nos servira para manejar el DOM virtual
  npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom @babel/preset-react
  
# // mucha ayuda
# // https://testing-playground.com/
# https://timdeschryver.dev/blog/making-sure-youre-using-the-correct-query#tips-to-find-the-correct-query
```
