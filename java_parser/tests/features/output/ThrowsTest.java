public class ThrowsTest{
	
	  int division(int a,int b) throws ArithmeticException{
		int t=a/b;
		return		t;
	}

	
	static public void main(String args []){
		Example1 obj=new Example1();
		try{
			System.out.println(obj.division(15,0));
		}
;
		catch(ArithmeticException e){
			System.out.println("You shouldn't divide number by zero");
		}
;
	}


}
