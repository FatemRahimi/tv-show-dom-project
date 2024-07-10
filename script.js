

let bodyTag = document.getElementsByTagName("body");
console.log(bodyTag);

//show tags
let selectShowTag = document.querySelector(".selectShow");
const selectAllShows = document.createElement("option");
const showList = document.getElementById("show-list");
//episode tags
let selectEpisodeTag = document.getElementById("selectEpisode");
let allEpisodesDiv = document.getElementById("all-episodesDiv");
//search

const searchShow = document.getElementById("searchShow"); //input search for shows
const showCount = document.getElementById("show-count"); // shows counter
const searchEpisode = document.getElementById("searchBox"); // input search for episode
const episodeCount = document.getElementById("search-count"); // episode counter
const backToShows = document.getElementById("back-toshows");

let showsList = getAllShows();
function setup() {
  selectOptionForShows(showsList);
  makePageForShows(showsList);

  backToShows.addEventListener("click", goBackToAllShows);
  searchShow.addEventListener("keyup", onSearchKeyUpShow);
  searchEpisode.addEventListener("keyup", onSearchKeyUpEpisode);
  selectEpisodeTag.addEventListener("change", getSelectedEpisodeValue);
  selectShowTag.addEventListener("change", getSelectedShowValue);
}

function selectOptionForShows(shows) {
  selectShowTag.innerHTML = "";
  // sorting list in order
  shows.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });

  selectAllShows.innerText = "View All Shows";
  selectAllShows.value = "All-Shows";
  selectShowTag.appendChild(selectAllShows);
  shows.forEach((show) => {
    let showOptionTag = document.createElement("option");
    showOptionTag.innerText = show.name;
    showOptionTag.value = show.id;
    selectShowTag.append(showOptionTag);
  });
}

function selectOptionForEpisodes(episodeList) {
  selectEpisodeTag.innerHTML = "";
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

function formatSeriesAndEpisode(season, number) {
  return number > 9 ? `S0${season}E${number}` : `S0${season}E0${number}`;
}

function makePageForEpisodes(episodeList) {
  allEpisodesDiv.innerHTML = "";

  episodeList.forEach((e) => {
    backToShows.style.display = "block";
    let eachEpisodeDiv = document.createElement("div");
    eachEpisodeDiv.setAttribute("class", "episode-div");
    let headerTag = document.createElement("h3");
    let imageTag = document.createElement("img");
    let summaryText = document.createElement("p");

    //header - zero-padded to two digits
    headerTag.innerText = `${e.name} - ${formatSeriesAndEpisode(
      e.season,
      e.number
    )}`;

    //condition to view contents with images
    if (e.image !== null) {
      imageTag.src = e.image.medium;
    }

    //removing all p tags in text content
    let text = e["summary"];
    let newText = text.replaceAll("<p>", "");
    newText = newText.replaceAll("</p>", "");
    summaryText.innerText = newText;

    eachEpisodeDiv.append(headerTag, imageTag, summaryText);
    allEpisodesDiv.append(eachEpisodeDiv);
    searchEpisode.style.display = "block";
    episodeCount.style.display = "block";
    searchShow.style.display = "none";
    showCount.style.display = "none";
    selectEpisodeTag.style.display = "block";
  });
}

function makePageForShows(shows) {
  searchShow.innerText = "";
  showList.innerHTML = "";

  shows.forEach((show) => {
    let eachShowList = document.createElement("div");
    let eachShowHeader = document.createElement("h1");
    const wrapDiv = document.createElement("div");
    const summary = document.createElement("span");
    const showImage = document.createElement("img");
    const asideDiv = document.createElement("div");

    eachShowHeader.innerText = show.name; 
    eachShowHeader.className= "each-show-header"
    summary.innerHTML = show.summary;

    // condition to view content with images
    if (show.image !== null) {
      showImage.src = show.image.medium;
    }

    //aside content
    asideDiv.innerText = `Rated${
      show.rating.average
    } \n Genres: ${show.genres.join(" | ")} \n Status: ${
      show.status
    } \n Runtime: ${show.runtime}`;

    //class attributes
    eachShowList.className = "eachShow-container"; // note this!
    wrapDiv.className = "content-wrapper";
    asideDiv.className = "asideDiv";
    summary.className = "span-text";
    showImage.className = "show-image";

    wrapDiv.append(showImage, summary, asideDiv);
    eachShowList.append(eachShowHeader, wrapDiv);
    showList.append(eachShowList);

    //when a show list is clicked it views all episodes
    eachShowList.addEventListener("click", (event) => {
      const selectedShowId = show.id;
      sendRequest(selectedShowId).then((data) => {
        currentEpisodes = data;
        showList.style.display = "none";
        selectOptionForEpisodes(currentEpisodes);
        makePageForEpisodes(currentEpisodes);
      });
    });
    backToShows.style.display = "none";
    goBackToAllShows();
  });
  return shows;
}

function onSearchKeyUpShow(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredShows = showsList.filter((e) => {
    const showName = e.name.toLowerCase();
    const showSummary = e.summary.toLowerCase();
    return showName.includes(searchTerm) || showSummary.includes(searchTerm);
  });
  const filteredCount = filteredShows.length;
  const allCount = showsList.length;
  const countString = `Displaying ${filteredCount} / ${allCount}`;
  showCount.innerText = countString;
  makePageForShows(filteredShows);
}

function onSearchKeyUpEpisode(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchEpisode.innerText = "";
  const filteredEpisodes = currentEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });
  const filteredCount = filteredEpisodes.length;
  const allCount = currentEpisodes.length;
  const countString = `Displaying ${filteredCount} / ${allCount}`;
  episodeCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

function getSelectedEpisodeValue(event) {
  const selectedEpisodeId = event.target.value;
  if (selectedEpisodeId === "All-Episode") {
    makePageForEpisodes(currentEpisodes);
  } else {
    let filteredEpisodes = currentEpisodes.filter((e) => {
      return e.id === parseInt(selectedEpisodeId);
    });
    makePageForEpisodes(filteredEpisodes);
  }
}

function getSelectedShowValue(event) {
  let selectedShowId = event.target.value;
  if (selectedShowId === "All-Shows") {
    makePageForShows(showsList);
  } else {
    return sendRequest(selectedShowId).then((data) => {
      currentEpisodes = data;
      selectOptionForEpisodes(currentEpisodes);
      makePageForEpisodes(currentEpisodes);
      showList.style.display = "none";
      selectEpisodeTag.style.display = "block";
    });
  }
}

function goBackToAllShows() {
  backToShows.style.display = "none";
  allEpisodesDiv.innerHTML = "";
  showList.style.display = "block";

  selectEpisodeTag.style.display = "none";
  searchEpisode.style.display = "none";
  episodeCount.style.display = "none";
  searchShow.style.display = "block";
  showCount.style.display = "block";
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
window.onload = setup;
