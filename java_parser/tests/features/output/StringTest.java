class StringTest{
	
	static public void main(String [] args){
		String txt="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		System.out.println("The length of the txt string is: "+txt.length());
		txt="Hello World";
		System.out.println(txt.toUpperCase());
		System.out.println(txt.toLowerCase());
		txt="Please locate where 'locate' occurs!";
		System.out.println(txt.indexOf("locate"));
		String firstName="John";
		String lastName="Doe";
		System.out.println(firstName+" "+lastName);
		firstName="John ";
		lastName="Doe";
		System.out.println(firstName.concat(lastName));
		txt;
		"We are the so-called "="Vikings from the north.";
		txt="We are the so-called \"Vikings\" from the north.";
		txt="It\'s alright.";
		txt="The character \\ is called backslash.";
		int x=10;
		int y=20;
		int z=x+y;
		String sx="10";
		String sy="20";
		String sz=sx+sy;
		sx="10";
		y=20;
		sz=x+y;
	}


}
