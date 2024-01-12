@smc
Feature: Manage Assessments Standard Cost Code
    Scenario: Manage Assessments pulls correct standard costs for fully disposed/senteced NON-Violations Bureau conversation/watercraft misdemeanor charge.
        #Precodition
        Given Case with single watercraft misdeameanor charge  has been disposed as guilty plea and has been sentenced to a fine of $55.00
    Scenario: Validate charges from previous watercraft misdeameanor charge case
        #Precodition
        Given Continue with scenario watercraft misdeameaor charge case
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XCM10 in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced felony charge  - Non violations bureau
        #Precodition
        Given Case with single Felony charge  has been disposed as guilty plea and has been sentenced to a fine of $55.00
   Scenario: Validate charges from previous felony charge non violations bureau
        #Precodition
        Given Continue with scenario felony charge non violations bureau
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XFRTC in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced felony charge with SIS costs (When adding sentence, in add sentence box, click SIS button)  - Non violations bureau
        #Precodition
        Given Case with single Felony charge has been disposed as guilty plea and when sentencing the SIS check box has been selected and 120 months is entered in probation boxes
    Scenario: Validate full disposed sentenced felony charge with SIS costs
        #Precodition
        Given Continue with scenario full disposed sentenced felony with SIS costs
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XFSIS preloaded in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced Non-Traffic Infraction charge - - Non violations bureau
        #Precodition
        Given Case with single Infraction charge has been disposed as guilty plea and sentenced
    Scenario: Validate fully disposed sentenced non traffic infraction charge
        #Precodition
        Given Validate fully disposed sentenced non traffic infraction charge
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XCINO preloaded in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
    @skip
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced Infraction charge - IS Violations Bureau Charge
        #Precodition
        Given Case with single Traffic charge has been disposed as guilty plea and sentenced
    @skip
    Scenario: Validate fully disposed sentenced traffic infraction charge
        #Precodition
        Given Continue with scenario full disposed sentenced traffic infraction charge
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XIPVT preloaded in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
    Scenario: Manage Assessments pull standard costs for fully disposed/sentenced Conservation Misdeameanor charge
        #Precodition
        Given Case with single Misdemeanor charge  has been disposed as guilty plea and sentenced
    Scenario: Validate full disposed sentenced conservation infraction charge
        #Precodition
        Given Continue with scenario fully disposed sentenced conservation infraction charge
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
        And Any pending costs display with a disk next to the cost description
        And Directly under the Assess Costs words is a box with the standard docket code XCM10 preloaded in it
        #Test steps
        Given Click the Save button
        #Expected results
        Then All pending assessments and fines are saved to the case
        And The disk next to the cost description disappearing
        And The Save Button and Save and Create Payment Plan buttons are disabled
