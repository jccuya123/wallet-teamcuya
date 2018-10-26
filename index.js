var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var PORT = 3300;
var simpleJsonStore = require('simple-json-store');

var store = new simpleJsonStore('./data.json', { accounts: [] });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

//home html
app.get('/', (req, res) => { 
  res.render('../check.pug');
});

//fund transfer html
app.get('/fund', (req, res) => { 
  res.render('../fund.pug');
});

//check balance html
app.get('/check', (req, res) => { 
  res.render('../check.pug');
});

//deposit html
app.get('/deposit', (req, res) => { 
  res.render('../deposit.pug');
});

//withdraw html
app.get('/withdraw', (req, res) => { 
  res.render('../withdraw.pug');
});

//bills payment html
app.get('/bills', (req, res) => { 
  res.render('../bills.pug');
});

//all users
app.get('/api/', (req,res) => {
  var accounts = store.get('accounts'); 
  res.json(accounts);
})

//specific user
app.get('/api/:id', (req, res) => {
  var id = req.param.id;
  var all = store.get('accounts');
  var account = all.find(account => all.id == id);
  res.json(account);
});

//add user
app.post('/api/', (req, res) => {
  var all = store.get('accounts');
  var newUser = {
    id: all.length > 0 ? Number(all[all.length - 1].id) + Number(1) : 1,
    accountNumber: req.body.accountNumber,
    name: req.body.name,
    balance: req.body.balance,
    pin: req.body.pin
  };
  
  all.push(newUser);
  store.set('accounts',all);
  res.json(store.get('accounts'));
});

//update user
app.put('/api/:id', (req,res) => {
  var id = req.params.id;
  var all = store.get('accounts');
  let note = {};
  
  for (let i = 0; i < all.length; i++) {
    if (all[i].id == id) {
      all[i].accountNumber = req.body.accountNumber;
      all[i].name = req.body.name;
      all[i].balance = req.body.balance;
      all[i].pin = req.body.pin;
      note = all[i];
      break;
    }
  }

  store.set('accounts', all);
  res.json(note);
});

//update user using accountNumber
app.put('/api/deposit/:accountNumber', (req,res) => {
  var accountNumber = req.params.accountNumber;
  var all = store.get('accounts');
  let note = {};
  
  console.log(req.body);
  
  var user = all.find( u => u.accountNumber === accountNumber);

  console.log(user);

  for (let i = 0; i < all.length; i++) {
    if (all[i].accountNumber == accountNumber) {
      all[i].id = user.id;
      all[i].name = user.name;
      all[i].balance = Number(user.balance) + Number(req.body.balance);
      all[i].pin = user.pin;
      note = all[i];
      break;
    }
  }

  store.set('accounts', all);
  res.json(note);
});

app.put('/api/withdraw/:accountNumber', (req,res) => {
  var accountNumber = req.params.accountNumber;
  var all = store.get('accounts');
  let note = {};
  
  console.log(req.body);
  
  var user = all.find( u => u.accountNumber === accountNumber);

  console.log(user);

  for (let i = 0; i < all.length; i++) {
    if (all[i].accountNumber == accountNumber) {
      all[i].id = user.id;
      all[i].name = user.name;
      all[i].balance = Number(req.body.balance) - Number(user.balance);
      all[i].pin = user.pin;
      note = all[i];
      break;
    }
  }

  store.set('accounts', all);
  res.json(note);
});


app.set('view engine', 'pug');

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});