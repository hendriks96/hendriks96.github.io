const base_url = "https://api.football-data.org/v2/";

const statusres = (response) => {
  if (response.count === 0) {
    return Promise.reject(new Error(response.matches));
  } else {
    return Promise.resolve(response);
  }
}

const json = (response) => {
  return response.json();
}

const url = new URL(base_url + "matches");
const params = {
  dateTo: "2019-10-07",
  dateFrom: "2019-10-01",
  status: "FINISHED"
}

const paramStandings = {
  standingType: "TOTAL"
}

const options = {
  method: "GET",
  headers: {
    "X-Auth-Token": "c290b1ce5fe2457e87e4ab09ac1d7adb"
  }
};

const renderListMatch = (matches) => {
  const elementCarousel = document.getElementById("contentItemSlider");
  const elmItemListMatch = document.getElementById("itemListMatch");

  elementCarousel.innerHTML = "";
  elmItemListMatch.innerHTML = "";

  matches.forEach((match, index) => {
    const idCompetition = match.id;
    const competition = match.competition;
    const competitionName = competition.name;
    const matchDay = match.matchday;

    const awayTeamName = match.awayTeam.name;
    const homeTeamName = match.homeTeam.name;

    const awayTeamScore = match.score.fullTime.awayTeam;
    const homeTeamScore = match.score.fullTime.homeTeam;

    if (index <= 4) { //GET ONLY 4 FOR CAROUSEL VIEW
      elementCarousel.innerHTML += `
                <div class="carousel-item red white-text" href="#carousel-item${index}!">
                  <h2 class="center">${competitionName} matchday ${matchDay}</h2>
                  <h4 class="center">FT</h4>
                  <div class="row">
                    <div class="col s12">
                      <div class="col s4">
                        <h5>${homeTeamName}</h5>
                      </div>
                      <div class="col s1">
                        <h5>${homeTeamScore}</h5>
                      </div>
                      <div class="col s2">
                        <h5>VS</h5>
                      </div>
                      <div class="col s1">
                        <h5>${awayTeamScore}</h5>
                      </div>
                      <div class="col s4">
                        <h5>${awayTeamName}</h5>
                      </div>
                    </div>
                  </div>
                </div>`;
    } else { //PUT IN THE BOTTOM
      elmItemListMatch.innerHTML += `
                <div class="col s12">
                <div class="card">
                    <div class="card-content center">
                        <div class="col s12">
                            <span class="card-title red-text">${competitionName}</span>
                        </div>

                        <div class="row">
                            <small>Matchday ${matchDay}</small>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <div class="row">
                                <div class="col s4">
                                    <span class="center">${homeTeamName}</span>
                                </div>
                                <div class="col s1">
                                    ${homeTeamScore}
                                </div>
                                <div class="col s2">
                                    <span class="center"><b>VS</b></span>
                                </div>
                                <div class="col s1">
                                    ${awayTeamScore}
                                </div>
                                <div class="col s4">
                                    <span class="center">${awayTeamName}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="card-action">
                            <a href="./match.html?id=${idCompetition}">Detail</a>
                        </div>
                    </div>
                </div>
            </div>`;
    }

  });

  const timeout = (elms) => {
    setTimeout(() => {
      M.Carousel.getInstance(elms[0]).next();
      timeout(elms);
    }, 5000);
  }

  const elemsCrsHome = document.querySelectorAll('.carousel');

  M.Carousel.init(elemsCrsHome, {
    fullWidth: true,
    indicators: true,
    // duration: 200
  });

  timeout(elemsCrsHome);
}

const getListMatch = () => {
  url.search = new URLSearchParams(params).toString();

  if ('caches' in window) {
    caches.match(url).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          renderListMatch(data.matches);
        })
      }
    })
  }

  fetch(url, options)
    .then(statusres)
    .then(json)
    .then(function (data) {
      renderListMatch(data.matches);
    })
    .catch(function (error) {
      console.log("error" + error);
    });

}

const renderDetailMatch = details => {
  const bodyContent = document.getElementById("body-content");
  bodyContent.innerHTML = `
    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 center">
            <h3><i class="mdi-content-send brown-text"></i></h3>
            <h4>Match Detail</h4>
            <div class="divider"></div>
          </div>
        </div>
        <div class="card center">
            <div class="col s12">
                <span class="card-title red-text">${details.match.competition.name}</span>
            </div>
          <div class="row">
            <div class="col s12">
              <small>Matchday ${details.match.matchday}</small>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <span>Fulltime</span>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="col s4">
                <span class="center">${details.match.homeTeam.name}</span>
              </div>
              <div class="col s1">
                ${details.match.score.fullTime.homeTeam}
              </div>
              <div class="col s2">
                <span class="center"><b>VS</b></span>
              </div>
              <div class="col s1">
                ${details.match.score.fullTime.awayTeam}
              </div>
              <div class="col s4">
                <span class="center">${details.match.awayTeam.name}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row">
              <div class="col s12">
                <span class="yellow-text"><b>${details.match.venue}</b></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 center">
            <h3><i class="mdi-content-send brown-text"></i></h3>
            <h4>Head to head</h4>
            <div class="divider"></div>
          </div>
        </div>
        <div class="card center">
          <div class="row">
            <div class="col s12">
              <span class="card-title red-text">${details.match.group}</span>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="col s6">
                <span class="card-title center">${details.match.homeTeam.name}</span>
              </div>
              <div class="col s6">
                <span class="card-title center">${details.match.awayTeam.name}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row">
              <div class="col s12">
                <div class="col s6">
                  <span class="center green-text"><b>${details.head2head.homeTeam.wins} Win</b></span>
                </div>
                <div class="col s6">
                  <span class="center green-text"><b>${details.head2head.awayTeam.wins} Win</b></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <div class="col s6">
                  <span class="center red-text"><b>${details.head2head.homeTeam.losses} Losses</b></span>
                </div>
                <div class="col s6">
                  <span class="center red-text"><b>${details.head2head.awayTeam.losses} Losses</b></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <div class="col s6">
                  <span class="center yellow-text"><b>${details.head2head.awayTeam.draws} Draws</b></span>
                </div>
                <div class="col s6">
                  <span class="center yellow-text"><b>${details.head2head.homeTeam.draws} Draws</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 center">
            <h3><i class="mdi-content-send brown-text"></i></h3>
            <h4>Referes</h4>
            <div class="divider"></div>
          </div>
        </div>
        <div class="card center">
          <div class="row">
            <div class="row">
              <div class="col s12">
                <span class="card-title center">${details.match.referees[0].name}</span>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <span class="card-title center">${details.match.referees[1].name}</span>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <span class="card-title center">${details.match.referees[2].name}</span>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <span class="card-title center">${details.match.referees[3].name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;


}

const renderListStandings = standings => {
  const content = document.getElementById("itemStandings");
  content.innerHTML = "";

  standings.forEach((standing) => {
    let urlImage = standing.team.crestUrl;
    urlImage = urlImage.replace(/^http:\/\//i, 'https://');

    content.innerHTML += `
        <div class="col s12">
            <div class="card">
                <div class="new badge">
                    <span class="new badge" data-badge-caption="Pts">${standing.points}</span>
                </div>
                <div class="card-content center">
                    <div class="row">
                        <img class="img-badge" src="${urlImage}" />
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <span>${standing.team.name}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s4">
                            <span class="green-text"><b>${standing.won} Win</b></span>
                        </div>
                        <div class="col s4">
                            <span class="red-text"><b>${standing.lost} Lost</b></span>
                        </div>
                        <div class="col s4">
                            <span class="yellow-text"><b>${standing.draw} Draws</b></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 center">
                            <h7>Goal Statistik</h7>
                            <div class="divider"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s4">
                            <span class="black-text">GF ${standing.goalsFor}</span>
                        </div>
                        <div class="col s4">
                            <span class="black-text">GA ${standing.goalsAgainst}</span>
                        </div>
                        <div class="col s4">
                            <span class="black-text">GD ${standing.goalDifference}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  });
}

const renderListTeams = teams => {
  const teamsContent = document.getElementById("itemTeams");
  teamsContent.innerHTML = "";
  teams.forEach((team) => {

    let urlImage = team.crestUrl;
    urlImage = urlImage.replace(/^http:\/\//i, 'https://');

    teamsContent.innerHTML += `
            <div class="col s12">
                <a href="./team-detail.html?id=${team.id}">
                    <div class="card small">
                    
                        <div class="card-image">
                            <img src="${urlImage}">
                        </div>
                        <div class="card-content center">
                            <div class="row">
                                <div class="col s12">
                                    <span class="card-title">${team.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`;


  })


}

const renderTeamDetail = teamDetails => {
  const ctnCardTeam = document.getElementById("teamDetail");
  const ctnSquad = document.getElementById("team-squad");
  const squads = teamDetails.squad;

  let urlImage = teamDetails.crestUrl;
  urlImage = urlImage.replace(/^http:\/\//i, 'https://');

  ctnSquad.innerHTML = "";
  ctnCardTeam.innerHTML = `
        <div class="col s12">
            <div class="center">
                <img class="responsive-img"
                    src="${urlImage}" />
            </div>

            <div class="card">
                <div class="card-content center">
                    <div class="col s12">
                        <span class="card-title">${teamDetails.name}</span>
                    </div>
                    <div class="row">
                        <small>EST ${teamDetails.founded}</small>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s6">
                                <input value="${teamDetails.shortName}" id="short_name" type="text"
                                    class="validate" disabled>
                                <label for="short_name" class="active">Short Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${teamDetails.tla}" id="tla" type="text" class="validate" disabled>
                                <label for="tla" class="active">TLA</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s12">
                                <input value="${teamDetails.phone}" id="phone" type="text"
                                    class="validate" disabled>
                                <label for="phone" class="active">Phone</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s12">
                                <input value="${teamDetails.email}" id="email" type="text"
                                    class="validate" disabled>
                                <label for="email" class="active">Email</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s12">
                                <input value="${teamDetails.venue}" id="venue" type="text" class="validate"
                                    disabled>
                                <label for="venue" class="active">Venue</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s12">
                                <input value="${teamDetails.address}" id="address"
                                    type="text" class="validate" disabled>
                                <label for="address" class="active">Address</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field col s12">
                                <input value="${teamDetails.clubColors}" id="club_color" type="text"
                                    class="validate" disabled>
                                <label for="club_color" class="active">Club Colors</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

  squads.forEach((squad) => {
    let squadShirtNumber = squad.shirtNumber;
    let position = squad.position;

    if (squadShirtNumber === null) {
      squadShirtNumber = "";
    }

    if (position === null) {
      position = "";
    }
    ctnSquad.innerHTML += `
        <div class="row">
            <div class="col s12">
                <div class="card">
                    <span class="new badge" data-badge-caption="">${squad.role}</span>
                    <div class="card-content">
                        <div class="row">
                            <div class="col s12">
                                <span class="red-text">${position}</span>
                            </div>
                        </div>
                        <div class="row center">
                            <div class="col s12">
                                <span class="card-title">${squad.name}</span>
                            </div>
                            <div class="col s12">
                                <h2><b>${squadShirtNumber}</b></h2>
                            </div>
                        </div>
                        <div class="row center">
                            <div class="col s4"></div>
                            <div class="col s4 badge red">
                                <span class="white-text">${squad.nationality}</span>
                            </div>
                            <div class="col s4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  });
}

const getMatchDetailById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "matches/" + idParam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          renderDetailMatch(data);
        })
      }
    })
  }

  fetch(base_url + "matches/" + idParam, options)
    .then(statusres)
    .then(json)
    .then(function (data) {
      renderDetailMatch(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getStandingList = idLeague => {
  const urlStandings = `${base_url}competitions/${idLeague}/standings?standingType=TOTAL`;

  if ('caches' in window) {
    caches.match(urlStandings).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          renderListStandings(data.standings[0].table);
        })
      }
    })
  }

  fetch(urlStandings, options)
    .then(statusres)
    .then(json)
    .then(function (data) {
      renderListStandings(data.standings[0].table);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getListTeams = idLeague => {

  if ('caches' in window) {
    caches.match(`${base_url}competitions/${idLeague}/teams`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          renderListTeams(data.teams);
        })
      }
    })
  }

  fetch(`${base_url}competitions/${idLeague}/teams`, options)
    .then(statusres)
    .then(json)
    .then(function (data) {
      renderListTeams(data.teams);
    })
    .catch(function (error) {
      console.log(error);
    });

}

const getTeamDetailById = () => {
  return new Promise(function (resolve, reject) {
    const teamUrl = new URLSearchParams(window.location.search);
    const idTeam = teamUrl.get("id");

    if ('caches' in window) {
      caches.match(`${base_url}teams/${idTeam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            renderTeamDetail(data);
            resolve(data);
          })
        }
      })
    }

    fetch(`${base_url}teams/${idTeam}`, options)
      .then(statusres)
      .then(json)
      .then(function (data) {
        renderTeamDetail(data);
        resolve(data);
      })
      .catch(function (error) {
        console.log(error);
      })

  });

}

const renderListTeamSaved = (details) => {
  const ctnTeamSaved = document.getElementById("itemTeamSaved");
  ctnTeamSaved.innerHTML = "";

  details.forEach((detail) => {
    let urlImage = detail.crestUrl;
    urlImage = urlImage.replace(/^http:\/\//i, 'https://');

    ctnTeamSaved.innerHTML += `
    <div class="col s12">
        <a href="./team-detail.html?id=${detail.id}&saved=true">
            <div class="card small">
                <div class="card-image">
                    <img src="${urlImage}">
                </div>
                <div class="card-content center">
                    <div class="row">
                        <div class="col s12">
                            <span class="card-title">${detail.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `;
  });

}

const getSavedTeamList = () => {
  getAll().then(function (details) {
    renderListTeamSaved(details);
  });
}

const getSavedTeamById = () => {
  const teamUrl = new URLSearchParams(window.location.search);
  const idTeam = teamUrl.get("id");

  dbTeamById(idTeam).then(function (detail) {
    renderTeamDetail(detail);
  });
}



