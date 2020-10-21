## Push

> 사용자에게 정보를 전달하기위해 앱 외부에 표시하는 ui



#### 진동, 소리

* mp3파일을 res의 raw 폴더를 생성하여 넣는다.

```java
public class MainActivity extends AppCompatActivity {

    NotificationManager manager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    // 진동
    public void ck1(View v){
        // getSystemService : 하드웨어의 기능 제어
        Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        // permission 필수 <uses-permission android:name="android.permission.VIBRATE" />
        // SDK 버전체크도 필요하다.
        if(Build.VERSION.SDK_INT >= 26){
            vibrator.vibrate(VibrationEffect.createOneShot(1000,10));
        }else {
            vibrator.vibrate(1000);
        }
    }

    // 소리 (안드로이드에서 제공)
    public void ck2(View v){
        // uri 타입으로 알림음 획득
        // 알림음 선택 : ALARM,NOTIFICATION,RINGTON 등
        Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        Ringtone ringtone = RingtoneManager.getRingtone(getApplicationContext(), notification);
        ringtone.play();
    }

    // 소리2 (mp3)
    public void ck3(View v){
        // raw에 저장한 mp3 재생
        MediaPlayer player = MediaPlayer.create(this,R.raw.mp);
        player.start();
    }

    // 알림
    public void ck4(View v){
        manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        NotificationCompat.Builder builder = null;
        if(Build.VERSION.SDK_INT >= 26){
            if(manager.getNotificationChannel("ch1")==null){
                manager.createNotificationChannel(
                        new NotificationChannel(
                                "ch1",
                                "chname",
                                NotificationManager.IMPORTANCE_DEFAULT
                        ));
                builder = new NotificationCompat.Builder(this,"ch1");
            }
        }else{
            builder = new NotificationCompat.Builder(this);
        }
        // build
        builder.setContentTitle("Noti test");
        builder.setContentText("context");
        builder.setSmallIcon(R.drawable.gold);
        Notification notification = builder.build();
        manager.notify(1,notification);
    }

    // 알림2 알림클릭시 행위 추가
    public void ck5(View v){
        manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        NotificationCompat.Builder builder = null;
        if(Build.VERSION.SDK_INT >= 26){
            if(manager.getNotificationChannel("ch2")==null){
                manager.createNotificationChannel(
                        new NotificationChannel(
                                "ch2",
                                "chname2",
                                NotificationManager.IMPORTANCE_DEFAULT
                        ));
                builder = new NotificationCompat.Builder(this,"ch2");
            }
        }else{
            builder = new NotificationCompat.Builder(this);
        }

        // 자신을 호출하는 intent
        Intent intent = new Intent(this, MainActivity.class);
        // pendingintent 에 붙인다.
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this,
                101,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT
        );
        // 클릭하면 사라짐
        builder.setAutoCancel(true);
        // 클릭하면 이동 (pendingintent)
        builder.setContentIntent(pendingIntent);
        // 내용
        builder.setContentTitle("Noti test");
        builder.setContentText("context");
        builder.setSmallIcon(R.drawable.gold);
        Notification notification = builder.build();
        manager.notify(1,notification);
    }

}
```



#### 서버에서 내려오는 push

> FCM = firebase cloud messaging

* FIREBASE 세팅

  * 시키는대로

    * 프로젝트 생성

    * 구성파일 다운로드 (google-service.json)

    * gradle 세팅

      ```
       // firebase-bom 대신에 두개를 넣는다 : 구버전인듯.   
          implementation 'com.google.firebase:firebase-messaging:20.0.0'
          implementation 'com.google.firebase:firebase-core:17.2.0'
      ```

      

* 앱 세팅

  * INTERNET permission

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    ```

  * 서비스 생성 (java/com/example/...)

    * 메니페스트 설정

      ```xml
      <service android:name=".MyFService">
       	<intent-filter>
       	<action android:name="com.google.firebase.MESSAGING_EVENT"/>
      	</intent-filter>
      </service>
      ```

      

    * 메인 액티비티 뒤에서 push message 받는 역활

    * FirebaseMessagingService 에서 상속받게 수정

      ```java
      public class MyFService extends FirebaseMessagingService {
          public MyFService() {
          }
          // 메시지받았을때, 실행
          @Override
          public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
              String title = remoteMessage.getNotification().getTitle();
              String control = remoteMessage.getData().get("control");
              String data = remoteMessage.getData().get("data");
              Log.d("[TAG]",title + " " + control + " " + data);
          }
      }
      ```

  * 메인액티비티

    ```java
    public class MainActivity extends AppCompatActivity {
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            //FCM에서 오는 데이터 받을 준비
            FirebaseMessaging.getInstance().subscribeToTopic("car").addOnCompleteListener(
                    new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    String msg = "FCM Complete ...";
                    if(!task.isSuccessful()){
                        msg = "FCM Fail";
                    }
                    Log.d("[TAG] ", msg);
                }
            });
        }
    }
    ```



* 서버 세팅

  * src servlet 생성

    ```java
    @WebServlet({ "/Ftest", "/ftest" })
    public class Ftest extends HttpServlet {
    	private static final long serialVersionUID = 1L;
    
        public Ftest() {
            super();
        }
    
    	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    			URL url = null;
    			try {
    				url = new URL("https://fcm.googleapis.com/fcm/send");
    			} catch (MalformedURLException e) {
    				System.out.println("Error while creating Firebase URL | MalformedURLException");
    				e.printStackTrace();
    			}
    			HttpURLConnection conn = null;
    			try {
    				conn = (HttpURLConnection) url.openConnection();
    			} catch (IOException e) {
    				System.out.println("Error while createing connection with Firebase URL | IOException");
    				e.printStackTrace();
    			}
    			conn.setUseCaches(false);
    			conn.setDoInput(true);
    			conn.setDoOutput(true);
    			conn.setRequestProperty("Content-Type", "application/json");
    
    			// set my firebase server key
    			conn.setRequestProperty("Authorization", "key="
    					+ "%SERVER-KEY%");
    
    			// create notification message into JSON format
    			JSONObject message = new JSONObject();
    			message.put("to", "/topics/temperature_manage");
    			message.put("priority", "high");
    			JSONObject notification = new JSONObject();
    			notification.put("title", "titlecard1");
    			notification.put("body", "bodyhi");
    			message.put("notification", notification);
    			JSONObject data = new JSONObject();
    			data.put("control", "controlid01");
    			data.put("data", 100);
    			message.put("data", data);
    
    
    			try {
    				OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
    				out.write(message.toString());
    				out.flush();
    				conn.getInputStream();
    				System.out.println("OK...............");
    
    			} catch (IOException e) {
    				System.out.println("Error while writing outputstream to firebase sending to ManageApp | IOException");
    				e.printStackTrace();
    			}	
    	}
    }
    ```

    

* 위의 상태는 앱이 꺼저있을때 push 알람이 오지만 켜져있을때 아무 효과없다.

* 켜저있을때, push data로 앱 내부 text 변화

  * MyFService 에 추가

    ```java
    public class MyFService extends FirebaseMessagingService {
        public MyFService() {
    
        }
        // 메시지받았을때, 실행
        @Override
        public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
            String title = remoteMessage.getNotification().getTitle();
            String control = remoteMessage.getData().get("control");
            String data = remoteMessage.getData().get("data");
            Log.d("[TAG]:",title + " " + control + " " + data);
    
            // mainactivity로 데이터 보내기
            // 전체 이름
            Intent intent = new Intent("notification");
            // 데이터별 이름
            intent.putExtra("title",title);
            intent.putExtra("control",control);
            intent.putExtra("data",data);
            LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
        }
    }
    ```

  * mainactivity에 추가

    ```java
    public class MainActivity extends AppCompatActivity {
        TextView tx;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            tx = findViewById(R.id.tx);
    
            //FCM에서 오는 데이터 받을 준비
            (위 앱세팅/메인액티비티 참고)
    
            // MyFService에서 보낸 데이터 수신 준비
            // this : 이 앱 내부에서
            LocalBroadcastManager lbm = LocalBroadcastManager.getInstance(this);
            // "notification"이란 이름의 데이터
            lbm.registerReceiver(receiver,new IntentFilter("notification"));
        }// end onCreate
    
        // MyFService에서 보낸 데이터 수신
        public BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if(intent != null){
                    String title = intent.getStringExtra("title");
                    String control = intent.getStringExtra("control");
                    String data = intent.getStringExtra("data");
                    tx.setText(title + " " + control + " " + data);
                }
            }
        };
    }
    ```

    