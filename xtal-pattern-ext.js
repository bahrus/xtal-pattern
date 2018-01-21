function processHTML(lhs, rhs, xtalPattern, propDefinitions, propertiesAlreadyFullySet) {
    const tokenized = xtalPattern.sb(xtalPattern._c, lhs, rhs);
    const cleansedMarkupTokens = [];
    //console.log(tokenized);
    tokenized.forEach((token, idx) => {
        switch (idx % 2) {
            case 0:
                cleansedMarkupTokens.push(token);
                break;
            case 1:
                const lhsRHS = token.split('|');
                const name = lhsRHS[0];
                if (!propertiesAlreadyFullySet[name]) {
                    if (lhsRHS.length === 1) {
                        propDefinitions[name] = '{type:String}';
                    }
                    else {
                        propDefinitions[name] = '{' + lhsRHS[1] + '}';
                        propertiesAlreadyFullySet[name] = true;
                    }
                }
                cleansedMarkupTokens.push(lhs + name + rhs);
                break;
        }
    });
    xtalPattern._c = cleansedMarkupTokens.join('');
}
function replace(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
export function process(xtalPattern) {
    const propDefinitions = {};
    const propertiesAlreadyFullySet = {};
    processHTML('{{', '}}', xtalPattern, propDefinitions, propertiesAlreadyFullySet);
    processHTML('[[', ']]', xtalPattern, propDefinitions, propertiesAlreadyFullySet);
    const fn = xtalPattern._fn;
    const props = [];
    for (const key in propDefinitions) {
        props.push(key + ': ' + propDefinitions[key]);
    }
    const scriptSections = xtalPattern.sb(xtalPattern._c, '//{', '//}');
    //debugger;
    let script;
    if (scriptSections.length > 2) {
        script = replace(scriptSections[1], 'function ', '');
        xtalPattern._c = scriptSections[0] + scriptSections[2];
    }
    const domModule = document.createElement('dom-module');
    domModule.id = fn;
    domModule.innerHTML = `<template>${xtalPattern._c}</template>`;
    document.body.appendChild(domModule);
    const scriptTag = document.createElement('script');
    const className = fn.replace('-', '_');
    const js = `(function () {class ${className} extends Polymer.Element{static get is(){return '${fn}'} static get properties(){return {${props.join()}}} ${script}} customElements.define('${fn}', ${className}) })();`;
    scriptTag.innerText = js;
    document.head.appendChild(scriptTag);
}
//# sourceMappingURL=xtal-pattern-ext.js.map