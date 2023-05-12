const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const googleTTS = require('google-tts-api');
const axios = require('axios');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log(qrcode.generate(qr, { small: true }));
});

client.on('ready', () => {
  console.log('Conexion exitosa con whatsapp-web');
});

client.on('message', async (message) => {
  const senderName = message._data.notifyName;

  if (message.body.toLowerCase().includes('primo')) {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que contesta todo bien y corto, llamado El primo`,
        },
        {
          role: 'user',
          content: message.body,
        },
      ],
    });
    const generatedText = `${response.data.choices[0].message.content}`;

    const url = googleTTS.getAudioUrl(generatedText.trim(), {
      lang: 'es-us',
      slow: false,
      host: 'https://translate.google.com',
    });

    // Descargar el archivo de audio MP3 desde la URL
    const audioResponse = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    // Escribir el archivo de audio descargado en el disco
    const writer = fs.createWriteStream('./output.mp3');
    audioResponse.data.pipe(writer);

    writer.on('finish', () => {
      // Enviar el archivo de audio
      let media = MessageMedia.fromFilePath('./output.mp3');
      client.sendMessage(message.from, media);
    });

    writer.on('error', (error) => {
      console.error(error);
    });
  }

  if (message.body.toLowerCase().includes('imagen')) {
    const response = await openai.createImage({
      prompt: message.body,
      n: 1,
      size: '1024x1024',
    });

    // primero, descargamos la imagen de la url
    let filename = 'myImage.jpg';
    let file = fs.createWriteStream(filename);
    let request = https.get(response.data.data[0].url, function (response) {
      response.pipe(file);
    });

    // una vez que la imagen se descarga, la enviamos
    file.on('finish', function () {
      let media = MessageMedia.fromFilePath('./' + filename);

      client.sendMessage(message.from, media);
    });
  }
});

async function getResponse() {
  const response = await openai.createImage({
    prompt: 'Un robot vinci style con el logo de whatsapp',
    n: 1,
    size: '1024x1024',
  });
  console.log(response.data.data[0].url);
}

client.initialize();
