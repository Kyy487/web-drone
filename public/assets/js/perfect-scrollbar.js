(function () {
  if (typeof PerfectScrollbar === "undefined") return;

  var isWindows = navigator.platform.indexOf("Win") > -1;

  if (!isWindows) return;

  var mainPanel = document.querySelector("main");
  if (mainPanel) {
    new PerfectScrollbar(mainPanel);
  }

  [".overflow-auto", ".overflow-y-auto", ".overflow-x-auto"].forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (element) {
      new PerfectScrollbar(element);
    });
  });
})();
