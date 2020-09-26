#### 20200925

## HIVEandSpring

* 테스트용 스프링 환경 만들기

  * marven

    * 우클릭 -> configure -> convert to marvenproject
    * pom.xml 수정을 통해 필요한 라이브러리를 받아온다.

  * spring nature 설정

  * web/WEB-INF/lib 에 lib 넣기

    * HIVE 관련 라이브러리

      ```
      commons-logging-X.jar
      hive-exec-X.jar
      hive-jdbc-X.jar
      hive-jdbc-X-standalone.jar
      hive-metastore-X.jar
      hive-service-X.jar
      libfb303-X.jar
      log4j-X.jar
      hadoop-core-1.2.1.jar
      ```

    * ojdbc6

  * web/WEB-INF/web.xml

  * web/WEB-INF/config/spring.xml

    * base-package 확인

  * 컨트롤러 생성

    * java Resources/src/ 에 MainController 생성

      ```java
    package hive;
      
    import org.springframework.stereotype.Controller;
      import org.springframework.web.bind.annotation.RequestMapping;
      import org.springframework.web.servlet.ModelAndView;
      
      @Controller
      public class MainController {
      
      	@RequestMapping("/main.mc")
    	public ModelAndView main() {
      		ModelAndView mv = new ModelAndView();
    		mv.setViewName("main");
      		return mv;
      	}
      	@RequestMapping("/chart1.mc")
      	public ModelAndView chart1() {
      		ModelAndView mv = new ModelAndView();		
      		mv.addObject("centerpage", "chart1");
      		mv.setViewName("main");
      		return mv;
      	}
      } 
      ```
  
  * web/
  
    * index.html 세팅
  
      ```html
      <script>
      location.href='main.mc';
    </script>
      ```
  
  * web/view/ 
  
    * main.jsp
  
      ```jsp
      <%@ page language="java" contentType="text/html; charset=UTF-8"
          pageEncoding="UTF-8"%>
      <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
      <title>Insert title here</title>
      </head>
      <body>
      <h1>Main Page</h1>
      <h3><a href="chart1.mc">Chart1</a></h3>
      <c:choose>
      		<c:when test="${centerpage == null}">
      		 	<jsp:include page="center.jsp"></jsp:include>
    		</c:when>
      		<c:otherwise>
      			<jsp:include page="${centerpage }.jsp"></jsp:include>
      		</c:otherwise>
      </c:choose>
      </body>
      </html>
      ```
    
    * chart1.jsp
    
      ```jsp
      <%@ page language="java" contentType="text/html; charset=UTF-8"
          pageEncoding="UTF-8"%>
      <style>
      #center{
      	width: 800px;
      	height: 500px;
      	border: 2px solid red;
      }
      </style>
      <h1>Chart1</h1>
      <div id = "center">
      
      </div>
      ```
  
* 스프링과 hive 연결

  * chart1 에 script를 추가해 ajax로 hive의 데이터를 불러올 수 있게한다.

    ```jsp
    <script>
    function display(data){
    	Highcharts.chart('container', {		// 상세 내용 생략
    		...
    	    series: data,
    		...
    	});
    };
    
    function getData(){
    	$.ajax({
    		url:'getdata1.mc',
    		success:function(data){
    			display(data);				// data를 받아오는걸 성공하면 display
    		},
    		error:function(){}
    	});
    }
    
    
    $(document).ready(function(){			// 창이 뜨면 data 받아오기
    	getData();
    });
    </script>
    ```

  * getdata1.mc를 컨트롤러에 세팅한다.

    * java Resources/src/hive/ChartController.java

      ```java
      package hive;
      import ...;
      @Controller
      public class ChartController {
      	String url = "jdbc:hive2://192.168.111.120:10000/default";		// hive ip
      	String id = "root";
      	String password = "111111";	
      	
      	public ChartController(){	// constructor
      		try {
      			Class.forName("org.apache.hive.jdbc.HiveDriver");
      		} catch (ClassNotFoundException e) {
      			e.printStackTrace();
      		}
      	}
      	
      	@RequestMapping("/getdata1.mc")
      	@ResponseBody
      	public void getdata1(HttpServletResponse res) throws Exception {
      		Connection con = null;
      		JSONArray data = new JSONArray();
      		try {
      			con = DriverManager.getConnection(url, id, password);
      			PreparedStatement pstmt = con.prepareStatement("select * from hdi limit 10");	//HiveQL
      			ResultSet rset = pstmt.executeQuery();
      			while(rset.next()) {
      				JSONObject jo = new JSONObject();					// display data에 알맞는 형식으로 변환
                      jo.put("name", rset.getString(2));					// JSONObject와 JSONArray를 잘 구분해야 한다. 
      				
      				JSONArray ja = new JSONArray();
      				ja.add(rset.getFloat(3));
      				ja.add(rset.getFloat(4));
      				ja.add(rset.getFloat(5));			
      				jo.put("data", ja);
      				
      				data.add(jo);
      			}
      			}
      		catch (Exception e){
      				throw e;
      		} finally {
      				con.close();										// Exception이 발생해도 connection을 close하게 한다.
      		}		
      		res.setCharacterEncoding("EUC-KR");
      		res.setContentType("application/json");
      		PrintWriter out = res.getWriter();
      		out.print(data.toJSONString());								//출력
      		out.close();
      	}
      }
      ```

      

​    

​    

​    