require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

// Configura AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.BUCKET_NAME;

// Función para descargar imágenes
async function downloadImages(apiUrl, localFolder) {
  try {
    const response = await axios.get(apiUrl);
    const images = response.data; // Ajusta según la estructura de la respuesta de tu API

    if (!fs.existsSync(localFolder)) {
      fs.mkdirSync(localFolder, { recursive: true });
    }

    for (const img of images) {
      const imageUrl = img.url; // Ajusta según la estructura de tu API
      const imageName = path.basename(imageUrl);

      const imagePath = path.join(localFolder, imageName);
      const imageResponse = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Descargada: ${imageName}`);
    }
  } catch (error) {
    console.error('Error al descargar imágenes:', error.message);
  }
}

// Función para subir imágenes a S3
async function uploadToS3(localFolder) {
  try {
    const files = fs.readdirSync(localFolder);

    for (const file of files) {
      const filePath = path.join(localFolder, file);

      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucketName,
        Key: file, // Nombre del archivo en el bucket
        Body: fileContent,
        ContentType: 'image/jpeg', // Cambia según el tipo de archivo
      };

      await s3.upload(params).promise();
      console.log(`Subido a S3: ${file}`);
    }
  } catch (error) {
    console.error('Error al subir imágenes a S3:', error.message);
  }
}

// Ejecutar las funciones
(async () => {
  const apiUrl = 'https://example.com/api/images'; // URL de tu API
  const localFolder = path.join(__dirname, 'imagenes');

  await downloadImages(apiUrl, localFolder);
  await uploadToS3(localFolder);

  console.log('Proceso completado.');
})();
