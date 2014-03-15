# Menu Consume

### Description:
This is a jQuery plugin to move overflowing menu items into a dropdown to keep the menu from looking broken and users still able to use your main menu. This plugin is great for CMS' such as Drupal and Wordpress because it allows a site owner to place as many menu items as they want without breaking the header region of their site.

### Demo:
A demo of this plugin working can be found on my Codepen [HERE](http://cdpn.io/mBdCL). Be sure and resize the page to see it in action.

### Getting Started:
Getting started is as simple as calling the plugin like this.

```
$('.menu').menuConsume();
```
For passing in overrides suchs as a different breakpoint for mobile or giving the dropdown list item a custom class it can be done like this.

```
$('.menu').menuConsume({
  breakPoint: '767',
  dropDownClass: '.menu__item.menuConsume-more',
});

```
For more information on different overrides that can be passed into Menu Consume look in the overrides section. 

### Overrides:
##### Defaults:
```
breakPoint: '768',
horizontalOffsets: '',
dropDownClass: '.main-nav__menu-item.menuConsume-more',
menuItemText: 'More'
```

##### Breakpoint: 
If the browser goes below this point all menu items are moved out of the dropdown and those items are then able to respond to any other mobile plugins or styles. If you would like to disable this feature override this value with 0.

##### horizontalOffset: 
This accepts an array of class names. The classnames that are passed into here will have there widths added up. If the width of the horizontalOffsets and the menu are greater than the header/menu wrapper items will be moved into the more dropdown. If the width of the horizontalOffsets and the menu are less than the header/menu items will be moved out of the more dropdown.

##### dropDownClass: 
This is the class(s) that are applied to the dropdown list item. If multiple classes are needed do not add spaces. 

##### menuItemText: 
By default the menu item that over items are placed in is 'More'. This is overidable by passing in a different string.

### Triggers
After the plugin runs it fires off an event trigger to allow other plugin to tie into it and fire other events. The trigger is done after window resize and uses timeouts to prevent rapid firing and help keep browser performance intact. 

### Notes
Be sure that your menu list is a fluid width otherwise the plugin will think your menu still needs to shink and all of your menu items will be in the more dropdown.
