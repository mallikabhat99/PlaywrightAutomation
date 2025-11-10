Feature: ECommerce Error Validations
@Validation
  Scenario Outline: Incorrect login credentials
    Given User logins to ECommerce2 application with "<UserName>" and "<Password>"
    Then Verify Error message is displayed
    Examples:
        | UserName |Password |
        | rahulrahul  | Value2  |
        | mallikabhat  | Ujire  |