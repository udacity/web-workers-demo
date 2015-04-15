 // Image manipulation logic from github.com/jwill/psychic-lana

function getManipFunc(type) {

  var func = function() {};

  function makePixelInverted(r, g, b, a) {
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    return [r, g, b, a];
  };

  function makePixelChroma(r, g, b, a) {
    var max;
    max = Math.max(r, Math.max(g, b));
    if (max === g) {
      return [0, 0, 0, 0];
    } else {
      return [r, g, b, a];
    }
  };

  function makePixelGreyScale(r, g, b, a) {
    var y;
    y = (0.3 * r) + (0.59 * g) + (0.11 * b);
    r = y;
    g = y;
    b = y;
    return [r, g, b, a];
  };

  function makePixelVibrant(r, g, b, a) {
    var amt, avg, bs, gs, mx, rs;
    avg = (r + g + b) / 3.0;
    mx = Math.max(r, Math.max(g, b));
    amt = (mx / 255 * avg / 255) * (-0.4 * 3.0);
    rs = r + (amt * (mx - r));
    gs = g + (amt * (mx - g));
    bs = b + (amt * (mx - b));
    return [rs, gs, bs, a];
  };

  switch (type) {
    case "invert":
      func = makePixelInverted;
      break;
    case "chroma":
      func = makePixelChroma;
      break;
    case "greyscale":
      func = makePixelGreyScale;
      break;
    case "vibrant":
      func = makePixelVibrant;
      break;
    default:
      console.log("Not a valid image manipulation");
      break;
  }

  return func;
}