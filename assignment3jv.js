var gistList = [];
window.onload = function () {
  var storedFavorites = localStorage.getItem('favorites');
  // check if local storage exists and if so display favorites
  if (storedFavorites !== null) {
    storedFavorites = JSON.parse(localStorage['favorites'])
    document.getElementById('favorite_list').innerHTML = storedFavorites;
  } else {
    storedFavorites = {'gists': []};
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
  }
};

function saveEntry() {
  // save number of pages user selects in variable 'pages'
  var pages = document.getElementsByName('numerical_input')[0].value;
  var txt = [];
  var i;
  var count = 0;
  // get elements from checkbox results
  var lang = document.getElementsByName('language');
  for (i = 0; i < lang.length; i++) {
    // check if language was checked 
    if (lang[i].checked) {
      // store languages checked in array txt
      txt[count] = lang[i].value;
      count++;
    }
    getGistInformation(displayGists);
  }
}

// to remove an entry from favorites and relist favorites
// function removeEntry() {
// 	var toRemove = JSON.parse(localStorage["favorites"]);
// 	for (var i = 0; i < favorites.length; i++) {
// 		if (toRemove[i].id === 'item') {
// 			toRemove.splice(i,1);
// 		};
// 		localStorage["txt"] = JSON.stringify(toRemove);
// 	};
// }

function getGistInformation(callback) {
  while (gistList.length > 0) {
    gistList.pop();
  }
  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    throw 'Unable to create HttpRequest';
  }
  var url = 'https://api.github.com/gists';
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var gistPageInfo = JSON.parse(httpRequest.responseText);
        var i;
        for (i = 0; i < gistPageInfo.length; i++) {
          var gistInstance = new Gist(gistPageInfo[i].description, gistPageInfo[i].html_url);
          gistList.push(gistInstance);
        } 
        callback(httpRequest);
      } else {
        alert('There was a problem with the request.');
      }
    }
  };
 
  httpRequest.open('GET', url, false);
  httpRequest.send(null);
   //displayGists();
}


function Gist(description, g_url) {
  this.description = description;
  this.g_url = g_url;
}

function addGist(settings, gist) {
  if (gist instanceof Gist) {
    settings.gists.push(gist);
    localStorage.setItem('userSettings', JSON.stringify(settings));
    return true;
  }
}

function displayGists() {
  var i;
  for (i = 0; i < gistList.length; i++) {
    var list = document.createElement('li');
    var anchor = document.createElement('a');
    var anchorText=document.createTextNode(gistList[i].description);
    anchor.setAttribute('href', gistList[i].g_url);
    anchor.appendChild(anchorText);
    list.appendChild(anchor);
    document.getElementById("gist_listings").appendChild(list);
    var btn = document.createElement("button");
    var t = document.createTextNode("ADD Favorite");
    btn.appendChild(t);
    document.getElementById("gist_listings").appendChild(btn);
  }
}

function removeFavorite() {
  displayFavorites();
}

function addToFavorites () {
  displayFavorites();
}

function displayFavorites() {

}



