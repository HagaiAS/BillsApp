'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];

function CalendarCtrl($scope,$http) {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    

	

	
/* 	$scope.events = [
	  {title: 'אירוע של יום שלם',start: new Date(y, m, 1)},
	  {title: 'אירוע ארוך',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	  {id: 999,title: 'אירוע חוזר',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	  {id: 999,title: 'אירועחוזר',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	  {title: 'יום הולדת',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	  {title: 'לינק חיצוני',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ]; */
	
    
	


	//$scope.events = [{id:'23442',title:'michael@ggg.com',start:'2013-05-22'},{id:'ewqewqe',title:'mumba',start:new Date(y, m, 1)}]
	
   $scope.events =[];
 
   $scope.eventSource = {
            url: '/api/calendarlist'			
   }; 
   
    setInterval( function()
    {
        console.log( 'automatically update view' );
		$http.get('/api/calendarlist').then(function(res){
				 $scope.events.length = 0;    
				 res.data.forEach(function(item) {
					 if(item.file){
						$scope.events.push({
							title: item.title,
							start: new Date(item.start * 1000),
							file: item.file,
							allDay: false,
							id: item.id
						});
					}else{
							$scope.events.push({
							title: item.title,
							start: new Date(item.start * 1000),
							//file: 'download/' + '51b5d0849dfaff9016000001',
							allDay: false,
							id: item.id						
						});
					}				
					});			
		});	
		//fullCalendar( 'rerenderEvents' );
    }, 30000 );
	
	
    	$http.get('/api/calendarlist').then(function(res){
		   
				 res.data.forEach(function(item) {
					 if(item.file){
						$scope.events.push({
							title: item.title,
							start: new Date(item.start * 1000),
							file: item.file,
							allDay: false,
							id: item.id
						});
					}else{
							$scope.events.push({
							title: item.title,
							start: new Date(item.start * 1000),
							//file: 'download/' + '51b5d0849dfaff9016000001',
							allDay: false,
							id: item.id						
						});
					}				
					});			
		});	
	
	// $scope.events = function(start, end, callback) {
	   // $http.get('/api/calendarlist').then(function(res){
				// $scope.events = res.data; 
				 // var events = [];			 
				 // res.data.forEach(function(item) {
						// events.push({
							// title: item.title,
							// start: new Date(item.start * 1000) 
						// });
					// });	
				// callback(events);	
			// });
	// };	
	
    $scope.addChild = function() {
      $scope.events.push({
        title: 'אירוע חדש',
        start: new Date(y, m, d),
        end: new Date(y, m, d+1)
      });
    };
 
    $scope.remove = function(index) {
      
	  $http({
			url: "/api/del/" + $scope.events[index].id,
			method: "GET",
			data: {}
		}).success(function(data, status, headers, config) {
			$scope.events.splice(index,1);
		}).error(function(data, status, headers, config) {
			//$scope.status = status;
		});
    };
  /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };
	    /* alert on eventClick */
    $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
        $scope.$apply(function(){
          $scope.alertMessage = ('Day Clicked ' + date);
        });
    };
	  /* alert on Drop */
     $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
        $scope.$apply(function(){
          $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
        });
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
        $scope.$apply(function(){
          $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
        });
    };
	/* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
	
   $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
	
	$scope.eventRender=function(event,element,calEvent) {	
		if(event.file) {
			element.find(".fc-event-title").after($("<span class=\"fc-event-icons-rtl\"></span>").html("<a href=\"/download/"+ event.file +"\"><img src=\"images/pdf.gif\" onclick=\"\"/></a>"));
		}		
    };

	$scope.eventMouseover=function(event, jsEvent, view) {
	};
	
	$scope.eventDrop=function( event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ) {
		if(dayDelta !== 0){
			$http({
				url: "/api/upd",
				method: "POST",
				data: $.param(event),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}	  
			}).success(function(data, status, headers, config) {
				//$scope.events.splice(index,1);
			}).error(function(data, status, headers, config) {
				//$scope.status = status;
			});
		};
	};

    $scope.eventSources = [$scope.events];
	
		/* config object */
    $scope.uiConfig = {
      calendar:{
        height: 550,
        editable: true,
		isRTL: true,
		selectable: true,
		disableResizing: true,
        header:{
          left: 'agendaDay agendaWeek month',
          center: 'title',
          right: 'today next,prev'
        },
        eventClick: $scope.alertEventOnClick,
        eventResize: $scope.alertOnResize,
		select: $scope.alertEventOnClick,
		eventRender: $scope.eventRender,
		eventMouseover: $scope.eventMouseover,
		eventDrop: $scope.eventDrop
      }
    };

}