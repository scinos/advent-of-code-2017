const wordValidator = (allowAnagrams = true) => input => {
  let words = input.split(' ');
  if (!allowAnagrams) {
    words = words.map(word =>
      word
        .split('')
        .sort()
        .join(''),
    );
  }
  const uniqueWords = new Set(words);
  return words.length === uniqueWords.size;
};

const challenge1 = input => input.split('\n').filter(wordValidator()).length;
const challenge2 = input => input.split('\n').filter(wordValidator(false)).length;

module.exports = { challenge1, challenge2 };
