//https://www.w3schools.com/java/java_class_attributes.asp

public class ClassTest{
	String fname = "John";
	String lname = "Doe";
	int age = 24;
	int x = 5;
	int y = 3;
	public static void main(String[] args){
		ClassTest myObj = new ClassTest();
		ClassTest myObj1 = new ClassTest();  // Object 1
		ClassTest myObj2 = new ClassTest();  // Object 2
		myObj2.x = 25;
		System.out.println(myObj1.x);  // Outputs 5
		System.out.println(myObj2.x);  // Outputs 25
		System.out.println("Name: " + myObj.fname + " " + myObj.lname);
		System.out.println("Age: " + myObj.age);
	}
}