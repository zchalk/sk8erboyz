const catButton = document.getElementById("cat");
const dogButton = document.getElementById("dog");
const cityInput = document.getElementById("city").val;

catButton.addEventListener("click", function () {search(cat)});
dogButton.addEventListener("click", function () {search(dog)});

function search(pet) {
var city = cityInput.value;
var petChoice = pet;

}