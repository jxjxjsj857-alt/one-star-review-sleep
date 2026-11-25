// One-Star Review of Something Essential entry for make.fun.
// Writes one deadpan one-star review (at most 160 characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REVIEW =
  "One star. I gave sleep eight hours and woke up tired anyway. No refund, no apology, and it expects me back tonight like nothing happened.";

// The gate only accepts UTF-8 text of 1 to 160 characters, not only
// whitespace, on a single line. Fail loudly instead of writing an entry
// that cannot win.
if (REVIEW.trim().length === 0 || REVIEW.length > 160) {
  throw new Error(`Review must be 1-160 characters, got ${REVIEW.length}.`);
}
if (REVIEW.includes("\n")) {
  throw new Error("Review must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REVIEW, "utf8");

// Read back and confirm the file holds exactly the review, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== REVIEW) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${REVIEW.length}-character review to /output/entry.txt`);
