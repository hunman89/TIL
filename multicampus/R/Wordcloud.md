## KoNLP

> 워드 클라우드용 언어 분석 (한글)
>
> 영문: openNLP, RKEA, Snowball



* 데이터 가져오기 (readLines)

  ```r
  > wd <- readLines("wc.txt", encoding = "UTF-8")
  ```

  

* 명사 추출 (extractNoun)

  ```r
  > wd2 <- sapply(wd, extractNoun, USE.NAMES = F)		# 열 이름이 안나오게 함
  ```



* 단어추가

  > 사전에 없는 단어는 추출이 안되기 때문에 추가 해 준다.

  ```R
  > add_words <- c("사회적거리두기","코로나")
  > buildDictionary(user_dic = data.frame(add_words, rep("ncn", length(add_words))), replace_usr_dic = T)
  629899 words dictionary was built.
  ```



* 벡터로 변환

  ```r
  > lwd <- unlist(wd2)
  > lwd
    [1] "(서울=연합뉴스)"                    "김"                                 "기자"                               "정부"                               "추석"                              
    [6] "특별"                               "방역"                               "기간"                               "9."                                 "28∼10."                           
   [11] "11"                                 "뒤"                                 "다음"                               "주"                                 "적용"                              
   [16] "할"                                 "사회"                               "적"                                 "거리"                               "두"                                
   [21] "단계"                               "조정안"                             "11"                                 "발표"                               ""                                  
   [26] "영"                                 "중앙"                               "사고수습"                           "본부"                               "전략"                             
  ```



* 필터링 하기

  > 두글자 이상인 단어만 골라낸다.

  ```r
  > lwd2 <- Filter(function(x){ nchar(x) >= 2 },lwd)
  # 필터함수 내부에 함수를 정의하여 2개 이상의 단어만 골라낸다.
  ```



* 단어 세기

  ```r
  > wc <- table(lwd2)				# 빈도 세기
  > sort(wc, decreasing = T)		# 내림차순 정렬
  lwd2
  방역 연휴 감염 확진자 반장 
    9   9    8    8   7 
  집단 추석 집회 정부 관련 
    7   7   6   5    4 
  ...
  ```



* 특정단어 제거

  ```R
  lwd2 <- gsub("반장", "", lwd2)
  lwd2 <- gsub("관련", "", lwd2)
  ```

  

## wordcloud2

> 워드클라우드 만드는 패키지

```r
library(wordcloud2)
wordcloud2(wc, color = "random-light", backgroundColor = "black")
```



## 사진 내보내기

> 오류때문에 wordcloud1으로 생성;

* 필요한 package

  ```r
  library(KoNLP)
  library(wordcloud)
  library(tm)
  library(RCurl)
  library(RColorBrewer)
  ```



```R
# Dictionary setting
useSystemDic()
useSejongDic()
useNIADic()

# 단어추가
add_words <- c("사회적거리두기","코로나")
buildDictionary(user_dic = data.frame(add_words, rep("ncn", length(add_words))), replace_usr_dic = T)

# 데이터 가져오고, 명사추출
wd <- readLines("wc.txt", encoding = "UTF-8")
wd2 <- sapply(wd, extractNoun, USE.NAMES = F)

# 벡터로 변환
lwd <- unlist(wd2)

# 단어 필터링 (2개 이상만)
lwd2 <- Filter(function(x){ nchar(x) >= 2 },lwd)

# 쓸모없는 데이터 제거
lwd2 <- gsub("반장", "", lwd2)
lwd2 <- gsub("관련", "", lwd2)

# 단어 세기
wc <- table(lwd2)
sort(wc, decreasing = T)

# 사진 내보내기
jpeg(filename = "C:/R/1p.jpg", width = 300, height = 300, quality = 120)
palate <- brewer.pal(9,"Set1")
wordcloud(names(wc),freq=wc,scale=c(5,0,5), rot.per=0.35,min.freq=1, random.order=F, random.color=T, colors=palate)
dev.off()
```

