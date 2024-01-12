@smc
Feature: Bond Posting with case
    Scenario: Create Criminal Case
        #Precodition
        Given Criminal case not sentence not disposed
    #@focus
    Scenario: Posting a bond with party on a case
        #Precodition
        Given Use Case from previous scenario
        #Test steps
        Given Click on Bond Posting
        #Expected results
        Then Bond Posting tab opens
        #Test steps
        Given From the Financial Location Drop Down select Location X
        And In Case Search Block tick Case ID radio button
        And In My Case ID Search text box enter the case ID
        #Expected results
        Then Case should display in the Cases block
        #Test steps
        Given In Cases Block tick the check box for the case under Select Case
        And In Manage Bond Posting Block Bond Information subsection Select the Payor drop down and choose the defendants name
        #Expected results
        Then Defendant from the case should be listed in the drop down
        #Test steps
        Given In Party Name drop down select the defendants name
        #Expected results
        Then Defendant from the case should be listed in the drop down
        #Test steps
        Given In Manage Bond Posting Block Bond Amount subsection in Bond Amount Ordered Field enter 1000
        #Expected results
        Then The field Bond Amount to Post should go from blank to 1000
        And Bond Payments sub section Amount to Collect should be 1000
        #Test steps
        Given In Bond Percentage field enter 25
        #Expected results
        Then The field Bond Amount to Post should go from 1000 00 to 250 00
        And Bond Payments sub section Amount to Collect should be 250 00
        #Test steps
        Given In Manage Bond Posting block Bond Payment sub section Bond Pay type drop down select Check Bond 1401
        #Expected results
        Then Manage Bond Posting block Bond Payments sub section CK MO CC Identifier should should see a name change to Check Number and go from gray disabled to an active entry field
        #Test steps
        Given In Check Number enter 1001
        And In Amount Tendered enter 250
        And Click Save button
        #Expected results
        Then Manage Bond Posting Block Bond ID Should populate with the ID of the Bond just Saved
        And Receipt Number should populate with the recipt number of the payment for the bond just posted
