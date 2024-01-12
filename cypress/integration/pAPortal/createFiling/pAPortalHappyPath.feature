@smc
Feature: PA Portal Happy Path
    Scenario: Submit filing to SMC Case Import
        #Precodition
        Given Valid user selects Create Filing
        #Test steps
        Given Navigate to the Defendant section
        And Enter Last Name
        And Enter First Name
        And Enter Date of Birth
        And Enter Sex
        And Enter Street Address
        And Enter City
        And Enter Zip Code
        And In the Enter Ticket section select Filing Location
        And Enter Arresting Agency ORI
        And In the Enter Count section
        And Enter Date of Violation as one month ago
        And Enter Time as "1000"
        And Enter Location
        And Enter 9 digit ticket number
        And In Missouri Charge field enter and select charge and then tab out of field
        And In the Add Initial Document Details section
        And Click Document Category drop down and select Information Filed
        And Upload PDF
        And Click Choose Action button
        And Select Submit to Court
        #Expected results
        Then Submit filing pop up of "Do you want to Submit this filing to Court?"
        #Test steps
        Given Select Yes
        #Expected results
        Then Green noty showing filing was submitted successfully
