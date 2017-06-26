FROM node
RUN mkdir -p /app/
COPY app.js /app/
COPY package.json /app/
COPY index.html /app/
RUN mkdir -p /app/static
COPY /static/ /app/static
WORKDIR /app/
RUN npm install
EXPOSE 3000
CMD node app.js