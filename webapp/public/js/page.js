
function highlight_rate(rate) {
    $("#100KHz").css('background', "#e5e5e5");
    $("#10KHz").css('background', "#e5e5e5");
    $("#1KHz").css('background', "#e5e5e5");
    $("#100Hz").css('background', "#e5e5e5");
    $("#10Hz").css('background', "#e5e5e5");
    rate.css('background', "#a5e5e5");
  }

function highlight_mode(mode) {
    $("#LSB").css('background', "#e5e5e5");
    $("#USB").css('background', "#e5e5e5");
    $("#AM").css('background', "#e5e5e5");
    $("#FM").css('background', "#e5e5e5");
    mode.css('background', "#a5e5e5");
  }
  
function highlight_band(band) {
    $("#B160").css('background', "#e5e5e5");
    $("#B80").css('background', "#e5e5e5");
    $("#B40").css('background', "#e5e5e5");
    $("#B20").css('background', "#e5e5e5");
    $("#B15").css('background', "#e5e5e5");
    $("#B10").css('background', "#e5e5e5");
    $("#B2M").css('background', "#e5e5e5");
    $("#B70CM").css('background', "#e5e5e5");
    band.css('background', "#a5e5e5");
  }

function set_freq(string) {
    $("#MHz100").text(string[0]);
    $("#MHz10").text(string[1]);
    $("#MHz1").text(string[2]);
    $("#KHz100").text(string[3]);
    $("#KHz10").text(string[4]);
    $("#KHz1").text(string[5]);
    $("#Hz100").text(string[6]);
    $("#Hz10").text(string[7]);
    $("#Hz1").text(string[8]);
  }
    
$(document).ready(function() {
  var el = document.getElementById('dial');
  var dial = JogDial(el, {debug: true});
  dial.on("mousemove", function(e){
      $.ajax({
          type: "PUT",
          url: "/dial_service",
          data: {"rotation": e.target.rotation}
      })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#100KHz").click(function(e) {
    highlight_rate($("#100KHz"));
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "100KHz"
          }
    });
    e.preventDefault();
  });
  $("#10KHz").click(function(e) {
    highlight_rate($("#10KHz"));
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "10KHz"
          }
    });
    e.preventDefault();
  });
  $("#1KHz").click(function(e) {
    highlight_rate($("#1KHz"));
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "1KHz"
          }
    });
    e.preventDefault();
  });
  $("#100Hz").click(function(e) {
    highlight_rate($("#100Hz"));
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "100Hz"
          }
    });
    e.preventDefault();
  });
  $("#10Hz").click(function(e) {
    highlight_rate($("#10Hz"));
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "10Hz"
          }
    });
    e.preventDefault();
  });
  $("#LSB").click(function(e) {
    highlight_mode($("#LSB"));
    $.ajax({
      type: "PUT",
      url: "/mode_service",
      data: {
              "mode": "LSB"
          }
    });
    e.preventDefault();
  });
  $("#USB").click(function(e) {
    highlight_mode($("#USB"));
    $.ajax({
      type: "PUT",
      url: "/mode_service",
      data: {
              "mode": "USB"
          }
    });
    e.preventDefault();
  });
  $("#AM").click(function(e) {
    highlight_mode($("#AM"));
    $.ajax({
      type: "PUT",
      url: "/mode_service",
      data: {
              "mode": "AM"
          }
    });
    e.preventDefault();
  });
  $("#FM").click(function(e) {
    highlight_mode($("#FM"));
    $.ajax({
      type: "PUT",
      url: "/mode_service",
      data: {
              "mode": "FM"
          }
    });
    e.preventDefault();
  });
  
  $("#B160").click(function(e) {
    highlight_band($("#B160"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "160m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B80").click(function(e) {
    highlight_band($("#B80"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "80m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B40").click(function(e) {
    highlight_band($("#B40"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "40m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B20").click(function(e) {
    highlight_band($("#B20"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "20m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B15").click(function(e) {
    highlight_band($("#B15"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "15m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B10").click(function(e) {
    highlight_band($("#B10"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "10m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B2M").click(function(e) {
    highlight_band($("#B2M"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "2m"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
  $("#B70CM").click(function(e) {
    highlight_band($("#B70CM"));
    $.ajax({
      type: "PUT",
      url: "/band_service",
      data: {
              "band": "70cm"
          }
    })
      .done(function (string) {
        set_freq(string);
      });
    e.preventDefault();
  });
});


