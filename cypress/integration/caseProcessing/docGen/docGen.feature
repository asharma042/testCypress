@smc
Feature: DocGen
    Scenario: Create a Civil Case
        #Precodition
        Given Create Civil Case
    Scenario: Add parties
        #Precodition
        Given Add parties
    Scenario: Generate a non tracked document for a case
        #Precodition
        Given Clear downloads
        #Test steps
        Given Click on Document Generation from Case Processing
        And Click on Template drop down box
        And Select a template
        #Expected results
        Then Search fields are displayed
        #Test steps
        Given Search option is by Case ID
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Case ID is entered
        #Expected results
        Then Case appears in Cases results table
        #Test steps
        Given Generate Document button is pressed
        And Generate Document NO DMS is selected
        #Expected results
        Then Wait for doc download
        #Test steps
        Given Press Ok
        #Expected results
        Then Validate generated doc
    Scenario: Generate a regular non tracked document for a case
        #Precodition
        Given Clear downloads
        #Test steps
        Given Click on Document Generation from Case Processing
        And Click on Template drop down box
        And Select a template other than a label
        #Expected results
        Then Search fields are displayed
        #Test steps
        Given Search option is by Case ID
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Case ID is entered
        #Expected results
        Then Case appears in Cases results table
        #Test steps
        Given Generate Document button is pressed
        And Prepare for DMS window
        And Generate Final Document DMS is selected
        #Expected results
        Then Wait for pdf download
        #Test steps
        Given Press Ok
        #Expected results
        Then Validate generated pdf
    Scenario: Generate a service document for a case
        #Precodition
        Given Clear downloads
        #Test steps
        Given Click on Document Generation from Case Processing
        And Click on Template drop down box
        And Select a service document template
        #Expected results
        Then Search fields are displayed
        #Test steps
        Given Search option is by Case ID
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Case ID is entered
        #Expected results
        Then Case appears in Cases results table
        #Test steps
        Given Enter Service Document Docket Description
        And Generate Document button is pressed
        And Prepare for DMS window
        And Generate Final Document DMS is selected
        #Expected results
        Then Wait for pdf download
        #Test steps
        Given Press Ok
        #Expected results
        Then Validate generated pdf
    Scenario: Generate a summons for a case
        #Precodition
        Given Clear downloads
        #Test steps
        Given Click on Document Generation from Case Processing
        And Click on Template drop down box
        And Select a summons template
        #Expected results
        Then Search fields are displayed
        #Test steps
        Given Search option is by Case ID
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Case ID is entered
        #Expected results
        Then Case appears in Cases results table
        #Test steps
        Given Enter Service Document Docket Description
        And Click to open Service Case Parties field
        And Select all service parties
        And Generate Document button is pressed
        And Prepare for DMS window
        And Generate Final Document DMS is selected
        #Expected results
        Then Wait for pdf download
        #Test steps
        Given Press Ok
        #Expected results
        Then Validate generated pdf
    Scenario: Use service to generate a non tracked document for a case
        #Precodition
        Given Generate a non tracked document for a case using service
    Scenario: Use service to generate a regular non tracked document for a caes
        #Precodition
        Given Generate a regular non tracked document for a case using service
    Scenario: Use service to generate a service document for a case
        #Precodition
        Given Generate a service document for a case using service
    Scenario: Use service to generate a summons for a case
        #Precodition
        Given Generate a summons for a case using service
