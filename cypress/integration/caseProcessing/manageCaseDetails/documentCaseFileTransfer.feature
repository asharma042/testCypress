@smc
Feature: Document Case File Transfer
    Scenario: Search for Case and Transfer Files to different location
        #Precodition
        Given Cases with Case File Transfer information and any type new cases
        #Test steps
        Given Click on Case Processing button
        And Click on Manage Case Details from left menu
        And Click on Case File Transfer Inquiry
        #Expected results
        Then Case File Transfer Inquiry tab displays
        #Test steps
        Given Verify Case File Transfer table columns
        #Expected results
        Then System should display all column Names
        #Test steps
        Given Enter Case ID in Case ID field and click Tab Button
        #Expected results
        Then Validate case information is diplayed
        #Test steps
        Given Enter File Location value
        #Expected results
        Then Verify File Location is diplayed
        #Test steps
        Given Enter text information into Text field
        #Expected results
        Then Verify User able to enter text
        #Test steps
        Given Enter character of any Reason value into Reason fields
        #Expected results
        Then Verify Reason Value is displayed
        #Test steps
        Given Enter Second Case ID in Case ID field
        #Expected results
        Then Validate new case information is diplayed
        #Test steps
        Given Enter different File Location value
        #Expected results
        Then Verify new File Location is diplayed
        #Test steps
        Given Enter different text information into Text field
        #Expected results
        Then Verify new text information is displayed
        #Test steps
        Given Enter different character of any Reason value into Reason fields
        #Expected results
        Then Verify new Reason value is displayed
        #Test steps
        Given Select Transfer Case Files button
        #Expected results
        Then User able to enter Transfer Case File s button
        And System displays a successful message about successful transfer file
    Scenario: Validate Case transfer
        #Test steps
        Given Enter a Case ID into Case ID field under Case File Inquiry
        #Expected results
        Then User able to enter a Case ID
        And Query Case File Location button get active
        #Test steps
        Given Select Query Case File Location button
        #Expected results
        Then Query result displays under View File Inquiry Records
        And Verify Location Description must display an updated value
        #Test steps
        Given Validate Case Transfer for another case Id
    Scenario: ResetButton
        #Test steps
        Given Enter multiple Case ID in Case ID field
        #Expected results
        Then User able to enter multiple Case ID
        #Test steps
        Given Use tab button from keyboard
        #Expected results
        Then Existing information displays
        #Test steps
        Given Enter File Location Text Reason value
        #Expected results
        Then User able to enter File Location Text Reason field value
        #Test steps
        Given Select Reset button
        #Expected results
        Then System ask permission
        #Test steps
        Given Select Yes option
        #Expected results
        Then System will remove all entered information form entered fields
    Scenario: Process ContinuationButton
        #Test steps
        Given Enter any Case ID into Case ID field
        #Expected results
        Then Process Continuation button get active
        And System displays Process Continuation option list
        #Test steps
        Given Select option from the option list
        #Expected results
        Then System will open separate window for each functionality listed under Process Continuation options
