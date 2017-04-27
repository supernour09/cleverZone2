app.controller('GamesController', [ "$scope", "$location", "$http","GamesService","CourseService", "QuestionService", function($scope, $location, $http,GamesService,CourseService, QuestionService) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.setGamePlay = function(id,type) {
		alert(type);
		GamesService.getGame(id , type)
		.then(function successCallback(response) {
			GamesService.setSelectedGameToPlay(response.data);
			if(type == "MCQ"){
				$location.path('/MCQ');
			}else if(type == "TF"){
				$location.path('/TF');
			}
		}, function errorCallback(response) {
			alert("Game Failed");
		});
	}

	$scope.getGamePlay = function() {
		$scope.GamePlay = GamesService.getSelectedGameToPlay();
		console.log($scope.GamePlay);
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.setGameToEdit = function(idd, type) {
		GamesService.getGame(idd, type)
		.then(function successCallback(response) {
			console.log(response.data.type);
			GamesService.setSelectedGameToEdit(response.data);
			if(type == "MCQ")
				$location.path('/add-mcq-question');
			else if(type == "TF")
				$location.path('/add-tf-question');
		}, function errorCallback(response) {
			alert("Game data in fetching failed");
		});
	}
	
	$scope.getGameToEdit = function() { //  may be not needed
		$scope.theGame = GamesService.getSelectedGameToEdit();
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.getScore = function(data) {
		console.log(data);
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.createGame = function() {

		data = {
			"name" : $scope.name,
			"descption" : $scope.decription,
			"imageSrc" : $scope.imgsrc
		}
		GamesService.insertGame(CourseService.getSelectedCourseToEdit().id,data ,$scope.type)
		.then(function successCallback(response) {
			console.log(response.status);
			console.log("Game created successfully");
			$location.path('/teacher');

		}, function errorCallback(response) {

			alert("Error! Game Creation Failed");
		});

	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.addQuestion = function() {
		
		
		alert( $scope.choice1);
		console.log(GamesService.getSelectedGameToEdit().type);
		$scope.senddata ;
		if(GamesService.getSelectedGameToEdit().type == "MCQ")
		{
			$scope.senddata = {
				    "choices": [
				      $scope.choice1,
				      $scope.choice2,
				      $scope.choice3,
				      $scope.choice4
				    ],
				    "time": $scope.time,
				    "answer": $scope.answer, 
				    "question": $scope.question
				  }
		}
		else if(GamesService.getSelectedGameToEdit().type == "TF")
		{
			$scope.senddata = {
				    "time": $scope.time,
				    "answer": $scope.answer,
				    "question": $scope.question
		  	   		}
		}
		
		console.log($scope.senddata);
		
		QuestionService.insertQuestion(GamesService.getSelectedGameToEdit().id, $scope.senddata ,GamesService.getSelectedGameToEdit().type) // scope.type may be bug
		.then(function successCallback(response) {
			console.log(response.status);
			console.log("Question added successfully");
			//alert("555555555555555555555555 :: "+ GamesService.getSelectedGameToEdit().type);
			if(GamesService.getSelectedGameToEdit().type == "MCQ"){
				  $scope.choice1 = angular.copy($scope.master);
			      $scope.choice2 = angular.copy($scope.master);
			      $scope.choice3 = angular.copy($scope.master);
			      $scope.choice4 = angular.copy($scope.master);
			      $scope.time = angular.copy($scope.master);
				  $scope.answer = angular.copy($scope.master);
				  $scope.question = angular.copy($scope.master);
			}
			else if(GamesService.getSelectedGameToEdit().type == "TF"){
				  $scope.time = angular.copy($scope.master);
				  $scope.answer = angular.copy($scope.master);
				  $scope.question = angular.copy($scope.master);
			}

		}, function errorCallback(response) {

			alert("Error! Question Insertion Failed");
		});

	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.changeRoute = function(path)
	{
		$location.path(path);
	}
	
//	$scope.resetForm = function() {
//		
//		if(GamesService.getSelectedGameToEdit().type == "MCQ"){
//			$scope.choice1 = angular.copy($scope.master);
//		      $scope.choice2 = angular.copy($scope.master);
//		      $scope.choice3 = angular.copy($scope.master);
//		      $scope.choice4 = angular.copy($scope.master);
//		      $scope.time = angular.copy($scope.master);
//			  $scope.answer = angular.copy($scope.master);
//			  $scope.question = angular.copy($scope.master);
//		}
//		else if(GamesService.getSelectedGameToEdit().type == "TF"){
//			  
//		      $scope.time = angular.copy($scope.master);
//			  $scope.answer = angular.copy($scope.master);
//			  $scope.question = angular.copy($scope.master);
//		}
//          
//      };
	
	
	

} ]);