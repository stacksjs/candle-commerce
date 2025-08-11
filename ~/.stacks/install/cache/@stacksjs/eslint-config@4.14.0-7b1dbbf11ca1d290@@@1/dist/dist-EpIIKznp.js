import module$1, { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";
import path, { join } from "node:path";
import { createHash } from "node:crypto";
import { MessageChannel, Worker, receiveMessageOnPort } from "node:worker_threads";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name$1 in all) __defProp(target, name$1, {
		get: all[name$1],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region node_modules/eslint-parser-plain/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
	meta: () => meta,
	parseForESLint: () => parseForESLint
});
const name = "eslint-parser-plain";
const version = "0.1.1";
const parseForESLint = (code) => ({
	ast: {
		type: "Program",
		loc: {
			start: 0,
			end: code.length
		},
		range: [0, code.length],
		body: [],
		comments: [],
		tokens: []
	},
	services: { isPlain: true },
	scopeManager: null,
	visitorKeys: { Program: [] }
});
const meta = {
	name,
	version
};

//#endregion
//#region node_modules/fast-diff/diff.js
var require_diff = __commonJS({ "node_modules/fast-diff/diff.js"(exports, module) {
	/**
	* This library modifies the diff-patch-match library by Neil Fraser
	* by removing the patch and match functionality and certain advanced
	* options in the diff function. The original license is as follows:
	*
	* ===
	*
	* Diff Match and Patch
	*
	* Copyright 2006 Google Inc.
	* http://code.google.com/p/google-diff-match-patch/
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*   http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	/**
	* The data structure representing a diff is an array of tuples:
	* [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
	* which means: delete 'Hello', add 'Goodbye' and keep ' world.'
	*/
	var DIFF_DELETE = -1;
	var DIFF_INSERT = 1;
	var DIFF_EQUAL = 0;
	/**
	* Find the differences between two texts.  Simplifies the problem by stripping
	* any common prefix or suffix off the texts before diffing.
	* @param {string} text1 Old string to be diffed.
	* @param {string} text2 New string to be diffed.
	* @param {Int|Object} [cursor_pos] Edit position in text1 or object with more info
	* @param {boolean} [cleanup] Apply semantic cleanup before returning.
	* @return {Array} Array of diff tuples.
	*/
	function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
		if (text1 === text2) {
			if (text1) return [[DIFF_EQUAL, text1]];
			return [];
		}
		if (cursor_pos != null) {
			var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
			if (editdiff) return editdiff;
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
		if (commonprefix) diffs.unshift([DIFF_EQUAL, commonprefix]);
		if (commonsuffix) diffs.push([DIFF_EQUAL, commonsuffix]);
		diff_cleanupMerge(diffs, _fix_unicode);
		if (cleanup) diff_cleanupSemantic(diffs);
		return diffs;
	}
	/**
	* Find the differences between two texts.  Assumes that the texts do not
	* have any common prefix or suffix.
	* @param {string} text1 Old string to be diffed.
	* @param {string} text2 New string to be diffed.
	* @return {Array} Array of diff tuples.
	*/
	function diff_compute_(text1, text2) {
		var diffs;
		if (!text1) return [[DIFF_INSERT, text2]];
		if (!text2) return [[DIFF_DELETE, text1]];
		var longtext = text1.length > text2.length ? text1 : text2;
		var shorttext = text1.length > text2.length ? text2 : text1;
		var i = longtext.indexOf(shorttext);
		if (i !== -1) {
			diffs = [
				[DIFF_INSERT, longtext.substring(0, i)],
				[DIFF_EQUAL, shorttext],
				[DIFF_INSERT, longtext.substring(i + shorttext.length)]
			];
			if (text1.length > text2.length) diffs[0][0] = diffs[2][0] = DIFF_DELETE;
			return diffs;
		}
		if (shorttext.length === 1) return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
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
	/**
	* Find the 'middle snake' of a diff, split the problem in two
	* and return the recursively constructed diff.
	* See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
	* @param {string} text1 Old string to be diffed.
	* @param {string} text2 New string to be diffed.
	* @return {Array} Array of diff tuples.
	* @private
	*/
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
				if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) x1 = v1[k1_offset + 1];
				else x1 = v1[k1_offset - 1] + 1;
				var y1 = x1 - k1;
				while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
					x1++;
					y1++;
				}
				v1[k1_offset] = x1;
				if (x1 > text1_length) k1end += 2;
				else if (y1 > text2_length) k1start += 2;
				else if (front) {
					var k2_offset = v_offset + delta - k1;
					if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
						var x2 = text1_length - v2[k2_offset];
						if (x1 >= x2) return diff_bisectSplit_(text1, text2, x1, y1);
					}
				}
			}
			for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
				var k2_offset = v_offset + k2;
				var x2;
				if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) x2 = v2[k2_offset + 1];
				else x2 = v2[k2_offset - 1] + 1;
				var y2 = x2 - k2;
				while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
					x2++;
					y2++;
				}
				v2[k2_offset] = x2;
				if (x2 > text1_length) k2end += 2;
				else if (y2 > text2_length) k2start += 2;
				else if (!front) {
					var k1_offset = v_offset + delta - k2;
					if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
						var x1 = v1[k1_offset];
						var y1 = v_offset + x1 - k1_offset;
						x2 = text1_length - x2;
						if (x1 >= x2) return diff_bisectSplit_(text1, text2, x1, y1);
					}
				}
			}
		}
		return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	}
	/**
	* Given the location of the 'middle snake', split the diff in two parts
	* and recurse.
	* @param {string} text1 Old string to be diffed.
	* @param {string} text2 New string to be diffed.
	* @param {number} x Index of split point in text1.
	* @param {number} y Index of split point in text2.
	* @return {Array} Array of diff tuples.
	*/
	function diff_bisectSplit_(text1, text2, x, y) {
		var text1a = text1.substring(0, x);
		var text2a = text2.substring(0, y);
		var text1b = text1.substring(x);
		var text2b = text2.substring(y);
		var diffs = diff_main(text1a, text2a);
		var diffsb = diff_main(text1b, text2b);
		return diffs.concat(diffsb);
	}
	/**
	* Determine the common prefix of two strings.
	* @param {string} text1 First string.
	* @param {string} text2 Second string.
	* @return {number} The number of characters common to the start of each
	*     string.
	*/
	function diff_commonPrefix(text1, text2) {
		if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) return 0;
		var pointermin = 0;
		var pointermax = Math.min(text1.length, text2.length);
		var pointermid = pointermax;
		var pointerstart = 0;
		while (pointermin < pointermid) {
			if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
				pointermin = pointermid;
				pointerstart = pointermin;
			} else pointermax = pointermid;
			pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
		}
		if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) pointermid--;
		return pointermid;
	}
	/**
	* Determine if the suffix of one string is the prefix of another.
	* @param {string} text1 First string.
	* @param {string} text2 Second string.
	* @return {number} The number of characters common to the end of the first
	*     string and the start of the second string.
	* @private
	*/
	function diff_commonOverlap_(text1, text2) {
		var text1_length = text1.length;
		var text2_length = text2.length;
		if (text1_length == 0 || text2_length == 0) return 0;
		if (text1_length > text2_length) text1 = text1.substring(text1_length - text2_length);
		else if (text1_length < text2_length) text2 = text2.substring(0, text1_length);
		var text_length = Math.min(text1_length, text2_length);
		if (text1 == text2) return text_length;
		var best = 0;
		var length = 1;
		while (true) {
			var pattern = text1.substring(text_length - length);
			var found = text2.indexOf(pattern);
			if (found == -1) return best;
			length += found;
			if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
				best = length;
				length++;
			}
		}
	}
	/**
	* Determine the common suffix of two strings.
	* @param {string} text1 First string.
	* @param {string} text2 Second string.
	* @return {number} The number of characters common to the end of each string.
	*/
	function diff_commonSuffix(text1, text2) {
		if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) return 0;
		var pointermin = 0;
		var pointermax = Math.min(text1.length, text2.length);
		var pointermid = pointermax;
		var pointerend = 0;
		while (pointermin < pointermid) {
			if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
				pointermin = pointermid;
				pointerend = pointermin;
			} else pointermax = pointermid;
			pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
		}
		if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) pointermid--;
		return pointermid;
	}
	/**
	* Do the two texts share a substring which is at least half the length of the
	* longer text?
	* This speedup can produce non-minimal diffs.
	* @param {string} text1 First string.
	* @param {string} text2 Second string.
	* @return {Array.<string>} Five element Array, containing the prefix of
	*     text1, the suffix of text1, the prefix of text2, the suffix of
	*     text2 and the common middle.  Or null if there was no match.
	*/
	function diff_halfMatch_(text1, text2) {
		var longtext = text1.length > text2.length ? text1 : text2;
		var shorttext = text1.length > text2.length ? text2 : text1;
		if (longtext.length < 4 || shorttext.length * 2 < longtext.length) return null;
		/**
		* Does a substring of shorttext exist within longtext such that the substring
		* is at least half the length of longtext?
		* Closure, but does not reference any external variables.
		* @param {string} longtext Longer string.
		* @param {string} shorttext Shorter string.
		* @param {number} i Start index of quarter length substring within longtext.
		* @return {Array.<string>} Five element Array, containing the prefix of
		*     longtext, the suffix of longtext, the prefix of shorttext, the suffix
		*     of shorttext and the common middle.  Or null if there was no match.
		* @private
		*/
		function diff_halfMatchI_(longtext$1, shorttext$1, i) {
			var seed = longtext$1.substring(i, i + Math.floor(longtext$1.length / 4));
			var j = -1;
			var best_common = "";
			var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
			while ((j = shorttext$1.indexOf(seed, j + 1)) !== -1) {
				var prefixLength = diff_commonPrefix(longtext$1.substring(i), shorttext$1.substring(j));
				var suffixLength = diff_commonSuffix(longtext$1.substring(0, i), shorttext$1.substring(0, j));
				if (best_common.length < suffixLength + prefixLength) {
					best_common = shorttext$1.substring(j - suffixLength, j) + shorttext$1.substring(j, j + prefixLength);
					best_longtext_a = longtext$1.substring(0, i - suffixLength);
					best_longtext_b = longtext$1.substring(i + prefixLength);
					best_shorttext_a = shorttext$1.substring(0, j - suffixLength);
					best_shorttext_b = shorttext$1.substring(j + prefixLength);
				}
			}
			if (best_common.length * 2 >= longtext$1.length) return [
				best_longtext_a,
				best_longtext_b,
				best_shorttext_a,
				best_shorttext_b,
				best_common
			];
			else return null;
		}
		var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
		var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
		var hm;
		if (!hm1 && !hm2) return null;
		else if (!hm2) hm = hm1;
		else if (!hm1) hm = hm2;
		else hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
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
		return [
			text1_a,
			text1_b,
			text2_a,
			text2_b,
			mid_common
		];
	}
	/**
	* Reduce the number of edits by eliminating semantically trivial equalities.
	* @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	*/
	function diff_cleanupSemantic(diffs) {
		var changes = false;
		var equalities = [];
		var equalitiesLength = 0;
		/** @type {?string} */
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
				if (diffs[pointer][0] == DIFF_INSERT) length_insertions2 += diffs[pointer][1].length;
				else length_deletions2 += diffs[pointer][1].length;
				if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(length_insertions2, length_deletions2)) {
					diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);
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
		if (changes) diff_cleanupMerge(diffs);
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
						diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
						diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
						diffs[pointer + 1][1] = insertion.substring(overlap_length1);
						pointer++;
					}
				} else if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
					diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
					diffs[pointer - 1][0] = DIFF_INSERT;
					diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
					diffs[pointer + 1][0] = DIFF_DELETE;
					diffs[pointer + 1][1] = deletion.substring(overlap_length2);
					pointer++;
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
	/**
	* Look for single edits surrounded on both sides by equalities
	* which can be shifted sideways to align the edit to a word boundary.
	* e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
	* @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	*/
	function diff_cleanupSemanticLossless(diffs) {
		/**
		* Given two strings, compute a score representing whether the internal
		* boundary falls on logical boundaries.
		* Scores range from 6 (best) to 0 (worst).
		* Closure, but does not reference any external variables.
		* @param {string} one First string.
		* @param {string} two Second string.
		* @return {number} The score.
		* @private
		*/
		function diff_cleanupSemanticScore_(one, two) {
			if (!one || !two) return 6;
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
			if (blankLine1 || blankLine2) return 5;
			else if (lineBreak1 || lineBreak2) return 4;
			else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) return 3;
			else if (whitespace1 || whitespace2) return 2;
			else if (nonAlphaNumeric1 || nonAlphaNumeric2) return 1;
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
					if (bestEquality1) diffs[pointer - 1][1] = bestEquality1;
					else {
						diffs.splice(pointer - 1, 1);
						pointer--;
					}
					diffs[pointer][1] = bestEdit;
					if (bestEquality2) diffs[pointer + 1][1] = bestEquality2;
					else {
						diffs.splice(pointer + 1, 1);
						pointer--;
					}
				}
			}
			pointer++;
		}
	}
	/**
	* Reorder and merge like edit sections.  Merge equalities.
	* Any edit section can move as long as it doesn't cross an equality.
	* @param {Array} diffs Array of diff tuples.
	* @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff
	*/
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
							diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
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
								if (previous_equality >= 0) diffs[previous_equality][1] += text_insert.substring(0, commonlength);
								else {
									diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
									pointer++;
								}
								text_insert = text_insert.substring(commonlength);
								text_delete = text_delete.substring(commonlength);
							}
							commonlength = diff_commonSuffix(text_insert, text_delete);
							if (commonlength !== 0) {
								diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
								text_insert = text_insert.substring(0, text_insert.length - commonlength);
								text_delete = text_delete.substring(0, text_delete.length - commonlength);
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
							diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
							pointer = pointer - n + 2;
						}
					}
					if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
						diffs[pointer - 1][1] += diffs[pointer][1];
						diffs.splice(pointer, 1);
					} else pointer++;
					count_insert = 0;
					count_delete = 0;
					text_delete = "";
					text_insert = "";
					break;
			}
		}
		if (diffs[diffs.length - 1][1] === "") diffs.pop();
		var changes = false;
		pointer = 1;
		while (pointer < diffs.length - 1) {
			if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
				if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
					diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
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
		if (changes) diff_cleanupMerge(diffs, fix_unicode);
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
		for (var i = 0; i < tuples.length; i++) if (tuples[i][1].length > 0) ret.push(tuples[i]);
		return ret;
	}
	function make_edit_splice(before, oldMiddle, newMiddle, after) {
		if (ends_with_pair_start(before) || starts_with_pair_end(after)) return null;
		return remove_empty_tuples([
			[DIFF_EQUAL, before],
			[DIFF_DELETE, oldMiddle],
			[DIFF_INSERT, newMiddle],
			[DIFF_EQUAL, after]
		]);
	}
	function find_cursor_edit_diff(oldText, newText, cursor_pos) {
		var oldRange = typeof cursor_pos === "number" ? {
			index: cursor_pos,
			length: 0
		} : cursor_pos.oldRange;
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
				if (maybeNewCursor !== null && maybeNewCursor !== newCursor) break editBefore;
				if (newCursor < 0 || newCursor > newLength) break editBefore;
				var newBefore = newText.slice(0, newCursor);
				var newAfter = newText.slice(newCursor);
				if (newAfter !== oldAfter) break editBefore;
				var prefixLength = Math.min(oldCursor, newCursor);
				var oldPrefix = oldBefore.slice(0, prefixLength);
				var newPrefix = newBefore.slice(0, prefixLength);
				if (oldPrefix !== newPrefix) break editBefore;
				var oldMiddle = oldBefore.slice(prefixLength);
				var newMiddle = newBefore.slice(prefixLength);
				return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
			}
			editAfter: {
				if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) break editAfter;
				var cursor = oldCursor;
				var newBefore = newText.slice(0, cursor);
				var newAfter = newText.slice(cursor);
				if (newBefore !== oldBefore) break editAfter;
				var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
				var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
				var newSuffix = newAfter.slice(newAfter.length - suffixLength);
				if (oldSuffix !== newSuffix) break editAfter;
				var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
				var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
				return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
			}
		}
		if (oldRange.length > 0 && newRange && newRange.length === 0) replaceRange: {
			var oldPrefix = oldText.slice(0, oldRange.index);
			var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
			var prefixLength = oldPrefix.length;
			var suffixLength = oldSuffix.length;
			if (newLength < prefixLength + suffixLength) break replaceRange;
			var newPrefix = newText.slice(0, prefixLength);
			var newSuffix = newText.slice(newLength - suffixLength);
			if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) break replaceRange;
			var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
			var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
			return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
		}
		return null;
	}
	function diff$1(text1, text2, cursor_pos, cleanup) {
		return diff_main(text1, text2, cursor_pos, cleanup, true);
	}
	diff$1.INSERT = DIFF_INSERT;
	diff$1.DELETE = DIFF_DELETE;
	diff$1.EQUAL = DIFF_EQUAL;
	module.exports = diff$1;
} });

//#endregion
//#region node_modules/prettier-linter-helpers/index.js
var require_prettier_linter_helpers = __commonJS({ "node_modules/prettier-linter-helpers/index.js"(exports, module) {
	const diff = require_diff();
	const LINE_ENDING_RE = /\r\n|[\r\n\u2028\u2029]/;
	/**
	* Converts invisible characters to a commonly recognizable visible form.
	* @param {string} str - The string with invisibles to convert.
	* @returns {string} The converted string.
	*/
	function showInvisibles$1(str) {
		let ret = "";
		for (let i = 0; i < str.length; i++) switch (str[i]) {
			case " ":
				ret += "·";
				break;
			case "\n":
				ret += "⏎";
				break;
			case "	":
				ret += "↹";
				break;
			case "\r":
				ret += "␍";
				break;
			default:
				ret += str[i];
				break;
		}
		return ret;
	}
	/**
	* Generate results for differences between source code and formatted version.
	*
	* @param {string} source - The original source.
	* @param {string} prettierSource - The Prettier formatted source.
	* @returns {Array} - An array containing { operation, offset, insertText, deleteText }
	*/
	function generateDifferences$1(source, prettierSource) {
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
					if (results.length) if (batch.length) if (LINE_ENDING_RE.test(text)) {
						flush();
						offset += text.length;
					} else batch.push(result);
					else offset += text.length;
					break;
				default: throw new Error(`Unexpected fast-diff operation "${op}"`);
			}
			if (batch.length && !results.length) flush();
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
			if (aheadDeleteText && aheadInsertText) differences.push({
				offset,
				operation: generateDifferences$1.REPLACE,
				insertText: aheadInsertText,
				deleteText: aheadDeleteText
			});
			else if (!aheadDeleteText && aheadInsertText) differences.push({
				offset,
				operation: generateDifferences$1.INSERT,
				insertText: aheadInsertText
			});
			else if (aheadDeleteText && !aheadInsertText) differences.push({
				offset,
				operation: generateDifferences$1.DELETE,
				deleteText: aheadDeleteText
			});
			offset += aheadDeleteText.length;
		}
	}
	generateDifferences$1.INSERT = "insert";
	generateDifferences$1.DELETE = "delete";
	generateDifferences$1.REPLACE = "replace";
	module.exports = {
		showInvisibles: showInvisibles$1,
		generateDifferences: generateDifferences$1
	};
} });

//#endregion
//#region node_modules/eslint-formatting-reporter/dist/index.mjs
var import_prettier_linter_helpers = __toESM(require_prettier_linter_helpers(), 1);
const { INSERT, DELETE, REPLACE } = import_prettier_linter_helpers.generateDifferences;
const messages = {
	[INSERT]: "Insert `{{ insertText }}`",
	[DELETE]: "Delete `{{ deleteText }}`",
	[REPLACE]: "Replace `{{ deleteText }}` with `{{ insertText }}`"
};
function _reportDifference(context, difference, rangeOffset = 0) {
	const { operation, offset, deleteText = "", insertText = "" } = difference;
	const range = [offset + rangeOffset, offset + rangeOffset + deleteText.length];
	const [start, end] = range.map((index$1) => context.sourceCode.getLocFromIndex(index$1));
	context.report({
		messageId: operation,
		data: {
			deleteText: (0, import_prettier_linter_helpers.showInvisibles)(deleteText),
			insertText: (0, import_prettier_linter_helpers.showInvisibles)(insertText)
		},
		loc: {
			start,
			end
		},
		fix: (fixer) => fixer.replaceTextRange(range, insertText)
	});
}
function reportDifferences(context, source, formatted, offset = 0) {
	if (source !== formatted) {
		const differences = (0, import_prettier_linter_helpers.generateDifferences)(source, formatted);
		for (const difference of differences) _reportDifference(context, difference, offset);
	}
}

//#endregion
//#region node_modules/tsdown/esm-shims.js
const getFilename = () => fileURLToPath(import.meta.url);
const getDirname = () => path.dirname(getFilename());
const __dirname = /* @__PURE__ */ getDirname();

//#endregion
//#region node_modules/tslib/tslib.js
var require_tslib = __commonJS({ "node_modules/tslib/tslib.js"(exports, module) {
	/******************************************************************************
	
	Copyright (c) Microsoft Corporation.
	
	
	
	Permission to use, copy, modify, and/or distribute this software for any
	
	purpose with or without fee is hereby granted.
	
	
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	
	PERFORMANCE OF THIS SOFTWARE.
	
	***************************************************************************** */
	var __extends$1;
	var __assign$1;
	var __rest$1;
	var __decorate$1;
	var __param$1;
	var __esDecorate$1;
	var __runInitializers$1;
	var __propKey$1;
	var __setFunctionName$1;
	var __metadata$1;
	var __awaiter$1;
	var __generator$1;
	var __exportStar$1;
	var __values$1;
	var __read$1;
	var __spread$1;
	var __spreadArrays$1;
	var __spreadArray$1;
	var __await$1;
	var __asyncGenerator$1;
	var __asyncDelegator$1;
	var __asyncValues$1;
	var __makeTemplateObject$1;
	var __importStar$1;
	var __importDefault$1;
	var __classPrivateFieldGet$1;
	var __classPrivateFieldSet$1;
	var __classPrivateFieldIn$1;
	var __createBinding$1;
	var __addDisposableResource$1;
	var __disposeResources$1;
	var __rewriteRelativeImportExtension$1;
	(function(factory) {
		var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
		if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(exports) {
			factory(createExporter(root, createExporter(exports)));
		});
		else if (typeof module === "object" && typeof module.exports === "object") factory(createExporter(root, createExporter(module.exports)));
		else factory(createExporter(root));
		function createExporter(exports, previous) {
			if (exports !== root) if (typeof Object.create === "function") Object.defineProperty(exports, "__esModule", { value: true });
			else exports.__esModule = true;
			return function(id, v) {
				return exports[id] = previous ? previous(id, v) : v;
			};
		}
	})(function(exporter) {
		var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		__extends$1 = function(d, b) {
			if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		__assign$1 = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		__rest$1 = function(s, e) {
			var t = {};
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
			if (s != null && typeof Object.getOwnPropertySymbols === "function") {
				for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
			}
			return t;
		};
		__decorate$1 = function(decorators, target, key, desc) {
			var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
			if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
			else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
			return c > 3 && r && Object.defineProperty(target, key, r), r;
		};
		__param$1 = function(paramIndex, decorator) {
			return function(target, key) {
				decorator(target, key, paramIndex);
			};
		};
		__esDecorate$1 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
			function accept(f) {
				if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
				return f;
			}
			var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
			var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
			var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
			var _, done = false;
			for (var i = decorators.length - 1; i >= 0; i--) {
				var context = {};
				for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
				for (var p in contextIn.access) context.access[p] = contextIn.access[p];
				context.addInitializer = function(f) {
					if (done) throw new TypeError("Cannot add initializers after decoration has completed");
					extraInitializers.push(accept(f || null));
				};
				var result = (0, decorators[i])(kind === "accessor" ? {
					get: descriptor.get,
					set: descriptor.set
				} : descriptor[key], context);
				if (kind === "accessor") {
					if (result === void 0) continue;
					if (result === null || typeof result !== "object") throw new TypeError("Object expected");
					if (_ = accept(result.get)) descriptor.get = _;
					if (_ = accept(result.set)) descriptor.set = _;
					if (_ = accept(result.init)) initializers.unshift(_);
				} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
				else descriptor[key] = _;
			}
			if (target) Object.defineProperty(target, contextIn.name, descriptor);
			done = true;
		};
		__runInitializers$1 = function(thisArg, initializers, value) {
			var useValue = arguments.length > 2;
			for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
			return useValue ? value : void 0;
		};
		__propKey$1 = function(x) {
			return typeof x === "symbol" ? x : "".concat(x);
		};
		__setFunctionName$1 = function(f, name$1, prefix) {
			if (typeof name$1 === "symbol") name$1 = name$1.description ? "[".concat(name$1.description, "]") : "";
			return Object.defineProperty(f, "name", {
				configurable: true,
				value: prefix ? "".concat(prefix, " ", name$1) : name$1
			});
		};
		__metadata$1 = function(metadataKey, metadataValue) {
			if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
		};
		__awaiter$1 = function(thisArg, _arguments, P, generator) {
			function adopt(value) {
				return value instanceof P ? value : new P(function(resolve) {
					resolve(value);
				});
			}
			return new (P || (P = Promise))(function(resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch (e) {
						reject(e);
					}
				}
				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch (e) {
						reject(e);
					}
				}
				function step(result) {
					result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
				}
				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
		};
		__generator$1 = function(thisArg, body) {
			var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: []
			}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
			return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
				return this;
			}), g;
			function verb(n) {
				return function(v) {
					return step([n, v]);
				};
			}
			function step(op) {
				if (f) throw new TypeError("Generator is already executing.");
				while (g && (g = 0, op[0] && (_ = 0)), _) try {
					if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
					if (y = 0, t) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return {
								value: op[1],
								done: false
							};
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
				if (op[0] & 5) throw op[1];
				return {
					value: op[0] ? op[1] : void 0,
					done: true
				};
			}
		};
		__exportStar$1 = function(m, o) {
			for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding$1(o, m, p);
		};
		__createBinding$1 = Object.create ? function(o, m, k, k2) {
			if (k2 === void 0) k2 = k;
			var desc = Object.getOwnPropertyDescriptor(m, k);
			if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
			Object.defineProperty(o, k2, desc);
		} : function(o, m, k, k2) {
			if (k2 === void 0) k2 = k;
			o[k2] = m[k];
		};
		__values$1 = function(o) {
			var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
			if (m) return m.call(o);
			if (o && typeof o.length === "number") return { next: function() {
				if (o && i >= o.length) o = void 0;
				return {
					value: o && o[i++],
					done: !o
				};
			} };
			throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
		};
		__read$1 = function(o, n) {
			var m = typeof Symbol === "function" && o[Symbol.iterator];
			if (!m) return o;
			var i = m.call(o), r, ar = [], e;
			try {
				while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
			} catch (error) {
				e = { error };
			} finally {
				try {
					if (r && !r.done && (m = i["return"])) m.call(i);
				} finally {
					if (e) throw e.error;
				}
			}
			return ar;
		};
		/** @deprecated */
		__spread$1 = function() {
			for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
			return ar;
		};
		/** @deprecated */
		__spreadArrays$1 = function() {
			for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
			for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
			return r;
		};
		__spreadArray$1 = function(to, from, pack) {
			if (pack || arguments.length === 2) {
				for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i);
					ar[i] = from[i];
				}
			}
			return to.concat(ar || Array.prototype.slice.call(from));
		};
		__await$1 = function(v) {
			return this instanceof __await$1 ? (this.v = v, this) : new __await$1(v);
		};
		__asyncGenerator$1 = function(thisArg, _arguments, generator) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var g = generator.apply(thisArg, _arguments || []), i, q = [];
			return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
				return this;
			}, i;
			function awaitReturn(f) {
				return function(v) {
					return Promise.resolve(v).then(f, reject);
				};
			}
			function verb(n, f) {
				if (g[n]) {
					i[n] = function(v) {
						return new Promise(function(a, b) {
							q.push([
								n,
								v,
								a,
								b
							]) > 1 || resume(n, v);
						});
					};
					if (f) i[n] = f(i[n]);
				}
			}
			function resume(n, v) {
				try {
					step(g[n](v));
				} catch (e) {
					settle(q[0][3], e);
				}
			}
			function step(r) {
				r.value instanceof __await$1 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
			}
			function fulfill(value) {
				resume("next", value);
			}
			function reject(value) {
				resume("throw", value);
			}
			function settle(f, v) {
				if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
			}
		};
		__asyncDelegator$1 = function(o) {
			var i, p;
			return i = {}, verb("next"), verb("throw", function(e) {
				throw e;
			}), verb("return"), i[Symbol.iterator] = function() {
				return this;
			}, i;
			function verb(n, f) {
				i[n] = o[n] ? function(v) {
					return (p = !p) ? {
						value: __await$1(o[n](v)),
						done: false
					} : f ? f(v) : v;
				} : f;
			}
		};
		__asyncValues$1 = function(o) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var m = o[Symbol.asyncIterator], i;
			return m ? m.call(o) : (o = typeof __values$1 === "function" ? __values$1(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
				return this;
			}, i);
			function verb(n) {
				i[n] = o[n] && function(v) {
					return new Promise(function(resolve, reject) {
						v = o[n](v), settle(resolve, reject, v.done, v.value);
					});
				};
			}
			function settle(resolve, reject, d, v) {
				Promise.resolve(v).then(function(v$1) {
					resolve({
						value: v$1,
						done: d
					});
				}, reject);
			}
		};
		__makeTemplateObject$1 = function(cooked, raw) {
			if (Object.defineProperty) Object.defineProperty(cooked, "raw", { value: raw });
			else cooked.raw = raw;
			return cooked;
		};
		var __setModuleDefault = Object.create ? function(o, v) {
			Object.defineProperty(o, "default", {
				enumerable: true,
				value: v
			});
		} : function(o, v) {
			o["default"] = v;
		};
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o$1) {
				var ar = [];
				for (var k in o$1) if (Object.prototype.hasOwnProperty.call(o$1, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		__importStar$1 = function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding$1(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
		__importDefault$1 = function(mod) {
			return mod && mod.__esModule ? mod : { "default": mod };
		};
		__classPrivateFieldGet$1 = function(receiver, state, kind, f) {
			if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
			if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
			return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
		};
		__classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
			if (kind === "m") throw new TypeError("Private method is not writable");
			if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
			if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
			return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
		};
		__classPrivateFieldIn$1 = function(state, receiver) {
			if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
			return typeof state === "function" ? receiver === state : state.has(receiver);
		};
		__addDisposableResource$1 = function(env, value, async) {
			if (value !== null && value !== void 0) {
				if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
				var dispose, inner;
				if (async) {
					if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
					dispose = value[Symbol.asyncDispose];
				}
				if (dispose === void 0) {
					if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
					dispose = value[Symbol.dispose];
					if (async) inner = dispose;
				}
				if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
				if (inner) dispose = function() {
					try {
						inner.call(this);
					} catch (e) {
						return Promise.reject(e);
					}
				};
				env.stack.push({
					value,
					dispose,
					async
				});
			} else if (async) env.stack.push({ async: true });
			return value;
		};
		var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
			var e = new Error(message);
			return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
		};
		__disposeResources$1 = function(env) {
			function fail(e) {
				env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
				env.hasError = true;
			}
			var r, s = 0;
			function next() {
				while (r = env.stack.pop()) try {
					if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
					if (r.dispose) {
						var result = r.dispose.call(r.value);
						if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
							fail(e);
							return next();
						});
					} else s |= 1;
				} catch (e) {
					fail(e);
				}
				if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
				if (env.hasError) throw env.error;
			}
			return next();
		};
		__rewriteRelativeImportExtension$1 = function(path$1, preserveJsx) {
			if (typeof path$1 === "string" && /^\.\.?\//.test(path$1)) return path$1.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
				return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
			});
			return path$1;
		};
		exporter("__extends", __extends$1);
		exporter("__assign", __assign$1);
		exporter("__rest", __rest$1);
		exporter("__decorate", __decorate$1);
		exporter("__param", __param$1);
		exporter("__esDecorate", __esDecorate$1);
		exporter("__runInitializers", __runInitializers$1);
		exporter("__propKey", __propKey$1);
		exporter("__setFunctionName", __setFunctionName$1);
		exporter("__metadata", __metadata$1);
		exporter("__awaiter", __awaiter$1);
		exporter("__generator", __generator$1);
		exporter("__exportStar", __exportStar$1);
		exporter("__createBinding", __createBinding$1);
		exporter("__values", __values$1);
		exporter("__read", __read$1);
		exporter("__spread", __spread$1);
		exporter("__spreadArrays", __spreadArrays$1);
		exporter("__spreadArray", __spreadArray$1);
		exporter("__await", __await$1);
		exporter("__asyncGenerator", __asyncGenerator$1);
		exporter("__asyncDelegator", __asyncDelegator$1);
		exporter("__asyncValues", __asyncValues$1);
		exporter("__makeTemplateObject", __makeTemplateObject$1);
		exporter("__importStar", __importStar$1);
		exporter("__importDefault", __importDefault$1);
		exporter("__classPrivateFieldGet", __classPrivateFieldGet$1);
		exporter("__classPrivateFieldSet", __classPrivateFieldSet$1);
		exporter("__classPrivateFieldIn", __classPrivateFieldIn$1);
		exporter("__addDisposableResource", __addDisposableResource$1);
		exporter("__disposeResources", __disposeResources$1);
		exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension$1);
	});
} });

//#endregion
//#region node_modules/tslib/modules/index.js
var import_tslib = __toESM(require_tslib());
const { __extends, __assign, __rest, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources, __rewriteRelativeImportExtension } = import_tslib.default;

//#endregion
//#region node_modules/@pkgr/core/lib/constants.js
const CWD = process.cwd();
const cjsRequire$1 = typeof __require === "undefined" ? createRequire(import.meta.url) : __require;
const EXTENSIONS = [
	".ts",
	".tsx",
	...Object.keys(cjsRequire$1.extensions)
];

//#endregion
//#region node_modules/@pkgr/core/lib/helpers.js
const tryPkg = (pkg) => {
	try {
		return cjsRequire$1.resolve(pkg);
	} catch (_a) {}
};
const isPkgAvailable = (pkg) => !!tryPkg(pkg);
const tryFile = (filename, includeDir = false, base = CWD) => {
	if (typeof filename === "string") {
		const filepath = path.resolve(base, filename);
		return fs.existsSync(filepath) && (includeDir || fs.statSync(filepath).isFile()) ? filepath : "";
	}
	for (const file of filename !== null && filename !== void 0 ? filename : []) {
		const filepath = tryFile(file, includeDir, base);
		if (filepath) return filepath;
	}
	return "";
};
const tryExtensions = (filepath, extensions = EXTENSIONS) => {
	const ext = [...extensions, ""].find((ext$1) => tryFile(filepath + ext$1));
	return ext == null ? "" : filepath + ext;
};
const findUp = (searchEntry, searchFileOrIncludeDir, includeDir) => {
	console.assert(path.isAbsolute(searchEntry));
	if (!tryFile(searchEntry, true) || searchEntry !== CWD && !searchEntry.startsWith(CWD + path.sep)) return "";
	searchEntry = path.resolve(fs.statSync(searchEntry).isDirectory() ? searchEntry : path.resolve(searchEntry, ".."));
	const isSearchFile = typeof searchFileOrIncludeDir === "string";
	const searchFile = isSearchFile ? searchFileOrIncludeDir : "package.json";
	do {
		const searched = tryFile(path.resolve(searchEntry, searchFile), isSearchFile && includeDir);
		if (searched) return searched;
		searchEntry = path.resolve(searchEntry, "..");
	} while (searchEntry === CWD || searchEntry.startsWith(CWD + path.sep));
	return "";
};

//#endregion
//#region node_modules/synckit/lib/index.js
const INT32_BYTES = 4;
const TsRunner = {
	TsNode: "ts-node",
	EsbuildRegister: "esbuild-register",
	EsbuildRunner: "esbuild-runner",
	SWC: "swc",
	TSX: "tsx"
};
const { NODE_OPTIONS, SYNCKIT_EXEC_ARGV, SYNCKIT_GLOBAL_SHIMS, SYNCKIT_TIMEOUT, SYNCKIT_TS_RUNNER } = process.env;
const IS_NODE_20 = Number(process.versions.node.split(".")[0]) >= 20;
const DEFAULT_TIMEOUT = SYNCKIT_TIMEOUT ? +SYNCKIT_TIMEOUT : void 0;
const DEFAULT_EXEC_ARGV = (SYNCKIT_EXEC_ARGV === null || SYNCKIT_EXEC_ARGV === void 0 ? void 0 : SYNCKIT_EXEC_ARGV.split(",")) || [];
const DEFAULT_TS_RUNNER = SYNCKIT_TS_RUNNER;
const DEFAULT_GLOBAL_SHIMS = ["1", "true"].includes(SYNCKIT_GLOBAL_SHIMS);
const DEFAULT_GLOBAL_SHIMS_PRESET = [{
	moduleName: "node-fetch",
	globalName: "fetch"
}, {
	moduleName: "node:perf_hooks",
	globalName: "performance",
	named: "performance"
}];
const MTS_SUPPORTED_NODE_VERSION = 16;
let syncFnCache;
function createSyncFn(workerPath, timeoutOrOptions) {
	syncFnCache !== null && syncFnCache !== void 0 || (syncFnCache = new Map());
	const cachedSyncFn = syncFnCache.get(workerPath);
	if (cachedSyncFn) return cachedSyncFn;
	if (!path.isAbsolute(workerPath)) throw new Error("`workerPath` must be absolute");
	const syncFn = startWorkerThread(workerPath, typeof timeoutOrOptions === "number" ? { timeout: timeoutOrOptions } : timeoutOrOptions);
	syncFnCache.set(workerPath, syncFn);
	return syncFn;
}
const cjsRequire = typeof __require === "undefined" ? module$1.createRequire(import.meta.url) : __require;
const dataUrl = (code) => new URL(`data:text/javascript,${encodeURIComponent(code)}`);
const isFile = (path$1) => {
	var _a;
	try {
		return !!((_a = fs.statSync(path$1, { throwIfNoEntry: false })) === null || _a === void 0 ? void 0 : _a.isFile());
	} catch (_b) {
		return false;
	}
};
const setupTsRunner = (workerPath, { execArgv, tsRunner }) => {
	let ext = path.extname(workerPath);
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
			if (differentExt) ext = path.extname(workerPath);
		}
	}
	const isTs = /\.[cm]?ts$/.test(workerPath);
	let jsUseEsm = workerPath.endsWith(".mjs");
	let tsUseEsm = workerPath.endsWith(".mts");
	if (isTs) {
		if (!tsUseEsm) {
			const pkg = findUp(workerPath);
			if (pkg) tsUseEsm = cjsRequire(pkg).type === "module";
		}
		if (tsRunner == null && isPkgAvailable(TsRunner.TsNode)) tsRunner = TsRunner.TsNode;
		switch (tsRunner) {
			case TsRunner.TsNode: {
				if (tsUseEsm) {
					if (!execArgv.includes("--loader")) execArgv = [
						"--loader",
						`${TsRunner.TsNode}/esm`,
						...execArgv
					];
				} else if (!execArgv.includes("-r")) execArgv = [
					"-r",
					`${TsRunner.TsNode}/register`,
					...execArgv
				];
				break;
			}
			case TsRunner.EsbuildRegister: {
				if (!execArgv.includes("-r")) execArgv = [
					"-r",
					TsRunner.EsbuildRegister,
					...execArgv
				];
				break;
			}
			case TsRunner.EsbuildRunner: {
				if (!execArgv.includes("-r")) execArgv = [
					"-r",
					`${TsRunner.EsbuildRunner}/register`,
					...execArgv
				];
				break;
			}
			case TsRunner.SWC: {
				if (!execArgv.includes("-r")) execArgv = [
					"-r",
					`@${TsRunner.SWC}-node/register`,
					...execArgv
				];
				break;
			}
			case TsRunner.TSX: {
				if (!execArgv.includes("--loader")) execArgv = [
					"--loader",
					TsRunner.TSX,
					...execArgv
				];
				break;
			}
			default: throw new Error(`Unknown ts runner: ${String(tsRunner)}`);
		}
	} else if (!jsUseEsm) {
		const pkg = findUp(workerPath);
		if (pkg) jsUseEsm = cjsRequire(pkg).type === "module";
	}
	let resolvedPnpLoaderPath;
	if (process.versions.pnp) {
		const nodeOptions = NODE_OPTIONS === null || NODE_OPTIONS === void 0 ? void 0 : NODE_OPTIONS.split(/\s+/);
		let pnpApiPath;
		try {
			pnpApiPath = cjsRequire.resolve("pnpapi");
		} catch (_a) {}
		if (pnpApiPath && !(nodeOptions === null || nodeOptions === void 0 ? void 0 : nodeOptions.some((option, index$1) => ["-r", "--require"].includes(option) && pnpApiPath === cjsRequire.resolve(nodeOptions[index$1 + 1]))) && !execArgv.includes(pnpApiPath)) {
			execArgv = [
				"-r",
				pnpApiPath,
				...execArgv
			];
			const pnpLoaderPath = path.resolve(pnpApiPath, "../.pnp.loader.mjs");
			if (isFile(pnpLoaderPath)) {
				resolvedPnpLoaderPath = pathToFileURL(pnpLoaderPath).toString();
				if (!IS_NODE_20) execArgv = [
					"--experimental-loader",
					resolvedPnpLoaderPath,
					...execArgv
				];
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
const md5Hash = (text) => createHash("md5").update(text).digest("hex");
const encodeImportModule = (moduleNameOrGlobalShim, type = "import") => {
	const { moduleName, globalName, named, conditional } = typeof moduleNameOrGlobalShim === "string" ? { moduleName: moduleNameOrGlobalShim } : moduleNameOrGlobalShim;
	const importStatement = type === "import" ? `import${globalName ? " " + (named === null ? "* as " + globalName : (named === null || named === void 0 ? void 0 : named.trim()) ? `{${named}}` : globalName) + " from" : ""} '${path.isAbsolute(moduleName) ? String(pathToFileURL(moduleName)) : moduleName}'` : `${globalName ? "const " + ((named === null || named === void 0 ? void 0 : named.trim()) ? `{${named}}` : globalName) + "=" : ""}require('${moduleName.replace(/\\/g, "\\\\")}')`;
	if (!globalName) return importStatement;
	const overrideStatement = `globalThis.${globalName}=${(named === null || named === void 0 ? void 0 : named.trim()) ? named : globalName}`;
	return importStatement + (conditional === false ? `;${overrideStatement}` : `;if(!globalThis.${globalName})${overrideStatement}`);
};
const _generateGlobals = (globalShims, type) => globalShims.reduce((acc, shim) => `${acc}${acc ? ";" : ""}${encodeImportModule(shim, type)}`, "");
let globalsCache;
let tmpdir;
const _dirname = typeof __dirname === "undefined" ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;
let sharedBuffer;
let sharedBufferView;
const generateGlobals = (workerPath, globalShims, type = "import") => {
	globalsCache !== null && globalsCache !== void 0 || (globalsCache = new Map());
	const cached = globalsCache.get(workerPath);
	if (cached) {
		const [content$1, filepath$1] = cached;
		if (type === "require" && !filepath$1 || type === "import" && filepath$1 && isFile(filepath$1)) return content$1;
	}
	const globals = _generateGlobals(globalShims, type);
	let content = globals;
	let filepath;
	if (type === "import") {
		if (!tmpdir) tmpdir = path.resolve(findUp(_dirname), "../node_modules/.synckit");
		fs.mkdirSync(tmpdir, { recursive: true });
		filepath = path.resolve(tmpdir, md5Hash(workerPath) + ".mjs");
		content = encodeImportModule(filepath);
		fs.writeFileSync(filepath, globals);
	}
	globalsCache.set(workerPath, [content, filepath]);
	return content;
};
function startWorkerThread(workerPath, { timeout = DEFAULT_TIMEOUT, execArgv = DEFAULT_EXEC_ARGV, tsRunner = DEFAULT_TS_RUNNER, transferList = [], globalShims = DEFAULT_GLOBAL_SHIMS } = {}) {
	const { port1: mainPort, port2: workerPort } = new MessageChannel();
	const { isTs, ext, jsUseEsm, tsUseEsm, tsRunner: finalTsRunner, workerPath: finalWorkerPath, pnpLoaderPath, execArgv: finalExecArgv } = setupTsRunner(workerPath, {
		execArgv,
		tsRunner
	});
	const workerPathUrl = pathToFileURL(finalWorkerPath);
	if (/\.[cm]ts$/.test(finalWorkerPath)) {
		const isTsxSupported = !tsUseEsm || Number.parseFloat(process.versions.node) >= MTS_SUPPORTED_NODE_VERSION;
		if (!finalTsRunner) throw new Error("No ts runner specified, ts worker path is not supported");
		else if ([
			TsRunner.EsbuildRegister,
			TsRunner.EsbuildRunner,
			TsRunner.SWC,
			...isTsxSupported ? [] : [TsRunner.TSX]
		].includes(finalTsRunner)) throw new Error(`${finalTsRunner} is not supported for ${ext} files yet` + (isTsxSupported ? ", you can try [tsx](https://github.com/esbuild-kit/tsx) instead" : ""));
	}
	const finalGlobalShims = (globalShims === true ? DEFAULT_GLOBAL_SHIMS_PRESET : Array.isArray(globalShims) ? globalShims : []).filter(({ moduleName }) => isPkgAvailable(moduleName));
	sharedBufferView !== null && sharedBufferView !== void 0 || (sharedBufferView = new Int32Array(sharedBuffer !== null && sharedBuffer !== void 0 ? sharedBuffer : sharedBuffer = new SharedArrayBuffer(INT32_BYTES), 0, 1));
	const useGlobals = finalGlobalShims.length > 0;
	const useEval = isTs ? !tsUseEsm : !jsUseEsm && useGlobals;
	const worker = new Worker(jsUseEsm && useGlobals || tsUseEsm && finalTsRunner === TsRunner.TsNode ? dataUrl(`${generateGlobals(finalWorkerPath, finalGlobalShims)};import '${String(workerPathUrl)}'`) : useEval ? `${generateGlobals(finalWorkerPath, finalGlobalShims, "require")};${encodeImportModule(finalWorkerPath, "require")}` : workerPathUrl, {
		eval: useEval,
		workerData: {
			sharedBuffer,
			workerPort,
			pnpLoaderPath
		},
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
		if (expectedId !== id) throw new Error(`Internal error: Expected id ${expectedId} but got id ${id}`);
		return Object.assign({ id }, message);
	};
	const syncFn = (...args) => {
		const id = nextID++;
		const msg = {
			id,
			args
		};
		worker.postMessage(msg);
		const { result, error, properties } = receiveMessageWithId(mainPort, id, timeout);
		if (error) throw Object.assign(error, properties);
		return result;
	};
	worker.unref();
	return syncFn;
}

//#endregion
//#region node_modules/eslint-plugin-format/dist/index.mjs
const dirWorkers = fileURLToPath(new URL("../workers", import.meta.url));
let format$1;
const dprint = {
	meta: {
		type: "layout",
		docs: {
			description: "Use dprint to format code",
			category: "Stylistic"
		},
		fixable: "whitespace",
		schema: [{
			type: "object",
			properties: {
				language: {
					type: "string",
					required: true
				},
				languageOptions: { type: "object" }
			},
			additionalProperties: true
		}],
		messages
	},
	create(context) {
		if (!format$1) format$1 = createSyncFn(join(dirWorkers, "dprint.cjs"));
		return { Program() {
			const sourceCode = context.sourceCode.text;
			try {
				const formatted = format$1(sourceCode, context.filename, context.options[0] || {});
				reportDifferences(context, sourceCode, formatted);
			} catch (error) {
				console.error(error);
				context.report({
					loc: {
						start: {
							line: 1,
							column: 0
						},
						end: {
							line: 1,
							column: 0
						}
					},
					message: `Failed to format the code: ${error}`
				});
			}
		} };
	}
};
let format;
const prettier = {
	meta: {
		type: "layout",
		docs: {
			description: "Use Prettier to format code",
			category: "Stylistic"
		},
		fixable: "whitespace",
		schema: [{
			type: "object",
			properties: { parser: {
				type: "string",
				required: true
			} },
			additionalProperties: true
		}],
		messages
	},
	create(context) {
		if (!format) format = createSyncFn(join(dirWorkers, "prettier.cjs"));
		return { Program() {
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
							start: {
								line: 1,
								column: 0
							},
							end: {
								line: 1,
								column: 0
							}
						},
						message: "Failed to format the code"
					});
					return;
				}
				let message = `Parsing error: ${err.message}`;
				const error = err;
				if (error.codeFrame) message = message.replace(`
${error.codeFrame}`, "");
				if (error.loc) message = message.replace(/ \(\d+:\d+\)$/, "");
				context.report({
					message,
					loc: error.loc
				});
			}
		} };
	}
};
const index = {
	parserPlain: dist_exports,
	rules: {
		prettier,
		dprint
	}
};

//#endregion
export { index as default };