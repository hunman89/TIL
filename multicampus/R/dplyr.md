## dplyr

> 여러 함수가 담겨있다.

```r
> library(dplyr)

다음의 패키지를 부착합니다: ‘dplyr’

The following objects are masked from ‘package:stats’:

    filter, lag

The following objects are masked from ‘package:base’:

    intersect, setdiff, setequal, union

> str(mtcars)				# 샘플데이터 정보
'data.frame':	32 obs. of  11 variables:
 $ mpg : num  21 21 22.8 21.4 18.7 18.1 14.3 24.4 22.8 19.2 ...
 $ cyl : num  6 6 4 6 8 6 8 4 4 6 ...
 $ disp: num  160 160 108 258 360 ...
 $ hp  : num  110 110 93 110 175 105 245 62 95 123 ...
 $ drat: num  3.9 3.9 3.85 3.08 3.15 2.76 3.21 3.69 3.92 3.92 ...
 $ wt  : num  2.62 2.88 2.32 3.21 3.44 ...
 $ qsec: num  16.5 17 18.6 19.4 17 ...
 $ vs  : num  0 0 1 1 0 1 0 1 1 1 ...
 $ am  : num  1 1 1 0 0 0 0 0 0 0 ...
 $ gear: num  4 4 4 3 3 3 3 4 4 4 ...
 $ carb: num  4 4 1 1 2 1 4 2 2 4 ...
```



#### filter()

> 데이터 추출 (행)

```R 
> filter(mtcars, cyl == 4)			# mtcars에서 cyl 이 4인 행만 추출
    mpg cyl  disp  hp drat    wt  qsec vs am gear carb
1  22.8   4 108.0  93 3.85 2.320 18.61  1  1    4    1
2  24.4   4 146.7  62 3.69 3.190 20.00  1  0    4    2
3  22.8   4 140.8  95 3.92 3.150 22.90  1  0    4    2
4  32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
5  30.4   4  75.7  52 4.93 1.615 18.52  1  1    4    2
6  33.9   4  71.1  65 4.22 1.835 19.90  1  1    4    1
7  21.5   4 120.1  97 3.70 2.465 20.01  1  0    3    1
8  27.3   4  79.0  66 4.08 1.935 18.90  1  1    4    1
9  26.0   4 120.3  91 4.43 2.140 16.70  0  1    5    2
10 30.4   4  95.1 113 3.77 1.513 16.90  1  1    5    2
11 21.4   4 121.0 109 4.11 2.780 18.60  1  1    4    2
```



#### arrange()

> 정렬 
>
> 기본: 오름차순 desc(): 내림차순

```r
> head(arrange(mtcars, wt))				# wt 순으로 정렬
   mpg cyl  disp  hp drat    wt  qsec vs am gear carb
1 30.4   4  95.1 113 3.77 1.513 16.90  1  1    5    2
2 30.4   4  75.7  52 4.93 1.615 18.52  1  1    4    2
3 33.9   4  71.1  65 4.22 1.835 19.90  1  1    4    1
4 27.3   4  79.0  66 4.08 1.935 18.90  1  1    4    1
5 26.0   4 120.3  91 4.43 2.140 16.70  0  1    5    2
6 32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
```



#### select()

> 열 추출

```r
> head(select(mtcars, am, gear))
                  am gear
Mazda RX4          1    4
Mazda RX4 Wag      1    4
Datsun 710         1    4
Hornet 4 Drive     0    3
Hornet Sportabout  0    3
Valiant            0    3
```



#### mutate()

> 열 추가

```r
> head(mutate(mtcars, years = "1974"))
   mpg cyl disp  hp drat    wt  qsec vs am gear carb years
1 21.0   6  160 110 3.90 2.620 16.46  0  1    4    4  1974
2 21.0   6  160 110 3.90 2.875 17.02  0  1    4    4  1974
3 22.8   4  108  93 3.85 2.320 18.61  1  1    4    1  1974
4 21.4   6  258 110 3.08 3.215 19.44  1  0    3    1  1974
5 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2  1974
6 18.1   6  225 105 2.76 3.460 20.22  1  0    3    1  1974
```



#### distinct()

> 중복값 제거

```r
> distinct(mtcars, cyl)					# cyl에 어떤 값이 있는지.
  cyl
1   6
2   4
3   8
```



#### summarise()

> 요약
>
> mean(), median(), min(), max(), sum() 과 같이 사용

```r
> summarise(mtcars, mean(cyl), min(cyl), max(cyl))		# cyl의 평균, 최소, 최대
  mean(cyl) min(cyl) max(cyl)
1    6.1875        4        8
```



#### group_by()

> 그룹별로 묶기 = 다른함수과 연계

```r
> gr_cyl <- group_by(mtcars, cyl)
> summarise(gr_cyl, n())			# gr_cyl에서 cyl별 개수 요약
# A tibble: 3 x 2
    cyl `n()`
  <dbl> <int>
1     4    11
2     6     7
3     8    14
```



#### 샘플 추출

* sample_n() : 개수 기준

  ```r
  > sample_n(mtcars, 10)
      mpg cyl  disp  hp drat    wt  qsec vs am gear carb
  1  15.5   8 318.0 150 2.76 3.520 16.87  0  0    3    2
  2  10.4   8 472.0 205 2.93 5.250 17.98  0  0    3    4
  3  14.7   8 440.0 230 3.23 5.345 17.42  0  0    3    4
  4  32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
  5  18.7   8 360.0 175 3.15 3.440 17.02  0  0    3    2
  6  24.4   4 146.7  62 3.69 3.190 20.00  1  0    4    2
  7  19.2   6 167.6 123 3.92 3.440 18.30  1  0    4    4
  8  13.3   8 350.0 245 3.73 3.840 15.41  0  0    3    4
  9  21.5   4 120.1  97 3.70 2.465 20.01  1  0    3    1
  10 21.4   6 258.0 110 3.08 3.215 19.44  1  0    3    1
  ```

  

* sample_frac() : 비율 기준

  ```r
  > sample_frac(mtcars, 0.1)
     mpg cyl  disp  hp drat    wt  qsec vs am gear carb
  1 19.2   8 400.0 175 3.08 3.845 17.05  0  0    3    2
  2 19.7   6 145.0 175 3.62 2.770 15.50  0  1    5    6
  3 22.8   4 140.8  95 3.92 3.150 22.90  1  0    4    2
  ```

  

#### %>%

> 파이프 연산자 = 연결해서 연산

```r
#1
> gr_cyl <- group_by(mtcars, cyl)
> summarise(gr_cyl, n())			

> group_by(mtcars, cyl) %>% summarise(n())		#위 두연산을 파이프로 하나로

#2
> mp_rank <- mutate(mtcars, mpg_rank = rank(mpg))
> arrange(mp_rank, mpg_rank)

> mutate(mtcars, mpg_rank = rank(mpg)) %>% arrange(mpg_rank)
```

