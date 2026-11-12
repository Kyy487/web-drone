async function fetchData() {
  try {
    const server = window.DRONE_API_BASE || "/api";
    const response = await fetch(`${server}/data`);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) return;

      const latest = data[data.length - 1];

      const latitude = document.getElementById("latitudeValue");
      if (latitude) latitude.textContent = `${latest.latitude}`;

      const longitude = document.getElementById("longitudeValue");
      if (longitude) longitude.textContent = `${latest.longitude}`;

      const yaw = document.getElementById("yawValue");
      if (yaw) yaw.textContent = `${latest.yaw}`;

      const roll = document.getElementById("rollValue");
      if (roll) roll.textContent = `${latest.roll}`;

      const groundSpeed = document.getElementById("groundSpeedValue");
      if (groundSpeed) groundSpeed.textContent = `${latest.groundspeed}`;

      const verticalSpeed = document.getElementById("verticalSpeedValue");
      if (verticalSpeed) verticalSpeed.textContent = `${latest.verticalspeed}`;

      const satCount = document.getElementById("satCountValue");
      if (satCount) satCount.textContent = `${latest.satcount}`;

      const wpDist = document.getElementById("wp_distValue");
      if (wpDist) wpDist.textContent = `${latest.wp_dist}`;
    } else {
      const responseText = await response.text();
      console.error("Response was not JSON:", responseText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
  setInterval(fetchData, 1000);
});
