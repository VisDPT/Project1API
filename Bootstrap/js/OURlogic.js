$(document).ready(function() {

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
        "spain"
    ];


    var searched = []; // empty array, user searches will be pushed into this
    var map; // Global map object to be used in multiple functions
    var mapDiv; // created these variables outside of the map function because there was an error when the page loaded that did not recognize these variables when they were defined in the functions. So now, the map will load. And the initMap() function will be called using a global variable. 
    // var userSearch = $("#search");
    var input = document.getElementById("search"); // setup searchbox 
    var userSearch = new google.maps.places.SearchBox(input); // when searchbox is used 
    var mapAPI = $("#map");

    var markers = []; // stores the markers when searched 
    var bounds = new google.maps.LatLngBounds(); // sets up parameters of the pin location 

  /// ---POPOVER---
    function invalidPopoverShow() {
        $('[data-toggle="popover"]').popover({
            placement: "right", //will display right of the button
            trigger: "focus", //when I click anywhere on screen, popover will deisappear
            content: "Choose a valid country that had Dressage/Equestrain participants in the Olympics! (Click anywhere to make popover disappear)", //message that appears
        });
    }

    function invalidPopoverHide() {
        $('[data-toggle="popover"]').popover('hide'); //to hide
    }
    
    //"Initialize" the popovers so it does not skip the popover on first invalid SearchTerm  
    $('[data-toggle="popover"]').popover({
        placement: "right",
        trigger: "focus",
        content: "Choose a valid country that had Dressage/Equestrain participants in the Olympics! (Click anywhere to make popover disappear)",
    });

    $('[data-toggle="popover"]').popover('hide');

    //=========================FUNCTIONS=====================
    ////GOOGLE MAPS API
    // this function will initialize and add map when the page loads  

    

  


    ///WIKI API
    function wiki() {
        var searchTerm = $('#search').val();
        console.log(searchTerm);
        var url = 'http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + searchTerm + '%20dressage&srlimit=6&srwhat=text&callback=?';
        $.ajax({
            method: "GET",
            url: url,
            asyn: false,
            data: { action: 'query', format: 'json', list: 'search', srwhat: 'text', srsearch: searchTerm + "Dressage" },
            dataType: "json",
            // Function to be called if the request succeeds
            success: function(data) {
                console.log(data);
                $('#wikiResults').empty();
                $('#wikiResults').append("<p style='font-size: 20px'>Results for <b>" + searchTerm + "</b></p>");
                $.each(data.query.search, function(i, item) {
                    $("#wikiResults").append("<div><a href='http://en.wikipedia.org/wiki/" + item.title + "'>" + item.title + "</a><br>" + item.snippet + "<br><br></div>");
                });
            }
        });
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



    // ==================== BUTTON ON CLICK FUNCTION =================
    //$("#searchBtn").on("click", search);

    function search() {
        var searchTerm = $("#search").val().trim(); //setting user input to a variable
        console.log(searchTerm);

        //VERY IMPORT IF/ELSE: Controls app and how it works
        if (validCountriesArray.indexOf(searchTerm.toLowerCase()) > -1) { //another way to search the array
            //PUSHES TO FIREBASE
            database.ref().push(searchTerm);
            console.log(searchTerm + "  added to Firebase." + " Good pick!");
            invalidPopoverHide(); //popover
            wiki();
        } else {
            //run code for no match
            invalidPopoverShow();
            $('#wikiResults').empty();
            $('#wikiResults').append("<p style='font-size: 30px;background-color: #180D01; color: #fed136; border: 7px ridge #fed136'>Choose a valid country that had Dressage/Equestrain participants in the Olympics!</b></p>"
                                    +"<p><iframe src='https://giphy.com/gifs/qqZvikzRKaBfq/html5' style='border:0; text-align: center' width='250' height='250' class='giphy-embed'></iframe></p>" );
            //font-family: &ldquo;Montserrat&rdquo;, &ldquo;Helvetica Neue&rdquo, Helvetica, Arial;
            console.log('No Match: ' + searchTerm);

        }
        $("#search").val(""); //clears text in search box
        return false;
    }

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
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initMap);

    // listen for the event fired and retreive more details for that place  
    // helped with setting up the dropdown in the search box? 
    // Or maybe the map setup in the variables did that? 
    // either way - suggestions are showing up in the dropdown 
    // yay!!!
    userSearch.addListener('places_changed', function(change) {
    
        var places = userSearch.getPlaces(); // returns the search by user query

        if (places.length == 0) {
            return;
        }

        // get the icon, location, and name for each location 
        places.forEach(function(place) {
            //for(var i=0; i<validCountriesArray.length; i++){
            if (!place.geometry && userSearch == validCountriesArray[i]) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

 //           }

        });
        map.fitBounds(bounds);
        // Call search() to load wikipedia data
        search();

    });





    // FIREBASE EVENT 
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        var searchTerm = snapshot.val();
        $("#clickValue").html(snapshot.val().searchTerm);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});