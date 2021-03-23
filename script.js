//You can edit ALL of the code here
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text


//.....................................................................

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;


}


function showAllEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  let divContainerElement = document.createElement("div");
  divContainerElement.className = "container";
  let divRowElement = document.createElement("div");
  divRowElement.className = "row";
  for (let i = 0; i < episodes.length; i++) {
    let episodeName = document.createElement("p");
    let seasonNumber = document.createElement("p");
    let episodeNumber = document.createElement("p");
    let imageElement = document.createElement("img");
    let summaryText = document.createElement("p");
    episodeName = episodes[i].name;
    seasonNumber = episodes[i].season.toString();
    episodeNumber = episodes[i].number.toString();
    // console.log(seasonNumber.length);
    // console.log(episodeNumber.length);
    imageElement = episodes[i].image.medium;
    summaryText = episodes[i].summary;

    // divRowElement.append(episodeName, seasonNumber, episodeNumber, imageElement, summaryText);
    // if (10 < 20) {
    // let boxModel =
    //   `<div class="col-md-3">
    //         <div class="episodeTitle">
    //           <h4>${episodeName} S${seasonNumber}E${episodeNumber}</h4>
    //         </div>
    //         <div class="picture">
    //         <img src= ${imageElement} alt="episode image">
    //         </div>
    //         <div class="sum">
    //         <p>${summaryText}</p>
    //         </div>
    //       </div>`
    // console.log(boxModel);

    // divRowElement.innerHTML = divRowElement.innerHTML + boxModel;
    // } else {
    //   console.log("naaa");
    // }
    if ((seasonNumber.length > 1) && (episodeNumber.length > 1)) {
      console.log("bad bug");
      console.log(seasonNumber.length > 1 && episodeNumber.length > 1);
      let boxModel =
        `<div class="col-md-5th-1 col-sm-4">
            <div class="episodeTitle">
              <h4>${episodeName} S${seasonNumber}E${episodeNumber}</h4>
            </div>
            <div class="picture">
            <img src= ${imageElement} alt="episode image">
            </div>
            <div class="sum">
            <p>${summaryText}</p>
            </div>
          </div>`
      console.log(boxModel);
       divRowElement.innerHTML = divRowElement.innerHTML + boxModel;
      //--------------------------------------------------------------------------------------
      //*************************STILL WORKING ON IT********************************************
    } if (seasonNumber.length > 1 && episodeNumber.length == 1) {
      console.log("bad bug");
      let boxModel = `<div class="col-md-5th-1 col-sm-4">
      <div class="episodeTitle">
        <h4>${episodeName} S${seasonNumber}E0${episodeNumber}</h4>
      </div>
      <div class="picture">
        <img src= ${imageElement} alt="episode image">
    </div>
        <div class="sum">
          <p>${summaryText}</p>
        </div>
      </div>`
       divRowElement.innerHTML = divRowElement.innerHTML + boxModel;
    }
    if (seasonNumber.length == 1 && episodeNumber.length > 1) {
      console.log("bad bug");
      let boxModel = `<div class="col-md-5th-1 col-sm-4">
      <div class="episodeTitle">
        <h4>${episodeName} S0${seasonNumber}E${episodeNumber}</h4>
      </div>
      <div class="picture">
        <img src= ${imageElement} alt="episode image">
    </div>
        <div class="sum">
          <p>${summaryText}</p>
        </div>
      </div>`
       divRowElement.innerHTML = divRowElement.innerHTML + boxModel;

    }
    else {
      let boxModel = `<div class="col-md-5th-1 col-sm-4">
      <div class="episodeTitle">
        <h4>${episodeName} S0${seasonNumber}E0${episodeNumber}</h4>
      </div>
      <div class="picture">
        <img src= ${imageElement} alt="episode image">
    </div>
        <div class="sum">
          <p>${summaryText}</p>
        </div>
      </div>`
       divRowElement.innerHTML = divRowElement.innerHTML + boxModel;
    }
    //----------------------------------------------------------------------------------------
  }
  rootElem.appendChild(divContainerElement);
  divContainerElement.appendChild(divRowElement);
}


window.onload = setup;