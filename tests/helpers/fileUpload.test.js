import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";
import { getEnvironments } from '../../src/helpers/getEnviroments';

const env = getEnvironments();

cloudinary.config({
    cloud_name: env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: env.VITE_CLOUDINARY_API_KEY,
    api_secret: env.VITE_CLOUDINARY_API_SECRET,
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        // Crear archivo
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // Eliminar la imagen de cloudinary para no tener basura
        const segments = url.split('/');
        // al final esta el id
        // replace elimina el .png del string
        const imageId = segments[segments.length - 1].replace('.png', ''); 

        await cloudinary.api.delete_resources('journal-app/'+[imageId],{
            resource_type: 'image'
        });
    });

    test('debe de retornar null', async() => { 
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});