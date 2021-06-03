//https://beginnersbook.com/2013/04/difference-between-throw-and-throws-in-java/

public class ThrowTest{  
   void checkAge(int age){  
	if(age<18) {
	   throw new ArithmeticException("Not Eligible for voting");  
	}
	else {
	   System.out.println("Eligible for voting");  
   } 
   } 
   public static void main(String args[]){  
	ThrowTest obj = new ThrowTest();
	obj.checkAge(13);  
	System.out.println("End Of Program");  
   }  
}