## R 자바 연동

#### Rserve 패키지

> 설치후 실행

```R
> Rserve::run.Rserve()
-- running Rserve in this R session (pid=24712), 1 server(s) --
(This session will block until Rserve is shut down)
```

```r
> Rserve::Rserve()				# 백 그라운드 실행
Starting Rserve...
 "C:\PROGRA~1\R\R-35~1.3\library\Rserve\libs\x64\Rserve.exe" 

> Rserve::Rserve(args="--RS-enable-remote")		# 외부에서 접속 가능하게
Starting Rserve...
 "C:\PROGRA~1\R\R-35~1.3\library\Rserve\libs\x64\Rserve.exe" --RS-enable-remote 
```



#### 이클립스

* add external jar

  * Rengine.jar
  * RserveEngine.jar

* RConnection 생성

  ```java
  //RTest.java
  package r;
  
  import org.rosuda.REngine.Rserve.RConnection;
  import org.rosuda.REngine.Rserve.RserveException;
  
  public class RTest {
  
  	public static void main(String[] args) {
  		RConnection rconn = null;			// rconnection 생성
  		try {
  			rconn = new RConnection();		// ip 또는 포트 지정
  		} catch (RserveException e) {			
  			e.printStackTrace();
  		}
  	}
  }
  ```

* 소스 호출

  ```java
  package r;
  
  import org.rosuda.REngine.Rserve.RConnection;
  import org.rosuda.REngine.Rserve.RserveException;
  
  public class RTest {
  
  	public static void main(String[] args) {
  		RConnection rconn = null;
  		try {
  			rconn = new RConnection("192.168.0.36");
  			rconn.setStringEncoding("utf8");		// 한글 적용
  			rconn.eval("source('C:/R/day04/f2.R',encoding='UTF-8')"); //소스 호출
  		} catch (RserveException e) {			
  			e.printStackTrace();
  		}
  		System.out.println("Connection!");
  		
  		rconn.close();
  	}
  }
  ```

* 함수호출

  ```java
  public static void main(String[] args) {
  		RConnection rconn = null;	
  		int arg = 10; 							// 변수 지정
  		try {
  			rconn = new RConnection("192.168.0.36");
  			rconn.setStringEncoding("utf8");
  			rconn.eval("source('C:/R/day04/f2.R',encoding='UTF-8')");
  			REXP rexp = rconn.eval("fun1("+arg+")");		//fun1 함수 호출
  		} catch (RserveException e) {			
  			e.printStackTrace();
  		}
  		System.out.println("Connection!");
  		
  		rconn.close();
  	}
  ```

* 결과 가져오기

  ```java
  try {
  	rconn = new RConnection("192.168.0.36");
  	rconn.setStringEncoding("utf8");
  	rconn.eval("source('C:/R/day04/f2.R',encoding='UTF-8')");
  	REXP rexp = rconn.eval("fun1("+arg+")");
  	int result [] = rexp.asIntegers();			// integer로 불러온다.
  	for(int i : result ) {						// 출력
  		System.out.println(i);
  	}
  ```

* 결과가 datalist 일 경우

  ```java
  RList rlist = rexp.asList();					// list
  String s1 [] = rlist.at("x").asStrings();		// 열을 하나씩 배열로
  int i1 [] = rlist.at("y").asIntegers();
  for(int i = 0; i<s1.length;i++) {
  	System.out.println(s1[i]+" "+i1[i]);
  }
  ```

  

