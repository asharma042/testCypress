@integration @skip
Feature: CaseNet EFiling

    Scenario: Create case using Efiling
        #Precodition
        Given Use Efiling to create case
    @focus
    Scenario: User logs in successfully
        #Precodition
        Given Use the case from previous scenario
        #Test steps
        Given Navigate to CaseNet and login
        #Expected results
        Then User is logged in
        #Test steps
        Given Select option to search by case number
        #Expected results
        Then Case number search form appears
        #Test steps
        Given Select location for search
        And Enter case number in search input
        And Click the Find button
        #Expected results
        Then Case Header appears
        And Validate Judge Commissioner Assigned
        And Validate Date Filed
        And Validate Location
        And Validate Case Type
        And Validate Disposition
        And Validate Financial Information
        And Validate Track This Case
        And Validate Virtual Hearing Room
        #Test steps
        Given Click Financial Information button
        #Expected results
        Then Financial Case Summary Appears
        #Test steps
        Given Click Track This Case
        #Expected results
        Then New Tab Opens
        #Test steps
        Given Click Virtual Hearing Room
        #Expected results
        Then Redicts to Virtual Hearing Room Landing Page
