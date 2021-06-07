//mostly from https://www.w3schools.com/java/java_switch.asp

public class SwitchTest{
	public static void main(Stringp[] args){
		int day = 4;
		switch (day) {
			case 1:
				System.out.println("Monday");
				break;
			case 2:
				System.out.println("Tuesday");
				break;
			case 3:
				System.out.println("Wednesday");
				break;
			case 4:
				System.out.println("Thursday");
				break;
			case 5:
				System.out.println("Friday");
				break;
			case 6:
				System.out.println("Saturday");
				break;
			case 7:
				System.out.println("Sunday");
				break;
			default:
				System.out.println("Looking forward to the Weekend");
				break;
		}
		// Outputs "Thursday" (day 4)
	}
}