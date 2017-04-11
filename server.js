const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var nunjucksRender = require('gulp-nunjucks-render')

var db
MongoClient.connect('mongodb://creative:creative84@ds155150.mlab.com:55150/first-crud-app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function(){
      console.log('Crud application running on 3000 port, MongoDB is connected too')
  })
})


app.use(bodyParser.urlencoded({extended: true}));



app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
app.get('/about',function(req,res){
  res.send("I was a PHP/Joomla developer")
})

app.get('/contact',function(req,res){
  res.send("House 5, street 21, G13/3, Islamabad")
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
      //console.send(req.body)
      console.log('saved to database')
      res.redirect('/')
    })
})
