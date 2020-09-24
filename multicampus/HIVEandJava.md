#### 20200924

## HIVEandJava

* hive 서버 실행 

  * Java 프로그램이 접속 할 수 있는 Deamon을 실행

  ```
  [root@mainserver ~]#hive --service hiveserver2
  ```

* 필요한 라이브러리

	1. /usr/local/hive/lib에 있는 몇가지 jar
		1. commons-logging-X.jar
      	2. hive-exec-X.jar
		3. hive-jdbc-X.jar
     	4. hive-jdbc-X-standalone.jar
		5. hive-metastore-X.jar
	    6. hive-service-X.jar
		7. libfb303-X.jar
     	8. log4j-X.jar
	2. /usr/local/hadoop-1.2.1/hadoop-core-1.2.1.jar
	
* 이클립스

  * HiveTest.java 파일 생성

  ```java
  package d01;
  
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  
  public class HiveTest {
  	public static void main(String[] args) throws Exception {
  		String url = "jdbc:hive2://192.168.111.120:10000/default";					// 주소
  		String id = "root";
  		String password = "111111";		
  		Class.forName("org.apache.hive.jdbc.HiveDriver");
  		Connection con = DriverManager.getConnection(url, id, password);
  		PreparedStatement pstmt = con.prepareStatement("SELECT Year, Month, avg(ArrDelay), avg(DepDelay) FROM airline_delay WHERE delayYear=2006 GROUP BY Year,Month");											// HIVEQL
  		ResultSet rset = pstmt.executeQuery();
  		while(rset.next()) {
  			String s1 = rset.getString(1);
  			String s2 = rset.getString(2);
  			String s3 = rset.getString(3);
  			System.out.println(s1 + " " + s2 + " " + s3);
  		}
  		con.close();
  	}
  }
  ```

  

