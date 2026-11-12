(function () {
  var host = window.location.hostname;
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "";
  var configured = window.DRONE_API_BASE;
  window.DRONE_API_BASE = configured || (isLocal ? "http://127.0.0.1:5000" : "/api");
})();
