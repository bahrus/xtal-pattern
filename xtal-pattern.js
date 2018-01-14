(function () {
    const regExp = /\{\{[^\{^\}]+\}\}/g;
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
                resp.text().then(markup => {
                    //const tokenized = regExp.exec(markup);
                    let regExpObj;
                    let idx = 0;
                    const propDefinitions = {};
                    const cleansedMarkupTokens = [];
                    while ((regExpObj = regExp.exec(markup)) !== null) {
                        cleansedMarkupTokens.push(markup.substring(idx, regExpObj['index']));
                        //declare property
                        const token = regExpObj[0];
                        // const prop = {
                        //     type: String
                        // } as PropObjectType;
                        const stuffInsideBraces = token.substr(2, token.length - 4);
                        const lhsRHS = stuffInsideBraces.split('|');
                        console.log({
                            lhsRHS: lhsRHS
                        });
                        const name = lhsRHS[0];
                        if (lhsRHS.length === 1) {
                            propDefinitions[name] = '{type:String}';
                        }
                        else {
                            propDefinitions[name] = '{' + lhsRHS[1] + '}';
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
                    console.log(domModule.innerHTML);
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
                        }
                        customElements.define('${this._fileName}', ${className})
                    })();
                    `;
                    console.log(js);
                    scriptTag.innerText = js;
                    document.head.appendChild(scriptTag);
                });
            });
        }
    }
    customElements.define('xtal-pattern', XtalPattern);
})();
//# sourceMappingURL=xtal-pattern.js.map