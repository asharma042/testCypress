Feature: Create a Case in Criminal - Enter a Case
    @focus
    Scenario: Enter New Defendant for Case
        Given Sign into SMC
        Given Select Case Processessing tab
        Given Select Criminal from left side menu
        Given Select Enter a Case
        Given Navigate to the Defendant section
        Given Enter TEST Last Name
        Given Enter TEST First Name
        Given Click to expand Demographics section
        Given Enter TEST Date of Birth
        Given Click to expand Address section
        Given Enter TEST Street Address
        Given Enter City "Jefferson City"
        Given Enter Zip Code "65101"
        Given Click to Save Defendant
        Then Green Noty stating Defendant Saved and  Address Saved
        Then All Defendant info is grayed out
    Scenario: Temp holder
        Then Case details section is now enabled
        Given In the Case tab, select Court Location - "Franklin County"
        Given Click Case Type drop down and select "M1 - CC Misdemeanor"
        Given Enter Arresting Agency ORI - "MO0140800"
        Given Enter Filing Date - Current System Date
        Given Move to Prosecuting Attorney of Record section
        Given Click to Add PA of Record
        Then Add Additional Prosecuting Attorney of Record box opens
        Given Click Party Type drop down and select APA - Assistant Prosecuting Attorney
        Given In Prosecuting Attorney text field enter "42146" and select "42146 - Nasreen Esmail Engle"
        Given Click to Save & Close
        Then Add Additional Prosecuting Attorney of Record box closing
        Then Party is listed in Prosecuting Attorney field
        Given Click Docket Destription drop down and select  AINFO - Information Filed
        Given Enter Docket date as today
        Given Navigave to Additional Case Details section
        Given Enter Date of Violation as "06/16/2022"
        Given Enter Time as "10:00"
        # or whatever location you wish, location is required for traffic/conservation/watercraft violations
        Given Enter Location as "Here and There"
        # I like to use YYYYMMDD1, and build on that)
        Given Enter 9 digit TEST ticket number
        Given In Missouri Charge field, enter and select charge "302.170-003Y202073.0" and then tab out of field
        Given Enter 8 digit TEST OCN
        Given Click Choose Action button
        Given elect Save Case
        Then Assign Judge box opens
        Given In Assign Jude and Dispose box, leave pre selected Judge Assignment radio button selected
        Given With Case Judge entered, click "Save Case and Event"
        Then Box closes andGreen Noty appearing confirming Case No, etc
        Given Click the X next to Criminal Enter a Case
        Then Criminaa Enter a Case component closes
    Scenario: Dispose Case
        Given Select Criminal from left side menu
        Given Select Court Disposition
        Given Select the Case ID radio button
        Given In the My Search field, enter the Case ID that was previously created and click the Magnifying Glass
        Then The case is selected and expanded to view the Case and Count details
        Given Navigate to Charge Disposition drop down under Dispoisition section
        Given Click Charge Disposition drop down and select DDGTP - Guilty Plea
        Given Click Save button
        Given In Court Disposition Event Closure pop-up box click to Save
        Given lick the X next to Court Disposition
        Then Court Disposition Event Closure box opens
        Then Box closes and disposition is saved
        Then Court Disposition tab closes
    Scenario: Add Sentence to Case
        Given Select Criminal from Left side menu
        Given Select Sentence & Programs from left side menu
        Given Select Case ID radio button, if not already selected
        Given In the My Search field, enter the Case ID
        Then The case is selected and expanded to view Sentence, Programs and Judgments information
        Given Click Magnifying Glass
        Given In Sentence section, click to + Add Sentence
        Given In Fine field for Count-1, enter TEST Fine Amount
        Then Add Sentence box pops up
        Given Click to Save
        Then Box closes
        Then Sentence record is added to the Sentence section
        Given Click the X next to Criminal Sentence & Programs
        Then Criminal Sentence & Programs Tab closes
    Scenario: Save Assessments to Case
        Given Select Financial from left side menu
        Given Select Manage Assessments from Financial Menu
        Given Select the Case ID radio button if it is not already selected
        Given In the My Case ID Search field, enter the Case ID
        Then The case is selected and expanded to view details
        Given Click Magnifying Glass
        Given Click to Save costs to case
        Then Green Noty indicating costs have been saved
        Then Floppy disk no longer appears next to each assessment
        Given In the Manage Assessments tab, click the X to close the tabe
        Then Manage Assessments tab closed
    Scenario: Take a receipt on case
        Given Select Financial from left side menu
        Given Select Receipt Payment from Financial Menu
        Given Select the Case ID radio button if it is not already selected
        Given In the My Case ID Search field, enter the Case ID
        Given Click Magnifying glass
        Then The case is selected and expanded to view the Payment/assessment details
        # Must be at least $0.50)
        Given In Apply Amount to Case enter a TEST Payment amount
        Given Click Pay Type Description drop down and select 1100 - Caseh
        Given In Amount Tendered field, ente rsame amount from Apply Amount field
        Given Click to Save Payment
        Then Green Noty stating receipt has been saved
        Then View Payment Summary Displays payment Details
        Then Receipt Number dipslays
        Then Receipt Number is link to a copy of receipt
