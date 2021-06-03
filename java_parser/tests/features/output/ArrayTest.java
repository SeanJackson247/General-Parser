public class ArrayTest{
	
	static public void main(String [] args){
		String [] cars;
		cars={"Volvo","BMW","Ford","Mazda"};
		int [] myNum={10,20,30,40};
		cars={"Volvo","BMW","Ford","Mazda"};
		System.out.println(cars[0]);
		cars[0]="Opel";
		cars={"Volvo","BMW","Ford","Mazda"};
		cars[0]="Opel";
		System.out.println(cars[0]);
		cars={"Volvo","BMW","Ford","Mazda"};
		System.out.println(cars.length);
		cars={"Volvo","BMW","Ford","Mazda"};
		for(int i=0;i<cars.length;i++){
			System.out.println(cars[i]);
		}

		cars={"Volvo","BMW","Ford","Mazda"};
		for(String i:cars){
			System.out.println(i);
		}

		int [] [] myNumbers={{1,2,3,4},{5,6,7}};
		myNumbers={{1,2,3,4},{5,6,7}};
		int x;
		myNumbers=[1][2];
		System.out.println(x);
		myNumbers={{1,2,3,4},{5,6,7}};
		for(int i=0;i<myNumbers.length;++ i){
			for(int j=0;j<myNumbers[i].length;++ j){
				System.out.println(myNumbers[i][j]);
			}

		}

	}


}
