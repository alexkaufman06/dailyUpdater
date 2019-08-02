Feature: Simple test of webdriver.io site

  Scenario: Get started page title and link
    Given I have navigated to webdriver.io
    When I click get started and navigate to that page
    Then I expect that the title of the page is correct