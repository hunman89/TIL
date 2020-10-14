## 안드로이드 구성요소

* activity
* service
* broadcast receiver
* content provider



## 화면 전환

> 여러 화면을 만들고 화면간에 전환하는 방법



#### 레이아웃 객체화

* 메인 화면을 만든다. 

* 보조 화면들을 만든다. (sub1.xml)

* 메인 화면의 버튼을 클릭할 때, 메인화면의 container에 보조화면이 들어가게 한다.

  ```java
  public void bt(View v){
      if(v.getId() == R.id.button){
          container.removeAllViews();  // 기존에 있던거 지운다.
          LayoutInflater inflater = (LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
          inflater.inflate(R.layout.sub1,container,true); // sub1을 container에
          TextView tv = container.findViewById(R.id.textView);
          tv.setText("Sub1 Page"); // sub1 내부 text를 불러와 변경할 수도 있다.
      }
  ```




#### 여러 화면 만들고 화면간 전환하기



* 엑티비티 만들기

  * app/java/com.example 에 새로 액티비티 추가한다.

  * 자동적으로 AndroidManifest.xml에 추가된다

    ```xml
    <activity android:name=".SecondActivity"></activity>
            <activity android:name=".MainActivity">
    ```

* intent 를 이용하여 이동

  * 버튼과 연결한 함수

    ```java
    public void ckbt(View v) {
    	Intent intent = 
            new Intent(getApplicationContext(),SecondActivity.class);
        startActivity(intent);
    }
    ```

* 실행해보면 두번째 액티비티가 첫번째 위에 덮어진다. => 플래그로 조절

* 값 보내기

  * 버튼과 연결된 함수

    ```java
    public void ckbt(View v) {
        Intent intent = 
            new Intent(getApplicationContext(),SecondActivity.class);
        intent.putExtra("data", 100);  // "data":100 인 값을 인텐트에 넣는다.
        startActivity(intent);
    }
    ```

  * 두개이상

    ```java
    intent.putExtra("data", 100);
    intent.putExtra("str", "String Data");
    ```

    

* 값 가져오기

  * 두번째 액티비티 (SecondActivity.java)

    ```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
        Intent intent = getIntent();		// 인텐트를 가져와
        int result = intent.getIntExtra("data", 0); // 값 저장(default:0)
        Toast.makeText(this, "" + result, Toast.LENGTH_SHORT).show(); 
        // toast창에 띄운다.
    }
    ```

  * 두개이상 가져오기 : bundle 이용

    ```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	...
        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();
        int result = bundle.getInt("data", 0);
        String str_result = bundle.getString("str", "");
        Toast.makeText(this, str_result+ "," + result,
                       Toast.LENGTH_SHORT).show();
    }
    ```
  
* 액션 추가하기
  
    ```java
      Intent intent = null;
      intent = new Intent(Intent.ACTION_VIEW, Uri.parse("tel:010-1111-1111"));
      startActivity(intent);
    ```



#### 수명주기

> 액티비티의 상태정보가 변하는것

| 상태     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| 실행     | 화면에 액티비티가 보이면서 실행 (onCreate, onStart, onResume) |
| 일시정지 | 사용자에게 보이지만 다른 액티비티가 위에 있어 포커스를 받지 못하는 상태 (onPause, onResume) |
| 중지     | 다른 액티비티에 완전히 가려져 보이지 않는 상태 (onStop, onDestroy, onRestart, onStart, onResume) |



* 메서드 상세

| 상태 메서드 | 설명                                                         |
| ----------- | ------------------------------------------------------------ |
| onCreate()  | 액티비티 처음 생성                                           |
| onStart()   | onCreate->onStart -> onResume, 화면에 보이기 바로 직전에 호출 |
| onResume()  | 사용자가 사용하기 바로 직전                                  |
| onRestart() | 중지된 이후 바로 호출 -> onStart                             |
| onPause()   | 다른 액티비티 시작전, 저장되지 않은 데이터나 애니매이션중인 작업 중지 |
| onStop()    | 사용자에게 보이지 않을때,  소멸혹은 가려질때                 |
| onDestroy() | 소멸되어 없어지기 바로 직전                                  |



* 간단한 데이터 저장 복원 : onPause와 onResume

  ```java
  SharedPreferences sp;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      Log.d("[TEST]","onCreate");
  }
  
  @Override
  protected void onPause() {	// 앱 임시 닫을때 저장
      super.onPause();
      saveState();
      Log.d("[TEST]","onPause");
  }
  
  @Override
  protected void onResume() {	// 다시 열때 불러오기
      super.onResume();
      restoreState();
      Log.d("[TEST]","onResume");
  }
  
  public void restoreState(){			// 불러오기
      sp = getSharedPreferences("", Activity.MODE_PRIVATE);
      if (sp != null && sp.contains("date")){
          String result = sp.getString("date", "");
          Toast.makeText(this, ""+ result, Toast.LENGTH_SHORT).show();
      }
  }
  public void saveState(){			// 저장하기
      sp = getSharedPreferences("", Activity.MODE_PRIVATE);
      SharedPreferences.Editor editor =sp.edit();
      Date d = new Date();			// 저장하는 시기의 시간 저장
      editor.putString("date",  d.toString());
      editor.commit();
  }
  ```