@integration @skip
Feature: CaseNetEFilingHP
    Scenario: Create civil case
        #Precodition
        Given Efile a Case
    Scenario: User logs in successfully
        #Precodition
        Given Use the civil case from previous scenario
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
        And Validate Judge or Commissioner Assigned
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
        #Test steps
        Given Click Parties and Attorneys tab
        #Expected results
        Then Party tab appears
        And Validate Petitioner Plaintiff
        And Validate Attorney for Petitioner and Plainiff
        And Validate Defendant and Respondant
        #Test steps
        Given Click on Docket tab
        #Expected results
        Then Validate date Filed
        #Test steps
        Given Click on Document link
        #Expected results
        Then Redirects to Fileviewer window
        #Test steps
        Given SMC must create a Summons
        And Click Service information
        #Expected results
        Then Service Tab appears
        And Validate Issuance Issued To
        And Validate Document issued
        And Date issued
        And Document ID
        #Test steps
        Given Click on Document ID link
        #Expected results
        Then Redirects to Fileviewer window
        And Validate Due Date
        #Test steps
        Given SMC must return the service document
        And Click on Service Information for return
        #Expected results
        Then Validate return
        And Validate Type of Service
        And Validate Service Attempt Date
        And Validate Served To
        #Test steps
        Given SMC must schedule a hearing
        And Click on Scheduled Hearings and Trials tab
        #Expected results
        Then Scheduled Hearing and Trials tab appears
        And Validate Hearing date
        And Validate Judge or Commissioner
        And Validate Location
        And Validate Room
        And Validate Setting may not be one
        And Validate Event
        #Test steps
        Given Click on Virtual hearing link
        #Expected results
        Then Redricts to Virtual Hearing Room Landing Page
        And Validate Time
        And Validate Day
        And Validate Address
        And Validate Event Text may not have text
