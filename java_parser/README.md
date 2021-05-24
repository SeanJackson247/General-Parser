# Java Parser
Java Parser which currently parses a subset of Java and outputs Java code. In future this could be used to convert Java code to some other language, or perform code analysis.

The Java Parser currently performs only basic syntax error checking. Checking for illegal class declarations, invalid method labels, e.t.c. is not done. There is NO type checking. The following features are supported:

    The use of generics
    The use of import, both for individual files and folders.
        The code is just included in the output, no real attempt to mimic the import system in Java has been made.
    The use of classes , interfaces and methods, extending and implementing
    Labelling classes, interfaces, methods, and/or fields as static, abstract, public, private, final, and protected.
    The use of annotations
    Variables, if, else and else if statements, return statements. While loops and basic for loops.
    Static Blocks
    Try, Catch, throws and finally
    Anonymous Subclassing
    Arrays, but only the following syntax for instantiation:

```java
    int[] myIntArray = new int[]{1, 2, 3};
```

The following features are NOT supported:

    Commas outside of array literals and argument/parameter list. You can use them, but they won't be parsed correctly.\
    The following keywords you might expect to work are not supported:\

        continue
        break
        switch
        case
        default

    Lambdas are not supported.
    The ':' operator, and therefore all non-basic for loops.
	For, While, If Else If, and Else blocks must have associated curly braces.
	Explicit casting is not supported.

The parser also does not perform any optimization so far.

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
node java_parser.js example.java
```

Where example.java contains the Java code you want to compile. The resulting code will be output in a file called output.java

	TO DO List:
	Explicit casting support
	Test suite
	Higher order logic check
	Switch/continue statement support
	Do statement support
	Other array literal syntax
	
	Abstract out as much as possible to be non-specific to Java and place in separate files
	Comment code more extensively
