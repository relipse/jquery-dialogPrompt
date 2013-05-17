/**
 * dialogPrompt jquery plugin
 * Prompt the user for some input, get results
 * //prompt(msg,defaultText)
 */
(function ($) {
    var dlg_counter = 1;
    
    var createDialog = function(title, msg, type, default_value, callback, ok_text, cancel_txt){
      title = title || 'Enter a value';
      msg = msg || '';
      type = type || 'text';
      default_value = default_value || '';
      ok_text = ok_text || 'Ok';
      cancel_text = cancel_txt || 'Cancel';
      var counter = dlg_counter;
      
      var s = '<div id="dlgPrompt_'+counter+'" title="'+title+'"><form>';
      if (msg){
         s += '<label>'+msg; 
      }
      s += ' <input type="'+type+'" name="dlgPrompt_ipt_'+counter+'" value="'+default_value+'" id="dlgPrompt_ipt_'+counter+'" class="text ui-widget-content ui-corner-all" />';
      if (msg){
         s += '</label>';
      }
      s += '</form></div>';
      $(document.body).append($(s));
      
      var dlg_buttons = {};
      dlg_buttons[ok_text] = function(){
         //close dialog unless user returns false
         if (typeof(callback) != 'function' || callback(true, $('dlgPrompt_ipt_'+counter)) !== false){
             $(this).dialog('close');
             //now free memory
             $('dlgPrompt_ipt_'+counter).dialog('destroy').remove();
         }
      }
      dlg_buttons[cancel_text] = function(){
        //close dialog unless user returns false
        if (typeof(callback) != 'function' || callback(true, $('dlgPrompt_ipt_'+counter)) !== false){
             $(this).dialog('close');
             //now free memory
             $('dlgPrompt_ipt_'+counter).dialog('destroy').remove();
         }          
      }
      
      var dlg$ = $('#dlgPrompt_'+counter);
      dlg$.dialog({
        autoOpen: true,
        modal: true,
        buttons: dlg_buttons
      });
      
      return {dlg:dlg$, ipt: $('dlgPrompt_ipt_'+counter), counter: counter};
    }
    
    
    jQuery.dialogPrompt = function(opts){
       opts = opts || {title:'Prompt',msg:false, type:'text',default_value:'',callback:function(ok){ alert(ok?'Ok clicked!':'Cancel clicked');}};
       var existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
       
       //find non-existing dialog
       while (existing_dlg$.length > 0){
          dlg_counter++;
          existing_dlg$ = $("#dlgPrompt_" + dlg_counter);
          if (dlg_counter > 15){ return false; }
       }
       //dlg_counter does not exist, lets create it!
       return createDialog(opts.title, opts.msg, opts.type, opts.default_value, opts.callback, opts.ok_text, opts.cancel_txt);   
    }
})(jQuery);
