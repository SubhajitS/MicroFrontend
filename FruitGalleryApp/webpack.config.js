const assets = require('webpack-assets-manifest');

module.exports = {
    plugins: [
        new assets({
            writeToFileEmit: true,
            sortManifest: function(a,b) {
                const expr_main_js = (/^(main)\.(js)$/i);
                if(expr_main_js.test(a)) {
                    return 1;
                }
                return 0;
            }
        })
    ]
};
