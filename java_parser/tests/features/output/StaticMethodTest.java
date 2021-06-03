class StaticMethodTest{
	
	static public void staticMethod(){
		System.out.println("Static method!");
	}

	
	 public void instanceMethod(){
		System.out.println("Instance method!");
	}

	
	static public void main(String [] args){
		staticMethod();
		MethodTest methodTest=new MethodTest();
		methodTest.instanceMethod();
	}


}
