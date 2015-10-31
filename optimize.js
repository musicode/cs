
/**
 * 编译出来的 css，有很多重复部分，比如：
 *
 * a {
 *     cursor: pointer;
 * }
 * b {
 *     cursor: pointer;
 * }
 *
 * 应该进行样式合并
 *
 * a,
 * b {
 *     cursor: pointer;
 * }
 *
 */

/**
 * 删除注释
 *
 * @inner
 * @param {string} code
 * @return {string}
 */
function removeComments(code) {
    return code
            .replace(/\n/g, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
}

/**
 * 选择器去重
 *
 * @param {Array.<string>} selectors
 * @return {Array.<string>}
 */
function uniqueSelectors(selectors) {

    var result = [ ];
    var map = { };

    var push = function (item) {
        if (!map[item]) {
            map[item] = 1;
            result.push(item);
        }
    };

    selectors.forEach(
        function (item) {
            push(item.trim());
        }
    );

    return result;
}

function optimizeSelector(selector) {
    selector = selector.join(',').split(',');
    selector = uniqueSelectors(selector).join(',');
    return selector;
}

function optimizeStyle(style) {
    var result = [ ];
    style.split(';').forEach(
        function (item) {
            var terms = item.split(':');
            if (terms.length === 2) {
                result.push(
                    terms[0].trim()
                    + ':'
                    + terms[1].trim()
                 )
            }
        }
    );
    return result.join(';');
}

var sourceFile = require('path').join(__dirname, process.argv[2]);
var destFile = require('path').join(__dirname, process.argv[3]);

console.log('source', sourceFile);
console.log('dest', destFile);

var sourceCode = require('fs').readFileSync(sourceFile, 'utf-8');

var map = { };

removeComments(sourceCode).split('}').forEach(
    function (item) {
        var terms = item.split('{');
        if (terms.length === 2) {

            var style = terms[1].trim();
            if (!style) {
                return;
            }

            var selector = map[style];
            if (!selector) {
                selector = map[style] = [ ];
            }

            selector.push(
                terms[0].trim()
            );

        }
    }
);

var output = [ ];

for (var style in map) {
    if (map.hasOwnProperty(style)) {
        var selector = map[style];
        if (selector) {
            output.push(
                optimizeSelector(selector)
                + '{'
                + optimizeStyle(style)
                + '}'
            );
        }
    }
}

require('fs').writeFileSync(destFile, output.join(''), 'utf-8');
