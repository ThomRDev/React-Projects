// setupTests.js se ejecuta cada ves que haces npm run test
// para extender mas funcionalidades de expect y que tengas mas metodos
import '@testing-library/jest-dom/extend-expect';
// import 'jest-dom/extend-expect';

// configuracion de ensyme
import Enzime from "enzyme" 
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { createSerializer } from "enzyme-to-json"

Enzime.configure({ adapter : new Adapter() });

// para parsear el resultado del snashot a una vista html
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

