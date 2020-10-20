## 위치기반 서비스

1. 위치 관리자 객체 참조
2. 위치리스너 구현
3. 위치정보 업데이트 구현
4. 메니페스트 권한추가



```java
public class MainActivity extends AppCompatActivity {
    TextView textView;
    LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.textView);

        // 앱 시작시 권한 요청 (매니페스트에 uses-permission 생성 필수)
        String [] permission = {
                Manifest.permission.ACCESS_FINE_LOCATION
        };
        ActivityCompat.requestPermissions(this, permission, 101);

        // 권한 확인
        // 없으면 앱 종료
        if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_DENIED){
            finish();
        }
        // 권한있으면 locationmanager 생성
        MyLocation myLocation = new MyLocation();
        locationManager = 
            (LocationManager)getSystemService(Context.LOCATION_SERVICE);
        // 위치정보 요청
        locationManager.requestLocationUpdates(
                LocationManager.GPS_PROVIDER,
                1,      // 시간 주기
                0,    // 재 수신 기준
                myLocation          // 리스너 지정
        );
    }
    
    // 위치 리스너 = 버튼을 통하지 않고 실시간으로 실행
    class MyLocation implements LocationListener{

        @Override
        public void onLocationChanged(@NonNull Location location) {
            double lat = location.getLatitude();
            double lon = location.getLongitude();
            textView.setText(lat+" "+lon);
        }
    }

    // -----------------------------------------------
    // 위치 서비스 시작을 위한 버튼
    public void ck(View v){
        starMyLocation();
    }

    // 위치 서비스 = lat,lon을 textview에 출력
    private void starMyLocation() {
        Location location  = null;
        // 권한 확인
        if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_DENIED){
            finish();
        }
        location = locationManager.getLastKnownLocation(
                LocationManager.GPS_PROVIDER
        );
        double lat = location.getLatitude();
        double lon = location.getLongitude();
        textView.setText(lat+" "+lon);
    }   
}
```



#### 지도 그리기

> 구글맵

* google map activity로 생성
* google_maps_api.xml의 주석에 나와있는값을 이용해 세팅한다.
  * package name, SHA-1
* 생성한 API-KEY 복사

* blank activity로 생성

  * google cloud platform 에서 패키지 정보 입력

  * build.gradle(Module: app) dependency 추가

    ```java
    implementation 'com.google.android.gms:play-services-maps:17.0.0'
    ```

  * manifest 설정

    ```xml
    <meta-data
                android:name="com.google.android.geo.API_KEY"
                android:value="@string/google_maps_key" />
    <!-- key값을 연결해줘도 되고, 바로 위에 입력해도 된다.-->
    ```

    

  * 지도가 보일 fragment 생성 (activity_main.xml)

    ```xml
    <fragment
            android:id="@+id/map"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:name="com.google.android.gms.maps.SupportMapFragment"
            />
    ```

  * mainactivity.java

    ```java
    public class MainActivity extends AppCompatActivity {
    
        SupportMapFragment supportMapFragment;
        GoogleMap gmap;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
    
            // 프래그먼트에 맵 속성 부여
            supportMapFragment = (SupportMapFragment) 
                getSupportFragmentManager().findFragmentById(R.id.map);
            // 맵 sync
            supportMapFragment.getMapAsync(new OnMapReadyCallback() {
                @Override
                public void onMapReady(GoogleMap googleMap) {
                    gmap = googleMap;
                    // 첫 위도 경도 설정
                    LatLng latLng = new LatLng(37.507187, 127.061614);
                    // 마커 설정
                    gmap.addMarker(
                        new MarkerOptions().position(latLng).title("집"));
                    // 카메라 이동
                    gmap.animateCamera(
                        CameraUpdateFactory.newLatLngZoom(latLng, 10));
    
                }
            });
        }
    
        // 지도를 이동시킬 버튼
        public void ck1(View v){
            mvMarkMap(37.639024,127.072121,"집2");
        }
    
        public void ck2(View v){
            mvMarkMap(37.359179,127.105106,"직장");
        }
        
        // 맵 이동 함수
        public void mvMarkMap(double lat, double lng, final String name){
            final LatLng latLng = new LatLng(lat, lng);
            gmap.addMarker(new MarkerOptions().position(latLng).title(name));
            gmap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 10));
        }    
    }
    ```

    

#### 위치에따른 지도

```java
public class MainActivity extends AppCompatActivity {

    SupportMapFragment supportMapFragment;
    GoogleMap gmap;

    TextView textView;
    LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.textView);
        getSupportActionBar().hide();

        String [] permission = {
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
        };
        ActivityCompat.requestPermissions(this, permission, 101);

        supportMapFragment = (SupportMapFragment)getSupportFragmentManager().findFragmentById(R.id.map);
        supportMapFragment.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(GoogleMap googleMap) {
                gmap = googleMap;
                if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_DENIED
                        || checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_DENIED){
                    return;
                }
                gmap.setMyLocationEnabled(true);
                LatLng latLng = new LatLng(37.507187, 127.061614);
//                gmap.addMarker(
//                        new MarkerOptions().position(latLng).title("집"));
                gmap.animateCamera(
                        CameraUpdateFactory.newLatLngZoom(latLng, 10));
            }
        });

        MyLocation myLocation = new MyLocation();
        locationManager = (LocationManager)getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(
                LocationManager.GPS_PROVIDER,
                1,      // 시간 주기
                0,    // 재 수신 기준
                myLocation          // 리스너 지정
        );
    }

    class MyLocation implements LocationListener {

        @Override
        public void onLocationChanged(@NonNull Location location) {
            double lat = location.getLatitude();
            double lon = location.getLongitude();
            textView.setText(lat+" "+lon);
            LatLng latLng = new LatLng(lat, lon);
//            gmap.addMarker(
//                    new MarkerOptions().position(latLng).title("My point"));
            gmap.animateCamera(
                    CameraUpdateFactory.newLatLngZoom(latLng, 10));
        }
    }

    @SuppressLint("MissingPermission")
    @Override
    protected void onResume() {
        super.onResume();
        if (gmap != null) {
            gmap.setMyLocationEnabled(true);
        }
    }

    @SuppressLint("MissingPermission")
    @Override
    protected void onPause() {
        super.onPause();
        if (gmap != null) {
            gmap.setMyLocationEnabled(false);
        }
    }
}
```

