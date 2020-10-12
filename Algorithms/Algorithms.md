## 알고리즘이란?

> 페르시아의 수학자 '알콰리즈미'
>
> 어떤 문제를 컴퓨터로 풀기위한 효율적인 절차

* 문제를 푸는 단계별 절차를 명확하게 기술
* 어떤 문제의 __모든 입력 사례__에 대해서 해답을 찾아야 한다.
* **효율적으로**



#### 목적

- 어떤 문제를 컴퓨터로 해결하는 방법을 공부
- 특정 프로그래밍 언어와 무관
- 알고리즘 설계 기법을 공부함



#### 예) 

#### 순차탐색문제

* 문제: 어떤 수 x가 n개의 수로 구성된 리스트 S에 존재하는가?
* 해답:  x가 존재하면 x의 인덱스가, 존재하지 않으면 0이 해답

* 파라미터: 정수 n(>0), 리스트 S(인덱스 범위는 1 부터 n 까지), 원소 x

* 입력 사례: S = [0, 10, 7, 11, 5, 13, 8], n = 6, x = 5

* 해답: location = 4

* 알고리즘

  ```python
  def seqsearch (n, S, x):
      location = 1
      while (location <= n and S[loaction] != x):
          location += 1
      if (location > n):
          location = 0
      return location    
  ```



#### 리스트 원소의 합

```python
def sum(n S):
    result = 0
    for i in range(1, n + 1):
        result = result + S[i]
    return result
```



#### 리스트 정렬

* 알고리즘: 모든 𝑆에 대해서 𝑆′을 찾아주는 단계별 절차
  * 교환 정렬, 삽입 정렬, 선택 정렬, 합병 정렬, 퀵 정렬, 기타 등등.

* 교환 정렬

  ```python
  def exchange (S):
  	n = len(S)
  	for i in range(n - 1):
  	for j in range(i + 1, n):
  		if (S[i] > S[j]):
  			S[i], S[j] = S[j], S[i] 		# swap
  ```

  

#### 행렬의 곱셈 문제

> 3중 for

```python
def matrixmult (A, B):
	n = len(A)
	C = [[0] * n for _ in range(n)]		# 0으로 이루어진 n x n 정방행렬
	for i in range(n):
		for j in range(n):
			for k in range(n):
				C[i][j] += A[i][k] * B[k][j]
	return C
```



