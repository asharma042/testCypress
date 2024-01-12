Feature: Receipt Payment
Scenario: User receipts a payment on a case with payment plan
#Precodition
Given Criminal case is created for user X. Case has been disposed, sentence has been included with a fine, costs and fines have been added and saved. Payment Plan has been created.
Scenario: Saving case information in manage assessments
#Precodition
Given Use case from previous scenario
#Test steps
Given Go to Manage Assessments
And Search for previous case
#Expected results
Then Case should appear in table
#Test steps
Given Select Save button
And Close Tab
Scenario: Proceed with case
#Precodition
Given Use the prior scenario case
#Test steps
Given Search for case
#Expected results
Then Case appears in the window 
#Test steps
Given Click the checkbox to select the case
And Click the plus sign in the Apply Payments to the Payment Plan section
#Expected results
Then Cost Assessments section expands
#Test steps
Given Expand the Enter Payor section
#Expected results
Then Enter Payor section expands
#Test steps
Given Click the checkbox under Defendant is Payor
#Expected results
Then Checkmark appears in the checkbox
And defendants name autofills in the Last Name and First Name fields
#Test steps
Given Expand the Select Payment Type section
#Expected results
Then Select Payment Type sections expands
#Test steps
Given Click the checkbox in the Open Manage Assessments field
#Expected results
Then Checkbox appears in the Open Manage Overpayments field
#Test steps
Given Click the dropdown arrow in the Pay Type Description field
And Select Cash
And Click in the Amount Tendered field for cash
And Enter amount for cash
And Click Save Payment button on the bottom left of the screen for cash
#Expected results
Then Green Noty appears verifying payment is saved
And Receipt number shows in the View Payment Summary section
#Test steps
Given Click on new payment after cash
And Click the dropdown arrow in the Pay Type Description field
And Select Credit Card
And Click in the Amount Tendered field for credit card
And Enter confirmation Number for credit card
And Enter amount for credit card
And Click on new payment
And Select Check
And Enter Check Number
And Enter amount for check
And Click Save Payment button on the bottom left of the screen credit card
#Expected results
Then Green Noty appears verifying payment is saved
And Receipt number shows in the View Payment Summary section
#Test steps
Given Click on new payment after credit card
And Expand the Select Payment Type section
#Expected results
Then Select Payment Type sections expands
#Test steps
Given Select Money Order
And Enter Money Order Number
And Enter amount for money order
And Click Save Payment button on the bottom left of the screen for money order
#Expected results
Then Notice appears on the scrren to verify the amount of the overpayment
#Test steps
Given Click OK
And Click Save Payment button on the bottom left of the screen
#Expected results
Then Green Noty appears verifying payment is saved
And Receipt number shows in the View Payment Summary section
And Overpayment amount shows in the Refund Payee field in the Manage Overpayments section
