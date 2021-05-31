[
  {
    "data": "class",
    "type": "keyword",
    "caretPosition": 13,
    "lineNumber": 1,
    "fileName": "tests/switch.java",
    "encapsulation": "public",
    "name": "Switch",
    "_implements": [],
    "block": [
      {
        "data": "Function",
        "type": "Function",
        "_native": false,
        "_final": false,
        "annotations": "",
        "returnType": "void",
        "_static": "static",
        "encapsulation": "public",
        "name": {
          "data": "main",
          "type": "operand",
          "caretPosition": 25,
          "lineNumber": 2,
          "fileName": "tests/switch.java"
        },
        "arguments": [
          {
            "data": "args",
            "type": "operand",
            "caretPosition": 39,
            "lineNumber": 2,
            "fileName": "tests/switch.java",
            "typeLabel": "String []"
          }
        ],
        "lineNumber": 2,
        "fileName": "tests/switch.java",
        "caretPosition": 25,
        "block": [
          {
            "data": "=",
            "type": "operator",
            "caretPosition": 9,
            "lineNumber": 4,
            "fileName": "tests/switch.java",
            "left": {
              "data": "x",
              "type": "operand",
              "caretPosition": 8,
              "lineNumber": 4,
              "fileName": "tests/switch.java",
              "typeLabel": "int"
            },
            "right": {
              "data": "42",
              "type": "operand",
              "caretPosition": 13,
              "lineNumber": 4,
              "fileName": "tests/switch.java"
            }
          },
          {
            "data": "switch",
            "type": "keyword",
            "caretPosition": 9,
            "lineNumber": 5,
            "fileName": "tests/switch.java",
            "condition": [
              {
                "data": "x",
                "type": "operand",
                "caretPosition": 11,
                "lineNumber": 5,
                "fileName": "tests/switch.java"
              }
            ],
            "block": [
              {
                "data": ":",
                "type": "operator",
                "caretPosition": 11,
                "lineNumber": 6,
                "fileName": "tests/switch.java",
                "left": {
                  "data": "42",
                  "type": "operand",
                  "caretPosition": 11,
                  "lineNumber": 6,
                  "fileName": "tests/switch.java",
                  "typeLabel": "case"
                },
                "right": {
                  "data": "CALL",
                  "type": "operator",
                  "lineNumber": 6,
                  "fileName": "tests/switch.java",
                  "caretPosition": 31,
                  "left": {
                    "data": "System.out.println",
                    "type": "operand",
                    "caretPosition": 31,
                    "lineNumber": 6,
                    "fileName": "tests/switch.java"
                  },
                  "right": {
                    "data": "(",
                    "type": "delineator",
                    "caretPosition": 31,
                    "lineNumber": 6,
                    "fileName": "tests/switch.java",
                    "sub": [
                      {
                        "data": "Sanity!",
                        "type": "string",
                        "caretPosition": 40,
                        "lineNumber": 6,
                        "fileName": "tests/switch.java",
                        "delineator": "\""
                      }
                    ]
                  }
                }
              },
              {
                "data": "break",
                "type": "keyword",
                "caretPosition": 49,
                "lineNumber": 6,
                "fileName": "tests/switch.java"
              },
              {
                "data": ":",
                "type": "operator",
                "caretPosition": 11,
                "lineNumber": 7,
                "fileName": "tests/switch.java",
                "left": {
                  "data": "default",
                  "type": "keyword",
                  "caretPosition": 11,
                  "lineNumber": 7,
                  "fileName": "tests/switch.java"
                },
                "right": {
                  "data": "CALL",
                  "type": "operator",
                  "lineNumber": 7,
                  "fileName": "tests/switch.java",
                  "caretPosition": 31,
                  "left": {
                    "data": "System.out.println",
                    "type": "operand",
                    "caretPosition": 31,
                    "lineNumber": 7,
                    "fileName": "tests/switch.java"
                  },
                  "right": {
                    "data": "(",
                    "type": "delineator",
                    "caretPosition": 31,
                    "lineNumber": 7,
                    "fileName": "tests/switch.java",
                    "sub": [
                      {
                        "data": "Default Case!",
                        "type": "string",
                        "caretPosition": 46,
                        "lineNumber": 7,
                        "fileName": "tests/switch.java",
                        "delineator": "\""
                      }
                    ]
                  }
                }
              },
              {
                "data": "break",
                "type": "keyword",
                "caretPosition": 55,
                "lineNumber": 7,
                "fileName": "tests/switch.java"
              }
            ]
          },
          {
            "data": "CALL",
            "type": "operator",
            "lineNumber": 9,
            "fileName": "tests/switch.java",
            "caretPosition": 21,
            "left": {
              "data": "System.out.println",
              "type": "operand",
              "caretPosition": 21,
              "lineNumber": 9,
              "fileName": "tests/switch.java"
            },
            "right": {
              "data": "(",
              "type": "delineator",
              "caretPosition": 21,
              "lineNumber": 9,
              "fileName": "tests/switch.java",
              "sub": [
                {
                  "data": "Label and break tests",
                  "type": "string",
                  "caretPosition": 44,
                  "lineNumber": 9,
                  "fileName": "tests/switch.java",
                  "delineator": "\""
                }
              ]
            }
          },
          {
            "data": ":",
            "type": "operator",
            "caretPosition": 8,
            "lineNumber": 10,
            "fileName": "tests/switch.java",
            "left": {
              "data": "label",
              "type": "operand",
              "caretPosition": 8,
              "lineNumber": 10,
              "fileName": "tests/switch.java"
            },
            "right": {
              "data": "for",
              "type": "keyword",
              "caretPosition": 6,
              "lineNumber": 11,
              "fileName": "tests/switch.java",
              "condition": [
                {
                  "data": "=",
                  "type": "operator",
                  "caretPosition": 12,
                  "lineNumber": 11,
                  "fileName": "tests/switch.java",
                  "left": {
                    "data": "i",
                    "type": "operand",
                    "caretPosition": 12,
                    "lineNumber": 11,
                    "fileName": "tests/switch.java",
                    "typeLabel": "int"
                  },
                  "right": {
                    "data": "0",
                    "type": "operand",
                    "caretPosition": 14,
                    "lineNumber": 11,
                    "fileName": "tests/switch.java"
                  }
                },
                {
                  "data": "<",
                  "type": "operator",
                  "caretPosition": 16,
                  "lineNumber": 11,
                  "fileName": "tests/switch.java",
                  "left": {
                    "data": "i",
                    "type": "operand",
                    "caretPosition": 16,
                    "lineNumber": 11,
                    "fileName": "tests/switch.java"
                  },
                  "right": {
                    "data": "100",
                    "type": "operand",
                    "caretPosition": 20,
                    "lineNumber": 11,
                    "fileName": "tests/switch.java"
                  }
                },
                {
                  "data": "++",
                  "type": "operator-unary-left",
                  "caretPosition": 22,
                  "lineNumber": 11,
                  "fileName": "tests/switch.java",
                  "left": {
                    "data": "i",
                    "type": "operand",
                    "caretPosition": 22,
                    "lineNumber": 11,
                    "fileName": "tests/switch.java"
                  }
                }
              ],
              "block": [
                {
                  "data": "if",
                  "type": "keyword",
                  "caretPosition": 6,
                  "lineNumber": 12,
                  "fileName": "tests/switch.java",
                  "condition": [
                    {
                      "data": "==",
                      "type": "operator",
                      "caretPosition": 8,
                      "lineNumber": 12,
                      "fileName": "tests/switch.java",
                      "left": {
                        "data": "x",
                        "type": "operand",
                        "caretPosition": 8,
                        "lineNumber": 12,
                        "fileName": "tests/switch.java"
                      },
                      "right": {
                        "data": "42",
                        "type": "operand",
                        "caretPosition": 12,
                        "lineNumber": 12,
                        "fileName": "tests/switch.java"
                      }
                    }
                  ],
                  "block": [
                    {
                      "data": "label",
                      "type": "operand",
                      "caretPosition": 16,
                      "lineNumber": 13,
                      "fileName": "tests/switch.java",
                      "typeLabel": "break"
                    }
                  ]
                },
                {
                  "data": "else",
                  "type": "keyword",
                  "caretPosition": 8,
                  "lineNumber": 15,
                  "fileName": "tests/switch.java",
                  "block": [
                    {
                      "data": "continue",
                      "type": "keyword",
                      "caretPosition": 13,
                      "lineNumber": 16,
                      "fileName": "tests/switch.java"
                    }
                  ]
                }
              ]
            }
          },
          {
            "data": "=",
            "type": "operator",
            "caretPosition": 5,
            "lineNumber": 19,
            "fileName": "tests/switch.java",
            "left": {
              "data": "x",
              "type": "operand",
              "caretPosition": 4,
              "lineNumber": 19,
              "fileName": "tests/switch.java"
            },
            "right": {
              "data": "10",
              "type": "operand",
              "caretPosition": 9,
              "lineNumber": 19,
              "fileName": "tests/switch.java"
            }
          },
          {
            "data": "do",
            "type": "keyword",
            "caretPosition": 5,
            "lineNumber": 20,
            "fileName": "tests/switch.java",
            "condition": [
              {
                "data": ">=",
                "type": "operator",
                "caretPosition": 11,
                "lineNumber": 22,
                "fileName": "tests/switch.java",
                "left": {
                  "data": "x",
                  "type": "operand",
                  "caretPosition": 11,
                  "lineNumber": 22,
                  "fileName": "tests/switch.java"
                },
                "right": {
                  "data": "0",
                  "type": "operand",
                  "caretPosition": 14,
                  "lineNumber": 22,
                  "fileName": "tests/switch.java"
                }
              }
            ],
            "block": [
              {
                "data": "--",
                "type": "operator-unary-left",
                "caretPosition": 5,
                "lineNumber": 21,
                "fileName": "tests/switch.java",
                "left": {
                  "data": "x",
                  "type": "operand",
                  "caretPosition": 5,
                  "lineNumber": 21,
                  "fileName": "tests/switch.java"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "data": "class",
    "type": "keyword",
    "caretPosition": 13,
    "lineNumber": 26,
    "fileName": "tests/switch.java",
    "encapsulation": "public",
    "name": "Main",
    "_implements": [],
    "block": [
      {
        "data": "enum",
        "type": "keyword",
        "caretPosition": 6,
        "lineNumber": 27,
        "fileName": "tests/switch.java",
        "name": "Level",
        "block": [
          {
            "data": ",",
            "type": "operator",
            "caretPosition": 6,
            "lineNumber": 28,
            "fileName": "tests/switch.java",
            "left": {
              "data": "LOW",
              "type": "operand",
              "caretPosition": 6,
              "lineNumber": 28,
              "fileName": "tests/switch.java"
            },
            "right": {
              "data": ",",
              "type": "operator",
              "caretPosition": 9,
              "lineNumber": 29,
              "fileName": "tests/switch.java",
              "left": {
                "data": "MEDIUM",
                "type": "operand",
                "caretPosition": 9,
                "lineNumber": 29,
                "fileName": "tests/switch.java"
              },
              "right": {
                "data": "HIGH",
                "type": "operand",
                "caretPosition": 7,
                "lineNumber": 30,
                "fileName": "tests/switch.java"
              }
            }
          }
        ]
      },
      {
        "data": "Function",
        "type": "Function",
        "_native": false,
        "_final": false,
        "annotations": "",
        "returnType": "void",
        "_static": "static",
        "encapsulation": "public",
        "name": {
          "data": "main",
          "type": "operand",
          "caretPosition": 25,
          "lineNumber": 33,
          "fileName": "tests/switch.java"
        },
        "arguments": [
          {
            "data": "args",
            "type": "operand",
            "caretPosition": 39,
            "lineNumber": 33,
            "fileName": "tests/switch.java",
            "typeLabel": "String []"
          }
        ],
        "lineNumber": 33,
        "fileName": "tests/switch.java",
        "caretPosition": 25,
        "block": [
          {
            "data": "=",
            "type": "operator",
            "caretPosition": 15,
            "lineNumber": 34,
            "fileName": "tests/switch.java",
            "left": {
              "data": "myVar",
              "type": "operand",
              "caretPosition": 14,
              "lineNumber": 34,
              "fileName": "tests/switch.java",
              "typeLabel": "Level"
            },
            "right": {
              "data": "Level.MEDIUM",
              "type": "operand",
              "caretPosition": 29,
              "lineNumber": 34,
              "fileName": "tests/switch.java"
            }
          },
          {
            "data": "CALL",
            "type": "operator",
            "lineNumber": 35,
            "fileName": "tests/switch.java",
            "caretPosition": 21,
            "left": {
              "data": "System.out.println",
              "type": "operand",
              "caretPosition": 21,
              "lineNumber": 35,
              "fileName": "tests/switch.java"
            },
            "right": {
              "data": "(",
              "type": "delineator",
              "caretPosition": 21,
              "lineNumber": 35,
              "fileName": "tests/switch.java",
              "sub": [
                {
                  "data": "myVar",
                  "type": "operand",
                  "caretPosition": 27,
                  "lineNumber": 35,
                  "fileName": "tests/switch.java"
                }
              ]
            }
          }
        ]
      }
    ]
  }
]


***************************************************


public class Switch{
	
	static public void main(String [] args){
		int x=42;
		switch(x){
			case 42:System.out.println("Sanity!");
			break;
			default:System.out.println("Default Case!");
			break;
		}

		System.out.println("Label and break tests");
		label:for(int i=0;i<100;i++){
			if(x==42){
				break label;
			}

			else{
				continue;
			}

		}

		x=10;
		do{
			x--;
		}while(x>=0);
	}


}
public class Main{
	enum Level{
		LOW,MEDIUM,HIGH
	}

	
	static public void main(String [] args){
		Level myVar=Level.MEDIUM;
		System.out.println(myVar);
	}


}
