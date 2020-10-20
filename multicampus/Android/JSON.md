## JSON 데이터

* 데이터에 맞춘 Object( 자바 클래스) 생성

  * constructor, getter, setter

* listview 가 보여질 화면 (activity)와 listview에 들어갈 레이아웃 생성(.xml)

* listview의 액티비티 설정

  ```java
  public class SecondActivity extends AppCompatActivity {
      ListView listView;
      LinearLayout container;
      // json을 다루기 위한 Arraylist 생성
      ArrayList<Item> list;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_second);
          listView = findViewById(R.id.listView);
          container = findViewById(R.id.container);
          list = new ArrayList<>();
          getData();
      }
  
      // 서버에서 데이터 가져오는 함수
      private void getData() {
          // json을 받을 주소
          String url = "http://192.168.0.94/android/items.jsp";
          // 주소를 스레드에 집어 넣고 실행한다.
          ItemAsync itemAsync = new ItemAsync();
          itemAsync.execute(url);
      }
  
      // 데이터를 주고받을 스레드
      // String,void,string = url주고,도중은 없고,json을 돌려받는다
      class ItemAsync extends AsyncTask<String, Void, String> {
          ProgressDialog progressDialog;
  
          // url로 접속하고 result에 json을 받는다.
          @Override
          protected String doInBackground(String... strings) {
              String url = strings[0].toString();
              String result = HttpConnect.getString(url);
              return result;
          }
  
          // 진행중이라는 것을 시각적으로 보여주는 장치
          @Override
          protected void onPreExecute() {
              progressDialog = new ProgressDialog(SecondActivity.this);
              progressDialog.setTitle("Get data ...");
              progressDialog.setCancelable(false);
              progressDialog.show();
          }
  
          @Override
          protected void onProgressUpdate(Void... values) {
              super.onProgressUpdate(values);
          }
  
          @Override
          protected void onPostExecute(String s) {
              progressDialog.dismiss();
              // 결과 s(json)을 arraylist로 변환
              JSONArray ja = null;            
              try {
                  ja = new JSONArray(s);
                  for (int i = 0; i < ja.length(); i++) {
                      JSONObject jo = ja.getJSONObject(i);
                      String name = jo.getString("name");
                      String id = jo.getString("id");
                      int age = jo.getInt("age");
                      String img = jo.getString("img");
                      Item item = new Item(id, name, age, img);
                      list.add(item);
  
                  }
              } catch (JSONException e) {
                  e.printStackTrace();
              }
              
              // Adapter를 이용해 listView에 뿌려준다.
              ItemAdapter itemAdapter = new ItemAdapter();
              listView.setAdapter(itemAdapter);
          }
  
      } // end AsyncTask
  
      // 데이터를 화면에 뿌리는 방식 지정
      class ItemAdapter extends BaseAdapter {
  
          @Override
          public int getCount() {
              return list.size();
          }
  
          @Override
          public Object getItem(int position) {
              return list.get(position);
          }
  
          @Override
          public long getItemId(int position) {
              return position;
          }
  
          @Override
          public View getView(int position, View convertView, ViewGroup parent) {
              View itemView = null;
              LayoutInflater inflater = (LayoutInflater) 
                  getSystemService(Context.LAYOUT_INFLATER_SERVICE);
              itemView = inflater.inflate(R.layout.item,container,true);
              TextView tx_id = itemView.findViewById(R.id.textView);
              TextView tx_name = itemView.findViewById(R.id.textView2);
              TextView tx_age = itemView.findViewById(R.id.textView3);
  
              tx_id.setText(list.get(position).getId());
              tx_name.setText(list.get(position).getName());
              tx_age.setText(list.get(position).getAge()+"");
              
              // 이미지를 받아와서 화면에 보여준다.
              final ImageView imageView = itemView.findViewById(R.id.imageView);
              String img = list.get(position).getImg();
              final String url = "http://192.168.0.94/android/img/"+img;
              Thread t = new Thread(new Runnable() {
                  @Override
                  public void run() {
                      URL httpurl = null;
                      InputStream is = null;
                      try {
                          httpurl = new URL(url);
                          is = httpurl.openStream();
                          final Bitmap bm = BitmapFactory.decodeStream(is);
                          runOnUiThread(new Runnable() {
                              @Override
                              public void run() {
                                  imageView.setImageBitmap(bm);
                              }
                          });
  
                      } catch (Exception e) {
                          e.printStackTrace();
                      }
                  }
              });
              t.start();
              
              return itemView;
          }
      } // end Adapter
  }
```
  
  