## 외판원 문제



#### 해밀턴경로문제

한 정점에서 출발하여 그래프의 모든 정점을 한 번씩만 방문하고 다시 원래 출발한 정점으로 되돌아오는 경로

수학적 알고리즘이 없다

백트래킹 : 상태공간트리 구축 

- 트리의 레벨 0에서 출발 정점을 선정(경로의 0번째 정점)
- 트리의 레벨 1에서 출발 정점을 제외한 각 정점을 출발 정점 다음에 올 첫째 정점으로 고려한다.
- 트리의 레벨 2에서는 앞에서와 같은 정점들을 각각 둘째 정점으로 고려한다.
- 그 이후 수준에서도 같은 방식으로 계속
- 마지막으로, 수준 𝑛 − 1에서 정점들을 (𝑛 − 1)째 정점으로 고려한다. 

```python
def hamiltonian (i, W, vindex):
	n = len(W) - 1
	if (promising(i, W, vindex)):
		if (i == (n - 1)):
			print(vindex[0:n])
		else:
			for j in range(2, n + 1):
				vindex[i + 1] = j
				hamiltonian(i + 1, W, vindex)
```

인접 행렬 𝑊[𝑖]\[𝑗]: 𝑖번째 정점과 𝑗번째 정점간에 간선이 있으면 True, 없으면 False

유망 함수의 조건

1. (𝑛 − 1)째 정점은 출발 정점과 반드시 인접해 있어야 한다 . 
2. 경로 상의 𝑖번째 정점은 그 경로에서 (𝑖 − 1)번째 정점과 반드시 인접해야 한다.
3. 𝑖번째 정점은 그 앞에 오는 (𝑖 − 1)개의 정점들 중 하나가 될 수 없다.

```python
def promising (i, W, vindex):
	flag = True
	if ((i == (n - 1)) and not W[vindex[n-1]][vindex[0]]):
		flag = False
	elif ((i > 0) and not W[vindex[i-1]][vindex[i]]):
		flag = False
	else:
		j = 1
		while (j < i and flag):
			if (vindex[i] == vindex[j]):
				flag = False
			j += 1
	return flag
```



#### 외판원 문제 (TSP : Traveling Salesperson Problem)

> 외판원이 모든 도시를 방문하고 되돌아 올 때, 출장시간 or 비용 or 거리를 최소하 하라

가중치 or 방향이 있는 그래프

해밀턴 경로의 최적화 문제

#### 동적 계획법

𝑊: 주어진 그래프 𝐺 = (𝑉, 𝐸)의 인접 행렬

𝑉: 모든 도시의 집합

𝐴: 𝑉의 부분 집합

𝐷 [𝑣𝑖]\[𝐴]: 𝐴에 속한 도시를 각각 한 번씩만 거쳐서 𝑣𝑖에서 𝑣1 으로 가는 최단 경로의 길이

```python
def travel (W):
	n = len(W) - 1
	size = 2 ** (n - 1)
	D = [[0] * size for _ in range(n + 1)]
	P = [[0] * size for _ in range(n + 1)]
	for i in range(2, n + 1):
		D[i][0] = W[i][1]
	for k in range(1, n - 1):
		for A in range(1, size):
			if (count(A, n) == k):
				for i in range(2, n + 1):
					if (not isIn(i, A)):
						D[i][A], P[i][A] = minimum(W, D, i, A)
     A = size - 1
	D[1][A], P[1][A] = minimum(W, D, 1, A)
	return D, P

def minimum (W, D, i, A):
	minValue = INF
	minJ = 1
	n = len(W) - 1
	for j in range(2, n + 1):
		if (isIn(j, A)):
			m = W[i][j] + D[j][diff(A, j)]
			if (minValue > m):
				minValue = m
				minJ = j
	return minValue, minJ	
```

