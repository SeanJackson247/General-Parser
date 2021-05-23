class Test{}
class Behaviourable{
	
	static public void mainFunc(String [] args);
}
class AbstractParent{
	public static int x=45;
	@Override 
	static public void mainFunc(String [] args){
		System.out.println("Hello World!");
		for(int i=0;i<args.length();i++){
			System.out.println("args["+i+"] == "+args[i]);
		}
		int x=42;
		if(x==42){
			System.out.println("x == 42, sane!");
		}
		
		   else if(x<42){
			System.out.println("x < 42, does not makes sense!");
		}
				int y=(5*6+9/7)/3;
		String s="Hello !";
		Test t=new Test();
		if(t instanceof Test){
			System.out.println("Sanity!");
		}
		int i=0;
		while(i<100){
			if(i%3==0){
				System.out.println(i+"%3==0");
			}
			i++;
		}
		int [] myIntArray=new int[]{	1,2,3;
};
		test.methodWhichTakesASubClass(new Test(){@Override public static void testFunc(){System.out.println("Hello!")}});
		static{
System.out.println("Static Block!");		}	}
	
	static public void main(String [] args){
		mainFunc(args);
	}
}
