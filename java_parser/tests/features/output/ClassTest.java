public class ClassTest{
	String fname="John";
	String lname="Doe";
	int age=24;
	int x=5;
	int y=3;
	
	static public void main(String [] args){
		ClassTest myObj=new ClassTest();
		ClassTest myObj1=new ClassTest();
		ClassTest myObj2=new ClassTest();
		myObj2.x=25;
		System.out.println(myObj1.x);
		System.out.println(myObj2.x);
		System.out.println("Name: "+myObj.fname+" "+myObj.lname);
		System.out.println("Age: "+myObj.age);
	}


}
