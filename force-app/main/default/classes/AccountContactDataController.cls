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
    
}
