/**
 * $.dialogPrompt jquery plugin
 * Prompt the user for some input, get results
 * replacing javascripts original prompt(msg,defaultText), 
 * example: 
 * $.dialogPrompt('Enter your name: ', '', function(value){ ... });
 *
 * @see http://github.com/relipse/jquery-dialogPrompt
 * @version 0.975
 */
(function ($) {
    var dlg_counter = 1;
    
    var createDialog = function(title, msg, type, default_value, success, cancel, ok_text, cancel_txt, fixed, extra_html, modal){
      if (typeof(modal) == 'undefined'){
         modal = true;
      }
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
      if (typeof(type)=='object' && type.type == 'select' && type.options && type.options.length > 0){
        var size = type.size || 1;
        s += '<select id="'+ipt_id+'" size="'+size+'" style="width: 100%" class="text ui-widget-content ui-corner-all">';
        for(var i = 0; i < type.options.length; ++i){
            s += '<option value="'+$('<div/>').text(type.options[i].value).html()+'" title="'+$('<div/>').text(type.options[i].text).html()+'">'+$('<div/>').text(type.options[i].text).html()+'</option>';
        }
        s += '</select>';
      }else if (type == 'textarea'){
         s += '<textarea id="'+ipt_id+'" style="width: 100%; height: 200px" class="text ui-widget-content ui-corner-all">'+( default_value != '' ? $('<div/>').text(default_value).html() : '' )+'</textarea>';
      
      }else if (type == 'none'){
         //do nothing
      }else{
         s += ' <input id="'+ipt_id+'" type="'+type+'" value="'+( default_value != '' ? $('<div/>').text(default_value).html() : '' )+'"  class="text ui-widget-content ui-corner-all" />';
      }
      if (msg){
         s += '</label>';
      }
      if (extra_html){
        s += extra_html;
      }
      s += '</form></div>';
      $(document.body).append(s);
      var dlg$ = $('#'+dlg_id);
      var frm$ = $('#'+dlg_id + ' form');
      
      var dlg_buttons = {};
      var ok_function = function(){
         //close dialog unless user returns false
         var result = success.apply(frm$.get(0), [$('#'+ipt_id).val(), {dlg:dlg$,frm:frm$,ipt:$('#'+ipt_id)}]);
         if (result !== false){
             $('#'+dlg_id).dialog('close');
         }
      }
      
      dlg_buttons[ok_text] = ok_function;
      dlg_buttons[cancel_text] = function(){
        //close dialog unless user returns false
        var result = cancel.apply(frm$.get(0), [$('#'+ipt_id).val(), {dlg:dlg$,frm:frm$,ipt:$('#'+ipt_id)}]);
        if (result !== false){
             $('#'+dlg_id).dialog('close');
        }          
      }
      
      
      
      
      //transform form submission into OK click
      frm$.submit(function(){
          dlg_buttons[ok_text](); 
          return false;
      });
      
      dlg$.dialog({
        autoOpen: true,
        modal: modal,
        buttons: dlg_buttons,
        close: function(){
            setTimeout( function(){ dlg$.dialog('destroy').remove(); }, 1);
        },
        dialogClass:'dialogPrompt'
      });
      
      if (fixed){
         dlg$.parent('.dialogPrompt.ui-dialog').css({position:"fixed"});
         //$('#'+dlg_id+'.dialogPrompt.ui-dialog').css({position:"fixed"});
      }
      
      //hide the title bar if no title
      if (!title){
          $('.ui-dialog-titlebar', dlg$.parent()).css({ display:'none' });
      }
      
      
      return {dlg:dlg$, ipt: $('#'+ipt_id), counter: counter};
    }
    
    /** 
     * Create a new prompt jQuery UI dialog
     * @param string|object  - msg string or options object
     * @param string|undefined - if param 1 is msg string, this should be default value
     * @param string|undefined - if param 1 is msg string, this should be success callback
     * @param string|undefined - if param 1 is msg string, this can be the title, "Prompt" by default
     */
    jQuery.dialogPrompt = function(opts, default_value, success, title){
       
       if (typeof(opts) == 'string'){
          var msg = opts;
          opts = {};
          opts.msg = msg;
          opts.default_value = default_value || '';
          opts.success = success;
          opts.title = title;
          opts.fixed = true;
       }
       opts = opts || {};
       if (typeof(opts.fixed) == 'undefined'){
           opts.fixed = true;
       }
       var existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       
       //find non-existing dialog
       while (existing_dlg$.length > 0){
          dlg_counter++;
          existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       }
       //dlg_counter does not exist, lets create it!
       return createDialog(opts.title, opts.msg, opts.type, opts.default_value, opts.success, opts.cancel, opts.ok_text, opts.cancel_txt, opts.fixed, opts.extra_html, opts.modal);   
    }
})(jQuery);
