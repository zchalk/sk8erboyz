
var maleButton = $('#male')
var femaleButton = $('#female')
var nameResult = $('#results')
var theOne = JSON.parse(localStorage.getItem("theOne"));
console.log(theOne);




maleButton.on('click', function() { getName("male")});
femaleButton.on('click', function(){ getName("female")});

        function checkStorage() {
            if (theOne) {
              for (let i = 0; i < theOne.length; i++) {
          
                if (theOne[i].primary_photo_cropped) {
                  var srcImage = theOne[i].primary_photo_cropped.small
                } else {
                  var srcImage = 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2011/10/pets.jpg?w=420'
                }
                 var name = theOne[i].name;
                 var gender = theOne[i].gender;
                 var description = theOne[i].description;
                 var age = theOne[i].age;
                 var link = theOne[i].URL;
                 var position = theOne[i].position;
                // this is gross because it's a materialize card
                $("#theOneContainer").append("<div class='col s12 m6'><div class='card'><div class='card-image'><img src="+ srcImage + "><span class='card-title'>" + name +"</span><a href= '" + link + "'class='lock-btn btn-floating halfway-fab waves-effect waves-light red' data-pos=" + position + "><i class='material-icons'>🏠</i></a></div><div class='card-content'><p>Gender: " + gender + "<br>" + age + "<br>" + description + "<br><a href='" + link + "'>Learn More</a></p></div></div></div></div>")
              };
            };
          };


        
        function getName(gender) {
            let options = { count: 1, type: gender, min_freq: 40, max_freq: 60 }
            var callback;
            var tmp_params = {};
            var host = "namey.muffinlabs.com";
            var query;
            if (typeof (options) == "function") {
                callback = options;
            }
            else if (typeof (options) == "object") {
                callback = options.callback;
                if (typeof (options.host) !== "undefined") {
                    host = options.host;
                }
                if (typeof (options.count) == "undefined") {
                    options.count = 1;
                }
                tmp_params.count = options.count;
                if (typeof (options.type) != "undefined" && options.type != "both") {
                    tmp_params.type = options.type;
                };
                if (options.type != "surname" && typeof (options.with_surname) != "undefined") {
                    tmp_params.with_surname = options.with_surname;
                }
                if (options.min_freq) {
                    tmp_params.min_freq = options.min_freq;
                    tmp_params.max_freq = options.max_freq;
                }
                else if (typeof (options.frequency) != "undefined") {
                    tmp_params.frequency = options.frequency;
                }
            }
            query = Object.keys(tmp_params)
                .map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(tmp_params[k]);
                })
                .join('&');
            fetch('https://namey.muffinlabs.com/name.json?' + query, { mode: 'cors' })
                .then(function (result) {
                    return result.json();
                })
                .then(function (result) {
                    console.log(result)
                    nameResult.text(result[0])
                })
                
        };

        checkStorage();