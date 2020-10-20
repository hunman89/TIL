## 배낭문제

> Knapsack problem
>
> 도둑이 30kg까지 담을 수 있는 배낭을 메고 곡식 창고에 침투
>
> 창고 입구에는 보관중인 곡식의 전체 수량과 1kg당 가격이 적혀 있다. 도둑의 목적은 이익이 최대가 되도록 배낭을 채우는 것이다.

* 다양한 알고리즘을 적용할 수 있다.
* 



#### 탐욕 알고리즘

* 가장 값어치가 높은 아이템을 먼저 채운다.

* 아이템이 분할 가능할때, 탐욕알고리즘으로 최적의 해를 구할 수 있다.

```python
def knapsack1(W, w, p):
	n = len(w) - 1
	K = [0] * (n + 1)
	weight = 0
	for i in range(1, n + 1):
		weight += w[i]
		K[i] = w[i]
		if (weight > W):
			K[i] -= (weight - W)
			break;
	return K
```

* 분할이 안되면 탐욕알고리즘이 최적 해를 보장해 주지 않는다.



#### 동적 계획법

> 0-1 배낭 문제

* 아이템별 가치와 무게가 있다 = 분할이 안된다

* 재귀 관계식 구하기

  * 𝑃[𝑖]\[𝑤] = max( 𝑃 [𝑖 − 1] [𝑤] , 𝑝𝑖 + 𝑃[𝑖 − 1] [𝑤 − 𝑤𝑖 ] ), if 𝑤𝑖 ≤ 𝑤 
  * 𝑃[𝑖]\[𝑤] = 𝑃 [𝑖 − 1] [𝑤] , if 𝑤𝑖 >  𝑤 

* 동적 계획법

  ```python
  def knapsack2(i, W, w, p):
  	if (i <= 0 or W <= 0):
  		return 0
  	if (w[i] > W):
  		return knapsack2(i - 1, W, w, p)
  	else: # w[i] <= W
  		left = knapsack2(i - 1, W, w, p)
  		right = knapsack2(i - 1, W - w[i], w, p)
  		return max(left, p[i] + right)
  ```

  

