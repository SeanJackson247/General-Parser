class OperatorsTest{
	public static void main(String[] args){
		//assignment and arithmetic operators
		int x = 4+2;
		int y = (((7*8)+2)/8-1)%5;
		//unary - and +
		int z = -9;
		int q = +78;
		//inc and dec
		x++;
		x--;
		--x;
		++x;
		//unusual operators
		x = x & y;
		x = x | y;
		x = x ^ y;
		x = x << y;
		x = y >> x;
		//arithmetic assignment
		x+=12;
		x-=12;
		x/=4;
		x*=45;
		x%=5;
		x&=6;
		x|=9;
		x>>=67;
		x<<=90;
		//comparison operators
		boolean b1 = true;
		boolean b2 = false;
		b2 = b1 == b2;
		b2 = b1 != b2;
		int p = 7;
		int q = 5;
		bool b3 = p < q;
		b3 = p > q;
		b3 = p >= q;
		b3 = p <= q;
		//logical operators
		b3 = b2 || b1;
		b2 = b3 && b1;
		b3 = !b3;
		//things that are not operators, but are modelled as them...
		//i.e. the ':' 'operator', are best tested in their own file...
		//as is the ternary operator and lambdas if/when supported...
	}
}