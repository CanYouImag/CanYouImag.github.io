---
layout: post
title: "考研数据结构个人笔记——算法大题编码之排序"
date: 2026-10-31 10:00:00 +0800
categories: data structure
tags: [数据结构, 算法设计, 考研]
cover_image: /../assets/data_structure.jpg
---

欢迎各位道友来到$408$大题系列的第八章——排序。排序这一章算法名字多、代码不算长，但“稳定性、时间复杂度、适用场景”特别爱考。虽然$C++$的$STL$里有`sort()`，可以在$O(n \log n)$时间内把序列排好，OJ上机时直接写通常没问题；但$408$数据结构手写代码的大题如果只写一个`sort()`，老师肯定第一个废掉你。所以还是老老实实把各种排序算法过一遍。

# 排序

## 排序的基本概念

排序：将一组记录按关键字递增或递减排列。

排序算法有稳定和不稳定之分。所谓稳定，是指在排序过程中，关键字相同的记录的相对次序保持不变。例如序列$\lbrace 3, 2(1), 4, 5, 6, 2(2), 1 \rbrace$，为了区分两个$2$，给它们标了号。稳定排序的结果一定是$\lbrace 1, 2(1), 2(2), 3, 4, 5, 6 \rbrace$；不稳定排序可能得到$\lbrace 1, 2(2), 2(1), 3, 4, 5, 6 \rbrace$。

根据数据是否全部放在内存中，排序又分为内部排序和外部排序。本章前面讲的各种排序都是内部排序；数据量太大、需要借助外存时，就要用外部排序。

> 注意：$STL$的`sort()`是不稳定排序；需要稳定排序时可以用`stable_sort()`，但它的时间开销通常比`sort()`大。

## 插入排序

基本思想：每次将一个待排序的记录按关键字大小插入前面已经排好序的子序列中。

### 直接插入排序

这是排序算法中最简单也最直观的算法。假设某个时刻待排序表$L[1 \cdots n]$的状态如下：

| 有序序列$L[1 \cdots i - 1]$ | 待插入元素$L[i]$ | 无序序列$L[i + 1 \cdots n]$ |
| :---: | :---: | :---: |

把$L[i]$插入前面已经排好序的序列的过程如下：

1. 查找$L[i]$在$L[1 \cdots i - 1]$中的插入位置$k$。
2. 将$L[k \cdots i - 1]$的元素依次后移一个位置。
3. 把$L[i]$放入$L[k]$。

代码如下：

```cpp
#include <vector>
using namespace std;

void InsertSort(vector<int>& L)
{
	int n = L.size();

	for (int i = 1; i < n; i++)
	{
		if (L[i] < L[i - 1])
		{
			int temp = L[i];
			int j = i - 1;

			while (j >= 0 && temp < L[j])
			{
				L[j + 1] = L[j];
				j--;
			}
			L[j + 1] = temp;
		}
	}
}
```

直接插入排序只使用了几个临时变量，空间复杂度是$O(1)$。最好情况下，表已经有序，每个元素只和前一个元素比较一次，不需要移动元素，时间复杂度是$O(n)$；最坏情况下，表完全逆序，每一趟插入都要比较和移动大量元素，时间复杂度是$O(n^2)$；平均时间复杂度也是$O(n^2)$。

直接插入排序是稳定的排序算法，适用于顺序存储和链式存储的线性表。处理链式存储结构时不需要移动元素，只需要修改指针。

### 折半插入排序

先通过折半查找确定元素的插入位置，再统一移动元素。因此折半插入排序和折半查找一样，不能处理链式存储的线性表。

代码如下：

```cpp
#include <vector>
using namespace std;

void BInsertSort(vector<int>& v)
{
	int n = v.size();

	for (int i = 1; i < n; i++)
	{
		int temp = v[i];
		int low = 0;
		int high = i - 1;

		while (low <= high)
		{
			int mid = (low + high) / 2;
			if (temp < v[mid])
			{
				high = mid - 1;
			}
			else
			{
				low = mid + 1;
			}
		}

		for (int j = i - 1; j >= high + 1; j--)
		{
			v[j + 1] = v[j];
		}
		v[high + 1] = temp;
	}
}
```

空间效率上，折半插入排序和直接插入排序一样，都只使用常数个辅助变量，空间复杂度是$O(1)$。时间上，折半插入排序把查找插入位置的比较次数从最坏情况下的$O(n^2)$降到了$O(n \log n)$，但它并没有减少元素移动次数，所以总时间复杂度仍然是$O(n^2)$。

折半插入排序是稳定的排序算法，但只适用于顺序存储的线性表。

### 希尔排序

希尔排序也称*缩小增量排序*，通过逐步减少增量的方式，对表中相隔一定距离的元素构成的子序列进行多次直接插入排序，使整个表逐渐趋于有序，最后通过一趟完整的直接插入排序完成全局排序。

具体来说：先选取一个小于$n$的初始增量$d_1$，将待排序表分成$d_1$个子序列；从第一个元素开始，每隔$d_1$个位置取一个元素，直到取到末尾，把这些元素放进同一个子序列，然后对子序列进行直接插入排序。之后依次取更小的增量$d_2, d_3, \cdots$，满足$d_1 \gt d_2 \gt \cdots \gt d_t = 1$，重复分组和排序。当增量减至$1$时，所有记录同属于一个子序列，此时执行最后一趟直接插入排序，即可得到最终结果。

**目前尚未找到理论上最优的增量序列**，所以对这方面有兴趣的各位童鞋可以冲一下，万一搞出来然后拿到图灵奖呢？

代码如下：

```cpp
#include <vector>
using namespace std;

void ShellSort(vector<int>& v)
{
	int n = v.size();

	for (int dk = n / 2; dk >= 1; dk /= 2)
	{
		for (int i = dk; i < n; i++)
		{
			int temp = v[i];

			if (temp < v[i - dk])
			{
				int j = i - dk;

				while (j >= 0 && temp < v[j])
				{
					v[j + dk] = v[j];
					j -= dk;
				}
				v[j + dk] = temp;
			}
		}
	}
}
```

和其他插入排序一样，希尔排序使用常数个辅助单元，空间复杂度是$O(1)$。希尔排序的时间效率取决于所选的增量序列，但由于最优增量序列的选择依然是一个未解难题，所以很难给出统一的最优时间复杂度。常见增量序列下，平均时间复杂度一般约为$O(n^{1.3})$，最坏情况下会退化到$O(n^2)$。

希尔排序是不稳定的排序算法，因为划分子序列时可能改变相同关键字元素的相对顺序。希尔排序也只适用于顺序存储的线性表。

## 交换排序

### 冒泡排序

从前往后或从后往前依次比较相邻元素的关键字，若为逆序则交换它们的位置。**每一趟排序都会将当前未排序序列中的最小值或最大值移动到其最终位置**，最多进行$n - 1$趟冒泡，即可完成整个排序。

代码如下：

```cpp
#include <vector>
#include <utility>
using namespace std;

void BubbleSort(vector<int>& v)
{
	int n = v.size();

	for (int i = 0; i < n - 1; i++)
	{
		bool flag = false;

		for (int j = n - 1; j > i; j--)
		{
			if (v[j - 1] > v[j])
			{
				swap(v[j - 1], v[j]);
				flag = true;
			}
		}

		if (flag == false)
		{
			break;
		}
	}
}
```

冒泡排序只使用了常数个辅助单元，空间复杂度是$O(1)$。最好情况下，序列已经有序，只需要比较$n - 1$次即可退出，时间复杂度是$O(n)$；最坏情况下，需要$n - 1$趟排序，第$i$趟进行$n - i$次比较，且每次比较后可能需要$3$次移动完成交换，所以

$$
\text{总比较次数} = \sum_{i = 1}^{n - 1}(n - i) = \frac{n(n - 1)}{2},
\qquad
\text{移动次数} = \sum_{i = 1}^{n - 1}3(n - i) = \frac{3n(n - 1)}{2}.
$$

因此，最坏情况下的时间复杂度是$O(n^2)$，平均时间复杂度也是$O(n^2)$。

冒泡排序在处理相等元素时不交换，所以是稳定的排序算法。它适用于顺序存储和链式存储的线性表。

### 快速排序

首先在待排序表$L[1 \cdots n]$里任选一个元素作为基准（通常取首元素），通过一趟排序将原表划分为两个独立的子表$L[1 \cdots k - 1]$和$L[k + 1 \cdots n]$，左子表的元素关键字都小于基准，右子表的元素关键字都大于等于基准。随后分别对两个子表递归进行同样的操作，直到每个子表仅含一个元素或为空，此时整个序列已经完全有序。

代码实现时需要双指针确定其他元素相对于基准的位置。

代码如下：

```cpp
#include <vector>
#include <utility>
using namespace std;

int Partition(vector<int>& v, int low, int high)
{
	int pivot = v[low];

	while (low < high)
	{
		while (low < high && v[high] >= pivot)
		{
			high--;
		}
		v[low] = v[high];

		while (low < high && v[low] <= pivot)
		{
			low++;
		}
		v[high] = v[low];
	}

	v[low] = pivot;
	return low;
}

void QuickSort(vector<int>& v, int low, int high)
{
	if (low < high)
	{
		int pi = Partition(v, low, high);
		QuickSort(v, low, pi - 1);
		QuickSort(v, pi + 1, high);
	}
}
```

空间效率：快速排序采用递归实现，需要借助系统栈保存递归调用的上下文信息，栈的容量等于递归调用的最大层数。最好情况下，每次划分都比较均匀，空间复杂度是$O(\log n)$；最坏情况下，划分极不平衡，需要$n - 1$次递归调用，空间复杂度是$O(n)$；平均空间复杂度是$O(\log n)$。

时间效率：最坏情况下，初始序列基本有序或基本逆序，每趟划分只减少一个元素，总比较次数约为$\frac{n(n - 1)}{2}$，时间复杂度为$O(n^2)$；最好和平均情况下，时间复杂度是$O(n \log n)$。快速排序是所有内部排序算法中平均性能最优的排序算法。

快速排序不是稳定的排序算法，这也导致`stable_sort()`在设计时没有采用快速排序，因此它的时间开销会比`sort()`高。快速排序仅适用于顺序存储的线性表。

## 选择排序

选择排序的思想：第$i$趟在后面$n - i + 1$个待排序元素中选取关键字最小的元素，作为有序子序列的第$i$个元素，直到$n - 1$趟排序完成。

### 简单选择排序

算法思想如下：假设排序表为$L[1 \cdots n]$，第$i$趟从$L[i \cdots n]$中选取关键字最小的元素，并将其与$L[i]$交换。每一趟排序都可以确定一个元素的最终位置，经过$n - 1$趟排序后，整张表就有序了。

代码如下：

```cpp
#include <vector>
#include <utility>
using namespace std;

void SelectSort(vector<int>& v)
{
	int n = v.size();

	for (int i = 0; i < n - 1; i++)
	{
		int min = i;

		for (int j = i + 1; j < n; j++)
		{
			if (v[j] < v[min])
			{
				min = j;
			}
		}

		if (min != i)
		{
			swap(v[i], v[min]);
		}
	}
}
```

空间效率：仅使用常数个辅助单元，空间复杂度是$O(1)$。

时间效率：无论初始序列如何，比较次数都是$\frac{n(n - 1)}{2}$，时间复杂度恒为$O(n^2)$。

简单选择排序是不稳定的排序算法，适用于顺序存储和链式存储的线性表。

### 堆排序

堆是满足以下性质的完全二叉树：

- **大根堆：**每个结点的关键字都大于等于其左右孩子的关键字。
- **小根堆：**每个结点的关键字都小于等于其左右孩子的关键字。

若从$1$开始编号，则大根堆满足$L[i] \ge L[2i]$且$L[i] \ge L[2i + 1]$，小根堆满足$L[i] \le L[2i]$且$L[i] \le L[2i + 1]$，其中$1 \le i \le \lfloor n/2 \rfloor$。

下面代码使用$0$下标存储，父子关系相应变为：左孩子$2i + 1$，右孩子$2i + 2$，父结点$\lfloor (i - 1)/2 \rfloor$。

```cpp
#include <vector>
#include <utility>
using namespace std;

void SiftDown(vector<int>& v, int i, int n)
{
	while (2 * i + 1 < n)
	{
		int child = 2 * i + 1;

		if (child + 1 < n && v[child + 1] > v[child])
		{
			child++;
		}

		if (v[i] >= v[child])
		{
			break;
		}

		swap(v[i], v[child]);
		i = child;
	}
}

void HeapSort(vector<int>& v)
{
	int n = v.size();

	for (int i = n / 2 - 1; i >= 0; i--)
	{
		SiftDown(v, i, n);
	}

	for (int i = n - 1; i > 0; i--)
	{
		swap(v[0], v[i]);
		SiftDown(v, 0, i);
	}
}
```

建堆的时间复杂度是$O(n)$，之后每次把堆顶换到末尾并向下调整，单次调整$O(\log n)$，总共$O(n \log n)$。堆排序的空间复杂度是$O(1)$，是不稳定的排序算法，只适用于顺序存储的线性表。

升序排序使用大根堆，降序排序使用小根堆。堆排序非常适合从大量数据中选出前$k$个元素，这也是下面Top-K问题和优先队列的基础。

#### 堆的应用

##### Top-K问题

问题：从$n$个元素中找出最大或最小的$k$个元素。

如果找最大的$k$个元素，可以维护一个大小为$k$的**小根堆**。堆顶是当前候选的$k$个元素中最小的那个；扫描到新元素时，如果它比堆顶大，就替换堆顶并向下调整。扫描完所有元素后，堆里剩下的就是最大的$k$个元素。

如果找最小的$k$个元素，则维护一个大小为$k$的**大根堆**，堆顶是当前候选元素中最大的那个；新元素比堆顶小时替换堆顶。

时间复杂度是$O(n \log k)$，空间复杂度是$O(k)$。当$k$很小、$n$很大，或者数据是流式输入时，堆方法非常合适。如果$k$接近$n$，直接排序可能更简单；另外还有快速选择算法，平均时间复杂度$O(n)$，但最坏会退化到$O(n^2)$，而且会打乱原数组。

用$STL$的`priority_queue`实现“最大的$k$个元素”如下：

```cpp
#include <queue>
#include <vector>
using namespace std;

vector<int> TopKLargest(const vector<int>& nums, int k)
{
	priority_queue<int, vector<int>, greater<int>> pq;

	for (int x : nums)
	{
		if (pq.size() < k)
		{
			pq.push(x);
		}
		else if (x > pq.top())
		{
			pq.pop();
			pq.push(x);
		}
	}

	vector<int> ans;
	while (!pq.empty())
	{
		ans.push_back(pq.top());
		pq.pop();
	}
	return ans;
}
```

##### 优先队列

优先队列是每次出队优先级最高元素的数据结构，不按先进先出。教材给的设计题如下。

优先队列中的元素定义如下：

```c
typedef struct
{
	int value;		// 元素的值
	int priority;	// 元素的优先级，priority越大，优先级越高
} PriorityQueueElement;
```

要求设计一个优先队列，满足：

1. 初始时队列为空。
2. 入队时，不允许增加队列的占用空间。
3. 出队时，出队元素所占用的空间可以重复使用，即整个队列所占用的空间不变。
4. 入队操作和出队操作的时间复杂度始终保持为$O(\log_2 n)$。

回答以下问题：

1. 该队列选择链式存储结构还是顺序存储结构？
2. 给出优先队列的数据结构的定义。
3. 用代码给出入队操作和出队操作的基本过程。

**（$1$）该队列选择顺序存储结构。**

具体来说，用固定容量的数组实现一个大根堆。原因是堆需要根据下标随机访问父结点和孩子结点，顺序存储可以做到$O(1)$定位；而链式存储每次入队都要分配新结点，不容易满足“入队不增加占用空间”和$O(\log n)$操作的要求。

**（$2$）优先队列的数据结构定义如下：**

```c
#define MAXSIZE 100

typedef struct
{
	PriorityQueueElement data[MAXSIZE + 1];	// 从下标1开始存，data[0]不用
	int size;								// 当前元素个数
} PriorityQueue;
```

**（$3$）入队和出队的基本过程如下：**

```cpp
#include <utility>
using namespace std;

void InitQueue(PriorityQueue& pq)
{
	pq.size = 0;
}

bool Enqueue(PriorityQueue& pq, int value, int priority)
{
	if (pq.size == MAXSIZE)
	{
		return false;
	}

	int i = ++pq.size;
	pq.data[i].value = value;
	pq.data[i].priority = priority;

	while (i > 1 && pq.data[i].priority > pq.data[i / 2].priority)
	{
		swap(pq.data[i], pq.data[i / 2]);
		i /= 2;
	}
	return true;
}

bool Dequeue(PriorityQueue& pq, PriorityQueueElement& out)
{
	if (pq.size == 0)
	{
		return false;
	}

	out = pq.data[1];
	pq.data[1] = pq.data[pq.size];
	pq.size--;

	int i = 1;
	while (2 * i <= pq.size)
	{
		int child = 2 * i;

		if (child + 1 <= pq.size && pq.data[child + 1].priority > pq.data[child].priority)
		{
			child++;
		}

		if (pq.data[i].priority >= pq.data[child].priority)
		{
			break;
		}

		swap(pq.data[i], pq.data[child]);
		i = child;
	}
	return true;
}
```

入队时，把新元素放到数组末尾，然后不断和父结点比较，优先级更大就上浮，最多走树高$O(\log n)$。出队时，取走堆顶，把最后一个元素放到堆顶，然后向下调整，也最多$O(\log n)$。数组容量固定，出队后`size`减小，空出的位置可以被下一次入队复用，满足“整个队列占用空间不变”的要求。

如果优先级相同，堆不保证先进先出；需要稳定时，可以在元素里再加一个时间戳或入队序号，作为第二关键字。

##### $C++$ $STL$的`priority_queue`

$STL$的`priority_queue`就是堆实现的优先队列，默认是大根堆。使用时包含`<queue>`。

```cpp
#include <queue>
#include <vector>
#include <functional>
using namespace std;

priority_queue<int> maxHeap;						// 大根堆，top最大
priority_queue<int, vector<int>, greater<int>> minHeap;	// 小根堆，top最小

maxHeap.push(x);		// 入堆，O(log n)
maxHeap.pop();			// 弹出堆顶，O(log n)，不返回被删元素
maxHeap.top();			// 返回堆顶，O(1)
maxHeap.empty();		// 判断是否为空，O(1)
maxHeap.size();			// 返回元素个数，O(1)
maxHeap.emplace(x);		// 原地构造并入堆，O(log n)
```

`priority_queue`的模板形式是：

```cpp
priority_queue<元素类型, 底层容器, 比较器>
```

默认底层容器是`vector`，默认比较器是`less<T>`，所以默认是大根堆。要改成小根堆，就把比较器换成`greater<T>`。

`priority_queue`没有迭代器，不能遍历，也没有`clear()`。如果要清空，可以重新赋一个空队列：

```cpp
pq = priority_queue<int>();
```

如果元素是自定义结构，可以写一个比较器：

```cpp
#include <queue>
#include <vector>
using namespace std;

struct Node
{
	int value;
	int priority;
};

struct Cmp
{
	bool operator()(const Node& a, const Node& b) const
	{
		return a.priority < b.priority;	// priority大的在堆顶
	}
};

priority_queue<Node, vector<Node>, Cmp> pq;
```

比较器返回`true`表示`a`的优先级低于`b`，所以`b`更靠近堆顶。如果想按`priority`小的在堆顶，把`<`改成`>`即可。

`priority_queue`也可以存`pair`：

```cpp
priority_queue<pair<int, int>> pq;	// 先按first，再按second，默认大根堆
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq2;	// 小根堆
```

注意：`priority_queue`是不稳定结构，相同优先级的元素顺序不确定；`priority_queue`也不能像`vector`那样用下标访问，只能看堆顶。

## 归并排序

归并排序采用分治思想：把序列分成两半，分别排序，再把两个有序子序列合并成一个有序序列。

代码如下：

```cpp
#include <vector>
using namespace std;

void Merge(vector<int>& v, int low, int mid, int high, vector<int>& temp)
{
	int i = low;
	int j = mid + 1;
	int k = low;

	while (i <= mid && j <= high)
	{
		if (v[i] <= v[j])
		{
			temp[k++] = v[i++];
		}
		else
		{
			temp[k++] = v[j++];
		}
	}

	while (i <= mid)
	{
		temp[k++] = v[i++];
	}

	while (j <= high)
	{
		temp[k++] = v[j++];
	}

	for (i = low; i <= high; i++)
	{
		v[i] = temp[i];
	}
}

void MergeSort(vector<int>& v, int low, int high, vector<int>& temp)
{
	if (low >= high)
	{
		return;
	}

	int mid = (low + high) / 2;
	MergeSort(v, low, mid, temp);
	MergeSort(v, mid + 1, high, temp);
	Merge(v, low, mid, high, temp);
}
```

归并排序的时间复杂度是$O(n \log n)$，空间复杂度是$O(n)$，是稳定的排序算法。它适用于顺序存储，也可以用于链式存储；链式归并排序不需要额外申请数组，但递归栈仍然需要空间。

归并排序也是外部排序的基础。外部排序中的多路归并，就是把多个有序归并段不断合并成更大的有序段。

## 基数排序

基数排序不是比较排序，而是按关键字的每一位进行分配和收集。以最低位优先（LSD）为例：先按个位把元素分配到$10$个桶中，再按桶的顺序收集；然后按十位分配、收集；一直处理到最高位，整个序列就有序了。

代码如下：

```cpp
#include <algorithm>
#include <vector>
using namespace std;

void RadixSort(vector<int>& v)
{
	if (v.empty())
	{
		return;
	}

	int maxValue = *max_element(v.begin(), v.end());

	for (int exp = 1; maxValue / exp > 0; exp *= 10)
	{
		vector<vector<int>> buckets(10);

		for (int x : v)
		{
			buckets[(x / exp) % 10].push_back(x);
		}

		int idx = 0;
		for (int d = 0; d < 10; d++)
		{
			for (int x : buckets[d])
			{
				v[idx++] = x;
			}
		}
	}
}
```

基数排序的时间复杂度是$O(d(n + r))$，其中$d$是关键字的位数，$r$是基数（十进制时$r = 10$）。空间复杂度是$O(n + r)$。基数排序是稳定的排序算法，但每一趟分配和收集都必须保持稳定，否则低位已经排好的顺序会被破坏。

基数排序只适用于可以按位分解的关键字，通常要求关键字是非负整数。它不适用于浮点数和字符串等不能直接按位分解的数据。

## 外部排序

外部排序用于数据量太大、不能一次全部装入内存的情况。基本步骤是：

1. **生成初始归并段。**把输入文件分成若干块，每块读入内存，用内部排序排好，再写回外存。
2. **多路归并。**把若干个有序归并段合并成一个更大的有序段，直到只剩一个归并段。

设初始归并段有$m$个，每次做$k$路归并，则归并趟数为

$$
S = \left\lceil \log_k m \right\rceil.
$$

增加归并路数$k$可以减少归并趟数，从而减少磁盘读写次数，但$k$受内存缓冲区数量的限制。

多路归并中常用**败者树**来快速找出$k$个归并段中的最小关键字。败者树是一棵完全二叉树，叶子结点对应$k$个归并段，内部结点记录“败者”，冠军留在根结点。每输出一个记录，只需要沿着一条路径更新，时间复杂度是$O(\log k)$。

生成初始归并段时，还可以使用**置换-选择排序**：用一个小根堆作为工作区，平均可以得到长度为工作区大小$2$倍的归并段；如果输入数据本身接近有序，生成的归并段还可以更长。

外部排序的时间主要花在磁盘$I/O$上，所以优化的核心是减少归并趟数和磁盘读写次数。

## 各种排序算法的比较

| 算法 | 最好 | 平均 | 最坏 | 空间 | 稳定性 | 存储结构 |
| --- | --- | --- | --- | --- | --- | --- |
| 直接插入排序 | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | 稳定 | 顺序/链式 |
| 折半插入排序 | $O(n \log n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | 稳定 | 顺序 |
| 希尔排序 | 依赖增量 | 约$O(n^{1.3})$ | $O(n^2)$ | $O(1)$ | 不稳定 | 顺序 |
| 冒泡排序 | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | 稳定 | 顺序/链式 |
| 快速排序 | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | 平均$O(\log n)$ | 不稳定 | 顺序 |
| 简单选择排序 | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | 不稳定 | 顺序/链式 |
| 堆排序 | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | 不稳定 | 顺序 |
| 归并排序 | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | 稳定 | 顺序/链式 |
| 基数排序 | $O(d(n + r))$ | $O(d(n + r))$ | $O(d(n + r))$ | $O(n + r)$ | 稳定 | 顺序 |

简单选择排序、堆排序、归并排序和基数排序的比较次数与初始序列基本无关；直接插入、冒泡、快速排序等则与初始序列有关。

稳定排序有直接插入排序、折半插入排序、冒泡排序、归并排序和基数排序；不稳定排序有希尔排序、快速排序、简单选择排序和堆排序。

空间方面，归并排序需要$O(n)$辅助空间，快速排序平均需要$O(\log n)$递归栈空间，其余大多数排序算法只需要$O(1)$辅助空间。

## 排序算法题

### 相关题目

**$1$、设计一个算法，将两个递增有序顺序表合并成一个递增有序顺序表。**

用双指针分别扫描两个顺序表，每次取较小的元素放入结果表，最后把剩余元素接上即可。

```cpp
#include <vector>
using namespace std;

vector<int> MergeTwoSorted(const vector<int>& a, const vector<int>& b)
{
	vector<int> ans;
	int i = 0;
	int j = 0;

	while (i < a.size() && j < b.size())
	{
		if (a[i] <= b[j])
		{
			ans.push_back(a[i++]);
		}
		else
		{
			ans.push_back(b[j++]);
		}
	}

	while (i < a.size())
	{
		ans.push_back(a[i++]);
	}

	while (j < b.size())
	{
		ans.push_back(b[j++]);
	}

	return ans;
}
```

时间复杂度是$O(n + m)$，空间复杂度是$O(n + m)$。

**$2$、设计一个算法，求一个无序数组中第$k$小的元素。**

可以用大小为$k$的大根堆：堆里保存当前最小的$k$个元素，堆顶是这$k$个元素中最大的。扫描完数组后，堆顶就是第$k$小的元素。

```cpp
#include <queue>
#include <vector>
using namespace std;

int FindKthSmallest(const vector<int>& nums, int k)
{
	priority_queue<int> pq;

	for (int x : nums)
	{
		if (pq.size() < k)
		{
			pq.push(x);
		}
		else if (x < pq.top())
		{
			pq.pop();
			pq.push(x);
		}
	}

	return pq.top();
}
```

时间复杂度是$O(n \log k)$，空间复杂度是$O(k)$。如果要求平均$O(n)$，可以用快速选择，但最坏时间复杂度会退化到$O(n^2)$。

**$3$、设计一个算法，判断一个数组是否满足大根堆的性质。**

依次检查每个非叶结点是否大于等于它的左右孩子即可。

```cpp
#include <vector>
using namespace std;

bool IsMaxHeap(const vector<int>& v)
{
	int n = v.size();

	for (int i = 0; i <= (n - 2) / 2; i++)
	{
		int left = 2 * i + 1;
		int right = 2 * i + 2;

		if (left < n && v[i] < v[left])
		{
			return false;
		}

		if (right < n && v[i] < v[right])
		{
			return false;
		}
	}
	return true;
}
```

时间复杂度是$O(n)$，空间复杂度是$O(1)$。
