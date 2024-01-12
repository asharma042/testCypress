@smc
Feature: Document Case File Inquiry
    Scenario: Search Case File Inquiry information
        #Precodition
        Given Cases with Case File Transfer inforrmation
        #Test steps
        Given Click on Case Processing from Case Processing
        And Click on Manage Case Details
        #Expected results
        Then Manage Case Detail display open with submenu
        #Test steps
        Given Click on Case File Inquiry
        #Expected results
        Then Case File Inquiry section opens
        #Test steps
        Given Enter Case ID in Case ID field
        #Expected results
        Then Case ID entered
        #Test steps
        Given Uncheck Display Only Current Record if selected
        And Click on Query Case File Location button
        #Expected results
        Then View File Inquiry Record section displays records for entered Case ID
        #Test steps
        Given Verify View File Inquiry Records table
        #Expected results
        Then View File Inquiry Records table displays desired columns
    Scenario: Display Only Current Record
        #Test steps
        Given Entered same case ID into Case ID field
        #Expected results
        Then Case ID entered
        #Test steps
        Given Checked in checkbox to display only current records
        #Expected results
        Then Display Only Current Records checkbox checked in
        #Test steps
        Given Click on Query Case File Location button
        #Expected results
        Then Displays only current information of entered Case ID where Current Record column value is Yes
    Scenario: Save Filter PreferenceButton
        #Test steps
        Given Select Save Filter Preference button
        #Expected results
        Then System will save current Case ID
        #Test steps
        Given Close Case File Transfer Inquiry tab
        And Select Case File Transfer Inquiry tab
        #Expected results
        Then Case File Transfer Inquiry tab open
        And Verify that Case File Inquiry Case ID field opens with last saved Case ID
