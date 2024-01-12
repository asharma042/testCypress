@smc
Feature: DJ Happy Path
    Scenario: Create a Civil Case
        #Precodition
        Given Civil Case with litigant party types
    Scenario: Dispose All Parties
        #Precodition
        Given Continue with civil case with litigant party types
        #Test steps
        Given Click on Civil from Case Processing
        And Click on Disposition Judgment
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Enter Civil Case ID in My Case ID Search
        And Click Magnifying Glass icon
        #Expected results
        Then Cases display in the Cases section
        #Test steps
        Given Click Select All check box
        #Expected results
        Then Enables Party Disposition drop down list
        #Test steps
        Given Click Pencil icon next to a case party record
        #Expected results
        Then Enables Party Disposition drop down list
        #Test steps
        Given Select value from Party Disposition dropdown list
        And Click Checkmark icon for the same case party record
        #Expected results
        Then Populates Party Diposition code for all case party records
        #Test steps
        Given Click Save Case Parties Disposition button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save
        And Case Party Disposition code is saved for selected case party
    Scenario: Dispose Case
        #Precodition
        Given Continue with civil case with all parties disposed
        #Test steps
        Given Case Disposition populates with DJV Jury Verdict Civil DISPLAY ONLY
        And Case Disposition Date auto fills DISPLAY ONLY
        And Time field auto fills DISPLAY ONLY
        And Enter text in Predefined Text field in Case Disposition section
        #Expected results
        Then text displays in free text field
        #Test steps
        Given Click Save Disposition button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save docket code and case id
        And Case Disposition code is saved for the case
        #Test steps
        Given Click Close if event window opens
    Scenario: Add Petitioner "Judgment For Record"
        #Precodition
        Given Civil Case with all parties disposed and case disposed
        #Test steps
        Given Click Judgment section triangle icon
        #Expected results
        Then Expands Judgment section
        #Test steps
        Given Select party from Case Party dropdown list petitioner
        #Expected results
        Then Selects only the one case party
        #Test steps
        Given Click Add Judgment button
        #Expected results
        Then Opens Add Judgment
        #Test steps
        Given Judgment AgainstFor field click "Judgment For"
        And Judgment For field
        #Expected results
        Then Displays party name in Judgment Against field
        #Test steps
        Given Judgment MonetaryNonMonetary select Monetary
        #Expected results
        Then Monetary displays
        #Test steps
        Given enter 15000 in Amount field
        #Expected results
        Then amount displays
        #Test steps
        Given enter JCLAM in Judgment description field
        And Judgment date auto fills with current date
        And Time auto fills with current time
        And Click Save button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save
        And Judgment For record dispalys in the View Update Judgment table
    Scenario: Add Respondent "Judgment Against"
        #Precodition
        Given Civil Case with all parties disposed and case disposed and Petitioner judged
        #Test steps
        Given Select party from Case Party dropdown list respondent
        #Expected results
        Then Selects only the one case party
        #Test steps
        Given Click Add Judgment button
        #Expected results
        Then Opens Add Judgment
        #Test steps
        Given Judgment AgainstFor field click "Judgment Against"
        And Judgment For field
        #Expected results
        Then Displays party name in Judgment Against field
        #Test steps
        Given Judgment MonetaryNonMonetary select Monetary
        #Expected results
        Then Monetary displays
        #Test steps
        Given enter 15000 in Amount field
        #Expected results
        Then amount displays
        #Test steps
        Given enter JCLAM in Judgment description field
        And Judgment date auto fills with current date
        And Time auto fills with current time
        And Click Save button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save
        And Judgment For record dispalys in the View Update Judgment table
    Scenario: update "Judgment Against" record
        #Precodition
        Given Civil Case with all parties and case disposed with judgment entered
        #Test steps
        Given click + next to judgment record to be updated
        #Expected results
        Then record expands
        #Test steps
        Given click pencil icon
        And enter 500 in Amount field
        #Expected results
        Then amount updates
        #Test steps
        Given enter ERR Entered in Error in Reason for Judgment Change field
        And Select Update Judgment Entry button
        #Expected results
        Then success noty displays
        And Update displays in table
    Scenario: update "Judgment For" record
        #Precodition
        Given Civil Case with all parties and case disposed with judgment entered after update
        #Test steps
        Given click + next to judgment record to be updated
        #Expected results
        Then record expands
        #Test steps
        Given click pencil icon
        And enter 500 in Amount field
        #Expected results
        Then amount updates
        #Test steps
        Given enter ERR Entered in Error in Reason for Judgment Change field
        And Select Update Judgment Entry button
        #Expected results
        Then success noty displays
        And Update displays in table
