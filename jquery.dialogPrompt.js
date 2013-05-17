/**
 * dialogPrompt jquery plugin
 * Prompt the user for some input, get results
 * //prompt(msg,defaultText)
 */
(function ($) {
    var dlg_counter = 1;
    
    var createDialog = function(title, msg, type, default_value, callback, ok_text, cancel_txt){
      ok_text = ok_text || 'Ok';
      cancel_text = cancel_txt || 'Cancel';
      var counter = dlg_counter;
      
      var s = '<div id="dlgPrompt_'+dlg_counter+'" title="'+title+'"><form>';
      if (msg){
         s += '<label>'+msg; 
      }
      s += ' <input type="'+type+'" name="dlgPrompt_ipt_'+dlg_counter+'" value="'+default_value+'" id="dlgPrompt_ipt_'+dlg_counter+'" class="text ui-widget-content ui-corner-all" />';
      if (msg){
         s += '</label>';
      }
      s += '</form></div>';
      $(body).append($(s));
      
      var dlg_buttons = {};
      dlg_buttons[ok_text] = function(){
         if (callback(true, $('dlgPrompt_ipt_'+counter) !== false){
             $(this).dialog('close');
         }
      }
      dlg_buttons[canc
      
      $("#dialog-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
        }
      });
    }
    
    
    jQuery.dialogPrompt = function(opts){
       opts = opts || {type:'text'};
       var existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       
       //find non-existing dialog
       while (existing_dlg$.length > 0){
          dlg_counter++;
          existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
          if (dlg_counter > 15){ return false; }
       }
       
    }
})(jQuery);
