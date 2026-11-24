// Famous Last Words at 1 Percent — make.fun entry
// Writes one funny last line a phone says as its battery hits 1 percent
// to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt by default).
// Plain text, no trailing newline, 1-199 characters per the gate.

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I survived drops, water, and your toddler. The battery icon did what none of them could.";

// Gate validation, mirroring the sealed scorer (RULES.txt): UTF-8 text,
// 1 to 199 characters, not only white space, single line. Fail loudly.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-199`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back byte verification: what we wrote must be exactly the line.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not equal the entry line");
}
console.log(`wrote ${LINE.length} chars to ${outPath} (read-back verified)`);
