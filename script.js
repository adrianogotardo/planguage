console.log('Hello!');

function processText() {
  const text = document.getElementById("usertext").value;
  const translatedText = translateText(text);
  document.getElementById("result").innerHTML = translatedText;
}

function translateText(text) {
  if(!text) return '';
  
  const vowelRegex = '^[aieouâêîôûäëïöüàéèùœAIEOUÂÊÎÔÛÄËÏÖÜÀÉÈÙŒ].*';
  const splittedWords = text.split(' ');

  const pWords = splittedWords.map(word => {
    const specialCharacterRegex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    const numberRegex = /^[0-9]*$/;

    let firstLetter = {
      value: word[0],
      index: 0
    };

    // correção das informações da primeira letra nos casos em que a palavra começa com caractere especial:
    for(let i = 0; i < word.length; i++) {
      if (word[i].match(specialCharacterRegex)) {
        // se houver mais letras:
        if (i < word.length - 1) {
          continue;
        } else {
          return word;
        };
      } else {
        firstLetter.value = word[i];
        firstLetter.index = i;
        break;
      };
    };

    // caso a primeira letra seja um número:

    if (firstLetter.value.match(numberRegex)) {
      return word;
    };

    // caso a primeira letra seja uma vogal:
    if (firstLetter.value.match(vowelRegex)) {

      // caso seja uma vogal maiúscula:
      if (firstLetter.value === firstLetter.value.toUpperCase()) {

        // caso a palavra comece com caractere especial:
        if (firstLetter.index > 0) {
          return word.slice(0, firstLetter.index) + 'P' + firstLetter.value.toLowerCase() + word.slice(firstLetter.index + 1, word.length);
        } else {
          return word = 'P' + firstLetter.value.toLowerCase() + word.slice(1, word.length);
        };
        
      // caso seja uma vogal minúscula:
      } else {

        // caso a palavra comece com caractere especial:
        if (firstLetter.index > 0) {
          return word.slice(0, firstLetter.index) + 'p' + word.slice(firstLetter.index, word.length);
        } else {
          return word = 'p' + word;
        }

      };

    // caso a primeira letra seja uma consoante:
    } else {

      // caso seja uma consoante maiúscula:
      if (firstLetter.value === firstLetter.value.toUpperCase()) {
        
        // caso a palavra comece com caractere especial:
        if(firstLetter.index > 0) {
          return  word.slice(0, firstLetter.index) + 'P' + word.slice(firstLetter.index + 1, word.length);
        } else {
          return 'P' + word.slice(1, word.length);
        };

      // caso seja uma consoante minúscula:
      } else {

        // caso a palavra comece com caractere especial:
        if (firstLetter.index > 0) {
          return  word.slice(0, firstLetter.index) + 'p' + word.slice(firstLetter.index + 1, word.length);
        } else {
          return 'p' + word.slice(1, word.length);
        };

      };

    };
  });

  let returnText = '';

  pWords.forEach(word => {
    returnText += word + ' ';
  });

  returnText = `\n${returnText}`;
  return returnText;
};