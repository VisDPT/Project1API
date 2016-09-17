$( document ).ready(function() {

//=========================VARIABLES=====================

var validCountriesArray = [
			"Sweden", 
			"France", 
			"Germany",
			"United States", "usa", 
			"Austria", 
			"Switzerland", 
			"Denmark", 
			"Great Britain", "england", "UK", "U.K.",
			"West Germany", 
			"United Team of Germany", 
			"Soviet Union", "Russia",
			"Netherlands", 
			"Spain"]; 

//=========================FUNCTIONS=====================
////GOOGLE MAPS API


///WIKI API
function wiki(){
	
}

//MODAL function
function modal(){

}

function invalidPopoverShow(){
	$('[data-toggle="popover"]').popover({
		placement: "right", //will display right of the button
		trigger: "focus", //when I click anywhere on screen, popover will deisappear
		content: "Choose a valid country that had Dressage/Equestrain participants in the Olympics! (Click anywhere to make popover disappear)", //message that appears
	}); 
}
function invalidPopoverHide(){
	$('[data-toggle="popover"]').popover('hide'); //to hide
}

//=======================IF ELSE ========================

////FIREBASE

	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8vb_DY33r4H9uUHiJm8qiU0KsZDUboKA",
    authDomain: "dressage-project.firebaseapp.com",
    databaseURL: "https://dressage-project.firebaseio.com",
    storageBucket: "dressage-project.appspot.com",
  };

  firebase.initializeApp(config);
  	var database = firebase.database();

  	//"Initialize" the popovers so it does not skip the popover on first invalid SearchTerm  
  	$('[data-toggle="popover"]').popover({
		placement: "right",
		trigger: "focus",
		content: "Choose a valid country that had Dressage/Equestrain participants in the Olympics! (Click anywhere to make popover disappear)",
	});
	
	$('[data-toggle="popover"]').popover('hide'); 



	// Button for adding search Term
	$("#searchBtn").on("click", function(){

	    var searchTerm = $("#search").val().trim(); //setting user input to a variable
	    console.log(searchTerm);
	    
	    database.ref().push(searchTerm); //pushing to firebase
	    console.log(searchTerm + "added to Firebase");
	    //VERY IMPORT IF/ELSE: says what happens based on user input
          if(validCountriesArray.indexOf(searchTerm.toLowerCase()) > -1){
			console.log("Good pick!" + searchTerm);
			invalidPopoverHide(); 
			//insert wiki
			//insert maps	
          }else{
          	//run code for no match
          	invalidPopoverShow();
          	console.log('No Match: ' + searchTerm);
          }
	    $("#search").val(""); //clears text in search box
 
	});
	// FIREBASE EVENT 
	database.ref().on("value", function(snapshot) {
	    console.log(snapshot.val());
	    var searchTerm = snapshot.val();
	        $("#clickValue").html(snapshot.val().searchTerm); 
	    }, function (errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    
	    });

});
