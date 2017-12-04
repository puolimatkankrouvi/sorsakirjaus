
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

var bodyParser = require('koa-bodyparser');
app.use(bodyParser());


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
router.post('/sightings', setSighting);
router.get('/species',  getSpecies);

router.options('/sightings', cors(corsOptions));


//This is async function in order to wait info from database
async function getSightings(ctx){
  sightings = await db.selectSightings();
  ctx.body = sightings;
}

async function setSighting(ctx){
  var post_body = await ctx.request.body;

  //If post_body is empty aka empty object {},
  // send 404 response
  if( Object.keys(post_body).length === 0 &&
      post_body.constructor === Object){
    ctx.throw(404);
  }
  else{
    if(post_body.id == null){
      //Inserting new sighting
      await db.insertSighting(post_body);
    }

    ctx.body = post_body;
  }
  
}

function getSpecies(ctx){
  ctx.body = species;
}


app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, function() {
  console.log('Server running at port %s.',port);
});


//Export is used for testing
module.exports = server;
