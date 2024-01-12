@smc
Feature: DJ Dispose All Parties and Case
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
