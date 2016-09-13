//=========================VARIABLES=====================

var validCountries = ["Sweden", "France", "Sweden", "France", "Germany","United States", "Austria",
"Switzerland", "Denmark", "Great Britain", "West Germany", "United Team of Germany", "Soviet Union", "Netherlands", "Spain"]
var userInput = 

//=========================FUNCTIONS=====================
////FIREBASE
function firebase (){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhpcVSV-wrEQJaVxI419rlaeS2XIU6Vzc",
    authDomain: "timesheet-95d58.firebaseapp.com",
    databaseURL: "https://timesheet-95d58.firebaseio.com",
    storageBucket: "timesheet-95d58.appspot.com",
  };
  firebase.initializeApp(config);

	var database = firebase.database();
	// 2. Button for adding Employees
	$("#searchbtn").on("click", function(){
	    // Grabs user input
	    var searchTerm = $("#search").val().trim();
	    // Uploads employee data to the database
	    database.ref().push(searchTerm);

	    console.log(searchTerm + "added to Firebase");
	    $("#search").val("");
	    return false; 
	});
	// FIREBASE EVENT 
	database.ref().on("value", function(snapshot) {//value is an event handler, when value changes, do something{
	    console.log(snapshot.val());
	    // Store everything into a variable.
	    var searchTerm = snapshot.val();
			// We change the # html; look at value of the snapshot and look at the clickcount
	        $("#clickValue").html(snapshot.val().searchTerm; //if this wasn't there, wont be able to see other people's clicks
	    	// If there's an error that Firebase runs into --it will be stored in errorObject
	    }, function (errorObject) {
	        // consoles out the error
	        console.log("The read failed: " + errorObject.code);
	    
	    });

}


////GOOGLE MAPS API


///WIKI API



//=======================PROCESS/ IF ELSE ========================
firebase();

if (userInput == validCountry){
	//call google maps function
	//call wiki API function
}

else (userInput !== validCountry){
	//TRIGGER MODAL
}