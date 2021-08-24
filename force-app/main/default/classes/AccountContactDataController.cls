public with sharing class AccountContactDataController {
    public AccountContactDataController() {

    }
        //Get Account Records
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(){
        try {
            List<Account> listAcc = [select Id, Name from Account LIMIT 5];
            System.debug('listAcc :: '+listAcc);
            return listAcc;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
        //Get Contacts of specified Account
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRecords(String accountId){
        try {
            List<Contact> listCon = [select Id, FirstNAme, LastName from Contact where AccountId =: accountId];
            System.debug('listCon :: '+listCon);
            return listCon;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<OptionWrapper> getAccountRecordsForCombo(){
       List<OptionWrapper> accList = new List<OptionWrapper>();
       for(Account acc :[SELECT Id, Name FROM Account LIMIT 5]){
        accList.add(new OptionWrapper(acc.Name, acc.Id));
       }
       System.debug(accList);
       return accList;
    }

    public class OptionWrapper {
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String value {get; set;}

        public OptionWrapper(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}
