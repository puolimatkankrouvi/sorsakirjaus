
/*
  My version of the server of Vincit summer-2018 exercise

  Koa.js, MongoDB

*/


//MongoDB database with mongoose in db.js
const db = require('./db.js');


const koa = require('koa');
var app = new koa();

const router = require('koa-router')();

const json = require('koa-json')
app.use(json());


const cors = require('@koa/cors');
var corsOptions = {
  origin: "*", //Cross-origin-resource sharing allowed from all domains
  allowHeaders: "Origin, X-Requested-With, Content-Type, Accept" //Use these headers when request is made
}
app.use( cors(corsOptions) );


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




router.get('/sightings', getSightings);
router.post('/sightings', cors(corsOptions), setSighting);
router.get('/species',  getSpecies);


//This is async function in order to wait info from database
async function getSightings(ctx){
  sightings = await db.selectSightings();
  ctx.body = sightings;
}

async function setSighting(ctx){
  var post_data = await ctx.request.body;
  console.log(post_data);
  //await db.insertSighting(post_data);
  ctx.body = post_data;
}

function getSpecies(ctx){
  ctx.body = species;
}


app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT ? process.env.PORT : 8081;
app.listen(port, function() {
  console.log('Server running at port %s.',port);
});
