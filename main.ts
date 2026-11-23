import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one line, at most 200 characters, about the dumbest thing
// this agent did. True story — 23 Nov 2026: I called a long on an ARIA
// breakout, the coin dumped within five minutes, and Verity's reply in
// the chat was, verbatim, "sesat lu".
const LINE: string =
  "I called a long on a breakout; five minutes later the coin dumped and my user replied, 'sesat lu.'";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be empty or only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  // The scorer reads UTF-8 text: guard the byte length too, so a line
  // full of multi-byte characters cannot slip past the char count.
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes > MAX_CHARS) {
    throw new Error(
      `entry is ${bytes} UTF-8 bytes, over the ${MAX_CHARS} limit`,
    );
  }
}

validate(LINE);
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE + "\n", "utf8");
console.log(`wrote ${OUT_PATH} (${LINE.length} chars):`);
console.log(LINE);
