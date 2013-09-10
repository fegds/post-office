'use strict';

/* Controllers */
angular.module('PO.controllers', [])
.controller('MainCtrl', ['$scope', '$location', '$http', '$window',
	function ($scope, $location, $http, $window){

		/*
		var route = Route,
			menus = [
				{
					text: '开发',
					id: 'coding'
				},
				{
					text: '测试',
					id: 'test'
				},
				{
					text: '常见误区',
					id: 'tip'
				}
				/*
				{
					text: '给设计师',
					id: 'design'
				}
				*./
			];

		for(i=0; i<menus.length; i++){
			item = menus[i];
			item['ctrl'] = Route[item.id].id;
			item['url'] = Route[item.id].url;
		}

		$scope.menus = menus;

		$scope.$on('$routeChangeSuccess', function(e, current, previous) { 
			var currentCtrl = current.$$route ? current.$$route.controller : Route.coding.id,
				 prevCtrl = previous && previous.$$route ? previous.$$route.controller : '';
			if(prevCtrl){
				angular.element(document.getElementById('route_' + prevCtrl)).removeClass('active');
			}
			angular.element(document.getElementById('route_' + currentCtrl)).addClass('active');
		});
		*/

	}
])
.controller('ComposeCtrl', [ '$scope', '$http', 'Base64', 'log',
	function ($scope, $http, Base64, log){

		var sendList = JSON.parse(localStorage.getItem('send-list'));

		$scope.tos = [
			'fe_gds@163.com',
			'lubenben@outlook.com'
		];

		if(sendList){
			$scope.mail = sendList;
		}else{
			$scope.mail = {
				from: 'Test <f2e@gds.com>',
				to: angular.copy($scope.tos),
				subject: 'Subject [Test]',
				customTo: ''
			};
		}

		$scope.send = function(mail){

			var i,
				to = [],
				data = angular.copy(mail),
				to_raw = data['to'],
				customTo = $scope.mail.customTo.split(';')
				;

			to_raw = to_raw.concat(customTo);

			for(i=0; i<to_raw.length; i++){
				to.push('to=' + to_raw[i]);
			}
			delete data['to'];

			localStorage.setItem('send-list', JSON.stringify($scope.mail));

			data.html = data.html.replace(/<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi, "<img$1 src=$2" + data.imagePath + "$3$2");

			$http.post(
				'api-compose/' + '?' + to.join('&'),
				$.param(data),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic ' + Base64.encode('api:key-62kdq-tgqtbkgo1lxuo31543x7mvd-x0')
					}
				}
			).
			success(function(){
				log('发送成功');
			}).
			error(function(){
				log('发送失败');
			})
			;
		};
	}
])
;
