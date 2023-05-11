# El Primo GPT

![El Primo GPT](https://res.cloudinary.com/douvery/image/upload/v1683834703/w3kga4tuithp2li3axux.png)

El Primo GPT es un proyecto que integra la API de OpenAI con WhatsApp utilizando el paquete de Node.js `whatsapp-web.js`. El bot de chat, apodado "El Primo", utiliza el modelo GPT-3.5-turbo de OpenAI para responder a los mensajes de WhatsApp que contienen la palabra "primo".

Además, este bot también puede generar imágenes utilizando la API de OpenAI cuando recibe un mensaje que contiene la palabra "imagen".

## Requisitos

- Node.js
- Una clave de API de OpenAI
- Cuenta de WhatsApp

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto e instala las dependencias con el comando `npm i`.
3. Dentro del archivo `.env`, agrega tu clave de API de OpenAI como se muestra a continuación:

   ```
   OPENAI_API_KEY=[YOUR_API_KEY]
   ```

   Remplaza `[YOUR_API_KEY]` por tu API key.

4. Para iniciar el bot, usa el comando `npm run start`.

## Uso

1. Una vez que inicies el bot, se generará un código QR en tu terminal. Escanea este código con tu aplicación de WhatsApp en tu teléfono para iniciar la sesión de WhatsApp Web.
2. Ahora puedes empezar a enviar mensajes a "El Primo". Si tu mensaje contiene la palabra "primo", "El Primo" responderá utilizando el modelo GPT-3.5-turbo de OpenAI.
3. Si tu mensaje contiene la palabra "imagen", "El Primo" generará una imagen basada en el contenido de tu mensaje utilizando la API de OpenAI y te la enviará.

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
