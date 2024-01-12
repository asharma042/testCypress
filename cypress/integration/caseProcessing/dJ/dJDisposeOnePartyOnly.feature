@smc
Feature: DJ Dispose One Party Only
    Scenario: Create a Civil Case
        #Precodition
        Given Civil Case with litigant party types
    Scenario: Dispose One Party
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
        Given Click Select check box next to one party
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
        Then Populates Party Diposition code for one case party record
        #Test steps
        Given Click Save Case Parties Disposition button
        #Expected results
        Then Green message displays in upper right hand corner stating successful save
        And Case Party Disposition code is saved for one selected case party
        And UNABLE TO PROCEED TO CASE DISPOSITION
