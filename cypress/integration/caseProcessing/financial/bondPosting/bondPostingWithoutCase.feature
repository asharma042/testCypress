@smc
Feature: Bond Posting without Case
    Scenario: Posting a bond with party NOT on a case
        #Test steps
        Given Click on Bond Posting
        #Expected results
        Then Bond Posting tab opens
        #Test steps
        Given From the Financial Location Drop Down select Location X
        And Manage Bond Posting block Bond Information sub block Payor dropdown click the search icon
        #Expected results
        Then Open My Payor Search Pop up box
        #Test steps
        Given In My Payor Search Pop Up box Enter Payor Information
        And Click the Add Close button
        #Expected results
        Then In Manage Bond Posting block Bond Information sub section Payor should now be populated with Person X
        #Test steps
        Given Payor and Party are the same tick the box
        #Expected results
        Then Party Name and Payor is the Same
        #Test steps
        Given In Manage Bond Posting Block Bond Amount subsection in Bond Amount Ordered Field enter amount
        #Expected results
        Then The field Bond Amount to Post should go from blank to 500 00
        And Bond Payments sub section Amount to Collect should be 500 00
        #Test steps
        Given In Bond Percentage field enter XXXX
        #Expected results
        Then The field Bond Amount to Post should go from 500 00 to 50 00
        And Bond Payments sub section Amount to Collect should be 50 00
        #Test steps
        Given In Manage Bond Posting block Bond Payment sub section Bond Pay type drop down select XXXX
        #Expected results
        Then Manage Bond Posting block Bond Payments sub section CK MO CC Identifier should see a name change to Money Order Number and go from gray disabled to an active entry field
        #Test steps
        Given In Money Order Number enter XXXX
        And In Amount Tendered enter XXXX
        And click the Add Additional Payment button
        #Expected results
        Then New row for entering a payment should be added
        #Test steps
        Given Bond Pay Type row 2 drop down select XXXX
        And Amount Tendered row 2 enter XXXX
        And Click Save button
        #Expected results
        Then Manage Bond Posting Block Bond ID Should populate with the ID of the Bond just Saved
        And Receipt Number should populate with the receipt number of the payment for the bond just posted
