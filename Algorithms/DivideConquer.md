## 분할정복

> Divide-and-Conquer
>
> 알고리즘 설계 기법 중 하나다.



#### 분할정복 설계 전략

* 분할: 문제의 입력사례를 둘 이상의 작은 입력사례로 분할
* 정복: 작은 입력사례들을 각각 정복 작은 입력사례들이 충분히 작지 않으면 재귀 호출
* 통합: 필요하면, 작은 입력사례의 해답을 통합하여 원래 입력사례의 해답을 도출



#### 다른 전략과 비교

* 분할정복 vs 동적계획

  * 하향식(Top-Down) vs 상향식(Bottom-Up) 문제풀이 방식
  * 피보나치 (재귀) vs 피보나치 (개선: 차례대로 계산)
* 분할정복 vs 탐욕법
  * 	 탐욕법은 가장 비효율적인 분할정복 알고리즘



#### 이분검색

* [Divide] 정가운데 원소를 기준으로 𝑆를 두 개의 리스트로 분할
* [Conquer] 𝑥가 정가운데 원소보다 크면 오른쪽, 작으면 왼쪽을 재귀 호출
* [Obtain] 선택한 리스트에서 얻은 답을 리턴

```python
def location (S, low, high):
	if (low > high):
		return 0
	else:
		mid = (low + high) // 2
		if (x == S[mid]):
			return mid
		elif (x < S[mid]):
			return location(S, low, mid - 1)
		else:
			return location(S, mid + 1, high)
```



#### 합병정렬

* [Divide] 원소가 𝑛개인 𝑆를 𝑛/2개의 원소를 가진 두 개의 리스트로 분할
* [Conquer] 왼쪽의 리스트와 오른쪽의 리스트를 각각 재귀적으로 합병 정렬
* [Combine] 각각 정렬된 두 개의 리스트를 정렬된 하나의 리스트로 합병하여 리턴

```python
def mergesort (S):
	n = len(S)
	if (n <= 1):
		return S
	else:
		mid = n // 2
		U = mergesort(S[0 : mid])
		V = mergesort(S[mid : n])
		return merge(U, V)

def merge(U, V):
	S = []
	i = j = 0
	while (i < len(U) and j < len(V)):			# 정렬된 리스트 둘 비교
		if (U[i] < V[j]):						# 앞에서부터 차례로 하나씩
			S.append(U[i])						# 비교하면서 작은걸 붙인다
			i += 1
		else:
			S.append(V[j])
			j += 1
	if (i < len(U)):							# 먼저 소진된쪽의 반대 뒷부분을
		S += U[i : len(U)]						# 모두 붙인다.
	else:
		S += V[j : len(V)]
	return S

```

* 문제점 : 리스트를 많이 사용한다.

```python
def mergesort2 (S, low, high):
	if (low < high):
		mid = (low + high) // 2
		mergesort2(S, low, mid)
		mergesort2(S, mid + 1, high)
		merge2(S, low, mid, high)
        
def merge2 (S, low, mid, high):
	U = []
	i = low
	j = mid + 1
	while (i <= mid and j <= high):
		if (S[i] < S[j]):
			U.append(S[i])
			i += 1
		else:
			U.append(S[j])
			j += 1
	if (i <= mid):
		U += S[i : mid + 1]
	else:
		U += S[j : high + 1]
	for k in range(low, high + 1):
		S[k] = U[k - low]
```



#### 퀵 정렬

* 내부(in-place) 정렬: 추가적인 리스트를 사용하지 않는 정렬
* [Divide] 기준 원소(pivot)를 정해서 기준원소를 기준으로 좌우로 분할
* [Conquer] 왼쪽의 리스트와 오른쪽의 리스트를 각각 재귀적으로 퀵 정렬
* [Obtain] 정렬된 리스트를 리턴

```python
def quicksort (S, low, high):
	if (high > low):
		pivotpoint = partition(S, low, high)
		quicksort(S, low, pivotpoint - 1)
		quicksort(S, pivotpoint + 1, high)
        
def partition2 (S, low, high):
	pivotitem = S[low]
	i = low + 1
	j = high
	while (i <= j):
		while (S[i] < pivotitem):
			i += 1
		while (S[j] > pivotitem):
			j -= 1
		if (i < j):
			S[i], S[j] = S[j], S[i] # swap
	pivotpoint = j
	S[low], S[pivotpoint] = S[pivotpoint], S[low] # swap
	return pivotpoint
```



#### 큰 정수의 계산

> 특정 컴퓨터/언어가 표현할 수 없는 큰 정수의 산술 연산
>
> 2^15? 넘어가는 수

* 10 진수를 소프트웨어적으로 표현 : 리스트 이용

  * 567,832 : S = [2,3,8,7,6,5]

* 덧셈 : 자리수 각각 더하면서 올림수 (carry 고려)

  ```python
  def ladd (u, v):
  	n = len(u) if (len(u) > len(v)) else len(v)
  	result = []
  	carry = 0
  	for k in range(n):
  		i = u[k] if (k < len(u)) else 0
  		j = v[k] if (k < len(v)) else 0
  		value = i + j + carry
  		carry = value // 10
  	result.append(value % 10)
  	if (carry > 0):
  		result.append(carry)
  	return result
  ```

* 곱셈 : ∈ Θ(𝑛 ^ 2 )

* **분할정복** 이용한 곱셈

  * 두개의 정수를 분할하여 곱셈을 한다.

  ```
  𝑢 = 𝑥 × 10^𝑚 + 𝑦
  𝑣 = 𝑤 × 10^𝑚 + 𝑧
  𝑢𝑣 = (𝑥 × 10^𝑚 + 𝑦)(𝑤 × 10^𝑚 + 𝑧)
  = 𝑥𝑤 × 10^2𝑚 + (𝑥𝑧 + 𝑦𝑤) × 10^𝑚 + 𝑦𝑧
  ```

  

  ```python
  def prod (u, v):
  	n = len(u) if (len(u) > len(v)) else len(v)
  	if (len(u) == 0 or len(v) == 0):
  		return [0]
  	elif (n <= threshold):
  		return lmult(u, v)					# 단순곱셈계산 필요
  	else:
  		m = n // 2							# 자리수를 절반으로 분할
  		x = div(u, m); y = rem(u, m)		# 몫과 나머지 계산 필요	
  		w = div(v, m); z = rem(v, m)
  		p1 = prod(x, w)
  		p2 = ladd(prod(x, z), prod(w, y))
  		p3 = prod(y, z)
  	return ladd(ladd(exp(p1, 2*m), exp(p2, m)), p3)  # 지수곱셈 계산 필요
  ```

* 지수곱셈,나머지, 몫, 단순곱셈

  ```python
  def exp (u, m):					# 지수곱셈
  	if (u == [0]):				
  		return [0]
  	else:
  		return ([0] * m) + u	# 리스트를 오른쪽으로 이동하고 0을 붙인다.
      
  def div (u, m):					# 몫
  	if (len(u) < m):
  		u.append(0)
  	return u[m : len(u)]			
  def rem (u, m):					# 나머지
  	if (len(u) < m):
  		u.append(0)
  	return u[0 : m]
  
  def lmult (u, v):				# 덧셈과 비슷한 방식
  	i = u[0] if (0 < len(u)) else 0
  	j = v[0] if (0 < len(v)) else 0
  	value = i * j
  	carry = value // 10
  	result = []
  	result.append(value % 10)
  	if (carry > 0):
  		result.append(carry)
  	return result
  ```

  

* 효율성 개선 : 분할 곱셈에서 재귀호출이 4번이기 때문에 이 횟수를 줄여 효율성 개선

  ```
  𝑢𝑣 = 𝑥𝑤 × 10^2𝑚 + (𝑥𝑧 + 𝑦𝑤) × 10^𝑚 + 𝑦𝑧
  𝑟 = (𝑥 + 𝑦) (𝑤 + 𝑧) = 𝑥𝑤 +(𝑥𝑧 + 𝑦𝑤) + 𝑦𝑧
  𝑟 = (𝑥 + 𝑦) (𝑤 + 𝑧)
  (𝑥𝑧 + 𝑦𝑤) = 𝑟 − (𝑥𝑤 + 𝑦𝑧)
  따라서
  𝑢𝑣 = 𝑥𝑤 × 10^2𝑚 + (𝑢𝑣 − (𝑥𝑤 + 𝑦𝑧)) × 10^𝑚 + 𝑦𝑧
  
  곱셈은 uv, xw, yz 만 실행하면 된다.
  ```

  ```python
  def prod2 (u, v):
  	n = len(u) if (len(u) > len(v)) else len(v)
  	if (len(u) == 0 or len(v) == 0):
  		return [0]
  	elif (n <= threshold):
  		return lmult(u, v)
  	else:
  		m = n // 2
  		x = div(u, m); y = rem(u, m)
  		w = div(v, m); z = rem(v, m)
  		r = prod2(ladd(x, y), ladd(w, z))
  		p1 = prod2(x, w)
  		p3 = prod2(y, z)
  		p2 = lsub(r, ladd(p1, p3))
  		return ladd(ladd(exp(p1, 2*m), exp(p2, m)), p3)
  ```

  

#### 트로미노퍼즐

> 정사각형이 3개 붙어 있는 것을 트로미노(tromino)라고 한다.
>
> 가로와 세로로 𝑚개의 정사각형이 연결되어 있는 바둑판이 있고, 1칸은 X 표시가 되어 있다. 
>
> 여기서 𝑚은 2의 거듭제곱이라고 가정한다. 
>
> 다음 조건을 만족하도록 트로미노를 바둑판에 채우고 싶다.
>
> X 표시가 되어 있는 칸은 트로미노로 덮을 수 없다.
>
> 트로미노는 겹쳐 놓을 수 없다.
>
> 트로미노는 바둑판 바깥으로 삐져나올 수 없다.
>
> 바둑판 전체를 트로미노로 채워야 한다.

* 분할정복 

  * 분할: 4개의 사분면으로 분할

    * X가 없는 사분면의 모서리 채우기  = 그럼 딱 들어맞는다.
  * 정복: 채워진 네 개의 사분면을 재귀 호출
  
  ```python
  def tromino(board, srow, scol, size, xrow, xcol):
  	if (size == 1):
  		return
  	else:
  		mrow = srow + (size // 2)
  		mcol = scol + (size // 2)
  		xrow1, xcol1 = mrow - 1, mcol -1
  		xrow2, xcol2 = mrow - 1, mcol
  		xrow3, xcol3 = mrow, mcol - 1
  		xrow4, xcol4 = mrow, mcol
          if (xrow < mrow and xcol < mcol): # 1사분면
  			fillCenterExcept(board, mrow, mcol, 1)	# x가 없는 곳 모서리 채우기
  			xrow1, xcol1 = xrow, xcol				# x 좌표
  		elif (xrow < mrow and xcol >= mcol): # 2사분면
  			fillCenterExcept(board, mrow, mcol, 2)
  			xrow2, xcol2 = xrow, xcol
  		elif (xrow >= mrow and xcol < mcol): # 3사분면
  			fillCenterExcept(board, mrow, mcol, 3)
  			xrow3, xcol3 = xrow, xcol
  		elif (xrow >= mrow and xcol >= mcol): # 4사분면
  			fillCenterExcept(board, mrow, mcol, 4)
  			xrow4, xcol4 = xrow, xcol
  		tromino(board, srow, scol, size // 2, xrow1, xcol1) #재귀
  		tromino(board, srow, mcol, size // 2, xrow2, xcol2)
  		tromino(board, mrow, scol, size // 2, xrow3, xcol3)
  		tromino(board, mrow, mcol, size // 2, xrow4, xcol4)
  
  def fillCenterExcept(board, mrow, mcol, part):
  	global tromino_count
  	tromino_count += 1
  	if (part != 1):
  		board[mrow-1][mcol-1] = tromino_count
  	if (part != 2):
  		board[mrow-1][mcol] = tromino_count
  	if (part != 3):
  		board[mrow][mcol-1] = tromino_count
  	if (part != 4):
  		board[mrow][mcol] = tromino_count        
  
  def print_board(board):		# 출력
  	for i in range(m):
  		for j in range(m):
  			if (board[i][j] < 0):
  				print("%3s"%"X", end="")
  			else:
  				print("%3d"%board[i][j], end="")
  		print()        
  ```
  
  



#### 쉬트라센의 행렬곱셈

> 단위 연산의 차이에 의해 계산 속도가 달라진다.

* 쉬트라센의 행렬곱셈은 전통적인 행렬곱셈보다 곱셈연산이 1번 적다 ( 덧,뺄셈은 4배 많다)
* 시간 복잡도는 ∈ Θ(𝑛 ^ 2.81)  전통방식  ∈ Θ(𝑛 ^ 3 )
* 큰 행렬을 네 개의 부분 행렬로 나누어서 정복하라.

```python
def strassen (A, B):
	n = len(A)
	if (n <= threshold):
		return matrixmult(A, B)		# 단위 이하면 그냥 행렬 곱셈
	A11, A12, A21, A22 = divide(A)	# 큰 행렬을 나눈 뒤
	B11, B12, B21, B22 = divide(B)
	M1 = strassen(madd(A11, A22), madd(B11, B22))	# 재귀적으로 행렬곱셈 실시
	M2 = strassen(madd(A21, A22), B11)
	M3 = strassen(A11, msub(B12, B22))
	M4 = strassen(A22, msub(B21, B11))
	M5 = strassen(madd(A11, A12), B22)
	M6 = strassen(msub(A21, A11), madd(B11, B12))
	M7 = strassen(msub(A12, A22), madd(B21, B22))
	return conquer(M1, M2, M3, M4, M5, M6, M7)

def divide(A):
	n = len(A)
	m = n // 2
	A11 = [[0] * m for _ in range(m)]
	A12 = [[0] * m for _ in range(m)]
	A21 = [[0] * m for _ in range(m)]
	A22 = [[0] * m for _ in range(m)]
	for i in range(m):
		for j in range(m):
			A11[i][j] = A[i][j]
			A12[i][j] = A[i][j + m]
			A21[i][j] = A[i + m][j]
			A22[i][j] = A[i + m][j + m]
	return A11, A12, A21, A22

def conquer(M1, M2, M3, M4, M5, M6, M7):
	C11 = madd(msub(madd(M1, M4), M5), M7)
	C12 = madd(M3, M5)
	C21 = madd(M2, M4)
	C22 = madd(msub(madd(M1, M3), M2), M6)
	m = len(C11)
	n = 2 * m
	C = [[0] * n for _ in range(n)]
	for i in range(m):
		for j in range(m):
			C[i][j] = C11[i][j]
			C[i][j + m] = C12[i][j]
			C[i + m][j] = C21[i][j]
			C[i + m][j + m] = C22[i][j]
	return C

def madd (A, B):
	n = len(A)
	C = [[0] * n for _ in range(n)]
	for i in range(n):
		for j in range(n):
			C[i][j] = A[i][j] + B[i][j]
	return C
def msub (A, B):
	n = len(A)
	C = [[0] * n for _ in range(n)]
	for i in range(n):
		for j in range(n):
			C[i][j] = A[i][j] - B[i][j]
	return C
def matrixmult (A, B):
	n = len(A)
	C = [[0] * n for _ in range(n)]
	for i in range(n):
		for j in range(n):
			for k in range(n):
				C[i][j] += A[i][k] * B[k][j]
	return C
```



