const SERVER_NAME = 'product-api';
const PORT = 7000;
const HOST = '127.0.0.1';

const restify = require('restify');

//Invoke the persistence engine to save the products (Just like a mock database)
const productMockDataBase = require('save')('products');
// Create the restify server
const server = restify.createServer({ name: SERVER_NAME });

//Verbs Count
let getCount = 0;
let postCount = 0;
let deleteCount = 0;

server.listen(PORT, HOST, function () {
	console.log('Server %s listening at %s', server.name, server.url);
	console.log('**** Resources: ****');
	console.log('*********************************');
	console.log('Endpoints:');
	console.log('----------------------------');
	console.log(`   GET PRODUCTS (method: GET) => ${HOST}:${PORT}/products`);
	console.log(
		`   GET SINGLE PRODUCT (method: GET) => ${HOST}:${PORT}/products/:id`
	);
	console.log(
		`   DELETE A PRODUCT (method: DELETE) => ${HOST}:${PORT}/products/:id`
	);
	console.log(`   ADD A PRODUCT (method: POST) => ${HOST}:${PORT}/products`);
});

// Get all products in the system
server.get('/products', function (req, res, next) {
	//Increment the get count
	getCount += 1;

	//Log the count and endpoint info
	console.log(
		`Processed Request Count--> Get: ${getCount}, Post:${postCount}, Delete: ${deleteCount}`
	);
	console.log('GET /products params=>' + JSON.stringify(req.params));
	console.log('>get all products GET: received request');

	// Find every product within the given collection
	productMockDataBase.find({}, function (error, products) {
		console.log('< get all products GET: sending response');
		// Return all of the products in the system
		res.send(products);
	});
});

// Get a single product by their product id
server.get('/products/:id', function (req, res, next) {
	//Increment the get count
	getCount += 1;

	//Log the count and endpoint info
	console.log(
		`Processed Request Count--> Get: ${getCount}, Post:${postCount}, Delete: ${deleteCount}`
	);
	console.log('GET /products/:id params=>' + JSON.stringify(req.params));
	console.log('>get a single product GET: received request');

	// Find a single product by their id within the mock database
	productMockDataBase.findOne(
		{ _id: req.params.id },
		function (error, product) {
			// If there are any errors, pass them to next in the correct format
			if (error) return next(new Error(JSON.stringify(error.errors)));

			if (product) {
				console.log('<get a single product GET: sending response');
				// Send the product if no issues
				res.send(product);
			} else {
				// Send 404 header if the user doesn't exist
				res.send(404);
			}
		}
	);
});
