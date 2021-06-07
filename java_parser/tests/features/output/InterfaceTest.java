interface FirstInterface{
	
	 public void myMethod();


}
interface SecondInterface{
	
	 public void myOtherMethod();


}
class DemoClass{
	
	 public void myMethod(){
		System.out.println("Some text..");
	}

	
	 public void myOtherMethod(){
		System.out.println("Some other text...");
	}


}
class InterfaceTest{
	
	static public void main(String [] args){
		DemoClass myObj=new DemoClass();
		myObj.myMethod();
		myObj.myOtherMethod();
	}


}
