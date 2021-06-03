class ConstructorTest{
	public int a;
	public int b;
	public int c;
	public ConstructorTest(int a, int b, int c){
		this.a=a;
		this.b=b;
		this.c=c;
	}
	public static void main(String[] args){
		ConstructorTest test = new ConstructorTest(1,2,3);
	}
}