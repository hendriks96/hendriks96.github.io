document.addEventListener("DOMContentLoaded", function () {

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".topnav a, .sidenav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                        setNavigationActive(page);
                    });
                });


            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function setNavigationActive(page) {
        if (page === "home") {

            var idSideNav = document.getElementById("nav-mobile").getElementsByClassName("to-active");
            for (var i = 0; i < idSideNav.length; i++) {
                idSideNav[i].classList.remove("active");
                idSideNav[0].classList.add("active");
            }

            var idTopNav = document.getElementById("nav-desktop").getElementsByClassName("to-active");
            for (var i = 0; i < idTopNav.length; i++) {
                idTopNav[i].classList.remove("active");
                idTopNav[0].classList.add("active");
            }
        } else if (page === "standings") {
            var idSideNav = document.getElementById("nav-mobile").getElementsByClassName("to-active");
            for (var i = 0; i < idSideNav.length; i++) {
                idSideNav[i].classList.remove("active");
                idSideNav[1].classList.add("active");
            }

            var idTopNav = document.getElementById("nav-desktop").getElementsByClassName("to-active");
            for (var i = 0; i < idTopNav.length; i++) {
                idTopNav[i].classList.remove("active");
                idTopNav[1].classList.add("active");
            }

        } else if (page === "teams") {
            var idSideNav = document.getElementById("nav-mobile").getElementsByClassName("to-active");
            for (var i = 0; i < idSideNav.length; i++) {
                idSideNav[i].classList.remove("active");
                idSideNav[2].classList.add("active");
            }

            var idTopNav = document.getElementById("nav-desktop").getElementsByClassName("to-active");
            for (var i = 0; i < idTopNav.length; i++) {
                idTopNav[i].classList.remove("active");
                idTopNav[2].classList.add("active");
            }
        } else if (page === "saved") {
            var idSideNav = document.getElementById("nav-mobile").getElementsByClassName("to-active");
            for (var i = 0; i < idSideNav.length; i++) {
                idSideNav[i].classList.remove("active");
                idSideNav[3].classList.add("active");
            }

            var idTopNav = document.getElementById("nav-desktop").getElementsByClassName("to-active");
            for (var i = 0; i < idTopNav.length; i++) {
                idTopNav[i].classList.remove("active");
                idTopNav[3].classList.add("active");
            }
        }
    }

    function loadPage(page) {
        //set active
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;

                    if (page === "home") {
                        document.getElementById("logo-container").innerText = "Football Apps";
                        getListMatch();
                    } else if (page === "standings") {
                        var elems = document.querySelectorAll('select');
                        M.FormSelect.init(elems, options);
                        document.getElementById("logo-container").innerText = "Standings";

                        const e = document.getElementById("slcLeague");
                        let valE = e.options[e.selectedIndex].value;
                        e.addEventListener('change', function () {
                            valE = this.value;
                            getStandingList(valE);
                        });
                        getStandingList(valE);
                    } else if (page == "teams") {
                        var elems = document.querySelectorAll('select');
                        M.FormSelect.init(elems, options);
                        const e = document.getElementById("slcTeams");
                        let valE = e.options[e.selectedIndex].value;
                        e.addEventListener('change', function () {
                            valE = this.value;
                            getListTeams(valE);
                        });
                        getListTeams(valE);
                        document.getElementById("logo-container").innerText = "Teams";
                    } else if (page == "saved") {
                        document.getElementById("logo-container").innerText = "Saved";
                        getSavedTeamList();
                    }


                } else if (this.status == 404) {
                    content.innerHTML = "<p> Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});