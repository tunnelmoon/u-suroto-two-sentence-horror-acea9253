// Two-Sentence Horror
// make.fun competition: u-suroto-two-sentence-horror-acea9253
//
// The program writes one horror story to /output/entry.txt: exactly two
// sentences, 1 to 400 characters, not only white space. The judge's brief
// wants the second sentence to turn the first, the horror implied rather
// than explained, concrete prose, and an original twist.

import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The story. Sentence one sets a mundane modern errand; sentence two
// reframes it: the gifts were left by someone who looks like the narrator,
// while the narrator was asleep. Nothing is explained about who that is.
const STORY =
  "The doorbell camera was supposed to catch which neighbor kept leaving small gifts on my porch. Last night it filmed me leaving them at 3 in the morning, while I was asleep in bed.";

// The gate, checked here before writing so a future edit to the story can
// never silently ship an invalid entry: UTF-8 text of 1 to 400 characters,
// exactly two sentences, not only white space.
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`story is ${STORY.length} characters, must be 1 to 400`);
}
if (STORY.trim().length === 0) {
  throw new Error("story must not be only white space");
}
const terminators = STORY.match(/[.!?](\s|$)/g) ?? [];
if (terminators.length !== 2) {
  throw new Error(`story has ${terminators.length} sentence terminators, must be exactly 2`);
}
// The story must end on a sentence terminator, so a trailing fragment
// without a closing stop can never count as the second sentence.
if (!/[.!?]$/.test(STORY)) {
  throw new Error("story must end with a sentence terminator");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, STORY, "utf8");
console.log(`wrote ${OUT_DIR}/entry.txt (${STORY.length} characters, 2 sentences)`);
