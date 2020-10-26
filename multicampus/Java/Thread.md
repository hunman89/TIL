## Thread 제어

* 무한루프가 동작하는경우

* flag 설정을 통해 중지한다.

  ```java
  class Thread1 extends Thread{
  	
  	boolean flag = true;
  	
  	public Thread1() {}
  	
  	public void setFlag(boolean flag) {
  		this.flag = flag;
  	}
  	
  	@Override
  	public void run() {
  		System.out.println("Start");
  		while(true) {
  			if(flag == false) {
  				System.out.println("Stop ...");
  				break;
  			}
  			System.out.println("Connecting ...");
  			try {
  				Thread.sleep(500);
  			} catch (InterruptedException e) {
  				// TODO Auto-generated catch block
  				e.printStackTrace();
  			}
  		}
  		System.out.println("End");
  	}
  	
  }
  
  public class Test3 {
  
  	public static void main(String[] args) {
  		Thread1 t1 = new Thread1();
  		t1.start();
  		try {
  			Thread.sleep(10000);
  		} catch (InterruptedException e) {
  			e.printStackTrace();
  		}
  		t1.setFlag(false);
  	}
  }
  
  ```



#### 스레드 중지와 시작

중지한 스레드는 다시 시작할때, 새로생성해야 한다.

```java
public class Test3 {

	public static void main(String[] args) {
		Thread1 t1 = null;
		Scanner sc = new Scanner(System.in);
		
		while(true) {
			System.out.println("Input Cmd");
			String cmd = sc.nextLine();
			if (cmd.equals("start")) {
                // 이 구문이 여기 위치해야 한다.
				t1 = new Thread1();
				t1.start();
			} else if (cmd.equals("stop")) {
				t1.setFlag(false);
			} else {
				break;
			}
		}		
		sc.close();
	}
}
```

runnable은 다음과 같이 이용한다. 

```java
public class Test3 {

	public static void main(String[] args) {
		Thread1 r = new Thread1();	
		Thread t1 = null;
        
		Scanner sc = new Scanner(System.in);		
		while(true) {
			System.out.println("Input Cmd");
			String cmd = sc.nextLine();
			if (cmd.equals("start")) {	
				t1 = new Thread(r);
				t1.start();
			} else if (cmd.equals("stop")) {
				r.setFlag(false);
			} else {
				break;
			}
		}		
		sc.close();
	}
}
```

같은 스레드를 두번 실행할 때에도 생성한 뒤 실행하여야 한다.



#### 스레드의 우선순위

>  setPriority

cpu 코어가 많으면 차이가 크게 안 날수도 있다.



## 데몬 쓰레드

> 보조 쓰레드
>
> 데몬 쓰레드로 지정하면 메인이 종료될 때, 스레드도 종료하게 한다.

```java
class Tt extends Thread{

	@Override
	public void run() {
		while(true) {
			System.out.println("Thread ...");
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}	
}

public class Test4 {

	public static void main(String[] args) throws InterruptedException {
		Tt t = new Tt();
		t.setDaemon(true);
		t.start();
		Thread.sleep(10000);
		System.out.println("End Application....");
	}
}
```



