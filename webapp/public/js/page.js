//
// page.js
//
// Javascript for page.py
// 
// Copyright (C) 2020 by G3UKB Bob Cowdery
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//    
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//    
// You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//    
//  The author can be reached by email at:   
//     bob@bobcowdery.plus.com
//

//////////////////////////////////////////////////////////////////
// Main code
$(document).ready(function() {
  
  ////////////////////////////////////////////
  // Dial jog frequency
  do_dial();
  
  ////////////////////////////////////////////
  // Scroll frequency
  do_scroll();
  
  ////////////////////////////////////////////
  // Slider frequency
  do_slider();
  
  ////////////////////////////////////////////
  // Frequency increment selection
  do_increment();
  
  ////////////////////////////////////////////
  // Mode selection
  do_mode();
  
  ////////////////////////////////////////////
  // Band selection
  do_band();
});

//////////////////////////////////////////////////////////////////
// Support functions

////////////////////////////////////////////
// Mouse over highlight rate
function highlight_rate(rate) {
    $("#100KHz").css('background', "#e5e5e5");
    $("#10KHz").css('background', "#e5e5e5");
    $("#1KHz").css('background', "#e5e5e5");
    $("#100Hz").css('background', "#e5e5e5");
    $("#10Hz").css('background', "#e5e5e5");
    rate.css('background', "#a5e5e5");
  }

////////////////////////////////////////////
// Mouse over highlight mode
function highlight_mode(mode) {
    $("#LSB").css('background', "#e5e5e5");
    $("#USB").css('background', "#e5e5e5");
    $("#AM").css('background', "#e5e5e5");
    $("#FM").css('background', "#e5e5e5");
    mode.css('background', "#a5e5e5");
  }

////////////////////////////////////////////
// Mouse over highlight band  
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

////////////////////////////////////////////
// Set new frequency
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

////////////////////////////////////////////
// Set new frequency
function slider_freq() {
  // Fine tune
  $.ajax({
     type: "PUT",
     url: "/slider_service",
     data: {slider: $( "#slider" ).slider("value")}
   })
   .done(function (string) {
     set_freq(string);
   });
}
  
//////////////////////////////////////////////////////////////////
// Execute functions
  
////////////////////////////////////////////
// Do scroll exchange
function execute_scroll(e, inc) {
  if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
    // Scroll up
    $.ajax({
      type: "PUT",
      url: "/scroll_service",
      data: {"scroll": inc}
    })
    .done(function (string) {
      set_freq(string);
    });
  }
  else {
    // Scroll down
    $.ajax({
      type: "PUT",
      url: "/scroll_service",
      data: {"scroll": -inc}
    })
    .done(function (string) {
      set_freq(string);
    });
  }
  e.preventDefault();
}

////////////////////////////////////////////
// Do slider frequency
function do_slider() {
  $( "#slider" ).slider({
      orientation: "horizontal",
      max: 100,
      value: 50,
      slide: function( event, ui ) {
        slider_freq();
      }
    });
}

////////////////////////////////////////////
// Do frequenct jog dial
function do_dial() {
  var el = document.getElementById('dial');
  var dial = JogDial(el, {debug: false});
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
}

////////////////////////////////////////////
// Do scroll frequency
function do_scroll() {
  $(Hz1).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 1);
  });
  $(Hz10).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 10);
  });
  $(Hz100).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 100);
  });
  $(KHz1).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 1000);
  });
  $(KHz10).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 10000);
  });
  $(KHz100).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 100000);
  });
  $(MHz1).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 1000000);
  });
  $(MHz10).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 10000000);
  });
  $(MHz100).bind('mousewheel DOMMouseScroll', function(e){
    execute_scroll(e, 100000000);
  });
}

////////////////////////////////////////////
// Set frequency increment
function do_increment() {
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
}

////////////////////////////////////////////
// Set mode
function do_mode() {
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
}

////////////////////////////////////////////
// Set band
function do_band() {
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
}

