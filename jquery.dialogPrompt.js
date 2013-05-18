/**
 * $.dialogPrompt jquery plugin
 * Prompt the user for some input, get results
 * replacing javascripts original prompt(msg,defaultText), 
 * example: 
 * $.dialogPrompt('Enter your name: ', '', function(value){ ... });
 *
 * @version 0.9
 */
(function ($) {
    var dlg_counter = 1;
    
    var createDialog = function(title, msg, type, default_value, success, cancel, ok_text, cancel_txt){
      title = title || 'Enter a value';
      msg = msg || '';
      type = type || 'text';
      default_value = default_value || '';
      success = success || function(){};
      cancel = cancel || function(){};
      ok_text = ok_text || 'Ok';
      cancel_text = cancel_txt || 'Cancel';
      var counter = dlg_counter;
      var dlg_id = 'dlgPrompt_'+counter;
      var ipt_id = dlg_id + '_ipt';
      
      var s = '<div id="dlgPrompt_'+counter+'" title="'+title+'"><form>';
      if (msg){
         s += '<label>'+msg; 
      }
      s += ' <input id="'+ipt_id+'" type="'+type+'" value="'+( default_value != '' ? $('<div/>').text(default_value).html() : '' )+'"  class="text ui-widget-content ui-corner-all" />';
      if (msg){
         s += '</label>';
      }
      s += '</form></div>';
      $(document.body).append(s);
      
      var dlg_buttons = {};
      var ok_function = function(){
         //close dialog unless user returns false
         if (success($('#'+ipt_id).val()) !== false){
             $('#'+dlg_id).dialog('close');
         }
      }
      
      dlg_buttons[ok_text] = ok_function;
      dlg_buttons[cancel_text] = function(){
        //close dialog unless user returns false
        if (typeof(cancel) != 'function' || cancel(true, $('#'+ipt_id).val()) !== false){
             $('#'+dlg_id).dialog('close');
         }          
      }
      
      
      var dlg$ = $('#'+dlg_id);
      var frm$ = $('#'+dlg_id + ' form');
      
      //transform form submission into OK click
      frm$.submit(function(){
          dlg_buttons[ok_text](); 
          return false;
      });
      
      dlg$.dialog({
        autoOpen: true,
        modal: true,
        buttons: dlg_buttons,
        close: function(){
            setTimeout( function(){ dlg$.dialog('destroy').remove(); }, 1);
        }
      });
      
      return {dlg:dlg$, ipt: $('#'+ipt_id), counter: counter};
    }
    
    /** 
     * Create a new prompt jQuery UI dialog
     * @param string|object  - msg string or options object
     * @param string|undefined - if param 1 is msg string, this should be default value
     * @param string|undefined - if param 1 is msg string, this should be success callback
     */
    jQuery.dialogPrompt = function(opts, default_value, success){
       
       if (typeof(opts) == 'string'){
          var msg = opts;
          opts = {};
          opts.msg = msg;
          opts.default_value = default_value || '';
          opts.success = success;
       }
       opts = opts || {title:'Prompt',msg:false, type:'text',default_value:''};
       var existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       
       //find non-existing dialog
       while (existing_dlg$.length > 0){
          dlg_counter++;
          existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       }
       //dlg_counter does not exist, lets create it!
       return createDialog(opts.title, opts.msg, opts.type, opts.default_value, opts.success, opts.cancel, opts.ok_text, opts.cancel_txt);   
    }
})(jQuery);
