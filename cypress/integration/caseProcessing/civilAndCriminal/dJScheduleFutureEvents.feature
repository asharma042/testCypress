@smc
Feature: DJ Schedule Future Events
    Scenario: Schedule Event
        #Precodition
        Given Civil or Criminal Case
    Scenario: Continue with Civil or Criminal case
        #Precodition
        Given Initial case must be created with at lease one party type
        #Test steps
        Given Click on Case Processing
        And Click on Scheduling
        #Expected results
        Then Case ID radio button is selected
        #Test steps
        Given Enter Case ID in My Case ID Search
        And Click Magnifying Glass icon
        #Expected results
        Then Cases display in the Cases section
        #Test steps
        Given Click + to expand case informtion
        And expand Add Event section
        And enter Event Description
        #Expected results
        Then CREV displays in event description field
        #Test steps
        Given enter Event Date
        #Expected results
        Then displays in date field
        #Test steps
        Given enter Time
        #Expected results
        Then displays in time field
        And Add to Docket text box is checked
        And docket filing date displays current date
        And docket time displays current time
        And confirm check box is checked
        And displays assigned judge
        #Test steps
        Given enter room
        #Expected results
        Then room displays location for judge
        And location displays AK Carter
        #Test steps
        Given Click Save Event Information button
        #Expected results
        Then noty displays success message
