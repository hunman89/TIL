## 앱 만들기



#### 이름 바꾸기

* res/string.xml --> app_name 에 다국어 입력 가능
* AndroidManifest.xml의 android:label에 바로 입력 가능



#### 아이콘 바꾸기

* 원하는 아이콘을 mipmap 폴더에 넣는다.
* AndroidManifest.xml의 android:icon, android:roundIcon 에 경로 지정



#### 배경 지정

* 원하는 배경을 drawable 폴더에 넣는다.
* activity_main.xml 에 ConstraintLayout 을 누른다
* 우측에 All Attributes 에서 background 지정





#### 이벤트 넣기

* MainActivity.java 에서

  ```java
  public void clickBt(View view) {
  
  } 			// 같은걸 생성한 뒤
  ```

* activity_main.xml 에 button 을 누른다 ( 이벤트를 넣고 싶은 곳 )

* 우측 common Attribute에서 연결한다. ( onClick )

* MainActivity.java 에서

  ```java
   public void clickBt(View view) {
          Log.d("[TEST]", "-------------------------");				// 디버깅
          Toast.makeText(this, "Hello", Toast.LENGTH_SHORT).show();	// hello 창
      }
  ```

  



#### 이미지 핸들링

> 컴포넌트

* activity_main.xml 에서 id 정한다. ( 알아낸다. ) id = himg

* MainActivity.java 에서

  ```java
  public class MainActivity extends AppCompatActivity {
      ImageView himg;						// 이미지 변수 생성
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          ...
          himg = findViewById(R.id.himg);	//	가져오기 = 모든 컴포넌트는 R에 있다.
      }
  
      public void clickBt(View view) {
          himg.setVisibility(View.INVISIBLE);	// 눌렀을 때 안보이게 한다.
          ...
      }
  
  }
  ```

  

#### 이벤트 처리 2

```java
    public void clickBt2(View view) {   // 앱 호출
        Intent intent = new Intent(Intent.ACTION_VIEW,
                Uri.parse("http://m.naver.com"));
        startActivity(intent);

    }
    public void clickBt3(View view) {   // 전화
        Intent intent = new Intent(Intent.ACTION_VIEW,
                Uri.parse("tel:010-9878-9838"));
        startActivity(intent);
    }
```

* 분기 처리

  ```java
  public void clickBts(View view) {
      Intent intent = null;
      if(view.getId() == R.id.button2) {
          intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://m.naver.com"));
      } else if (view.getId() == R.id.button3) {
          intent = new Intent(Intent.ACTION_VIEW, Uri.parse("tel:010-0000-0000"));
      }
      startActivity(intent);
  }
  ```

  

#### 이름 바꾸기

> 리소스 이용하기

* res/value/string.xml

  ```xml
  <resources>
      <string name="app_name">My Application</string>
      <string name="main_test">Main Test</string>				이름 지정
      <string name="bt_text">Click 1</string>					버튼 이름 지정
  </resources>
  ```

* MainActivity.java

  ```java
  public class MainActivity extends AppCompatActivity {
      ...
      Button button2;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          ...
          button2 = findViewById(R.id.button2);			// 버튼 가지고 온다.
      }
  
      public void clickBt(View view) {
          ...
          button2.setText(R.string.bt_text);			// 이름을 리소스에서 불러와 지정해 준다
          ...
      }
  ```

* activity_main.xml 우측 text에서도 지정 가능

  ```java
  @string/main_test
  ```

  

#### 디버깅

* 아래 코드를 통해 디버깅 할 수 있다.

  ```java
  Log.d("[TEST]", "-------------------------");
  ```

* 안드로이드 스튜디오 아래 Logcat에서 필터를 통해 로그를 선택적으로 볼 수 있다.

  * Edit filter configuration