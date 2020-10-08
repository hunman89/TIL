## Reshape2

#### melt()

> 가로 테이블을 세로로

```r
> library(reshape2)
> names(airquality) <- tolower(names(airquality)) # 변수명을 소문자로 -> 실수를 막는다.
> head(airquality)								  #데이터 구조 파악
  ozone solar.r wind temp month day
1    41     190  7.4   67     5   1
2    36     118  8.0   72     5   2
3    12     149 12.6   74     5   3
4    18     313 11.5   62     5   4
5    NA      NA 14.3   56     5   5
6    28      NA 14.9   66     5   6
> m_air <- melt(airquality)						 		 # 기준이 없다
No id variables; using all as measure variables
> head(m_air)
  variable value
1    ozone    41
2    ozone    36
3    ozone    12
4    ozone    18
5    ozone    NA
6    ozone    28

> m_air <- melt(airquality, id.vars = c("month","day"))	# 기준 = month, day
> head(m_air)
  month day variable value
1     5   1    ozone    41
2     5   2    ozone    36
3     5   3    ozone    12
4     5   4    ozone    18
5     5   5    ozone    NA
6     5   6    ozone    28

> m_air <- melt(airquality, id.vars = c("month","day"), measure.vars = "temp")
			# 값 중 temp만 불러온다.
> head(m_air)
  month day variable value
1     5   1     temp    67
2     5   2     temp    72
3     5   3     temp    74
4     5   4     temp    62
5     5   5     temp    56
6     5   6     temp    66
```



#### dcast()

> 가로데이터를 세로로

```r
> library(reshape2)
> names(airquality) <- tolower(names(airquality))
> m_air <- melt(airquality, id.vars = c("month","day"))
> head(m_air)
  month day variable value
1     5   1    ozone    41
2     5   2    ozone    36
3     5   3    ozone    12
4     5   4    ozone    18
5     5   5    ozone    NA
6     5   6    ozone    28
> n_air <- dcast(m_air, month + day ~ variable)		# (데이터세트, 기준열 ~ 변환열)
> head(n_air)
  month day ozone solar.r wind temp
1     5   1    41     190  7.4   67
2     5   2    36     118  8.0   72
3     5   3    12     149 12.6   74
4     5   4    18     313 11.5   62
5     5   5    NA      NA 14.3   56
6     5   6    28      NA 14.9   66
```



#### acast()

> dcast와 같은기능, dcast는 주로 데이터프레임을 다룰때 쓴다.

```r
> library(reshape2)
> names(airquality) <- tolower(names(airquality))
> m_air <- melt(airquality, id.vars = c("month","day"), na.rm = T)
> head(m_air)
  month day variable value
1     5   1    ozone    41
2     5   2    ozone    36
3     5   3    ozone    12
4     5   4    ozone    18
6     5   6    ozone    28
7     5   7    ozone    23
> a_air <- acast(m_air, month ~ variable, mean)		# 월별 평균 계산 가능
> head(a_air)
     ozone  solar.r      wind     temp
5 23.61538 181.2963 11.622581 65.54839
6 29.44444 190.1667 10.266667 79.10000
7 59.11538 216.4839  8.941935 83.90323
8 59.96154 171.8571  8.793548 83.96774
9 31.44828 167.4333 10.180000 76.90000
```

