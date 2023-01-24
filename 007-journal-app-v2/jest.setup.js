import 'whatwg-fetch';

// para que funcione el SDK DE cloudinary
import 'setimmediate'

require('dotenv').config({
  path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments.ts', () => ({
  getEnvironments: () => ({ ...process.env })
}));