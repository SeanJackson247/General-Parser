class StaticMethodTest{
	public static void staticMethod(){
		System.out.println("Static method!");
	}
	public void instanceMethod(){
		System.out.println("Instance method!");
	}
	public static void main(String[] args){
		staticMethod();
		MethodTest methodTest = new MethodTest();
		methodTest.instanceMethod();
	}
}