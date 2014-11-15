'use strict';

angular.module('magecomDirectives')
  .directive('spin', function() {
    return {
        templateUrl: 'partials/spinner.html',
        scope: {
          'value' : "="
        },
        restrict: 'E',
        link: function(scope, element, attrs, ngModel) {
          var min,max,step,value,input,initial;
 
          element = angular.element(element);
 
          if(typeof attrs === 'undefined'){
            throw new Error('Spin.js attributes missing');
          } else {
            var jsonopt = angular.fromJson(attrs.options);
            var opt = jsonopt ? jsonopt : {};
            opt.initval = parseInt(scope.value);
            input = $("input[name='spin']",element);
            input.TouchSpin(opt);

            input.on('change', function(e){
              scope.value = input.val();
              
              //hack
              if(!scope.$$phase) {
                scope.$apply();
              }
 
            });
 
          }
        }
    };
}); 