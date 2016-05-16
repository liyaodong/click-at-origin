click-at-outside [![Npm Status](https://img.shields.io/npm/v/click-at-outside.svg)](https://www.npmjs.com/package/click-at-outside)
---------------
### WTF
Detect a click event was outside in a container.

eg: you have a dropmenu, and you want close itself when user click outside the `#dropmenu` dom container.

# Usage
`npm i click-at-outside --save`

```javascript
const cancle = clickAtOutside(
  element, // document.querySelctor || $('xxx').get(0)
  func, // when click is outside the element then do something
);

// if then event was outdate, you should cancel listen
cancle();
```

# Example
```html
<div id="dropmenu">
  <div id="avatar"></div>
  <ul class="menus">
    <li><a href="javascript:;">menu1</a></li>
    <li><a href="javascript:;">menu2</a></li>
    <li><a href="javascript:;">menu3</a></li>
  </ul>
</div>
```

```javascript
import { isMobileUA } from 'mdetect';
import clickAtOutside from 'click-at-outside';

const $dropmenu = document.querySelector('#dropmenu');
const $avatar = document.querySelector('#avatar');

$avatar.addEventListener('click', () => {
  $dropmenu.classList.add('active');
  if (isMobileUA()) document.body.style.cursor = 'pointer';
});

clickAtOutside(
  $dropmenu,
  () => $dropmenu.classList.remove('active')
);
```

#### Why not using pure CSS3 :hover for dropmenu?
Pure CSS3 dropmenu was very simple, but it won't close when you tap blank area(mobile device).

#### Why css('cursor', 'pointer') for body?
In mobile safari, click event usually won't bubbling to `document`.

Expect:

* The target element of the event is a link or a form field.
* The target element, or any of its ancestors up to but not including the <body>, has an explicit event handler set for any of the mouse events. This event handler may be an empty function.
* The target element, or any of its ancestors up to and including the document has a cursor: pointer CSS declarations.

[See More](http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html)
