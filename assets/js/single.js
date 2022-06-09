var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayIssues(data);
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

getRepoIssues("finnstitcher/git-it-done");