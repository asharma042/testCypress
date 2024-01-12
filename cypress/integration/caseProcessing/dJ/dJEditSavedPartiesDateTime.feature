@smc
Feature: DJ Edit Saved Parties Date Time
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
        Given Click check box next to Select All
        #Expected results
        Then Enables Party Disposition drop down list
        #Test steps
        Given Select value from Party Disposition dropdown list
        And Click Checkmark icon for the same case party record
        #Expected results
        Then Populates Party Diposition code for Petitioner
        #Test steps
        Given Click Save Case Parties Disposition button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save
        And Case Party Disposition code is saved for selected case party
    Scenario: Edit Party Disposition Date/Time
        #Precodition
        Given Must have a civil case with parties that are disposed.
        #Test steps
        Given Click Select All In Case Parties section
        And Click pencil icon in Party Disposition Date
        And Click check mark to confirm
        #Expected results
        Then new date displays on all parties
        #Test steps
        Given Click pencil icon in Time
        #Expected results
        Then new time displays
        #Test steps
        Given Click check mark to confirm
        And Clikc Save Case Parties Disposition
        #Expected results
        Then new entries display
        #Test steps
        Given Case Disposition populates with DTRCT Tried by Court Civil DISPLAY ONLY
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
