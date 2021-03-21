
var catButton = $("#cat");
var dogButton = $("#dog");
var favorites =  JSON.parse(localStorage.getItem("favorites")) || [];
var theOne = JSON.parse(localStorage.getItem("theOne")) || [];
var animalArray;

catButton.on("click", function () {search("cat", $("#zipCode").val())});
dogButton.on("click", function () {search("dog", $("#zipCode").val())});

let apiKey = "9OfuZfc6gZ4qMTj3UypnftP8bY9EJWLfTGQiK0vP3NGC3MniSj";
let secret = "CoLGacoP8HgadyuzPs2XIWOFPDAWOtHWkYhWxtMx";
let token;

function getToken() {
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(response => response.json())
    .then((data) => {
      console.log('Token response: ', data);
      if (data.access_token) {
        token = data.access_token;
      }
    });
}
function search(animaltype, city) {
  let testURL = 'https://api.petfinder.com/v2/animals?type=' + animaltype + '&location=' + city;
  fetchAnimals(testURL);
  };
// make sure you have a token before using this!
function fetchAnimals(url) {
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json())
    .then((data) => {
      animalArray = data.animals;
      console.log(animalArray);
      for (let i = 0; i < animalArray.length; i++) {


        if (animalArray[i].primary_photo_cropped) {
          var srcImage = animalArray[i].primary_photo_cropped.small
        } else {
          var srcImage = 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2011/10/pets.jpg?w=420'
        }
         var name = animalArray[i].name;
         var gender = animalArray[i].gender;
         var description = animalArray[i].description;
         var age = animalArray[i].age;
         var link = animalArray[i].URL;
         var position = [i];
         console.log(position);
        // this is gross because it's a materialize card
        $("#animalResults").append("<div class='col s12 m6'><div class='card'><div class='card-image'><img src="+ srcImage + "><span class='card-title'>" + name +"</span><a class='save-btn btn-floating halfway-fab waves-effect waves-light red' data-pos=" + position + "><i class='material-icons'>♡</i></a></div><div class='card-content'><p>Gender: " + gender + "<br>" + age + "<br>" + description + "<br><a href='" + link + "'>Learn More</a></p></div></div></div></div>")


      }
    });
}

$("#animalResults").on("click", ".save-btn", function(){
  var animalInfo = animalArray[$(this).attr('data-pos')];
 
  if (animalInfo.primary_photo_cropped) {
    var srcImage = animalInfo.primary_photo_cropped.small
  } else {
    var srcImage = 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2011/10/pets.jpg?w=420'
  }
   var name = animalInfo.name;
   var gender = animalInfo.gender;
   var description = animalInfo.description;
   var age = animalInfo.age;
   var link = animalInfo.URL;
   var position = $(this).attr('data-pos');
  // this is gross because it's a materialize card
  $("#favorite").append("<div class='col s12 m6'><div class='card'><div class='card-image'><img src="+ srcImage + "><span class='card-title'>" + name +"</span><a class='lock-btn btn-floating halfway-fab waves-effect waves-light red' data-pos=" + position + "><i class='material-icons'>🔒</i></a></div><div class='card-content'><p>Gender: " + gender + "<br>" + age + "<br>" + description + "<br><a href='" + link + "'>Learn More</a></p></div></div></div></div>")

  favorites.push (animalInfo);

  window.localStorage.setItem("favorites", JSON.stringify(favorites));

});

$("#favorite").on("click", ".lock-btn", function() {
  var animalInfo = favorites[$(this).attr('data-pos')];
  console.log(animalInfo);
  theOne.push(animalInfo);

  window.localStorage.setItem("theOne", JSON.stringify(theOne));

  window.location.assign('names.html')
});

function checkStorage() {
  if (favorites) {
    for (let i = 0; i < favorites.length; i++) {

      if (favorites[i].primary_photo_cropped) {
        var srcImage = favorites[i].primary_photo_cropped.small
      } else {
        var srcImage = 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2011/10/pets.jpg?w=420'
      }
       var name = favorites[i].name;
       var gender = favorites[i].gender;
       var description = favorites[i].description;
       var age = favorites[i].age;
       var link = favorites[i].URL;
       var position = favorites[i].position;
      // this is gross because it's a materialize card
      $("#favorite").append("<div class='col s12 m6'><div class='card'><div class='card-image'><img src="+ srcImage + "><span class='card-title'>" + name +"</span><a class='lock-btn btn-floating halfway-fab waves-effect waves-light red' data-pos=" + position + "><i class='material-icons'>🔒</i></a></div><div class='card-content'><p>Gender: " + gender + "<br>" + age + "<br>" + description + "<br><a href='" + link + "'>Learn More</a></p></div></div></div></div>")
    };
  };
};


  


getToken();
checkStorage ();


$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });

