@smc @flaky
Feature: Manage Assessments Standard Cost Code Multiple Charges
    Scenario: Manage Assessments pulls correct standard costs for fully disposed/sentenced NON-Violations Bureau misdemeanor/Traffic charge.
        #Precodition
        Given Enter a case with 2 Misdemeanor charges.
        #Test steps
        Given Enter case information on tab 1
        And Click on tab 2 to enter second charge information
        And Click Save and Dispose
    Scenario: User is in the Disposition function in the Business Process Menu
        #Precodition
        Given Click Criminal Disposition menu
        #Test steps
        Given Click on the Count 1 tab to show the charge
        And Click the Amend Charge Button
        #Expected results
        Then A new window will open to enter the amended information into
        #Test steps
        Given Enter Infraction charge in the Amended Missouri Charge Field
        #Expected results
        Then Additional information will autofill in the remaining fields
        #Test steps
        Given Click Save on Amended Charge dialog
        #Expected results
        Then Green Noty will apear confirming changes
        And Charge information on count 1 will change to new amended information entered with a fine
        #Test steps
        Given Click Save on disposition page
        #Expected results
        Then User will receive a message asking "Are you sure you want to save before disposing of all counts?"
        #Test steps
        Given Click No
        And Click Apply Disposition to Multiple Charges Button
        #Expected results
        Then A new window will open to apply Disposition
        #Test steps
        Given Click "Select All"
        #Expected results
        Then Checkmarks will appear next to each count
        #Test steps
        Given Click the drop down arrow in the Charge Disposition Field
        #Expected results
        Then A list of dispositions will appear
        #Test steps
        Given Select DDGTP
        #Expected results
        Then DDGTP Guilty Plea will appear in the Charge Disposition Field
        And Disposition Date will autofill with the current date
        And Time will autofill with the current time
        #Test steps
        Given Click on the calendar
        #Expected results
        Then User will be able to select a different date
        And Time Field will highlight so user has the ability to choose a different time
        #Test steps
        Given Enter in the DFT Atty MOBAR Field
        #Expected results
        Then A list of possible attorney will appear
        #Test steps
        Given Select Attorney
        #Expected results
        Then Full MOBAR number will appear in the DFT Atty MOBAR Field
        #Test steps
        Given Click Process Continuation Button
        #Expected results
        Then Count 1 will be saved as the amended charge with a code of XMRTA
    Scenario: User is in the Sentence & Programs function in the Business Process Menu
        #Test steps
        Given Click the Add Sentence button in the Sentence Programs and Judgments section
        #Expected results
        Then Window will open to enter fine amount
        #Test steps
        Given Enter fine amount in each charge
        And Click Process Continuation Button
        And Select Manasge Assessments
        #Expected results
        Then New tab will open in Manage Assessments function
    Scenario: User is in the Manage Assessments function in the Business Process Menu
        #Test steps
        Given Click disc icon in the Fine Description Field of count 1 to save it
        And Click disc icon in the Fine Description Field of count 2 to save it
        And Click the dropdown arrow next to the Select Standard Cost Docket Code Filed and the Assess Cost Section
        And Select XMRTA
        #Expected results
        Then XMRTA will be available in the drop down list
    @focus
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced felony charge  - Non violations bureau
        #Precodition
        Given Case with Felony charge and an Infraction charge has been disposed as guilty plea and been sentenced
    @focus
    Scenario: Validate felony charge and infraction charge non violations bureau
        #Precodition
        Given Continue with scenario felony charge and infraction charge non violations bureau
        #Test steps
        Given Click on Financial from the Business Process Menu
        And Select Manage Assessments from the Financial Menu
        And Select the appropriate Financial Location
        And Click to search by Case ID
        And In the My Case ID Search enter the corresponding Case ID
        And Click the magnifying glass to search for the case
        #Expected results
        Then The case displays in the Cases section
        And The Case is expanded to view the costs
        And Any pending costs display with a disc next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XFRTC
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disc next to the cost description disappears
        And The Save Button and Save and Create Payment Plan buttons are disabled
    Scenario: Manage Assessments pull standard costs for dismissed felony charge and fully disposed/sentenced Misdemeanor charge  - Non violations bureau
        #Precodition
        Given Case with a Felony charge and a Misdemeanor charge
        #Test steps
        Given Enter charge information on tab 1
    Scenario: Validate Misdemeanor charge non violations bureau
        #Precodition
        Given User is in Court Disposition function in SMC
        #Test steps
        Given Click on tab 2
        And Enter second charge information
        And Click Choose Action button
        And Click Save and Dispose
        And Click drop down next to Judge Assignment and select Judge
        And Disposition section is available at bottom of the Enter a Case Process
        And Click to expand Disposition section
        And Click on Count 1 tab to make active
        And Click drop down next to Charge Disposition
        And Select DDCT from the drop down list
        And Click on Count 2 tab to make active
        And Click drop down next to Charge Disposition
        And Select DDGTP from the drop down list
        And Click Save
        And Open Criminal Sentence Programs from the BPM
        And Search for case
        And Click Add Sentence button
        #Expected results
        Then Guilty Disposition window opens and Count 2 is visible
        #Test steps
        Given Enter fine amount
        And Click Save
        And Click Process Continuation button
        And Click disc icon in the Fine Description Field of count 2 to save it
        And Click the dropdown arrow next to the Select Standard Cost Docket Code Filed and the Assess Cost Section
        And Select XMRTA
        #Expected results
        Then XMRTA should be available in the drop down list
