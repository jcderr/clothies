angular
  .module('clothiesApp')
  .controller('LoginController', LoginController);


LoginController.$inject = ['auth', '$location'];
function LoginController(auth, $location) {
  var vm = this;

  vm.errored = false;
  vm.email = '';
  vm.password = '';
  vm.login = login;

  function login() {
    auth.login(vm.email, vm.password, function (error) {
      vm.errored = false;
      if (error !== undefined) {
        vm.errored = true;
        return;
      }

      $location.url('/');
    });
  }
}
