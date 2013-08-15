Ext.define('BillsApp.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'homeView',

    config: {
        tabBarPosition: 'bottom',
        title: 'בית',
        iconCls: 'home',
        cls: 'home',        
        styleHtmlContent: true,
        scrollable: true
        /*html: [
            '<img src="http://staging.sencha.com/img/sencha.png" />',
            '<h1>Welcome to Sencha Touch</h1>',
            "<p>You're creating the Getting Started app. This demonstrates how ",
            "to use tabs, lists and forms to create a simple app</p>",
            '<h2>Sencha Touch (2.0.0)</h2>'
        ].join("")*/
    }    
});
