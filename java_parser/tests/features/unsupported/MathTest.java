
//mostly derived from https://www.w3schools.com/java/java_math.asp

// and here https://www.w3schools.com/java/java_ref_math.asp

//Note that at time of writing there is no real import system or Math library or anything like that
//this file serves as a test for the syntax one would need for using such a library - calling methods for example

class MathTest{
	public static void main(String[] args){
		//Java Math
		//The Java Math class has many methods that allows you to perform mathematical tasks on numbers.

		//Math.max(x,y)
		//The Math.max(x,y) method can be used to find the highest value of x and y:

		//Example
		int x = Math.max(5, 10);

		//Math.min(x,y)
		//The Math.min(x,y) method can be used to find the lowest value of x and y:

		//Example
		int y = Math.min(5, 10);

		//Math.sqrt(x)
		//The Math.sqrt(x) method returns the square root of x:

		//Example
		double root = Math.sqrt(64);

		//Math.abs(x)
		//The Math.abs(x) method returns the absolute (positive) value of x:

		//Example
		double d = Math.abs(-4.7);

		//Random Numbers
		//Math.random() returns a random number between 0.0 (inclusive), and 1.0 (exclusive):

		//Example
		d = Math.random();

		//To get more control over the random number, e.g. you only want a random number between 0 and 100, you can use the following formula:

		//Example
		int randomNum = (int)(Math.random() * 101);  // 0 to 100

	
	}
}