package com.zenpay.selenium;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Disabled("Disabled to reduce extra browser runs")
class SmokeSuiteTest extends BaseWebTest {

    @Test
    @DisplayName("Home page loads")
    void homePageLoads() {
        open("/");
        assertFalse(driver.getTitle().isBlank(), "Expected browser title to be non-empty");
    }

    @Test
    @DisplayName("Login page loads")
    void loginPageLoads() {
        open("/login");
        assertBodyContains("login");
    }

    @Test
    @DisplayName("Signup page loads")
    void signupPageLoads() {
        open("/signup");
        assertBodyContains("signup");
    }
}
