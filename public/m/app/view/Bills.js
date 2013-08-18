Ext.define('BillsApp.view.Bills', {
    extend: 'Ext.NavigationView',
    alternateClassName: ['BillsDataView'],
    xtype: 'billsView',
    requires: [
        'Ext.dataview.List',
        'Ext.data.proxy.JsonP',
        'Ext.ux.panel.PDF',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.field.Search',
        'Ext.picker.Date',       
    ], 
    
    config: {        
        tabBarPosition:     'bottom',
        title:              'חשבוניות',        
        iconCls:            'star',
        cls:                'bills',        
        styleHtmlContent:   true,
        //scrollable: true,
        variableHeights:    true,
        //infinite: true,

        navigationBar: {
            hidden: true
        },        
                
        items: [            
            {
                xtype:          'datepicker',
                id:             'picker',
                useTitles:      true,                
                hidden:         true,
                doneButton:     false,
                cancelButton:   false,
                yearFrom:       2013,
                monthText:      'חודש',
                dayText:        'יום',    
                yearText:       'שנה',
                //value:          new Date(),
                slotOrder:      ['day', 'month', 'year'],
              

                // specify the toolbar configuration and give it a items config
                toolbar: {
                    xtype:  'toolbar',
                    title:  'סנן לפי תאריך',
                    items: [
                        /*{
                            text:       'היום',
                            scope:      this,
                            docked:     'right',
                            ui:         'action',
                            handler: function() {
                                Ext.get('picker').setValue(new Date());
                            }
                        },      
                        {
                            xtype: 'spacer' 
                        },  */      
                        {
                            //text:       'בחר',
                            iconCls:    'action',
                            ui:         'confirm-round',
                            scope:      this,
                            docked:     'right',
                            handler: function() {
                                Ext.get('picker').hide();
                            }
                        }
                    ]
                }  
            },
            {
                xtype:      'toolbar',
                docked:     'top',
                items: [
                    {
                        xtype:      'button',
                        ui:         'confirm-round',                       
                        icon:       './resources/icons/date.png',                        
                        flex:       1,
                        docked:     'right',
                        scope:      this,
                        handler: function() {
                            // When you tap this button, show the picker.
                            Ext.get('picker').show();
                        }
                    },
                    /*{
                        iconCls:    'more',
                        docked:     'right',
                        ui:         'action',
                        scope:      this,
                        handler: function() {
                            Ext.get('MyMainMenu').toggle();
					   }
                    },*/
                    {
                        xtype:          'searchfield',
                        placeHolder:    'חיפוש',
                        autoComplete:   'true',
                        clearIcon:      'true',
                        flex: 10,
                        itemId:         'searchBills',
    
                        listeners: {
                            scope: this,
                            clearicontap: function() {
                                //call the clearFilter method on the store instance
                                Ext.getStore('MyStoreItems').clearFilter();
                            },
                            
                            keyup: function(searchField) {
                              queryString = searchField.getValue();
                              console.log(this,'Please search by: ' + queryString);
                             
                              var store = Ext.getStore('MyStoreItems');
                              store.clearFilter();
                             
                              if(queryString){
                               var thisRegEx = new RegExp(queryString, "i");
                               store.filterBy(function(record) {
                                if (thisRegEx.test(record.get('company')) ||
                                    thisRegEx.test(record.get('start'))) {
                                 return true;
                                };
                                return false;
                               });
                              }                           
                            }
                        }    
                    }
                ]
            },
            {
                xtype:          'list',  
                store:          'MyStoreItems',
                loadingText:    "... טוען חשבוניות ",
	            emptyText:      '</pre><div class="list-empty-text">רשימת החשבוניות שלך ריקה</div><pre>',
                grouped:        true,               
                itemHeight:     75,
                
                plugins: [
                    { 
                        xclass: 'Ext.plugin.ListPaging',
                        autoPaging: true,
                        
                        // These override the text; use CSS for styling
                        loadMoreText: '...טען חשבוניות נוספות',
                        noMoreRecordsText: 'אין עוד חשבוניות נוספות'
                    },
                    { 
                        xclass: 'Ext.plugin.PullRefresh'                                                
                    }
                ],
                
                itemTpl:[
                    '<div class="logo" style="background-image:url(/{logo});"></div>' +                    
                    '<span class="smaller"><b><center>{company}</center><b></span>'                    
                ].join(''), 
                onItemDisclosure: true,
                
                listeners: {
                    itemdoubletap: function (list, idx, target, record, evt) {
                    /*onItemDisclosure: function(record, btn, index) { */
                    //Ext.Viewport.removeAll();
                    var me = this;
                    me.hide();
                    console.log('http://bbxdev.eu01.aws.af.cm/download/' + record.get('file'));
                    //this.getParent().getNavigationBar().setHidden(false);    
                    var PdfReaderContainer = this.up().push( {
                         fullscreen: true,
                         items: [
                         {            
                            xtype:              'pdfpanel',                         
                            fullscreen:         true,                        
                            
                            // Make it modal so you can click the mask to hide the overlay
                            modal:              true,
                            hideOnMaskTap:      true,
                            //floating:           true,
                            loadingMessage:     'החשבונית נטענת',
                            //src:                '/download/' + record.get('file'),
                            //src :               './pdf/abc.pdf',
                            src:                'http://bbxdev.eu01.aws.af.cm/download/' + record.get('file'),
                            
                            //src:                window.location.hostname + '/download/' + record.get('file'), 
                            styleHtmlContent:   true,
                            scrollable:         true,
                            width:              '100%',
                            height:             '100%',
                             
                            style : {
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
                                            xtype:          'button',
                                            ui:             'back',
                                            iconCls:        'arrow_left',
                                            docked:         'left',
                                            listeners:    [
                                                {
                                                event: 'tap',
                                                
                                                fn: function () {
                                                    PdfReaderContainer.hide();
                                                    me.show();    
                                                        //Ext.Viewport.removeAll();
                                                        //Ext.Viewport.add(Ext.create('BillsApp.view.Main'));
                                                        //Ext.Viewport.add(Ext.create('BillsApp.view.MainMenuViewer'));
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype:          'button',
                                            ui:             'confirm-round',
                                            iconCls:        'action',
                                            docked:         'right',
                                            listeners:    [
                                                {
                                                event: 'tap',
                                                
                                                fn: function () {
                                                        PdfReaderContainer.hide();
                                                        me.show();  
                                                    }
                                                }
                                            ]
                                        }                                    
                                    ]
                                }
                            ]
                        }
                       ]
                       });
                    }
                  /*PdfReaderContainer.getParent().getNavigationBar().setTitle(' ( ' +
                        Ext.util.Format.date(record.get('start'), 'd/m/y') +
                        ' ) ' +  record.get('company'));
                    Ext.Viewport.add(PdfReaderContainer);*/
                }
            }
        ],
        /*pop: function() {
            this.getNavigationBar().setHidden(true);
        }*/
    }    
});


