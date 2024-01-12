@smc @ignoreUAT @ignoreTRN @master
Feature: Officer Setup
    Scenario: User needs to set up an officer and assign them to a specific group.
        #Test steps
        Given Click on Admin
        And Click on Block Scheduling from the business process menu
        And Click on Officer Setup from the business process menu
        #Expected results
        Then Officer Setup form opens
        #Test steps
        Given Click on Create Officer Setup button
        #Expected results
        Then Officer Setup window opens
        #Test steps
        Given Enter Create Location
        #Expected results
        Then Required field
        #Test steps
        Given Enter Create Arresting Agency
        #Expected results
        Then Required field
        #Test steps
        Given Enter Create Last Name
        #Expected results
        Then Required field
        #Test steps
        Given Enter Create First Name
        #Expected results
        Then Required field
        #Test steps
        Given Enter Create Officer Badge
        #Expected results
        Then Required field
        #Test steps
        Given Enter Create Group Number
        #Expected results
        Then Required field
        #Test steps
        Given Click Create button
        #Expected results
        Then New record based on information entered is created and saved
    Scenario: User needs to correct a mistake made to the officer setup record.
        #Precodition
        Given Officer setup record has been created.
        #Test steps
        Given Click on Admin
        And Click on Block Scheduling from the business process menu
        And Click on Officer Setup from the business process menu
        And Enter filter criteria to search for exsiting records in Filter Officer Setup Records section
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Press Edit icon for the selected record in the table
        #Expected results
        Then The fields become editable
        #Test steps
        Given Update Event Location
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated Event item is accepted and saved
        #Test steps
        Given Update Arresting Agency
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated Arresting Agency is accepted and saved
        #Test steps
        Given Update Last Name
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated Last Name is accepted and saved
        #Test steps
        Given Update First Name
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated First Name is accepted and saved
        #Test steps
        Given Update Officer Badge
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated Officer Badge is accepted and saved
        #Test steps
        Given Update Group Number
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated Group number is accepted and saved
        #Test steps
        Given Update End Date
        #Expected results
        Then Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button
        #Test steps
        Given Press Accept button
        #Expected results
        Then Updated End Date is accepted and saved
    Scenario: User needs perform a search for one or more officers' records.
        #Test steps
        Given Click on Admin
        And Click on Block Scheduling from the business process menu
        And Click on Officer Setup from the business process menu
        And Enter Location
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Arresting Agency
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Last Name
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter First Name
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Officer Badge
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Group Number
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Finish Test
    Scenario: User needs to remove an officer setup record.
        #Precodition
        Given Officer setup record has been created.
        #Test steps
        Given Click on Admin
        And Click on Block Scheduling from the business process menu
        And Click on Officer Setup from the business process menu
        And Enter filter criteria to search for exsiting records in Filter Officer Setup Records section
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Press Trash icon for the selected record in the table
        #Expected results
        Then Popup message displays "Are you sure you would like to delete this officer?"
        #Test steps
        Given Press "Yes" button in window
        #Expected results
        Then Officer record is deleted
    @skip
    Scenario: Search with wildcard
        #Test steps
        Given Click on Admin
        And Setup Data for Search
        And Click on Block Scheduling from the business process menu
        And Click on Officer Setup from the business process menu
        And Enter Wildcard Last Name
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Wildcard First Name
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Click Clear Button
        And Enter Wildcard Officer Badge
        And Press Search Officers button
        #Expected results
        Then Records based on filter criteria are returned and displayed in the View Update Officer Setup Records
        #Test steps
        Given Finish Test
        And Remove Test Records
