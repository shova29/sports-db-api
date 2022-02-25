// document.getElementById("error-message").style.display = "none";
// document.getElementById("no-player-found").style.display = "none";
//search player using name
const searchPlayer = () => {
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText == "") {
    //   console.log(searchText);
    const noplayerFound = document.getElementById("no-player-found");
    noplayerFound.innerText = `Please write something to display`;
    return;
  } else {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}
    `;
    try {
      //   const response = fetch(url);
      //   const data = response.json();
      //   displaySearchPlayerResult(data.player);
      fetch(url)
        .then((response) => response.json())
        .then((data) => displaySearchPlayerResult(data.player));
      //   console.log(data.player[0]);
    } catch (error) {
      // displayError(error);
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = `Something went wrong please try again
      later. No Player result found!`;
      // console.log(error);
    }
  }
};

/* const displayError = (error) => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  //   console.log(error);
  //   document.getElementById("error-message").style.display = "block";
}; */
//Player Info Card Display
const displaySearchPlayerResult = (players) => {
  //   console.log(players);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  document.getElementById("no-player-found").style.display = "none";
  const errorMessage = document.getElementById("error-message");
  //checkif player is found
  if (players === null || players === undefined) {
    // alert("No player found");
    document.getElementById("error-message").style.display = "block";
    errorMessage.innerText = `Something went wrong please try again
      later. No Player result found!`;
    console.log(errorMessage);
    return true;
  }
  //player found
  players.forEach((player) => {
    // console.log(player);
    const div = document.createElement("div");
    div.classList.add("col");
    div.style.fontSize = "16px";
    div.innerHTML = `
      <div onclick="loadPlayerDetails(${player.idPlayer})" class="card h-100">
      <img src="${player.strCutout}" class="card-img-top" alt="${
      players.strPlayer
    }">
      <div class="card-body">
          <h5 class="card-title">Player Name: ${player.strPlayer}</h5>
          <p class="card-text">${player.strDescriptionEN.slice(0, 50)}>
          </p>
      </div>
     </div>`;
    searchResult.appendChild(div);
  });
};

//Player Details Load
const loadPlayerDetails = (playerId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPlayerDetails(data.players[0]));
    //   .then((data) => console.log(data.players[0]));
  } catch (error) {
    // displayError(error);
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = `Something went wrong please try again
    later. No Player result found!`;
  }
};

//Player Details Card Display
const displayPlayerDetails = (playerDetails) => {
  //   console.log(playerDetails);
  const playerDetailsDiv = document.getElementById("player-details");
  playerDetailsDiv.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${playerDetails.strCutout}" class="card-img-top w-50 h-50 mb-3 mx-auto d-block" alt="${playerDetails.strPlayer}">
  <div class="card-body">
      <h5 class="card-title fs-5 mb-3"> <span class="text-success fw-bold">Player Name: </span>${playerDetails.strPlayer}</h5>
      <p class="card-text fs-6"><span class="text-success fw-bold">Birth-Date: </span>${playerDetails.dateBorn}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Birth Location: </span>${playerDetails.strBirthLocation}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Nationality:</span> ${playerDetails.strNationality}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Team:</span> ${playerDetails.strTeam}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Position:</span> ${playerDetails.strPosition}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Height:</span> ${playerDetails.strHeight}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold">Weight:</span> ${playerDetails.strWeight}</p>
      <p class="card-text fs-6"><span class="text-success fw-bold lh-base">Details:</span> ${playerDetails.strDescriptionEN}</p>
  </div>
    `;
  playerDetailsDiv.appendChild(div);
};
