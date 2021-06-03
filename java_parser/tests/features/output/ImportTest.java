public class Scanner{}
class ImportTest{
	
	static public void main(String [] args){
		Scanner myObj=new Scanner(System.in);
		System.out.println("Enter username");
		String userName=myObj.nextLine();
		System.out.println("Username is: "+userName);
	}


}
