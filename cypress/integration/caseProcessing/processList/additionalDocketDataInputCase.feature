@smc
Feature: Additional Docket Data Input Case
    Scenario: Verify if Additonal Docket Data is being generated when applied
        #Precodition
        Given More than M cases that have a DCOV code Added to them
        #Test steps
        Given Enter Case Ids under Enter Case Id column in the table
        #Expected results
        Then The Case IDs should be displaying in the fields
        #Test steps
        Given Click on Process Now dropdown button
        #Expected results
        Then A drop down menu should appear
        #Test steps
        Given Click on Add Docket under Docket Entries
        #Expected results
        Then A Table sorter should display
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
