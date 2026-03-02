async function testLogin() {
  try {
    console.log("Testing login API...");

    // Test 1: Check backend connection
    const response = await fetch("https://birch-hills-school.onrender.com/api/check-auth/", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const checkAuthData = await response.json();
    console.log("Check Auth Response:", checkAuthData);

    // Test 2: Try login
    console.log("\nAttempting login with credentials...");
    const loginResponse = await fetch("https://birch-hills-school.onrender.com/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: "admin",
        password: "admin123",
      }),
    });

    const loginData = await loginResponse.json();
    console.log("Login Status:", loginResponse.status);
    console.log("Login Response:", loginData);

    if (loginResponse.ok) {
      console.log("\n✅ Login successful!");
      console.log("🔐 Cookie set:", document.cookie);
    } else {
      console.log("\n❌ Login failed");
    }

    // Test 3: Check if cookie is present and works
    if (loginResponse.ok) {
      console.log("\nChecking authenticated status...");
      const checkAuthAgain = await fetch(
        "https://birch-hills-school.onrender.com/api/check-auth/",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const authData = await checkAuthAgain.json();
      console.log("Auth Status:", authData);

      if (authData.isAuthenticated) {
        console.log("\n✅ Authenticated");
        console.log("👤 Username:", authData.username);
      }
    }
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    console.error("Stack:", error.stack);
  }
}

// Run the test
testLogin();
