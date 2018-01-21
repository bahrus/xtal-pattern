do {
    //const tagName = 'xtal-pattern';
    customElements.define('xtal-pattern', class extends HTMLElement {
        sb(stringToSplit, lhs, rhs) {
            const returnObj = [];
            stringToSplit.split(lhs).forEach((val, idx) => {
                if (idx % 2 === 0) {
                    returnObj.push(val);
                }
                else {
                    const rhsSplit = val.split(rhs);
                    returnObj.push(rhsSplit[0]);
                    returnObj.push(rhsSplit.slice(1).join(rhs));
                }
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
                        link.style.display = 'none';
                        this.appendChild(wc);
                    }
                });
            });
        }
    });
} while ('');
//# sourceMappingURL=xtal-pattern.js.map