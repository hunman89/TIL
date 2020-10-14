## 프래그먼트

> 전체화면 안의 부분화면

* 코드를 독립적으로 구성하여 관리한다.



#### 생성

* app/java/com.example에 fragment를 생성한뒤 ( 자동으로 layout이 생성됨)
* activity_main.xml에서 fragment를 배치할 수 있다.

```java
public class MainActivity extends AppCompatActivity {
    Fragment1 fragment1;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        fragment1 = new Fragment1();        
    }
    public void ckbt(View v){
        if (v.getId() == R.id.button){
            getSupportFragmentManager().beginTransaction().replace(
                    R.id.fragment,fragment1			// fragment를 fragment 1로
            ).commit();        
    }
}
```



#### 메뉴로 이동하기

* 메뉴 만들기

  * res 폴더에 메뉴 리소스 만들고 xml파일 생성
  * 메뉴 꾸미기
  * 액션바 생성

* 메뉴 연결

  ```java
   @Override
   public boolean onCreateOptionsMenu(Menu menu) {
      getMenuInflater().inflate(R.menu.mymenu,menu);
      return true;
  }
  ```

* 메뉴에 프래그먼트 연결

  ```java
  @Override
  public boolean onOptionsItemSelected(@NonNull MenuItem item) {
      if(item.getItemId() == R.id.m1){
          getSupportFragmentManager().beginTransaction().replace(
                  R.id.fragment,fragment1
          ).commit();
      }
      return true;
  }
  ```



#### 프래그먼트의 뷰 다루기

* 프래그먼트에 뷰 생성 (TextView, EditText, button)

* 뷰 값 코딩

  ```java
  package com.example.p287;
  
  public class Fragment1 extends Fragment {
      TextView textView;
      EditText editText;
      Button button4;
  
      public Fragment1() {
          // Required empty public constructor
      }    
  
      @Override
      public View onCreateView(LayoutInflater inflater, ViewGroup container,
                               Bundle savedInstanceState) {
          ViewGroup viewGroup = null;				// 뷰그룹을 통해 각각을 받아온다.
          viewGroup = (ViewGroup)inflater.inflate(
                  R.layout.fragment_1, container, false
          );
          textView = viewGroup.findViewById(R.id.textView);
          editText = viewGroup.findViewById(R.id.editTextTextPersonName);
          button4 = viewGroup.findViewById(R.id.button4);
          return viewGroup;
      }
  }
  ```

  

#### 액션바

* showAsAction 속성들 이용



#### 상단탭,하단탭

> tabbed activity 만들면 상단탭은 쉽다.



하단탭

* 탭 내용 메뉴화 -> 메뉴 생성

  * showAsAction = ifroom | withtext, enables = true

* activity_main.xml 에 FrameLayout , BottomNavigationView넣기

* BottomNavigationView 속성 설정

  * menu속성에 아까 만든 메뉴를 넣기 필수!

* 탭마다 프래그먼트 연결하기

  * 프래그먼트 생성 ( app/java/com/example/)

  ```java
  public class MainActivity extends AppCompatActivity {
      BottomNavigationView bottomNavigationView;
      ActionBar actionBar;
      Fragment1 fragment1;		
      Fragment2 fragment2;
      Fragment3 fragment3;
  
      FragmentManager fragmentManager;		// 객체들 생성
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          
          fragment1 = new Fragment1();		//객체에 속성 넣기
          fragment2 = new Fragment2();
          fragment3 = new Fragment3();
  
          fragmentManager = getSupportFragmentManager();
          fragmentManager.beginTransaction().replace(R.id.frame_layout, fragment1).commit(); // 기본화면 fragment 1
          
  		actionBar = getSupportActionBar();
          actionBar.hide();						// 액션바 숨기기
          
          bottomNavigationView = findViewById(R.id.bottom_nav);
          bottomNavigationView.setOnNavigationItemSelectedListener(
              new BottomNavigationView.OnNavigationItemSelectedListener() {
              @Override
              public boolean onNavigationItemSelected(@NonNull MenuItem item) {		// tab이 눌렸을때 발생하는 이벤트
                  if (item.getItemId()== R.id.tab1){
                      fragmentManager.beginTransaction().replace(R.id.frame_layout, fragment1).commit(); // tab1 -> fragment1
                  }else if(item.getItemId()== R.id.tab2){
                      fragmentManager.beginTransaction().replace(R.id.frame_layout, fragment2).commit(); // tab2 -> fragment2
                  }else if(item.getItemId()== R.id.tab3){
                      fragmentManager.beginTransaction().replace(R.id.frame_layout, fragment3).commit(); // tab3 -> fragment3
                  }
                  return false;
              }
          });
      }
  }
  ```



#### 뷰페이저



#### 바로가기메뉴

* navigation drawer activity

  

