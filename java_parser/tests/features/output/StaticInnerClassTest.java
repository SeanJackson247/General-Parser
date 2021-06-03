class OuterClass{
	int x=10;
	static class InnerClass{
		int y=5;

	}


}
public class StaticInnerClassTest{
	
	static public void main(String [] args){
		OuterClass.InnerClass myInner=new OuterClass.InnerClass();
		System.out.println(myInner.y);
	}


}
