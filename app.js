const natural = require('natural');
const data = [
  {
    id: 1,
    parentId: null,
    name: "Initial Message",
    type: "text",
    keyword: [],
    response: "initial message",
  },
  {
    id:2,
    parentId: 1,
    name: "Test msg",
    type: "text",
    keyword: ["1", "menu 1"],
    response: "drink list : 1.",
  },
  {
    id:3,
    parentId: 1,
    name: "Test msg",
    type: "text",
    keyword: ["2", "menu 2"],
    response: "drink list : 2.",
  }
];

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const input = "coba menu 1";
const tokens = tokenizer.tokenize(input.toLowerCase());
const stems = tokens.map(token => stemmer.stem(token));

const matchedData = data.filter(item => {
  const itemKeywords = item.keyword.map(kw => stemmer.stem(kw));
  return itemKeywords.some(keyword => stems.includes(keyword));
});

if(matchedData.length === 0) {
    console.log("no matched data");
    return;
}
console.log(matchedData[0].response);
