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
                scriptTag.innerText = `
                    (function () {
                        class ${className} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                    entity: {
                                        type: String
                                    }
                                }
                            }
                        }
                        customElements.define('${this._fileName}', ${className})
                    })();
                    `;
                resp.text().then(markup => {
                    const domModule = document.createElement('dom-module');
                    domModule.id = this._fileName;
                    domModule.innerHTML = `
                        <template>
                            ${markup}
                        </template>                    
                    `;
                    document.body.appendChild(domModule);
                    document.head.appendChild(scriptTag);
                });
            });
        }
    }
    customElements.define('xtal-pattern', XtalPattern);
})();
//# sourceMappingURL=xtal-pattern.js.map