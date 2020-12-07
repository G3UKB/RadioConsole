
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
    $.ajax({
      type: "PUT",
      url: "/rate_service",
      data: {
              "rate": "100KHz"
          }
    });
    e.preventDefault();
  });
});
