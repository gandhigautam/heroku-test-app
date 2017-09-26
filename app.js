const express = require('express');
const app = express();

//
// app.set('port', (process.env.PORT || 5000));
//
// app.get('/', function (req, res) {
//   res.send('Hello Gautam -I Really Love You so Much! why gautam?')
// })
//
// app.listen(app.get('port'), function() {
//   console.log('gautam test Node app is running on port', app.get('port'));
// });




// Preamble
var http = require ('http');
var mongoose = require ("mongoose");

var uristring =
  'mongodb://gautamDb:Gandhi%4041@gautamclusterdb-shard-00-00-grtix.mongodb.net:27017,gautamclusterdb-shard-00-01-grtix.mongodb.net:27017,gautamclusterdb-shard-00-02-grtix.mongodb.net:27017/gautamDbTest?ssl=true&replicaSet=gautamClusterDb-shard-0&authSource=admin'
   || 'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to  port 5000.
app.set('port', (process.env.PORT || 5000));

var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];


http.createServer(app, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  createWebpage(req, res);
}).listen( app.get('port'), function() {
  console.log('gautam test Node app is running on port', app.get('port'));
});


app.get('/test', function (req, res) {
  res.send('Hello Gautam -I Really Love You so Much! why gautam?')
})

app.get('/users', function (req, res) {
  createWebpage(req, res);
})


// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0}
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var PUser = mongoose.model('PowerUsers', userSchema);

// Clear out old data
PUser.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: 'Doe' },
  age: 25
});

// Saving it to the database.
johndoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var janedoe = new PUser ({
  name: { first: 'Jane', last: 'Doe' },
  age: 65
});
janedoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var alicesmith = new PUser ({
  name: { first: 'Alice', last: 'Smith' },
  age: 45
});
alicesmith.save(function (err) {if (err) console.log ('Error on save!')});







function createWebpage (req, res) {
  // Let's find all the documents
  PUser.find({}).exec(function(err, result) {
    if (!err) {
      res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
      // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
      var query = PUser.find({'name.last': 'Doe'}); // (ok in this example, it's all entries)
      query.where('age').gt(64);
      query.exec(function(err, result) {
	if (!err) {
	  res.end(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
	} else {
	  res.end('Error in second query. ' + err)
	}
      });
    } else {
      res.end('Error in first query. ' + err)
    };
  });
}




// The rudimentary HTML content in three pieces.
var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </h1> \
See the <a href="">supporting article on the Dev Center</a> to learn more about data modeling with Mongoose. \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="">github.com</a> </i></center>';
