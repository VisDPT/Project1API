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


      // array for medal winning countries 
      //var medalWinners = ['Sweden', 'France', 'Germany', 'United States', 'Austria', 'Switzerland', 'Denmark', 'Great Britan', 'West Germany', 'United Team of Germany', 'Soviet Union', 'Netherlands', 'Spain']; 
      
      // empty array, user searches will be pushed into this 
      var searched = []; 
      var mapDiv; // created these variables outside of the map function because there was an error when the page loaded that did not recognize these variables when they were defined in the functions. So now, the map will load. And the initMap() function will be called using a global variable. 
      var userSearch = $("#search"); 
      var mapAPI = $("#map");
      
      // google.maps.event.addDomListener(window, 'load', initMap);
      // this function will initialize and add map when the page loads 
      /*
      function initMap() {
        mapDiv = document.getElementById(map);  // displays map on the div id ='map'
        map = new google.maps.Map(mapDiv, {  // sets up focused point on the map. 
            center: {lat: 37.09024, lng: -100.712891}, // map parameter: location on map upon load
            zoom: 5  // map parameter: zoom in or out (the smaller the number the further out the zoom)
        });
      } */


      // this function will initialize and add map when the page loads 
   function initMap() {
            var mapOptions = {
                center: new google.maps.LatLng(37.09024, -100.712891),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.roadmap,
                scrollwheel: false,
                draggable: true,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true,
                rotateControl: true,
            };
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }
google.maps.event.addDomListener(window, 'load', initMap);



///WIKI API
function wiki(){
    //$("#searchterm").keyup(function(e){
    var q = $("#search").val();
    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
      {
        srsearch: q + "Dressage",
        srwhat: "text",
        action: "query",
        list: "search",
        format: "json"
      }),
    function(data) {
      $("#wiki").empty();
      $("#wiki").append("<p>Results for <b>" + q + "</b></p>");
        $.each(data.query.search, function(i,item){
          $("#wiki").append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a><br>" + item.snippet + "<br><br></div>");
          });
        };	
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



	// ======Button for adding search Term====
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
            wiki();
      			//insert maps	

          }else{
          	//run code for no match
          	invalidPopoverShow();
          	console.log('No Match: ' + searchTerm);
          }
	    $("#search").val(""); //clears text in search box
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

});
