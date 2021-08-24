import { LightningElement, track, wire } from 'lwc';
import getAccountRecordsForCombo from '@salesforce/apex/AccountContactDataController.getAccountRecordsForCombo';
import getAccountRecords from '@salesforce/apex/AccountContactDataController.getAccountRecords';
let i=0;
export default class ParentComponentAccCombobox extends LightningElement {
    accId = 'Not selected';
    
    @track accItems = []; //this holds the array for records with value & label

    @track value = '';  //this displays selected value of combo box
    @track 
    errorAccData;
    @wire(getAccountRecords)
    getAccList({data, error}){
        if (data) {           
           for(i=0; i<data.length; i++) {            
            this.accItems = [...this.accItems ,{value: data[i].Id , label: data[i].Name}];                                   
        }               
        } else {
            this.errorAccData = error;
        }
    }
    
    get options() {
        return this.accItems;
    }

    handleChange(event) {
        this.accId = event.detail.value;
    }
}