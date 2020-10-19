## 되추적 (backtracking)

> 임의의 집합에서 주어진 기준대로 원소의 순서를 선택하는 문제를 푸는데 적합

* 트리 자료구조의 변형된 깊이우선탐색(DFS:depth-first-search)

* 많은 문제에서 유용하다.

  * 예) 𝑛-Queens, 부분집합의 합, 0-1 배낭문제, etc.

  

#### 미로찾기 문제

* 막다른길에서 되돌아간다 : 되추적
* 갈림길을 노드로 해서 트리탐색문제로 해석 가능 : 상태공간트리
* 백트래킹기법 : 상태공간트리를 깊이우선탐색으로 탐색
  * 방문 중인 노드에서 더 하위 노드로 가면 해답이 없을 경우
  * 해당 노드의 하위 트리를 방문하지 않고 부모 노드로 되돌아 감 (backtrack)
* 유망함 (promising) 
  * 방문 중인 노드에서 하위 노드가 해답을 발견할 가능성이 있으면 유망(promising)
  * 하위 노드에서 해답을 발견할 가능성이 없으면 유망하지 않음(nonpromising)
* 가지치기 (pruning)
  * 유망하지 않으면 하위 트리를 가지치기함
  * 가지치기한 상태: 방문한 노드의 방문하지 않는 하위 트리 (pruned state)
* 백트래킹 구현
  * 상태공간트리를 실제로 구현할 필요는 없음
  * 현재 조사중인 가지의 값에 대해 추적만 하면 됨



####  n-Queens 문제

> 𝑛 × 𝑛 체스보드에 𝑛개의 퀸을 배치하는 문제
>
> 어떤 퀸도 다른 퀸에 의해서 잡아먹히지 않도록 배치해야 함
>
> 즉, 같은 행, 열, 대각선에는 다른 퀸을 놓을 수 없음

* 백트래킹 적용
  * **임의의 집합에서 기준에 따라 원소의 순서를 선택**
    * 임의의 집합(set): 체스보드에 있는 𝑛^2개의 가능한 위치
    * 기준(criterion): 새로 놓을 퀸이 다른 퀸을 위협할 수 없음
    * 원소의 순서(sequence): 퀸을 놓을 수 있는 𝑛개의 위치

* 4-Queens 문제

  * 일단 같은행에는 놓을 수 없다고 가정하면

  * 4 x 4 x 4 x 4 = 256개의 leaf node를 가지는 상태공간트리가 구성된다.

  * 노드들이 유망한지 어떻게 판별할 것인가??

  * 유망 함수의 구현

    * 같은 열(column)이나 같은 대각선(diagonal)에 놓이는 지를 확인

    ```python
    def promising (i, col):
    	k = 1
    	flag = True
    	while (k < i and flag):
    		if (col[i] == col[k] or abs(col[i] - col[k]) == (i - k)):
    			flag = False
    			k += 1
    	return flag
    
    def n_queens (i, col):
    	n = len(col) - 1
    	if (promising(col, i)):
    		if (i == n):
    			print(col[1: n + 1])
    		else:
    			for j in range(1, n + 1):
    				col[i + 1] = j
    				n_queens(col, i + 1)               
    
    ```





#### 부분집합의 합 구하기 문제

> 원소가 𝑛개인 양의 정수 집합 𝑤와 양의 정수 𝑊가 주어졌을 때, 합이 𝑊가 되는 𝑤의 부분집합을 모두 찾아라.

* 가지치기 전략 (pruning strategy)

  * 검색하기 전에 정수 원소를 비내림차순으로 정렬하면 각 노드가 유망하지 않음을 알 수 있게 된다.

* 유망 함수의 구현

  * 𝑤𝑒𝑖𝑔ℎ𝑡를 레벨 𝑖까지의 모든 정수 원소의 합이라고 하자.

    * 𝑤𝑒𝑖𝑔ℎ𝑡가 𝑊와 같지 않으면(그 노드에 해답이 있다는 의미), 다음 조건을 만족하면 레벨 𝑖의 노드는 유망하지 않다.
    * 𝑤𝑒𝑖𝑔ℎ𝑡와 다음 원소의 합이  𝑊보다 커지면.
  * total을 남은 정수 원소의 합이라고 하자. 
    * 남은 정수 원소의 합에다 𝑤𝑒𝑖𝑔ℎ𝑡를 더해도 최소한 𝑊와 같아지지 않으므로, 다음 조건을 만족하면 이 노드는 유망하지 않다.
    * 𝑤𝑒𝑖𝑔ℎ𝑡 + 𝑡𝑜𝑡𝑎𝑙 < 𝑊.

```python
def sum_of_subsets (i, weight, total):
	n = len(w) - 1
	if (promising(i, weight, total)):
		if (weight == W):
			print(include[1: n + 1])
		else:
			include[i + 1] = True
			sum_of_subsets(i + 1, weight + w[i+1], total - w[i+1])
			include[i + 1] = False
			sum_of_subsets(i + 1, weight, total - w[i+1])	
            
def promising (i, weight, total):
	if ((weight + total >= W) and (weight == W or weight + w[i+1] <= W)):
		return True
	else:
		return False
  
```

