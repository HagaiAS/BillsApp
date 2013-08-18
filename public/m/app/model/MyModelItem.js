var APIURL = '/api/calendarlist';

Ext.define('BillsApp.model.MyModelItem',{
    extend: 'Ext.data.Model',
    requires: 'Ext.DateExtras',
    config: {
        proxy: {            
            type:       'jsonp',
            //url:      "./api/calendarlist",
            pageParam:  'page', //This parameter needs to be modified
            url:        'http://bbxdev.eu01.aws.af.cm/api/calendarlist',
            //url:        "./json/test.json",
            reader:     'json'
        },
        idProperty: 'id',
        fields: [
            { 
                name: 'id',
                type: 'string' 
            },
            { 
                name: 'company',
                type: 'string' 
            },            
            { 
                name: 'start',                               
                type : 'date', 
                convert : function (value, record) {                   
                    var date = new Date(value * 1000);
                    return date;
                }                
            },
            {
                name: 'month',
                mapping: 'start',
                convert : function (start) {
                    var fullDate = new Date(start * 1000);
                    var newDate = Ext.util.Format.date(fullDate, 'm/y');
                    return newDate;
                }
            },
            {
                name: 'logo',
                type: 'string'
            },
            {
                name: 'file',
                type: 'string'
            }
        ]
        /*,
        
        changeDate: function() {
            var oldDate = this.get('start'),
            var newDate = Ext.util.Format.date(oldDate.toDateString(), 'm y');
            this.set('start', newDate);
        }*/
    }
})