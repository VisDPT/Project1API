$( document ).ready(function() {

//=========================VARIABLES=====================
var validCountriesArray = [
      "sweden", 
      "france", 
      "germany",
      "united states", "usa", 
      "austria", 
      "switzerland", 
      "denmark", 
      "great britain", "england", "uk", "u.k.",
      "west germany", 
      "united team of germany", 
      "soviet union", "russia",
      "netherlands", 
      "spain"]; 

       
var searched = []; // empty array, user searches will be pushed into this
var mapDiv; // created these variables outside of the map function because there was an error when the page loaded that did not recognize these variables when they were defined in the functions. So now, the map will load. And the initMap() function will be called using a global variable. 
var userSearch = $("#search"); 
var mapAPI = $("#map");

//=========================FUNCTIONS=====================
////GOOGLE MAPS API
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

/// ---POPOVER---
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


///WIKI API
function wiki(){
//    $("#searchBtn").on("click", function(){
    var q = $("#search").val();
    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
      {
        srsearch: q + "Dressage",
        srwhat: "text",
        action: "query",
        list: "search",
        format: "json"
      },
    function(data) {
      console.log(data); ///shows object in console!
      $("#results").empty();
      $("#results").append("<p>Results for <b>" + q + "</b></p>");
        $.each(data.query.search, function(i,item){
          $("#results").append("<div><a href='http://en.wikipedia.org/wiki/" + item.title + "'>" + item.title + "</a><br>" + item.snippet + "<br><br></div>");
          });
        });
 //     });   
} 

//======================= PROCESS ========================
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


  // ==================== BUTTON ON CLICK FUNCTION =================
  $("#searchBtn").on("click", function(){

      var searchTerm = $("#search").val().trim(); //setting user input to a variable
      console.log(searchTerm);
      
      //VERY IMPORT IF/ELSE: Controls app and how it works
          if(validCountriesArray.indexOf(searchTerm.toLowerCase()) > -1){//another way to search the array
            //PUSHES TO FIREBASE
            database.ref().push(searchTerm); 
            console.log(searchTerm + "  added to Firebase." + " Good pick!");
            invalidPopoverHide(); //popover
            wiki();


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