@smc
Feature: Add Docket Entry Select List
    Scenario: Verify if a single Docket code can be applied to mulitple case through Select list process
        #Precodition
        Given Two are more criminal cases are needed and both the cases should be saved in a list
        #Test steps
        Given Select a list to under the Select column
        #Expected results
        Then The select checkbox should be active for that list
        #Test steps
        Given Select Add Docket Entry from the dropdown
        #Expected results
        Then Add Docket Entry should be displaying in the dropdown list and a table should generate
        #Test steps
        Given Verify that blue noty is displayed
        #Expected results
        Then A blue noty should display along with a tablesorter
        #Test steps
        Given Verify the tablesorter column Names
        And Click on Select All checkbox
        #Expected results
        Then All Case Id which are eligible should have their checkboxes checked
        #Test steps
        Given Verify that Case ID that are not eligible for the additon of a docket code has a message displaying in the message field
        #Expected results
        Then The message field should a message regarding a reason
        #Test steps
        Given Click on Add Docket Information button
        #Expected results
        Then The Add Docket window should display as a popup
        #Test steps
        Given Enter the Docket Description and press enter
        #Expected results
        Then The Docket Code should display in the Docket Description field and the additonal Docket Data collapsible tab will with a field called Amount of Bond set
        #Test steps
        Given Enter the additonal docket data in Unsecured Bond Amount
        #Expected results
        Then Both Search Docket Predefined and Unsecured bond amount will display the value
        #Test steps
        Given Enter a Filing Party in Filing Party field
        #Expected results
        Then The Filing Party will display in the Filing party field
        #Test steps
        Given Drag and Drop a file into the Drag Drop files Here
        #Expected results
        Then A file should attach PDF
        #Test steps
        Given Click on Scan button
        #Expected results
        Then The scanning feature should open
        #Test steps
        Given Verify the Time field is displaying the correct time
        #Expected results
        Then The time should be displayed in HHMMSSS format
        #Test steps
        Given Verify if the Docket Date is displaying the correct date
        #Expected results
        Then The date should be in MM DD YYYY format
        #Test steps
        Given Click on Save and Apply to All
        #Expected results
        Then A green noty will appear an stating the case ID and the Docket Code added to them
        #Test steps
        Given Click on X on the top right corner
        #Expected results
        Then The window should close
