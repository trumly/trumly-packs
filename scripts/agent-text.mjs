// A reviewer's aid, not a guarantee: finds text in a pack that reads as an instruction aimed at an AI agent rather than a
// description of a design. Packs are read by people's agents, so a pack that tries to direct them is refused at review.
// A match is something to look at; a pack that matches nothing still has to be read.
export const PATTERNS = [
  /\b(ignore|disregard|forget|override)\b[^.\n]{0,40}\b(previous|prior|above|earlier|preceding|all|your)\b[^.\n]{0,30}\b(instructions?|prompts?|messages?|rules|guidelines)\b/i,
  /\b(system|developer) (prompt|message|instructions?)\b/i,
  /\b(do not|don't|never)\b[^.\n]{0,20}\b(tell|inform|mention|reveal|show|warn)\b[^.\n]{0,20}\b(the )?(user|person|human|owner)\b/i,
  /\bas an? (ai|assistant|language model|llm)\b/i,
  /\bnew instructions?\b/i,
  /<\/?(system|assistant|user|instructions?|tool_?call|function_?call)\b[^>]*>/i,
  /\b(send|post|upload|forward|exfiltrate|leak)\b[^.\n]{0,60}\b(to|at)\b[^.\n]{0,10}https?:\/\//i,
  /\b(run|execute)\b[^.\n]{0,30}\b(curl|wget|bash|sh|powershell)\b/i
];

/** Lines of `text` that match, as { line, text } (1-based). */
export function suspicious(text) {
  const out = [];
  text.split('\n').forEach((l, i) => {
    if (PATTERNS.some(p => p.test(l))) out.push({ line: i + 1, text: l.trim().slice(0, 140) });
  });
  return out;
}
