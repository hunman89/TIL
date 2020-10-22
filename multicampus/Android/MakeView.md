## 선택위젯만들기

> 기본 제공 위젯을 바꾸거나 새로운 뷰 생성



#### 나인패치이미지?

> 이미지가 늘어나거나 줄어들때 발생하는 왜곡을 방지



#### 리스트뷰

> ArrayAdapter를 이용

```java
public class MainActivity extends AppCompatActivity {
    ListView listView;
    ArrayList<String> datas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
       ...
    }

    public void setList(final ArrayList<String> datas){
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(	
                this, android.R.layout.simple_list_item_1, datas
        );		// ArrayAdapter 이용해서 리스트뷰 만들어야됨
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view,
                                    final int position, long id) {	//리스트뷰 클릭했을때
                AlertDialog.Builder builder = new
                    AlertDialog.Builder(MainActivity.this);
                builder.setTitle("Hi");
                builder.setMessage("Are you deleted " + datas.get(position) + " ?");
                builder.setPositiveButton("yes", new
                                          DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        datas.remove(position);     	// 데이터 삭제
                        adapter.notifyDataSetChanged(); // 화면 refresh
                    }
                });
                builder.setNegativeButton("no", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
                builder.show();
            }
        });
    }

    public void getData(){				// 임의로 데이터 생성
        datas = new ArrayList();
        for(int i=0;i <= 20; i++){
            datas.add("Item: "+ i);
        }
        setList(datas);					// 리스트뷰.
    }

    public void ckbt(View v){			
        getData();
    }
}
```





#### 리사이클러뷰

> 리스트에 보이는 뷰를 반복적으로 사용할수 있게 한다.

* 데이터를 집합으로 관리하기 위해 자바클래스 생성 (person.java)

  * 변수, constructor, getter,setter

* 그 클래스가 나타내어질 나만의 ui 생성

  * layout에 person.xml 생성하고 세팅 -> imageView 1개, textView 2개

* mainactivity.java 이너클래스로 나만의 adaptor 생성

  ```JAVA
class PersonAdapter extends BaseAdapter{
  
    ArrayList<Person> datas;
      public PersonAdapter( ArrayList<Person> datas ){ // 데이터 넣기
          this.datas = datas;
      }
      @Override
      public int getCount() {  // 개수 세팅
          return datas.size();
      }
      @Override
      public Object getItem(int position) {   // 객체 가져오기
          return datas.get(position);
      }
      @Override
      public long getItemId(int position) {   // 포지션 번호
          return position;
      }
      @Override
      public View getView(int position, View convertView, ViewGroup parent) { // 화면!
          View view = null;
          LayoutInflater inflater = 
              (LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
          view = inflater.inflate(
                  R.layout.person,        // 화면
                  container,              // 화면 속 반복하길 원하는 뷰
                  true
          );
          // 화면에서 데이터 담기 위한 객체 불러옴
          ImageView im = view.findViewById(R.id.imageView);           
          TextView tx_name = view.findViewById(R.id.tx_name);
          TextView tx_phone = view.findViewById(R.id.tx_phone);
          Person p = datas.get(position);		// 데이터 넣기
          im.setImageResource(p.getId());
          tx_name.setText(p.getName());
          tx_phone.setText(p.getPhone());
          return view;
      }
  }
  
  ```
  
* Adapter 를 listView에 부착

  
      ```java
      public  void setList(ArrayList<Person> persons){
          PersonAdapter personAdapter = new PersonAdapter(persons);
          listView.setAdapter(personAdapter);
      }
      ```
  
  
* 데이터는 가상으로 생성 (생략)











