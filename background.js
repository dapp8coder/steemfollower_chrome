//chrome specific code to show/hide extension by page url
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { originAndPathMatches: "^https:\/\/steemit\.com\/\@[^\/]+$" }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { originAndPathMatches: "^https:\/\/steempeak\.com\/\@[^\/]+$" }
                })
            ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

//listen for click on extension button/icon
chrome.pageAction.onClicked.addListener((tab) => {
    //get username from URL after '@'
    var user = tab.url.split("@")[1];

    //store user for use on steemFollower.html/js
    window.localStorage.setItem("user", user);

    //create tab, navigate to page in extension for display.
    var creating = chrome.tabs.create({
        url:"/steemfollowers/steemfollowers.html"
    });
});