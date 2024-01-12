@smc
Feature: Arrest Query Happy Path
    Scenario: Add Event to Arrest records
        #Precodition
        Given Cases with arrest report information
        #Test steps
        Given Click on Civil from Case Processing
        And Click on Inquiries
        And Click on Arrest Query
        #Expected results
        Then Arrest Query work tab displays
        #Test steps
        Given enter arrest report in Arrest Report field
        #Expected results
        Then displays in field
        And Run Arrest Query button becomes active
        #Test steps
        Given click Run Arrest Query button
        #Expected results
        Then search results display
        #Test steps
        Given click check box next to party information
        #Expected results
        Then check mark displays
        #Test steps
        Given click Process Continuation button
        #Expected results
        Then list of available processes displays
        #Test steps
        Given select Add Event
        #Expected results
        Then Add Event process continuation opens
        #Test steps
        Given Add Future Event
        And Click Return To Initiating Tab button
        #Expected results
        Then Add Event window closes and displays Arrest Query work tab
