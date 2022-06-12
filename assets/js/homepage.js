var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var languageButtonsEl = document.querySelector("#language-buttons");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username.")
    };
};

var buttonClickHandler = function (event) {
    var language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent = "";
    }
};

var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch info
    // do stuff with response promise
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            // format response into json promise
            // do stuff with that promise
            response.json()
            .then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub user not found.");
        };
    })
    .catch(function (error) {
        alert("Unable to connect to GitHub.");
    });
};

var getFeaturedRepos = function(language) {
    // fetch featured repos with desired language
    // sort by number of issues marked "help wanted"
    var apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error communicating with GitHub.");
        };
    });
};

var displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // check if empty
    if (repos.length === 0) {
        repoContainerEl.textContent = "No respositories found.";
        return;
    };

    // print repos
    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i> ${repos[i].open_issues_count} issue(s)`;
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        };

        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);