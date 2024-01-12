@smc
Feature: Aged Trial Balance Report    
    Scenario: Run a detailed report.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Detailed Report
        And Click to run the report
        #Expected results
        Then Report displays a detailed report showing cash and accrual for the default location
    Scenario: Run a detailed report showing Cash accounting methods.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Select Cash for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Click to run the report
        #Expected results
        Then Report displays a detailed report showing cash method for the default location
    Scenario: Run a detailed report showing Cash accounting methods for a specific Detail Code.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        And Select Cash for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Enter a detail code in the Detail Code field
        And Click to run the report
        #Expected results
        Then Report displays a detailed report showing cash method for a specific detail code for the default location
    Scenario: Run a detailed report showing Cash accounting methods for a specific case.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        And Select Cash for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays a detailed report showing cash method for a specific case for the default location
    Scenario: Run a detailed report showing Accrual accounting methods..
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        And Select Accural for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Click to run the report
        #Expected results
        Then Report displays a detailed report showing accrual method for the default location
    Scenario: Run a detailed report showing Accrual accounting methods for a specific Detail Code.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        And Select Accural for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Enter a detail code in the Detail Code field
        And Click to run the report
        #Expected results
        Then Report displays a detailed report for Accrual method for a specific detail code for the default location
    Scenario: Run a detailed report showing Accrual accounting methods for a specific case.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        And Select Accural for the Accounting Method field
        And Click the radio button for a Detailed Report
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays Accrual method for a specific Case ID for the default location
    Scenario: Run a Detailed Report using More Filters
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Detailed Report
        And Select a Court Location
        And Open More Filters
        And Select Cash for the Accounting Method field
        And Enter a detail code in the Detail Code field
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays detail report for Cash and and Detail Code and Case Id for the selected Court Location
    Scenario: Run a Summary Report
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Select a Court Location
        And Click to run the report
        #Expected results
        Then Report displays summary report for selected court location
    Scenario: Run a Summary report showing Cash accounting methods.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Cash for the Accounting Method field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing cash method for the default location
    Scenario: Run a Summary report showing Cash accounting methods for a specific Detail Code.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Cash for the Accounting Method field
        And Enter a detail code in the Detail Code field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing cash method for a specific detail code for the default location
    Scenario: Run a Summary report showing Cash accounting methods for a specific case.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Cash for the Accounting Method field
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing cash method for a specific case for the default location
    Scenario: Run a Summary report showing Accrual accounting methods..
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Accural for the Accounting Method field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing accrual method for the default location
    Scenario: Run a Summary report showing Accrual accounting methods for a specific Detail Code.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Accural for the Accounting Method field
        And Enter a detail code in the Detail Code field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing Accrual method for a specific detail code for the default location
    Scenario: Run a Summary report showing Accrual accounting methods for a specific case.
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Open More Filters
        And Select Accural for the Accounting Method field
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays a Summary report showing Accrual for a Case Id for the default location
    Scenario: Run Summary report showing Accrual and Detail Code and Case Id for the location
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Click the radio button for a Summary Report
        And Select a Court Location
        And Open More Filters
        And Select Accural for the Accounting Method field
        And Enter a detail code in the Detail Code field
        And Enter a case ID in the My Case ID Search field
        And Click to run the report
        #Expected results
        Then Report displays a Summary Report for Accural and Detail Code and Case Id for the selected location
    Scenario: Fields can be reset
        #Precodition
        Given Valid user selects Aged Trial Balance Report
        #Test steps
        Given Open More Filters
        #Expected results
        Then Default values are set
        #Test steps
        Given Click the radio button for a Detailed Report
        And Select a Court Location
        And Select Accural for the Accounting Method field
        And Enter a case ID in the My Case ID Search field
        And Enter a detail code in the Detail Code field
        And Click to clear the report
        #Expected results
        Then Default values are set
        #Test steps
        Given Close the tab
