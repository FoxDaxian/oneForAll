# `img-onerror`

> handle image tag error enent.

## Usage

```javascript
// main file
const imgOnerror = require('ofa-img-onerror');
// or
// import imgOnerror from 'ofa-img-onerror';


Vue.use(imgOnerror);

// business files

<img
    src="/error.png"
    v-imgOnerror="
        'https://raw.githubusercontent.com/FoxDaxian/FoxDaxian.github.io/master/assets/picgo/20191201163946.jpg'
    "
    alt="alt"
/>

```

### success demo

> like this below, img-onerror will add classname `imgOnerror`

![](https://raw.githubusercontent.com/FoxDaxian/FoxDaxian.github.io/master/assets/picgo/20191204103849.png)


### error demo

> like this below, img-onerror will add classname `imgOnerror-error`

![](https://raw.githubusercontent.com/FoxDaxian/FoxDaxian.github.io/master/assets/picgo/20191204104334.png)



> For to meet different business, you can custom style use different classname