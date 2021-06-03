public class MultipleObjectsTest{
  int x = 5;

  public static void main(String[] args) {
    MultipleObjectsTest myObj1 = new MultipleObjectsTest();  // Object 1
    MultipleObjectsTest myObj2 = new MultipleObjectsTest();  // Object 2
    System.out.println(myObj1.x);
    System.out.println(myObj2.x);
  }
}