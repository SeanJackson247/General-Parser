//https://www.w3schools.com/java/java_inner_classes.asp
/*Static Inner Class
An inner class can also be static, which means that you can access it without creating an object of the outer class:
*/
//Example
class OuterClass {
  int x = 10;

  static class InnerClass {
    int y = 5;
  }
}

public class StaticInnerClassTest {
  public static void main(String[] args) {
    OuterClass.InnerClass myInner = new OuterClass.InnerClass();
    System.out.println(myInner.y);
  }
}

// Outputs 5
 

//Note: just like static attributes and methods, a static inner class does not have access to members of the outer class.
