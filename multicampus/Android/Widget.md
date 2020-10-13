## 위젯

> 뷰 중에 가장 많이 사용되는 것을 기본 위젯이라고 한다.

* 텍스트 뷰
* 버튼
* 에디트텍스트
* 이미지 뷰, 이미지버튼

> 수많은 기능들이 있다!
>
> 구글검색 



#### 드로어블

> 이미지처리



#### 이벤트처리

| 속성           | 설명                                   |
| -------------- | -------------------------------------- |
| 터치 이벤트    | 화면을 손가락으로 누를때               |
| 키 이벤트      | 키패드나 하드웨어 버튼                 |
| 제스처 이벤트  | 터치 이벤트 중 스크롤과 같이 일정 패턴 |
| 포커스         | 뷰마다 순서대로 주어지는 포커스        |
| 화면 방향 변경 | 가로나 세로로 바뀔때                   |



#### 터치 이벤트

``` java
public class MainActivity extends AppCompatActivity {
    TextView textView;          //
    LinearLayout view;          // 이벤트 처리를 원하는 대상을 만들고
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.textView);
        view = findViewById(R.id.view);         // 가져온다.
        view.setOnTouchListener(new View.OnTouchListener() {    // 이벤트 부착
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                int action = event.getAction();		// 액션이 시작되면
                float x = event.getX();				// X 좌표
                float y = event.getY();				// Y 좌표
                if(action == MotionEvent.ACTION_DOWN){	// 액션의 종류에 따라
                    print("DOWN: "+ x + " , " + y);
                } else if (action == MotionEvent.ACTION_MOVE){	// 어떤 액션인지
                    print("MOVE: "+ x + " , " + y);
                } else if (action == MotionEvent.ACTION_UP){	// 분기처리한뒤
                    print("UP: "+ x + " , " + y);		// 텍스트 뷰에 출력
                }
                return true;
            }
        });
    }       // onCreate end

    public void print(String str){	// 텍스트뷰에 출력해주는 함수.
        textView.setText(str);
    }
}
```



#### 키 이벤트

* MainActivity.java에서 마우스 우클릭 -> generate -> override method 에서 원하는 이벤트처리함수를 골라 생성할 수도 있다. (onKeyDown)

  ```java
  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
      if (keyCode == KeyEvent.KEYCODE_BACK){		// back 눌렀을때,
      	Toast.makeText(this, "" + "BACK KEY PRESSED", Toast.LENGTH_SHORT).show();			// toast 창에 띄운다.
      }
      return false;
  }
  ```

* 같은 기능을 하는 다른 함수가 여러개 있을 수 있다.
    ```java
    @Override
    	public void onBackPressed() {
        	//super.onBackPressed();
            Toast.makeText(this, "" + "BACK KEY PRESSED", Toast.LENGTH_SHORT).show();
        }
    ```

  

#### 단말방향전환

* 가로방향에 대한 layout resource file을 생성해야 한다.

  * app/res/ 에 디렉터리 생성한 다음 거기에 파일 생성

* 방향전환을 확인하는 속성 설정

  * AndroidManifest.xml

    ```xml
  <activity android:name=".MainActivity"            android:configChanges="orientation|screenSize|keyboardHidden">
        configChanges 추가
    ```
  
* 방향전환 이벤트 처리
  
  ```java
  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      if(newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE){
          Toast.makeText(this, "LANDSCAPE", Toast.LENGTH_SHORT).show();
          setContentView(R.layout.activity_main);			// 화면 전환
      }else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT){
          Toast.makeText(this, "PORTRAIT", Toast.LENGTH_SHORT).show();
          setContentView(R.layout.activity_main);			// 화면 전환
      }
  }
  ```
  
* 고정

  ```xml
   <activity android:name=".MainActivity"
              android:screenOrientation="landscape"	// 가로 고정
              android:configChanges="orientation|screenSize|keyboardHidden">
  ```

  



#### 앱 on/off 이벤트

  ```java
  public class MainActivity extends AppCompatActivity {
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          show("onCreate");		// 앱 최초 시작시 (onCreate -> onStart)
      }
  
      @Override
      protected void onStart() {	// 앱 시작시
          super.onStart();
          show("onStart");
      }
  
      @Override
      protected void onStop() {	// 앱 중단시(백그라운드)
          super.onStop();
          show("onStop");
      }
  
    @Override
      protected void onDestroy() {	// 앱 종료시 (onStop -> onDestroy)
          super.onDestroy();
          show("onDestroy");
      }
  
      public void show(String str){
          Toast.makeText(this, str, Toast.LENGTH_SHORT).show();
      }
  }
  ```

  

#### 토스트

> 디버깅용으로 많이 사용

* 생성

  ```java
  public void clickb1(View v){
      Toast t = Toast.makeText(this, "Toast1 ...", Toast.LENGTH_SHORT);
      t.show();
  }
  ```

* 위치지정

  ```java
  t.setGravity(Gravity.CENTER,50,100);    // (시작점, 그로부터 X, Y)
  ```

* 나만의 Toast

  * 새 Layout resource file 만들어 toast를 구성한다.

  ```java
  LayoutInflater inflater = getLayoutInflater();	// inflater 객체 불러옴
  View view = inflater.inflate(R.layout.toast, (ViewGroup) findViewById(R.id.toast_layout));        
  // inlater를 통해 toast.xml과 그 안의 toast_layout을 뷰그룹에 넣어 뷰객체에 넣는다.
  
  TextView tv = view.findViewById(R.id.textView); 
  								// view 객체안의 textview (toast안)
  tv.setText("Input Text");		// 값을 바꿀 수 있다.
  
  Toast t = new Toast(this);      // 메인 창(activity) 위에 띄운다.
  t.setGravity(Gravity.CENTER, 0, 0);
  t.setDuration(Toast.LENGTH_LONG);
  t.setView(view);			// 그것을 나만의 toast로 화면에 띄운다.
  t.show();
  ```

  

#### 스낵바

> 외부 라이브러리

* activitiy_main.xml의 Palette에 Containers에서 다운 가능

* AppBarLayout

  ```java
  Snackbar.make(v, "Snack Bar", Snackbar.LENGTH_LONG).show();
  ```



#### 알림대화상자

> AlertDialog

```java
public void clickb4(View v){
    AlertDialog.Builder builder = new AlertDialog.Builder(this);
    builder.setTitle("My Dialog");				// 제목
    builder.setMessage("Are You Exit Now");		// 내용
    builder.setIcon(R.drawable.icon);		    // 아이콘
	// 버튼 설정
    builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            finish();
        }
    });
    builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
        }
    });

    AlertDialog dialog = builder.create();
    dialog.show();								// 띄우기
}
```



#### 프로그레스바

```java
public class MainActivity extends AppCompatActivity {
    ProgressBar progressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        progressBar = findViewById(R.id.progressBar);
    }

	public void btprogress(View v){
    	ProgressDialog progressDialog = null;
    	if (v.getId() == R.id.button5){				// 5누르면 증가
        	int pdata = progressBar.getProgress();
        	progressBar.setProgress(pdata+1);
    	}else if(v.getId() == R.id.button6){		// 6누르면 감소
        	int pdata = progressBar.getProgress();
        	progressBar.setProgress(pdata-1);
    	}
	}
}
```

