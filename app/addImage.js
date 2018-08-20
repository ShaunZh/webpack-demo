let bigImage = document.createElement('img');
bigImage.src = require('../images/big.jpg');
document.body.appendChild(bigImage);

let smallImage = new Image();
smallImage.src = require('../images/small.jpg');
document.body.appendChild(smallImage);