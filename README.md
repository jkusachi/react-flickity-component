React Flickity Component
=======================

#### Introduction:
A React.js Flickity component.

#### Install:

```shell
npm install react-flickity-component --save
```
#### Peer Dependencies:
- Flickity
- imagesLoaded

#### Development:
**Build** `npm run build`

**Watch** `npm run dev`

#### Assumptions!!!:

```
import Flickity from 'flickity';
import imagesloaded from 'imagesloaded';

window.Flickity = Flickity;
window.imagesloaded = imagesloaded;
```

so please run
`npm install --save flickity imagesloaded`

#### Add the styles

Add the CSS to your project, however you do it (SCSS, etc...)

* [flickity.2.0.5.css](./lib/flickity.2.0.5.css)


#### Usage:

```javascript
import React from 'react';
import FlickityComponent from 'react-flickity-component';

var flickityOptions = {
    initialIndex: 2
}

export default function TestComponent() {
    return (
        <FlickityComponent
            className={'carousel'}
            elementType={'span'}
            options={flickityOptions}
        >
            <div className="items">
                <img src="/images/placeholder.png"/>
            </div>
            <div className="items">
                <img src="/images/placeholder.png"/>
            </div>
            <div className="items">
                <img src="/images/placeholder.png"/>
            </div>
        </FlickityComponent>
    );
}

```

#### Credits

Forked from [theolampert/react-flickity-component](https://github.com/theolampert/react-flickity-component)


#### License Information:
Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license.
http://flickity.metafizzy.co/license.html