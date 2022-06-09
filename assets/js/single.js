var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayIssues(data);

                if (response.headers.get("Link")) {
                    displayWarning(repo);
                };
            });
        }
        else {
            alert("There was a problem with your request.");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    };
    
    for (var i = 0; i < issues.length; i++) {
        // create a link to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        // target="blank_" makes the link open in a new tab
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        var typeEl = document.createElement("span");
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        };

        issueEl.appendChild(titleEl);
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    };
};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "This repo has more than 30 open issues. ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

getRepoName();