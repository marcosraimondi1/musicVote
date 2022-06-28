# instalamos imagen de node
FROM node:16.14.0

# definimos la carpeta de trabajo
WORKDIR /backend

# update packages
RUN apt-get update \
    && apt-get install -y

# instalamos las dependencias
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# copiamos archivos exceptos los del .dockerignore
COPY . .

# definimos puertos
ENV PORT = 5000
EXPOSE 5000

# corremos la aplicacion
CMD ["npm", "run", "start"]



