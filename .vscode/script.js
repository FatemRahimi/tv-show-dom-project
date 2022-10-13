//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  makePageForEpisodes();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
function makePageForEpisodes() {
  let allEpisodes = getAllEpisodes();
  let rootDiv = document.getElementById("root");
  let allEpisodeDiv = document.getElementById("all-episodesDiv");

  allEpisodes.forEach((e) => {
    let eachEpisodeDiv = document.createElement("div");
    eachEpisodeDiv.setAttribute("class", "episode-div");
    let headerTag = document.createElement("h3");
    let imageTag = document.createElement("img");
    let summaryText = document.createElement("p");

    //zero-padded to two digits
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

window.onload = setup;
//window.onload = setup();