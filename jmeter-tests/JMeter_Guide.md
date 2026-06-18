# Zenpay JMeter API Testing Guide

This guide explains in simple steps how to load, configure, and execute the 6-API test plan for Zenpay using the JMeter GUI.

---

## Step 1: Open the Test Plan in JMeter

1. Open the **JMeter** application on your computer.
2. In the top menu bar, go to **File > Open** (or press `Cmd+O` / `Ctrl+O`).
3. Navigate to the Zenpay folder and open the JMX file located at:
   `/Users/chaitanyadalvi/Desktop/Testing/Zenpay-main/Zenpay/jmeter-tests/auth-login-signup.jmx`

---

## Step 2: Understand the Test Tree Structure

Once loaded, you will see a tree of elements on the left sidebar. Expand the tree to view:

* **Zenpay API Load Plan (Test Plan):** The root container of the test.
  * **Auth API Thread Group:** Controls how many virtual users run the test.
    * **HTTP Request Defaults:** Sets the global URL/host (`127.0.0.1`) and port (`8000`).
    * **Global JSON Header:** Automatically sets `Content-Type: application/json` for all requests.
    * **Generate Dynamic Auth Data:** A script that automatically generates a unique email and name for each test user.
    * **Signup API (HTTP Request):** Registers the unique user.
      * **Extract Token (JSON PostProcessor):** Extracts the registration token automatically.
    * **Login API (HTTP Request):** Logs the user in.
    * **Profile API (HTTP Request):** Saves the profile details (using 30000 income / 10000 expenses).
    * **AI Advisor API (HTTP Request):** Tests the AI advisor message.
    * **Payment API (HTTP Request):** Simulates a successful checkout/payment.
    * **Rewards Spin API (HTTP Request):** Plays the roulette wheel.

---

## Step 3: Run the Tests & View Results

1. Right-click on **Auth API Thread Group** in the left sidebar.
2. Select **Add > Listener > View Results Tree** to add a results listener.
3. Click the green **Start** button (the Play icon) in the top toolbar to start the tests.
4. Select **View Results Tree** from the tree sidebar.
5. You will see the requests turning green as they succeed:
   * **Sampler result:** Shows the status code (e.g., `200` or `201`).
   * **Request tab:** Displays the payload sent to the backend.
   * **Response data tab:** Displays the returned JSON response (such as tokens, user data, or transaction success status).
