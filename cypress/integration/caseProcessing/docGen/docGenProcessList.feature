@smc
Feature: DocGenProcessList
    Scenario: Create a Civil Case
        #Precodition
        Given Create Civil Case
    Scenario: DocGen With Process List
        #Precodition
        Given Create process list
        #Test steps
        Given Click on Document Generation from Case Processing
        And Click on Template drop down box
        And Select a template other than a label
        #Expected results
        Then Search fields are displayed
        #Test steps
        Given Search option is by Process List
        #Expected results
        Then Process List radio button is selected
        #Test steps
        Given Enter Process List name
        And Check Doc Gen Select All box
        And Press Continue with Selected Cases button
        And Generate Document button is pressed
        And Prepare for DMS window
        And Generate Final Document DMS is selected
        And Press Ok
        #Expected results
        Then Wait for pdf download
        And Validate generated pdf
