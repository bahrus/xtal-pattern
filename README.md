[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-pattern)

# \<xtal-pattern\>

\<xtal-pattern\> is a dependency free web component, though its mission is intimately tied with Polymer.  And what is that mission?  To create high level, application specific web components with as little fuss as possible.  (More, detailed, ambitious goals are listed later in this document).  In particular, webcomponents that are mostly markup, with very little script, compositions consisting of lower level web components glued together declaratively.  Web components that are only used one time in a specific application / web site.

\<xtal-pattern\> weighs 920B minified and gzip'd. 

\<xtal-pattern\>, though it is markup centric, allows the javascript to be defined in the same file as the markup.

Although the current implementation is done using Polymer 2, the hope is that when Polymer 3 is released, this helper library will provide a nice counterpoint to the JavaScript-oriented direction Polymer 3 is moving towards.

# Defining a xtal-pattern based web component

Step 1:

To create a web component, create an html file, and give it a name matching the name of the component you wish to define, for example:  my-component.html

Inside my-component.html, define some markup, for example:

```html
<!-- Contents of my-component.html -->
<div>Hello, {{entity}}</div>
```

Step 2:

To register this as a web component, use \<xtal-pattern\> in the containing component markup:

```html
<xtal-pattern entity="world">
    <a href="path/to/my-component.html">The component that is mine, which I possess the sole ownership, and which belongs to me.</a> 
</xtal-pattern> 
```
The text inside the anchor tag is optional.  It will display as a hyperlink until xtal-pattern has loaded enough content from my-component.html to display something.  

xtal-pattern will autogenerate a Polymer web component with name "my-component." It will look for tokens of the form:  {{xyz}}  automatically declare a property with that name.

To specify specific settings for the property, use notation as demmonstrated below:

```html
<div>{{entity|type:String, reflectToAttribute: true, observer:'onPropsChange', value: ''}}</div>
```

Note that references to images, etc, within my-component.html will all be relative to the base url of the web site / page open in the browser.  

Step 4.

Wait for the world to say hi back.


## Custom JavaScript

In the markup above, we defined an observer, "onPropsChange."  Such observers, as well as computed properties and event handlers will need to be defined in a script tag between //{ and //}:

```html
<script>
    //{
    function onPropsChange(){
        this.doStuff();
    }

    function ready(){
        super.ready();
        ...
    }

    function connectedCallback(){
        super.connectedCallback();
        ...
    }
    //}
</script>
```

### What are we trying to achieve here?

This, for now, is a bit of a research project.  Things are likely to change rapidly, as I don't yet see my way to a completely satisfying solution.  I'm trying to achieve something that is easy with iframes (maybe goal 2b is a stretch if there are lots of them on the page):

1)  Allow the html file to serve not only as a web component but also as a standalone page.
2)  Load the content a)  progressively and b)  quickly
3)  Search engines can easily index the contents of the web component even with minimal JavaScript / webcomponent support.
4)  Low learning curve
5)  Be usable anywhere 


======================================  TODO =========================================================

## Progressive enhancement

xtal-pattern provides a number of tricks to minimize boot up time.

1)  The core file for xtal-pattern begins working importing the content before the entirity of the code for the web component is downloaded.
2)  The imported file can contain a section of "light children" to display while the web component loads.

Why would we want to do this?

Say you want to present a slide show "10 Lobotomies gone horribly wrong."  You want the initial, particularly gruisome slide, to display immediately, in order to invite the user to become engaged, while waiting for the supporting files (Polymer, other case studies, and the slide / carousel logic.)

So say the markup looks like this:

```html
    <xtal-pattern>
        <a href="botched-lobotomies.html">10 Lobotomies Gone Horribly Wrong!!!</a>
        <botched-lobotomies count="[[numberToShow]]"></botched-lobotomies>
    </xtal-pattern>
    
``` 

For fastest results, we could include the top slide as a light child of \<botched-lotomies\>. But that could be complicated.  Botched-lobotomies.html would need to have the other 9 of them (or possibly duplicate the first one as well).

and my-component.html looks like:

```html
<!--Begin Light Children-->
<div> light children go here</div>
<!--End Light Children-->

```  


## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
