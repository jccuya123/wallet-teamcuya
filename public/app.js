(function() {
  var app = new Vue({
    el: '#app',
    data: {
    id: null,
    accountNumber: null,
    name: null,
    balance: null,
    pin: null,
    accounts: [],
    amount: null
    },
    created: function() {
    var self = this;
    axios.get('http://localhost:3300/api')
      .then(function(res) {
        self.accounts = res.data;
      })
      .catch(function(err) {
        console.log(err)
      });
    },
    methods: {
    clear: function() {
      this.id = null,
      this.accountNumber = null,
      this.name = null,
      this.balance = null,
      this.pin = null  
    },
    check: function() {
      var self = this;
      axios.get('/api/:id', {
          params: {
            accountNumber: self.accountNumber,
            pin: self.pin
          }
        })
        .then(function (response) {
          self.balance = response.data.balance
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deposit: function() {
      var self = this;
      var accountNumber = self.accountNumber;
      console.log(accountNumber)
      axios.put('/api/deposit/'+accountNumber, {
          pin: self.pin
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    }
  });
})();