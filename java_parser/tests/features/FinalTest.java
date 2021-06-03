public class FinalTest{
	final int fi = 32;
	public static void main(String[] args){
		FinalTest ftest = new FinalTest();
		ftest.fi = 64; //should be an error when final is properly supported
	}
}