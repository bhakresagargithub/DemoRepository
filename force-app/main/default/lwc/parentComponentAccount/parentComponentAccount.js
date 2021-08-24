import { LightningElement, track, wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/AccountContactDataController.getAccountRecords';

export default class ParentComponentAccount extends LightningElement {
    @track
    columns = [
        {label : 'Id', fieldName : 'Id'}, 
        {label : 'Name', fieldName : 'Name'}
    ];
    
    @track
    accData;
    
    @track 
    errorAccData;
    
    accountId;

    @wire(getAccountRecords)
    dataTableAccount({data, error})
    {
        if(data)
            this.accData = data;
        else if(error)
            this.errorAccData = error;
    }

    handleRowSelection() {
        var selectedRecords =  
        this.template.querySelector("lightning-datatable").getSelectedRows();
        for (let index = 0; index < selectedRecords.length; index++) {
            const element = selectedRecords[index];            
            this.accountId = element.Id;
        }
       
  }
    
}