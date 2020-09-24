#### 20200924

## HIVE QL

> 하이브에서 사용하는 SQL과 유사한 문장

* HIVE CLI

  ```
  hive>
  ```



* 예제 (어떻게 되는지만 보자)

  * 테이블 만들기 (**테이블엔 데이터가 들어가지는 않고 구조만 들어간다.**)

    ```
    hive> CREATE TABLE HDI(id INT, country STRING, hdi FLOAT, lifeex INT, mysch INT, eysch INT, gni INT) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' STORED AS TEXTFILE;
    ```

  * 파일 넣고 TEST

    ```
    hive>load data local inpath '/root/hdi.txt' into table HDI;
    hive> select * from hdi limit 5;
    ```

    * inpath 뒤에 파일 경로를 넣는다.

* 예제 2

  * ```
    hive>  TABLE airline_delay(
    Year INT,
    MONTH INT,
    DayofMonth INT,
    DayofWeek INT,
    DepTime INT,
    CRSDepTime INT,
    ArrTime INT,
    CRSArrTime INT,
    UniqueCarrier STRING,
    FlightNum INT,
    TailNum STRING,
    ActualElapsedTime INT,
    CRSElapsedTime INT,
    AirTime INT,
    ArrDelay INT,
    DepDelay INT,
    Origin STRING,
    Dest STRING,
    Distance INT,
    TaxiIn INT,
    TaxiOut INT,
    Cancelled INT,
    CancellationCode STRING
    COMMENT 'A = carrier, B = weather, C = NAS, D = security',
    Diverted INT COMMENT '1 = yes, 0 = no',
    CarrierDelay STRING,
    WeatherDelay STRING,
    NASDelay STRING,
    SecurityDelay STRING,
    LateAircraftDelay STRING)
    COMMENT 'TEST DATA'
    PARTITIONED BY (delayYear INT)				// 구분되는 기준 (하나의 디렉터리)
    ROW FORMAT DELIMITED						//	
    FIELDS TERMINATED BY ','					// 데이터안에서 구분 기준
    LINES TERMINATED BY '\n'					// 하나의 데이터 기준
    STORED AS TEXTFILE;							//	
    ```

  * alter , drop 가능

  * 테이블 보기

    ````
    hive> show tables;
    
    OK
    airline_delay			// 방금 만든것도 들어가 있다.
    hdi
    ````

  * 파일넣고 test
  
    ```
    hive> LOAD DATA LOCAL INPATH '/root/2006.csv' OVERWRITE INTO TABLE airline_delay PARTITION (delayyear='2006');
    
    Loading data to table default.airline_delay partition (delayyear=2006)
    Partition default.airline_delay{delayyear=2006} stats: [numFiles=2, numRows=0, totalSize=1344136192, rawDataSize=0]
    OK
    Time taken: 3.592 seconds
    
    hive> LOAD DATA LOCAL INPATH '/root/2007.csv' OVERWRITE INTO TABLE airline_delay PARTITION (delayyear='2007');			
    // overwrite를 해 중복된 데이터가 있어도 무시하고 덮어쓴다.
    
    Loading data to table default.airline_delay partition (delayyear=2007)
    Partition default.airline_delay{delayyear=2007} stats: [numFiles=1, numRows=0, totalSize=702878193, rawDataSize=0]
    OK
    Time taken: 2.736 seconds
    
    hive> SELECT year, month, deptime, arrtime, uniquecarrier, flightnum
        > FROM airline_delay
        > WHERE delayYear = '2006'			// 년도를 지정하구 
        > LIMIT 10;							// 제한을 둬 너무많은 데이터가 나오지 않게 한다.						
      
    OK
    NULL	NULL	NULL	NULL	UniqueCarrier	NULL
    2006	1	743	1024	US	343
    2006	1	1053	1313	US	613
    2006	1	1915	2110	US	617
    2006	1	1753	1925	US	300
    2006	1	824	1015	US	765
    2006	1	627	834	US	295
    2006	1	825	1041	US	349
    2006	1	942	1155	US	356
    2006	1	1239	1438	US	775
    Time taken: 0.311 seconds, Fetched: 10 row(s)
    ```
  
  * 년도별 도착 딜레이 시간과 출발 딜레이 시간의 평균을 구하라
  
    ```
    hive> SELECT Year,AVG(ArrDelay),AVG(DepDelay) FROM airline_delay GROUP BY Year;   
    ...
    MapReduce Total cumulative CPU time: 34 seconds 650 msec
    Ended Job = job_202009241409_0004
    MapReduce Jobs Launched: 
    Stage-Stage-1: Map: 6  Reduce: 7   Cumulative CPU: 34.65 sec   HDFS Read: 1609095140 HDFS Write: 123 SUCCESS
    Total MapReduce CPU Time Spent: 34 seconds 650 msec
    OK
    2007	10.19218057072105	11.399141744487839
    2008	10.27356916693868	11.436358787409533
    2006	8.6828402630457	10.09364218286413
    Time taken: 41.87 seconds, Fetched: 3 row(s)
    ```
  
  * 2006년 월별 출발, 도착지연시간의 평균
  
    ```
    hive> SELECT Year, Month, avg(ArrDelay), avg(DepDelay) FROM airline_delay WHERE delayYear=2006 GROUP BY Year,Month;
    ...
    2006	1	5.628670654061354	8.07821697287839
    2006	4	6.42371018386133	8.194027787617042
    2006	7	11.311533589317666	12.703435985382688
    2006	10	10.687462234136667	10.645491813519145
    2006	2	7.359394190631357	9.142587613519657
    2006	5	6.887169414051858	8.540831601948103
    2006	8	8.687386516224231	9.9368251665323
    2006	11	7.258614938235141	8.958552924793501
    2006	3	7.926261109192763	9.755770701319042
    2006	6	12.0455579467206	12.933676964845205
    2006	9	8.394922875816993	8.760105880654693
    2006	12	11.179542468360811	13.155174000790913
    ...
    ```
  
    * order by 쓰면 sorting 가능
  
* join

  * 하이브는 EQ 조인만 지원한다.
  * 서술자: `=` 
  * FROM 절에 테이블 하나만 저장할 수 있고, ON 키워드를 사용 해 조인을 처리해야 한다.  

* 데이터 정렬
  * ORDER BY
    * 정렬데이터가 크면 느려진다.
  * SORT BY
    * 성능을 높여주나, 각 리듀서의 출력결과에 동일한 키가 형성될 수 있다.
  * DISTRIBUTED BY
    * 각 리듀서의 키가 중복되지 않게 한다.
    * SORT BY 앞에 사용
  * CLUSTERED BY
    * SORT BY + DISTRIBUTED BY