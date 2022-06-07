var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch info
    fetch(apiUrl)
    // do stuff with response promise
    .then(function (response) {
        // format response into json promise
        response.json()
        // do stuff with that promise
        .then(function (data) {
            console.log(data)
        });
    });
};

getUserRepos("finnstitcher");