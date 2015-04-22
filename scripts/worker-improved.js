/* jshint worker:true */
/* global getManipFunc */
(function() {
  'use strict';
  importScripts('imageManips-improved.js');

  this.onmessage = function (e) {
    var imageData = e.data.imageData;
    var type = e.data.type;

    try {
      var a, b, g, i, j, length, pixel, r, ref;
      length = imageData.data.length / 4;
      var manipulatePixel = getManipFunc(type);
      for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        r = imageData.data[i * 4 + 0];
        g = imageData.data[i * 4 + 1];
        b = imageData.data[i * 4 + 2];
        a = imageData.data[i * 4 + 3];
        pixel = manipulatePixel(r, g, b, a);
        imageData.data[i * 4 + 0] = pixel[0];
        imageData.data[i * 4 + 1] = pixel[1];
        imageData.data[i * 4 + 2] = pixel[2];
        imageData.data[i * 4 + 3] = pixel[3];
      }
      this.postMessage(imageData);
    } catch (err) {
      throw new InverterException("Image manipulation error");
    }
    function InverterException(message) {
      this.name = "InverterException";
      this.message = message;
    }
  };
}).call(this);