# Java Parser
Java Parser which currently parses a subset of Java and outputs Java code. In future this could be used to convert Java code to some other language, or perform code analysis.

To test the functionality of the parser run

```
node test.js
```

which will produce output each of the programs in the tests/features folder. The output is not yet properly validated.

The test should not output anything to the console. If it does there has been an error.

# How the parser works

The top level overview of the parser is the following 3 steps:

    Basic Parseing
    Type Checking
    Compiling

And can be seen in the java_parser.js file.
The Basic Parseing can be seen in the java_base_parse file and consists of the following steps:

    Basic Tokenization
    Handle Imports - include other files
    Associate Comments with the nearest token
    Label and merge operators based on context-dependent factors.
    Perform a basic sanity check on the syntactic validity of the tokens.
    Nest tokens based on delineators (i.e. brackets)
    Gather Tokens by statements and keywords
    Convert to a final tree representation - from infix to postfix to an expression tree.

# How to run and test the parser

To run and test the parser type the following:

```
node java_parser.js example.java output.java
```

Where example.java contains the Java code you want to compile and output.java is the name of the output file.

NOTES:

The ':' symbol is interpreted as an operator which is sufficient for its use as a label, for label and case statement, but not for the ternary operator.

Each of the features in the unsupported folder should be supported by the parser without the type checker, it is the type checker that needs finishing.

	Code for each of the features in the unsupported folder
	Finish Type Checker
	Warning/Error system
	Abstract out as much as possible to be non-specific to Java and place in separate files
	Comment code more extensively
	Refactor the import system to work with makefiles / progressive compilation
	Support for commas as separators in variable declarations
	Support for lambdas
	
	Method inliner
	Convert to PHP
	Convert to JS
	Convert to C++
