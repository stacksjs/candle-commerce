import {
  exports_isoUint8Array
} from "./chunk-50tnyd8h.js";

// ../../../../node_modules/@simplewebauthn/server/esm/helpers/convertAAGUIDToString.js
function convertAAGUIDToString(aaguid) {
  const hex = exports_isoUint8Array.toHex(aaguid);
  const segments = [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ];
  return segments.join("-");
}

export { convertAAGUIDToString };
