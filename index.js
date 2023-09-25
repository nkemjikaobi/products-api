const SERVER_NAME = 'product-api';
const PORT = 7000;
const HOST = '127.0.0.1';

const restify = require('restify');

//Invoke the persistence engine to save the products (Just like a mock database)
const productMockDataBase = require('save')('products');
// Create the restify server
const server = restify.createServer({ name: SERVER_NAME });

server.listen(PORT, HOST, function () {
	console.log('Server %s listening at %s', server.name, server.url);
	console.log('**** Resources: ****');
	console.log('*********************************');
    console.log('Endpoints:');
    console.log("----------------------------")
	console.log(`   GET PRODUCTS (method: GET) => ${HOST}:${PORT}/products`);
	console.log(
		`   GET SINGLE PRODUCT (method: GET) => ${HOST}:${PORT}/product/:id`
	);
	console.log(
		`   DELETE A PRODUCT (method: DELETE) => ${HOST}:${PORT}/product/:id`
	);
	console.log(`   ADD A PRODUCT (method: POST) => ${HOST}:${PORT}/products`);
});
