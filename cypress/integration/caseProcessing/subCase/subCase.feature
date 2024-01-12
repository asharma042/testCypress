@smc
Feature: SubCase
    Scenario: Create a Civil Case
        #Precodition
        Given Create Civil Case
    Scenario: Add Docket Entry
        #Precodition
        Given Add Docket Entry
    Scenario: Add Parties
        #Precodition
        Given Add Parties
    Scenario: Dispose case
        #Precodition
        Given Dispose parties
        And Dispose case
    Scenario: Create SubCase
        #Test steps
        Given Click on Subsequent Case from Case Processing
        And Select Case Id search radio button
        And Enter Case Id
        #Expected results
        Then Verify Case ID
        #Test steps
        Given Enter Case Type
        And Click Create Subcase
        #Expected results
        Then Copy Parties tab enabled
        #Test steps
        Given Select parties to copy over
        And Click Copy To Review List
        And Click Save Parties To Subcase
        #Expected results
        Then Copy Charges tab enabled
        #Test steps
        Given Click OK for No Charges window
        And Click on Dockets tab
        And Check docket entry to copy over
        And Click Save Dockets to Subcase
        And Click Yes in SubCase alert window
