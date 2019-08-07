Feature: Check basic website functionality

  Scenario: Visit my website and click button
    Given I have navigated to my website
    When I click the ABOUT ME button
    Then I expect that the title of the page is correct