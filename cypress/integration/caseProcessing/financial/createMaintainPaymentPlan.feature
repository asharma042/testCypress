@smc
Feature: Create Maintain Payment Plan
    Scenario: Create a new payment plan on an existing case
        #Precodition
        Given Criminal case is created for user Case has been disposed  sentence has been included with a fine costs and fines have been added and saved.
    Scenario: User new payment plan on an existing case
        #Precodition
        Given Use case from previous scenario
        #Test steps
        Given Go to Manage Assessments
        And Search for previous case
        #Expected results
        Then Case should appear in table
        #Test steps
        Given Select Save and Create Payment Plan
        #Expected results
        Then Plan information window opens
        #Test steps
        Given Enter installment amount
        And Click the Pay Frequency field
        And Select Monthly
        And Click Next Payment Due field
        And Select Date
        And Click Create New Plan button
        #Expected results
        Then Payment plan collection process alert appears
        #Test steps
        Given Press no
        #Expected results
        Then Window opens verifying Payment Plan was created showing the Payment Plan number for the case
        And Save the plan number
        #Test steps
        Given Click Ok
        #Expected results
        Then Payment Plan Creation Details window appears
        And Validate payment plan has payment plan column populated
        #Test steps
        Given Close tab
        #@focus
    Scenario: Maintain existing Payment Plan
        #Precodition
        Given Use the case from previous scenario
        #Test steps
        Given Select Plan No radio button in the Search section
        And Enter Payment Plan number
        And Click Search icon
        #Expected results
        Then Case opens in window
        #Test steps
        Given Select case by checking the box next to the case number
        And Click the Maintain Payment Plan section to expand Payment Plan details
        #Expected results
        Then Section expands to show installment dates and amounts
        #Test steps
        Given Click the pencil icon next to the first payment date to edit
        #Expected results
        Then Calendar appears
        #Test steps
        Given Select a different date for the first payment
        #Expected results
        Then The first payment date changes to selected date
        And Remaining payment dates stay the same
        #Test steps
        Given Click the pencil icon next to the first payment amount to edit
        #Expected results
        Then Window opens to enter the payment amount
        #Test steps
        Given Enter new payment amount
        And Click outside the window
        #Expected results
        Then First payment changes
        And Last payment is adjusted by the diffrence
        #Test steps
        Given Click Save Plan Update button on the lower left of the screen
        #Expected results
        Then Payment Plan is updated with new information
