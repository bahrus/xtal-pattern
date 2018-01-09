# \<xtal-pattern\>

Keep the Polymer &lt;3 vision alive

\<xtal-pattern\> is a dependency free web component that allows you to define a (typically) Polymer based web component using an html file, without the help of HTML Imports.  As such, it won't be very effective at importing other resources based on relative paths.

# Pure markup web component (no custom class definition)

Step 1:

To create a web component, create an html file, and give it a name matching the name of the component you wish to define, for example:  my-component.html

Inside my-component.html, define some markup, for example:

```html
<!-- Contents of my-component.html -->
<div>Hello, [[entity]]</div>
```

Step 2:

To register this as a web component, use \<xtal-pattern\> in the containing component markup:

```html
<xtal-pattern href="path/to/my-component.html">
```

xtal-pattern will autogenerate a Polymer web component with name "my-component." It will look for tokens of the form:  [[xyz]], or [[!xyz]] or {{xyz}} or {{!xyz}} and automatically declare a property with that name.

To specify specific settings for the property, then for one instance of the property, use notation as follows:

```html
<div>{{entity::type:String;readOnly:true;observer:'onPropsChange'}}</div>
```

Note that references to images, etc, within my-component.html will all be relative to the base url of the web site / page open in the browser.  More on this topic later.

Step 3.

Use the new component:

```html
<my-component entity="world"></my-component>
```

Step 4.

Wait for the world to say hi back.


## Custom JavaScript

In the markup above, we defined an observer, "onPropsChange."  Such observers, as well as computed properties and event handlers will need to be defined in the first script tag of the markup file:

```html
<script>
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
