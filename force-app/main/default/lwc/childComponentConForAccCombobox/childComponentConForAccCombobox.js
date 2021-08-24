import getContactRecords from '@salesforce/apex/AccountContactDataController.getContactRecords';
import { api, LightningElement, track, wire } from 'lwc';

export default class ChildComponentConForAccCombobox extends LightningElement {
    @api
    accId;

    @track
    columns = [
        {label : 'Id', fieldName : 'Id'}, 
        {label : 'FirstName', fieldName : 'FirstName'},
        {label : 'LastName', fieldName : 'LastName'}
    ];

    @track
    conData;
    
    @track 
    errorConData;

    @wire(getContactRecords, {accountId : '$accId'})
    dataTableContact({data, error})
    {        
        if(data)
        {
            this.conData = data;                
        }            
        else if(error)
            this.errorConData = error;
    }
}