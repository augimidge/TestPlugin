import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
.when('/',
	{
	template,
	resolve:
		{
		currentTime($http)
			{
			return $http.get('../api/augi_testplugin/example').then(function (resp) {
				return resp.data.time;
			});
		}
	}
});

uiModules
.get('app/augi_testplugin', [])


.controller('augiTestpluginHelloWorld', function ($scope, $route, $interval,$http) {
  $scope.title = 'Augi Testplugin';
  $scope.description = 'buhahahahah';
  
   $http.get(`../api/elasticsearch_status/test`).then((response) => {
	     $scope.test = response.data;
	   });
  
  
  
  $http.get('../api/elasticsearch_status/indices').then((response) => {
	   $scope.title = response.data;
  });
	    
  $http.get(`../api/elasticsearch_status/index/logstash-0`).then((response) => {
	  $scope.description = response.data;
	  });
  
  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1337, 'second').format('HH:mm:ss');
  }, 1000);

  $scope.$watch('$destroy', unsubscribe);
})
