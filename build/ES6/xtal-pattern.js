(function(){function a(a,b,c){return a.replace(new RegExp(b,'g'),c)}function b(){class b extends HTMLElement{connectedCallback(){this._href=this.getAttribute('href');const a=this._href.split('/');this._fileName=a[a.length-1].replace('.html',''),this.loadURL()}loadURL(){fetch(this._href).then((b)=>{const c=document.createElement('script'),e=this._fileName.replace('-','_');b.text().then((b)=>{let f=b;const g=f.indexOf('//{');let h='';if(-1<g){const b=f.indexOf('//}',g);-1<b&&(h=f.substring(g+3,b),h=a(h,'function ',''),f=f.substr(0,g)+f.substr(b+3))}let i,j=0;const k={},l=[],m={};for(;null!==(i=d.exec(f));){l.push(f.substring(j,i.index));const a=i[0],b=a.substr(2,a.length-4),c=b.split('|'),d=c[0];m[d]||(1===c.length?k[d]='{type:String}':(k[d]='{'+c[1]+'}',m[d]=!0)),l.push('{{'+d+'}}'),j=i.index+a.length}const n=[];for(const a in k)n.push(a+': '+k[a]);const o=document.createElement('dom-module');o.id=this._fileName,o.innerHTML=`
                        <template>
                            ${l.join('')}
                        </template>                    
                    `,document.body.appendChild(o);const p=`
                    (function () {
                        class ${e} extends Polymer.Element{
                            static get is(){return '${this._fileName}'}
                            static get properties(){
                                return {
                                    ${n.join()}
                                }
                            }
                            ${h}
                        }
                        customElements.define('${this._fileName}', ${e})
                    })();
                    `;c.innerText=p,document.head.appendChild(c)})})}}customElements.define('xtal-pattern',b)}function c(){return'function'!==typeof Polymer||'function'!==typeof Polymer.Element?void setTimeout(c,100):void b()}const d=/\{\{[^\{^\}]+\}\}/g;c()})();