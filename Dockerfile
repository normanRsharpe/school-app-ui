FROM node:10
# creating app directory
ENV SRC=/usr/src/app
RUN useradd --user-group --create-home --shell /bin/false app &&\
  mkdir -p $SRC
WORKDIR $SRC
# Install app dependencies
COPY . $SRC
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
