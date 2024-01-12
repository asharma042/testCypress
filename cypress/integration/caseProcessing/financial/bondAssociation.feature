@smc
Feature: Bond Association
Scenario: Create Criminal Case
#Test steps
Given Create simple criminal case
And Associate a Bond to the Criminal and not the case
Scenario: Add existing unassociated bond to an existing case
#Precodition
Given Bond created on Person X Criminal Case Saved with Person X as Defendant at Location X
#Test steps
Given Click on Bond Association
#Expected results
Then Open Bond Association tab is now open
#Test steps
Given Financial Location drop down select XXXX
And In Bond Search block tick Bond ID radio button
#Expected results
Then Search field in block becomes labeled as My Bond ID Search
#Test steps
Given In My Bond ID Search enter the bond ID from the previously made bond
#Expected results
Then Case X should appear in Case Information block
#Test steps
Given In Case Information Block case results Select Case column tick the check box in front of Case X
#Expected results
Then Process Continuation button becomes available
And Associate Bond button becomes active
#Test steps
Given Click Associate Bond Button
#Expected results
Then Green message indicating that the bond is now associated to the case
And Bonds block clears
And Manage Bond Association block clears
And Associate Bond button becomes inactive
