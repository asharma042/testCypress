Feature: Docketing Pilot

    Background: User is logged in and on
        #Login with username/password from env file
        Given I login to "smc-web" with "username" and "password"
        #Navigate to the Docketig Pilot page
        And I click link "Case Processing"
        And I click menu with "Docketing - Pilot"
  
    Scenario: Search for Case Id and open Case Summary
        Given I prepare for a Case Summary window
        And I enter "21AB-CR00001" into My Case Id Search
        Then search result Case Id should have value "21AB-CR00001"
        And I click the search result Case Id with value "21AB-CR00001"
        Then the Case Summary window should appear
            | class              | value                  |
            | .col-xs-3 > strong | 21AB-CR00001           |
            | .col-xs-7 > strong | ST V WORRY WORT  |
        And the Case Summary case name "21AB-CR00001" should be visible
        Then I click the Case Summary Parties button
        And the Case Summary Parties defendant "WORRY WORT" should be visible
        And I click the Case Summary Parties button
        And I click the Case Summary Hearings Scheduled button
        Then the Case Summary Hearings scheduled "No Pending Hearings Scheduled" should be visible
        And I click the Case Summary Hearings Scheduled button
        And I click the Case Summary Charges button
        Then the Case Summary Charges Charge Code "577.010-032Y202054.0" should be visible
        And I click the Case Summary Charges button
        And I click the Case Summary Sentence button
        Then the Case Summary Sentence type "No Sentence(s) Entered." should be visible
        And I click the Case Summary Sentence button
        And I click the Case Summary Docket Entries button
        Then the Case Summary Docket Entries table should have 12 rows

    Scenario: Search for Case Id and open Financial Case Summary
        Given I prepare for a Financial Case Summary window
        And I enter "21AB-CR00001" into My Case Id Search
        Then search result Case Id should have value "21AB-CR00001"
        And I click the search result Financial Case Summary button
        Then the Financial Case Summary window should appear
            | class                   | value                  |
            | span > .caseSummaryOpen | 21AB-CR00001           |
            | .caseDescFont > strong  | ST V WORRY WORT |
        And the Financial Case Summary case name "ST V WORRY WORT" should be visible



