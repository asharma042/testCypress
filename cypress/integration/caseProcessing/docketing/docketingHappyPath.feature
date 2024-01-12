@smc
Feature: Docketing
    Scenario: Create a Civil Case
        #Precodition
        Given Create Civil Case
    Scenario: Add Docket Entry
        #Test steps
        Given Click on Docketing from Case Processing
        And Select search by case id
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Enter Case ID in My Case ID Search
        #Expected results
        Then Case appears in results
        And Attorney is validated
        #Test steps
        Given Expand case row in table
        And Expand Add Docket Entry section
        And Enter Docket Description
        And Enter Docket Date
        #Expected results
        Then Docket Date entered
        #Test steps
        Given Enter Time
        And Select Filing Party
        #Expected results
        Then Filing Party entered
        #Test steps
        Given Select Filed On Behalf Of
        #Expected results
        Then FOBO entered
        #Test steps
        Given Enter docket text in Search Docket PreDefined Text field
        #Expected results
        Then Docket Text entered
        #Test steps
        Given Press Save Docket button
        And Select Save Docket option
    Scenario: Update Docket Entry
        #Test steps
        Given Click on Docketing from Case Processing
        And Select search by case id
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Enter Case ID in My Case ID Search
        #Expected results
        Then Case appears in results
        And Attorney is validated
        #Test steps
        Given Expand case row in table
        And Expand View Update Docket Entries section
        And Expand docket entry
        And Update Docket Text
        And Press Update Docket Entry button
    Scenario: Delete Docket Entry
        #Test steps
        Given Click on Docketing from Case Processing
        And Select search by case id
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Enter Case ID in My Case ID Search
        #Expected results
        Then Case appears in results
        And Attorney is validated
        #Test steps
        Given Expand case row in table
        And Expand View Update Docket Entries section
        And Expand docket entry
        And Press trash cash button
        And Enter Reason Description
        And Press Update Docket Entry button
