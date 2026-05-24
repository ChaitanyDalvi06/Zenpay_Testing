# Zenpay Selenium Tests

This module provides a Maven-based Selenium smoke and auth suite for Zenpay, similar to your friend's structure.

## Run locally

```bash
cd selenium-tests
mvn test
```

## Configuration

Defaults:

- `BASE_URL` = `http://127.0.0.1:5173`
- `SELENIUM_HEADLESS` = `false`
- `CHROME_BINARY` auto-detected from common macOS Chrome/Chromium paths

Override when needed:

```bash
BASE_URL=http://127.0.0.1:5173 \
SELENIUM_HEADLESS=true \
CHROME_BINARY=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
mvn test
```

## Notes

- Keep Zenpay frontend and backend running before executing tests.
- Auth tests cover signup and login UI journeys.
