import * as module from './xtal-pattern-ext.js';
//do {
    //const tagName = 'xtal-pattern';
    customElements.define('xtal-pattern', class extends HTMLElement {
        //_href: string;
        _fn: string; //filename
        //_link: HTMLAnchorElement;
        _c: string; //content
        sb(stringToSplit: string, lhs: string, rhs: string) { //split string between lhs and rhs delimiters
            const returnObj = [];
            stringToSplit.split(lhs).forEach((val, idx) => {
                const rhsSplit = val.split(rhs).forEach(token => {
                    returnObj.push(token);
                })
            })
            return returnObj;
        }
        connectedCallback() {
            const link = this.querySelector('a') as HTMLAnchorElement;
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
                        const wc = document.createElement(this._fn) as HTMLElement;
                        if(slotContent.length > 0){
                            wc.innerHTML = slotContent[1]; //TODO:  accommodate multiple slot types
                        }
                        
                        this.appendChild(wc);
                    }
                    link.style.display = 'none';
                    //TODO:  use dynamic import when polymer build supports it.
                    //import('./xtal-pattern-ext.js').then(module => {
                        module.process(this);
                    //});
                })
            });
        }
    });
//} while ('')