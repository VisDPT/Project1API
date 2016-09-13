//=========================VARIABLES=====================

var validCountries = ["Sweden", "France", "Sweden", "France", "Germany","United States", "Austria",
"Switzerland", "Denmark", "Great Britain", "West Germany", "United Team of Germany", "Soviet Union", "Netherlands", "Spain"]
var userInput; 

//=========================FUNCTIONS=====================
////GOOGLE MAPS API


///WIKI API
function wiki(){
	
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

	// Button for adding search Term
	$("#searchBtn").on("click", function(){
	    var searchTerm = $("#search").val().trim();
	    console.log(searchTerm);
	    database.ref().push(searchTerm);
	    console.log(searchTerm + "added to Firebase");
	    $("#search").val("");
	    return false; 
	});
	// FIREBASE EVENT 
	database.ref().on("value", function(snapshot) {
	    console.log(snapshot.val());
	    var searchTerm = snapshot.val();
	        $("#clickValue").html(snapshot.val().searchTerm); 
	    }, function (errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    
	    });

/*
if (userInput == validCountry){
	//call google maps function
	//call wiki API function
}

else (userInput !== validCountry){
	//TRIGGER MODAL
}*/ 