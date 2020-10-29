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



## 채팅 앱

#### 서버에 글 올리기

```java
public class Server {
	int port;
	ServerSocket serverSocket;
	Socket socket;
	 
	public Server() {}
	public Server(int port) {
		this.port = port;
	}
	
	// 클라이언트가 들어올때 마다 실행되는 스레드
	class Receiver extends Thread{
		ObjectInputStream dis;
		Socket socket;
		// 소켓을 받는 컨스트럭터
		public Receiver(Socket socket) {
			this.socket = socket;
			try {
				// 데이터를 받는다.
				dis = new ObjectInputStream(socket.getInputStream());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		@Override
		public void run() {
			// 지속적인 입력을 받는다 
			while(dis != null) {
				Msg mo = null;
				try {
					mo = (Msg) dis.readObject();
					if(mo.getMsg().equals("q")) {
						System.out.println(mo.getId() + "님이 나갔습니다.");
						break;
					}
					System.out.println("["+mo.getId()+"]"+mo.getMsg());
				} catch (Exception e) {
					if (mo.getId() != null) {
						System.out.println(mo.getId() + "님이 나갔습니다.");
					}					
					break;
				}
			}
			// 입력 끝, stream과 소켓 닫는다.
			if (dis != null) {
				try {
					dis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (socket != null) {
				try {
					dis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}	
	// 서버 시작
	public void startServer() throws Exception {
		System.out.println("TCP/IP Server Start...");
		try {
			// 해당 포트번호 준비
			serverSocket = new ServerSocket(port);
			// 항상 대기를 위해 무한루프
			while (true) {
				System.out.println("Ready Server ..");
				// 클라이언트가 접속하면 소켓 생성
				socket = serverSocket.accept();
				System.out.println("Connected.. ");
				// 소켓당 스레드 실행
				new Receiver(socket).start();				
			}
		} catch(Exception e) {
			throw e;
		}
		
	}
	
	public static void main(String[] args) {
		Server server = new Server(8888);
		try {
			server.startServer();
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

}
```

```java
public class Client {
	
	int port;
	String address;
	Socket socket;
	Sender sender;
	
	public Client() {}
	public Client(String address, int port) {
		this.address = address;
		this.port = port;
	}
	
	// 접속
	public void connect() throws InterruptedException {
		try {
			socket = new Socket(address,port);
		} catch (Exception e) {
			// 접속 실패시 재시도
			while(true) {
				Thread.sleep(2000);
				try {
					socket = new Socket(address,port);
					System.out.println("Connected...");
					break;
				} catch (Exception e1) {
					System.out.println("Re Try ...");
				} 
			}
		} 
		// 접속이 성공하면 스레드를
		// 입력란에서 생성하지 말고 여기서 생성해 중복 생성오류를 막는다.
		sender = new Sender();
	}
	
	// 입력
	public void request() throws IOException {
		Scanner sc = new Scanner(System.in);
		try {
			while(true) {
				System.out.println("[Input Msg:]");
				String msg = sc.nextLine();
				Msg mo = new Msg("192.168.0.6","[hunman]",msg.trim());
				// 전송할 데이터를 스레드에 넣고 실행한다.
				sender.setMo(mo);
				new Thread(sender).start();
				Thread.sleep(500);
				// 종료
				if (msg.equals("q")) {	
					System.out.println("Exit Client ..");
					break;
				}				
			}
		}catch(Exception e) {
			
		} finally {
			sc.close();
			if(socket != null) {
				socket.close();
			}
		}
	}
	// 전송용 스레드
	class Sender implements Runnable{
		ObjectOutputStream dos;
		Msg mo;
		public void setMo(Msg mo) {
			this.mo = mo;
		}
		public Sender() {			
			try {
				dos = new ObjectOutputStream(socket.getOutputStream());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		@Override
		public void run() {
			if (dos != null) {
				try {
					dos.writeObject(mo);
				} catch (IOException e) {
					System.out.println("Not Avaliable ..");
					System.exit(0);
				} 
			}
			
		}
		
	}


	public static void main(String[] args) {
		// 접속 대상 ip,port 지정
		Client client = new Client("192.168.0.6",8888);
		try {
			client.connect();
			client.request();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
}
```





#### 다대다 채팅앱

```java
public class Server {

	int port;
	
	// 각각client의 아웃풋 저장용
	HashMap<String, ObjectOutputStream> maps;
	
	ServerSocket serverSocket;

	public Server() {}

	public Server(int port) {
		this.port = port;
		maps = new HashMap<>();
	}

	public void startServer() throws IOException  {
		serverSocket = new ServerSocket(port);
		System.out.println("Start Server ...");
		
		Runnable r = new Runnable() {
			@Override
			public void run() {
				while(true) {
					try {			
						Socket socket = null;
						System.out.println("Ready Server ...");
						socket = serverSocket.accept();
						
						// 접속한 client의 ip address 출력
						System.out.println(socket.getInetAddress());
						
						makeOut(socket);
						// 접속한 client마다 Receiver 생성
						new Receiver(socket).start();					
						
					} catch (Exception e) { 
						// 한명이 에러가 나도 계속 whileloop가 돌게 예외fmf catch
						e.printStackTrace();
					}
				}				
			}			
		};
		new Thread(r).start();		
	}
	
	// hashmap에 저장
	public void makeOut(Socket socket) throws IOException {
		ObjectOutputStream oo;
		oo = new ObjectOutputStream(socket.getOutputStream());
		// 형태 : (ip 주소, ouputstream)
		maps.put(socket.getInetAddress().toString(), oo);
		System.out.println("접속자수: " + maps.size());
	}
	
	// 데이터 받는 스레드
	class Receiver extends Thread{
		Socket socket;
		ObjectInputStream oi;
		
		public Receiver(Socket socket) throws IOException {
			this.socket = socket;
			// socket을 이용해 oi 생성
			oi = new ObjectInputStream(socket.getInputStream());
		}

		@Override
		public void run() {
			while(oi != null) {
				Msg msg = null;
				try {
					msg = (Msg) oi.readObject();
					if(msg.getMsg().contentEquals("q")) {
						throw new Exception();
					}
					System.out.println(msg.getId()+msg.getMsg());
					// 메시지를 모든 클라이언트에게 전송
					sendMsg(msg);
				} catch (Exception e) {
					maps.remove(socket.getInetAddress().toString());
					System.out.println(socket.getInetAddress()+" Exited ..");
					System.out.println("접속자수: "+maps.size());
					break;
				} 
			}
			try {
				if(oi != null) {
					oi.close();
				}
				if(socket != null) {
					socket.close();
				}
			} catch (Exception e) {
				
			} finally {
				
			}
			
		}
		
	}
	
	// sender 스레드에 전송
	public void sendMsg(Msg msg) {
		Sender sender = new Sender();
		sender.setMsg(msg);
		sender.start();
	}
	
	// client에 데이터 전송 스레드
	class Sender extends Thread{
		Msg msg;
		public void setMsg(Msg msg) {
			this.msg = msg;
		}
		@Override
		public void run() {
			// 모든 client 상대 전송
			Collection<ObjectOutputStream> cols = maps.values();
			Iterator<ObjectOutputStream> it = cols.iterator();
			while(it.hasNext()) {
				try {
					it.next().writeObject(msg);
				} catch (IOException e) {					
					e.printStackTrace();
				}
			}
		}
	}

	public static void main(String[] args) {
		Server server = new Server(5555);
		try {
			server.startServer();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}

```

```java
public class Client {
	
	int port;
	String address;
	String id;
	Socket socket;
	Sender sender;
	
	public Client() {}
	public Client(String address, int port, String id) {
		this.address = address;
		this.id = id;
		this.port = port;
	}
	
	// 접속용 소켓 생성
	public void connect() throws IOException {
		try {
			socket = new Socket(address, port);
		} catch (Exception e) {
			// 재시도 무한루프
			while(true) {
				try {
					Thread.sleep(2000);
					socket = new Socket(address, port);
					break;
				} catch (Exception e1) {
					System.out.println("Re try ...");
				} 
			}
		}
		// 정상 소켓  생성
		System.out.println("Connected Server: "+address);
		sender = new Sender(socket);
		new Receiver(socket).start();
	}
	
	// 입력된 메시지 전송
	public void sendMsg() {
		Scanner sc = new Scanner(System.in);
		while(true) {
			System.out.println("[Input msg :]");
			String ms = sc.nextLine();
			Msg msg = new Msg("",id,ms);
			sender.setMsg(msg);
			new Thread(sender).start();
			if(ms.equals("q")) {
				break;
			}
		}
		sc.close();
		if(socket != null) {
			try {
				socket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("Bye ...");
	}
	
	// 서버에 메시지 전송 스레드
	class Sender implements Runnable{
		Socket socket;
		ObjectOutputStream oo;
		Msg msg;
		public Sender(Socket socket) throws IOException {
			this.socket = socket;
			oo = new ObjectOutputStream(socket.getOutputStream());
		}
		public void setMsg(Msg msg) {
			this.msg = msg;
		}
		@Override
		public void run() {
			if(oo != null) {
				try {
					oo.writeObject(msg);
				} catch (IOException e) {
					//e.printStackTrace();
					try {						
						if(socket != null) {
							socket.close();
						}						
					} catch (Exception e1){
						e1.printStackTrace();
					}
					// 서버가 끊어지면 다시 연결한다.
					try {
						Thread.sleep(2000);
						connect();
					} catch (Exception e1) {
						e1.printStackTrace();
					}
				}
			}
		}
	}
	
	// 서버에서 오는 메시지 수신 스레드
	class Receiver extends Thread{
		ObjectInputStream oi;
		public Receiver(Socket socket) throws IOException {
			oi = new ObjectInputStream(socket.getInputStream());
		}
		@Override
		public void run() {
			while(oi != null) {
				Msg msg = null;
				try {
					msg = (Msg) oi.readObject();
					System.out.println(msg.getId() + msg.getMsg());
				} catch (Exception e) {
					e.printStackTrace();
					break;
				} 
			}
			try {
				if(oi != null) {
					oi.close();
				}
				if(socket != null) {
					socket.close();
				}
			}catch(Exception e) {
				
			}
		}
	}
	
	public static void main(String[] args) {
		Client client = new Client("192.168.0.94", 5555,"[hun]");
		try {
			client.connect();
			client.sendMsg();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

