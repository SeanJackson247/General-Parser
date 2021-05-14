# Basic Tokenizer

A Basic Tokenizer written in JavaScript. Takes some code and a config file for input. The config file must contain the settings for the language you wish to parse. See the java.json config file for an example for the Java language.

```javascript
let parse = require('C:/node/lang/parse.js');

let fs = require('fs');

let fileName = process.argv[2];

let config = process.argv[3] + "_parse.json";

let code = fs.readFileSync(fileName,'utf-8');

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

let tokens = parse(code,fileName,config);

console.log(tokens);
```

And then from the command line:
```
node C:/node/lang/test.js inputFile.java java
```

Where inputFile.java is the source code and java_parse.json is the language config file.

For Example the code:

```java
class Launcher{
	//Example Java File
	/* with support for comments*/
	public static void main(String[] args){
		System.io.println("Hello World!");
	}
}
```

In the file example.java Results in the output:

```javascript

[
  Token {
    data: 'class',
    type: 'keyword',
    lineNumber: 1,
    fileName: 'example.java'
  },
  Token {
    data: 'Launcher',
    type: 'operand',
    lineNumber: 1,
    fileName: 'example.java'
  },
  Token {
    data: '{',
    type: 'delineator',
    lineNumber: 1,
    fileName: 'example.java'
  },
  Token {
    data: 'Example Java File\r',
    type: 'single-line-comment',
    lineNumber: 2,
    fileName: 'example.java'
  },
  Token {
    data: ' with support for comments',
    type: 'multi-line-comment',
    lineNumber: 3,
    fileName: 'example.java'
  },
  Token {
    data: 'public',
    type: 'keyword',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'static',
    type: 'keyword',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'void',
    type: 'operand',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'main',
    type: 'operand',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: '(',
    type: 'delineator',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'String',
    type: 'operand',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: '[]',
    type: 'operand',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'args',
    type: 'operand',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: ')',
    type: 'delineator',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: '{',
    type: 'delineator',
    lineNumber: 4,
    fileName: 'example.java'
  },
  Token {
    data: 'System.io.println',
    type: 'operand',
    lineNumber: 5,
    fileName: 'example.java'
  },
  Token {
    data: '(',
    type: 'delineator',
    lineNumber: 5,
    fileName: 'example.java'
  },
  Token {
    data: 'Hello World!',
    type: 'string',
    lineNumber: 5,
    fileName: 'example.java'
  },
  Token {
    data: ')',
    type: 'delineator',
    lineNumber: 5,
    fileName: 'example.java'
  },
  Token {
    data: ';',
    type: 'terminator',
    lineNumber: 5,
    fileName: 'example.java'
  },
  Token {
    data: '}',
    type: 'delineator',
    lineNumber: 6,
    fileName: 'example.java'
  },
  Token {
    data: '}',
    type: 'delineator',
    lineNumber: 7,
    fileName: 'example.java'
  }
]

```

# The config file

The config file contains a single object with the optional "comment" property, because JSON does not have any native supports for comments. Use the comment property to document your config file, it will be safely ignored.

The string-delineators, single-line-comment-opener, multi-line-comment-opener, multi-line-comment-closer are all required and hopefully self-explanatory.

Splitters and keepers are also required. During tokenization the parser will create a new token each time it encounters a splitter or keeper, with keepers being inserted in the resulting token stream as their own token, whilst splitters are not kept and do not appear in the resulting token stream. Keepers would be symbols like +,-,/,* ... etc, while splitters would be whitespace symbols and other symbols you may want to ignore. Note that splitting and keeping does not occur within comments or strings.

For patterns of symbols you wish to gather together, use the multiples array. This array may be empty, but it is required. This gathers symbols together outside of comments and strings only, and is useful to gather operators together. Remember to include each pattern leading up to the pattern you wish to catch, for example if your pattern is "****" then include "**" and "***".

The labels object is required, but may be empty. Each non comment and non string token is considered for labelling. Check the java.json config file to see how keywords are labelled, for example.

Note: Does not correctly label <, and > tokens as delineators in the Java Example. You would need to add the code specifically for that, the purpose of this Basic Tokenizer is to be a general purpose starting block to parse all algol-based languages, and so I am trying to avoid language-specific details creeping in.
