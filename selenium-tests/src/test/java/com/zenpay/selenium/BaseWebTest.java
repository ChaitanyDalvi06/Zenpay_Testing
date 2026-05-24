package com.zenpay.selenium;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

abstract class BaseWebTest {
    private static final String DEFAULT_BASE_URL = "http://localhost:5173";
    private static final String DEFAULT_CHROMIUM_BINARY = "/Applications/Chromium.app/Contents/MacOS/Chromium";
    private static final String DEFAULT_CHROME_BINARY = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

    protected WebDriver driver;

    @BeforeEach
    void setUpDriver() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.setPageLoadStrategy(PageLoadStrategy.EAGER);
        options.addArguments("--window-size=1440,1200", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage");

        String chromeBinary = firstExistingPath(
                valueFor("chromeBinary", "CHROME_BINARY", null),
                valueFor("chromiumBinary", "CHROMIUM_BINARY", null),
                DEFAULT_CHROME_BINARY,
                DEFAULT_CHROMIUM_BINARY
        );
        if (chromeBinary != null) {
            options.setBinary(chromeBinary);
        }

        boolean headless = Boolean.parseBoolean(valueFor("headless", "SELENIUM_HEADLESS", "false"));
        if (headless) {
            options.addArguments("--headless=new");
        }

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        // Add a resilient wait for the app to be ready
        try {
            new WebDriverWait(driver, Duration.ofSeconds(20), Duration.ofMillis(500))
                .until(d -> {
                    try {
                        d.get(baseUrl() + "/");
                        return true;
                    } catch (Exception e) {
                        // Suppress connection errors during polling
                        return false;
                    }
                });
        } catch (Exception e) {
            System.err.println("Application did not become ready in time.");
            throw e;
        }
    }

    @AfterEach
    void tearDownDriver() {
        if (driver != null) {
            driver.quit();
        }
    }

    protected String baseUrl() {
        return valueFor("baseUrl", "BASE_URL", DEFAULT_BASE_URL);
    }

    protected void open(String path) {
        driver.get(baseUrl() + path);
    }

    protected void waitForUrlContains(String text) {
        new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.urlContains(text));
    }

    protected WebElement visible(By locator) {
        return new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected void clickButtonWithText(String text) {
        String expected = text.trim().toLowerCase(Locale.ROOT);
        List<WebElement> buttons = driver.findElements(By.cssSelector("button"));
        for (WebElement button : buttons) {
            String current = button.getText() == null ? "" : button.getText().trim().toLowerCase(Locale.ROOT);
            if (current.equals(expected)) {
                button.click();
                return;
            }
        }
        throw new IllegalStateException("Button not found with text: " + text);
    }

    protected String uniqueEmail(String prefix) {
        return prefix + "+" + UUID.randomUUID().toString().substring(0, 8) + "@example.com";
    }

    protected void assertBodyContains(String expectedText) {
        String bodyText = driver.findElement(By.tagName("body")).getText().toLowerCase(Locale.ROOT);
        assertTrue(bodyText.contains(expectedText.toLowerCase(Locale.ROOT)),
                "Expected body to contain: " + expectedText + " but was: " + bodyText);
    }

    private static String firstExistingPath(String... candidates) {
        for (String candidate : candidates) {
            if (candidate != null && !candidate.isBlank() && Files.exists(Path.of(candidate))) {
                return candidate;
            }
        }
        return null;
    }

    private static String valueFor(String propertyKey, String envKey, String defaultValue) {
        String propertyValue = System.getProperty(propertyKey);
        if (propertyValue != null && !propertyValue.isBlank()) {
            return propertyValue;
        }

        String envValue = System.getenv(envKey);
        if (envValue != null && !envValue.isBlank()) {
            return envValue;
        }

        return defaultValue;
    }
}
