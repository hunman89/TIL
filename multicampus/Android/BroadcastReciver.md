## Broadcast Reciver

> 전화, 문자 수신과 같은 정보들을 제작한 앱에서 받고자 할때.



#### 환경

> 기능에 대한 허가권 (전화걸기로 실습) : 위험 권한

* AndroidManifest.xml

  ```xml
  <!--네트워크 연결-->
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  <!--문자수신-->
  <uses-permission android:name="android.permission.RECEIVE_SMS"/>
  <!--문자 보내기-->
  <uses-permission android:name="android.permission.SEND_SMS"/>
  <!--전화걸기-->
  <uses-permission android:name="android.permission.CALL_PHONE"/>
  ```

* MainActivity.java

  ```java
  public class MainActivity extends AppCompatActivity {
      ImageView imageView;
      TextView textView;
      
      BroadcastReceiver broadcastReceiver;	// 브로드캐스트 받는 객체 +
      IntentFilter intentFilter;				// 어떤 종류의 브로드캐스트를 받을지
      ...
          
  }
  ```

* 전화걸기 (MainActivity.java)

  ```java
  public class MainActivity extends AppCompatActivity {
      ...
  	@Override
      protected void onCreate(Bundle savedInstanceState) {	// 앱 시작시
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          imageView = findViewById(R.id.imageView);
          textView = findViewById(R.id.textView);
  
          String permissions [] = {		// 전화걸기 허가를 승낙할건지
                  Manifest.permission.CALL_PHONE	
          };
          ActivityCompat.requestPermissions(this, permissions, 101);	// 물어본다
      }
      
      public void ckbt(View v){			
          if (v.getId() == R.id.button){		// 전화걸기 기능을하는 버튼
              int check = PermissionChecker.checkSelfPermission(this ,                                                      Manifest.permission.CALL_PHONE);
              if (check == PackageManager.PERMISSION_GRANTED){	// 허가 확인
                  Intent intent = new Intent(Intent.ACTION_CALL,
                                             Uri.parse("tel:010-000-0000"));
                  startActivity(intent);	// 전화걸기
              }else{						// 허가 안되있으면 경고창
                  Toast.makeText(this, "Denied", Toast.LENGTH_SHORT).show();
              }
          }
      }
  }
  ```

  

#### 문자

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    ...

    String permissions [] = {            
            Manifest.permission.SEND_SMS	// SMS 에 대한 허가권
    };
    ActivityCompat.requestPermissions(this, permissions, 101); // 물어본다
}

public void ckbt(View v){
    if (v.getId() == R.id.button2){				// 문자보내기
        if (,,,) { 								// 허가권 체크
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(
                    "tel:010-0000-0000",		// destinationAddress
                    null,						// scAddress
                    "hi, Man ...",				// text
                    null,						// sentIntent
                    null);						// deliveryIntent
            Toast.makeText(this, "Send ..OK", Toast.LENGTH_SHORT).show();
        }
    }
}

```



#### BroadcastReceiver

```java
public class MainActivity extends AppCompatActivity {
    ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
		// 어떤 액션을 받을지 등록
        intentFilter = new IntentFilter();
        	// 인터넷연결환경변화 액션 추가
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        
		// 어떤 행동을 할지 등록
        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
				
            }
        };
		// 브로드캐스트리시버 등록
        registerReceiver(broadcastReceiver,intentFilter);
        
    }
    
        @Override
    protected void onDestroy() {// 앱이 꺼지면 브로드캐스트리시버의 작동을 막아야한다.
        super.onDestroy();
        unregisterReceiver(broadcastReceiver);
    }
}

```

* 행동 등록

  ```java
  @Override
  public void onReceive(Context context, Intent intent) {
  	String cmd = intent.getAction();
  	ConnectivityManager cm = null;
  	NetworkInfo mobile = null;
  	NetworkInfo wifi = null;
  
  	if(cmd.equals("android.net.conn.CONNECTIVITY_CHANGE")){
  		cm = (ConnectivityManager) context.getSystemService(
  			Context.CONNECTIVITY_SERVICE
  		);
  		mobile = cm.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
  		wifi = cm.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
  		if(mobile != null && mobile.isConnected()){     // 모바일 연결
  
  		}else if (wifi != null && wifi.isConnected()){  // wifi 연결
  			imageView.setImageResource(R.drawable.wifi);
  		}else{
  			imageView.setImageResource(R.drawable.nowifi);
  		}
  	}
  }
  ```

  

#### 문자 받기

```JAVA
// 허가추가
Manifest.permission.RECEIVE_SMS

// sms receive 추가
intentFilter.addAction("android.provider.Telephony.SMS_RECEIVED");

// onReceive에 기능추가
if (cmd.equals("android.provider.Telephony.SMS_RECEIVED")){
	Bundle bundle = intent.getExtras();					// 번들로 받아온다.
	Object [] obj = (Object []) bundle.get("pdus");
	SmsMessage [] messages = new SmsMessage[obj.length];
	for(int i = 0; i < obj.length; i++){				// 
		String format = bundle.getString("format");
		messages[i] = SmsMessage.createFromPdu((byte[]) obj[i],format);
	}
	String msg = "";
	if(messages != null && messages.length > 0){
		msg += messages[0].getOriginatingAddress()+"\n";
		msg += messages[0].getMessageBody().toLowerCase()+"\n";
		msg += new Date(messages[0].getTimestampMillis()).toString();
		textView.setText(msg);
	}
}
```

