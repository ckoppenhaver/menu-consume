/**
 * self: Targeted Menu
 * breakPoint: The point when the mobile menu is triggered (value in px)
 * horizontalOffsets: Other items in the navigation area that the menu needs to
 *  sit next to. This params accepts an array of the class/ID names
 * dropDownClass: The class name(s) of the More drop down that nav items are placed into
 */
(function ($) {
  $.fn.menuConsume = function(options) {

    //Default Options
    var settings = $.extend({
      self: $(this),
      breakPoint: '768',
      horizontalOffsets: '',
      dropDownClass: '.main-nav__menu-item.menuConsume-more',
    }, options);

    //Initialize the default variables
    //Width of the menu
    var menuWidth = $(settings.self).outerWidth(true);
    //Width of the header region
    var headerWidth = $(settings.self).parent().width();
    var wait;
    //Timer to prevent over running checking functions and keep CPU ussuage down
      //Check for if the browser is new enough that it would support media queries
      //If the browser does not the respond.js plugin takes a second to load up media queries and this plugin only sees the mobile version of the site
      //until the page is resized.

    //The width of settings.horizontalOffsets widths combined
    var offSetWidth = 0;

    //This fixes IE
    if($('html').hasClass('no-rgba')) {
          //Check for if the browser is new enough that it would support media queries
          //If the browser does not the respond.js plugin takes a second to load up media queries and this plugin only sees the mobile version of the site
          //until the page is resized.
          var wait = setTimeout(menuMore, 1000);
        } else {
          //For modern browsers
          var wait = setTimeout(menuMore, 100);
        }

    $(window).resize(function(){
      //We are preventing our functions from firing rapidly on the page reload.

        //Refreshing our menu Width
        menuWidth = settings.self.outerWidth(true);
        //Refreshing our header region width
        headerWidth = $(settings.self).parent().width();
        //Clear out our time to reset it
        clearTimeout(wait);
        if($(window).outerWidth(true) > settings.breakPoint) {
          if($('html').hasClass('no-rgba')) {
            wait = setTimeout(function(){
              menuMore();
            }, 1000);
          } else {
            wait = setTimeout(function(){
              menuMore();
            }, 500);
          }
        }else {
          if($(settings.dropDownClass)[0]) {
            menuMobileRelocate();
            $(settings.dropDownClass).css('visibility', 'visible');
          }
        }
    }).resize();

    function menuMore() {
      //Clear out the offSetWidth to recalculate the offset widths
      offSetWidth = 0;
      for(var t = 0; t < settings.horizontalOffsets.length; t++) {
        offSetWidth += $(settings.horizontalOffsets[t]).outerWidth(true);
      }
      if($(settings.dropDownClass).length === 0 && (menuWidth + offSetWidth) >= headerWidth) {
        //Check if our More drop down contains any items and if the menu width
        // of our menu plus offsets are wider than the header region
        $(settings.self).append('<li class="' + settings.dropDownClass.replace(/\./g,' ') + ' has-dropdown"><a href="#">More</a><ul></ul></li>');
        $(settings.dropDownClass + ' ul').css('position', 'absolute');
      }

      if ($(settings.dropDownClass).length !== 0 && $(window).outerWidth(true) < settings.breakPoint) {
        //We check to see if the browser is past the breakpoint for triggering the mobile
        //menu. If true we dump all menu items back into the main menu and remove the drop down
        menuMobileRelocate();
        $(settings.dropDownClass).css('visibility', 'visible');
      }
      else if((menuWidth + offSetWidth) >= headerWidth && $(settings.dropDownClass).length !== 0) {
        //The menu is to wide so we dump menu items into the drop down
        menuItemRemove();
        $(settings.dropDownClass).css('visibility', 'visible');
        jQuery(document).trigger('menu_consumed', true);
      }
      else if((menuWidth + offSetWidth) <= headerWidth && $(settings.dropDownClass).length !== 0) {
        //The menu is smaller so we try putting items back into the main menu
        menuItemAdd();
        $(settings.dropDownClass).css('visibility', 'visible');
        jQuery(document).trigger('menu_consumed', true);
      }
      if($(settings.dropDownClass + ' ul').children().length <= 0) {
        //If things are in order we remove the More dropdown
        $(settings.dropDownClass).remove();
        jQuery(document).trigger('menu_consumed', true);
      }

    }

    function menuMobileRelocate() {
      //Here the mobile menu has been triggered so we loop through and dump all
      // of the Menu More Items back into the main navigation
      var firstChild;
      while ($(settings.dropDownClass + ' ul').children().length > 0) {
        if($(settings.dropDownClass + ' ul').children().length >= 1){
          firstChild = $(settings.dropDownClass + ' ul').children()[0];
          $(settings.self).append($(firstChild));
          if($(settings.dropDownClass + ' ul').children().length === 0) {
            $(settings.dropDownClass).remove();
          }

        }else {
          $(settings.dropDownClass).remove();
          break;
        }
      }
    }

    function menuItemRemove() {
      //Here we are moving items from the targeted menu into the dropdown menu

      var children,
      lastChild,
      dropDownClasses,
      hasClass = false,
      bailOut = 0;

      $('.menuConsume-more > ul').css('visibility', 'visible');
      while ((menuWidth + offSetWidth) >= headerWidth && bailOut < 300) {
        bailOut++;
        children = $(settings.self).children();
        lastChild = children.length - 2;

        for(var i = (children.length - 1); i >= 0; i--) {
          dropDownClasses = settings.dropDownClass.split('.');

          //Loop through the classes placed on our drop down
          for(var h = 1; h < dropDownClasses.length; h++) {
            if($(children[i]).hasClass(dropDownClasses[h])) {
              hasClass = true;
            }else {
              hasClass = false;
              break;
            }
          }
          if($(children[i]).css('display') !== 'none' && hasClass !== true) {
            //If the children aren't hidden the browser locks up
            $(children[lastChild]).hide();
            $(settings.dropDownClass + ' > ul').prepend(children[i]);
            break;
          }
        }
        menuWidth = settings.self.outerWidth(true);
        headerWidth = $(settings.self).parent().width();
      }
      $('.menuConsume-more li').show();
    }

    function menuItemAdd() {
      //Here we are moving items from the dropdown menu back into the targeted menu
      var childCount;
      while ((menuWidth + offSetWidth) <= headerWidth && $(settings.dropDownClass + ' ul').children().length > 0) {
        if($(settings.dropDownClass + ' > ul').children().length >= 1){
          var firstChild = $(settings.dropDownClass + ' ul').children()[0];

          $(settings.self).append($(firstChild));
          childCount = $(settings.dropDownClass + ' > ul').children('li').length;
          if(childCount === 0) {
            $(settings.dropDownClass).remove();
          }
          menuWidth = settings.self.outerWidth(true);
          headerWidth = $(settings.self).parent().width();
          if((menuWidth + offSetWidth) >= headerWidth) {
            $(settings.dropDownClass + ' > ul').prepend($(firstChild));
            break;
          }
          else {
            $(settings.self).append($(settings.dropDownClass));
            menuWidth = settings.self.outerWidth(true);
            headerWidth = $(settings.self).parent().width();
            //Removes the More drop down
            if($(settings.dropDownClass + ' > ul').children().length === 0) {
              $(settings.dropDownClass).remove();
            }
          }
        }else {
          $(settings.dropDownClass).remove();
          menuWidth = settings.self.outerWidth(true);
          headerWidth = $(settings.self).parent().width();
          break;
        }
      }
    }
  }

}(jQuery));
