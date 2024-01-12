@smc
Feature: Civil Case Add Party
    Scenario: Maintain Case Parties
        #Precodition
        Given Create Civil Case
    Scenario: Add Petitioner party
        #Precodition
        Given Enter Case ID
        #Test steps
        Given Case information displays
        And expand Case Parties section
        And confirm valid party types
        And expand Add Party section
        And enter party description
        #Expected results
        Then code and description display in field
        #Test steps
        Given enter first name
        #Expected results
        Then name displays
        #Test steps
        Given enter middle name
        #Expected results
        Then middle name displays
        #Test steps
        Given enter last name
        #Expected results
        Then last name displays
        #Test steps
        Given Start Date displays current date
        And time displays current time
        And expand contact information section
        And status displays active
        And select address type
        #Expected results
        Then address type displays in field
        #Test steps
        Given enter Street Address
        #Expected results
        Then street should have value
        And city should have value
        And state should have value
        And zip should have value
        And nation should have value
        #Test steps
        Given Click Save Party to Case
        #Expected results
        Then Parties Style of Case pop up
        #Test steps
        Given Style of Case click Proposed
        And click Save
        #Expected results
        Then noty displays with Style of Case is updated with new neame and case id
        #Test steps
        Given click Close
        #Expected results
        Then pop up closes
        And new party displays in Case Parties section
    Scenario: Add Respondent party
        #Precodition
        Given select Case ID search option
        #Test steps
        Given expand Case Parties section
        And confirm valid party types
        And expand Add Party section
        And enter party description
        #Expected results
        Then code and description display in field
        #Test steps
        Given enter first name
        #Expected results
        Then name displays
        #Test steps
        Given enter middle name
        #Expected results
        Then middle name displays
        #Test steps
        Given enter last name
        #Expected results
        Then last name displays
        #Test steps
        Given Start Date displays current date
        And time displays current time
        And expand contact information section
        And status displays active
        And select address type
        #Expected results
        Then address type displays in field
        #Test steps
        Given enter Street Address
        #Expected results
        Then street should have value
        And city should have value
        And state should have value
        And nation should have value
        And zip should have value
        #Test steps
        Given Click Save Party to Case
        #Expected results
        Then Parties Style of Case pop up with proposed value
        #Test steps
        Given Style of Case click Proposed
        And click Save
        #Expected results
        Then noty displays with Style of Case is updated with new neame and case id
        #Test steps
        Given click Close
        #Expected results
        Then pop up closes
        And new party displays in Case Parties section
