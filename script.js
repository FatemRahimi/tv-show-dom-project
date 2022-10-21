let selectTag = document.getElementById("list");
const searchBox = document.getElementById("search-box");
let bodyTag = document.getElementsByTagName("body");
let selectShowTag = document.querySelector(".selectShow");
let selectEpisodeTag = document.getElementById("selectEpisode");
const searchBox = document.getElementById("input-searchBox");
const searchCount = document.getElementById("search-count");
let allEpisodesDiv = document.getElementById("all-episodesDiv");

//let currentEpisodes = [];

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectOption();
  //event listener
  selectTag.addEventListener("change", getSelectedValue);
  let allShows = getAllShows();
  selectOptionForShows();


  selectShowTag.addEventListener("change", getSelectedShowValue);
  selectEpisodeTag.addEventListener("change", getSelectedEpisodeValue);
  searchBox.addEventListener("keyup", onSearchKeyUp);
}

function selectOptionForShows() {
  let allShows = getAllShows();
  const selectAllShows = document.createElement("option");
  selectAllShows.innerText = "View All Shows";
  selectAllShows.value = "All-Shows";
  selectShowTag.appendChild(selectAllShows);

  let showList = allShows.forEach((element) => {
    let showOptionTag = document.createElement("option");
    let eachShowList = element.name;
    showOptionTag.innerText = eachShowList;
    //showOptionTag.value = element.id
    showOptionTag.value = element.id;
    //console.log(element.id)
    selectShowTag.append(showOptionTag);
    //console.log(element.name);
  });
}

function getSelectedShowValue(event) {
  //const
  let selectedShowId = event.target.value;
  //console.log(selectedShowId);
  sendRequest(selectedShowId).then((data) => {
    //console.log(data);
    currentEpisodes = data;

    selectOptionForEpisodes(currentEpisodes);
    makePageForEpisodes(currentEpisodes);
  });
}

function selectOptionForEpisodes(episodeList) {
  let selectEpisodeTag = document.getElementById("selectEpisode");
  const selectAllEpisodes = document.createElement("option");
  selectAllEpisodes.innerText = "View All Episodes";
  selectAllEpisodes.value = "All-Episode";
  selectEpisodeTag.appendChild(selectAllEpisodes);

  episodeList.forEach((e) => {
    let optionTag = document.createElement("option");

    let dropdownList = `${formatSeriesAndEpisode(e.season, e.number)} - ${
      e.name
    }`;
    optionTag.innerText = dropdownList;
    optionTag.value = e.id;
    selectEpisodeTag.append(optionTag);
  });
}

function getSelectedEpisodeValue(event) {
  const selectedEpisodeId = event.target.value;
  //console.log(selectedEpisodeId);
  if (selectedEpisodeId === "All-Episode") {
    makePageForEpisodes(currentEpisodes);
  } else {
    let filteredEpisodes = currentEpisodes.filter((e) => {
      return e.id === parseInt(selectedEpisodeId);
    });
    makePageForEpisodes(filteredEpisodes);
  }
}

function formatSeriesAndEpisode(season, number) {
  return number > 9 ? `S0${season}E${number}` : `S0${season}E0${number}`;
}

function makePageForEpisodes(episodeList) {
  allEpisodesDiv.innerHTML = "";

  episodeList.forEach((e) => {
    let eachEpisodeDiv = document.createElement("div");
    eachEpisodeDiv.setAttribute("class", "episode-div");
    let headerTag = document.createElement("h3");
    let imageTag = document.createElement("img");
    let summaryText = document.createElement("p");

    //header - zero-padded to two digits
    headerTag.innerText =
      e.number > 9
        ? `${e.name} - S0${e.season}E${e.number}`
        : `${e.name} - S0${e.season}E0${e.number}`;
    headerTag.innerText = `${e.name} - ${formatSeriesAndEpisode(
      e.season,
      e.number
    )}`;

    //images & summary text
    imageTag.src = e.image.medium;
    let text = e["summary"];
    text = text.replaceAll("<p>", "");
    text = text.replaceAll("</p>", "");
    summaryText.innerText = text;
    eachEpisodeDiv.append(headerTag, imageTag, summaryText);
    allEpisodesDiv.append(eachEpisodeDiv);
  });
}

function selectOption() {
  allEpisodes = getAllEpisodes();
  episodeList = allEpisodes.forEach((e) => {
    let selectTag = document.getElementById("list");
    let optionTag = document.createElement("option");

    let dropdownList =
      e.number > 9
        ? ` S0${e.season}E${e.number} - ${e.name}`
        : ` S0${e.season}E0${e.number} - ${e.name}`;
    optionTag.innerText = dropdownList;
    selectTag.append(optionTag);
  });
}

function getSelectedValue() {
  let selectedValue = selectTag.value;
  const filteredEpisodes = allEpisodes.filter((e) => {
    const episodeName = e.name;
    return episodeName.includes(selectedValue.substring(9));
  });
  allEpisodesDiv.innerHTML = "";
  makePageForEpisodes(filteredEpisodes);
}

function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filteredEpisodes = allEpisodes.filter((e) => {
  //const allEpisodes = getAllEpisodes();
  const filteredEpisodes = currentEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });
  const filteredCount = filteredEpisodes.length;
  const allCount = allEpisodes.length;
  const allCount = currentEpisodes.length;
  const countString = `Displaying ${filteredCount} / ${allCount}`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
}
//console.log(sendRequest(82));

window.onload = setup;