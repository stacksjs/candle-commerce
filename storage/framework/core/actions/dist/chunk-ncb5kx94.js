import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@csstools/color-helpers/dist/index.cjs
var require_dist = __commonJS((exports) => {
  function multiplyMatrices(t2, n2) {
    return [t2[0] * n2[0] + t2[1] * n2[1] + t2[2] * n2[2], t2[3] * n2[0] + t2[4] * n2[1] + t2[5] * n2[2], t2[6] * n2[0] + t2[7] * n2[1] + t2[8] * n2[2]];
  }
  var t = [0.955473421488075, -0.02309845494876471, 0.06325924320057072, -0.0283697093338637, 1.0099953980813041, 0.021041441191917323, 0.012314014864481998, -0.020507649298898964, 1.330365926242124];
  function D50_to_D65(n2) {
    return multiplyMatrices(t, n2);
  }
  var n = [1.0479297925449969, 0.022946870601609652, -0.05019226628920524, 0.02962780877005599, 0.9904344267538799, -0.017073799063418826, -0.009243040646204504, 0.015055191490298152, 0.7518742814281371];
  function D65_to_D50(t2) {
    return multiplyMatrices(n, t2);
  }
  function HSL_to_sRGB(t2) {
    let n2 = t2[0] % 360;
    const _2 = t2[1] / 100, o2 = t2[2] / 100;
    return n2 < 0 && (n2 += 360), [HSL_to_sRGB_channel(0, n2, _2, o2), HSL_to_sRGB_channel(8, n2, _2, o2), HSL_to_sRGB_channel(4, n2, _2, o2)];
  }
  function HSL_to_sRGB_channel(t2, n2, _2, o2) {
    const e2 = (t2 + n2 / 30) % 12;
    return o2 - _2 * Math.min(o2, 1 - o2) * Math.max(-1, Math.min(e2 - 3, 9 - e2, 1));
  }
  function HWB_to_sRGB(t2) {
    const n2 = t2[0], _2 = t2[1] / 100, o2 = t2[2] / 100;
    if (_2 + o2 >= 1) {
      const t3 = _2 / (_2 + o2);
      return [t3, t3, t3];
    }
    const e2 = HSL_to_sRGB([n2, 100, 50]), r2 = 1 - _2 - o2;
    return [e2[0] * r2 + _2, e2[1] * r2 + _2, e2[2] * r2 + _2];
  }
  function LCH_to_Lab(t2) {
    const n2 = t2[2] * Math.PI / 180;
    return [t2[0], t2[1] * Math.cos(n2), t2[1] * Math.sin(n2)];
  }
  function Lab_to_LCH(t2) {
    const n2 = 180 * Math.atan2(t2[2], t2[1]) / Math.PI;
    return [t2[0], Math.sqrt(Math.pow(t2[1], 2) + Math.pow(t2[2], 2)), n2 >= 0 ? n2 : n2 + 360];
  }
  var _ = [0.3457 / 0.3585, 1, 0.2958 / 0.3585];
  function Lab_to_XYZ(t2) {
    const n2 = 24389 / 27, o2 = 216 / 24389, e2 = (t2[0] + 16) / 116, r2 = t2[1] / 500 + e2, a2 = e2 - t2[2] / 200;
    return [(Math.pow(r2, 3) > o2 ? Math.pow(r2, 3) : (116 * r2 - 16) / n2) * _[0], (t2[0] > 8 ? Math.pow((t2[0] + 16) / 116, 3) : t2[0] / n2) * _[1], (Math.pow(a2, 3) > o2 ? Math.pow(a2, 3) : (116 * a2 - 16) / n2) * _[2]];
  }
  function OKLCH_to_OKLab(t2) {
    const n2 = t2[2] * Math.PI / 180;
    return [t2[0], t2[1] * Math.cos(n2), t2[1] * Math.sin(n2)];
  }
  function OKLab_to_OKLCH(t2) {
    const n2 = 180 * Math.atan2(t2[2], t2[1]) / Math.PI;
    return [t2[0], Math.sqrt(t2[1] ** 2 + t2[2] ** 2), n2 >= 0 ? n2 : n2 + 360];
  }
  var o = [1.2268798758459243, -0.5578149944602171, 0.2813910456659647, -0.0405757452148008, 1.112286803280317, -0.0717110580655164, -0.0763729366746601, -0.4214933324022432, 1.5869240198367816];
  var e = [1, 0.3963377773761749, 0.2158037573099136, 1, -0.1055613458156586, -0.0638541728258133, 1, -0.0894841775298119, -1.2914855480194092];
  function OKLab_to_XYZ(t2) {
    const n2 = multiplyMatrices(e, t2);
    return multiplyMatrices(o, [n2[0] ** 3, n2[1] ** 3, n2[2] ** 3]);
  }
  function XYZ_to_Lab(t2) {
    const n2 = compute_f(t2[0] / _[0]), o2 = compute_f(t2[1] / _[1]);
    return [116 * o2 - 16, 500 * (n2 - o2), 200 * (o2 - compute_f(t2[2] / _[2]))];
  }
  var r = 216 / 24389;
  var a = 24389 / 27;
  function compute_f(t2) {
    return t2 > r ? Math.cbrt(t2) : (a * t2 + 16) / 116;
  }
  var i = [0.819022437996703, 0.3619062600528904, -0.1288737815209879, 0.0329836539323885, 0.9292868615863434, 0.0361446663506424, 0.0481771893596242, 0.2642395317527308, 0.6335478284694309];
  var l = [0.210454268309314, 0.7936177747023054, -0.0040720430116193, 1.9779985324311684, -2.42859224204858, 0.450593709617411, 0.0259040424655478, 0.7827717124575296, -0.8086757549230774];
  function XYZ_to_OKLab(t2) {
    const n2 = multiplyMatrices(i, t2);
    return multiplyMatrices(l, [Math.cbrt(n2[0]), Math.cbrt(n2[1]), Math.cbrt(n2[2])]);
  }
  var s = [30757411 / 17917100, -6372589 / 17917100, -4539589 / 17917100, -0.666684351832489, 1.616481236634939, 467509 / 29648200, 792561 / 44930125, -1921689 / 44930125, 0.942103121235474];
  var c = [446124 / 178915, -333277 / 357830, -72051 / 178915, -14852 / 17905, 63121 / 35810, 423 / 17905, 11844 / 330415, -50337 / 660830, 316169 / 330415];
  function XYZ_to_lin_P3(t2) {
    return multiplyMatrices(c, t2);
  }
  var u = [1.3457868816471583, -0.25557208737979464, -0.05110186497554526, -0.5446307051249019, 1.5082477428451468, 0.02052744743642139, 0, 0, 1.2119675456389452];
  var h = [1829569 / 896150, -506331 / 896150, -308931 / 896150, -851781 / 878810, 1648619 / 878810, 36519 / 878810, 16779 / 1248040, -147721 / 1248040, 1266979 / 1248040];
  var m = [12831 / 3959, -329 / 214, -1974 / 3959, -851781 / 878810, 1648619 / 878810, 36519 / 878810, 705 / 12673, -2585 / 12673, 705 / 667];
  function XYZ_to_lin_sRGB(t2) {
    return multiplyMatrices(m, t2);
  }
  var p = 1.09929682680944;
  var D = 0.018053968510807;
  function gam_2020_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 > D ? n2 * (p * Math.pow(_2, 0.45) - (p - 1)) : 4.5 * t2;
  }
  function gam_sRGB(t2) {
    return [gam_sRGB_channel(t2[0]), gam_sRGB_channel(t2[1]), gam_sRGB_channel(t2[2])];
  }
  function gam_sRGB_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 > 0.0031308 ? n2 * (1.055 * Math.pow(_2, 1 / 2.4) - 0.055) : 12.92 * t2;
  }
  function gam_P3(t2) {
    return gam_sRGB(t2);
  }
  var b = 1 / 512;
  function gam_ProPhoto_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 >= b ? n2 * Math.pow(_2, 1 / 1.8) : 16 * t2;
  }
  function gam_a98rgb_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return n2 * Math.pow(_2, 256 / 563);
  }
  var g = 1.09929682680944;
  var X = 0.018053968510807;
  function lin_2020_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 < 4.5 * X ? t2 / 4.5 : n2 * Math.pow((_2 + g - 1) / g, 1 / 0.45);
  }
  var Y = [63426534 / 99577255, 20160776 / 139408157, 47086771 / 278816314, 26158966 / 99577255, 0.677998071518871, 8267143 / 139408157, 0, 19567812 / 697040785, 1.0609850577107909];
  function lin_sRGB(t2) {
    return [lin_sRGB_channel(t2[0]), lin_sRGB_channel(t2[1]), lin_sRGB_channel(t2[2])];
  }
  function lin_sRGB_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 <= 0.04045 ? t2 / 12.92 : n2 * Math.pow((_2 + 0.055) / 1.055, 2.4);
  }
  function lin_P3(t2) {
    return lin_sRGB(t2);
  }
  var Z = [608311 / 1250200, 189793 / 714400, 198249 / 1000160, 35783 / 156275, 247089 / 357200, 198249 / 2500400, 0, 32229 / 714400, 5220557 / 5000800];
  function lin_P3_to_XYZ(t2) {
    return multiplyMatrices(Z, t2);
  }
  var f = 16 / 512;
  function lin_ProPhoto_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return _2 <= f ? t2 / 16 : n2 * Math.pow(_2, 1.8);
  }
  var L = [0.7977666449006423, 0.13518129740053308, 0.0313477341283922, 0.2880748288194013, 0.711835234241873, 0.00008993693872564, 0, 0, 0.8251046025104602];
  function lin_a98rgb_channel(t2) {
    const n2 = t2 < 0 ? -1 : 1, _2 = Math.abs(t2);
    return n2 * Math.pow(_2, 563 / 256);
  }
  var M = [573536 / 994567, 263643 / 1420810, 187206 / 994567, 591459 / 1989134, 6239551 / 9945670, 374412 / 4972835, 53769 / 1989134, 351524 / 4972835, 4929758 / 4972835];
  var d = [506752 / 1228815, 87881 / 245763, 12673 / 70218, 87098 / 409605, 175762 / 245763, 12673 / 175545, 7918 / 409605, 87881 / 737289, 1001167 / 1053270];
  function lin_sRGB_to_XYZ(t2) {
    return multiplyMatrices(d, t2);
  }
  function sRGB_to_HSL(t2) {
    const n2 = t2[0], _2 = t2[1], o2 = t2[2], e2 = Math.max(n2, _2, o2), r2 = Math.min(n2, _2, o2), a2 = (r2 + e2) / 2, i2 = e2 - r2;
    let l2 = Number.NaN, s2 = 0;
    if (Math.round(1e5 * i2) !== 0) {
      const t3 = Math.round(1e5 * a2);
      switch (s2 = t3 === 0 || t3 === 1e5 ? 0 : (e2 - a2) / Math.min(a2, 1 - a2), e2) {
        case n2:
          l2 = (_2 - o2) / i2 + (_2 < o2 ? 6 : 0);
          break;
        case _2:
          l2 = (o2 - n2) / i2 + 2;
          break;
        case o2:
          l2 = (n2 - _2) / i2 + 4;
      }
      l2 *= 60;
    }
    return s2 < 0 && (l2 += 180, s2 = Math.abs(s2)), l2 >= 360 && (l2 -= 360), [l2, 100 * s2, 100 * a2];
  }
  function sRGB_to_Hue(t2) {
    const n2 = t2[0], _2 = t2[1], o2 = t2[2], e2 = Math.max(n2, _2, o2), r2 = Math.min(n2, _2, o2);
    let a2 = Number.NaN;
    const i2 = e2 - r2;
    if (i2 !== 0) {
      switch (e2) {
        case n2:
          a2 = (_2 - o2) / i2 + (_2 < o2 ? 6 : 0);
          break;
        case _2:
          a2 = (o2 - n2) / i2 + 2;
          break;
        case o2:
          a2 = (n2 - _2) / i2 + 4;
      }
      a2 *= 60;
    }
    return a2 >= 360 && (a2 -= 360), a2;
  }
  function inGamut(t2) {
    return t2[0] >= -0.0001 && t2[0] <= 1.0001 && t2[1] >= -0.0001 && t2[1] <= 1.0001 && t2[2] >= -0.0001 && t2[2] <= 1.0001;
  }
  function clip(t2) {
    return [t2[0] < 0 ? 0 : t2[0] > 1 ? 1 : t2[0], t2[1] < 0 ? 0 : t2[1] > 1 ? 1 : t2[1], t2[2] < 0 ? 0 : t2[2] > 1 ? 1 : t2[2]];
  }
  function deltaEOK(t2, n2) {
    const [_2, o2, e2] = t2, [r2, a2, i2] = n2, l2 = _2 - r2, s2 = o2 - a2, c2 = e2 - i2;
    return Math.sqrt(l2 ** 2 + s2 ** 2 + c2 ** 2);
  }
  var B = 0.02;
  var G = 0.0001;
  function rayTraceBox(t2, n2) {
    let _2 = 1 / 0, o2 = -1 / 0;
    const e2 = [0, 0, 0];
    for (let r2 = 0;r2 < 3; r2++) {
      const a2 = t2[r2], i2 = n2[r2] - a2;
      e2[r2] = i2;
      const l2 = 0, s2 = 1;
      if (i2) {
        const t3 = 1 / i2, n3 = (l2 - a2) * t3, e3 = (s2 - a2) * t3;
        o2 = Math.max(Math.min(n3, e3), o2), _2 = Math.min(Math.max(n3, e3), _2);
      } else if (a2 < l2 || a2 > s2)
        return false;
    }
    return !(o2 > _2 || _2 < 0) && (o2 < 0 && (o2 = _2), !!isFinite(o2) && [t2[0] + e2[0] * o2, t2[1] + e2[1] * o2, t2[2] + e2[2] * o2]);
  }
  function luminance(t2) {
    const [n2, _2, o2] = t2.map((t3) => t3 <= 0.03928 ? t3 / 12.92 : Math.pow((t3 + 0.055) / 1.055, 2.4));
    return 0.2126 * n2 + 0.7152 * _2 + 0.0722 * o2;
  }
  exports.HSL_to_XYZ_D50 = function HSL_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = HSL_to_sRGB(n2), n2 = lin_sRGB(n2), n2 = lin_sRGB_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.HWB_to_XYZ_D50 = function HWB_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = HWB_to_sRGB(n2), n2 = lin_sRGB(n2), n2 = lin_sRGB_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.LCH_to_XYZ_D50 = function LCH_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = LCH_to_Lab(n2), n2 = Lab_to_XYZ(n2), n2;
  }, exports.Lab_to_XYZ_D50 = function Lab_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = Lab_to_XYZ(n2), n2;
  }, exports.OKLCH_to_OKLab = OKLCH_to_OKLab, exports.OKLCH_to_XYZ_D50 = function OKLCH_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = OKLCH_to_OKLab(n2), n2 = OKLab_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.OKLab_to_OKLCH = OKLab_to_OKLCH, exports.OKLab_to_XYZ = OKLab_to_XYZ, exports.OKLab_to_XYZ_D50 = function OKLab_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = OKLab_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.P3_to_XYZ_D50 = function P3_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = lin_P3(n2), n2 = lin_P3_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.ProPhoto_RGB_to_XYZ_D50 = function ProPhoto_RGB_to_XYZ_D50(t2) {
    let n2 = t2;
    var _2;
    return n2 = [lin_ProPhoto_channel((_2 = n2)[0]), lin_ProPhoto_channel(_2[1]), lin_ProPhoto_channel(_2[2])], n2 = multiplyMatrices(L, n2), n2;
  }, exports.XYZ_D50_to_HSL = function XYZ_D50_to_HSL(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_lin_sRGB(n2), n2 = gam_sRGB(n2), n2 = sRGB_to_HSL(n2), n2;
  }, exports.XYZ_D50_to_HWB = function XYZ_D50_to_HWB(t2) {
    let n2 = t2;
    n2 = D50_to_D65(n2), n2 = XYZ_to_lin_sRGB(n2);
    const _2 = gam_sRGB(n2), o2 = Math.min(_2[0], _2[1], _2[2]), e2 = 1 - Math.max(_2[0], _2[1], _2[2]);
    return [sRGB_to_Hue(_2), 100 * o2, 100 * e2];
  }, exports.XYZ_D50_to_LCH = function XYZ_D50_to_LCH(t2) {
    let n2 = t2;
    return n2 = XYZ_to_Lab(n2), n2 = Lab_to_LCH(n2), n2;
  }, exports.XYZ_D50_to_Lab = function XYZ_D50_to_Lab(t2) {
    let n2 = t2;
    return n2 = XYZ_to_Lab(n2), n2;
  }, exports.XYZ_D50_to_OKLCH = function XYZ_D50_to_OKLCH(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_OKLab(n2), n2 = OKLab_to_OKLCH(n2), n2;
  }, exports.XYZ_D50_to_OKLab = function XYZ_D50_to_OKLab(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_OKLab(n2), n2;
  }, exports.XYZ_D50_to_P3 = function XYZ_D50_to_P3(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_lin_P3(n2), n2 = gam_P3(n2), n2;
  }, exports.XYZ_D50_to_ProPhoto = function XYZ_D50_to_ProPhoto(t2) {
    let n2 = t2;
    var _2;
    return n2 = multiplyMatrices(u, n2), n2 = [gam_ProPhoto_channel((_2 = n2)[0]), gam_ProPhoto_channel(_2[1]), gam_ProPhoto_channel(_2[2])], n2;
  }, exports.XYZ_D50_to_XYZ_D50 = function XYZ_D50_to_XYZ_D50(t2) {
    return t2;
  }, exports.XYZ_D50_to_XYZ_D65 = function XYZ_D50_to_XYZ_D65(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2;
  }, exports.XYZ_D50_to_a98_RGB = function XYZ_D50_to_a98_RGB(t2) {
    let n2 = t2;
    var _2;
    return n2 = D50_to_D65(n2), n2 = multiplyMatrices(h, n2), n2 = [gam_a98rgb_channel((_2 = n2)[0]), gam_a98rgb_channel(_2[1]), gam_a98rgb_channel(_2[2])], n2;
  }, exports.XYZ_D50_to_lin_sRGB = function XYZ_D50_to_lin_sRGB(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_lin_sRGB(n2), n2;
  }, exports.XYZ_D50_to_rec_2020 = function XYZ_D50_to_rec_2020(t2) {
    let n2 = t2;
    var _2;
    return n2 = D50_to_D65(n2), n2 = multiplyMatrices(s, n2), n2 = [gam_2020_channel((_2 = n2)[0]), gam_2020_channel(_2[1]), gam_2020_channel(_2[2])], n2;
  }, exports.XYZ_D50_to_sRGB = function XYZ_D50_to_sRGB(t2) {
    let n2 = t2;
    return n2 = D50_to_D65(n2), n2 = XYZ_to_lin_sRGB(n2), n2 = gam_sRGB(n2), n2;
  }, exports.XYZ_D65_to_XYZ_D50 = function XYZ_D65_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = D65_to_D50(n2), n2;
  }, exports.XYZ_to_OKLab = XYZ_to_OKLab, exports.XYZ_to_lin_P3 = XYZ_to_lin_P3, exports.XYZ_to_lin_sRGB = XYZ_to_lin_sRGB, exports.a98_RGB_to_XYZ_D50 = function a98_RGB_to_XYZ_D50(t2) {
    let n2 = t2;
    var _2;
    return n2 = [lin_a98rgb_channel((_2 = n2)[0]), lin_a98rgb_channel(_2[1]), lin_a98rgb_channel(_2[2])], n2 = multiplyMatrices(M, n2), n2 = D65_to_D50(n2), n2;
  }, exports.clip = clip, exports.contrast_ratio_wcag_2_1 = function contrast_ratio_wcag_2_1(t2, n2) {
    const _2 = luminance(t2), o2 = luminance(n2);
    return (Math.max(_2, o2) + 0.05) / (Math.min(_2, o2) + 0.05);
  }, exports.gam_P3 = gam_P3, exports.gam_sRGB = gam_sRGB, exports.inGamut = inGamut, exports.lin_P3 = lin_P3, exports.lin_P3_to_XYZ = lin_P3_to_XYZ, exports.lin_sRGB = lin_sRGB, exports.lin_sRGB_to_XYZ = lin_sRGB_to_XYZ, exports.lin_sRGB_to_XYZ_D50 = function lin_sRGB_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = lin_sRGB_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  }, exports.mapGamut = function mapGamut(t2, n2, _2) {
    const o2 = t2;
    let e2 = clip(n2(o2)), r2 = deltaEOK(OKLCH_to_OKLab(_2(e2)), OKLCH_to_OKLab(o2));
    if (r2 < B)
      return e2;
    let a2 = 0, i2 = o2[1], l2 = true;
    for (;i2 - a2 > G; ) {
      const t3 = (a2 + i2) / 2;
      if (o2[1] = t3, l2 && inGamut(n2(o2)))
        a2 = t3;
      else if (e2 = clip(n2(o2)), r2 = deltaEOK(OKLCH_to_OKLab(_2(e2)), OKLCH_to_OKLab(o2)), r2 < B) {
        if (B - r2 < G)
          return e2;
        l2 = false, a2 = t3;
      } else
        i2 = t3;
    }
    return clip(n2([...o2]));
  }, exports.mapGamutRayTrace = function mapGamutRayTrace(t2, n2, _2) {
    const o2 = t2[0], e2 = t2[2];
    let r2 = n2(t2);
    const a2 = n2([o2, 0, e2]);
    for (let t3 = 0;t3 < 4; t3++) {
      if (t3 > 0) {
        const t4 = _2(r2);
        t4[0] = o2, t4[2] = e2, r2 = n2(t4);
      }
      const i2 = rayTraceBox(a2, r2);
      if (!i2)
        break;
      r2 = i2;
    }
    return clip(r2);
  }, exports.namedColors = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, exports.rec_2020_to_XYZ_D50 = function rec_2020_to_XYZ_D50(t2) {
    let n2 = t2;
    var _2;
    return n2 = [lin_2020_channel((_2 = n2)[0]), lin_2020_channel(_2[1]), lin_2020_channel(_2[2])], n2 = multiplyMatrices(Y, n2), n2 = D65_to_D50(n2), n2;
  }, exports.sRGB_to_XYZ_D50 = function sRGB_to_XYZ_D50(t2) {
    let n2 = t2;
    return n2 = lin_sRGB(n2), n2 = lin_sRGB_to_XYZ(n2), n2 = D65_to_D50(n2), n2;
  };
});

export { require_dist };
