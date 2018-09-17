const path = require('path');

const PUBLIC_PATH =  path.join(__dirname, '/public');
const PRODUCTS_IMG_PATH = './assets/img/products';

const UPLOAD_PATH = path.join(PUBLIC_PATH, PRODUCTS_IMG_PATH);

module.exports = {
  PUBLIC_PATH,
  PRODUCTS_IMG_PATH,
  UPLOAD_PATH
}