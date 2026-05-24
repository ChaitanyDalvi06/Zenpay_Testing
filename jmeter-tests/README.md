# Zenpay JMeter Tests

This folder contains JMeter API tests for Zenpay auth endpoints.

## Covered APIs

- POST /api/auth/signup
- POST /api/auth/login

## Run

```bash
cd jmeter-tests
jmeter -n -t auth-login-signup.jmx -l results.jtl -Jprotocol=http -Jhost=127.0.0.1 -Jport=8000
```

## HTML report

```bash
jmeter -g results.jtl -o report
```

Make sure Zenpay backend is running on the configured host and port.
