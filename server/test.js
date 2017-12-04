const server = require('./server.js');
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
		//Expects response body be the same as species
		expect(response.body.data).toEqual(species);
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
			//JSON fields to be in the array objects of response
			expect(response.body[i]).toHaveProperty('id');
			expect(response.body[i]).toHaveProperty('dateTime');
			expect(response.body[i]).toHaveProperty('description');
			expect(response.body[i]).toHaveProperty('species');
			expect(response.body[i]).toHaveProperty('count');
		}
		
	});
});


describe("Post signtings" ,() => {
	it( "Should post sightings", async() => {

		const newSighting = {
			description:"This duck was seen yesterday",
			count:"1",
			dateTime: "2016-12-12T10:10:00Z",
			species: "gadwall",
		};

		const response = await request(server).post('/sightings');

		//Expects response to have status code 200/OK
		expect(response.status).toEqual(200);
		//Expects response type to be application/json
		expect(response.type).toEqual("application/json");

		//JSON fields to be in the sighting object of the response
		expect(response.body[0]).toHaveProperty('id');
		expect(response.body[0]).toHaveProperty('dateTime');
		expect(response.body[0]).toHaveProperty('description');
		expect(response.body[0]).toHaveProperty('species');
		expect(response.body[0]).toHaveProperty('count');


	});
});

