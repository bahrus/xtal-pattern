(function () {
    const regExp = /\{\{[a-zA-Z]+\}\}/g;
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
                //const propNames = this.getAttribute('prop-name').split('|');
                //const propSettings = ['type', 'notify', 'read-only', 'observer'];
                //let propDef = {};
                // propSettings.forEach(setting =>{
                //     const propValuesAtr = this.getAttribute('prop-' + setting);
                //     if(!propValuesAtr) return;
                //     let propValues = propValuesAtr.split('|');
                //     if(propValues.length !== propNames.length) return;
                //     propDef[setting] = propValues;
                // })
                //let propTypes = this.getAttribute('prop-type').split('|');
                //if(propTypes.length !== propNames.length) propTypes = null;
                // let counter = 0;
                // const props = propNames.map(propName =>{
                //     const returnObj = [propName + ':{'];
                //     for(let key in propDef){
                //         returnObj.push(`\n${key}: ${propDef[key][counter]},`)
                //     }
                //     // if(propTypes) returnObj.push('\ntype: ' + propTypes[counter] + ',');
                //     returnObj.push('\n}')
                //     counter++;
                //     return returnObj.join('');
                // })
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
                        const name = token.substr(2, token.length - 4);
                        propDefinitions[name] = '';
                        cleansedMarkupTokens.push(token);
                        console.log(regExpObj);
                        console.log();
                        idx = regExpObj['index'] + token.length;
                    }
                    const props = [];
                    for (const key in propDefinitions) {
                        props.push(key + ': {type: String}');
                    }
                    // const props = propDefinitions.map(propName => {
                    //     const returnObj = [propName + ':{'];
                    //     for (let key in propDef) {
                    //         returnObj.push(`\n${key}: ${propDef[key][counter]},`)
                    //     }
                    //     // if(propTypes) returnObj.push('\ntype: ' + propTypes[counter] + ',');
                    //     returnObj.push('\n}')
                    //     counter++;
                    //     return returnObj.join('');
                    // })
                    const domModule = document.createElement('dom-module');
                    domModule.id = this._fileName;
                    domModule.innerHTML = `
                        <template>
                            ${cleansedMarkupTokens.join('')}
                        </template>                    
                    `;
                    //console.log(domModule.innerHTML);
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