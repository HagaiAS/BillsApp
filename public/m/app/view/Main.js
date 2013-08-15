Ext.define('BillsApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [ 'Ext.TitleBar',
                'Ext.Img'],
    
    config: {
        tabBarPosition:     'bottom',
        fullscreen:         true,
        cls:                'main',
        id:                 'tabPanel',
        hideOnMaskTap:      true,
        items: [
            /*{
                xtype:      'titlebar',                
                docked:     'top',
                id:         'HeaderBar',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [ 
                {
                    xtype: 'image',
                    width:  160,
                    height: 45,
                    src:'./resources/images/logo.png'
                }],                    
            },*/
            /*{
                xtype: 'loginView'
            },*/
            {
                xtype: 'billsView'                
            },
            {
                xtype: 'homeView'
            },
            {
                xtype: 'contactView'
            }
        ]
    }
});


