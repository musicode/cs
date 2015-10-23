var epr = require('edp-provider-rider');
exports.stylus = epr.stylus;

// 默认配置
var stylusPlugin = epr.plugin({
    autoprefix: [
        'last 10 version',   // 浏览器的最近 10 个版本
        '> 1%',              // 份额大于 1%

        'ie >= 8',
        'chrome >= 10',
        'firefox >= 3',
        'safari > 4',
        'opera > 9'
    ],
    use: function (style) {
        style.define('url',epr.stylus.resolver());
    }
});

exports.port = 8828;
exports.stylus = epr.stylus;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: [
                home('index.html'),
                // Weinre 用于 Android 4.4- 设备的调试，请在需要时开启
                // weinre( {port: 8889} ),
                livereload()
            ]
        },
        {
            location: '/index.html',
            handler: [
                file(),
                livereload()
            ]
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss({
                    stylus: {
                        stylus: epr.stylus,
                        use: stylusPlugin
                    }
                })
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    stylus: epr.stylus,
                    use: stylusPlugin
                })
            ]
        },
        {
            location: /\.tpl\.js($|\?)/,
            handler: [
                html2js()
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
