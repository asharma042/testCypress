@ignoreMV @integration
Feature: EFiling HP
    Scenario: File a new case
        #Precodition
        Given user must have an efiling account - logged in and on the efiling menu
        #Test steps
        Given Click on File new case
        #Expected results
        Then new case entry displays
        #Test steps
        Given select court location
        #Expected results
        Then court location should be set
        #Test steps
        Given Select Case Category
        #Expected results
        Then Civil Associate chapter displays
        #Test steps
        Given Select Breach of Contract
        #Expected results
        Then Breach of contract displays
        #Test steps
        Given enter style of case Efiling V Case Import
        #Expected results
        Then case style displays
        #Test steps
        Given enter fee amount
        #Expected results
        Then filing fee displays
        #Test steps
        Given click in box for note to clerk please create summons
        And Click continue
        #Expected results
        Then Next page Party entry screen
        #Test steps
        Given Select Party Type Petitioner
        #Expected results
        Then petitioner is selected and displays
        #Test steps
        Given enter last name
        #Expected results
        Then Last name is entered
        #Test steps
        Given enter first name
        #Expected results
        Then First name is entered
        #Test steps
        Given enter middle initial
        #Expected results
        Then Middle initial entered
        #Test steps
        Given enter date of birth
        #Expected results
        Then date of birth entered
        #Test steps
        Given enter Country
        #Expected results
        Then Country is entered
        #Test steps
        Given enter address 1
        #Expected results
        Then address is entered
        #Test steps
        Given enter city
        #Expected results
        Then City is entered
        #Test steps
        Given enter state province
        #Expected results
        Then state is entered
        #Test steps
        Given enter zip
        #Expected results
        Then zipcode is entered
        #Test steps
        Given Click add new party
        #Expected results
        Then new party entry screen
        #Test steps
        Given Select Party Type Respondent
        #Expected results
        Then Respondent is selected and displayed
        #Test steps
        Given enter last name
        #Expected results
        Then Last name is entered
        #Test steps
        Given enter first name
        #Expected results
        Then First name is entered
        #Test steps
        Given enter middle initial
        #Expected results
        Then Middle initial entered
        #Test steps
        Given enter date of birth
        #Expected results
        Then date of birth entered
        #Test steps
        Given enter Country
        #Expected results
        Then Country is entered
        #Test steps
        Given enter address 1
        #Expected results
        Then address is entered
        #Test steps
        Given enter city
        #Expected results
        Then City is entered
        #Test steps
        Given enter state province
        #Expected results
        Then state is entered
        #Test steps
        Given enter zip
        #Expected results
        Then zipcode is entered
        #Test steps
        Given Click continue
        #Expected results
        Then Document screen displays
        #Test steps
        Given Click add button filing on behalf of
        #Expected results
        Then filing on behalf of displaysin the box
        And Checkbox defaults to all named Petitioner plaintiffs
        And Documents petition is auto filled for document category
        #Test steps
        Given Select Document type dropdown click on Associate court
        And click on choose file to add document
        #Expected results
        Then window opens to select document must be PDF
        #Test steps
        Given click in the box to type document name
        #Expected results
        Then document name displays in box
        #Test steps
        Given Click Add
        #Expected results
        Then document is added to subission in the Document Title Attachment box
        #Test steps
        Given Click continue
        #Expected results
        Then Review and file page displays
        #Test steps
        Given Click on COR 2 Checkbox
        #Expected results
        Then This activates the continue button
        #Test steps
        Given Click continue
        #Expected results
        Then payment screen displays
        #Test steps
        Given click on Credit card radio button
        And Enter Cardholder name
        And enter card number
        And enter cvc code
        And enter experation date
        And Click continue
        And Click submit
        And end of test
    Scenario: Validate case from eFiling
        #Precodition
        Given Use case created with Efiling
        #Test steps
        Given Click on Case Import from Case Processing
        And Set Filing Location
        #Expected results
        Then Filing Location should be set
        #Test steps
        Given Enter case ID or filing reference number in Filing RefConfirmation NoCase ID field
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
        #Test steps
        Given Filing Party Table
        #Expected results
        Then Validate Filing Party Type
        And Validate Filing Party Mobar
        And Validate Filing Party Name
        #Test steps
        Given Party tab displays and is selected
        And Select Party Table Petitioner
        #Expected results
        Then Validate Party Type
        And Validate Party Name
        And Validate Last Name
        And Validate Middle Name
        And Validate First Name
        And Validate Date of Birth
        And Validate Street Address
        And Validate City
        And Validate Zip Code
        #Test steps
        Given Click Party Type Status Accept Button
        #Expected results
        Then Validate Party Status
        #Test steps
        Given Select Party Table Respondent
        #Expected results
        Then Validate Party Type
        And Validate Party Name
        And Validate Last Name
        And Validate Middle Name
        And Validate First Name
        And Validate Date of Birth
        And Validate Street Address
        And Validate City
        And Validate Zip Code
        #Test steps
        Given Click Party Type Status Accept Button
        #Expected results
        Then Validate Party Status
        #Test steps
        Given Press Docket tab
        #Expected results
        Then Validate Dialog prompt to confirm docket code
        #Test steps
        Given Select Yes
        And Docket Results Table displays
        #Expected results
        Then Validate 3 Rows in size
        And Validate 1 row has Filed on Behalf Of Petitioner
        And Validate 3 Docket Codes and Descriptions
        And Validate 3 Submit dates
        #Test steps
        Given Expand docket row 1
        #Expected results
        Then Validate Docket Sequence
        And Validate Docket Code
        And Validate Filed By
        And Validate Filed on Behalf of
        And Validate Search Document
        And Validate Document Type
        And Validate Document Number
        And Validate Document Title
        And Validate Main Document
        And Validate Attached to Docket Seq
        And Validate Security
        #Test steps
        Given Close docket row 1
        And Expand docket row 2
        #Expected results
        Then Validate Docket Sequence
        And Validate Docket Code
        And Validate Filed By
        And Validate Filed on Behalf of
        And Validate Search Document
        And Validate Document Type
        And Validate Document Number
        And Validate Document Title
        And Validate Main Document
        And Validate Attached to Docket Seq
        And Validate Security
        #Test steps
        Given Close docket row 2
        And Expand docket row 3
        #Expected results
        Then Validate Docket Sequence
        And Validate Docket Code
        And Validate Filed By
        And Validate Filed on Behalf of
        And Validate Search Document
        And Validate Document Type
        And Validate Document Number
        And Validate Document Title
        And Validate Main Document
        And Validate Attached to Docket Seq
        And Validate Security
        #Test steps
        Given Close docket row 3
        And Click Filing Fee Tab
        #Expected results
        Then Validate payment details pay type
        And Validate payment details confirmation number
        And Validate payment details paid amount
        #Test steps
        Given Validate Cost Assessments Row 1
        #Expected results
        Then Validate Priority
        And Validate Detail
        And Validate Description
        And Validate Assessed Amount
        And Validate Balance
        #Test steps
        Given Validate Cost Assessments Row 2
        #Expected results
        Then Validate Priority
        And Validate Detail
        And Validate Description
        And Validate Assessed Amount
        And Validate Balance
        #Test steps
        Given Validate Cost Assessments Totals
        #Expected results
        Then Validate Assessed Total Amount
        And Validate Balance Total
        And Validate Amount to Apply
        #Test steps
        Given Press Choose Action Button
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
        And Validate Assign Judge Style of Case Proposed
        #Test steps
        Given Click Assign Judge Style of Case Save button
        #Expected results
        Then Validate Judge Party Type
        #Test steps
        Given Change prorated dropdown to manual judge
        And Select Cypress Judge
        And Press Select Judge button
        #Expected results
        Then Validate Judge is selected
        #Test steps
        Given Enter Event Description
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
        And Validate Event Judge is select
        #Test steps
        Given Enter Room
        #Expected results
        Then Room selected
        And Validate Room Location
        #Test steps
        Given Enter Note to Filer
        #Expected results
        Then Validate Note to Filer
        #Test steps
        Given Click Note to Filer Save Note Button
        And Press Save Event
        #Expected results
        Then Assign Judge Schedule Event window closes
        #Test steps
        Given Close tab
