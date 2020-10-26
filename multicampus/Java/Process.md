## 프로세스

> 자바의 프로세스란, 실행중인 프로그램이다.

* 모든 프로세스에는 최소한의 하나 이상의 쓰레드가 존재한다.

* 둘 이상의 쓰레드를 가진 프로세스를 '멀티쓰레드 프로세스' 라고 한다.

```java
public class Test {

	public static void main(String[] args) throws InterruptedException {
		int data1 = 0;
		int data2 = 0;
		// 여기가 실행되고
		for(int i = 1; i <= 10; i++) {
			data1 += i;
			System.out.println(data1);
			Thread.sleep(300);
		}
        // 다음이 실행된다.
		for(int i = 1; i <= 10; i++) {
			data2 += i;
			System.out.println(data2);
			Thread.sleep(300);
		}
		
		System.out.println(data1 + " " + data2);

	}

}

```



## 멀티 쓰레딩

#### 장점

- CPU의 사용률을 향상시킨다.
- 자원을 보다 효율적으로 사용할 수 있다.
- 사용자에 대한 응답성이 향상된다.
- 작업이 분리되어 코드가 간결해진다.

```java
class T extends Thread{
	// 스레드 생성
	String name;
	
	public T() {}
	public T(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		for(int i = 1; i <= 10; i++) {			
			System.out.println(name+":"+i);
			try {
				Thread.sleep(300);
			} catch (InterruptedException e) {				
				e.printStackTrace();
			}
		}
	}
	
}

public class Test {

	public static void main(String[] args) {
        // 동시에 작동하게 된다.
		T t1 = new T("T1");
		t1.start();
		T t2 = new T("T2");
		t2.start();		
	}
}
```

* runnable로도 가능

  ```java
  class Th implements Runnable{
  	
  	String name;
  	
  	public Th() {}
  	public Th(String name) {
  		this.name = name;
  	}
  
  	@Override
  	public void run() {
  		for(int i = 1; i <= 10; i++) {			
  			System.out.println(name+":"+i);
  			try {
  				Thread.sleep(300);
  			} catch (InterruptedException e) {
  				// TODO Auto-generated catch block
  				e.printStackTrace();
  			}
  		}
  	}
  	
  }
  
  public class Test2 {
  
  	public static void main(String[] args) {
  		Thread t1 = new Thread(new Th("T1"));
  		t1.start();
  		Thread t2 = new Thread(new Th("T2"));
  		t2.start();		
  	}
  }
  ```

  

