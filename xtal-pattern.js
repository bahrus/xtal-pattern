//import * as module from './xtal-pattern-ext.js';
do {
    //const tagName = 'xtal-pattern';
    customElements.define('xtal-pattern', class extends HTMLElement {
        sb(stringToSplit, lhs, rhs) {
            const returnObj = [];
            stringToSplit.split(lhs).forEach((val, idx) => {
                const rhsSplit = val.split(rhs).forEach(token => {
                    returnObj.push(token);
                });
            });
            return returnObj;
        }
        connectedCallback() {
            const link = this.querySelector('a');
            if (!link) {
                setTimeout(this.connectedCallback, 50);
                return;
            }
            const href = link.href;
            const splitPath = href.split('/');
            this._fn = splitPath[splitPath.length - 1].replace('.html', '');
            fetch(href).then(resp => {
                resp.text().then(content => {
                    this._c = content;
                    const slotContent = this.sb(content, "<slot>", "</slot>");
                    if (!this.querySelector(this._fn)) {
                        const wc = document.createElement(this._fn);
                        if (slotContent.length > 0) {
                            wc.innerHTML = slotContent[1];
                        }
                        this.appendChild(wc);
                    }
                    link.style.display = 'none';
                    import('./xtal-pattern-ext.js').then(module => {
                        module.process(this);
                    });
                });
            });
        }
    });
} while ('');
//# sourceMappingURL=xtal-pattern.js.map