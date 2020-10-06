## 기초 통계 분석 함수

> 데이터의 특성 파악



#### summary

```r
> summary(smr1)
     AREA              AVG_AMT           AVG_CNT      
 Length:4           Min.   : 175000   Min.   : 4.000  
 Class :character   1st Qu.: 668750   1st Qu.: 5.125  
 Mode  :character   Median : 881667   Median :18.083  
                    Mean   : 765833   Mean   :21.042  
                    3rd Qu.: 978750   3rd Qu.:34.000  
                    Max.   :1125000   Max.   :44.000
```



#### describe

```r
> install.packages("psych")
> library(psych)
> describe(smr1)
        vars n      mean        sd    median   trimmed       mad    min
AREA*      1 3      2.00      1.00      2.00      2.00      1.48      1
AVG_AMT    2 4 765833.33 412145.47 881666.67 765833.33 216212.50 175000
AVG_CNT    3 4     21.04     19.59     18.08     21.04     19.77      4
            max  range  skew kurtosis        se
AREA*         3      2  0.00    -2.33      0.58
AVG_AMT 1125000 950000 -0.55    -1.79 206072.74
AVG_CNT      44     40  0.14    -2.27      9.80
```



#### 빈도분석 (Freq)

```r
> install.packages("descr")
> library(descr)

> fq <- freq(bind_col_inner$AREA, plot = F)
> fq
bind_col_inner$AREA 
      Frequency Percent
경기          3   42.86
서울          4   57.14
Total         7  100.00
```



## 그래프

> 정적인 이미지를 반환한다.

#### stem

> 줄기 잎 그림

#### hist

> 히스토그램

```R
> hist(bind_col_full$SUM_CNT)
```

#### freq

#### barplot

#### boxplot

```r
> boxplot(bind_col_full$AGE)
```

