@smc @ignoreUAT @ignoreTRN
Feature: Docket Fees Assignment
    Scenario: CBS User adds a DETC Code to a Docket Code
        #Precodition
        Given User is a CBS Accounting employee with smc-accounting administration security role
        #Expected results
        Then All available court locations will appear in the Financial Location drop down list
        #Test steps
        Given User selects location
        #Expected results
        Then Docket Search area expands
        #Test steps
        Given Enter partial docket code with wild card symbol in the Docket Type field
        And Click the search icon
        #Expected results
        Then Docket Search area populates with search results
        And Description of the docket code appears
        And Status indicates whether a docket code filing updates the status of a case
        And Cont whether a docket code filing represents a court granted continuance of an event
        And Disp indicates whether a docket code filing represents a disposition
        And Activity Date indicates when this record was created or updated
        #Test steps
        Given Select a docket code from the list
        And Click the plus next to the selected docket code
        #Expected results
        Then Row expands to display the associated DETC Codes
        #Test steps
        Given Click the drop down icon in the Detail Type Field and select a new code
        #Expected results
        Then The new code and its details will display in Fees window The Total Fees For This Docket Type will update to reflect the new total Save button becomes enabled
        #Test steps
        Given Click the Save button in the Fees window
        #Expected results
        Then Green noty confirming success Fees window closes
    Scenario: CBS User removes a DETC Code from a Docket Code
        #Precodition
        Given User is a CBS Accounting employee with smc-accounting administration security role. Previous scenario adding a DETC code to a docket code is run
        #Expected results
        Then All available court locations will appear in the Financial Location drop down list
        #Test steps
        Given User selects location
        #Expected results
        Then Docket Search area expands
        #Test steps
        Given Enter partial docket code with wild card symbol in the Docket Type field
        And Click the search icon
        #Expected results
        Then Docket Search area populates with search results
        And Description of the docket code appears
        And Status indicates whether a docket code filing updates the status of a case
        And Cont whether a docket code filing represents a court granted continuance of an event
        And Disp indicates whether a docket code filing represents a disposition
        And Activity Date indicates when this record was created or updated
        #Test steps
        Given Select a docket code from the list
        And Click the plus next to the selected docket code
        #Expected results
        Then Row expands to display the associated DETC Codes
        #Test steps
        Given Click the trash can icon next to the DETC code that was added in the previous scenario
        #Expected results
        Then Pop up stating that this will remove the DETC code from the entire circuit asking the user if they wish to continue
        #Test steps
        Given Click yes on the pop up
        #Expected results
        Then DETC is removed from the Fees Window Total Fees For This Docket Code is updated to reflect the new total Save button becomes enabled
        #Test steps
        Given Click Save button in the Fees window
        #Expected results
        Then Green noty stating the removal was successful Fees window closes
