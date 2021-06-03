class Vehicle{
	protected String brand="Ford";
	
	 public void honk(){
		System.out.println("Tuut, tuut!");
	}


}
class InheritanceTest extends Vehicle{
	private String modelName="Mustang";
	
	static public void main(String [] args){
		InheritanceTest myCar=new InheritanceTest();
		myCar.honk();
		System.out.println(myCar.brand+" "+myCar.modelName);
	}


}
