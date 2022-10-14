//You can edit ALL of the code here
const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");
// let optionTag = document.createElement("option");
// let listTag = document.getElementById("list");

function setup() {
  makePageForEpisodes();
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  //event listener
  searchBox.addEventListener("keyup", onSearchKeyUp);
}

function makePageForEpisodes() {
  let allEpisodes = getAllEpisodes();
  let rootDiv = document.getElementById("root");
function makePageForEpisodes(episodeList) {
  let allEpisodeDiv = document.getElementById("all-episodesDiv");
  allEpisodeDiv.innerHTML = "";

  allEpisodes.forEach((e) => {
  episodeList.forEach((e) => {
    let eachEpisodeDiv = document.createElement("div");
    eachEpisodeDiv.setAttribute("class", "episode-div");
    let headerTag = document.createElement("h3");
    let imageTag = document.createElement("img");
    let summaryText = document.createElement("p");

    //zero-padded to two digits
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
makePageForEpisodes(getAllEpisodes());

//window.onload = setup();
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