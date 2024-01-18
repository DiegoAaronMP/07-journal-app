

export const fileUpload = async(file) => {
    if (!file) throw new Error('No hay archivo para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxby4q1ds/image/upload';

    // formData es el body
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        // Hacer la peticion
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        // Si no se pudo subir la imagen
        if(!resp.ok) throw new Error('No se pudo subir la imagen');

        // caso contario
        const cloudResp = await resp.json();

        // console.log(cloudResp);
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}