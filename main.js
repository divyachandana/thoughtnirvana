var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl  : 'multistep.html',
    controller  : 'multiStepController'
  })
  .when('/timematch',{
    templateUrl : 'timetaken.html',
    controller : 'timeTakenController'
  });

});

app.controller('multiStepController', function($scope){

  function intMultiStep(){

    $scope.steps = [1,2,3];
    $scope.currentStep = 1;
    $scope.isAccountValid = "";

    $scope.details = {
      userEmail : "",
      userPassword : "",
      userRePassword : "",
    };

    $scope.socialProfile = {
      twitter : "",
      facebook : "",
      googlePlus : ""
    };

    $scope.personalDetails = {
      firstName:"",
      lastName:"",
      phone: "",
      address:""

    };
  }

  $scope.clickNext = function(){
    if($scope.currentStep ==1 && !$scope.createAccountValidation()){
      return;
    }
    $scope.currentStep +=1;


    console.log($scope.currentStep);
  }

  $scope.clickPrevious = function(){
    $scope.currentStep -=1;
    console.log($scope.currentStep);
  }

  $scope.createAccountValidation = function(){
    console.log($scope.details.userEmail);
    if(!$scope.details.userEmail){
      alert("Email is mandatory");
      return;
      // $scope.isAccountValid = "notValid"
    }
    if(!$scope.details.userPassword){
      alert("Password is mandatory");
      return;
    }
    if(!$scope.details.userRePassword){
      alert("Please Re enter the password");
      return;
    }

     if($scope.details.userPassword && $scope.details.userRePassword ){
       // if($scope.userPassword.length)
       if($scope.details.userPassword !== $scope.details.userRePassword) {
         alert("Password didnt match");
         return;
       }
    }

    return true;

  }

  $scope.personalDetailsValidation = function(){
    if(!$scope.personalDetails.firstName){
      alert("First Name is Mandatory");
      return;
    }
    if(!$scope.personalDetails.lastName){
      alert("Last Name is Mandatory");
      return;
    }
    if(!$scope.personalDetails.phone){
      alert("Phone Number is Mandatory");
      return;
    }
    if(!$scope.personalDetails.address){
      alert("Address is Mandatory");
      return;
    }

    return true;
  }

  $scope.submitDetails = function(){
    if(!$scope.personalDetailsValidation()){
      return;
    }

    alert("First Name : " + $scope.personalDetails.firstName + "\n Last Name : " + $scope.personalDetails.lastName + "\n Address : " +$scope.personalDetails.address + "\n Email : " +$scope.details.userEmail);
  }





  intMultiStep();
})

app.controller('timeTakenController', function($scope){
  function initTimeTaken(){
    $scope.days = [ 'Mon' , 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
    $scope.time24Hrs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    $scope.timeList = ["Mon 1800-2000",
    "Sat-Sun",
    "Mon-Fri 0800-1700",
    "Mon-Sun 0600-0700",
    "Fri-Sat 1900-2200",
  ];

  $scope.itemInput = ["2015-06-29 11:58:47",
    "2015-06-27 06:20:07",
    "2015-05-07 20:10:40"
  ];

  $scope.itemOutput = [];
  var splitDatetime = [];
  var weekday="";
  var timeSplit=[]
  // var outputDateTime = [];
  $scope.itemInput.forEach(function(currentVal){
    console.log(currentVal);
    if(currentVal){
      splitDatetime = currentVal.split(" ");
    }

    if(splitDatetime[0]){
      // weekday = $scope.days[new Date(splitDatetime[0]).getDay()];
      weekday = new Date(splitDatetime[0]).toString().split(' ')[0];

    }

    if(splitDatetime[1]){
      timeSplit = splitDatetime[1].split(":");
    }

    if(weekday && timeSplit){
      $scope.itemOutput.push(daysMatch(weekday, parseInt(timeSplit[0])));
    } else if(weekday){
      $scope.itemOutput.push(daysMatch(weekday));
    }

    console.log($scope.itemOutput);

  });


  }

  function daysMatch(weekday,timeSplit){
    var output = [];
    var dayIndex = $scope.days.indexOf(weekday);
    // var dayIndex = weekday;
    $scope.timeList.forEach(function(currentVal){
      var daySplit = currentVal.split(" ");
       var dayRange = daySplit[0].split("-");
       if(dayRange[0]){
         var dayIndex1 = $scope.days.indexOf(dayRange[0]);
       }
       if(dayRange[1]){
         var dayIndex2 = $scope.days.indexOf(dayRange[1]);
       }

       if(daySplit[1] && timeSplit){
         var splitTimeCache = daySplit[1].split("-");
         splitTimeCache[0] = parseInt(splitTimeCache[0])/100;
         splitTimeCache[1] = parseInt(splitTimeCache[1])/100;
       }

       if(dayIndex1!=undefined && dayIndex2!=undefined ){
          // if(dayIndex1<=dayIndex2 && dayIndex >=dayIndex1 && dayIndex<=dayIndex2){
          if(daySplit[1] && timeSplit){
            if(dayIndex >=dayIndex1 && dayIndex<=dayIndex2 && (timeSplit >=splitTimeCache[0] && timeSplit <= splitTimeCache[1])){

              output.push(currentVal);
            }
          } else if(dayIndex >=dayIndex1 && dayIndex<=dayIndex2 ){
            // console.log("pushed");
            output.push(currentVal);
            // console.log(output);
          }
       } else if(dayIndex1!=undefined && dayIndex1 == dayIndex){
         // console.log("pushed");
         if(daySplit[1] && timeSplit){
           if(timeSplit >=splitTimeCache[0] && timeSplit <= splitTimeCache[1]){

             output.push(currentVal);
           }
         } else{
           output.push(currentVal);

         }
         // console.log(output);
       }

    });

        return output;
      // }
  }

  initTimeTaken();
})
// myApp.controller('itemsController', function($scope, ){
//
//   function initItems(){
//     $scope.dropdownItems = ["America","Australia","Japan","China","India","Netherlands", "Indonesia"];
//     $scope.dropdownSelectedItems =[];
//   }
//
//   $scope.selectItem = function(index){
//     if($scope.dropdownItems.length >0){
//       var selectedItem = $scope.dropdownItems[index];
//       $scope.dropdownSelectedItems.push(selectedItem);
//
//     }
//   }
//
//
//   $scope.deselectItem = function(index){
//     if($scope.dropdownSelectedItems.length>0){
//       var deselectSingleItem = $scope.dropdownSelectedItems[index];
//       $scope.dropdownItems.push(deselectSingleItem);
//     }
//   }
//
//   initItems();
//
// }
