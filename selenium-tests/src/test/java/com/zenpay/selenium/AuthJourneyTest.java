package com.zenpay.selenium;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AuthJourneyTest extends BaseWebTest {

    private static String sharedEmail;
    private static String sharedPassword = "Test@12345";
    private static String sharedName;
    private static boolean isRegistered = false;

    private void ensureRegisteredAndLoggedIn() {
        if (!isRegistered) {
            sharedEmail = uniqueEmail("zenpay-test");
            sharedName = "tester-" + java.util.UUID.randomUUID().toString().substring(0, 6);

            // 1. Signup
            open("/signup");
            pause(1000);
            visible(By.name("name")).sendKeys(sharedName);
            pause(500);
            visible(By.name("email")).sendKeys(sharedEmail);
            pause(500);
            visible(By.name("password")).sendKeys(sharedPassword);
            pause(500);
            visible(By.className("auth-button")).click();
            
            waitForUrlContains("/profile");
            pause(1000);
            Assert.assertTrue(driver.getCurrentUrl().contains("/profile"), "Expected profile page redirect after signup");

            // 2. Profile form submission
            clearInput(visible(By.name("firstName")));
            visible(By.name("firstName")).sendKeys("Jane");
            pause(500);
            clearInput(visible(By.name("lastName")));
            visible(By.name("lastName")).sendKeys("Doe");
            pause(500);
            clearInput(visible(By.name("age")));
            visible(By.name("age")).sendKeys("26");
            pause(500);
            clearInput(visible(By.name("mobileNumber")));
            visible(By.name("mobileNumber")).sendKeys("9876543210");
            pause(500);
            
            Select occupationSelect = new Select(visible(By.id("occupation")));
            occupationSelect.selectByVisibleText("Job holder");
            pause(500);

            clearInput(visible(By.name("monthlyIncome")));
            visible(By.name("monthlyIncome")).sendKeys("30000");
            pause(500);
            clearInput(visible(By.name("monthlyExpenses")));
            visible(By.name("monthlyExpenses")).sendKeys("10000");
            pause(500);

            // Fill 12 digit Aadhar with brief pacing
            for (int i = 0; i < 12; i++) {
                driver.findElement(By.name("aadhar-" + i)).sendKeys("1");
                pause(100);
            }
            pause(1000);

            visible(By.className("profile-submit-btn")).click();
            waitForUrlContains("/dashboard");
            pause(1000);
            Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Expected dashboard redirect after profile submit");
            
            isRegistered = true;
        } else {
            // Check if we are already logged in via token in local storage
            String token = (String) ((JavascriptExecutor) driver).executeScript("return window.localStorage.getItem('token');");
            if (token == null) {
                open("/login");
                pause(1000);
                visible(By.name("email")).sendKeys(sharedEmail);
                pause(500);
                visible(By.name("password")).sendKeys(sharedPassword);
                pause(500);
                visible(By.className("auth-button")).click();
                waitForUrlContains("/dashboard");
                pause(1000);
            }
        }
    }

    @Test(priority = 1)
    public void test01_signupFlow() {
        sharedEmail = uniqueEmail("zenpay-test");
        sharedName = "tester-" + java.util.UUID.randomUUID().toString().substring(0, 6);

        open("/signup");
        pause(1000);
        
        visible(By.name("name")).sendKeys(sharedName);
        pause(600);
        visible(By.name("email")).sendKeys(sharedEmail);
        pause(600);
        visible(By.name("password")).sendKeys(sharedPassword);
        pause(600);
        
        visible(By.className("auth-button")).click();
        waitForUrlContains("/profile");
        pause(1000);
        
        Assert.assertTrue(driver.getCurrentUrl().contains("/profile"), "Redirect to profile section failed");
        Assert.assertFalse(driver.findElements(By.name("firstName")).isEmpty(), "First Name input field should be visible");
    }

    @Test(priority = 2, dependsOnMethods = {"test01_signupFlow"})
    public void test02_profileFormFlow() {
        // We are already on /profile page from the previous test
        pause(1000);
        
        clearInput(visible(By.name("firstName")));
        visible(By.name("firstName")).sendKeys("Jane");
        pause(600);
        
        clearInput(visible(By.name("lastName")));
        visible(By.name("lastName")).sendKeys("Doe");
        pause(600);
        
        clearInput(visible(By.name("age")));
        visible(By.name("age")).sendKeys("26");
        pause(600);
        
        // Input long string to test validation and sanitization
        clearInput(visible(By.name("mobileNumber")));
        visible(By.name("mobileNumber")).sendKeys("9876543210999abc");
        pause(600);
        
        String valMobile = visible(By.name("mobileNumber")).getAttribute("value");
        Assert.assertEquals(valMobile, "9876543210", "Profile mobile number input should restrict value to exactly 10 digits");
        
        Select occupationSelect = new Select(visible(By.id("occupation")));
        occupationSelect.selectByVisibleText("Job holder");
        pause(600);

        clearInput(visible(By.name("monthlyIncome")));
        visible(By.name("monthlyIncome")).sendKeys("30000");
        pause(600);
        
        clearInput(visible(By.name("monthlyExpenses")));
        visible(By.name("monthlyExpenses")).sendKeys("10000");
        pause(600);

        // Fill 12 digit Aadhar with paced keys
        for (int i = 0; i < 12; i++) {
            driver.findElement(By.name("aadhar-" + i)).sendKeys("9");
            pause(150);
        }
        pause(1000);

        visible(By.className("profile-submit-btn")).click();
        waitForUrlContains("/dashboard");
        pause(1000);
        
        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Expected dashboard redirect after profile submit");
        isRegistered = true;
    }

    @Test(priority = 3)
    public void test03_loginFlow() {
        if (!isRegistered) {
            test01_signupFlow();
            test02_profileFormFlow();
        }
        open("/login");
        pause(1000);
        
        // Clear local storage and refresh to verify clean login functionality
        ((JavascriptExecutor) driver).executeScript("window.localStorage.clear();");
        driver.navigate().refresh();
        pause(1000);
        
        visible(By.name("email")).sendKeys(sharedEmail);
        pause(600);
        
        visible(By.name("password")).sendKeys(sharedPassword);
        pause(600);
        
        visible(By.className("auth-button")).click();
        waitForUrlContains("/dashboard");
        pause(1000);
        
        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Expected dashboard redirect after login");

        String token = (String) ((JavascriptExecutor) driver).executeScript("return window.localStorage.getItem('token');");
        Assert.assertNotNull(token, "Auth token should not be null in local storage");
    }

    @Test(priority = 4)
    public void test04_aiAdvisorFlow() {
        ensureRegisteredAndLoggedIn();
        open("/advisor");
        
        // Wait for initialization loading screen to disappear
        new WebDriverWait(driver, Duration.ofSeconds(15))
            .until(ExpectedConditions.invisibilityOfElementLocated(By.className("ai-loading-screen")));
        pause(1000);
        
        // Wait for chat container
        visible(By.className("ai-chat-container"));
        
        // Send a message
        WebElement inputArea = visible(By.className("ai-input"));
        inputArea.sendKeys("Best investments for my income?");
        pause(1000);
        
        driver.findElement(By.className("ai-send-btn")).click();
        pause(1000);
        
        // Wait for assistant response to be added and typing indicator to go away
        new WebDriverWait(driver, Duration.ofSeconds(15))
            .until(ExpectedConditions.invisibilityOfElementLocated(By.className("ai-typing")));
        
        // Wait for message element
        new WebDriverWait(driver, Duration.ofSeconds(10))
            .until(ExpectedConditions.visibilityOfElementLocated(By.className("ai-message-assistant")));
        pause(1000);
        
        assertBodyContains("investment");
        pause(2000);
    }

    @Test(priority = 5)
    public void test05_paymentFlow() {
        ensureRegisteredAndLoggedIn();
        open("/payment");
        pause(1000);
        
        // Step 1: Billing Info
        clearInput(visible(By.id("payeeName")));
        visible(By.id("payeeName")).sendKeys("Merchant Tester");
        pause(600);
        
        clearInput(visible(By.id("mobileNumber")));
        visible(By.id("mobileNumber")).sendKeys("9876543210999abc");
        pause(600);
        
        String valPayMobile = visible(By.id("mobileNumber")).getAttribute("value");
        Assert.assertEquals(valPayMobile, "9876543210", "Payment mobile number input should restrict value to exactly 10 digits");
        
        clearInput(visible(By.id("amount")));
        visible(By.id("amount")).sendKeys("500");
        pause(600);
        
        visible(By.className("checkout-action-btn")).click();
        pause(1500);
        
        // Step 2: Payment Details (Card)
        visible(By.xpath("//input[@placeholder='4111 2222 3333 4444']")).sendKeys("4111222233334444");
        pause(600);
        visible(By.xpath("//input[@placeholder='MM/YY']")).sendKeys("1228");
        pause(600);
        visible(By.xpath("//input[@placeholder='123']")).sendKeys("123");
        pause(1000);
        
        driver.findElement(By.className("pay-submit-btn")).click();
        
        // Step 3 & 4: Processing and Success
        new WebDriverWait(driver, Duration.ofSeconds(15))
            .until(ExpectedConditions.visibilityOfElementLocated(By.className("checkout-success-panel")));
        pause(2000);
        
        Assert.assertTrue(driver.findElement(By.tagName("body")).getText().contains("Payment Successful!"), "Expected success message");
        
        driver.findElement(By.className("return-dashboard-btn")).click();
        waitForUrlContains("/dashboard");
        pause(1500);
    }

    @Test(priority = 6)
    public void test06_rewardsFlow() {
        ensureRegisteredAndLoggedIn();
        open("/rewards");
        pause(1500);
        
        // Click Spin Wheel
        WebElement spinBtn = visible(By.className("spin-action-btn"));
        Assert.assertTrue(spinBtn.isEnabled(), "Spin wheel button should be enabled");
        spinBtn.click();
        
        // Wait for spin to complete (takes 5 seconds transition in UI)
        pause(6500);
        
        // Check game outcome alert or coin deduction
        WebElement outcome = visible(By.className("game-outcome-alert"));
        Assert.assertTrue(outcome.isDisplayed(), "Expected game outcome announcement to be displayed");
        pause(2000);
    }

    private static void pause(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
