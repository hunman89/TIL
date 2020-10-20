## SharedPreferences

> 내용 제공자 중 하나
>
> 앱이 삭제가 되지 않는 한, 저장상태가 유지 된다.

```java
public class MainActivity extends AppCompatActivity {
    SharedPreferences sp;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sp = getSharedPreferences("login", MODE_PRIVATE);
        String status = sp.getString("status","");
        // 처음엔 내용없는 toast가 뜬다.
        // 버튼1을 클릭한 뒤 앱을 켰다 끄면 "ok"가 뜬다.
        Toast.makeText(this, status, Toast.LENGTH_SHORT).show();
    }

    // 버튼을 클릭하면 status를 ok로 바꾼다.
    public void ck(View v){
        SharedPreferences.Editor edit = sp.edit();
        edit.putString("status","ok");
        edit.commit();
    }

    // 클릭하면 저장된 sp 내용이 삭제
    public void ck2(View v){
        SharedPreferences.Editor edit = sp.edit();
        edit.remove("status");
        edit.commit();
    }
}
```

