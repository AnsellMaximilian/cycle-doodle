export const normalizeString = (input: string) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9:._\s-#]/g, "")
    .replace(/\s+/g, "");
};

export default function isGuessCorrect(guess: string, answer: string): boolean {
  return normalizeString(guess) === normalizeString(answer);
}
