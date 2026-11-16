(function () {
  var sent = [0x14, 0x03, 0x10, 0x40];
  var damaged = false;
  var errors = 0;

  function crc16(bytes) {
    var crc = 0xffff;
    for (var b = 0; b < bytes.length; b++) {
      crc ^= (bytes[b] & 0xff) << 8;
      for (var i = 0; i < 8; i++) {
        crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
      }
    }
    return crc;
  }

  function hex(n, w) {
    return n.toString(16).toUpperCase().padStart(w || 2, "0");
  }

  function drawReading() {
    var rx = sent.slice();
    if (damaged) rx[3] ^= 0xff;
    var sentCrc = crc16(sent);
    var now = crc16(rx);
    var value = ((rx[2] << 8) | rx[3]) / 100;
    document.getElementById("reading").textContent =
      "Node " + hex(rx[0]) + "  Kind " + hex(rx[1]) + "  High " + hex(rx[2]) + "  Low " + hex(rx[3]) +
      "   value " + value.toFixed(2) + "%   CRC " + hex(sentCrc, 4) + " → " + hex(now, 4);
    document.getElementById("crc-note").textContent = sentCrc === now
      ? "The check agrees. Agreement is not authentication."
      : "The check fails. CRC-16 does not repair the byte.";
  }

  function drawBudget() {
    var spent = 2 * errors;
    var inside = spent <= 8;
    document.getElementById("budget").textContent = "e = " + errors + "   2e + s = " + spent + "   n − k = 8";
    document.getElementById("verdict").textContent = inside
      ? "Inside the public correction budget. A CRC still has to agree before the value is used."
      : "Outside the budget. The honest outcome is rejection, not a guessed value.";
    var box = document.getElementById("syms");
    box.textContent = "";
    for (var i = 0; i < 31; i++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sym" + (i < errors ? " on" : "");
      btn.textContent = String(i + 1);
      btn.addEventListener("click", function (ev) {
        var n = Number(ev.currentTarget.textContent);
        errors = errors === n ? n - 1 : n;
        if (errors < 0) errors = 0;
        drawBudget();
      });
      box.appendChild(btn);
    }
  }

  document.getElementById("flip").addEventListener("click", function () {
    damaged = !damaged;
    drawReading();
  });
  drawReading();
  drawBudget();
})();
