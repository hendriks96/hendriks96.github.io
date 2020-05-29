if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/services-worker.js")
            .then(function () {
                console.log("Pendaftaran serviceWorker berhasil");

            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("serviceWorker belum di dukung di browser ini");
}