import {
  __commonJS,
  __dirname,
  __export,
  __require,
  __toESM,
  init_esm_shims
} from "./chunk-OH5XAPGM.js";

// node_modules/fast-diff/diff.js
var require_diff = __commonJS({
  "node_modules/fast-diff/diff.js"(exports, module2) {
    "use strict";
    init_esm_shims();
    var DIFF_DELETE = -1;
    var DIFF_INSERT = 1;
    var DIFF_EQUAL = 0;
    function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
      if (text1 === text2) {
        if (text1) {
          return [[DIFF_EQUAL, text1]];
        }
        return [];
      }
      if (cursor_pos != null) {
        var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
        if (editdiff) {
          return editdiff;
        }
      }
      var commonlength = diff_commonPrefix(text1, text2);
      var commonprefix = text1.substring(0, commonlength);
      text1 = text1.substring(commonlength);
      text2 = text2.substring(commonlength);
      commonlength = diff_commonSuffix(text1, text2);
      var commonsuffix = text1.substring(text1.length - commonlength);
      text1 = text1.substring(0, text1.length - commonlength);
      text2 = text2.substring(0, text2.length - commonlength);
      var diffs = diff_compute_(text1, text2);
      if (commonprefix) {
        diffs.unshift([DIFF_EQUAL, commonprefix]);
      }
      if (commonsuffix) {
        diffs.push([DIFF_EQUAL, commonsuffix]);
      }
      diff_cleanupMerge(diffs, _fix_unicode);
      if (cleanup) {
        diff_cleanupSemantic(diffs);
      }
      return diffs;
    }
    function diff_compute_(text1, text2) {
      var diffs;
      if (!text1) {
        return [[DIFF_INSERT, text2]];
      }
      if (!text2) {
        return [[DIFF_DELETE, text1]];
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      var i = longtext.indexOf(shorttext);
      if (i !== -1) {
        diffs = [
          [DIFF_INSERT, longtext.substring(0, i)],
          [DIFF_EQUAL, shorttext],
          [DIFF_INSERT, longtext.substring(i + shorttext.length)]
        ];
        if (text1.length > text2.length) {
          diffs[0][0] = diffs[2][0] = DIFF_DELETE;
        }
        return diffs;
      }
      if (shorttext.length === 1) {
        return [
          [DIFF_DELETE, text1],
          [DIFF_INSERT, text2]
        ];
      }
      var hm = diff_halfMatch_(text1, text2);
      if (hm) {
        var text1_a = hm[0];
        var text1_b = hm[1];
        var text2_a = hm[2];
        var text2_b = hm[3];
        var mid_common = hm[4];
        var diffs_a = diff_main(text1_a, text2_a);
        var diffs_b = diff_main(text1_b, text2_b);
        return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
      }
      return diff_bisect_(text1, text2);
    }
    function diff_bisect_(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      var max_d = Math.ceil((text1_length + text2_length) / 2);
      var v_offset = max_d;
      var v_length = 2 * max_d;
      var v1 = new Array(v_length);
      var v2 = new Array(v_length);
      for (var x = 0; x < v_length; x++) {
        v1[x] = -1;
        v2[x] = -1;
      }
      v1[v_offset + 1] = 0;
      v2[v_offset + 1] = 0;
      var delta = text1_length - text2_length;
      var front = delta % 2 !== 0;
      var k1start = 0;
      var k1end = 0;
      var k2start = 0;
      var k2end = 0;
      for (var d = 0; d < max_d; d++) {
        for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
          var k1_offset = v_offset + k1;
          var x1;
          if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
            x1 = v1[k1_offset + 1];
          } else {
            x1 = v1[k1_offset - 1] + 1;
          }
          var y1 = x1 - k1;
          while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
            x1++;
            y1++;
          }
          v1[k1_offset] = x1;
          if (x1 > text1_length) {
            k1end += 2;
          } else if (y1 > text2_length) {
            k1start += 2;
          } else if (front) {
            var k2_offset = v_offset + delta - k1;
            if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
              var x2 = text1_length - v2[k2_offset];
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
        for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
          var k2_offset = v_offset + k2;
          var x2;
          if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
            x2 = v2[k2_offset + 1];
          } else {
            x2 = v2[k2_offset - 1] + 1;
          }
          var y2 = x2 - k2;
          while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
            x2++;
            y2++;
          }
          v2[k2_offset] = x2;
          if (x2 > text1_length) {
            k2end += 2;
          } else if (y2 > text2_length) {
            k2start += 2;
          } else if (!front) {
            var k1_offset = v_offset + delta - k2;
            if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
              var x1 = v1[k1_offset];
              var y1 = v_offset + x1 - k1_offset;
              x2 = text1_length - x2;
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
      }
      return [
        [DIFF_DELETE, text1],
        [DIFF_INSERT, text2]
      ];
    }
    function diff_bisectSplit_(text1, text2, x, y) {
      var text1a = text1.substring(0, x);
      var text2a = text2.substring(0, y);
      var text1b = text1.substring(x);
      var text2b = text2.substring(y);
      var diffs = diff_main(text1a, text2a);
      var diffsb = diff_main(text1b, text2b);
      return diffs.concat(diffsb);
    }
    function diff_commonPrefix(text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerstart = 0;
      while (pointermin < pointermid) {
        if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
          pointermin = pointermid;
          pointerstart = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
        pointermid--;
      }
      return pointermid;
    }
    function diff_commonOverlap_(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      if (text1_length == 0 || text2_length == 0) {
        return 0;
      }
      if (text1_length > text2_length) {
        text1 = text1.substring(text1_length - text2_length);
      } else if (text1_length < text2_length) {
        text2 = text2.substring(0, text1_length);
      }
      var text_length = Math.min(text1_length, text2_length);
      if (text1 == text2) {
        return text_length;
      }
      var best = 0;
      var length = 1;
      while (true) {
        var pattern = text1.substring(text_length - length);
        var found = text2.indexOf(pattern);
        if (found == -1) {
          return best;
        }
        length += found;
        if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
          best = length;
          length++;
        }
      }
    }
    function diff_commonSuffix(text1, text2) {
      if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerend = 0;
      while (pointermin < pointermid) {
        if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
          pointermin = pointermid;
          pointerend = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
        pointermid--;
      }
      return pointermid;
    }
    function diff_halfMatch_(text1, text2) {
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
      }
      function diff_halfMatchI_(longtext2, shorttext2, i) {
        var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
        var j = -1;
        var best_common = "";
        var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
          var prefixLength = diff_commonPrefix(
            longtext2.substring(i),
            shorttext2.substring(j)
          );
          var suffixLength = diff_commonSuffix(
            longtext2.substring(0, i),
            shorttext2.substring(0, j)
          );
          if (best_common.length < suffixLength + prefixLength) {
            best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
            best_longtext_a = longtext2.substring(0, i - suffixLength);
            best_longtext_b = longtext2.substring(i + prefixLength);
            best_shorttext_a = shorttext2.substring(0, j - suffixLength);
            best_shorttext_b = shorttext2.substring(j + prefixLength);
          }
        }
        if (best_common.length * 2 >= longtext2.length) {
          return [
            best_longtext_a,
            best_longtext_b,
            best_shorttext_a,
            best_shorttext_b,
            best_common
          ];
        } else {
          return null;
        }
      }
      var hm1 = diff_halfMatchI_(
        longtext,
        shorttext,
        Math.ceil(longtext.length / 4)
      );
      var hm2 = diff_halfMatchI_(
        longtext,
        shorttext,
        Math.ceil(longtext.length / 2)
      );
      var hm;
      if (!hm1 && !hm2) {
        return null;
      } else if (!hm2) {
        hm = hm1;
      } else if (!hm1) {
        hm = hm2;
      } else {
        hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
      }
      var text1_a, text1_b, text2_a, text2_b;
      if (text1.length > text2.length) {
        text1_a = hm[0];
        text1_b = hm[1];
        text2_a = hm[2];
        text2_b = hm[3];
      } else {
        text2_a = hm[0];
        text2_b = hm[1];
        text1_a = hm[2];
        text1_b = hm[3];
      }
      var mid_common = hm[4];
      return [text1_a, text1_b, text2_a, text2_b, mid_common];
    }
    function diff_cleanupSemantic(diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastequality = null;
      var pointer = 0;
      var length_insertions1 = 0;
      var length_deletions1 = 0;
      var length_insertions2 = 0;
      var length_deletions2 = 0;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL) {
          equalities[equalitiesLength++] = pointer;
          length_insertions1 = length_insertions2;
          length_deletions1 = length_deletions2;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastequality = diffs[pointer][1];
        } else {
          if (diffs[pointer][0] == DIFF_INSERT) {
            length_insertions2 += diffs[pointer][1].length;
          } else {
            length_deletions2 += diffs[pointer][1].length;
          }
          if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(length_insertions2, length_deletions2)) {
            diffs.splice(equalities[equalitiesLength - 1], 0, [
              DIFF_DELETE,
              lastequality
            ]);
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
            equalitiesLength--;
            equalitiesLength--;
            pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            length_insertions1 = 0;
            length_deletions1 = 0;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastequality = null;
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs);
      }
      diff_cleanupSemanticLossless(diffs);
      pointer = 1;
      while (pointer < diffs.length) {
        if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
          var deletion = diffs[pointer - 1][1];
          var insertion = diffs[pointer][1];
          var overlap_length1 = diff_commonOverlap_(deletion, insertion);
          var overlap_length2 = diff_commonOverlap_(insertion, deletion);
          if (overlap_length1 >= overlap_length2) {
            if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
              diffs.splice(pointer, 0, [
                DIFF_EQUAL,
                insertion.substring(0, overlap_length1)
              ]);
              diffs[pointer - 1][1] = deletion.substring(
                0,
                deletion.length - overlap_length1
              );
              diffs[pointer + 1][1] = insertion.substring(overlap_length1);
              pointer++;
            }
          } else {
            if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
              diffs.splice(pointer, 0, [
                DIFF_EQUAL,
                deletion.substring(0, overlap_length2)
              ]);
              diffs[pointer - 1][0] = DIFF_INSERT;
              diffs[pointer - 1][1] = insertion.substring(
                0,
                insertion.length - overlap_length2
              );
              diffs[pointer + 1][0] = DIFF_DELETE;
              diffs[pointer + 1][1] = deletion.substring(overlap_length2);
              pointer++;
            }
          }
          pointer++;
        }
        pointer++;
      }
    }
    var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
    var whitespaceRegex_ = /\s/;
    var linebreakRegex_ = /[\r\n]/;
    var blanklineEndRegex_ = /\n\r?\n$/;
    var blanklineStartRegex_ = /^\r?\n\r?\n/;
    function diff_cleanupSemanticLossless(diffs) {
      function diff_cleanupSemanticScore_(one, two) {
        if (!one || !two) {
          return 6;
        }
        var char1 = one.charAt(one.length - 1);
        var char2 = two.charAt(0);
        var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
        var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
        var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
        var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
        var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
        var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
        var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
        var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
        if (blankLine1 || blankLine2) {
          return 5;
        } else if (lineBreak1 || lineBreak2) {
          return 4;
        } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
          return 3;
        } else if (whitespace1 || whitespace2) {
          return 2;
        } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
          return 1;
        }
        return 0;
      }
      var pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
          var equality1 = diffs[pointer - 1][1];
          var edit = diffs[pointer][1];
          var equality2 = diffs[pointer + 1][1];
          var commonOffset = diff_commonSuffix(equality1, edit);
          if (commonOffset) {
            var commonString = edit.substring(edit.length - commonOffset);
            equality1 = equality1.substring(0, equality1.length - commonOffset);
            edit = commonString + edit.substring(0, edit.length - commonOffset);
            equality2 = commonString + equality2;
          }
          var bestEquality1 = equality1;
          var bestEdit = edit;
          var bestEquality2 = equality2;
          var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
          while (edit.charAt(0) === equality2.charAt(0)) {
            equality1 += edit.charAt(0);
            edit = edit.substring(1) + equality2.charAt(0);
            equality2 = equality2.substring(1);
            var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            if (score >= bestScore) {
              bestScore = score;
              bestEquality1 = equality1;
              bestEdit = edit;
              bestEquality2 = equality2;
            }
          }
          if (diffs[pointer - 1][1] != bestEquality1) {
            if (bestEquality1) {
              diffs[pointer - 1][1] = bestEquality1;
            } else {
              diffs.splice(pointer - 1, 1);
              pointer--;
            }
            diffs[pointer][1] = bestEdit;
            if (bestEquality2) {
              diffs[pointer + 1][1] = bestEquality2;
            } else {
              diffs.splice(pointer + 1, 1);
              pointer--;
            }
          }
        }
        pointer++;
      }
    }
    function diff_cleanupMerge(diffs, fix_unicode) {
      diffs.push([DIFF_EQUAL, ""]);
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          diffs.splice(pointer, 1);
          continue;
        }
        switch (diffs[pointer][0]) {
          case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_EQUAL:
            var previous_equality = pointer - count_insert - count_delete - 1;
            if (fix_unicode) {
              if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
                var stray = diffs[previous_equality][1].slice(-1);
                diffs[previous_equality][1] = diffs[previous_equality][1].slice(
                  0,
                  -1
                );
                text_delete = stray + text_delete;
                text_insert = stray + text_insert;
                if (!diffs[previous_equality][1]) {
                  diffs.splice(previous_equality, 1);
                  pointer--;
                  var k = previous_equality - 1;
                  if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                    count_insert++;
                    text_insert = diffs[k][1] + text_insert;
                    k--;
                  }
                  if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                    count_delete++;
                    text_delete = diffs[k][1] + text_delete;
                    k--;
                  }
                  previous_equality = k;
                }
              }
              if (starts_with_pair_end(diffs[pointer][1])) {
                var stray = diffs[pointer][1].charAt(0);
                diffs[pointer][1] = diffs[pointer][1].slice(1);
                text_delete += stray;
                text_insert += stray;
              }
            }
            if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
              diffs.splice(pointer, 1);
              break;
            }
            if (text_delete.length > 0 || text_insert.length > 0) {
              if (text_delete.length > 0 && text_insert.length > 0) {
                commonlength = diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (previous_equality >= 0) {
                    diffs[previous_equality][1] += text_insert.substring(
                      0,
                      commonlength
                    );
                  } else {
                    diffs.splice(0, 0, [
                      DIFF_EQUAL,
                      text_insert.substring(0, commonlength)
                    ]);
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                  text_insert = text_insert.substring(
                    0,
                    text_insert.length - commonlength
                  );
                  text_delete = text_delete.substring(
                    0,
                    text_delete.length - commonlength
                  );
                }
              }
              var n = count_insert + count_delete;
              if (text_delete.length === 0 && text_insert.length === 0) {
                diffs.splice(pointer - n, n);
                pointer = pointer - n;
              } else if (text_delete.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
                pointer = pointer - n + 1;
              } else if (text_insert.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
                pointer = pointer - n + 1;
              } else {
                diffs.splice(
                  pointer - n,
                  n,
                  [DIFF_DELETE, text_delete],
                  [DIFF_INSERT, text_insert]
                );
                pointer = pointer - n + 2;
              }
            }
            if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
              diffs[pointer - 1][1] += diffs[pointer][1];
              diffs.splice(pointer, 1);
            } else {
              pointer++;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
      }
      if (diffs[diffs.length - 1][1] === "") {
        diffs.pop();
      }
      var changes = false;
      pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
          if (diffs[pointer][1].substring(
            diffs[pointer][1].length - diffs[pointer - 1][1].length
          ) === diffs[pointer - 1][1]) {
            diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(
              0,
              diffs[pointer][1].length - diffs[pointer - 1][1].length
            );
            diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
            diffs.splice(pointer - 1, 1);
            changes = true;
          } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
            diffs[pointer - 1][1] += diffs[pointer + 1][1];
            diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
            diffs.splice(pointer + 1, 1);
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs, fix_unicode);
      }
    }
    function is_surrogate_pair_start(charCode) {
      return charCode >= 55296 && charCode <= 56319;
    }
    function is_surrogate_pair_end(charCode) {
      return charCode >= 56320 && charCode <= 57343;
    }
    function starts_with_pair_end(str) {
      return is_surrogate_pair_end(str.charCodeAt(0));
    }
    function ends_with_pair_start(str) {
      return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
    }
    function remove_empty_tuples(tuples) {
      var ret = [];
      for (var i = 0; i < tuples.length; i++) {
        if (tuples[i][1].length > 0) {
          ret.push(tuples[i]);
        }
      }
      return ret;
    }
    function make_edit_splice(before, oldMiddle, newMiddle, after) {
      if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
        return null;
      }
      return remove_empty_tuples([
        [DIFF_EQUAL, before],
        [DIFF_DELETE, oldMiddle],
        [DIFF_INSERT, newMiddle],
        [DIFF_EQUAL, after]
      ]);
    }
    function find_cursor_edit_diff(oldText, newText, cursor_pos) {
      var oldRange = typeof cursor_pos === "number" ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
      var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
      var oldLength = oldText.length;
      var newLength = newText.length;
      if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
        var oldCursor = oldRange.index;
        var oldBefore = oldText.slice(0, oldCursor);
        var oldAfter = oldText.slice(oldCursor);
        var maybeNewCursor = newRange ? newRange.index : null;
        editBefore: {
          var newCursor = oldCursor + newLength - oldLength;
          if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
            break editBefore;
          }
          if (newCursor < 0 || newCursor > newLength) {
            break editBefore;
          }
          var newBefore = newText.slice(0, newCursor);
          var newAfter = newText.slice(newCursor);
          if (newAfter !== oldAfter) {
            break editBefore;
          }
          var prefixLength = Math.min(oldCursor, newCursor);
          var oldPrefix = oldBefore.slice(0, prefixLength);
          var newPrefix = newBefore.slice(0, prefixLength);
          if (oldPrefix !== newPrefix) {
            break editBefore;
          }
          var oldMiddle = oldBefore.slice(prefixLength);
          var newMiddle = newBefore.slice(prefixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
        }
        editAfter: {
          if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
            break editAfter;
          }
          var cursor = oldCursor;
          var newBefore = newText.slice(0, cursor);
          var newAfter = newText.slice(cursor);
          if (newBefore !== oldBefore) {
            break editAfter;
          }
          var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
          var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
          var newSuffix = newAfter.slice(newAfter.length - suffixLength);
          if (oldSuffix !== newSuffix) {
            break editAfter;
          }
          var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
          var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
          return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
        }
      }
      if (oldRange.length > 0 && newRange && newRange.length === 0) {
        replaceRange: {
          var oldPrefix = oldText.slice(0, oldRange.index);
          var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
          var prefixLength = oldPrefix.length;
          var suffixLength = oldSuffix.length;
          if (newLength < prefixLength + suffixLength) {
            break replaceRange;
          }
          var newPrefix = newText.slice(0, prefixLength);
          var newSuffix = newText.slice(newLength - suffixLength);
          if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
            break replaceRange;
          }
          var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
          var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
        }
      }
      return null;
    }
    function diff(text1, text2, cursor_pos, cleanup) {
      return diff_main(text1, text2, cursor_pos, cleanup, true);
    }
    diff.INSERT = DIFF_INSERT;
    diff.DELETE = DIFF_DELETE;
    diff.EQUAL = DIFF_EQUAL;
    module2.exports = diff;
  }
});

// node_modules/prettier-linter-helpers/index.js
var require_prettier_linter_helpers = __commonJS({
  "node_modules/prettier-linter-helpers/index.js"(exports, module2) {
    "use strict";
    init_esm_shims();
    var diff = require_diff();
    var LINE_ENDING_RE = /\r\n|[\r\n\u2028\u2029]/;
    function showInvisibles2(str) {
      let ret = "";
      for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
          case " ":
            ret += "\xB7";
            break;
          case "\n":
            ret += "\u23CE";
            break;
          case "	":
            ret += "\u21B9";
            break;
          case "\r":
            ret += "\u240D";
            break;
          default:
            ret += str[i];
            break;
        }
      }
      return ret;
    }
    function generateDifferences2(source, prettierSource) {
      const results = diff(source, prettierSource);
      const differences = [];
      const batch = [];
      let offset = 0;
      while (results.length) {
        const result = results.shift();
        const op = result[0];
        const text = result[1];
        switch (op) {
          case diff.INSERT:
          case diff.DELETE:
            batch.push(result);
            break;
          case diff.EQUAL:
            if (results.length) {
              if (batch.length) {
                if (LINE_ENDING_RE.test(text)) {
                  flush();
                  offset += text.length;
                } else {
                  batch.push(result);
                }
              } else {
                offset += text.length;
              }
            }
            break;
          default:
            throw new Error(`Unexpected fast-diff operation "${op}"`);
        }
        if (batch.length && !results.length) {
          flush();
        }
      }
      return differences;
      function flush() {
        let aheadDeleteText = "";
        let aheadInsertText = "";
        while (batch.length) {
          const next = batch.shift();
          const op = next[0];
          const text = next[1];
          switch (op) {
            case diff.INSERT:
              aheadInsertText += text;
              break;
            case diff.DELETE:
              aheadDeleteText += text;
              break;
            case diff.EQUAL:
              aheadDeleteText += text;
              aheadInsertText += text;
              break;
          }
        }
        if (aheadDeleteText && aheadInsertText) {
          differences.push({
            offset,
            operation: generateDifferences2.REPLACE,
            insertText: aheadInsertText,
            deleteText: aheadDeleteText
          });
        } else if (!aheadDeleteText && aheadInsertText) {
          differences.push({
            offset,
            operation: generateDifferences2.INSERT,
            insertText: aheadInsertText
          });
        } else if (aheadDeleteText && !aheadInsertText) {
          differences.push({
            offset,
            operation: generateDifferences2.DELETE,
            deleteText: aheadDeleteText
          });
        }
        offset += aheadDeleteText.length;
      }
    }
    generateDifferences2.INSERT = "insert";
    generateDifferences2.DELETE = "delete";
    generateDifferences2.REPLACE = "replace";
    module2.exports = {
      showInvisibles: showInvisibles2,
      generateDifferences: generateDifferences2
    };
  }
});

// node_modules/eslint-plugin-format/dist/index.mjs
init_esm_shims();

// node_modules/eslint-parser-plain/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  meta: () => meta,
  parseForESLint: () => parseForESLint
});
init_esm_shims();
var name = "eslint-parser-plain";
var version = "0.1.1";
var parseForESLint = (code) => ({
  ast: {
    type: "Program",
    loc: { start: 0, end: code.length },
    range: [0, code.length],
    body: [],
    comments: [],
    tokens: []
  },
  services: { isPlain: true },
  scopeManager: null,
  visitorKeys: {
    Program: []
  }
});
var meta = {
  name,
  version
};

// node_modules/eslint-plugin-format/dist/index.mjs
import { join } from "node:path";

// node_modules/eslint-formatting-reporter/dist/index.mjs
init_esm_shims();
var import_prettier_linter_helpers = __toESM(require_prettier_linter_helpers(), 1);
var { INSERT, DELETE, REPLACE } = import_prettier_linter_helpers.generateDifferences;
var messages = {
  [INSERT]: "Insert `{{ insertText }}`",
  [DELETE]: "Delete `{{ deleteText }}`",
  [REPLACE]: "Replace `{{ deleteText }}` with `{{ insertText }}`"
};
function _reportDifference(context, difference, rangeOffset = 0) {
  const { operation, offset, deleteText = "", insertText = "" } = difference;
  const range = [
    offset + rangeOffset,
    offset + rangeOffset + deleteText.length
  ];
  const [start, end] = range.map((index2) => context.sourceCode.getLocFromIndex(index2));
  context.report({
    messageId: operation,
    data: {
      deleteText: (0, import_prettier_linter_helpers.showInvisibles)(deleteText),
      insertText: (0, import_prettier_linter_helpers.showInvisibles)(insertText)
    },
    loc: { start, end },
    fix: (fixer) => fixer.replaceTextRange(range, insertText)
  });
}
function reportDifferences(context, source, formatted, offset = 0) {
  if (source !== formatted) {
    const differences = (0, import_prettier_linter_helpers.generateDifferences)(source, formatted);
    for (const difference of differences)
      _reportDifference(context, difference, offset);
  }
}

// node_modules/synckit/lib/index.js
init_esm_shims();

// node_modules/tslib/tslib.es6.mjs
init_esm_shims();
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}

// node_modules/synckit/lib/index.js
import { createHash } from "node:crypto";
import fs2 from "node:fs";
import module from "node:module";
import path2 from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { MessageChannel, Worker, parentPort, receiveMessageOnPort, workerData } from "node:worker_threads";

// node_modules/@pkgr/core/lib/constants.js
init_esm_shims();
import { createRequire } from "node:module";
var CWD = process.cwd();
var cjsRequire = typeof __require === "undefined" ? createRequire(import.meta.url) : __require;
var EXTENSIONS = [".ts", ".tsx", ...Object.keys(cjsRequire.extensions)];

// node_modules/@pkgr/core/lib/helpers.js
init_esm_shims();
import fs from "node:fs";
import path from "node:path";
var tryPkg = (pkg) => {
  try {
    return cjsRequire.resolve(pkg);
  } catch (_a) {
  }
};
var isPkgAvailable = (pkg) => !!tryPkg(pkg);
var tryFile = (filename, includeDir = false, base = CWD) => {
  if (typeof filename === "string") {
    const filepath = path.resolve(base, filename);
    return fs.existsSync(filepath) && (includeDir || fs.statSync(filepath).isFile()) ? filepath : "";
  }
  for (const file of filename !== null && filename !== void 0 ? filename : []) {
    const filepath = tryFile(file, includeDir, base);
    if (filepath) {
      return filepath;
    }
  }
  return "";
};
var tryExtensions = (filepath, extensions = EXTENSIONS) => {
  const ext = [...extensions, ""].find((ext2) => tryFile(filepath + ext2));
  return ext == null ? "" : filepath + ext;
};
var findUp = (searchEntry, searchFileOrIncludeDir, includeDir) => {
  console.assert(path.isAbsolute(searchEntry));
  if (!tryFile(searchEntry, true) || searchEntry !== CWD && !searchEntry.startsWith(CWD + path.sep)) {
    return "";
  }
  searchEntry = path.resolve(fs.statSync(searchEntry).isDirectory() ? searchEntry : path.resolve(searchEntry, ".."));
  const isSearchFile = typeof searchFileOrIncludeDir === "string";
  const searchFile = isSearchFile ? searchFileOrIncludeDir : "package.json";
  do {
    const searched = tryFile(path.resolve(searchEntry, searchFile), isSearchFile && includeDir);
    if (searched) {
      return searched;
    }
    searchEntry = path.resolve(searchEntry, "..");
  } while (searchEntry === CWD || searchEntry.startsWith(CWD + path.sep));
  return "";
};

// node_modules/synckit/lib/types.js
init_esm_shims();

// node_modules/synckit/lib/index.js
var INT32_BYTES = 4;
var TsRunner = {
  TsNode: "ts-node",
  EsbuildRegister: "esbuild-register",
  EsbuildRunner: "esbuild-runner",
  SWC: "swc",
  TSX: "tsx"
};
var { NODE_OPTIONS, SYNCKIT_EXEC_ARGV, SYNCKIT_GLOBAL_SHIMS, SYNCKIT_TIMEOUT, SYNCKIT_TS_RUNNER } = process.env;
var IS_NODE_20 = Number(process.versions.node.split(".")[0]) >= 20;
var DEFAULT_TIMEOUT = SYNCKIT_TIMEOUT ? +SYNCKIT_TIMEOUT : void 0;
var DEFAULT_EXEC_ARGV = (SYNCKIT_EXEC_ARGV === null || SYNCKIT_EXEC_ARGV === void 0 ? void 0 : SYNCKIT_EXEC_ARGV.split(",")) || [];
var DEFAULT_TS_RUNNER = SYNCKIT_TS_RUNNER;
var DEFAULT_GLOBAL_SHIMS = ["1", "true"].includes(SYNCKIT_GLOBAL_SHIMS);
var DEFAULT_GLOBAL_SHIMS_PRESET = [
  {
    moduleName: "node-fetch",
    globalName: "fetch"
  },
  {
    moduleName: "node:perf_hooks",
    globalName: "performance",
    named: "performance"
  }
];
var MTS_SUPPORTED_NODE_VERSION = 16;
var syncFnCache;
function createSyncFn(workerPath, timeoutOrOptions) {
  syncFnCache !== null && syncFnCache !== void 0 ? syncFnCache : syncFnCache = /* @__PURE__ */ new Map();
  const cachedSyncFn = syncFnCache.get(workerPath);
  if (cachedSyncFn) {
    return cachedSyncFn;
  }
  if (!path2.isAbsolute(workerPath)) {
    throw new Error("`workerPath` must be absolute");
  }
  const syncFn = startWorkerThread(workerPath, typeof timeoutOrOptions === "number" ? { timeout: timeoutOrOptions } : timeoutOrOptions);
  syncFnCache.set(workerPath, syncFn);
  return syncFn;
}
var cjsRequire2 = typeof __require === "undefined" ? module.createRequire(import.meta.url) : __require;
var dataUrl = (code) => new URL(`data:text/javascript,${encodeURIComponent(code)}`);
var isFile = (path3) => {
  var _a;
  try {
    return !!((_a = fs2.statSync(path3, { throwIfNoEntry: false })) === null || _a === void 0 ? void 0 : _a.isFile());
  } catch (_b) {
    return false;
  }
};
var setupTsRunner = (workerPath, { execArgv, tsRunner }) => {
  let ext = path2.extname(workerPath);
  if (!/[/\\]node_modules[/\\]/.test(workerPath) && (!ext || /^\.[cm]?js$/.test(ext))) {
    const workPathWithoutExt = ext ? workerPath.slice(0, -ext.length) : workerPath;
    let extensions;
    switch (ext) {
      case ".cjs": {
        extensions = [".cts", ".cjs"];
        break;
      }
      case ".mjs": {
        extensions = [".mts", ".mjs"];
        break;
      }
      default: {
        extensions = [".ts", ".js"];
        break;
      }
    }
    const found = tryExtensions(workPathWithoutExt, extensions);
    let differentExt;
    if (found && (!ext || (differentExt = found !== workPathWithoutExt))) {
      workerPath = found;
      if (differentExt) {
        ext = path2.extname(workerPath);
      }
    }
  }
  const isTs = /\.[cm]?ts$/.test(workerPath);
  let jsUseEsm = workerPath.endsWith(".mjs");
  let tsUseEsm = workerPath.endsWith(".mts");
  if (isTs) {
    if (!tsUseEsm) {
      const pkg = findUp(workerPath);
      if (pkg) {
        tsUseEsm = cjsRequire2(pkg).type === "module";
      }
    }
    if (tsRunner == null && isPkgAvailable(TsRunner.TsNode)) {
      tsRunner = TsRunner.TsNode;
    }
    switch (tsRunner) {
      case TsRunner.TsNode: {
        if (tsUseEsm) {
          if (!execArgv.includes("--loader")) {
            execArgv = ["--loader", `${TsRunner.TsNode}/esm`, ...execArgv];
          }
        } else if (!execArgv.includes("-r")) {
          execArgv = ["-r", `${TsRunner.TsNode}/register`, ...execArgv];
        }
        break;
      }
      case TsRunner.EsbuildRegister: {
        if (!execArgv.includes("-r")) {
          execArgv = ["-r", TsRunner.EsbuildRegister, ...execArgv];
        }
        break;
      }
      case TsRunner.EsbuildRunner: {
        if (!execArgv.includes("-r")) {
          execArgv = ["-r", `${TsRunner.EsbuildRunner}/register`, ...execArgv];
        }
        break;
      }
      case TsRunner.SWC: {
        if (!execArgv.includes("-r")) {
          execArgv = ["-r", `@${TsRunner.SWC}-node/register`, ...execArgv];
        }
        break;
      }
      case TsRunner.TSX: {
        if (!execArgv.includes("--loader")) {
          execArgv = ["--loader", TsRunner.TSX, ...execArgv];
        }
        break;
      }
      default: {
        throw new Error(`Unknown ts runner: ${String(tsRunner)}`);
      }
    }
  } else if (!jsUseEsm) {
    const pkg = findUp(workerPath);
    if (pkg) {
      jsUseEsm = cjsRequire2(pkg).type === "module";
    }
  }
  let resolvedPnpLoaderPath;
  if (process.versions.pnp) {
    const nodeOptions = NODE_OPTIONS === null || NODE_OPTIONS === void 0 ? void 0 : NODE_OPTIONS.split(/\s+/);
    let pnpApiPath;
    try {
      pnpApiPath = cjsRequire2.resolve("pnpapi");
    } catch (_a) {
    }
    if (pnpApiPath && !(nodeOptions === null || nodeOptions === void 0 ? void 0 : nodeOptions.some((option, index2) => ["-r", "--require"].includes(option) && pnpApiPath === cjsRequire2.resolve(nodeOptions[index2 + 1]))) && !execArgv.includes(pnpApiPath)) {
      execArgv = ["-r", pnpApiPath, ...execArgv];
      const pnpLoaderPath = path2.resolve(pnpApiPath, "../.pnp.loader.mjs");
      if (isFile(pnpLoaderPath)) {
        resolvedPnpLoaderPath = pathToFileURL(pnpLoaderPath).toString();
        if (!IS_NODE_20) {
          execArgv = [
            "--experimental-loader",
            resolvedPnpLoaderPath,
            ...execArgv
          ];
        }
      }
    }
  }
  return {
    ext,
    isTs,
    jsUseEsm,
    tsRunner,
    tsUseEsm,
    workerPath,
    pnpLoaderPath: resolvedPnpLoaderPath,
    execArgv
  };
};
var md5Hash = (text) => createHash("md5").update(text).digest("hex");
var encodeImportModule = (moduleNameOrGlobalShim, type = "import") => {
  const { moduleName, globalName, named, conditional } = typeof moduleNameOrGlobalShim === "string" ? { moduleName: moduleNameOrGlobalShim } : moduleNameOrGlobalShim;
  const importStatement = type === "import" ? `import${globalName ? " " + (named === null ? "* as " + globalName : (named === null || named === void 0 ? void 0 : named.trim()) ? `{${named}}` : globalName) + " from" : ""} '${path2.isAbsolute(moduleName) ? String(pathToFileURL(moduleName)) : moduleName}'` : `${globalName ? "const " + ((named === null || named === void 0 ? void 0 : named.trim()) ? `{${named}}` : globalName) + "=" : ""}require('${moduleName.replace(/\\/g, "\\\\")}')`;
  if (!globalName) {
    return importStatement;
  }
  const overrideStatement = `globalThis.${globalName}=${(named === null || named === void 0 ? void 0 : named.trim()) ? named : globalName}`;
  return importStatement + (conditional === false ? `;${overrideStatement}` : `;if(!globalThis.${globalName})${overrideStatement}`);
};
var _generateGlobals = (globalShims, type) => globalShims.reduce((acc, shim) => `${acc}${acc ? ";" : ""}${encodeImportModule(shim, type)}`, "");
var globalsCache;
var tmpdir;
var _dirname = typeof __dirname === "undefined" ? path2.dirname(fileURLToPath(import.meta.url)) : __dirname;
var sharedBuffer;
var sharedBufferView;
var generateGlobals = (workerPath, globalShims, type = "import") => {
  globalsCache !== null && globalsCache !== void 0 ? globalsCache : globalsCache = /* @__PURE__ */ new Map();
  const cached = globalsCache.get(workerPath);
  if (cached) {
    const [content2, filepath2] = cached;
    if (type === "require" && !filepath2 || type === "import" && filepath2 && isFile(filepath2)) {
      return content2;
    }
  }
  const globals = _generateGlobals(globalShims, type);
  let content = globals;
  let filepath;
  if (type === "import") {
    if (!tmpdir) {
      tmpdir = path2.resolve(findUp(_dirname), "../node_modules/.synckit");
    }
    fs2.mkdirSync(tmpdir, { recursive: true });
    filepath = path2.resolve(tmpdir, md5Hash(workerPath) + ".mjs");
    content = encodeImportModule(filepath);
    fs2.writeFileSync(filepath, globals);
  }
  globalsCache.set(workerPath, [content, filepath]);
  return content;
};
function startWorkerThread(workerPath, { timeout = DEFAULT_TIMEOUT, execArgv = DEFAULT_EXEC_ARGV, tsRunner = DEFAULT_TS_RUNNER, transferList = [], globalShims = DEFAULT_GLOBAL_SHIMS } = {}) {
  const { port1: mainPort, port2: workerPort } = new MessageChannel();
  const { isTs, ext, jsUseEsm, tsUseEsm, tsRunner: finalTsRunner, workerPath: finalWorkerPath, pnpLoaderPath, execArgv: finalExecArgv } = setupTsRunner(workerPath, { execArgv, tsRunner });
  const workerPathUrl = pathToFileURL(finalWorkerPath);
  if (/\.[cm]ts$/.test(finalWorkerPath)) {
    const isTsxSupported = !tsUseEsm || Number.parseFloat(process.versions.node) >= MTS_SUPPORTED_NODE_VERSION;
    if (!finalTsRunner) {
      throw new Error("No ts runner specified, ts worker path is not supported");
    } else if ([
      TsRunner.EsbuildRegister,
      TsRunner.EsbuildRunner,
      TsRunner.SWC,
      ...isTsxSupported ? [] : [TsRunner.TSX]
    ].includes(finalTsRunner)) {
      throw new Error(`${finalTsRunner} is not supported for ${ext} files yet` + (isTsxSupported ? ", you can try [tsx](https://github.com/esbuild-kit/tsx) instead" : ""));
    }
  }
  const finalGlobalShims = (globalShims === true ? DEFAULT_GLOBAL_SHIMS_PRESET : Array.isArray(globalShims) ? globalShims : []).filter(({ moduleName }) => isPkgAvailable(moduleName));
  sharedBufferView !== null && sharedBufferView !== void 0 ? sharedBufferView : sharedBufferView = new Int32Array(sharedBuffer !== null && sharedBuffer !== void 0 ? sharedBuffer : sharedBuffer = new SharedArrayBuffer(INT32_BYTES), 0, 1);
  const useGlobals = finalGlobalShims.length > 0;
  const useEval = isTs ? !tsUseEsm : !jsUseEsm && useGlobals;
  const worker = new Worker(jsUseEsm && useGlobals || tsUseEsm && finalTsRunner === TsRunner.TsNode ? dataUrl(`${generateGlobals(finalWorkerPath, finalGlobalShims)};import '${String(workerPathUrl)}'`) : useEval ? `${generateGlobals(finalWorkerPath, finalGlobalShims, "require")};${encodeImportModule(finalWorkerPath, "require")}` : workerPathUrl, {
    eval: useEval,
    workerData: { sharedBuffer, workerPort, pnpLoaderPath },
    transferList: [workerPort, ...transferList],
    execArgv: finalExecArgv
  });
  let nextID = 0;
  const receiveMessageWithId = (port, expectedId, waitingTimeout) => {
    const start = Date.now();
    const status = Atomics.wait(sharedBufferView, 0, 0, waitingTimeout);
    Atomics.store(sharedBufferView, 0, 0);
    if (!["ok", "not-equal"].includes(status)) {
      const abortMsg = {
        id: expectedId,
        cmd: "abort"
      };
      port.postMessage(abortMsg);
      throw new Error("Internal error: Atomics.wait() failed: " + status);
    }
    const _a = receiveMessageOnPort(mainPort).message, { id } = _a, message = __rest(_a, ["id"]);
    if (id < expectedId) {
      const waitingTime = Date.now() - start;
      return receiveMessageWithId(port, expectedId, waitingTimeout ? waitingTimeout - waitingTime : void 0);
    }
    if (expectedId !== id) {
      throw new Error(`Internal error: Expected id ${expectedId} but got id ${id}`);
    }
    return Object.assign({ id }, message);
  };
  const syncFn = (...args) => {
    const id = nextID++;
    const msg = { id, args };
    worker.postMessage(msg);
    const { result, error, properties } = receiveMessageWithId(mainPort, id, timeout);
    if (error) {
      throw Object.assign(error, properties);
    }
    return result;
  };
  worker.unref();
  return syncFn;
}

// node_modules/eslint-plugin-format/dist/index.mjs
import { fileURLToPath as fileURLToPath2 } from "node:url";
var dirWorkers = fileURLToPath2(new URL("../workers", import.meta.url));
var format$1;
var dprint = {
  meta: {
    type: "layout",
    docs: {
      description: "Use dprint to format code",
      category: "Stylistic"
    },
    fixable: "whitespace",
    schema: [
      {
        type: "object",
        properties: {
          language: {
            type: "string",
            required: true
          },
          languageOptions: {
            type: "object"
          }
        },
        additionalProperties: true
      }
    ],
    messages
  },
  create(context) {
    if (!format$1)
      format$1 = createSyncFn(join(dirWorkers, "dprint.cjs"));
    return {
      Program() {
        const sourceCode = context.sourceCode.text;
        try {
          const formatted = format$1(sourceCode, context.filename, context.options[0] || {});
          reportDifferences(context, sourceCode, formatted);
        } catch (error) {
          console.error(error);
          context.report({
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: 0 }
            },
            message: `Failed to format the code: ${error}`
          });
        }
      }
    };
  }
};
var format;
var prettier = {
  meta: {
    type: "layout",
    docs: {
      description: "Use Prettier to format code",
      category: "Stylistic"
    },
    fixable: "whitespace",
    schema: [
      {
        type: "object",
        properties: {
          parser: {
            type: "string",
            required: true
          }
        },
        additionalProperties: true
      }
    ],
    messages
  },
  create(context) {
    if (!format)
      format = createSyncFn(join(dirWorkers, "prettier.cjs"));
    return {
      Program() {
        const sourceCode = context.sourceCode.text;
        try {
          const formatted = format(sourceCode, {
            filepath: context.filename,
            ...context.options[0] || {}
          });
          reportDifferences(context, sourceCode, formatted);
        } catch (err) {
          if (!(err instanceof SyntaxError)) {
            context.report({
              loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 0 }
              },
              message: "Failed to format the code"
            });
            return;
          }
          let message = `Parsing error: ${err.message}`;
          const error = err;
          if (error.codeFrame)
            message = message.replace(`
${error.codeFrame}`, "");
          if (error.loc)
            message = message.replace(/ \(\d+:\d+\)$/, "");
          context.report({ message, loc: error.loc });
        }
      }
    };
  }
};
var index = {
  parserPlain: dist_exports,
  rules: {
    prettier,
    dprint
  }
};
export {
  index as default
};
