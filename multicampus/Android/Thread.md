## 스레드와 핸들러 이해하기

> 동시에 수행되는 여러 작업을 위해 사용

* 자바 기반이다.
* 안드로이드에서는 Handler, AsynchTask도 사용할 수 있다.



#### 스레드

* 프로그레스바를 1초에 1씩 올라가게 하면 다른 작업이 안된다.

  ```java
  public void ckbt(View v) throws InterruptedException {
      if (v.getId() == R.id.button) {
          for(int i=0;i<=100;i++){
              progressBar.setProgress(i);
              textView.setText(i+"");
              Thread.sleep(1000);
      }       
  }
  ```

  

* 프로그레스바도 올라가지 않음.

* 따라서 메인 스레드 외에 다른 스레드가 필요하다

* 동작은 `run` 을 통해 정의된다.

  ```java
  Thread t = new Thread(){
      @Override
      public void run() {
          for(int i=0;i<=30;i++){
              progressBar.setProgress(i);
              textView.setText(i+"");
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          }
      }
  };
  ```

* sub 스레드의 실행 = start()

  ```java
  public void ckbt(View v) throws InterruptedException {
      if (v.getId() == R.id.button) {
          t.start();
      }
  }
  ```

* 다른 방식으로 정의 가능 (class)

  ```java
  class myThread extends Thread{
      @Override
      public void run() {
         
      }
  };
  ```

* runnable로도 가능

  ```java
  class myThread2 implements Runnable{
  
      @Override
      public void run() {
              
      }
  }
  ```

* sub 스레드에서 메인 스레드의 위젯 컨트롤 하기

  ```java
  runOnUiThread(new Runnable() {		// 필요
      @Override
      public void run() {
          button.setEnabled(true);
      }
  });
  ```

  * 핸들러에서는 별도 세팅없이 가능!! = 메인스레드에서 동작하기 때문







#### Handler

> 스레드의 변경되는 상태를 메인 스레드에 알려주는 기능

* 생성

```java
public class MainActivity extends AppCompatActivity {    
    MyHandler myHandler;
    MyHandler2 myHandler2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
        myHandler = new MyHandler();
        myHandler2 = new MyHandler2();
    }

    class MyHandler extends Handler{
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
        }
    }
    class MyHandler2 extends Handler{
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
        }
    }   
}
```

* 스레드에 세팅

  ```java
  class MyThread2 implements Runnable{
  
      @Override
      public void run() {
          for(int i=0;i<=100;i++){
              try {
                  Thread.sleep(100);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              Message message = myHandler.obtainMessage();
              Message message2 = myHandler2.obtainMessage();
              Bundle bundle = new Bundle();
              bundle.putInt("tdata", i);
              message.setData(bundle);
              message2.setData(bundle);
              myHandler.sendMessage(message);			// i를 핸들러 두개에 보낸다
              myHandler2.sendMessage(message2);
          }
      }
  }
  ```

* 핸들러 세팅

  ```java
  // 각각의 핸들러는 다른 텍스트뷰와 프로그레스바의 값을 바꾼다.
  class MyHandler extends Handler{
      @Override
      public void handleMessage(@NonNull Message msg) {
          Bundle bundle = msg.getData();
          int data = bundle.getInt("tdata", 0);
          textView.setText("Handler1:"+data);
          progressBar.setProgress(data);
      }
  }
  class MyHandler2 extends Handler{
      @Override
      public void handleMessage(@NonNull Message msg) {
          Bundle bundle = msg.getData();
          int data = bundle.getInt("tdata", 0);
          textView2.setText("Handler1:"+data);
          progressBar2.setProgress(data);
      }
  }
  ```

  

* dialog 안의 간단한 핸들러(딜레이)

  ```java
  public void progress(){
      final ProgressDialog progressDialog = new ProgressDialog(this);
      AlertDialog.Builder dialog = new AlertDialog.Builder(this);
      dialog.setTitle("progress");
      dialog.setMessage("5 second");
      final Handler handler = new Handler();		// 핸들러생성
      dialog.setPositiveButton("ok", new DialogInterface.OnClickListener() {
          @Override
          public void onClick(DialogInterface dialog, int which) {
              progressDialog.setCancelable(false);
              progressDialog.setTitle("Downloading...");
              progressDialog.show();
              handler.postDelayed(new Runnable() {	// 딜레이 세팅
                  @Override
                  public void run() {
                      progressDialog.dismiss();
                  }
              }, 5000);
          }
      });
      dialog.show();
  }
  ```

  



#### AsynchTask

> 스레드를 제어할 수 있다.

```java
// <> 제너릭에 <시작, 중간, 결과>의 타입을 정할 수 있다.
class MyAsynch extends AsyncTask<Integer, Integer, String>{
    // 실행 직전 동작
    @Override
    protected void onPreExecute() {
            
    }
    
    // 실행시 동작
    @Override
    protected String doInBackground(Integer... integers) { 
        return null;
    }

    // 진행되는 도중 값 받아서 행동
    @Override
    protected void onProgressUpdate(Integer... values) { 
        super.onProgressUpdate(values);
    }
    // 끝나고 리턴되는 값 받아서 행동
    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
    }
	// 중단 = 값을 초기화하면 된다.
    @Override
    protected void onCancelled() {
        super.onCancelled();
    }
}
```

* 예제

  ```java
  public class MainActivity extends AppCompatActivity {
      ...
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          ...
      }
  
      public void ckbt1(View v){
          // 시작.
          MyAsynch myAsynch = new MyAsynch();
          myAsynch.execute();
      }
      public void ckbt2(View v) {
          // 중단
          myAsynch.cancel(true);
          myAsynch.onCancelled();
      }
  
      class MyAsynch extends AsyncTask<Integer, Integer, String>{
          @Override
          protected String doInBackground(Integer... integers) { // 실행시 동작
              int sum = 0;
              for(int i = 1; i <= 100; i ++){
                  if(isCancelled() == true){	// 중단되었을때 for문도 중단되게!
                      break;
                  }
                  sum += i;
                  publishProgress(i);
                  try {
                      Thread.sleep(100);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
              return "result: "+sum;
          }
  
          @Override
          protected void onProgressUpdate(Integer... values) { // 진행되는 도중값
              int i = values[0].intValue();
              seekBar.setProgress(i);
              if (i <= 30){
                  imageView.setImageResource(R.drawable.down);
              }else if (i <= 70){
                  imageView.setImageResource(R.drawable.middle);
              }else if (i <= 100){
                  imageView.setImageResource(R.drawable.up);
              }
          }
  		
          @Override
          protected void onPostExecute(String s) {
              textView.setText(s);
          }
  
          @Override
          protected void onCancelled() {
              seekBar.setProgress(0);
              textView.setText("");
          }
      }
  }
  ```

  