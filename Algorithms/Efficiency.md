## 알고리즘의 효율성

> **시간** 과 **공간** 사용량의 효율성



#### 순차탐색 vs 이분검색(binary search)

* 입력 리스트의 조건에 따른 탐색 알고리즘의 선택
  * 정렬되지 않은 리스트에서 키 찾기: 순차 탐색
  * 정렬된 리스트에서 키 찾기: 이분 검색



* binary search ?

    ```python
      def binsearch(n, S, x):
        low = 1
        high = n
        location = 0
        while (low <= high and location == 0):
            mid = (low + high) // 2			# 중앙 인덱스 설정
            if (x == S[mid]):
                location = mid
            elif (x < S[mid]):
                high = mid - 1
            else:
                low = mid + 1
        return location
    ```

* 효율성 비교

  | 리스트 크기   | 순차 탐색 비교 횟수 (n) | 이분 검색 비교 횟수 (lg n + 1) |
  | ------------- | ----------------------- | ------------------------------ |
  | 128           | 128                     | 8                              |
  | 1024          | 1024                    | 11                             |
  | 1048576       | 1048576                 | 21                             |
  | 4,294,987,296 | 4,294,987,296           | 33                             |



#### 피보나치 수열의 n 번째 항

* 재귀(Recursive)

  ```python
  def fib (n):
  	if (n <= 1):
  		return n
  	else:
  		return fib(n - 1) + fib(n - 2)
  ```

  * 작성하기도 쉽고 이해하기도 쉬움
  * 너무 비효율적 : 함수 호출이 수도 없이 많이 일어난다.

* 개선

  * 계산된 피보나치 항은 리스트에 넣고 꺼내 쓰기만 하자 (시간 개선)

    ```python
    def fib2 (n):
    	f = [0] * (n + 1)
    	if (n > 0):
    		f[1] = 1
    		for i in range(2, n + 1):
    			f[i] = f[i - 1] + f[i - 2]
    	return f[n]
    ```

* 공간적인 측면 : 리스트를 사용하지 않아도 되는가?

  ```python
  def fib3 (n):
  	a, b = 0 , 1
  	for i in range(n):
  		a, b = b, a + b
  	return a
  ```

  