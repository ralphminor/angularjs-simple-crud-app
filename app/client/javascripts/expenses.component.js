(function() {
  'use strict'

  angular.module('app')
    .component('expenses', {
      controller: controller,
      template: `
        <h3>Expenses</h3>
        <form ng-submit="$ctrl.addExpense()">
          <div class="row">
            <p class="form-group col-md-3">
              <label for="category">Category</label>
              <input id="new-category" class="form-control" ng-model="$ctrl.expense.category">
            </p>
            <p class="form-group col-md-3">
              <label for="amount">Amount</label>
              <input type="number" id="new-amount"  step=".01" class="form-control" ng-model="$ctrl.expense.amount">
            </p>
          </div>
          <button type="submit" class="btn btn-primary">Add Expense</button>
        </form>
        <table class="table table-condensed">
          <thead>
            <th>ID</th>
            <th>Category</th>
            <th>Amount</th>
          </thead>
          <tbody>
            <tr ng-repeat="expense in $ctrl.expenses">
              <td>{{ expense.id }}</td>
              <td>{{ expense.category }}</td>
              <td>{{ expense.amount }}</td>
              <td>
                <a href="#" ng-click="$ctrl.editExpense($event, expense)">edit</a>
                <a href="#" ng-click="$ctrl.deleteExpense($event, expense)">delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <form ng-submit="$ctrl.updateExpense()" ng-if="$ctrl.editingExpense">
          <p>
            Category: <input id="edit-category" ng-model="$ctrl.editingExpense.category">
          </p>
          <p>
            Amount: <input id="edit-amount" ng-model="$ctrl.editingExpense.amount">
          </p>
          <p>
            <button type="submit">Update Expense</button>
          </p>
        </form>
      `
    })

  controller.$inject = ['$http']

  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.addExpense = addExpense
    vm.deleteExpense = deleteExpense
    vm.editExpense = editExpense
    vm.updateExpense = updateExpense

    function onInit() {
      $http
      .get('/api/expenses')
      .then((response) => {
        vm.expenses = response.data
      })
    }

    function addExpense() {
      $http
      .post('/api/expenses', vm.expense)
      .then((response) => {
        vm.expenses.push(response.data)
        delete vm.expense
      })
    }

    function updateExpense() {
      $http
      .patch(`/api/expenses/${vm.editingExpense.id}`, vm.editingExpense)
      .then((response) => {
        const expense = response.data
        const originalExpense =vm.expenses.find(e => e.id == expense.id)
        Object.assign(originalExpense, expense)
        delete vm.editingExpense
      })
    }

    function deleteExpense(e, expense) {
      e.preventDefault()
      $http
      .delete(`/api/expenses/${expense.id}`)
      .then(() => {
        vm.expenses.splice(vm.expenses.indexOf(expense))
      })
    }

    function editExpense (e, expense) {
      e.preventDefault()
      vm.editingExpense = angular.copy(expense)
    }
  }

}());