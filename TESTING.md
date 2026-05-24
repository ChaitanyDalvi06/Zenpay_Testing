# Zenpay Testing Guide

This setup mirrors your friend's project style and includes:

- Selenium (Java + Maven)
- Jenkins pipeline
- JMeter API tests
- Cypress UI tests

## 1) Start Zenpay app locally

From project root:

```bash
npm run start
```

Expected:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## 2) Selenium tests

```bash
cd selenium-tests
mvn test
```

Headless run:

```bash
BASE_URL=http://localhost:5173 SELENIUM_HEADLESS=true mvn test
```

UI run (single test only):

```bash
mvn -Dtest=AuthJourneyTest test
```

## 3) Cypress tests

Install frontend dependencies first:

```bash
cd frontend
npm install
```

Run Cypress headless:

```bash
CYPRESS_BASE_URL=http://localhost:5173 npx cypress run --browser chrome --headless
```

Open Cypress UI:

```bash
npm run cy:open
```

## 4) JMeter tests

```bash
cd jmeter-tests
jmeter -n -t auth-login-signup.jmx -l results.jtl -Jprotocol=http -Jhost=localhost -Jport=8000
```

Generate report:

```bash
jmeter -g results.jtl -o report
```

## 5) Jenkins

A pipeline file is available at project root:

- Jenkinsfile

Pipeline stages:

1. Checkout
2. Install Dependencies
3. Start Zenpay App
4. Selenium Tests
5. Cypress Tests
6. JMeter Tests

The pipeline is scheduled weekly with:

- `H H * * 1`

## UI testing (step-by-step)

1) Start the app (keep this terminal running):

```bash
cd /Users/chaitanyadalvi/Desktop/Testing/Zenpay-main/Zenpay
npm run start
```

2) Selenium UI flow (browser opens and runs signup + login once):

```bash
cd /Users/chaitanyadalvi/Desktop/Testing/Zenpay-main/Zenpay/selenium-tests
mvn -Dtest=AuthJourneyTest test
```

3) Cypress UI flow (open Cypress runner):

```bash
cd /Users/chaitanyadalvi/Desktop/Testing/Zenpay-main/Zenpay/frontend
npm run cy:open
```

In the Cypress window, click `auth.cy.js` to run the signup + login test.

## Quick command shortcuts

From project root:

```bash
npm run test:selenium
npm run test:cypress
npm run test:jmeter
```
