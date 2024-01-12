@smc
Feature: Input List Duplicate Attorney
    Scenario: User should not be able to add a duplicate attorney
        #Precodition
        Given Create Criminal Cases
        #Test steps
        Given Click on Case Processing Tab
        #Expected results
        Then The business process unit
        #Test steps
        Given Click on Process List
        #Expected results
        Then The submenu items
        #Test steps
        Given Select Input Case
        #Expected results
        Then Input Case Tab opens
        #Test steps
        Given Enter Case Id into the Enter Case Id field and press enter
        #Expected results
        Then Case Id should display in the field
        #Test steps
        Given Select Add Attorney from the process Now drop down button
        #Expected results
        Then Select List Verify Records To Process Table Displays both cases
        #Test steps
        Given Click Select All and Click Enter Attrorney Information
        #Expected results
        Then Add Attorney Dialog Box display
        #Test steps
        Given Change party description field to ADFT
        #Expected results
        Then APA should be displayed
        #Test steps
        Given Enter Attorney PIDM into the Attorney Search
        #Expected results
        Then The name of the attorney and the PIDM should be displaying
        #Test steps
        Given Backdate the start date in the start field
        #Expected results
        Then The start date should be backdated
        #Test steps
        Given Click on Save Apply to All
        #Expected results
        Then A green confirmation noty should appear and dialog window closes
        #Test steps
        Given Repeat Steps six to ten
        And Confirm that a table sorter column names
        #Expected results
        Then A table sorter should appear with specific columns
        #Test steps
        Given Verify if a message is being displayed
        #Expected results
        Then The case XXXXXX already have the party
        #Test steps
        Given Manually Close the Add Attorney Dialog Window
        And Select Yes on Progress in Add Attorney Entry Pop Up
        #Expected results
        Then Add Attorney Dialog Closes
        #Test steps
        Given Click No on Save the List Pop Up
