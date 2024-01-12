@smc
Feature: Criminal Case Happy Path
    Scenario: Create New Defendant for Case
        #Precodition
        Given Valid user selects Enter a Case
        #Test steps
        Given Navigate to the Defendant section
        And Enter Last Name
        And Enter First Name
        And Enter DL State
        And Enter Drivers License Number
        And Expand Demographics section
        And Enter Date of Birth
        And Enter SSN
        And Expand Address section
        And Enter Street Address
        And Enter City
        And Enter Zip Code
        And Save Defendant
        #Expected results
        Then Green Noty stating Defendant Saved and Address Saved
        And All Defendant info is grayed out
        And Case details section is now enabled
        #Test steps
        Given In the Case tab select default Court Location
        And Click Case Type drop down and select case type
        And Enter Arresting Agency ORI
        And Enter Filing Date Current System Date
        And Move to Prosecuting Attorney of Record section
        And Click to Add PA of Record
        #Expected results
        Then Add Additional Prosecuting Attorney of Record box opens
        #Test steps
        Given Click Party Type drop down and select APA Assistant Prosecuting Attorney
        And In Prosecuting Attorney text field enter code and select name
        And Click to Save Close
        #Expected results
        Then Add Additional Prosecuting Attorney of Record box closing
        And Party is listed in Prosecuting Attorney field
        #Test steps
        Given Click Docket Destription drop down and select AINFO Information Filed
        And Enter Docket date as today
        And Navigate to Additional Case Details section
        And Enter Date of Violation as one month ago
        And Enter Time as
        And Enter Location
        And Enter digit ticket number
        And In Missouri Charge field enter and select charge and then tab out of field
        And Enter digit OCN
        And Click Choose Action button
        And Select Save Case
        #Expected results
        Then Green Notys display with Docket Case and Additional Information saved
        And Case Judge Assignment dialog displays
        #Test steps
        Given Select a Manual Judge
        And With Case Judge entered click Save Judge Assignment
        #Expected results
        Then Box closes andGreen Noty appearing confirming Case No etc
        #Test steps
        Given Enter future event date and time
        And Select Event Judge
        And Select Room
        And Save Event
        #Expected results
        Then Green Notys that Event was saved
    Scenario: Dispose Case
        #Precodition
        Given Select Criminal from left side menu
        And Select Court Disposition
        #Test steps
        Given Select the Case ID radio button
        And In the My Search field enter the Case ID that was previously created and click the Magnifying Glass
        #Expected results
        Then The case is selected and expanded to view the Case and Count details
        #Test steps
        Given Navigate to Charge Disposition drop down under Dispoisition section
        And Click Charge Disposition drop down and select DDGTP Guilty Plea
        And Click Save button
        And In Court Disposition Event Closure popup box click to Save
        And lick the X next to Court Disposition
        #Expected results
        Then Court Disposition Event Closure box opens
        And Box closes and disposition is saved
        And Court Disposition tab closes
    Scenario: Add Sentence to Case
        #Precodition
        Given Select Criminal from left side menu
        And Select Sentence Programs from left side menu
        #Test steps
        Given Select Case ID radio button if not already selected
        And In the My Search field enter the Case ID
        #Expected results
        Then The case is selected and expanded to view Sentence Programs and Judgments information
        #Test steps
        Given Click Magnifying Glass
        And In Sentence section click to + Add Sentence
        And In Fine field for Count enter TEST Fine Amount
        #Expected results
        Then Add Sentence box pops up
        #Test steps
        Given Click to Save
        #Expected results
        Then Box closes
        And Sentence record is added to the Sentence section
        #Test steps
        Given Click the X next to Criminal Sentence Programs
        #Expected results
        Then Criminal Sentence Programs Tab closes
    Scenario: Save Assessments to Case
        #Precodition
        Given Select Financial from left side menu
        And Select Manage Assessments from Financial Menu
        #Test steps
        Given Select the Case ID radio button if it is not already selected
        And In the My Case ID Search field enter the Case ID
        #Expected results
        Then The case is selected and expanded to view details
        #Test steps
        Given Click Magnifying Glass
        And Click to Save costs to case
        #Expected results
        Then Green Noty indicating costs have been saved
        And Floppy disk no longer appears next to each assessment
        #Test steps
        Given In the Manage Assessments tab click the X to close the tabe
        #Expected results
        Then Manage Assessments tab closed
    Scenario: Take a receipt on case
        #Precodition
        Given Select Financial from left side menu
        And Select Receipt Payment from Financial Menu
        #Test steps
        Given Select Case ID radio button
        And Enter the Case ID
        And Click Magnifying Glass
        #Expected results
        Then The case is selected and expanded to view the Payment assessment details
        #Test steps
        Given Click Apply Full Amount
        #Expected results
        Then Amount applied to case should be correct
        #Test steps
        Given Click Pay Type Description drop down and select Caseh
        And In Amount Tendered field ente rsame amount from Apply Amount field
        And Click to Save Payment
        #Expected results
        Then Green Noty stating receipt has been saved
        And View Payment Summary Displays payment Details
        And Receipt Number dipslays
        And Receipt Number is link to a copy of receipt
        #Test steps
        Given Click the X next to Receipt Payment
        #Expected results
        Then Receipt Payment Tab closes
