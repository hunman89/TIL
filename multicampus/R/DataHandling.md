## 데이터 분석



#### NA 처리

```r
> sh
    ID   NAME AGE TEMP PRICE QT TOTAL
1 id01 이말숙  23   15 10000  1 10000
2 id02 김말숙  28   NA 20000  2 40000
3 id03 홍말숙  30   15 30000  3 90000
> tt <- rowSums(sh[,c(4:7)])				
> tt
[1]  20016     NA 120018

> tt <- rowSums(sh[,c(4:7)], na.rm = T)			# 연산할 때 NA를 빼야 한다.
> tt
[1]  20016  60002 120018
```



#### 연산자

* 몫 : %/%
* 나머지: %%



#### 데이터 파악

* View() : 보기
* str() : 변수의 속성
* dim() : 차원 확인
* ls() : 열 제목



#### 변수명 변경하기

```R
> sh <- read.csv("shop2.txt",
+                header = T,
+                stringsAsFactors=F,
+                fileEncoding = "UTF-8")
> sh
  TX_ID  TX_NM TX_A TX_T  TX_P TX_Q
1  id01 이말숙   23   15 10000    1
2  id02 김말숙   28   NA 20000    2
3  id03 홍말숙   30   15 30000    3

> install.packages("dplyr")					# 라이브러리
> library(dplyr)

> rename(sh,ID=TX_ID, NAME=TX_NM,AGE=TX_A,TEMP=TX_T,PRICE=TX_P,QT=TX_Q)
    ID   NAME AGE TEMP PRICE QT
1 id01 이말숙  23   15 10000  1
2 id02 김말숙  28   NA 20000  2
3 id03 홍말숙  30   15 30000  3

> sh <- rename(sh,ID=TX_ID, NAME=TX_NM,AGE=TX_A,TEMP=TX_T,PRICE=TX_P,QT=TX_Q)
# 적용
```



#### 파생변수생성

* 변수 변환

```r
> sh$AGE_NY <- ifelse(sh$AGE>=25,"Y","N") 	 	# 25세 이상이면 Y
> sh
    ID   NAME AGE TEMP PRICE QT AGE_NY
1 id01 이말숙  23   15 10000  1      N
2 id02 김말숙  28   NA 20000  2      Y
3 id03 홍말숙  30   15 30000  3      Y
```

```R
> sh$AGE_HL <- ifelse(sh$AGE>=30,"H",
+                     ifelse(sh$AGE>=25,"M",
+                            ifelse(sh$AGE>=20,"L","F")))
> sh
    ID   NAME AGE TEMP PRICE QT AGE_NY AGE_HL
1 id01 이말숙  23   15 10000  1      N      L
2 id02 김말숙  28   NA 20000  2      Y      M
3 id03 홍말숙  30   15 30000  3      Y      H
```



#### 변수 추출

> dplyr 라이브러리이다.

* select

    ```r
    > sh %>% select(ID)
        ID
    1 id01
    2 id02
    3 id03
    4 id01
    5 id02
    6 id03
    7 id01
    8 id02
    9 id03

    > sh2 <- sh %>% select(ID,AGE,GRADE)		# 따로 저장할 수 있다.
    > sh2
        ID AGE GRADE
    1 id01  23     B
    2 id02  28     G
    3 id03  30     G
    4 id01  23     S
    5 id02  28     S
    6 id03  30     G
    7 id01  23     G
    8 id02  28     G
    9 id03  30     G

    > sh2 <- sh %>% select(-ID,-AGE,-GRADE)		# 빼기 가능
    > sh2
        NAME TEMP PRICE QT YYYY MM DD AGE_HL
    1 이말숙   15 10000  1 2020  9 30      L
    2 김말숙   NA 20000  2 2020  9 30      M
    3 홍말숙   15 30000  3 2020  9 30      H
    4 이말숙   33 10000  2 2020 10  1      L
    5 김말숙   33 20000  1 2020 10  1      M
    6 홍말숙   33 30000  2 2020 10  1      H
    7 이말숙   25 10000  5 2020  8  1      L
    8 김말숙   25 20000  4 2020  8  1      M
    9 홍말숙   25 30000  6 2020  8  1      H
    ```

* 추출 (filter)

  ```R
  > sh3 <- sh %>% filter(GRADE == 'G')
  > sh3
      ID   NAME AGE TEMP PRICE QT YYYY MM DD AGE_HL GRADE
  1 id02 김말숙  28   NA 20000  2 2020  9 30      M     G
  2 id03 홍말숙  30   15 30000  3 2020  9 30      H     G
  3 id03 홍말숙  30   33 30000  2 2020 10  1      H     G
  4 id01 이말숙  23   25 10000  5 2020  8  1      L     G
  5 id02 김말숙  28   25 20000  4 2020  8  1      M     G
  6 id03 홍말숙  30   25 30000  6 2020  8  1      H     G
  
  > sh3 <- sh %>% filter(GRADE == 'G' & AGE_HL == 'M' & TEMP != 'NA')
  > sh3
    ID   NAME AGE TEMP PRICE QT YYYY MM DD AGE_HL GRADE
  1 id02 김말숙  28   25 20000  4 2020  8  1      M     G
  ```
  
* 정렬 (arrange)

    ```R
    > sh4 <- sh %>% arrange(AGE)			# 나이순 정렬
    > sh4
        ID   NAME AGE TEMP PRICE QT YYYY MM DD AGE_HL GRADE
    1 id01 이말숙  23   15 10000  1 2020  9 30      L     B
    2 id01 이말숙  23   33 10000  2 2020 10  1      L     S
    3 id01 이말숙  23   25 10000  5 2020  8  1      L     G
    4 id02 김말숙  28   NA 20000  2 2020  9 30      M     G
    5 id02 김말숙  28   33 20000  1 2020 10  1      M     S
    6 id02 김말숙  28   25 20000  4 2020  8  1      M     G
    7 id03 홍말숙  30   15 30000  3 2020  9 30      H     G
    8 id03 홍말숙  30   33 30000  2 2020 10  1      H     G
    9 id03 홍말숙  30   25 30000  6 2020  8  1      H     G
    
    > sh4 <- sh %>% arrange(desc(AGE))		# 내림차순
    > sh4
        ID   NAME AGE TEMP PRICE QT YYYY MM DD AGE_HL GRADE
    1 id03 홍말숙  30   15 30000  3 2020  9 30      H     G
    2 id03 홍말숙  30   33 30000  2 2020 10  1      H     G
    3 id03 홍말숙  30   25 30000  6 2020  8  1      H     G
    4 id02 김말숙  28   NA 20000  2 2020  9 30      M     G
    5 id02 김말숙  28   33 20000  1 2020 10  1      M     S
    6 id02 김말숙  28   25 20000  4 2020  8  1      M     G
    7 id01 이말숙  23   15 10000  1 2020  9 30      L     B
    8 id01 이말숙  23   33 10000  2 2020 10  1      L     S
    9 id01 이말숙  23   25 10000  5 2020  8  1      L     G
    
    > sh4 <- sh %>% arrange(desc(AGE),MM)		# 두가지 조건
    > sh4
        ID   NAME AGE TEMP PRICE QT YYYY MM DD AGE_HL GRADE
    1 id03 홍말숙  30   25 30000  6 2020  8  1      H     G
    2 id03 홍말숙  30   15 30000  3 2020  9 30      H     G
    3 id03 홍말숙  30   33 30000  2 2020 10  1      H     G
    4 id02 김말숙  28   25 20000  4 2020  8  1      M     G
    5 id02 김말숙  28   NA 20000  2 2020  9 30      M     G
    6 id02 김말숙  28   33 20000  1 2020 10  1      M     S
    7 id01 이말숙  23   25 10000  5 2020  8  1      L     G
    8 id01 이말숙  23   15 10000  1 2020  9 30      L     B
    9 id01 이말숙  23   33 10000  2 2020 10  1      L     S
    ```

    

* 요약 (summarise, group_by)

  ```R
  > smr <- sh %>% summarise(TOT = sum(PRICE), AGES = mean(AGE))
  > smr
       TOT AGES
  1 180000   27
  
  > smr2 <- sh %>% group_by(NAME) %>% summarise(TOTAVG = mean(PRICE*QT))
  # 리스트가 반환되기 때문에 데이터 프레임으로 타입 변경
  > smr3 <- as.data.frame(smr2)		
  > smr3
      NAME    TOTAVG
  1 김말숙  46666.67
  2 이말숙  26666.67
  3 홍말숙 110000.00
  
  # groupby 없을때
  > smr2 <- sh %>% summarise(TOTAVG = mean(PRICE*QT))
  > smr3 <- as.data.frame(smr2)
  > smr3
      TOTAVG
  1 61111.11
  ```

* 결합

  * 세로결합

  ```r
  bind_rows()
  ```
  
  
  
  * 가로결합
  
    | 함수                                      | 설명                  |
    | ----------------------------------------- | --------------------- |
    | left_join(데이터1,데이터2,by = "변수명")  | 변수와 데이터1을 기준 |
    | inner_join(데이터1,데이터2,by = "변수명") | 변수가 동일할때만     |
    | full_join(데이터1,데이터2,by = "변수명")  | 변수 전체 결합        |
  
      ```r
    > y16
      ID  AMT16 Y16_CNT
    1  1 100000      40
    2  2 700000      30
    3  3  50000       5
    4  4 125000       3
    5  5 760000      28
    6  6 300000       6
    7  7 130000       2
    8  8 400000       7
    9 10 550000      16
    > y17
      ID SEX AGE AREA   AMT17 Y17_CNT
    1  1   F  50 서울 1300000      50
    2  2   M  40 경기  450000      25
    3  4   M  50 서울  400000       8
    4  5   M  27 서울  845000      30
    5  7   F  56 경기  150000       2
    6  8   F  47 서울  570000      10
    7  9   M  20 인천  930000       4
    8 10   F  38 경기  520000      17
    
    > bind_col <- left_join(y17,y16, by="ID")		# left_join
    > bind_col
      ID SEX AGE AREA   AMT17 Y17_CNT  AMT16 Y16_CNT
    1  1   F  50 서울 1300000      50 100000      40
    2  2   M  40 경기  450000      25 700000      30
    3  4   M  50 서울  400000       8 125000       3
    4  5   M  27 서울  845000      30 760000      28
    5  7   F  56 경기  150000       2 130000       2
    6  8   F  47 서울  570000      10 400000       7
    7  9   M  20 인천  930000       4     NA      NA
    8 10   F  38 경기  520000      17 550000      16
    
    > bind_col <- left_join(y16,y17, by="ID")
    > bind_col
      ID  AMT16 Y16_CNT  SEX AGE AREA   AMT17 Y17_CNT
    1  1 100000      40    F  50 서울 1300000      50
    2  2 700000      30    M  40 경기  450000      25
    3  3  50000       5 <NA>  NA <NA>      NA      NA
    4  4 125000       3    M  50 서울  400000       8
    5  5 760000      28    M  27 서울  845000      30
    6  6 300000       6 <NA>  NA <NA>      NA      NA
    7  7 130000       2    F  56 경기  150000       2
    8  8 400000       7    F  47 서울  570000      10
    9 10 550000      16    F  38 경기  520000      17
    
    > bind_col_inner <- inner_join(y17,y16, by="ID")	# inner
    > bind_col_inner
      ID SEX AGE AREA   AMT17 Y17_CNT  AMT16 Y16_CNT
    1  1   F  50 서울 1300000      50 100000      40
    2  2   M  40 경기  450000      25 700000      30
    3  4   M  50 서울  400000       8 125000       3
    4  5   M  27 서울  845000      30 760000      28
    5  7   F  56 경기  150000       2 130000       2
    6  8   F  47 서울  570000      10 400000       7
    7 10   F  38 경기  520000      17 550000      16
    
    > bind_col_full <- full_join(y17,y16, by="ID")		# full
    > bind_col_full
       ID  SEX AGE AREA   AMT17 Y17_CNT  AMT16 Y16_CNT
    1   1    F  50 서울 1300000      50 100000      40
    2   2    M  40 경기  450000      25 700000      30
    3   4    M  50 서울  400000       8 125000       3
    4   5    M  27 서울  845000      30 760000      28
    5   7    F  56 경기  150000       2 130000       2
    6   8    F  47 서울  570000      10 400000       7
    7   9    M  20 인천  930000       4     NA      NA
    8  10    F  38 경기  520000      17 550000      16
    9   3 <NA>  NA <NA>      NA      NA  50000       5
    10  6 <NA>  NA <NA>      NA      NA 300000       6
      ```
  
    

#### 결측값 처리

```r
> bind_col_full$SUM_AMT <- rowSums(bind_col_full %>% select(AMT17,AMT16), na.rm = T)
> bind_col_full
   ID  SEX AGE AREA   AMT17 Y17_CNT  AMT16 Y16_CNT SUM_AMT
1   1    F  50 서울 1300000      50 100000      40 1400000
2   2    M  40 경기  450000      25 700000      30 1150000
3   4    M  50 서울  400000       8 125000       3  525000
4   5    M  27 서울  845000      30 760000      28 1605000
5   7    F  56 경기  150000       2 130000       2  280000
6   8    F  47 서울  570000      10 400000       7  970000
7   9    M  20 인천  930000       4     NA      NA  930000
8  10    F  38 경기  520000      17 550000      16 1070000
9   3 <NA>  NA <NA>      NA      NA  50000       5   50000
10  6 <NA>  NA <NA>      NA      NA 300000       6  300000

> bind_col_full$SUM_CNT <- rowSums(bind_col_full %>% select(Y17_CNT,Y16_CNT), na.rm = T)
```

