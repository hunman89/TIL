## 동적 계획법

> 문제를 더 작은 문제로 분할, 상향식으로 문제를 해결한다.



#### Memoization

- 가장 작은 입력 사례의 해답을 테이블에 저장하고 필요할 때 꺼내 쓴다.



#### 분할정복법 vs 동적계획법

* 문제를 작은 사례로 분할하여 해결한다는 점에서 동일
* 분할정복: 재귀 호출을 통해 분할하여 정복 (Top-Down)
* 동적계획: 메모이제이션을 통해 상향식으로 정복 (Bottom-Up)



#### 이항계수

> [정의](https://ko.wikipedia.org/wiki/%EC%9D%B4%ED%95%AD_%EA%B3%84%EC%88%98#:~:text=%EC%A1%B0%ED%95%A9%EB%A1%A0%EC%97%90%EC%84%9C%2C%20%EC%9D%B4%ED%95%AD%20%EA%B3%84%EC%88%98(%E4%BA%8C,%EC%97%86%EB%8A%94)%20%EC%A1%B0%ED%95%A9%EC%9D%98%20%EA%B0%80%EC%A7%93%EC%88%98%EC%9D%B4%EB%8B%A4.)

* 재귀적으로 계산할 수 있다.

  ```python
  def bin (n, k):
  	if (k == 0 or n == k):
  		return 1
  	else:
  		return bin(n - 1, k - 1) + bin(n - 1, k)
  
  ```

* 그러나 함수의 중복 호출이 많아진다.

* 상향식 방법 = 파스칼의 삼각형 특징

  ```python
  def bin2 (n, k):
  	B = [[0] * (k + 1) for _ in range(n + 1)]
  	for i in range(n + 1):
  		for j in range(min(i, k) + 1):
  			if (j == 0 or j == i):
  				B[i][j] = 1
  			else:
  				B[i][j] = B[i - 1][j - 1] + B[i - 1][j]
  	return B[n][k]
  ```

* 분할정복의 시간 복잡도 ∈ 𝑛과𝑘의 지수적 복잡도 , 동적계획 의 시간 복잡도 ∈ Θ (𝑛𝑘)

* 개선

  ```python
  def bin3 (n, k):
  	if (k > n // 2):		# 대칭적
  		k = n - k
  	B = [0] * (k + 1)
  	B[0] = 1
  	for i in range(1, n + 1):	# 1차원 리스트만으로 구현
  		j = min(i, k)
  		while (j > 0):
  			B[j] = B[j] + B[j - 1]
  			j -= 1
  	return B[k]
  ```

  



#### 최단경로문제

>주어진 그래프에서 **모든 정점**의 쌍에 대한 최단 경로를 구하시오.

* 𝐺 = (𝑉, 𝐸): 𝐺는 그래프, 𝑉는 정점(vertex)의 집합, 𝐸는 간선(edge)의 집합
* 그래프 G는 방향성(directed), 가중치(weighted) 그래프임
* 최단 경로는 단순 경로(simple path): 같은 정점을 두 번 거치지 않음



* 단순 = O(n!)
* 최단경로문제는 최적화문제: 해답후보중에서 가장 최적의 값.



* 그래프의 표현 : 인접행렬
  
  * 행과 열은 정점, 행열의 값은 가중치
* 1단계 : 재귀 관계식?
  * 𝑫: 각 정점의 쌍이 가지는 최단 경로의 길이를 나타내는 행렬

  * 𝑫[i]\[j]: 𝑣𝑖에서 𝑣𝑗로 가는 최단 경로의 길이

  * 목표: 인접 행렬 𝑊에서 최단 경로의 행렬 𝐷와의 재귀 관계식 구하기

  * 𝐷 (0) = 𝑊, 𝐷 (𝑘)는 𝐷 (𝑘−1)로부터 구함 (1 ≤ 𝑘 ≤ 𝑛)

  * 𝐷(𝑘) [𝑖] [𝑗]: 다음과 같은 두 가지의 경우를 고려

    * 경우 1: 하나의 정점을 더 지나게 해 줘도 새로운 최단 경로가 없는 경우

      𝐷(𝑘)[𝑖]\[𝑗] = 𝐷 (𝑘−1) [𝑖] [𝑗] 

    * 경우 2: 하나의 정점(𝑣𝑘)을 더 지나면 새로운 최단 경로가 있는 경우

      𝐷 (𝑘) [𝑖] [𝑗] = 𝐷 (𝑘−1) [𝑖] [𝑘] + 𝐷 (𝑘−1) [𝑘] [𝑗] 

  * 재귀식 : 𝐷 (𝑘) [𝑖] [𝑗] = min( 𝐷 (𝑘−1) [𝑖] [𝑗] , 𝐷 (𝑘−1) [𝑖] [𝑘] + 𝐷 (𝑘−1) [𝑘] [𝑗])

```python
def floyd (W):
	D = W
	n = len(W)
	for k in range(n):			# 모든 정점을 고려 : 연결안된 곳에 매우 큰수를 넣으면 됨
		for i in range(n):
			for j in range(n):
				D[i][j] = min(D[i][j], D[i][k] + D[k][j])
	return D
```



* 최단경로는?

  * 새로운 행렬에 기록

    ```python
    def floyd2 (W):
    	n = len(W)
    	D = W
    	P = [[-1] * n for _ in range(n)]	# 중간 정점을 기록한다. 기본 -1
    	for k in range(n):
    		for i in range(n):
    			for j in range(n):
    				if (D[i][j] > D[i][k] + D[k][j]):
    					D[i][j] = D[i][k] + D[k][j]
    					P[i][j] = k
    	return D, P
    ```

  * 𝑷 [𝒊] [𝒋] = −1이면, 간선 (𝑣𝑖 , 𝑣𝑗)가 최단 경로임

  * 𝑷 [𝒊] [𝒋] = 𝑘 인 경우에는 inorder 탐색

    * (𝑣𝑖 , 𝑣𝑘)의 최단 경로 출력 후
    * 𝑣𝑘를 출력하고
    * (𝑣𝑘, 𝑣𝑗)의 최단 경로 출력

    ```python
    def path (P, u, v):
    	if (P[u][v] != -1):
    		path(P, u, P[u][v])
    		print('v%d'%(P[u][v]), end='-> ')
    		path(P, P[u][v], v)
    ```

    



#### 연쇄행렬곱셈

> 연쇄행렬을 곱하는 최적의 순서

* 최적화문제
* 일반적으로, 𝑖 × 𝑘 행렬과 𝑘 × 𝑗 행렬을 곱하면 𝑖 × 𝑗 행렬이 나옴
  * 원소 곱셈의 횟수: 𝑖 × 𝑘 × 𝑗

* 단순 (Brute-Force Approach)
  * 카탈란수 :  C(n-1)
  * 괄호를 씌우는 가짓수

* 가정
  * 𝑑𝑘를 행렬 𝐴𝑘의 행의 개수로 정함 (1 ≤ 𝑘 ≤ 𝑛)
  * 𝑑𝑘−1은 행렬 𝐴𝑘의 열의 개수, 𝐴𝑘−1의 행의 개수
  * 𝑑0는𝐴1의 열의 개수

* 재귀 관계식

  * 𝑴: 연쇄 행렬을 곱하는데 필요한 곱셈의 최소 회수 행렬
  * 𝑴[𝒊]\[𝒋]: 𝐴𝑖에서 𝐴𝑗까지 행렬을 곱하는데 필요한 곱셈의 최소 회수(1 ≤ 𝑖 ≤ 𝑗 ≤ 𝑛)
  * 분할정복: 𝑛개의 행렬을 두 개의 최적 부분행렬의 곱으로 분할
  * 각 분할의 곱셈 횟수: 각 부분행렬의 곱셈 횟수 + 두 행렬의 곱셈 횟수
  * 𝑀 [𝑖] [𝑗] = minimum (𝑀[𝑖] [𝑘] + 𝑀 [𝑘 + 1] [𝑗] + 𝑑𝑖−1𝑑𝑘𝑑𝑗 )

  ```python
  def minmult (d):
  	n = len(d) - 1
  	M = [[-1] * (n + 1) for _ in range(n + 1)]		# -1을 기본값으로 하는 행렬
  	P = [[-1] * (n + 1) for _ in range(n + 1)]
  	for i in range(1, n + 1):
  		M[i][i] = 0									# 대각을 0으로
  	for diagonal in range(1, n):
  		for i in range(1, n - diagonal + 1):
  			j = i + diagonal
  			M[i][j], P[i][j] = minimum(M, d, i, j)	# 동적계획법적으로 매트릭스에 채워진다.
  	return M, P
  
  def minimum (M, d, i, j):
  	minValue = INF
  	minK = 0
  	for k in range(i, j):
  		value = M[i][k] + M[k + 1][j]
  		value += d[i - 1] * d[k] * d[j]
  		if (minValue > value):
  			minValue = value
  			minK = k
  	return minValue, minK
  ```

* 곱셈 순서 (P 행렬 = k 값 저장)

  * 재귀적으로 호출하면서 찾아낸다.

  ```python
  def order (P, i, j):
  	if (i == j):
  		print('A%d'%(i), end='')
  	else:
  		k = P[i][j]
  		print('(', end ='')
  		order(P, i, k)
  		order(P, k + 1, j)
  		print(')', end ='')
  ```

  



#### 최적 이진 검색 트리

> 주어진 n개의 키로 최적 이진검색트리를 구하시오

* 문제 정의
  * 주어진 𝑛개의 키: 𝐾1,𝐾2, ⋯ ,𝐾𝑛
  * 각 키의 검색 확률 𝑝𝑖 : 전체 검색 횟수 중에서 𝐾𝑖를 검색하는 확률
  * 각 키의 비교 횟수 𝑐𝑖 : 𝐾𝑖를 검색하는 데 필요한 키의 비교 횟수
  * 각 키의 평균 검색 비용(시간): 검색 확률 × 비교 횟수 (𝑝𝑖 × 𝑐𝑖 )
  * 전체 키의 평균 검색 비용(시간): 각 키의 평균 검색 비용 합
* 이진검색트리? (BST: Binary Search Tree)
  * 각 노드는 하나의 유일한 키를 가지고 있다
  * 모든 노드가 가진 키의 값은 그 노드의 왼쪽 서브트리의 키의 값보다 크다
  * 모든 노드가 가진 키의 값은 그 노드의 오른쪽 서브트리의 키의 값보다 작다
* 단순 (Brute-Force Approach)
  * 카탈란수 :  C(n)

* 동적계획 : 재귀식 찾기
  * 트리 𝑘: 키 𝐾𝑘가 루트 노드에 있는 최적 이진검색트리
  * 키 비교 횟수: 서브 트리의 비교 횟수에 루트에서 비교 한 번 추가
  * 𝑚 ≠ 𝑘인 𝐾𝑚에 대해서 트리 𝑘에 𝐾𝑚을 놓기 위한 비교 한 번 추가
    * 𝐾𝑚의 평균 검색비용에 𝑝𝑚을 추가
    * 𝐴[1]\[𝑘 − 1]+𝐴[𝑘 + 1]\[𝑛] + all𝑝𝑚

```python
def optsearchtree (p):
	n = len(p) - 1
	A = [[-1] * (n + 1) for _ in range(n + 2)]
	R = [[-1] * (n + 1) for _ in range(n + 2)]
	for i in range(1, n + 1):
		A[i][i - 1] = 0
		A[i][i] = p[i]
		R[i][i - 1] = 0
		R[i][i] = i
	A[n + 1][n] = 0
	R[n + 1][n] = 0
	for diagonal in range(1, n):
		for i in range(1, n - diagonal + 1):
			j = i + diagonal
			A[i][j], R[i][j] = minimum(A, p, i, j)
	return A, R

def minimum (A, p, i, j):
	minValue = INF
	minK = 0
	for k in range(i, j + 1):
		value = A[i][k - 1] + A[k + 1][j]
		for m in range(i, j + 1):
			value += p[m]
		if (minValue > value):
			minValue = value
			minK = k
	return minValue, minK
```

* 트리 구하기 = 재귀호출을 통한 분할정복

```python
def tree (R, i, j):
    k = R[i][j]
	if (k == 0):
		return None
	else:
		node = BSTNode(keys[k])
		node.left = tree(R, i, k - 1)
		node.right = tree(R, k + 1, j)
		return node
    
class BSTNode:
	def __init__ (self, key):
		self.key = key
		self.left = None
		self.right = None
	def preorder (node):
		if (node is None):
			return
		else:
			print(node.key, end =' ')
			preorder(node.left)
			preorder(node.right)
	def inorder (node):
		if (node is None):
			return
		else:
			inorder(node.left)
			print(node.key, end =' ')
			inorder(node.right)
```





