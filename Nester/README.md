# Nester

A Basic Nesting Parser written in JavaScript. Takes a stream of tokens and a config file for input. The config file must contain the settings for the language you wish to parse. See the java_nest.json config file for an example for the Java language.

Use with the Basic-Tokenizer module, the parse function, to create a stream of tokens from some code or manually construct some tokens.

Example use:

```javascript
let parse = require('../Basic-Tokenizer/parse.js').parse;

let nest = require('../Nester/nest.js').nest;

let fs = require('fs');

let fileName = process.argv[2];

let config = process.argv[3] + "_parse.json";

let code = fs.readFileSync(fileName,'utf-8');

config = fs.readFileSync("../Basic-Tokenizer/"+config,'utf-8');

config = JSON.parse(config);

let tokens = parse(code,fileName,config);

config = process.argv[3] + "_nest.json";

config = fs.readFileSync(config,'utf-8');

config = JSON.parse(config);

tokens = nest(tokens,config);

console.log(JSON.stringify(tokens,0,2));
```

And then from the command line:
```
node C:/node/lang/test.js inputFile.java java
```

Where inputFile.java is the source code and java_nest.json and java_parse.json are the language config files.

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

Results in the output:

```javascript

[
  Token {
    data: 'class',
    type: 'keyword',
    lineNumber: 1,
    fileName: 'example.java',
    delineator: undefined
  },
  Token {
    data: 'Launcher',
    type: 'operand',
    lineNumber: 1,
    fileName: 'example.java',
    delineator: undefined
  },
  Token {
    data: '{',
    type: 'delineator',
    lineNumber: 1,
    fileName: 'example.java',
    delineator: undefined,
    sub: [
      [Token], [Token],
      [Token], [Token],
      [Token], [Token],
      [Token], [Token]
    ]
  }
]
[
  {
    "data": "class",
    "type": "keyword",
    "lineNumber": 1,
    "fileName": "example.java"
  },
  {
    "data": "Launcher",
    "type": "operand",
    "lineNumber": 1,
    "fileName": "example.java"
  },
  {
    "data": "{",
    "type": "delineator",
    "lineNumber": 1,
    "fileName": "example.java",
    "sub": [
      {
        "data": "Example Java File\r",
        "type": "single-line-comment",
        "lineNumber": 2,
        "fileName": "example.java"
      },
      {
        "data": " with support for comments",
        "type": "multi-line-comment",
        "lineNumber": 3,
        "fileName": "example.java"
      },
      {
        "data": "public",
        "type": "keyword",
        "lineNumber": 4,
        "fileName": "example.java"
      },
      {
        "data": "static",
        "type": "keyword",
        "lineNumber": 4,
        "fileName": "example.java"
      },
      {
        "data": "void",
        "type": "operand",
        "lineNumber": 4,
        "fileName": "example.java"
      },
      {
        "data": "main",
        "type": "operand",
        "lineNumber": 4,
        "fileName": "example.java"
      },
      {
        "data": "(",
        "type": "delineator",
        "lineNumber": 4,
        "fileName": "example.java",
        "sub": [
          {
            "data": "String",
            "type": "operand",
            "lineNumber": 4,
            "fileName": "example.java"
          },
          {
            "data": "[]",
            "type": "operand",
            "lineNumber": 4,
            "fileName": "example.java"
          },
          {
            "data": "args",
            "type": "operand",
            "lineNumber": 4,
            "fileName": "example.java"
          }
        ]
      },
      {
        "data": "{",
        "type": "delineator",
        "lineNumber": 4,
        "fileName": "example.java",
        "sub": [
          {
            "data": "System.io.println",
            "type": "operand",
            "lineNumber": 5,
            "fileName": "example.java"
          },
          {
            "data": "(",
            "type": "delineator",
            "lineNumber": 5,
            "fileName": "example.java",
            "sub": [
              {
                "data": "Hello World!",
                "type": "string",
                "lineNumber": 5,
                "fileName": "example.java",
                "delineator": "\""
              }
            ]
          },
          {
            "data": ";",
            "type": "terminator",
            "lineNumber": 5,
            "fileName": "example.java"
          }
        ]
      }
    ]
  }
]

```

# The config file

The config file contains a single object with the optional "comment" property, because JSON does not have any native supports for comments. Use the comment property to document your config file, it will be safely ignored.

The object also has a delineators property, and it is an array of delineators, with each delineator being an array with two items, the first item the opener for the delineation and the second item the closer for the delineation.
