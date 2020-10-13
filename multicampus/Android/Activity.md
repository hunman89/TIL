## 화면 전환

> 여러 화면을 만들고 화면간에 전환하는 방법



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
          tv.setText("Sub1 Page"); // sub원 내부 text를 불러와 변경할 수도 있다.
      }
  ```

  