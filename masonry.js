/**
 * @file
 * Masonry script.
 */

(function($) {

Drupal.behaviors.masonry = {
  attach: function(context, settings) {

    // Iterate through all Masonry instances
    $.each(Drupal.settings.masonry, function (container, settings) {
      // Set container
      var $container = $(container);

      // Set options
      var $options = new Object();
      if (settings.item_selector) {
        $options.itemSelector = settings.item_selector;
      }
      if (settings.column_width) {
        if (settings.column_width_units == 'px') {
          $options.columnWidth = settings.column_width;
        }
        else if (settings.column_width_units == '%') {
          $options.columnWidth = function (containerWidth) {
            return containerWidth * (settings.column_width / 100);
          };
        }
      }
      $options.gutterWidth = settings.gutter_width;
      $options.isResizable = settings.resizable;
      if (settings.resizable) {
        $options.isAnimated = settings.animated;
        if (settings.animated) {
          $options.animationOptions = {
            queue: false,
            duration: settings.animation_duration
          };
        }
      }
      $options.isFitWidth = settings.fit_width;
      $options.isRTL = settings.rtl;

      // Apply Masonry to container
      if (settings.images_first) {
        $container.imagesLoaded(function () {
          $container.masonry($options);
        });
      }
      else {
        $container.masonry($options);
      }
      //Add event listener for the Views Infinite Scroll change event being fired after
      //ajaxing content in, then wait for images or not to reload the masonry grid.
      if( typeof Drupal.settings.infinite_scroll  !== 'undefined'  &&  Drupal.settings.infinite_scroll !== null ){

        $container.on('change', function() {
          // Wait for images to load (if option is selected )then call reload
          if ( settings.images_first ) {

            $container.imagesLoaded(function () {
              $container.masonry('reload');
            });

          }

          // else continue as normal
          else {
            $container.masonry('reload');
          }

        });
      }
    });

  }
};

})(jQuery);

