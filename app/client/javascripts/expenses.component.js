(function() {
  'use strict'

  angular.module('app')
    .component('expenses', {
      controller: controller,
      template: `
      <h3>Expenses will go here...</h3>
      `
    })

  function controller() {
    const vm = this
  }

}());