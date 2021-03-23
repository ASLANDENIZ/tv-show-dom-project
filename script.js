//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text


//.....................................................................
const rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodes(allEpisodes);
  
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;


}

function createCard(episode){

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
  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  document.body.insertBefore(inputElement, rootElem);
  inputElement.addEventListener("keyup", () => {
    // console.log(inputElement.value);
    // Search box daki text ile eslesen episodelari bul
    episodes.filter(episode => {
      if (episode.name.includes(inputElement.value) || episode.summary.includes(inputElement.value)){
      return true;  
      } else {
        return false;
      } 
    })
    .forEach(episode => {
    divRowElement.innerHTML = divRowElement.innerHTML + createCard(episode);
    })
    // let newArray = [];
    // episodes.forEach(episode => {
    //   if (episode.name.includes(inputElement.value) || episode.summary.includes(inputElement.value)) {
    //     newArray.push(episode.id);
    //   }
    // })
    // console.log(newArray);
//eslesen episodlari karta donusturup listele

  })


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


// function searchBox(episodes) {
//   let inputElement = document.createElement("input");
//   inputElement.setAttribute("type", "text");
//   // rootElem.appendChild(inputElement);
//   document.body.insertBefore(inputElement, rootElem)
//   inputElement.addEventListener("keyup", () => {
//     console.log(inputElement.value);
//     let newArray = [];
//     episodes.forEach(episode => {
//       if(episode.name.includes(inputElement.value) || episode.summary.includes(inputElement.value)){
// newArray.push(episode.id);
//       }
//     })
//     console.log(newArray);
//     return newArray;

//   })
// }



window.onload = setup;