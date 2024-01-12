@smc @flaky
Feature: Case Import Happy Path
    Scenario: Create a case with PA Portal
        #Precodition
        Given Create a case with PA Portal
    Scenario: Run Jobs transfer for PA Portal
        #Test steps
        Given Login to the Jobs
        And Run the PA Portal job
    Scenario: User needs to search for criminal case.
        #Precodition
        Given Use case created with PA Portal
        #Test steps
        Given Click on Case Import from Case Processing
        And Enter case ID or filing reference number in Filing RefConfirmation NoCase ID field
        #Expected results
        Then Case ID or filing reference number has been entered
        #Test steps
        Given Press Apply button
        #Expected results
        Then Case appears in results
        #Test steps
        Given Close tab
    Scenario: User needs to accept new criminal filings.
        #Precodition
        Given Use case created with PA Portal
        #Test steps
        Given Click on Case Import from Case Processing
        And Enter case ID or filing reference number in Filing RefConfirmation NoCase ID field
        #Expected results
        Then Case ID or filing reference number has been entered
        #Test steps
        Given Press Apply button
        #Expected results
        Then Case appears in results
        #Test steps
        Given Expand case row in table
        #Expected results
        Then Case Info section displays
        And Validate Municipal Location
        And Validate Filing Date
        And Validate Time
        And Validate Case Type
        And Validate Milestone
        And Validate Style of Case
        And Validate Agency
        And Validate Case Security
        And Party tab displays and is selected
        And Validate Last Name
        And Validate First Name
        And Validate Date of Birth
        And Validate Street Address
        And Validate City
        And Validate Zip Code
        #Test steps
        Given Press Charge tab
        #Expected results
        Then Validate Date of Violation
        And Validate Violation Time
        And Validate Location
        And Validate Ticket Number
        And Validate Missouri Charge Number
        #Test steps
        Given Press Docket tab
        And Expand docket entrys row
        #Expected results
        Then Validate Docket Sequence
        And Validate Docket Code
        And Validate Filed By
        And Validate Document Number
        And Validate Document Title
        #Test steps
        Given Press Choose Action button
        #Expected results
        Then Correct actions display
        #Test steps
        Given Select Accept option
        #Expected results
        Then Accept Filing window displays
        #Test steps
        Given Press Yes
        #Expected results
        Then Assign Judge Schedule Event window displays
        #Test steps
        Given Change prorated dropdown to manual judge
        And Select Cypress Judge
        And Press Select Judge button
        And Enter Event Description
        #Expected results
        Then Event Description selected
        #Test steps
        Given Enter future Event Date
        #Expected results
        Then Validate event date
        #Test steps
        Given Enter Event Time
        #Expected results
        Then Validate event time
        #Test steps
        Given Enter Room
        #Expected results
        Then Room selected
        #Test steps
        Given Press Save Event
        #Expected results
        Then Assign Judge Schedule Event window closes
        #Test steps
        Given Close tab
