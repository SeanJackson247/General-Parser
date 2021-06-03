public class ForTest{
	public static void main(String[] args){

		for (int i = 0; i < 5; i++) {
		  System.out.println(i);
		}

		for (int i = 0; i <= 10; i = i + 2) {
		  System.out.println(i);
		}

		String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
		for (String i : cars) {
		  System.out.println(i);
		}

	}
}