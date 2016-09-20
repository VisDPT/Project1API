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

      // this should display the map in the html - DID NOT WORK
      // google.maps.event.addDomListener(window, 'load', initiMap);
      // ^^^ this was originally 'initilize' instead of 'initMap', saw some documentation that it was suppose to be the function name without the () ? 
      // create functions to pin all of the medal winning countries 
      // throwing all of the country functions into an object. So when this is called, it will go through this object and call on these properties and functions 
      /*var validCountries = {
      
      sweden: function() {
        var pinSweden = new google.maps.LatLng(60.1282, 18.6435);  // setting up the points 
        var marker = new google.maps.Marker( { //setting up marker with parameters below 
          position: pinFrance, // will give position of france  
          setMap: mapDiv, // tells it where to pin, selecting the mapDiv variable from above 
          title: "Sweden" //text will hover over this. can expand later to add bubble info? 
        })
      }, 
      france: function() {
        var pinFrance = new google.maps.LatLng(46.2276, 2.2137); 
        var marker = new google.maps.Marker( {
          position: pinFrance, 
          setMap: mapDiv, 
          title: "France"
        })
      }, 
      germany: function() {
        var pinGermany = new google.maps.LatLng(51.1657, 10.4515); 
        var marker = new google.maps.Marker( {
          position: pinGermany, 
          setMap: mapDiv,
          title: "Germany"
        })
      }, 
      us: function() {
        var pinUS = new google.maps.LatLng(37.0902, 95.7129); 
        var marker = new google.maps.Marker({
          position: pinUS, 
          setMap: mapDiv,
          title: "United States"
        })
      }, 
      austria: function() {
        var pinAustria = new google.maps.LatLng(47.5162,14.5501); 
        var marker = new google.maps.Marker({
          position: pinAustria,
          setMap: mapDiv,
          title: "Austria"
        })
      }, 
      swiss: function() {
        var pinSwiss = new google.maps.LatLng(46.8182, 8.2275);
        var marker = new google.maps.Marker({
          position: pinSwiss, 
          setMap: mapDiv,
          title: "Swiss"
        })
      }, 
      denmark: function() {
        var pinDenmark = new google.maps.LatLng(56.2639, 9.5018); 
        var marker = new google.maps.Marker({
          position: pinDenmark, 
          setMap: mapDiv, 
          title: "Denmark"
        })
      }, 
      brit: function() {
        var pinBrit = new google.maps.LatLng(55.3781, 3.4360); 
        var marker = new google.maps.Marker({
          position: pinBrit, 
          setMap: mapDiv, 
          title: "Great Britan"
        })
      }, 
      netherlands: function() {
        var pinNetherlands = new google.maps.LatLng(52.3126, 5.2913); 
        var marker = new google.maps.Marker({
          position: pinNetherlands, 
          setMaps: mapDiv, 
          title: "Netherlands"
        })
      }, 
      spain: function() {
        var pinSpain = new google.maps.LatLng(40.4637, 3.7492); 
        var marker = new google.maps.Marker({
          position: pinSpain, 
          setMap: map, 
          title: "Spain"
          // console.log(map);
          // console.log(mapDiv);
        })
      }
    }; 
    
      */
    // $('#searchBtn').on('click', function PushToArray() {
    //     //  userSearch = $('#search').val().trim().toLowerCase(); // will take the value of what is searched, trim off the white space, convert it to lower case 
    //       searched.push($('#search').val().trim().toLowerCase());
    //       $('#searched').val("");  // TODO: clear out the searched text
    //       // $("#search").val(""); //clears text in search box
 
    //       if ($('#search') == validCountries) {  //this is an IF STATEMENT!!!
    //         validCountries(); 
    //       }
          
    //       console.log(searched);
    //   //  return false; 
    //   // will not submit the form --- if we end up keeping the search box and button in a form tag!!! Otherwise, it could be okay to remove this all together. 
    // if (userSearch == 'spain'){
    //     validCountries.spain(); 
    // };
    //    });
   
    
      // on click of Search button 
        // grab info from search box
        // add to empty array 
        // ***used submit() instead of .on('click', whatevs) because the button and textbox are in a form tag
        // unhide the return false if form is still used 
      
      
      
      
      // loop through array of medal winning countries
        // if userSearch == an index in medal winning countries array 
          // call function to pin on the map
        // else 
           // call alert to notify user to try again
   /*   for (i = 0; i < medalWinners.length; i++) {
        if (userSearch == "Germany") || (userSearch == "Soviet Union") {
          Germany(); 
          // TODO: envoke wiki results
        }  
      }
  */       
      // loop through array of medal winning countries 
        // if (search == array) 
          // pin on map 
          // TODO: display wiki page 
          // clear out text field 
        // else 
          // display modal.js message to try again 
          // clear out text field 


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
