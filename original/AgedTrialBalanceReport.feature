@mv
Feature: Aged Trial Balance Report
  
  Background: User is logged in and on Aged Trial Balance Report page
    #Login with username/password from env file
    Given I login to "smc-web" with "username" and "password"

    #Navigate to the report
    And I click link "Case Processing"
    And I click menu with "Financial"
    And I click menu with "Aged Trial Balance Report"
  
  Scenario:  Change fields and clear -> fields are reset
    #Are initial values set
    Then the Report Type "Summary" should be selected
    Then the Court Location should be "E5 - Associate Div VI Franklin"
    Then the Accounting Method should be "Nothing selected"

    #Change fields
    And I click "Detail" Report Type
    And I select "AB - Franklin County" from Court Location
    And I click the More Filters button
    And I select "Cash" from Accounting Method
    And I enter "Test" into the Detail Code field
    And I enter "21AB-CR00001" into My Case Id Search

    #Respond yes to Clear prompt
    And I click the "Clear" runOrClearButton
    And I click the "Yes" discardProgressButton

    #Validate fields are reset
    Then the Report Type "Summary" should be selected
    Then the Court Location should be "E5 - Associate Div VI Franklin"
    Then the Accounting Method should be "Nothing selected"
    Then the Detail Code should be empty
    Then the My Case Id Search should be empty
  @focus
  Scenario: Run report and default parameters
    And I stub the Pdf window
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable      | value |
      | circuitNumber | 20    |
      | courtLocation | E5    |

  Scenario: Run report and verify parameters with different court location
    And I stub the Pdf window
    And I select "AB - Franklin County" from Court Location
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable      | value |
      | circuitNumber | 20    |
      | courtLocation | AB    |
  

  Scenario: Run report and verify parameters with summary detail code
    And I stub the Pdf window
    And I click "Detail" Report Type
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable          | value |
      | circuitNumber     | 20   |
      | courtLocation     | E5    |
      | summaryDetailCode | D     |

  Scenario: Run report and verify parameters accounting method cash
    And I stub the Pdf window
    And I click the More Filters button
    And I select "Cash" from Accounting Method
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable         | value |
      | circuitNumber    | 20    |
      | courtLocation    | E5    |
      | accountingMethod | C     |
  
  Scenario: Run report and verify parameters accounting method accural
    And I stub the Pdf window
    And I click the More Filters button
    And I select "Accrual" from Accounting Method
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable         | value |
      | circuitNumber    | 20    |
      | courtLocation    | E5    |
      | accountingMethod | A     |
  
  Scenario: Run report and verify parameters with detail code
    And I stub the Pdf window
    And I click the More Filters button
    And I enter "Test" into the Detail Code field
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable      | value |
      | circuitNumber | 20    |
      | courtLocation | E5    |
      | detailCode    | Test  |
 
  Scenario: Run report and verify parameters with My Case Id
    And I stub the Pdf window
    And I click the More Filters button
    And I enter "21AB-CR00001" into My Case Id Search
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable      | value        |
      | circuitNumber | 20           |
      | courtLocation | E5           |
      | caseId        | 21AB-CR00001 |

  Scenario: Run report and verify parameters with all parameters
    And I stub the Pdf window
    And I click "Detail" Report Type
    And I select "E5 - Associate Div VI Franklin" from Court Location
    And I click the More Filters button
    And I select "Cash" from Accounting Method
    And I enter "Test" into the Detail Code field
    And I enter "21AB-CR00001" into My Case Id Search
    And I click the "Run" runOrClearButton
    Then the Pdf Report should be called with
      | variable          | value        |
      | circuitNumber     | 20          |
      | summaryDetailCode | D            |
      | courtLocation     | E5           |
      | accountingMethod  | C            |
      | detailCode        | Test         |
      | caseId            | 21AB-CR00001 |
      