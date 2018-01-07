(function () {
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
        _href: string;
        _fileName: string;
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
                const propNames = this.getAttribute('prop-names').split('|')
                const js = `
                    (function () {
                        class ${className} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                                                    ${propNames.map(propName =>`
                                    ${propName}:{
                                        type: String
                                    }
                                                                    `)}
                                }
                            }
                        }
                        customElements.define('${this._fileName}', ${className})
                    })();
                    `;
                console.log(js);
                scriptTag.innerText = js;
                resp.text().then(markup => {

                    const domModule = document.createElement('dom-module');
                    domModule.id = this._fileName;
                    domModule.innerHTML = `
                        <template>
                            ${markup}
                        </template>                    
                    `
                    document.body.appendChild(domModule);
                    document.head.appendChild(scriptTag);
                });

            })
        }
    }
    customElements.define('xtal-pattern', XtalPattern);
})();