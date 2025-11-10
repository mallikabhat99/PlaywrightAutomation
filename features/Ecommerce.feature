Feature: ECommerce Validations
@Regression
  Scenario: Placing an order successfully
    Given User logins to ECommerce application with "mallikabhat99@gmail.com" and "Mamatha@$54"
    When Add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify the order is present in OrderHistory page.

@Validation
@Regression
  Scenario Outline: Incorrect login credentials
    Given User logins to ECommerce2 application with "<UserName>" and "<Password>"
    Then Verify Error message is displayed
    Examples:
        | UserName |Password |
        | rahulrahul  | Value2  |
        | mallikabhat  | Ujire  |