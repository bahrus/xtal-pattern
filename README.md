[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-pattern)

# \<xtal-pattern\>

\<xtal-pattern\> is a dependency free web component, though its mission is intimately tied with Polymer.  And what is that mission?  To create high level, application specific web components with as little fuss as possible.  In particular, webcomponents that are mostly markup, with very little script, compositions consisting of lower level web components glued together declaratively.

\<xtal-pattern\> weighs 930B minified and gzip'd.  

\<xtal-pattern\>, though it is markup centric, allows the javascript to be defined in the same file.

Although the current implementation is done using Polymer 2, the hope is that when Polymer 3 is released, this helper library will provide a nice counterpoint to the JavaScript-oriented direction Polymer 3 is moving towards.

# Pure markup web component (no custom class definition)

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
<xtal-pattern href="path/to/my-component.html">
```

xtal-pattern will autogenerate a Polymer web component with name "my-component." It will look for tokens of the form:  {{xyz}}  automatically declare a property with that name.

To specify specific settings for the property, use notation as demmonstrated below:

```html
<div>{{entity|type:String, reflectToAttribute: true, observer:'onPropsChange'}}</div>
```

Note that references to images, etc, within my-component.html will all be relative to the base url of the web site / page open in the browser.  

Step 3.

Use the new component:

```html
<my-component entity="world"></my-component>
```

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
