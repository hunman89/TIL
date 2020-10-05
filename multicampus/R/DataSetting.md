## 데이터 준비

#### 엑셀파일 불러오기

* readxl 패키지 설치

  ```r
  > install.packages("readxl")
  > library(readxl)
  ```

* 파일 열기

  ```r
  > ex1 <- read_excel("C:/Users/hunma/Downloads/HelloR-master/HelloR-master/Data/data_ex.xls");
  > ex1
  # A tibble: 10 x 4
        ID SEX     AGE AREA 
     <dbl> <chr> <dbl> <chr>
   1     1 F        50 서울 
   2     2 M        40 경기 
   3     3 F        28 제주 
   4     4 M        50 서울 
   5     5 M        27 서울 
   6     6 F        23 서울 
   7     7 F        56 경기 
   8     8 F        47 서울 
   9     9 M        20 인천 
  10    10 F        38 경기 
  
  ex1 <- read_excel("data_ex.xls");			# 같은 디렉토리라면
  ```



#### txt 파일 불러오기

* tap으로 구분

```r
ex1 <- read.table("data_ex.txt", encoding = "UTF-8");  \
# 한글 깨지면 encoding 필요
# 또는 fileEncoding

str(ex1)

> ex1 <- read.table("data_exx.txt", header = TRUE);		# 헤더부분 조정
> ex1
    ID NAME AGE
1 id01  lee  10
2 id02  kim  29
3 id03 hong  30
4 id04   oh  40

> ex1 <- read.table("data_exx.txt", skip=1);			# 헤더 이름 변경 가능
> colnames(ex1) <- c("id","name","age")
> ex1
    id name age
1 id01  lee  10
2 id02  kim  29
3 id03 hong  30
4 id04   oh  40
```

* `,`로 구분

  ```r
  > ex1 <- read.table("mydata.txt", sep = ",", header=T);
  > ex1
      id name age
  1 id01  lee  10
  2 id02  kim  20
  > str(ex1)
  'data.frame':	2 obs. of  3 variables:
   $ id  : Factor w/ 2 levels "id01","id02": 1 2
   $ name: Factor w/ 2 levels "kim","lee": 2 1
   $ age : int  10 20
  
  > ex1 <- read.table("mydata.txt", sep = ",", header=T, stringsAsFactors = F);						# factor를 string으로
  > str(ex1)
  'data.frame':	2 obs. of  3 variables:
   $ id  : chr  "id01" "id02"
   $ name: chr  "lee" "kim"
   $ age : int  10 20
  ```

  

