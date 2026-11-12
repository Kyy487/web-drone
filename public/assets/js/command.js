(function () {
  function apiBase() {
    return window.DRONE_API_BASE || "/api";
  }

  window.command = async function (command) {
    try {
      var response = await fetch(apiBase() + "/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: command }),
      });

      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }

      return await response.json().catch(function () {
        return null;
      });
    } catch (error) {
      console.error("Command failed:", error);
      return null;
    }
  };
})();
