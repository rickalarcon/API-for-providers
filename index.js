const express = require("express");
const bodyParser = require("body-parser")
const app = express();
//const json = require(providers.json)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//File system to read json file
const fs = require('fs')
let json = fs.readFileSync('providers.json');

//Convert json into js object
let obj = JSON.parse(json);


app.get("/", (req, res) => {

//access the provided query parameters
 const query = {
 	lastname : req.query.last_name,
 	city : req.query.city
 }
  let list =[];

  for(let e of obj){
	if(e.last_name == query.lastname && e.locations[0].city == query.city){
     list.push(e) 
	}
	else if(e.last_name == query.lastname){
     list.push(e) 
	}
	else if(e.locations[0].city == query.city){
     list.push(e) 
	}
  }
  res.send(list);
})

let server = app.listen(8080, function(){
	console.log("server is listening on port 8080")
})
