## Status



#### 스레드의 상태

| 상태       | 설명                                       |
| ---------- | ------------------------------------------ |
| NEW        | 생성                                       |
| RUNNABLE   | 실행중이거나 실행가능한 상태               |
| BLOCKED    | 일시정지된 상태                            |
| WAITING    | 종료되지는 않았지만 실행가능하지 않은 상태 |
| TERMINATED | 종료                                       |



#### 실행제어

#### sleep()

지정 시간동안 일시정지 한다.



#### interrupt()

작업을 멈추라고 요청한다.

일시정지 상태에 있을때, 실행대기 상태로 바꾼다.



#### join()

하던 작업을 멈추고 지정된 스레드가 지정된 시간동안 작업을 수행하도록 한다.



#### stop()

멈추게 한다. 하지만 교착상태를 일으키기 쉽기 떄문에 flag를 이용하는 것이 권장된다. (suspend,resume 도 마찬가지)



#### 스레드의 동기화

여러개의 스레드가 하나의 데이터를 동시다발적으로 사용할때 생기는 문제 해결을 위해

작업 완료까지 다른 스레드의 접근을 막는다.

```java
// 2가지 방법
// 메서드에 적용해 줘야 한다.
public synchronized void deposit(int money) {
		if(money > 0) {
			balance += money;
		}
	}
public void withdraw(int money) {
	synchronized(this) {
		if(balance >= money) {
			balance -= money;
		}
	}		
}
```



