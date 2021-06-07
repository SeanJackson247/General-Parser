//https://www.w3schools.com/java/java_inner_classes.asp
/*
Private Inner Class
Unlike a "regular" class, an inner class can be private or protected. If you don't want outside objects to access the inner class, declare the class as private:
*/
//Example
class OuterClass {
  int x = 10;

  private class InnerClass {
    int y = 5;
  }
}

public class PrivateInnerClassTest{
  public static void main(String[] args) {
    OuterClass myOuter = new OuterClass();
    OuterClass.InnerClass myInner = myOuter.new InnerClass();
    System.out.println(myInner.y + myOuter.x);
  }
}
 /*
If you try to access a private inner class from an outside class (MyMainClass), an error occurs:

Main.java:13: error: OuterClass.InnerClass has private access in OuterClass
    OuterClass.InnerClass myInner = myOuter.new InnerClass();
              ^
*/