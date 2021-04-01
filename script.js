//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text


// Global scoop variables
const rootElem = document.getElementById("root");
let allEpisodes = [];
let filteredEpisodes;
let shows;

function setup() {
  shows = getAllShows();
  showAllShows(shows);


  getAllEpisodesByFetch("https://api.tvmaze.com/shows/82/episodes").then(episodes => {
    allEpisodes = [...episodes];
    // filteredEpisodes = allEpisodes;

    makePageForEpisodes(allEpisodes);
    showAllEpisodes(allEpisodes);
    episodeList(allEpisodes);
  })
  
  // fetchAShow(shows);
}

window.onload = setup;


//this function fetch show

function getAllEpisodesByFetch(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Error")
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

//create episodes drop-down list
let showLabelElement = document.createElement("label");
showLabelElement.style.color = "red";
showLabelElement.innerHTML = "Choose a show:  ";
document.body.insertBefore(showLabelElement, rootElem);
let showSelectElement = document.createElement("select");
showLabelElement.appendChild(showSelectElement);


//this functions create options for shows
function showAllShows(shows) {
  shows.forEach(show => {
    let showOptions = document.createElement("option");
    showOptions.innerHTML = show.name;
    showSelectElement.appendChild(showOptions);
  })
}

// event listener for show selection
// selectElement.addEventListener("change", (e) => {
//   console.log(e.currentTarget.value);
//   filteredEpisodes = allEpisodes.filter(episode => {
//     return e.currentTarget.value === episode.uniqueCodeNumber;
//   })

//   if (e.currentTarget.value == "lordOfTheOptions") {
//     filteredEpisodes = allEpisodes;
//   }
//   document.getElementById("searchBar").value = "";
//   divRowElement = document.querySelector(".row");
//   divRowElement.parentNode.removeChild(divRowElement);
//   makePageForEpisodes(filteredEpisodes);
//   showAllEpisodes(filteredEpisodes);

// })

//--------------------------------------------------------------
//working on it
function fetchAShow(tvShows){
  showSelectElement.addEventListener("change", (e) => {
    let filteredShow = tvShows.filter(show => show.name == e.currentTarget.value)
    console.log(filteredShow);
    getAllEpisodesByFetch(filteredShow[0].url).then(episodes => {
      let allEpisodes = [...episodes];
      // filteredEpisodes = allEpisodes;

      makePageForEpisodes(allEpisodes);
      showAllEpisodes(allEpisodes);
      episodeList(allEpisodes);
    })

  })
}


// ---------------------------------------------------------------------



//this function displays number of episodes shown on the screen
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Displaying ${episodeList.length}/73 episode(s)`;

}

//this function creates a card 
function createCard(episode) {
  let episodeName = document.createElement("p");
  let seasonNumber = document.createElement("p");
  let episodeNumber = document.createElement("p");
  let imageElement = document.createElement("img");
  let summaryText = document.createElement("p");
  episodeName = episode.name;
  seasonNumber = episode.season.toString();
  episodeNumber = episode.number.toString();

  imageElement = episode.image.medium;
  summaryText = episode.summary;

  let card =
    `<div class="col-md-5th-1 col-sm-4">
            <div class="episodeTitle">
              <h4>${episodeName} S${seasonNumber.padStart(2, "0")}E${episodeNumber.padStart(2, "0")}</h4>
            </div>
            <div class="picture">
            <img src= ${imageElement} alt="episode image">
            </div>
            <div class="sum">
            <p>${summaryText}</p>
            </div>
          </div>`

  return card;
}

// this function creates BootsTrap elements and show each episode card on the screen
function showAllEpisodes(episodes) {

  let divContainerElement = document.createElement("div");
  divContainerElement.className = "container";
  let divRowElement = document.createElement("div");
  divRowElement.className = "row";
  for (let i = 0; i < episodes.length; i++) {
    //  function created for the box model
    divRowElement.innerHTML = divRowElement.innerHTML + createCard(episodes[i]);
  }

  rootElem.appendChild(divContainerElement);
  divContainerElement.appendChild(divRowElement);
}




//here we create select menu
let labelElement = document.createElement("label")
labelElement.id = "label-element";
labelElement.innerHTML = "Choose an episode:"
document.body.insertBefore(labelElement, rootElem);
let selectElement = document.createElement("select");
selectElement.id = "choose-episode"
let optionElement = document.createElement("option");
optionElement.innerHTML = "--All Episodes--";
optionElement.value = "lordOfTheOptions";
labelElement.appendChild(selectElement);
selectElement.appendChild(optionElement);


// this function create all options for select menu
function episodeList(episodes) {
  episodes.forEach(episode => {
    let optionEpisodesElement = document.createElement("option");
    selectElement.appendChild(optionEpisodesElement);
    let episodeNames = episode.name;
    let seasonNumbers = episode.season.toString();
    let episodeNumbers = episode.number.toString();
    let uniqueCode = optionEpisodesElement.innerHTML = `S${seasonNumbers.padStart(2, "0")}E${episodeNumbers.padStart(2, "0")} ${episodeNames}`
    // creates a unique code for each episode
    episode.uniqueCodeNumber = uniqueCode;
  })
}



//this event listener help you to choose which episode to show on the screen
selectElement.addEventListener("change", (e) => {
  filteredEpisodes = allEpisodes.filter(episode => {
    return e.currentTarget.value === episode.uniqueCodeNumber;
  })

  if (e.currentTarget.value == "lordOfTheOptions") {
    filteredEpisodes = allEpisodes;
  }
  document.getElementById("searchBar").value = "";
  divRowElement = document.querySelector(".row");
  divRowElement.parentNode.removeChild(divRowElement);
  makePageForEpisodes(filteredEpisodes);
  showAllEpisodes(filteredEpisodes);

})


//here we create search bar
let searchBarElement = document.createElement("input");
searchBarElement.id = "searchBar";
searchBarElement.setAttribute("type", "text");
searchBarElement.placeholder = "your search term..."
document.body.insertBefore(searchBarElement, rootElem);

//search bar event listener
searchBarElement.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  filteredEpisodes = allEpisodes.filter(episode => {
    return episode.name.toLowerCase().includes(searchString) || episode.summary.toLowerCase().includes(searchString);
  })
  divRowElement = document.querySelector(".row");
  divRowElement.parentNode.removeChild(divRowElement);
  makePageForEpisodes(filteredEpisodes);
  showAllEpisodes(filteredEpisodes);
});



















