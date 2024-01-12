@skip
Feature: Case Type Docket Code
    Scenario: User needs to add/enable a specific docket code to an existing process.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Select a Case TypePred Code
        And Select a docket code from Docket Description
        And Select a Process
        And Enter Start Date
        And Click Add Docket Code button
        #Expected results
        Then A new record is created for the case type pred code and process association
        #Test steps
        Given Close Tab
    Scenario: User needs to add/enable multiple case types/pred codes to an existing process.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Select multiple Case TypesPred Codes
        And Select a docket code from Docket Description
        And Select a Process
        And Enter Start Date
        And Click Add Docket Code button
        #Expected results
        Then A new record is created for each case type associated to the process
        #Test steps
        Given Close Tab
    Scenario: User needs to add/enable multiple case types/pred codes to multiple existing processes.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Select multiple Case TypesPred Codes
        And Select a docket code from Docket Description
        And Select multiple Processes
        And Enter Start Date
        And Click Add Docket Code button
        #Expected results
        Then A new record is created for each case type pred code associated to their respective process es
        #Test steps
        Given Close Tab
    Scenario: User needs to filter and search for a specific docket to see which processes it is made available to.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Expand Filter Case TypeDocket Code Record section
        And Enter Case TypePred Code
        And Enter Docket Description
        And Enter Process
        And Click Filter Records button
        #Expected results
        Then Correct results based on filter criteria display in View Update Case Type Docket Code Process Rules table
        #Test steps
        Given Close Tab
    Scenario: User needs to select a new process for an existing docket code record.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Expand Filter Case TypeDocket Code Record section
        And Enter Case TypePred Code
        And Enter Docket Description
        And Enter Process
        And Click Filter Records button
        #Expected results
        Then Correct results based on filter criteria display in View Update Case Type Docket Code Process Rules table
        #Test steps
        Given Click on Update icon pencil for selected docket code in the table
        #Expected results
        Then The fields become editable Accept button check mark becomes available to the right of the field Cancel button "X" button becomes available to the right of the Accept button
        #Test steps
        Given Select new process to associate the docket code to from the Process drop down list
        And Press Accept Process Edit button
        #Expected results
        Then Updated Process is accepted for the record and saved
        #Test steps
        Given Close Tab
    Scenario: User needs to select a new end date for an existing docket code record.
        #Test steps
        Given Click on Admin
        And Click on Code Rule Setup in the business process menu
        And Click on Case Type Docket Code from the business process menu
        #Expected results
        Then Case Type Docket Code form opens
        #Test steps
        Given Expand Filter Case TypeDocket Code Record section
        And Enter Case TypePred Code
        And Enter Docket Description
        And Enter Process
        And Click Filter Records button
        #Expected results
        Then Correct results based on filter criteria display in View Update Case Type Docket Code Process Rules table
        #Test steps
        Given Click on Update icon pencil for selected docket code in the table
        #Expected results
        Then The fields become editable Accept button check mark becomes available to the right of the field Cancel button "X" button becomes available to the right of the Accept button
        #Test steps
        Given Select new end date for the edited record
        And Press Accept button
        #Expected results
        Then Updated Process is accepted for the record and saved
        #Test steps
        Given Close Tab
        And Clear Test Records
