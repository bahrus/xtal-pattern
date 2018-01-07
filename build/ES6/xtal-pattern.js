(function(){class a extends HTMLElement{connectedCallback(){this._href=this.getAttribute('href');const a=this._href.split('/');this._fileName=a[a.length-1].replace('.html',''),this.loadURL()}loadURL(){fetch(this._href).then((a)=>{const b=document.createElement('script'),c=this._fileName.replace('-','_'),d=this.getAttribute('prop-names').split('|');b.innerText=`
                    (function () {
                        class ${c} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                                                    ${d.map(()=>`
                                    propName:{
                                        type: String
                                    }
                                                                    `)}
                            }
                        }
                        customElements.define('${this._fileName}', ${c})
                    })();
                    `,a.text().then((a)=>{const c=document.createElement('dom-module');c.id=this._fileName,c.innerHTML=`
                        <template>
                            ${a}
                        </template>                    
                    `,document.body.appendChild(c),document.head.appendChild(b)})})}}customElements.define('xtal-pattern',a)})();