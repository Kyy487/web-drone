(function () {
  var samples = [
    { altitude: 0.8, latitude: -6.8959, longitude: 107.76431, roll: 0.1, groundspeed: 0.0, verticalspeed: 0.0, yaw: 0.0, satcount: 12, wp_dist: 1240.0, human_detected: 0 },
    { altitude: 4.2, latitude: -6.89588, longitude: 107.76433, roll: 0.4, groundspeed: 2.1, verticalspeed: 1.4, yaw: 12.5, satcount: 13, wp_dist: 1180.0, human_detected: 0 },
    { altitude: 9.6, latitude: -6.89584, longitude: 107.76436, roll: -0.3, groundspeed: 4.8, verticalspeed: 1.8, yaw: 28.0, satcount: 14, wp_dist: 1095.0, human_detected: 0 },
    { altitude: 15.4, latitude: -6.89579, longitude: 107.7644, roll: 0.6, groundspeed: 7.2, verticalspeed: 0.9, yaw: 45.5, satcount: 14, wp_dist: 980.0, human_detected: 0 },
    { altitude: 21.7, latitude: -6.89573, longitude: 107.76445, roll: 0.2, groundspeed: 9.5, verticalspeed: 0.4, yaw: 63.0, satcount: 15, wp_dist: 850.0, human_detected: 1 },
    { altitude: 27.9, latitude: -6.89567, longitude: 107.76451, roll: -0.5, groundspeed: 11.8, verticalspeed: 0.2, yaw: 82.5, satcount: 15, wp_dist: 720.0, human_detected: 1 },
    { altitude: 33.6, latitude: -6.89561, longitude: 107.76458, roll: 0.3, groundspeed: 13.1, verticalspeed: 0.0, yaw: 101.0, satcount: 16, wp_dist: 610.0, human_detected: 0 },
    { altitude: 38.2, latitude: -6.89555, longitude: 107.76466, roll: 0.8, groundspeed: 12.4, verticalspeed: -0.1, yaw: 118.5, satcount: 16, wp_dist: 505.0, human_detected: 0 },
    { altitude: 40.7, latitude: -6.89549, longitude: 107.76474, roll: -0.2, groundspeed: 10.7, verticalspeed: -0.3, yaw: 136.0, satcount: 15, wp_dist: 410.0, human_detected: 0 },
    { altitude: 41.3, latitude: -6.89544, longitude: 107.76482, roll: 0.1, groundspeed: 8.9, verticalspeed: -0.6, yaw: 152.5, satcount: 15, wp_dist: 330.0, human_detected: 0 },
    { altitude: 39.5, latitude: -6.89539, longitude: 107.76489, roll: 0.4, groundspeed: 6.3, verticalspeed: -1.2, yaw: 168.0, satcount: 14, wp_dist: 240.0, human_detected: 0 },
    { altitude: 36.8, latitude: -6.89535, longitude: 107.76495, roll: -0.1, groundspeed: 3.7, verticalspeed: -1.5, yaw: 180.0, satcount: 13, wp_dist: 150.0, human_detected: 0 }
  ];

  var now = Date.now();
  window.DRONE_DEMO_DATA = samples.map(function (sample, index) {
    return Object.assign({}, sample, {
      id: index + 1,
      timestamp: new Date(now - (samples.length - 1 - index) * 60000).toISOString()
    });
  });
})();
