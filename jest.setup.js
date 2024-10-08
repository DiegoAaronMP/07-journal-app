// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';


require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnviroments', () => ({
    getEnvironments: () => ({...process.env})
}))
