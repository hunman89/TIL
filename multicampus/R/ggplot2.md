## ggplot2

> R 시각화



* ggplot = 기본틀

  ```r
  > library(ggplot2)
  > ggplot(airquality,aes(x=Day,y=Temp))		# x,y축만 그려진다.
  ```

  

#### 그래프 그리기

```r
ggplot(airquality,aes(x=Day,y=Temp)) + geom_point()  # 뒤에 붙인다.
```



* geom_point() : 산점도

* geom_line : 꺾은선 그래프

* 둘을 합칠수도 있다.

  ```r
  ggplot(airquality,aes(x=Day,y=Temp)) + 
    geom_point(size=3,color="red")+ geom_line()
  ```

  

* 막대그래프

  ```r
  ggplot(mtcars,aes(x=cyl)) + geom_bar(width=0.5)  # y축 지정 안한다.
  ```



* 누적막대그래프

  ```r
  ggplot(mtcars,aes(x=factor(cyl))) + geom_bar(aes(fill = factor(gear)))
  # 비어있는 값을 제외하려면 factor사용
  ```

* 썬버스트 차트

  ```r
  + coord_polar()
  ```

* 상자 그림

  ```r
  + geom_boxplot()
  ```

* 히스토그램

  ```r
  + geom_histogram()
  ```



#### 객체 추가

* 직선

  ```r 
  + geom_abline()
  ```

* 평행선

  ```r 
  + geom_hline()
  ```

* 텍스트

  ```r
  + geom_point()
  ```

  

* 도형

  ```r
  + anotate("모양", xmin=x축시작, xmax=x축끝, ymin=, ymax=)
  ```

* 제목, 축제목, 테마

  ```r
  ggplot(mtcars,aes(x=factor(cyl))) + 
    geom_bar(aes(fill = factor(gear))) +
    labs(x="실린더", y="기어", title="차량정보")			# labs.
  ```

  

