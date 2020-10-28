## Networking

> 컴퓨터들을 서로 연결하여 데이터를 손쉽게 주고받거나 자원을 함께 공유



#### 서버와 클라이언트

서버 : 서비스를 제공하는 컴퓨터

클라이언트 : 서비스를 사용하는 컴퓨터

| 서버기반모델 (전용서버)         | P2P모델 (클라이언트 = 서버)   |
| ------------------------------- | ----------------------------- |
| 안정적, 데이터 관리와 보안 용이 | 비용절감, 자원활용극대화      |
| 비용이 많이 든다.               | 관리가 어렵고 보안이 취약하다 |



#### InetAddress

자바에서 IP주소를 다루기 위한 클래스



#### URL(Uniform Resource Locator)

'프로토콜://호스트명:포트번호/경로명/파일명?쿼리스트링#참조'

자바에서 URL을 다루기 위한 클래스

```java
public class test1 {

	public static void main(String[] args) {
		String urlstr = "http://192.168.0.94/network/users.jsp";
		URL url = null;
		URLConnection con = null;
		
		InputStream is = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		
		try {
			url = new URL(urlstr);
			con = url.openConnection();
			
			is = con.getInputStream();
			isr = new InputStreamReader(is, "UTF-8");
			br = new BufferedReader(isr);
			
			String str = "";
			while((str = br.readLine()) != null) {
				System.out.println(str);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	}
}
```

파일 받아오기

```java
public class test2 {

	public static void main(String[] args) {
		String urlstr = "http://192.168.0.94/network/mp.mp3";
		URL url = null;
		URLConnection con = null;
		
		InputStream is = null;
		BufferedInputStream bis = null;
		
		FileOutputStream fos = null;
		BufferedOutputStream bos = null;
		
		
		try {
			url = new URL(urlstr);
			con = url.openConnection();
			
			is = con.getInputStream();
			bis = new BufferedInputStream(is, 10000000);
			
			fos = new FileOutputStream("newmp.mp3");
			bos = new BufferedOutputStream(fos);
			
			int data = 0;
			while((data = bis.read()) != -1) {
				bos.write(data);
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}		

	}
}
```



## 소켓(socket) 프로그래밍

소켓 : 프로세스간 통신에 이용되는 양쪽 끝단.

java.net 패키지 이용



#### TCP/IP

이기종 시스템간의 통신을 위한 표준 프로토콜

|             | TCP                                        | UDP                                             |
| ----------- | ------------------------------------------ | ----------------------------------------------- |
| 방식        | 연결 후 통신, 1:1                          | 연결없이 통신(UDP), 다대다                      |
| 특징        | 데이터 경계 구분X, 느리지만 신뢰성이 있다. | 데이터 경계 구분, 속도는 빠르지만 신뢰성이 없다 |
| 관련 클래스 | Socket, ServerSocket                       | DatagramSocket, DatagramPacket, MulticastSocket |

server

```java
package com.tcpip;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	int port = 9999;
	ServerSocket serverSocket;
	Socket socket;
	
	public Server() {
		
	}
	public void startServer() throws IOException {
		serverSocket = new ServerSocket(port);
		System.out.println("Ready Server ...");
		socket = serverSocket.accept();
		System.out.println("Connected ...");
	}

	public static void main(String[] args) {
		Server server = null;
		server = new Server();
		try {
			server.startServer();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("End Server");
	}

}
```



client

```java
package com.tcpip;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

public class Client {
	
	int port;
	String ip;
	
	Socket socket;
	
	public Client(String ip,int port) {
		this.ip = ip;
		this.port = port;
	}
	
	public void connectServer() {
		try {
			System.out.println("Start Client");
			socket = new Socket(ip, port);
			System.out.println("Connected ...");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("End Server");
	}
	
	public static void main(String[] args) {
		Client client = null;
		client = new Client("192.168.0.94",9999);
		client.connectServer();
		
		System.out.println("End Client");

	}

}

```

스레드를 사용하지 않으면, 실시간 채팅이 되지 않는다.