abstract class Animal{
	
	 public void animalSound();

	
	 public void sleep(){
		System.out.println("Zzz");
	}


}
class Pig extends Animal{
	
	 public void animalSound(){
		System.out.println("The pig says: wee wee");
	}


}
class AbstractTest{
	
	static public void main(String [] args){
		Pig myPig=new Pig();
		myPig.animalSound();
		myPig.sleep();
	}


}
