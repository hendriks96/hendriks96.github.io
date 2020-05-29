const dbPromised = idb.open("football-app", 1, function (upgradeDb) {
    const teamDetailsObjectStore = upgradeDb.createObjectStore("team-details", {
        keyPath: "id"
    });

    teamDetailsObjectStore.createIndex("id", "id", { unique: true });

});

const saveToIndexedDB = (details) => {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("team-details", "readwrite");
            const store = tx.objectStore("team-details");
            store.add(details);
            return tx.complete;
        })
        .then(function (data) {
            console.log("Details berhasil di simpan");
        })
        .catch(function (data) {
            console.log("already saved");
        });

}

const saveForLater = (details) => {
    dbTeamById(details.id).then(function (resp) {
        if (resp === undefined) {
            console.log("data tidak ada di indexed db");
            saveToIndexedDB(details);
            M.toast({ html: 'Saving Team Successfully' });

        } else {
            console.log("data ada di db");
            M.toast({ html: 'Team already saved' });
        }
    });
}


const getAll = () => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("team-details", "readonly");
                const store = tx.objectStore("team-details");
                return store.getAll();
            })
            .then(function (details) {
                resolve(details);
            });
    });
}


function dbTeamById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("team-details", "readonly");
                var store = tx.objectStore("team-details");
                var idx = store.index("id")
                return idx.get(parseInt(id));
            })
            .then(function (article) {
                resolve(article);
            });
    });
}

const deleteTeamById = (id) => {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("team-details", "readwrite");
            const store = tx.objectStore("team-details");
            store.delete(parseInt(id));
            return tx.complete;
        })
        .then(function (data) {
            console.log("data di hapus");
            M.toast({ html: 'Remove from saved' });
        });
}