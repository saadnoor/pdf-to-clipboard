# PDF To Clipboard 
This is a tool to extract the text from PDF file.

[See Live Demo](https://pdf-to-clipboard.herokuapp.com/)

In this project:
1. You can extract the text from pdf file
2. Copy the text content of pdf by single click
3. If you login, you can see all the file you've uploaded
4. You can download and copy text from any previous files.

## Prerequisites
1. Install [Node.js(14.9.0)](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI(11.0.3): `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`


## Developing
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000)

### Docker
1. `docker-compose up`
2. Go to [localhost:3000](http://localhost:3000)


### Deployment to Heroku
It was a CI/CD pipeline written, named deploy.yml, configure your heroku variables according to that.


### Author
* [Saadnoor Salehin](https://github.com/saadnoor)
