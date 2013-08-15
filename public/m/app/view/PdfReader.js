Ext.define('BillsApp.view.PdfReader', {
    extend: 'Ext.ux.panel.PDF',   
    xtype: 'PdfReader',
    /*requires: [
        'Ext.ux.panel.PDF'
    ], */
    config: {
                     
        fullscreen:         true,        
        // Make it modal so you can click the mask to hide the overlay
        modal:              true,
        hideOnMaskTap:      true,
        floating:           true,
        
        //src       : './pdf/abc.pdf',
        //src       : 'http://bbxdev.eu01.aws.af.cm/download/' + record.get('file'), 

        // Style the content and make it scrollable
        styleHtmlContent:   true,
        scrollable:         true,
        
        // Set the width and height of the panel
        width: '100%',
        height: '100%',
        //centered: true,
        
        style     : {
            backgroundColor: '#333'
        },
        
        // Insert a title docked at the top with a title
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                ui: "light",                                
                title: ' ( ' + Ext.util.Format.date(record.get('start'), 'd/m/y') +
                       ' ) ' +  record.get('company'),
                items: [
                    {
                        xtype:  'button',
                        ui:     'action',
                        text:   'סגור',
                        handler:    function() {
                            overlay.hide(); // to close this popup window.
                            overlay = null;
                            Ext.get('searchBar').show();
                            Ext.get('HeaderBar').show();
                            //this.getTabBar().show(); 
                        }
                    }
                ]
            }
        ]
    }
});