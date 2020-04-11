function linkAppAssets() {
    const rootURL = 'http://127.0.0.1:5500/dist/FruitGalleryApp/';
    if (!checkAlreadyRegistered('fruit-gallery')) {
        fetch(rootURL + 'manifest.json')
            .then((response) => {
                return response.json();
            })
            .then((parsedJson) => {
                Object.keys(parsedJson).forEach(x => {
                    const cssRex = /.css$/g;
                    if (cssRex.test(x)) {
                        //Append stylesheet
                        const styles = document.createElement('link');
                        styles.setAttribute('rel', 'stylesheet');
                        styles.setAttribute('href', rootURL + parsedJson[x]);
                        document.head.appendChild(styles);
                    } else {
                        //Append scripts
                        const scripts = document.createElement('script');
                        scripts.setAttribute('type', 'text/javascript');
                        scripts.setAttribute('src', rootURL + parsedJson[x]);
                        scripts.setAttribute('defer', true);
                        document.body.appendChild(scripts);
                    }
                });
            });
    }
}

function checkAlreadyRegistered(elementName) {
    return !!window.customElements && !!window.customElements.get(elementName);
}

