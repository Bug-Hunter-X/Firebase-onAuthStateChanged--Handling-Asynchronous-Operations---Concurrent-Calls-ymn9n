```javascript
let isLoadingUserData = false;

firebase.auth().onAuthStateChanged(async user => {
  if (user && !isLoadingUserData) {
    isLoadingUserData = true; // Set the flag
    try {
      const userData = await loadUserData(user.uid);
      console.log('User data:', userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      isLoadingUserData = false; // Reset the flag
    }
  } else {
    console.log('User is not signed in.');
  }
});

async function loadUserData(uid) {
  // Simulate an asynchronous operation to fetch user data
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return some user data
  return { name: 'John Doe', email: 'john.doe@example.com' };
}
```

**Explanation:**

*   **`isLoadingUserData` Flag:** This boolean variable acts as a lock. It prevents multiple concurrent calls to `loadUserData` by checking its value before initiating a new fetch.  The flag is set to `true` when loading begins and set back to `false` when finished, whether successfully or due to an error. 
*   **`try...catch...finally` Block:** This ensures the `isLoadingUserData` flag is always reset, regardless of whether `loadUserData` completes successfully or encounters an error. This prevents leaving the flag in a permanently true state.  
*   **Efficiency:** This approach minimizes redundant network requests, especially in scenarios with frequent authentication changes. It also avoids potential race conditions where different authentication events might overwrite each other's results.
*   **Handling Multiple Authentication Events:**  If multiple `onAuthStateChanged` events occur rapidly, only the first one will proceed to load user data; subsequent events will be skipped until the flag becomes `false`.