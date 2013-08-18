Ext.define('BillsApp.store.MyStoreItems', {
    extend:     'Ext.data.Store',
    requires: ['BillsApp.model.MyModelItem'],    
    config: {   
        model: 'BillsApp.model.MyModelItem',
        autoLoad: true,        
        storeId: "MyStoreItems",
        clearOnPageLoad: false,  // This is true by default
        pageSize: 5,
        sorters: [
            {
                property: 'start',
                direction: 'DESC'
            },
            {
                property: 'company',
                direction: 'DESC'
            }
        ],
        grouper: {           
            direction: "DESC",
            property: 'month'
        }
    }
});