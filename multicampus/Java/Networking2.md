	## Networking 2

> 지금까지 각각 ip를 지닌 클라이언트에서 서버로 메시지를 보내 서버에서 메시지를 뿌려주며 채팅을 하였다.
>
> 스프링 웹서버를 만들어 브라우저를 통해 신호를 생성하고, 생성된 신호를 서버를 통해 지정된 iot장비나 안드로이드 앱으로 전송한다. 

웹서버

* view/main.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
$(document).ready(function(){
	$('#iot').click(function(){		
		$.ajax({
			url:'iot.mc',
			success:function(data){
				alert('Send Complete...');
			}
		});
	});
	$('#phone').click(function(){		
		$.ajax({
			url:'phone.mc',
			success:function(data){
				alert('Send Complete...');
			}
		});
	});
});
</script>
</head>
<body>
<h1>Main Page</h1>
<h2><a id="iot" href="#">Send IoT(TCP/IP)</a></h2>
<h2><a id="phone" href="#">Send Phone(FCM)</a></h2>
</body>
</html>
```

com.chat, com.msg 동일

com.chat 추가

```java
// 타겟 디바이스의 ip로 메시지를 전송한다.
public void sendTarget(String ip, String cmd) {
    ArrayList<String> ips = new ArrayList<>();
    ips.add(ip);
    Msg msg = new Msg(ips,id,cmd);
    sender.setMsg(msg);
    new Thread(sender).start();
}
	
```

MainController

```java
@Controller
public class MainController {
	Client client;	
	public MainController() {		
		client = new Client("192.168.0.94", 5555,"[hun]");		
		try {
			client.connect();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/main.mc")
	public ModelAndView main() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main");
		return mv;
	}
	@RequestMapping("iot.mc")
	public void iot(HttpServletResponse res) throws IOException {
		System.out.println("IoT Send Start ....");
		client.sendTarget("/192.168.0.32", "100");
		PrintWriter out = res.getWriter();
		out.print("ok");
		out.close();
	}
	@RequestMapping("phone.mc")
	public void phone() {  
		System.out.println("Phone Send Start ....");
         client.sendTarget("/192.168.0.87", "100");
		PrintWriter out = res.getWriter();
		out.print("ok");
		out.close();
	}	
}
```

