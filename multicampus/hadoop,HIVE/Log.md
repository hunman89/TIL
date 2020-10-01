#### 20200928

## LOG

> 사용자의 정보나 IoT 장비의 상황을 기록
>
> 빅데이터 분석을 위한 log 데이터를 웹서버에서 생성하는 법을 배운다.

* spring에 `log4j`세팅

  * pom.xml

    ```xml
    <dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
    </dependency> 
    ```

    * 파일 우클릭 -> maven -> update project

  * web.xml

    ```xml
    <listener>
        	<listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
    </listener>
    <context-param>
       	<param-name>log4jConfigLocation</param-name>
       	<param-value>/WEB-INF/config/log4j.properties</param-value>
    </context-param>
    ```

    * /WEB-INF/config/log4j.properties 생성

      ```
      ###############################################################################
      #
      #	log4j  
      #
      ###############################################################################
      
      # 데이터 셋의 이름 지정 (3개)
      log4j.logger.user = DEBUG, console, user
      log4j.logger.work = DEBUG, console, work
      log4j.logger.data = DEBUG, console, data
      
      # Console output...  자신만의 패턴들이 있다.
      log4j.appender.console= org.apache.log4j.ConsoleAppender 
      log4j.appender.console.layout = org.apache.log4j.PatternLayout 
      log4j.appender.console.layout.ConversionPattern = [%d] %-5p %L %m%n 
      
      # user
      log4j.appender.user.Threadhold=DEBUG
      log4j.appender.user = org.apache.log4j.DailyRollingFileAppender 
      log4j.appender.user.DatePattern = '.'yyyy-MM-dd
      log4j.appender.user.layout = org.apache.log4j.PatternLayout 
      log4j.appender.user.layout.ConversionPattern = %-5p %L [%d] - %m%n
      log4j.appender.user.File = c:/logs/user.log   // 저장위치 지정
      
      # work
      log4j.appender.work.Threadhold=DEBUG
      log4j.appender.work = org.apache.log4j.DailyRollingFileAppender 
      log4j.appender.work.DatePattern = '.'yyyy-MM-dd
      log4j.appender.work.layout = org.apache.log4j.PatternLayout 
      log4j.appender.work.layout.ConversionPattern = %-5p , %L , %d , %m%n
      log4j.appender.work.File = c:/logs/work.log 
      
      # data
      log4j.appender.data.Threadhold=DEBUG
      log4j.appender.data = org.apache.log4j.DailyRollingFileAppender 
      log4j.appender.data.DatePattern = '.'yyyy-MM-dd
      log4j.appender.data.layout = org.apache.log4j.PatternLayout 
      log4j.appender.data.layout.ConversionPattern = %d{yyyy-MM-dd-HHmmss} - %m%n
      log4j.appender.data.File = c:/logs/data.log 
      ```

  * 스프링 AOP를 적용해  src/com.log/Logger.java 생성

    ```java
    package com.log;
    
    import org.apache.log4j.Logger;
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.springframework.stereotype.Service;
    
    @Service
    @Aspect				// AOP 를 적용하겠다.
    public class Loggers {
    	private Logger work_log = Logger.getLogger("work");		// log 적용될 데이터셋 불러오지
    	private Logger user_log = Logger.getLogger("user");
    	private Logger data_log = Logger.getLogger("data");​
    
    	// before
    	@Before("execution(* com.*.*ShopController.*(..))")
    	public void logging1(JoinPoint jp) {		
    		data_log.debug(jp.getSignature().getName());		//각각의 컨트롤러에 적용될 데이터 형식 설정
    	}
    	@Before("execution(* com.*.*MainController.*(..))")
    	public void logging2(JoinPoint jp) {
    		work_log.debug(jp.getSignature().getName());		
    	}
    }
    ```

  * Controller는 연결만 하기 때문에 실제 기능을 하는 biz,frame 생성 

  * Controller 세팅 (최소한만)

* 로그 생성할 APP 만들기

  * 새 프로젝트(자바 프로젝트)에 App.java를 생성

    ```java
    package smartcross;
    
    import java.net.HttpURLConnection;
    public class App {
    	String url;
    
    	public App() {
    		
    	}
    	public void getData() { // 센서 데이터를 가상으로 생성
            // 데이터 생성하는 코드 임의로 작성
    		CarStatus cstatus = new CarStatus(id, direction, speed, speeding);				try {
    			sendData(cstatus);
    		} catch (Exception e1) {
    			// TODO Auto-generated catch block
    			e1.printStackTrace();
    		}
    		try {
    			Thread.sleep(1000);
    		} catch (InterruptedException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}		
    	}
    
    	public void sendData(CarStatus cs) throws Exception { // 센서 데이터를 웹 애플리케이션에 전송
    		url = "http://192.168.111.130/bigdata/carstatus.mc";		//주소 확인
    		url += "?id="+cs.getId()+"&speed="+cs.getSpeed()+"&direction="+cs.getDirection()+"&speeding="+cs.getSpeeding();
    		URL curl = new URL(url);
    		HttpURLConnection con = (HttpURLConnection) curl.openConnection();
    		try {
    			con.getInputStream();
    			con.setReadTimeout(5000);
    			con.setRequestMethod("POST");			
    		}catch(Exception e) {
    			
    		}finally {
    			con.disconnect();
    		}
    	}
    	public static void main(String[] args) {
    		App app = new App();
    		app.getData();
    	}
    }
    ```

* HIVE와 연동하기 `cron`

  * TOMCAT 서버 설치

  * logs 폴더 생성 및 권한 부여

      ```
    [root@mainserver ~]# mkdir logs
    [root@mainserver ~]# chmod 777 logs
    ```

  * war 파일 가져오기 (vsftp 이용)

  * tomcat 세팅

    ```
    [root@mainserver ~]# cd /var/ftp/pub/
    [root@mainserver pub]# ls
    hive.war
    [root@mainserver pub]# cp hive.war /usr/local/apache-tomcat-9.0.38/webapps/
    [root@mainserver pub]# cd /usr/local/apache-tomcat-9.0.38/webapps/
    [root@mainserver webapps]# ls
    ROOT  docs  examples  hive.war  host-manager  manager
    [root@mainserver webapps]# 
    ```
    
* cron 세팅
  
      ```
      #!/bin/sh
      
      date=`date`
      echo $date
      partitionName="${date:0:4}-${date:6:2}-${date:10:2}"
      echo $partitionName
      fileName="data.log.$partitionName"
      echo $fileName
      
      echo "Load the Data ?"
      read yn
      if [ $yn == "y" ]
      then
      echo "Start Load the Data ..."
      if [ -f /root/logs/$fileName ]
      then
      hive << EOF
      LOAD DATA LOCAL INPATH '/root/logs/$fileName' OVERWRITE INTO TABLE shopclick PARTITION (logdate="$partitionName");
      EOF
      echo "OK"
      echo "OK"
      else
      echo "File Not Found"
      echo "Exit Now..."
      fi
      else
      echo "Exit Now..."
      fi
      exit 0
      ```
  
      

