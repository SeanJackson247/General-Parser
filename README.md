# General-Parser
Codebase for building generic parsers, compilers, interpreters etc.

## Currently includes:

# Basic Tokenizer
Takes some code and a json config file to generate a flat token stream.

# Nester
Takes a stream of tokens of the form output by the aforementioned Basic Tokenizer and a config file to generate a nested token stream. Nesting is based on delineators, i.e. (, ), {, }, and so on, rather than statements.

# Java Parser
Java Parser which currently parses a subset of Java and outputs Java code. In future this could be used to convert Java code to some other language, or perform code analysis.
