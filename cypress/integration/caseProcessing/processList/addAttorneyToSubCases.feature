@smc
Feature: Add Attorney to Sub Cases
    Scenario: User should be to add an attorney on subcases
        #Precodition
        Given Create subcases
        #Test steps
        Given Open SMC
        #Expected results
        Then The application launches
        #Test steps
        Given Click on Case Processing Tab
        #Expected results
        Then The business process unit
        #Test steps
        Given Click on Process List
        #Expected results
        Then The submenu items
        #Test steps
        Given Select Input Case
        #Expected results
        Then Input Case Tab opens
        #Test steps
        Given Enter Case Id into the Enter Case Id field and press enter
        #Expected results
        Then Case Id should display in the field
        #Test steps
        Given Select Add Attorney from the process Now drop down button
        #Expected results
        Then Add Attorney
        #Test steps
        Given Change party description field to APA
        #Expected results
        Then APA should be displayed
        #Test steps
        Given Enter Attorney PIDM into the Attorney Search
        #Expected results
        Then The name of the attorney and the PIDM should be displaying
        #Test steps
        Given Backdate the start date in the start field
        #Expected results
        Then The start date should be backdated
        #Test steps
        Given Click on Save Apply to All
        #Expected results
        Then A green confirmation noty should appear mentioning the Case Id and the
        #Test steps
        Given Verify if the Add Judicial Officer Dialogue window closes
        #Expected results
        Then The window should close
        #Test steps
        Given Click on x in the tab
        #Expected results
        Then The Process Closes
    Scenario: Validate Attoreny is added the case
        #Test steps
        Given Access SMC
        #Expected results
        Then SMC app should load
        #Test steps
        Given Click on Case Processing Tab
        #Expected results
        Then The left navigation menu bar loads
        #Test steps
        Given Click on Parties main menu option
        And Select Maintain Case Parties from sub menu
        And Enter Case ID into My Parties search and press enter
        #Expected results
        Then Table sorter loads
        #Test steps
        Given Expand Sub Case
        And Expand Case Parties Section and Validate the party name
        #Expected results
        Then Party name and description must match to the previously added
        #Test steps
        Given Enter second case Id into My Parties search and press enter
        And Expand Sub Case
        And Expand Case Parties Section and Validate the party name
        #Expected results
        Then Party name and description must match to the previously added
        #Test steps
        Given Close Open tab
