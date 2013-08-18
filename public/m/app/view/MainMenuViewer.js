Ext.define('BillsApp.view.MainMenuViewer', {
    extend: 'Ext.ux.slidenavigation.View',
    xtype:  'mainMenuView',
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom',
        'Ext.TitleBar',
    ],
    
    config: {
        
        fullscreen:     true,
        id:             'MainMenuPanel',
        cls:            'menu',
        
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        //slideSelector: 'x-toolbar',
        slideSelector: 'x-toolbar',
        
        /**
         *  Container must be dragged 10 pixels horizontally before allowing
         *  the underlying container to actually be dragged.
         *
         *  @since 0.2.2
         */
        containerSlideDelay: 10,
        
        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,

        /**
         *  Enable content masking when container is open.
         *
         *  @since 0.2.0
         */
        itemMask: true,
        
        /**
         *  Change this to 'right' to dock the navigation list to the right.
         */
        listPosition: 'left',

        layout:{
            pack:   'left'
        },
        
        /**
         *  Define the default slide button config.  Any item that has
         *  a `slideButton` value that is either `true` or a button config
         *  will use these values at the default.
         */
        slideButtonDefaults: {
            selector:   'toolbar',
            docked:     'left',
            ui:         'confirm-round'
        },
        
        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 300,
            width: 200,            
            
            items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    ui: 'light',                    
                    title: {
                        title: 'תפריט',
                        centered: true,
                        width: 200,                       
                    },
                
                /**
                 *  Here's an example of how to add a different type of
                 *  component into the toolbar of the list.
                 */
                
                /*items: [{
                    docked: 'top',
                    xtype: 'searchfield',
                    placeHolder: 'חפש',
                    width: 180
                }]*/                
                }
            ]            
        }, 
        /**
         *  Example of how to re-order the groups.
         */
        groups: {
            'Group 1': 1,
            'Group 2': 2
        },
        
        /**
         *  These are the default values to apply to the items within the
         *  container.
         */
        defaults: {
            style: 'background: #fff',
            xtype: 'container'
        },
        
        items: [
        {
            title: 'חשבוניות',
            group: 'קבוצה 1',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            items: [
            {
                xtype: 'billsView',                

                // Mask this item when the container is opened
                maskOnOpen: true
            }
           ]
        },
        {
            title: 'התחברות למערכת',
            group: 'קבוצה 1',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            items: [
            {
                xtype: 'toolbar',
                docked: 'top'
            },
            {
                xtype: 'panel',                

                // Mask this item when the container is opened
                maskOnOpen: true
            }
           ]
        },        
        {
            title: 'בית',
            group: 'קבוצה 2',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            items: [
            {
                xtype: 'toolbar',
                docked: 'top'
            },
            {
                xtype: 'homeView',    

                // Mask this item when the container is opened
                maskOnOpen: true
            }
           ]
        },
        {
            title: 'צור קשר',
            group: 'קבוצה 2',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            items: [
            {
                xtype: 'toolbar',
                title: 'Item 5',
                docked: 'top'
            },
            {
                xtype: 'contactView',                

                // Mask this item when the container is opened
                maskOnOpen: true
            }
           ]
        }
       ]
    }
});
