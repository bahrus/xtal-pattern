(function () {
    const regExp = /\{\{[^\{^\}]+\}\}/g;
    function replace(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    function initXtalPattern() {
        /**
* `xtal-pattern`
*
* Generate Polymer web component dynamically
*
*
* @customElement
* @polymer
* @demo demo/index.html
*/
        class XtalPattern extends HTMLElement {
            connectedCallback() {
                this._href = this.getAttribute('href');
                const splitPath = this._href.split('/');
                this._fileName = splitPath[splitPath.length - 1].replace('.html', '');
                this.loadURL();
            }
            loadURL() {
                fetch(this._href).then(resp => {
                    const scriptTag = document.createElement('script');
                    const className = this._fileName.replace('-', '_');
                    resp.text().then(contents => {
                        let markup = contents;
                        const iPosOfOpenScript = markup.indexOf('//{');
                        let script = '';
                        if (iPosOfOpenScript > -1) {
                            const iPosOfClosedScript = markup.indexOf('//}', iPosOfOpenScript);
                            if (iPosOfClosedScript > -1) {
                                script = markup.substring(iPosOfOpenScript + 3, iPosOfClosedScript);
                                script = replace(script, 'function ', '');
                                markup = markup.substr(0, iPosOfOpenScript) + markup.substr(iPosOfClosedScript + 3);
                            }
                        }
                        let regExpObj;
                        let idx = 0;
                        const propDefinitions = {};
                        const cleansedMarkupTokens = [];
                        const propertiesAlreadyFullySet = {};
                        while ((regExpObj = regExp.exec(markup)) !== null) {
                            cleansedMarkupTokens.push(markup.substring(idx, regExpObj['index']));
                            const token = regExpObj[0];
                            const stuffInsideBraces = token.substr(2, token.length - 4);
                            const lhsRHS = stuffInsideBraces.split('|');
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
                            cleansedMarkupTokens.push('{{' + name + '}}');
                            idx = regExpObj['index'] + token.length;
                        }
                        const props = [];
                        for (const key in propDefinitions) {
                            props.push(key + ': ' + propDefinitions[key]);
                        }
                        const domModule = document.createElement('dom-module');
                        domModule.id = this._fileName;
                        domModule.innerHTML = `
                        <template>
                            ${cleansedMarkupTokens.join('')}
                        </template>                    
                    `;
                        document.body.appendChild(domModule);
                        const js = `
                    (function () {
                        class ${className} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                    ${props.join()}
                                }
                            }
                            ${script}
                        }
                        customElements.define('${this._fileName}', ${className})
                    })();
                    `;
                        scriptTag.innerText = js;
                        document.head.appendChild(scriptTag);
                    });
                });
            }
        }
        customElements.define('xtal-pattern', XtalPattern);
    }
    function WaitForPolymer() {
        if ((typeof Polymer !== 'function') || (typeof Polymer.Element !== 'function')) {
            setTimeout(WaitForPolymer, 100);
            return;
        }
        initXtalPattern();
    }
    WaitForPolymer();
})();
//# sourceMappingURL=xtal-pattern.js.map