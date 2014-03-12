# Menu Consume

### Description:
This is a plugin to move overflowing menu items into a dropdown to keep the menu from looking broken and users still able to use your main menu. 

### Overrides:
#### Defaults:
```breakPoint: '768',
horizontalOffsets: '',
dropDownClass: '.main-nav__menu-item.menuConsume-more',```

#### Breakpoint: 
If the browser goes below this point all menu items are moved out of the dropdown and those items are then able to respond to any other mobile plugins or styles. If you would like to disable this feature override this value with 0.

#### horizontalOffset: 
This accepts an array of class names. The classnames that are passed into here will have there widths added up. If the width of the horizontalOffsets and the menu are greater than the header/menu wrapper items will be moved into the more dropdown. If the width of the horizontalOffsets and the menu are less than the header/menu items will be moved out of the more dropdown.

#### dropDownClass: 
this is the class(s) that are applied to the dropdown list item. If multiple classes are needed do not add spaces. 
