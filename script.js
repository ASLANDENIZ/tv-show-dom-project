
//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text
// Global scoop variables
const rootElem = document.getElementById('root');
let allEpisodes = [];
let filteredEpisodes;
let shows;

function setup() {
  shows = getAllShows();
  // console.log('showss', shows);
  showAllShows(shows);
  showAllEpisodes(shows, CreateShowsCard);
  // getAllEpisodesByFetch(`https://api.tvmaze.com/shows/82/episodes`).then(
  //   (episodes) => {
  //     allEpisodes = [...episodes];
  //     makePageForEpisodes(allEpisodes);
  //     showAllEpisodes(allEpisodes);
  //     episodeList(allEpisodes);
  //   }
  // );

}
window.onload = setup;
//this function fetch show
function getAllEpisodesByFetch(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error');
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
//create episodes drop-down list
let showLabelElement = document.createElement('label');
showLabelElement.style.color = 'red';
showLabelElement.innerHTML = 'Choose a show:  ';
document.body.insertBefore(showLabelElement, rootElem);
let showSelectElement = document.createElement('select');
showSelectElement.id = 'display-shows';
showLabelElement.appendChild(showSelectElement);
//this functions create options for shows
function showAllShows(shows) {
  let sortedShows = shows.sort(function (a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  })
  sortedShows.forEach((show) => {
    let showOptions = document.createElement('option');
    showOptions.innerHTML = show.name;
    showOptions.value = show.id;
    showSelectElement.appendChild(showOptions);
    const selectShowEl = document.getElementById('display-shows');
    selectShowEl.addEventListener('change', (e) => {
      // console.log('select', e.target.value);
      filteredEpisodes = shows.filter((show) => {
        // console.log('filter', show.name, e.target.value);
        return e.currentTarget.value === show.name;
      });
    });
  });
}
// event listener for show selection

let totalEpisodes;
selectShowEl = document.getElementById('display-shows');
selectShowEl.addEventListener('change', (e) => {
  console.log('select', e.target.value);
  const selectedShowId = e.target.value;
  getAllEpisodesByFetch(
    `https://api.tvmaze.com/shows/${selectedShowId}/episodes`
  ).then((episodes) => {
    allEpisodes = [...episodes];
    totalEpisodes = allEpisodes;
    makePageForEpisodes(allEpisodes);
    showAllEpisodes(allEpisodes, createCard);
    episodeList(allEpisodes);
  });
});

//working on it
// function fetchAShow(tvShows) {
//   showSelectElement.addEventListener('change', (e) => {
//     let filteredShow = tvShows.filter(
//       (show) => show.name == e.currentTarget.value
//     );
//     console.log(filteredShow);
//     getAllEpisodesByFetch(filteredShow[0].url).then((episodes) => {
//       let allEpisodes = [...episodes];
//       // filteredEpisodes = allEpisodes;
//       makePageForEpisodes(allEpisodes);
//       showAllEpisodes(allEpisodes);
//       episodeList(allEpisodes);
//     });
//   });
// }
// ---------------------------------------------------------------------
//this function displays number of episodes shown on the screen
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById('root');
  //first I need to console.log chosen show array
  //second I need to use it's length;
  rootElem.textContent = `Displaying ${episodeList.length}/${totalEpisodes.length}`;
}
//this function creates a card
function createCard(episode) {
  let episodeName = document.createElement('p');
  let seasonNumber = document.createElement('p');
  let episodeNumber = document.createElement('p');
  let imageElement = document.createElement('img');
  let summaryText = document.createElement('p');
  episodeName = episode.name;
  seasonNumber = episode.season.toString();
  episodeNumber = episode.number.toString();
  imageElement = episode.image.medium;
  summaryText = episode.summary;
  let card = `<div class="col-md-5th-1 col-sm-4">
            <div class="episodeTitle">
              <h4>${episodeName} S${seasonNumber.padStart(2, '0')}E${episodeNumber.padStart(2, '0')}</h4>
            </div>
            <div class="picture">
            <img src= ${imageElement} alt="episode image">
            </div>
            <div class="sum">
            <p>${summaryText}</p>
            </div>
          </div>`;
  return card;
}
function CreateShowsCard(show) {
  // When your app starts, present a listing of all shows("shows listing")
  // For each show, you must display at least name, image, summary, genres, status, rating, and runtime.
  // When a show name is clicked, your app should:
  // fetch and present episodes from that show(enabling episode search and selection as before)
  // hide the "shows listing" view.
  // Add a navigation link to enable the user to return to the "shows listing"
  // When this is clicked, the episodes listing should be hidden
  // Provide a free - text show search through show names, genres, and summary texts.
  // Ensure that your episode search and episode selector controls still work correctly when you switch from shows listing to episodes listing and back.
  let showName = document.createElement("p");
  let showSummary = document.createElement("p");
  let showRated = document.createElement("p");
  let showGenres = document.createElement("p");
  let showStatus = document.createElement("p");
  let showRuntime = document.createElement("p");
  let showImage = document.createElement("img");
  showName = show.name;
  showSummary = show.summary;
  showRated = show.rating.average;
  showGenres = show.genres;
  showStatus = show.status;
  showRuntime = show.runtime;

  // showImage = show.image.medium;
  if (showImage === null) {
    let card = `<div class="col-md-5th-1 col-sm-4">
      <div class="showName">
        <h2>${showName}</h2>
      </div>
      <div class="show-image">
        <img src= ${image ? show.image.medium : } alt='Show Image'>
      </div>
      <div class="show-summary">
        <p>${showSummary}</p>
      </div>
      <div class="show-details">
        <p><span>Genres:</span> ${showGenres}</p>
        <p><span>Status:</span> ${showStatus}</p>
        <p><span>Runtime:</span> ${showRuntime}</p>
      </div>
    </div> `
    return card;
  } else {
    let card = `<div class="col-md-5th-1 col-sm-4">
      <div class="showName">
        <h2>${showName}</h2>
      </div>
      <div class="show-image">
        <img src=${showImage} alt="Show Image">
      </div>
      <div class="show-summary">
        <p>${showSummary}</p>
      </div>
      <div class="show-details">
        <p><span>Genres</span>${showGenres}</p>
        <p><span>Status</span>${showStatus}</p>
        <p><span>Runtime</span>${showRuntime}</p>
      </div>
    </div> `

    return card;
  }
  
  

}




console.log(shows);





// this function creates BootsTrap elements and show each episode card on the screen
function showAllEpisodes(episodes, cardFunction) {
  let divContainerElement = document.createElement('div');
  divContainerElement.className = 'container';
  let divRowElement = document.createElement('div');
  divRowElement.className = 'row';
  for (let i = 0; i < episodes.length; i++) {
    //  function created for the box model
    divRowElement.innerHTML = divRowElement.innerHTML + cardFunction(episodes[i]);
  }
  rootElem.appendChild(divContainerElement);
  divContainerElement.appendChild(divRowElement);
}
//here we create select menu
let labelElement = document.createElement('label');
labelElement.id = 'label-element';
labelElement.innerHTML = 'Choose an episode:';
document.body.insertBefore(labelElement, rootElem);
let selectElement = document.createElement('select');
selectElement.id = 'choose-episode';
labelElement.appendChild(selectElement);
function episodeList(episodes) {
  selectElement.innerHTML = '';
  let optionElement = document.createElement('option');
  optionElement.innerHTML = '--All Episodes--';
  optionElement.value = 'lordOfTheOptions';
  optionElement.id = 'lordOfTheOptions';
  selectElement.appendChild(optionElement);
  episodes.forEach((episode) => {
    let optionEpisodesElement = document.createElement('option');
    selectElement.appendChild(optionEpisodesElement);
    let episodeNames = episode.name;
    let seasonNumbers = episode.season.toString();
    let episodeNumbers = episode.number.toString();
    let uniqueCode = (optionEpisodesElement.innerHTML = `S${seasonNumbers.padStart(2, '0')}E${episodeNumbers.padStart(2, '0')} ${episodeNames}`);
    // creates a unique code for each episode
    episode.uniqueCodeNumber = uniqueCode;
  });
}
//this event listener help you to choose which episode to show on the screen
selectElement.addEventListener('change', (e) => {
  filteredEpisodes = allEpisodes.filter((episode) => {
    return e.currentTarget.value === episode.uniqueCodeNumber;
  });
  if (e.currentTarget.value == 'lordOfTheOptions') {
    filteredEpisodes = allEpisodes;
  }
  document.getElementById('searchBar').value = '';
  divRowElement = document.querySelector('.row');
  divRowElement.parentNode.removeChild(divRowElement);
  makePageForEpisodes(filteredEpisodes);
  showAllEpisodes(filteredEpisodes, createCard);
});
//here we create search bar
let searchBarElement = document.createElement('input');
searchBarElement.id = 'searchBar';
searchBarElement.setAttribute('type', 'text');
searchBarElement.placeholder = 'your search term...';
document.body.insertBefore(searchBarElement, rootElem);
//search bar event listener
searchBarElement.addEventListener('keyup', (e) => {
  let searchString = e.target.value.toLowerCase();
  filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  divRowElement = document.querySelector('.row');
  divRowElement.parentNode.removeChild(divRowElement);
  makePageForEpisodes(filteredEpisodes);
  showAllEpisodes(filteredEpisodes, createCard);
});
















