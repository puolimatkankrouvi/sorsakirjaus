const server = require('./server.js');
//Supertest and jest
const request = require('supertest');

afterAll( () =>{
	server.close();
});


const species = [
  {
    name: 'mallard'
  },
  {
    name: 'redhead'
  },
  {
    name: 'gadwall'
  },
  {
    name: 'canvasback'
  },
  {
    name: 'lesser scaup'
  }
];


//Testing getting species
describe("get species" , () =>{
	it("Should get species", async () => {
		//get supertest to http://localhost:8081/species
		const response = await request(server).get('/species');

		//Expects response to have status code 200/OK
		expect(response.status).toEqual(200);
		//Expects response type to be application/json
		expect(response.type).toEqual("application/json");

		expect(response.body).toEqual(species);
	});
});



//Testing getting sightings
describe("Get sightings" , () =>{
	it("Should get sightings", async () => {
		//get supertest to http://localhost:8081/sightings
		const response = await request(server).get('/sightings');

		//Expects response to have status code 200/OK
		expect(response.status).toEqual(200);
		//Expects response type to be application/json
		expect(response.type).toEqual("application/json");

		
		for( i in response.body){
			//JSON fields to be in all array objects of response
			expect(response.body[i]).toHaveProperty('id');
			expect(response.body[i]).toHaveProperty('dateTime');
			expect(response.body[i]).toHaveProperty('description');
			expect(response.body[i]).toHaveProperty('species');
			expect(response.body[i]).toHaveProperty('count');
		}
		
	});
});


describe("Post empty sighting" ,() => {
	it( "Should get 404", async() => {

		

		const response = await request(server).post('/sightings');

		//Expects response to have status code 404
		expect(response.status).toEqual(404);
		//Expects response type to be application/json
		expect(response.type).toEqual("text/plain");
	});
});



describe("Post a new sighting", () => {
	it("Should return a JSON", async () => {

		const newSighting = { 
        	'count': 2,
        	'species': 'gadwall',
        	'description': 'Sorsapari pesänrakennuspuuhissa',
        	'dateTime': '2017-04-12T10:10:00Z'
		};

		const response = await request(server).post('/sightings').send(newSighting).set('Accept','application/JSON');

		//Expects response to have status code 200/OK
		expect(response.status).toEqual(200);
		//Expects response type to be application/json
		expect(response.type).toEqual("application/json");
	});
});


