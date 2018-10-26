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
    amount: null,
    senderAccountNumber: null,
    receiverAccountNumber: null
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
      var bal = Number(self.balance) + Number(self.amount);
      // console.log(accountNumber)
      axios.put('/api/deposit/'+ self.accountNumber, {
          // id: self.id,
          accountNumber: self.accountNumber,
          // name: self.name,
          balance: self.amount,
          pin: self.pin
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    withdraw: function() {
      var self = this;
      console.log(accountNumber)
      axios.put('/api/withdraw/'+self.accountNumber, {
          accountNumber: self.accountNumber,
          // name: self.name,
          balance: self.amount,
          pin: self.pin
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    bills: function() {
      var self = this;
      console.log(accountNumber)
      axios.put('/api/bills/'+self.accountNumber, {
          accountNumber: self.accountNumber,
          // name: self.name,
          balance: self.amount,
          pin: self.pin
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fund: function() {
      var self = this;
      var accountNumber = self.senderAccountNumber;
      var accountNumber2 = self.receiverAccountNumber;

      console.log(accountNumber)
      axios.put('/api/account/'+accountNumber, {
          pin: self.pin
        })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      axios.put('/api/account/'+accountNumber2, {
        pin: self.pin
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loan: function() {
      var self = this;
      var bal = Number(self.balance) + Number(self.amount);
      // console.log(accountNumber)
      axios.put('/api/loan/'+ self.accountNumber, {
          // id: self.id,
          accountNumber: self.accountNumber,
          // name: self.name,
          balance: self.amount,
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