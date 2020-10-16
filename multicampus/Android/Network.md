## 네트워킹

#### 허가(permission)

```java
<uses-permission android:name="android.permission.INTERNET"/>
<application
    android:usesCleartextTraffic="true"
        ...
```



#### 클래스생성

```java
package com.example.p500;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpConnect {
    public static String getString(String urlstr){
        String result = null;
        URL url = null;
        HttpURLConnection hcon = null;
        InputStream is = null;
        try{
            url = new URL(urlstr);
            hcon = (HttpURLConnection)url.openConnection();
            hcon.setConnectTimeout(2000);
            hcon.setRequestMethod("GET");
            is = new BufferedInputStream(hcon.getInputStream());
            result = convertStr(is);
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public static String convertStr(InputStream is){
        String result = null;
        BufferedReader bi = null;
        StringBuilder sb = new StringBuilder();
        try{
            bi = new BufferedReader(
                    new InputStreamReader(is)
            );
            String temp = "";
            while((temp =bi.readLine()) != null){
                sb.append(temp);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return sb.toString();
    }
}
```



#### 요청 보내고 받기

> 스레드에서실행!

```java
package com.example.p500;
...

public class MainActivity extends AppCompatActivity {
    TextView tx_id,tx_pw;
    HttpAsync httpAsync;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
    }

    public void login(View v){
        String id = tx_id.getText().toString();
        String pwd = tx_pw.getText().toString();
        String url = "http://192.168.0.6/android/login.jsp";
        url += "?id="+id+"&pwd="+pwd;           //쿼리스트링생성
        httpAsync = new HttpAsync();
        httpAsync.execute(url);		// url 을 Async로 보내 실행
    }

    class HttpAsync extends AsyncTask<String,String,String>{
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }
		// url을 받아 서버랑 통신한뒤 httpConnect로 받아온다.
        @Override
        protected String doInBackground(String... strings) {
            String url = strings[0].toString();
            String result = HttpConnect.getString(url);
            return result;
        }

        @Override
        protected void onProgressUpdate(String... values) {
            super.onProgressUpdate(values);
        }
		// 받은 결과를 toast로 띄운다.
        @Override
        protected void onPostExecute(String s) {
            Toast.makeText(MainActivity.this, s, Toast.LENGTH_SHORT).show();
        }
    }
}
```



#### 받은 결과에 따라 다른 작업 수행

```java
@Override
protected void onPostExecute(String s) {
    progressDialog.dismiss();		
    // 로그인 성공시 1, 실패 2가 s에 리턴되어 온다
    if (s.equals("1")){  // 성공시 다른 액티비티로 전환
        Intent intent = new
            Intent(getApplicationContext(),SecondActivity.class);
        startActivity(intent);
    } else {			// 실패시 경고창
        AlertDialog.Builder builder = new
            AlertDialog.Builder(MainActivity.this);
        builder.setTitle("경고");
        builder.setMessage("로그인 실패");
        AlertDialog dialog = builder.create();
        dialog.show();
    }
}
```

