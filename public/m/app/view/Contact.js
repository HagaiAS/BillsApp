Ext.define('BillsApp.view.Contact', {
    extend: 'Ext.form.Panel',
    xtype: 'contactView',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email'
    ],    
    
    config: {
        tabBarPosition: 'bottom',
        title: 'צור קשר',
        iconCls: 'compose',
        cls: 'contact',        
        styleHtmlContent: true,
        scrollable: true,
        url: 'contact.php',
        
        // Set the width and height of the panel
        //width: '80%',
        //height: '80%',
        
        
        items: [
            {
                xtype: 'fieldset',
                title: 'צור קשר',
                instructions: '(אנא מלא את כל השדות על מנת לצור עמנו קשר)',
                
                
                items: [
                    {
                        xtape: 'textfield',
                        name: 'name',
                        label: 'שם'
                    },
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: 'דואר אלקטרוני'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'message',
                        label: 'הודעה'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'שלח',
                ui: 'confirm',
                handler: function() {
                    this.up("contactView").submit();
                }
            }
        ]
    }    
});
