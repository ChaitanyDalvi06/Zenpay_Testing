package com.zenpay.selenium;

import org.testng.Assert;
import org.testng.annotations.Test;

public class SmokeSuiteTest extends BaseWebTest {

    @Test(enabled = false)
    public void homePageLoads() {
        open("/");
        Assert.assertFalse(driver.getTitle().isBlank(), "Expected browser title to be non-empty");
    }

    @Test(enabled = false)
    public void loginPageLoads() {
        open("/login");
        assertBodyContains("login");
    }

    @Test(enabled = false)
    public void signupPageLoads() {
        open("/signup");
        assertBodyContains("signup");
    }
}
