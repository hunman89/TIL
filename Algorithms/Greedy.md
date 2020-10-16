## 탐욕알고리즘

> Greedy Approach
>
> 각 단계에서 답을 고를때 최적의 답을 선택

* 최종 해답이 반드시 최적임을 보장하지 않는다!!
  * 동전 거스름돈 문제: 거스름돈의 동전의 개수가 최소가 될 경우?
    * 가장 가치가 높은 동전부터 하는데..
    * 예) 거스름돈 360원의 최적해는?
      * 탐욕 알고리즘의 해: [100, 100, 100, 50, 10]
      * 최적해: [100, 100, 80, 80]
* 탐욕 알고리즘의 장단점
  * 장점: 상대적으로 설계하기가 매우 쉽다. ( 복잡, n이 높은 문제)
  * 단점: 최적화 문제에서 반드시 정확성을 증명해야 한다.





#### 최소비용 신장트리

* 주어진 그래프: 모든 정점이 연결된 가중치가 있는 무방향 그래프
* 신장트리(spanning tree): 그래프 𝐺의 모든 정점을 연결하는 트리,간선의 개수는 𝑛 − 1
* 최소비용 신장트리(MST: Minimum cost Spanning Tree): 모든 신장트리 𝑇 중에서 가중치의 합이 최소가 되는 신장트리
* Greedy Approach
  * 1단계(초기화): 해답의 집합을 공집합으로 둔다.
  * 2단계(선택): 최적의 원소 하나를 해답의 집합에 포함시킨다. 
    * 최적을 선택하는 방법? 프림 .vs. 크루스칼
  * 3단계(검사): 해답의 집합이 최종이면 종료, 아니면 2단계를 반복한다. 



#### -프림 알고리즘

* 2단계(선택): 최적의 원소 하나를 해답의 집합에 포함시킨다.
  * 𝑉 − 𝑌 집합에서 𝑌 집합에서 **가장 가까운 정점** 𝑣𝑛𝑒𝑎𝑟를 선택
  * 𝑌 집합에 𝑣𝑛𝑒𝑎𝑟를 추가, 𝐹 집합에 (𝑛𝑒𝑎𝑟𝑒𝑠𝑡(𝑣𝑛𝑒𝑎𝑟), 𝑣𝑛𝑒𝑎𝑟)를 추가
* 변수지정
  * W[i]\[j]: 인접행렬 (간선의 가중치)
  * nearest[i]: 𝑌 집합에서 𝑣𝑖에 가장 가까운 정점의 인덱스
  * distance[i]: 𝑣𝑖와 𝑛𝑒𝑎𝑟𝑒𝑠𝑡 [𝑖] 의 정점을 연결하는 간선의 가중치

```python
def prim (W):
	n = len(W) - 1
	F = []
	nearest = [-1] * (n + 1)
	distance = [-1] * (n + 1)
	for i in range(2, n + 1):
		nearest[i] = 1
		distance[i] = W[1][i]
    for _ in range(n - 1):
		minValue = INF
		for i in range(2, n + 1):
			if (0 <= distance[i] and distance[i] < minValue):
				minValue = distance[i]
				vnear = i
		edge = (nearest[vnear], vnear, W[nearest[vnear]][vnear])
		F.append(edge) # add edge to F
		distance[vnear] = -1
		for i in range(2, n + 1):
			if (distance[i] > W[i][vnear]):
				distance[i] = W[i][vnear]
				nearest[i] = vnear
	return F

```

* 해답, 확인용

  ```python
  def cost (F):
  	total = 0
  	for e in F:
  		total += e[2]
  	return total
  
  def print_nd (F, nearest, distance):
  	print('F =', end ='')
  	print(F)
  	print(' nearest: ', end ='')
  	print(nearest)
  	print(' distance: ', end ='')
  	print(distance)
  ```

  

#### - 크루스칼 알고리즘

* 1단계(초기화): 해답의 집합을 공집합으로 둔다.

  * 𝑉의 서로소 집합(disjoint set)을 생성한다.(E)
  * 𝐸를 비내림차순으로 정렬한다. 

* 정렬된 𝐸 집합에서 두 정점 𝑖,𝑗가 속한 집합 𝑝, 𝑞를 찾아서 (Find), 𝑝, 𝑞 가 같으면 𝑒를 버리고, 다르면 𝐹에 𝑒를 포함한 후, 𝑝, 𝑞를 합친다 (Union). 

* 간선의 합이 사이클이 되는 경우를 막아야한다. --> 서로소 집합 자료구조 이용

  ```PYTHON
  class DisjointSet:
  	def __init__ (self, n):
  		self.U = []
  		for i in range(n):
              self.U.append(i)
  	def equal (self, p, q):
  		if (p == q):
  			return True
  		else:
  			return False
  	def find (self, i):
  		j = i
  		while (self.U[j] != j):
  			j = self.U[j]
  		return j
  	def union (self, p, q):
  		if (p < q):
  			self.U[q] = p
  		else:
  			self.U[p] = q        
          
  ```

```python
def kruskal (n, E):
	F = []
	dset = DisjointSet(n)
	while (len(F) < n - 1):
		edge = E.pop(0)
		i, j = edge[0], edge[1]
		p = dset.find(i)
		q = dset.find(j)
		if (not dset.equal(p, q)):
			dset.union(p, q)
			F.append(edge)
	return F
```





#### 최단경로와 다익스트라 알고리즘

> 단일 정점에서 모든 다른 정점으로의 최단 경로 구하기
>
> 프림 알고리즘과 유사

* W[i]\[j]: 그래프 𝐺의 인접행렬

* length[i]: 𝑌에 속한 정점들만 중간에 거치도록 하여 𝑣1에서 𝑣𝑖로 가는 현재 최단 경로의 길이
* touch[i]: 𝑣1에서 𝑣𝑖로 가는 현재 최단경로 상의 𝑣𝑖와 연결된 𝑌에 속한 정점 𝑣의 인덱스

```python
def dijkstra (W):
	n = len(W) - 1
	F = []
	touch = [-1] * (n + 1)
	length = [-1] * (n + 1)
	for i in range(2, n + 1):
		touch[i] = 1
		length[i] = W[1][i]
	for _ in range(n - 1):
		minValue = INF
		for i in range(2, n + 1):
			if (0 <= length[i] and length[i] < minValue):
				minValue = length[i]
				vnear = i
		edge = (touch[vnear], vnear, W[touch[vnear]][vnear])
		F.append(edge)
		for i in range(2, n + 1):
			if (length[i] > length[vnear] + W[vnear][i]):
				length[i] = length[vnear] + W[vnear][i]
				touch[i] = vnear
		length[vnear] = -1
	return F        
        
```

* 결과 확인

  ```python
  def length (F):
  	total = 0
  	for e in F:
  		total += e[2]
  	return total
  def print_tl (F, touch, length):
  	print('F =', end ='')
  	print(F)
  	print(' touch: ', end ='')
  	print(touch)
  	print(' length: ', end ='')
  	print(length)
  ```





#### 마감시간있는 스케줄 짜기

> 보상을 최대화.

* 보상에 따라 내림차순으로 작업 정렬
* 순서대로 하나씩 가능한 스케줄에 포함시킨다.
* 적절함? : 순서내의 모든 작업이 스케줄 내에 실행될때.
  * 집합내의 원소들로 적절한 순서를 만들 수 있을때  적절한 집합 이라고 한다.(feasible set)
* 적절한 집합을 확인?
  * 원소를 스케쥴(deadline)순서대로 정렬했을때, 적절한 집합이면 그 집합은 적절한 집합이다.

```python
def schedule (deadline):
	n = len(deadline) - 1
	J = [1]
	for i in range(2, n + 1):
		K = insert(J, i, deadline)
		if (feasible(K, deadline)):
			J = K[:]
	return J

def feasible (K, deadline):
	for i in range(1, len(K) + 1):
		if (i > deadline[K[i - 1]]):
			return False
	return True
def insert(J, i, deadline):
	K = J[:]
	for j in range(len(J), 0, -1):
		if (deadline[i] >= deadline[K[j-1]]):
			j += 1
			break
	K.insert(j - 1, i)
	return K
```





#### 허프만코드

* 이진코드(binary code)
  * 데이터파일을 이진코드로 인코딩하여 저장
    * 길이가 고정된 이진코드
    * 길이가 변하는 이진코드 : 자주 나오는 문자의 코드 길이를 줄이자.



* 최적 이진코드 문제  : 문자들을 이진코드로 표현할 때 필요한 비트의 개수가 최소가 되는 이진코드를 찾아라.



* 전치코드 : 길이가 변하는 이진코드
  * 한 문자의 코드워드가 다른 문자의 코드워드의 앞부분이 될 수 없다 : 해석하기 쉽게
  * 모든 전치코드는 리프노드가 코드문자인 이진트리로 표현 가능

* 허프만 알고리즘으로 최적의 전치 이진코드를 생성할 수 있다.
  * min-heap (빈도수 기준)
  * 빈도수가 낮은 두개로 이진트리를 하나 만든뒤, 루트값을 두 빈도수의 합으로 한다.
  * 합한 값을 min-heap에 넣고 위 과정을 반복하면 최적의 이진트리가 생성된다.

```python
class HuffNode:
	def __init__ (self, symbol, freq):
		self.symbol = symbol
		self.freq = freq
		self.left = None
		self.right = None
	def preorder(self):
		print(self.freq, end=" ")
		if (self.left is not None):
			self.left.preorder()
		if (self.right is not None):
			self.right.preorder()
	def inorder(self):
		if (self.left is not None):
			self.left.inorder()
		print(self.freq, end=" ")
		if (self.right is not None):
			self.right.inorder()        
            
def huffman (n, PQ):
	for _ in range(n - 1):
		p = PQ.get()[1]
		q = PQ.get()[1]
		r = HuffNode(' ', p.freq + q.freq)
		r.left = p
		r.right = q
		PQ.put((r.freq, r))
	return PQ.get()[1]
            
            
```

* PriorityQueue 세팅

  ```python
  codes = ['b','e','c','a','d','f']
  freqs = [5, 10, 12, 16, 17, 25]
  
  from queue import PriorityQueue
  
  PQ = PriorityQueue()
  for i in range(len(codes)):
  node = HuffNode(codes[i], freqs[i])
  PQ.put((node.freq, node))
  
  root = huffman(len(codes), PQ)
  
  print("Preorder:", end=" ")
  root.preorder()
  print("\nInorder:", end=" ")
  root.inorder()
  print()
  ```

  