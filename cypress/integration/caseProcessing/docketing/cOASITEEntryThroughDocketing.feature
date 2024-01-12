@smc
Feature: COASITE entry through docketing
    Scenario: Enter COASITE entry
        #Precodition
        Given Criminal Case is created Case has a defendant Case is not disposed
        #Test steps
        Given Enter Case in My Docketing Search
        And Click the Magnifying glass search button
        #Expected results
        Then Case is pulled up in Cases subsection Case Id coulumn will show Preexisting Case ID
        #Test steps
        Given Click the Add Docket Entry tilte
        #Expected results
        Then Add Docket Entry section expands
        #Test steps
        Given In the Add Docket Entry Section Docket Description drop down select a docket entry
        #Expected results
        Then Additional Docket Data section expands with Film Number and Footage entry text boxes
        #Test steps
        Given In the Add Docket Entry Section Docket Description Additional Docket Data Film Number text box enter the film number
        #Expected results
        Then Film Number and Docket Text box displays the entered values
        #Test steps
        Given In the Add Docket Entry Section Docket Description Additional Docket Data Footage text box enter the film number
        #Expected results
        Then Footage text box and Docket Text box displays the entered values
        #Test steps
        Given Click Save Docket Button
        #Expected results
        Then Save Docket drop down list appears
        #Test steps
        Given select Save Dockets
        #Expected results
        Then Green Noty appears and indicates it was successfully saved The Add Docket Entry section resets
    Scenario: Review previous COASITE entry
        #Test steps
        Given Enter Case in My Docketing Search
        And Click the Magnifying glass search button
        #Expected results
        Then Case is pulled up in Cases subsection Case Id coulumn will show Preexisting Case ID
        #Test steps
        Given Click ViewUpdate Docket Entries
        #Expected results
        Then Update Docket Entries sub section opend Lists the existing dockets on the case
        #Test steps
        Given Click the + sign next to FFILM Micro Film record
        #Expected results
        Then FFILM docket opens Validate the text for the following fields Docket textFootage and Film Number
