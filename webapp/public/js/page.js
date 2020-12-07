
function highlight_rate(rate) {
    $("#100KHz").css('background', "#e5e5e5");
    $("#10KHz").css('background', "#e5e5e5");
    $("#1KHz").css('background', "#e5e5e5");
    $("#100Hz").css('background', "#e5e5e5");
    $("#10Hz").css('background', "#e5e5e5");
    rate.css('background', "#a5e5e5");
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
      .done(function(string) {
          $("#MHz100").text(string[0]);
          $("#MHz10").text(string[1]);
          $("#MHz1").text(string[2]);
          $("#KHz100").text(string[3]);
          $("#KHz10").text(string[4]);
          $("#KHz1").text(string[5]);
          $("#Hz100").text(string[6]);
          $("#Hz10").text(string[7]);
          $("#Hz1").text(string[8]);
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
});


