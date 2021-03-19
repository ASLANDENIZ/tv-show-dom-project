//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text



function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;


}


function showAllEpisodes(episodes){
  const rootElem = document.getElementById("root");
for (let i = 0; i < episodes.length; i++) {
  let episodeName = document.createElement("p");
  let seasonNumber = document.createElement("p");
  let episodeNumber = document.createElement("p");
  let imageElement = document.createElement("img");
  let summaryText = document.createElement("p");
  episodeName.innerHTML = episodes[i].name;
  seasonNumber.innerHTML = episodes[i].season;
  episodeNumber.innerHTML = episodes[i].number;
  imageElement.src = episodes[i].image.medium;
  summaryText.innerHTML = episodes[i].summary;
  rootElem.append(episodeName, seasonNumber, episodeNumber, imageElement, summaryText);
  }
}


window.onload = setup;