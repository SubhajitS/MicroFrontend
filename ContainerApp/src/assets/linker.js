var linkAppAssets = function (appId, callback) {
    fetch('http://127.0.0.1:5500/dist/FruitGalleryApp/manifest.json').then((response) => {
        console.log(response);
    });
}