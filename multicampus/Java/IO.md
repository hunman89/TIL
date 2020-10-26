## 입출력(I/O)

> Input, output

#### Stream

데이터를 운반하는데 사용되는 연결통로이다.

하나의 스트림은 단방향 통신만 가능하다.

입출력을 위해, 입력스트림과 출력스트림 2개가 필요하다



#### 스트림의 종류

바이트 기반 스트림, 보조 스트팀, 문자기반 스트림(char 배열)



#### 보조 스트림의 버퍼 스트림

좀더 빠르게 큰 용량의 파일을 옮기기 위해



#### 직렬화

객체를 데이터 스트림으로 만든다.

객체 클래스가 직렬화가 가능해야 한다.

```java
// implements 추가
public class User implements Serializable{
	String id;
	String name;
	public User() {
		
	}
    ...
```

Object stream 이용해 이동

```java
public class Test3 {

	public static void main(String[] args) {
		User user = new User("id01","이말숙");
		FileOutputStream fos = null;
		BufferedOutputStream bos = null;
		ObjectOutputStream oos = null;
		
		try {
			fos = new FileOutputStream("user.serial");
			bos = new BufferedOutputStream(fos);
			oos = new ObjectOutputStream(bos);
			oos.writeObject(user);
			System.out.println("Write Complete...");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if(oos != null) {
				try {
					oos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ObjectInputStream ois = null;
		
		try {
			fis = new FileInputStream("user.serial");
			bis = new BufferedInputStream(fis);
			ois = new ObjectInputStream(bis);
			User readUser = null;
			readUser = (User) ois.readObject();
			System.out.println(readUser);
		} catch (Exception e) {
			
			e.printStackTrace();
		} finally {
			if(ois != null) {
				try {
					ois.close();
				} catch(IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
}
```

