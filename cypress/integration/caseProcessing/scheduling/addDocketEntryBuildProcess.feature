@smc
Feature: Add Docket Entry Build Process
    Scenario: Verify if a single Docket code can be added to mulitple cases through Build Process
        #Precodition
        Given Must  build a list in Process List
        #Test steps
        Given Click on List Process radio button in the tab
        #Expected results
        Then The radio button should fill
        #Test steps
        Given Enter a list in process list Search and press enter
        #Expected results
        Then A table should open displaying lists called "Select list"
        #Test steps
        Given Verify that new table sorter is displaying with the following columns
        #Expected results
        Then A new table will open displaying the information about the Case ID
        #Test steps
        Given Click on Build process list
        #Expected results
        Then The same tablesorter in the previous step will generate as a pop up window
        #Test steps
        Given Click Select All checkbox
        #Expected results
        Then Every row should have a checkbox checked
        #Test steps
        Given Click on Process now drop down button
        #Expected results
        Then A drop down menu should appear
        #Test steps
        Given Click on Add Docket under Manage Docket Entry
        #Expected results
        Then A tablesorter should appear
        #Test steps
        Given Verify if the tablesorter has a following Columns
        #Expected results
        Then The tablesorter should contain certain and specific column
        #Test steps
        Given Verify that Case IDs that are not eligible for the additon of a docket code has a message displaying in the message field
        #Expected results
        Then The message field should a message regarding a reason
        #Test steps
        Given Enter in the Docket Description and press enter
        #Expected results
        Then The Docket Code should display in the Docket Description field
        #Test steps
        Given Enter 250000 in the Unsecured Bond Amount
        And Select a Filing Party
        #Expected results
        Then The Filing Party should display
        #Test steps
        Given Verify if the Docket Filing Date auto generates
        #Expected results
        Then The field should auto generate a date
        #Test steps
        Given Verify if the Docket Time is auto generated
        #Expected results
        Then Docket Time should display
        #Test steps
        Given Click on browse button
        #Expected results
        Then The File Explorer window should idsplay from the end users PC
        #Test steps
        Given Click on Scan button
        #Expected results
        Then A window should pop up containing components for scanning
        #Test steps
        Given Drag and drop the file
        #Expected results
        Then The file will upload and the file icon will appear
        #Test steps
        Given Click on Save and Apply to All
        #Expected results
        Then The window should close and a green noty
        #Test steps
        Given Click on X on the the tab
        #Expected results
        Then The tab should close
