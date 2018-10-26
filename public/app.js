(function() {
  var app = new Vue({
    el: '#app',
    data: {
    id: null,
    accountNumber: null,
    name: null,
    balance: null,
    pin: null,
    accounts: []
    },
    created: function() {
    var self = this;
    axios.get('http://localhost:3300/api')
      .then(function(res) {
        self.accounts = res.data;
      })
      .catch(function(err) {
        self.accounts = [];
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
    }
  });
})();