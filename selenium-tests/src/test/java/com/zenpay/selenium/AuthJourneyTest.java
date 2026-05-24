package com.zenpay.selenium;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

class AuthJourneyTest extends BaseWebTest {

    @Test
    @DisplayName("Signup then login once")
    void signupThenLoginOnce() {
        String email = uniqueEmail("zenpay-test");
        String password = "Test@12345";
        String name = "tester-" + java.util.UUID.randomUUID().toString().substring(0, 6);

        open("/signup");
        pause(600);
        visible(By.name("name")).sendKeys(name);
        pause(300);
        visible(By.name("email")).sendKeys(email);
        pause(300);
        visible(By.name("password")).sendKeys(password);
        pause(300);
        clickButtonWithText("Signup");

        waitForUrlContains("/profile");
        pause(600);
        assertTrue(driver.getCurrentUrl().contains("/profile"), "Expected profile redirect after signup");
        assertTrue(!driver.findElements(By.name("firstName")).isEmpty(), "Expected profile form to be visible");

        open("/login");
        pause(600);
        visible(By.name("email")).sendKeys(email);
        pause(300);
        visible(By.name("password")).sendKeys(password);
        pause(300);
        clickButtonWithText("Login Now");

        waitForUrlContains("/dashboard");
        pause(600);
        assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Expected dashboard redirect after login");

        String token = (String) ((JavascriptExecutor) driver).executeScript("return window.localStorage.getItem('token');");
        assertNotNull(token, "Expected auth token in localStorage after login");
    }

    private static void pause(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
