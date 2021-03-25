//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text


// let episodesArray = [];
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
let filteredEpisodes = allEpisodes;


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

}






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

  let boxModel =
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

  return boxModel;

}

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


let searchBarElement = document.createElement("input");
searchBarElement.setAttribute("type", "text");
document.body.insertBefore(searchBarElement, rootElem);
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

//create episodes drop-down list
let labelElement = document.createElement("label")
labelElement.innerHTML = "Choose an episode:"
document.body.insertBefore(labelElement, rootElem);
let selectElement = document.createElement("select");
selectElement.id = "choose-episode"
let optionElement = document.createElement("option");
optionElement.innerHTML = "--Please choose an episode--";
labelElement.appendChild(selectElement);
selectElement.appendChild(optionElement);
allEpisodes.forEach (episode => {
  let optionEpisodesElement = document.createElement("option");
  selectElement.appendChild(optionEpisodesElement);
  let episodeNames = episode.name;
  let seasonNumbers = episode.season.toString();
  let episodeNumbers = episode.number.toString();
  optionEpisodesElement.innerHTML = `${episodeNames} S${seasonNumbers.padStart(2,"0")}E${episodeNumbers.padStart(2, "0")}`
})

selectElement.addEventListener("click", () => {
  console.log(click)
})



  



function setup() {

  makePageForEpisodes(filteredEpisodes);
  showAllEpisodes(filteredEpisodes);

}





window.onload = setup;