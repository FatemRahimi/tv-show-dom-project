//You can edit ALL of the code here
let selectTag = document.getElementById("list");
const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");
// let optionTag = document.createElement("option");
// let listTag = document.getElementById("list");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectOption();
  //event listener
  selectTag.addEventListener("change", getSelectedValue);
  searchBox.addEventListener("keyup", onSearchKeyUp);
}

function makePageForEpisodes(episodeList) {
  let allEpisodeDiv = document.getElementById("all-episodesDiv");
  allEpisodeDiv.innerHTML = "";
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
    //images & summary text
    imageTag.src = e.image.medium;
    let text = e["summary"];
    text = text.replaceAll("<p>", "");
    text = text.replaceAll("</p>", "");
    summaryText.innerText = text;
    eachEpisodeDiv.append(headerTag, imageTag, summaryText);
    allEpisodeDiv.append(eachEpisodeDiv);
  });
}
function selectOption() {
  allEpisodes = getAllEpisodes();
  episodeList = allEpisodes.forEach((e) => {
    let selectTag = document.getElementById("list");
    let optionTag = document.createElement("option");
    let listTag = document.getElementById("list");

    let dropdownList =
      e.number > 9
        ? ` S0${e.season}E${e.number} - ${e.name}`
        : ` S0${e.season}E0${e.number} - ${e.name}`;
    optionTag.innerText = dropdownList;
    
    listTag.append(optionTag);

    selectTag.append(optionTag);
  });
}

function getSelectedValue() {
  let selectedValue = selectTag.value;

 // makePageForEpisodes();
  //for(let i = 0; i <allEpisodes.length; i++)
}

function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filteredEpisodes = allEpisodes.filter((e) => {

    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );

  });
  const filteredCount = filteredEpisodes.length;
  const allCount = allEpisodes.length;
  const countString = `Displaying ${filteredCount} / ${allCount}`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}
window.onload = setup;