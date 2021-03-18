
        var maleButton = $('#male')
        var femaleButton = $('#female')
        var nameResult = $('#result')




        maleButton.addEventListener('click', function() { getName("male")})
        femaleButton.addEventListener('click', function(){ getName("female")})
        
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
                    nameResult.innerHTML = result[0]
                })
        }
