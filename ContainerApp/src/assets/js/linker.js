async function linkAppAssets(appName, cb) {
    const rootURL = 'https://headlessfunctionapp.azurewebsites.net/api/GetURLOfChidComponent?parentAppID=';
    const response = await fetch(rootURL + appName, { mode: 'cors' });

    if (response.ok) {
        const parsedJson = await response.json();

        if (!checkAlreadyRegistered(parsedJson.directive)) {
            Object.keys(parsedJson).filter(x => x !== 'directive').forEach(x => {
                const cssRex = /.css$/g;
                if (cssRex.test(x)) {
                    //Append stylesheet
                    const styles = document.createElement('link');
                    styles.setAttribute('rel', 'stylesheet');
                    styles.setAttribute('href', parsedJson[x]);
                    document.head.appendChild(styles);
                } else {
                    //Append scripts
                    const scripts = document.createElement('script');
                    scripts.setAttribute('type', 'text/javascript');
                    scripts.setAttribute('src', parsedJson[x]);
                    scripts.setAttribute('defer', true);
                    document.body.appendChild(scripts);
                }
            });
            cb(parsedJson.directive);
        }
    }
}

function checkAlreadyRegistered(elementName) {
    return !!window.customElements && !!window.customElements.get(elementName);
}

