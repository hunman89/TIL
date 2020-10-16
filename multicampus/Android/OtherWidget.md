## 앱 화면에 웹브라우저 넣기

> webView 이용

* AndroidManifest.xml permission & 설정

  ```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  
  <application
          android:usesCleartextTraffic="true"
               ...
  ```

  

* HTML 렌더링 기능 붙인다.

  ```java
  webView.setWebViewClient(new WebViewClient());
  ```

* 환경설정

  ```java
  WebSettings webSettings = webView.getSettings();
  webSettings.setJavaScriptEnabled(true); // 자바스크립트 동작 허용
  ```

* 연결

  ```java
  webView.loadUrl("http://m.naver.com");
  ```

  

## 시크바 사용하기

* setOnSeekBarChangeListener

  ```java
  seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
      @Override
      public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
          setBright(progress);
          textView.setText(progress + "");
      }
  
      @Override
      public void onStartTrackingTouch(SeekBar seekBar) {
  
      }
  
      @Override
      public void onStopTrackingTouch(SeekBar seekBar) {
  
      }
  });
  ```

* 밝기 조절기능

  ```java
  public void setBright(int value){
      WindowManager.LayoutParams params = getWindow().getAttributes();
      params.screenBrightness = (float) (value/100);
      getWindow().setAttributes(params);
  }
  ```

  