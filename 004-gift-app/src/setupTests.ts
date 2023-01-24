// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzime from "enzyme" 
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { createSerializer } from "enzyme-to-json"

Enzime.configure({ adapter : new Adapter() });

// para parsear el resultado del snashot a una vista html
//@ts-ignore
// https://stackoverflow.com/questions/54794454/jestserializer-is-not-assignable-to-parameter-of-type-snapshotserializerplugi
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));