
var catButton = $("#cat");
// console.log(catButton);
var dogButton = $("#dog");

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
        // doFetch(testURL);
      }
    });
}
// make sure you have a token before using this!
function fetchAnimals(url) {
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json())
    .then((data) => {
      // console.log(data);
      // yayyy you have data, do stuff here
      var animalArray = data.animals;
      console.log(animalArray);
      for (let i = 0; i < animalArray.length; i++) {
        var srcImage = animalArray[i].primary_photo_cropped.small || 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2011/10/pets.jpg?w=420'
        
        $("#animalResults").append("<div class='col s12 m6'><div class='card'><div class='card-image'><img src="+ srcImage + "><span class='card-title'>Card Title</span><a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>add</i></a></div><div class='card-content'><p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p></div></div></div></div>")
      }
    });
}
function search(animaltype, city) {
  let testURL = 'https://api.petfinder.com/v2/animals?type=' + animaltype + '&location=' + city;
  fetchAnimals(testURL);
  }
  
// kick things off
getToken();


$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });

