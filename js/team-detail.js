$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");

    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");

    let item;

    if (isFromSaved) {
        const teamUrl = new URLSearchParams(window.location.search);
        const idTeam = teamUrl.get("id");

        btnSave.style.display = 'none';
        document.getElementById("btnBack").href = "./#saved";
        getSavedTeamById();

        dbTeamById(idTeam).then(function (detail) {
            btnDelete.onclick = function () {
                deleteTeamById(idTeam);
                btnDelete.style.display = 'none';
            }
        });
    } else {
        btnDelete.style.display = 'none';
        item = getTeamDetailById();
    }



    btnSave.onclick = function () {
        item.then(function (detail) {
            saveForLater(detail);
            $('#btnSaved').text('favorite');
        });
    }
    $('.tabs').tabs();
});