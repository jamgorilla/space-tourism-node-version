//glob used to hold the json string
let destinationGlobalJson = {};

//fetch request to retrieve json from data.json file
fetch('../data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                destinationGlobalJson = data;
                appendDestinationData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });


function appendDestinationData(data, num) {

    //sets slider selection to 0 if the page has freshly loaded
    if (num == undefined) {
        num = 0;
    }

    //grabs html img and main container
    var imageContainer = document.getElementById("planet-container");
    var mainContainer = document.getElementById("body-information");

    //wipes child nodes of selected containers, used for when new slide is selected
    if (imageContainer.hasChildNodes() == true) {
        mainContainer.innerHTML = '';
        imageContainer.innerHTML = '';
    }
    
    //creates new divs to house the appended html 
    var image = document.createElement('div');
    var rest = document.createElement('div');

   // console.log("whats in DATA", data, num);

    image.innerHTML = '<img class="planet-img" src=".' + data['destinations'][num]['images']['png'] + '" alt="">';
    rest.innerHTML = '<h3 class="planet-name">' + data['destinations'][num]['name'] + '</h3>' +
                        '<p class="planet-description">' +  data['destinations'][num]['description'] + '</p>' + '<hr class="destination-line">' +
                        '<div class="info-container">' +
                        '<div class="dist">' +
                        '<h5 class="info-titles">Avg. Distance</h5>' +
                        '<h4 class="planet-distance">' +  data['destinations'][num]['distance'] + '</h4>' +
                        '</div>' + '<div class="time">' + '<h5 class="info-titles">Est. Travel Time</h5>' +
                        '<h4 class="planet-travel">' +  data['destinations'][num]['travel'] + '</h4>' + '</div>' + '</div>'; 

    image.classList.add("planet-image-container");

    //appends the html to the existing html containers                    
    imageContainer.appendChild(image);
    mainContainer.appendChild(rest);
                        
                        
    // adds myCustomActive class to the slider button that is selected
    // var numString = num.toString();
    // var selectedli;
    // var unselectedli;
    // var matchArray = [0,1,2,3];

    //console.log("NUM", num, numString);

    // for (var i = 0;i < 4;i++ ) {
    //     if (matchArray[i] == num) {
    //         selectedli = document.getElementsByClassName(`list${numString}`);
    //         selectedli[0].classList.add('myCustomActive');
    //     } else {
    //         unselectedli = document.getElementsByClassName(`list${matchArray[i]}`);
    //         unselectedli[0].classList.remove('myCustomActive');
    //     }
    // }
}

//Event listener for changing destinations
const planetList = document.querySelector(".planet-list");

planetList.addEventListener('click', event => {
    // console.log("event.target", event.target.className) 
    if (event.target.className == "planet-list") {
        return;
    } else {
        var num = parseInt(event.target.className[4]);
        appendDestinationData(destinationGlobalJson, num);
    }
});
