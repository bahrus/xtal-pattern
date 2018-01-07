(function(){class a extends HTMLElement{connectedCallback(){this._href=this.getAttribute('href');const a=this._href.split('/');this._fileName=a[a.length-1].replace('.html',''),this.loadURL()}loadURL(){fetch(this._href).then((a)=>{const b=document.createElement('script'),c=this._fileName.replace('-','_'),d=this.getAttribute('prop-names').split('|');let e=this.getAttribute('prop-types').split('|');e.length!==d.length&&(e=null);let f=0;const g=d.map((a)=>{const b=[a+':{'];return e&&b.push('\ntype: '+e[f]+','),b.push('\n}'),f++,b.join('')}),h=`
                    (function () {
                        class ${c} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                    ${g.join()}
                                }
                            }
                        }
                        customElements.define('${this._fileName}', ${c})
                    })();
                    `;console.log(h),b.innerText=h,a.text().then((a)=>{const c=document.createElement('dom-module');c.id=this._fileName,c.innerHTML=`
                        <template>
                            ${a}
                        </template>                    
                    `,document.body.appendChild(c),document.head.appendChild(b)})})}}customElements.define('xtal-pattern',a)})();