//https://www.w3schools.com/java/java_enums.asp

enum Level {
	LOW,
	MEDIUM,
	HIGH
}

public class Main {
	public static void main(String[] args) {
		Level myVar = Level.MEDIUM;

		switch(myVar) {
			case LOW:
			System.out.println("Low level");
			break;
			case MEDIUM:
			System.out.println("Medium level");
			break;
			case HIGH:
			System.out.println("High level");
			break;
		}
		//  The output will be:
		//Medium level
		
		//NOTE : enum.values() is currently not supported
		//nor is anything else near reflection
		
/*
		for (Level myVar : Level.values()) {
			System.out.println(myVar);
		}*/
		//The output will be:
		/*
		LOW
		MEDIUM
		HIGH*/
	}
}