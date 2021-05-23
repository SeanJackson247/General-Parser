# General-Parser
Codebase for building generic parsers, compilers, interpreters etc.

## Currently includes:

# Basic Tokenizer
Takes some code and a json config file to generate a flat token stream.

# Nester
Takes a stream of tokens of the form output by the aforementioned Basic Tokenizer and a config file to generate a nested token stream. Nesting is based on delineators, i.e. (, ), {, }, and so on, rather than statements.

# Java Parser
Java Parser which currently parses a subset of Java and outputs Java code. In future this could be used to convert Java code to some other language, or perform code analysis.\

The Java Parser currently performs only basic syntax error checking. Checking for illegal class declarations, invalid method labels, e.t.c. is not done. There is NO type checking. The following features are supported:\

The use of generics\
The use of import, both for individual files and folders. The code is just included in the about, no real attempt to mimic the import system in Java has been made.\
The use of classes , interfaces and methods, extending and implementing\
Labelling classes, interfaces, methods, and/or fields as static, abstract, public, private, final, and protected.\
The use of annotations\
Variables, if, else and else if statements, return statements. While loops and basic for loops.\
Static Blocks\
Try, Catch, throws and finally\
Anonymous Subclassing\

The following features are NOT supported:

Commas outside of array literals and argument/parameter list. You can use them, but they won't be parsed correctly.\
The following keywords you might expect to work are not supported:\
    continue
    break
    switch
    case
    default

Lambdas are not supported.
