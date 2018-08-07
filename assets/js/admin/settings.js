(function () {
  'use strict';

  (function ($, plugin) {

    var settings = window._awebookingSettings || {};

    /**
     * Handle leaving using window.onbeforeunload.
     *
     * @return {void}
     */
    function handleLeaving() {
      var changed = false;

      // Set the changed if any controls fire change.
      $('input, textarea, select').on('change', function () {
        changed = true;
      });

      $('.awebooking-settings').on('click', '.nav-tab-wrapper a', function () {
        if (changed) {
          window.onbeforeunload = function () {
            return settings.i18n.nav_warning;
          };
        } else {
          window.onbeforeunload = null;
        }
      }).on('click', '.submit button', function () {
        window.onbeforeunload = null;
      });
    }

    /**
     * Init the datepicker.
     *
     * @return {void}
     */
    function initDatepicker() {
      $('#display_datepicker_disabledates').flatpickr({
        mode: 'multiple',
        dateFormat: 'Y-m-d'
      });
    }

    /**
     * Setup input table bindings.
     *
     * @return {void}
     */
    function setupInputTable() {
      var $table = $('.awebooking-input-table');

      var shifted = void 0,
          controlled = void 0,
          hasFocus = void 0;
      shifted = controlled = hasFocus = false;

      $(document).bind('keyup keydown', function (e) {
        shifted = e.shiftKey;
        controlled = e.ctrlKey || e.metaKey;
      });

      var handleClickInputTable = function handleClickInputTable(el, e) {
        var $elRow = $(el).closest('tr');
        var $elTable = $(el).closest('table, tbody');

        if (e.type === 'focus' && hasFocus !== $elRow.index() || e.type === 'click' && $(el).is(':focus')) {
          hasFocus = $elRow.index();

          if (!shifted && !controlled) {
            $('tr', $elTable).removeClass('current').removeClass('last-selected');
            $elRow.addClass('current').addClass('last-selected');
          } else if (shifted) {
            $('tr', $elTable).removeClass('current');
            $elRow.addClass('selected-now').addClass('current');

            if ($('tr.last-selected', $elTable).length > 0) {
              if ($elRow.index() > $('tr.last-selected', $elTable).index()) {
                $('tr', $elTable).slice($('tr.last-selected', $elTable).index(), $elRow.index()).addClass('current');
              } else {
                $('tr', $elTable).slice($elRow.index(), $('tr.last-selected', $elTable).index() + 1).addClass('current');
              }
            }

            $('tr', $elTable).removeClass('last-selected');
            $elRow.addClass('last-selected');
          } else {
            $('tr', $elTable).removeClass('last-selected');
            if (controlled && $(el).closest('tr').is('.current')) {
              $elRow.removeClass('current');
            } else {
              $elRow.addClass('current').addClass('last-selected');
            }
          }

          $('tr', $elTable).removeClass('selected-now');
        }
      };

      var handleRemoveRows = function handleRemoveRows(el, e) {
        var $tbody = $(el).closest('table').find('tbody');

        if ($tbody.find('tr.current').length > 0) {
          var $current = $tbody.find('tr.current');

          $current.each(function () {
            $(this).remove();
          });
        }
      };

      $table.on('blur', 'input', function () {
        hasFocus = false;
      }).on('focus click', 'input', function (e) {
        handleClickInputTable(this, e);
      }).on('click', '.remove_rows', function (e) {
        e.preventDefault();
        handleRemoveRows(this, e);
      });
    }
    /*$('.wc_input_table.sortable tbody').sortable({
      items: 'tr',
      cursor: 'move',
      axis: 'y',
      scrollSensitivity: 40,
      forcePlaceholderSize: true,
      helper: 'clone',
      opacity: 0.65,
      placeholder: 'wc-metabox-sortable-placeholder',
      start: function (event, ui) {
        ui.item.css('background-color', '#f6f6f6');
      },
      stop: function (event, ui) {
        ui.item.removeAttr('style');
      }
    });
     // Focus on inputs within the table if clicked instead of trying to sort.
    $('.wc_input_table.sortable tbody input').on('click', function () {
      $(this).focus();
    });*/


    /** Document ready */
    $(function () {
      handleLeaving();
      initDatepicker();

      setupInputTable();
      // setupInputTableSortable();
    });
  })(jQuery, window.awebooking);

}());

//# sourceMappingURL=settings.js.map