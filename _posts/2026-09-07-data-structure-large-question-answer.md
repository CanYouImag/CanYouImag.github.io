---
layout: post
title: 考研数据结构个人笔记——算法大题编码之线性表（持续更新）
date: 2026-09-02 13:30:00 +0800
categories: data structure
tags: [blog, 数据结构, 算法设计, 考研]
cover_image: /../assets/data_structure.jpg
---

今天新开一个408大题系列，我打算把408大题解题的一般思路整理出来，不过数据结构……除了计算时间复杂度之外剩下的大题都是算法设计什么的，而算法设计这种题我打算每道题都做一遍并记录整理答案，所以这篇博文应该会特别长。但大家放心，我会把题目按照王道的数据结构教材的章节进行分类的。

# 线性表

## 线性表的顺序存储

### 基础补充：计算算法的时间复杂度。
- 通常我们计算的是算法的最坏时间复杂度，因为它提供了算法运行时间的上界。
- 计算时间复杂度的话，先在代码中找基本运算，然后计算该运算执行了多少次。例如：
```c
void fun (int n)
{
	int i = 1;
	while(i <= n)
	{
		i = i * 2;
	}
}
```
在上例中，基本运算是$i = i * 2$，设执行次数为t，那么就有$2^t \leq n$，即$t \leq \log_2(n)$，因此时间复杂度就是$O(\log_2(n))$

-程序中有条件判断语句时，取分支中时间复杂度最大的那个做整体的时间复杂度。

### 相关题目

**$1$、从顺序表中删除具有最小值的元素（假设唯一），并由函数返回被删除的元素的值，空出的位置由最后一个元素填补，若顺序表为空，则显示错误信息并退出运行。**

这道题没什么好说的，遍历顺序表，时刻记录最小值，在走到顺序表末尾的时候输出最小值并退出函数，再加上给错误信息输出。

```c
int delete_min(int* a, int size)
/* 假设待处理顺序表a，长度为size */
{
	if (size <= 0)
	{
		printf("顺序表为空，删除失败！");
		return 0;   // 返回 0 表示删除失败
	}

	int min_idx = 0;
	for (int i = 1; i < size; i++) {
		if (a[i] < a[min_idx]) {
			min_idx = i;
		}
	}

	int ans = a[min_idx];          // 保存最小值
	a[min_idx] = a[size - 1];      // 将最后一个元素覆盖到最小值位置
	return ans;                    // 返回最小值
}
```

**$2$、设计一个高效算法，将顺序表的所有元素逆置，要求算法的空间复杂度为$O(1)$。**

题目要求空间复杂度是$O(1)$，意思就是整个函数内我们只能使用简单类型的临时变量，int整数，char字符什么的，像数组啊，结构体啊，链表啊什么的都别用~~（谅你们也用不明白哈哈哈）~~。这道题建议用尺取法，也就是双指针法。设置$left$和$right$两个指针，然后用$temp$做元素交换。

```c
void reverse(int* a, int size) 
{
	// 空表或单元素表无需逆置
	if (size <= 1) 
	{
		return;
	}

	int left = 0;
	int right = size - 1;

	while (left < right) 
	{
		// 交换首尾元素
		int temp = a[left];
		a[left] = a[right];
		a[right] = temp;

		// 移动指针
		left++;
		right--;
	}
}
```

**$3$、对长度为$n$的顺序表$L$，编写一个时间复杂度为$O(n)$，空间复杂度为$O(1)$的算法，该算法删除顺序表中所有值为$x$的元素。**

时间复杂度为$O(n)$，$n$还是数组长度，那么就是说算法只能遍历一遍数组，空间复杂度为$O(1)$不说了，上面有。这道题还是尺取法，不过一个指针用来遍历数组，另一个指针用来记录下一个非x元素应该移动到什么位置。

```c
int delete_all_x(int* a, int n, int x) 
{
	int k = 0;                // 慢指针，指向下一个非x元素的写入位置
	for (int i = 0; i < n; i++) 
	{
		if (a[i] != x) 
		{
			a[k++] = a[i];    // 将非x元素前移
		}
	}
	return k;                 // 返回删除后的新长度
}
```

**$4$、从顺序表中删除值在给定值$s$和$t$之间（包含$s$和$t$，要求$s < t$）的所有元素，若$s$和$t$的位置不合理或顺序表为空，则显示错误信息并退出运行。**

这道题和上一道题很相似，就是要处理的数值范围有变化了。

```c
int delete_range(int* a, int size, int s, int t) 
{
	// 错误处理1：顺序表为空
	if (size <= 0) 
	{
		printf("错误：顺序表为空，删除失败！\n");
		return -1; // 返回-1表示异常退出
	}

	// 错误处理2：s和t的位置不合理（要求s <= t）
	if (s > t) 
	{
		printf("错误：s和t的位置不合理，删除失败！\n");
		return -1; // 返回-1表示异常退出
	}

	int k = 0; // 慢指针，记录有效元素个数及下一个写入位置
	for (int i = 0; i < size; i++) 
	{
		// 核心条件：若当前元素不在[s, t]闭区间内，则保留（覆盖到前面）
		if (a[i] < s || a[i] > t) 
		{
			a[k++] = a[i];
		}
		// 若 a[i] 在 [s, t] 内，则什么都不做（相当于删除了它）
	}

	return k; // 返回删除后的新长度
}
```

**$5$、从有序顺序表中删除所有其值重复的元素，使表中所有元素的值均不相同。**

这道题还是用尺取法，一个指针用来遍历数组，另一个指针用来指向当前已经确定的不重复的最后一个元素的下标。如果$a[i] == a[k]$，说明$a[i]$和已保留的最后一个元素重复，丢弃它（不做任何操作）。如果$a[i] != a[k]$，说明发现了一个全新的值，将$a[i]$移动到$a[++k]$（即慢指针的下一个位置），然后慢指针$k$指向新值。

```c
int delete_duplicates(int* a, int size) 
{
	// 错误处理：顺序表为空
	if (size <= 0) 
	{
		printf("错误：顺序表为空，无法去重！\n");
		return 0; // 返回0表示删除后为空
	}

	// 慢指针 k：初始指向第一个元素，它一定被保留
	int k = 0;

	// 快指针 i：从第二个元素开始扫描
	for (int i = 1; i < size; i++) 
	{
		// 只有当元素与上一个保留的不同时，才往前搬
		if (a[i] != a[k]) 
		{
			// 注意这里要先 ++k，因为 k 指向的是最后一个保留的元素
			k++;
			a[k] = a[i]; // 将不重复的元素搬到前面
		}
		// 如果相等，说明是重复值，直接跳过（相当于删除）
	}

	// 循环结束后，k 指向最后一个唯一元素的下标
	// 新长度 = k + 1
	return k + 1;
}
```

**$6$、将两个有序顺序表合并成一个新的有序顺序表，并由函数返回结果顺序表。**

通过一个辅助数组保存新表，两张旧表各维持一个指针用于元素比较，将较小值写入新表。

```c
int* merge_ordered_lists(int* a, int* b, int n, int* new_size) 
{
	// 假设两张有序表长度为n，那么新表最长就是2n，鉴于C不允许用变量赋值静态数组的长度，所以我们用malloc
	int* c = (int*)malloc(2 * n * sizeof(int));
	if (c == NULL) 
	{
		*new_size = 0;
		return NULL;
	}

	int i = 0, j = 0, k = 0;

	// 双指针比较，将较小者放入新表
	while (i < n && j < n) 
	{
		if (a[i] <= b[j]) 
		{
			c[k++] = a[i++];
		}
		else 
		{
			c[k++] = b[j++];
		}
	}

	// 复制剩余元素
	while (i < n) 
	{
		c[k++] = a[i++];
	}
	while (j < n) 
	{
		c[k++] = b[j++];
	}

	*new_size = k;  // 实际长度，等于 2n
	return c;
}
```

**$7$、已知在一维数组$A[m + n]$中依次存放两个线性表$(a_1, a_2, \dots, a_m)$和$(b_1, b_2, \dots, b_n)$，编写一个函数，将数组中两个顺序表的位置互换。**

这道题本质上可以归类为数组块交换的问题，本质上是数组循环移位和反转的问题，最优解法是三次反转法：把原数组看成$[A][B]$，做第一次反转得到$[B_{reversed}][A_{reversed}]$，然后反转前$n$个元素，即反转$[B_{reversed}]$得到$[B]$，再反转后$m$个元素，即反转$[A_{reversed}]$得到$[A]$，此题得解。

```c
void reverse(int* arr, int left, int right) 
/* 反转函数，用于反转数组的left到right之间的元素 */
{
	while (left < right) 
	{
		int temp = arr[left];
		arr[left] = arr[right];
		arr[right] = temp;
		left++;
		right--;
	}
}

void swap_lists(int* A, int m, int n) 
/* 主功能函数 */
{
	// 如果某一方长度为0，无需交换
	if (m <= 0 || n <= 0) 
	{
		return;
	}

	int total = m + n;

	// 1. 反转整个数组
	reverse(A, 0, total - 1);

	// 2. 反转前 n 个（此时前 n 个是原来的 B 部分）
	reverse(A, 0, n - 1);

	// 3. 反转后 m 个（从下标 n 到 total-1）
	reverse(A, n, total - 1);
}
```

**$8$、给定三个长度均为$n$，且均无重复元素的递增序列$A$，$B$，$C$，设计一个时间上尽可能高效的算法，逐行输出同时存在于这三个序列中的所有元素。并说明算法的时间复杂度和空间复杂度。**

这道题教材的答案使用三个下标变量从小到大遍历数组，当三个下标变量指向的元素相等时，输出并向前推进指针，否则仅移动小于最大元素的下标变量，直到某个下标变量移除数组范围。时间复杂度$O(n)$，空间复杂度$O(1)$，比哈希表省空间。

```cpp
void printCommonSorted(int A[], int B[], int C[], int n) 
{
	int i = 0, j = 0, k = 0;

	while (i < n && j < n && k < n) 
	{
		// 情况1：三个相等，找到了！
		if (A[i] == B[j] && B[j] == C[k]) 
		{
			cout << A[i] << endl;
			i++; j++; k++; // 全部后移，避免重复输出同一个元素
		}
		// 情况2：不相等，找出当前三个指针指向的最大值
		else 
		{
			int maxVal = A[i];
			if (B[j] > maxVal) maxVal = B[j];
			if (C[k] > maxVal) maxVal = C[k];

			// 只有小于最大值的指针才移动（追赶最大值）
			if (A[i] < maxVal) i++;
			if (B[j] < maxVal) j++;
			if (C[k] < maxVal) k++;
		}
	}
}
```

**$9$、将$n(n \ge 1)$个整数存放到一维数组R中，设计一个在时间和空间上尽可能高效的算法，将R中保存的序列循环往左移$p(0 < p < n)$个位置，并说明算法的时间复杂度和空间复杂度。**

这道题又回到了我们最熟悉的三次反转法，把数组$R$分成两部分：前$n - p$部分和后$p$部分。先反转数组$R$，然后反转$R[0]$到$R[n - p]$，然后反转$R[n - p + 1]$到$R[n]$。数组中每个元素参与三次反转，每次反转涉及到一次交换，所以总的时间复杂度是$3 \times \frac{n}{2}$，即$O(n)$。空间复杂度上，算法只用了三个临时变量，所以是$O(1)$。

```c
// 反转数组 R 中从下标 left 到 right（闭区间）的元素
void reverse(int R[], int left, int right) 
{
	while (left < right) 
	{
		int temp = R[left];
		R[left] = R[right];
		R[right] = temp;
		left++;
		right--;
	}
}

void leftRotate(int R[], int n, int p) 
{
	// 处理边界情况：空数组或单元素，或无需移动
	if (n <= 1 || p == 0) 
	{
		return;
	}

	// 注意：题目允许 p == n，此时循环左移 n 位等于原数组
	// 取模运算确保 p 在 [0, n-1] 范围内，避免无效反转
	p = p % n;
	if (p == 0) 
	{
		return;
	}

	// 1. 反转整个数组
	reverse(R, 0, n - 1);

	// 2. 反转前 n-p 个元素
	reverse(R, 0, n - p - 1);

	// 3. 反转后 p 个元素
	reverse(R, n - p, n - 1);
}
```

**$10$、一个长度为$L(L \leq q)$的升序序列$S$，处在第$\lceil\frac{L}{2}\rceil$个位置的数称为$S$的中位数，两个序列的中位数是包含他们所有元素的升序序列的中位数。例如：$S_1 = (11, 13, 15, 17, 19)$，$S_2 = (2, 4, 6, 8, 20)$。则$S_1$和$S_2$的中位数是11。现在有两个长度为$n$的等长升序序列$A$和$B$，设计一个在时间和空间上尽可能高效的算法，找出两个序列$A$和$B$的中位数。**

这道题最高效的做法是减治法，本质上就是对两个序列做二分查找。因为两个序列都升序且等长，所以$A$和$B$两个序列的中位数必然在$A$和$B$各自的中位数之间。我们通过比较$A$和$B$各自的中位数，每次排除两个序列中不可能含有中位数的一半。具体规则如下：

- 分别提取$A$和$B$各自的中位数$A_{mid}$和$B_{mid}$
- 若$A_{mid} == B_{mid}$，则所求的两个序列的中位数就是$A_{mid}$，也是$B_{mid}$
- 若$A_{mid} < B_{mid}$：
  - 则中位数一定在$A$的右半部分和$B$的左半部分中
  - 若序列长度$n$为奇数，则舍弃$A_{mid}$左侧的所有元素，保留$A_{mid}$，舍弃$B_{mid}$右侧的所有元素，保留$B_{mid}$
  - 若序列长度$n$为偶数，则舍弃$A_{mid}$左侧的所有元素，同时舍弃$A_{mid}$，舍弃$B_{mid}$右侧的所有元素，保留$B_{mid}$
- 若$A_{mid} \ge B_{mid}$：
  - 则中位数一定在$A$的左半部分和$B$的右半部分中
  - 若序列长度$n$为奇数，则舍弃$A_{mid}$右侧的所有元素，保留$A_{mid}$，舍弃$B_{mid}$左侧的所有元素，保留$B_{mid}$
  - 若序列长度$n$为偶数，则舍弃$A_{mid}$右侧的所有元素，保留$A_{mid}$，舍弃$B_{mid}$左侧的所有元素，同时舍弃$B_{mid}$

```c
int findMedian(int A[], int B[], int n) 
{
	int s1 = 0, e1 = n - 1;   // A 的左右指针
	int s2 = 0, e2 = n - 1;   // B 的左右指针

	while (s1 < e1) 
	{
		int m1 = (s1 + e1) / 2;
		int m2 = (s2 + e2) / 2;
		int len = e1 - s1 + 1; // 当前处理区间的长度

		if (A[m1] == B[m2])     // 满足条件1
		{
			return A[m1];
		}

		if (A[m1] < B[m2])      // 满足条件2
		{
			// 中位数在 A 的右半部分 和 B 的左半部分
			if (len % 2 == 1) 
			{ // 奇数长度：保留中间值
				s1 = m1;
				e2 = m2;
			}
			else 
			{            // 偶数长度：A 跳过中间值，B 保留中间值
				s1 = m1 + 1;
				e2 = m2;
			}
		}
		else    // A[m1] > B[m2]，满足条件3
		{
			// 中位数在 A 的左半部分 和 B 的右半部分
			if (len % 2 == 1) 
			{
				e1 = m1;
				s2 = m2;
			}
			else 
			{
				e1 = m1;
				s2 = m2 + 1;
			}
		}
	}

	// 当两个区间各剩一个元素时，较小者即为中位数
	return A[s1] < B[s2] ? A[s1] : B[s2];
}
```

**$11$、已知一个整数序列$A = (a_0, a_1, \dots, a_n-1)$，其中$0 \leq a_i < n (0 \leq i < n)$。若存在$a_{p1} = a_{p2} = \dots = a_{pm} = x$且$m \ge \frac{n}{2} (0 \leq p_k < n, 1 \leq k \leq m)$，则称$x$为$A$的主元素。例如$A = (0, 5, 5, 3, 5, 7, 5, 5)$，则$5$是主元素。又如$A = (0, 5, 5, 3, 5, 1, 5, 7)$，则$A$中没有主元素。假设$A$用一个一维数组表示，设计一个尽可能高效的算法，找出$A$的主元素并输出，若不存在主元素，则输出$-1$。并给出时间复杂度和空间复杂度。**

各位道友们是不是一看到这大段题目就懵了，这说的啥破玩意儿啊？别急，往下看。

所谓主元素，说到底就是数组中出现的次数严格大于$\frac{n}{2}$的数。由于不可能存在一个大于$\frac{n}{2}$的数乘以$2$还能小于$n$，因此如果一个序列存在主元素，则主元素必定唯一。

这道题我们可以用摩尔投票法。具体来说：

**想象一个战场：**

- 我们维护一个脾气有点火爆的候选人（就是所谓的主元素的备选）和它的血量（主元素的计数）。血量初始化$count = 0$
- 遍历数组：
  - 如果当前$count = 0$，说明此前没有幸存者，我们把当前元素设置为候选人，$count = 1$
  - 如果当前元素等于候选人，说明是友军，$count++$
  - 如果当前元素不等于候选人，说明是敌军，候选人在看到敌军之后就会立刻冲上去一个跟他同归于尽。$count--$
  - 遍历完一遍数组之后，剩下的候选人就是主元素的备选，此时还需要再遍历一遍数组统计候选人的数量以判断它能否真正成为主元素

遍历两边数组，时间复杂度是$O(n)$，使用常数个临时变量，空间复杂度是$O(1)$

```c
int findMajority(int A[], int n) 
{
	// 1. 投票阶段：找出可能的候选者
	int candidate = -1;
	int count = 0;

	for (int i = 0; i < n; i++) 
	{
		if (count == 0) 
		{
			candidate = A[i];
			count = 1;
		}
		else if (A[i] == candidate) 
		{
			count++;
		}
		else 
		{
			count--;
		}
	}

	// 2. 验证阶段：统计候选者实际出现次数
	count = 0;
	for (int i = 0; i < n; i++) 
	{
		if (A[i] == candidate) 
		{
			count++;
		}
	}

	// 严格大于 n/2 才是主元素
	if (count > n / 2) 
	{
		return candidate;
	}
	else 
	{
		return -1;
	}
}
```

**$12$、定义三元组$(a, b, c)$（$a, b, c$均为整数）的距离$D = \lvert a - b\rvert + \lvert b - c\rvert + \lvert c - a\rvert$。给定三个非空整数集合$S_1, S_2, S_3$，按升序存储在三个数组中。设计一个尽可能高效的算法，计算并输出所有可能的三元组$(a \in S_1, b \in S_2, c \in S_3)$中的最小距离。例如$S_1 = \{-1, 0, 9\}, S_2 = \{-25, -10, 10, 11\}, S_3 = {2, 9, 17, 30, 41}$，则最小距离是$2$，相应的三元组是$(9, 10, 9)$。给出算法的时间复杂度和空间复杂度。**

在看这道题之前，我们先推导给东西：

已知三个数$x, y, z$，我们将这三个数按从小到大的顺序排列：
$$
x \leq y \leq z
$$

因为绝对值关于$y$轴对称，所以原式$D = \lvert a - b\rvert + \lvert b - c\rvert + \lvert c - a\rvert$经过重新排列，带入最大值最小值得：

$$
D = \lvert x - y\rvert + \lvert y - z\rvert + \lvert z - x\rvert \\
  = y - x + z - y + z - x \\
  = 2z - 2x \\
  = 2(z - x) \\
  = 2[max(x, y, z) - min(x, y, z)]
$$

得到上面的式子后我们回到原问题：因为三个集合均按升序存储，我们可以使用三指针法。令三个指针分别指向三个数组的起始位置，每次计算当前三元组$(A[i], B[i], C[i])$的跨度$max - min$，更新最小距离$ans = min(ans, 2*(max - min))$。然后将最小元素的指针向前移动一位，重复上述步骤直到某个指针越界。

算法需要遍历三个数组，时间复杂度是$O(n_1 + n_2 + n_3)$，空间上只用了常数个辅助变量，因此空间复杂度是$O(1)$

```c
#include <limits.h>

int findMinDistance(int A[], int n1, int B[], int n2, int C[], int n3) 
{
	int i = 0, j = 0, k = 0;
	int ans = INT_MAX;

	while (i < n1 && j < n2 && k < n3) 
	{
		int a = A[i], b = B[j], c = C[k];
		int max = a > b ? (a > c ? a : c) : (b > c ? b : c);
		int min = a < b ? (a < c ? a : c) : (b < c ? b : c);
		int cur = 2 * (max - min);
		if (cur < ans) 
		{
			ans = cur;
		}

		// 移动指向最小值的指针
		if (min == a) 
		{
			i++;
		}
		else if (min == b) 
		{
			j++;
		}
		else 
		{
			k++;
		}
	}

	return ans;
}
```

## 线性表的链式存储

### 基础补充：链表的基本操作。

首先我们给出链表的节点定义：

```c
typedef struct LNode
{
	ElemType data;
	struct LNode *next;
}LNode, *LinkList;
```

```text
这段内容给C语言基础不扎实的同学讲一下上面那段代码的每一部分代表什么。
1、typedef：用于给C语言中的类型取一个新名字。
2、struct：结构体声明。
3、LNode（struct后面那个）：结构体标签，即结构体类型的名字。
4、ElemType：任意数据类型。可以是int，char，float，double，甚至是其他struct。
5、*next：链表中负责指向下一个节点的指针域。
6、LNode（整个结构体后面那个）：重命名“struct LNode”为"LNode"。
7、*LinkList：重命名“struct LNode”为“LinkList”，并在其开头添加“*”使其指向结构体指针，即现在“LinkList”等价于“struct LNode *”
注：纯C语言中，如果没有typedef，我们声明了Struct LNode这个结构体类型的话，往后声明新的变量就必须要写“struct LNode A”，但是在C++里，它会把结构体标签自动变成结构体类型名，也就是说，如果不用typedef的话，在C++里，我们直接用“LNode A”是不会报错的。
```

#### 单链表的初始化：

```c
// 带头结点的单链表初始化
bool InitList(LinkList &L)
{
	L = (LNode*)malloc(sizeof(LNode));	// 创建头节点
	L -> next = NULL;					// 头节点后暂无数据
	return true;						// 创建成功
}

// 不带头结点的单链表初始化
bool InitList(LinkList &L)
{
	L = NULL;					// 无头节点的链表初始化就说明链表里啥也没有
	return true;
}
```

#### 单链表求表长

```c
// 单链表求表长本质上是统计单链表中数据的个数（不包括头节点）
int Length(LinkList L)
{
	int len = 0;				// 计数变量
	LNode *p = L;				// 取单链表第一个节点
	while (p -> next != NULL)
	{
		p = p -> next;
		len++;
	}
	return len;
}
```

#### 按序号查找结点

```c
// 从单链表的第一个数据节点开始查找第i个节点
LNode *GetElem(LinkList L, int i)
{
	LNode *p = L;				// 取单链表第一个节点
	int j = 0;
	while(p != NULL && j < i)
	{
		p = p -> next;
		j++;
	}
	return p;		// 找到第i个节点就返回对应的指针，否则返回NULL
}
```

#### 按值查找表节点

```c
LNode *LocateElem(LinkList L, ElemType e)
{
	LNode *p = L -> next;	// 跳过头节点取第一个数据节点
	while(p != NULL && p -> data != e)	// 从第一个数据节点开始查找值为e的节点
	{
		p = p -> next;
	}
	return p;
}
```

#### 插入节点操作

将值为$e$的新节点插入到第$i$个位置，先检查$i$的合法性，然后找到第$i - 1$个节点，即待插入节点的前驱，再在其后插入新节点。

```c
bool LIstInsert(LinkList& L, int i, ElemType e) 
{
	LNode* p = L;		// p指向当前扫描节点
	int j = 0;			// j记录当前位序，头节点是第0个节点
	while(p != NULL && j < i - 1)	// 寻找第i-1个结点
	{
		p = p->next;
		j++;
	}
	if (p == NULL) 
	{
		return false;		// i值不合法
	}
	LNode* s = (LNode*)malloc(sizeof(LNode));	// 生成新结点
	s -> data = e;
	s -> next = p->next;	// 步骤1：将p的后继结点赋值给s的后继
	p->next = s;	// 步骤2：将s连接到p的后继
	return true;
}
```

- 注：步骤1和步骤2的顺序不能颠倒，若先执行步骤2，则会导致原后继地址丢失，即插入节点$s$的后继不再是节点$p$原先的的后面的节点，而是$s$自己。

#### 删除节点操作

假设要删除的第$i$个节点为$*q$，而找到的第$i - 1$个节点为$*p$，先将$*p$的$next$指向$*q$的后继结点，然后释放$*q$。

```c
bool ListDelete(LinkList& L, int i, ElemType& e)
{
	LNode* p = L;
	int j = 0;
	while (p->next != NULL && j < i - 1)
	{
		p = p->next;
		j++;
	}
	if (p->next == NULL || j > i - 1)		// j值不合法 
	{
		return false;
	}
	LNode* q = p->next;		// 令q指向被删除的节点
	e = q->data;		// e返回删除元素的值
	p->next = q->next;
	free(q);		// q是用malloc申请的空间，就要用free释放
	return true;
}
```

#### 采用头插法建立单链表

头插法指的是从一个空表开始，生成新节点$*s$，并将输入的数据存入它的数据域，然后令$s -> next$指向头节点的$next$域指向的节点，再将头节点的$next$域指向$*s$，重复此过程，新节点始终是第一个数据节点，最终链表中的数据顺序与输入顺序相反。

```c
LinkList List_HeadInsert(LinkList& L)	// 头插法建立单链表
{
	LNode* s;	// 待插入节点
	int x;		// 设数据域包含一个整型数据
	L = (LNode*)malloc(sizeof(LNode));	// 创建头节点
	L->next = NULL;
	cin >> x;
	while (x != -1)		// 假设输入-1表示结束输入
	{
		s = (LNode*)malloc(sizeof(LNode));	// 新节点分配空间
		s->data = x;
		s->next = L->next;
		L->next = s;
		cin >> x;		// 继续下一个输入
	}
	return L;
}
```

若单链表不带头节点，则每次插入新节点后，都要将新节点的指针赋值给头指针$L$

#### 尾插法建立单链表

尾插法指的是新节点都插入当前链表的表尾，为此，需要维护一个尾指针始终指向当前的尾节点。链表中数据的顺序与输入顺序一致。

```c
LinkList List_TailInsert(LinkList& L)	// 尾插法建立单链表
{
	int x;	// 设数据域包含一个整型元素
	L = (LNode*)malloc(sizeof(LNode));
	LNode* s, * r = L;	// s指向新节点，r指向表尾
	cin >> x;
	while (x != -1)		// 假设输入-1表示结束输入
	{
		s = (LNode*)malloc(sizeof(LNode));
		s->data = x;
		r->next = s;
		r = s;		// r指向新的表尾节点
		cin >> x;
	}
	r->next = NULL;
	return L;
}
```

### 其他特殊链表

#### 双链表

双链表的每一个节点包含数据域，前驱指针域$prior$和后继指针域$next$，可以分别指向直接前驱和直接后继。头节点的$prior$为空，尾节点的$next$为空。

#### 循环单链表

单链表中最后一个节点的$next$域指向头节点，从而使整个链表形成一个环，判空条件变成检查头节点的$next$域是否是头节点自身。

#### 循环双链表

双链表中头节点的$prior$域指向尾节点，尾节点的$next$域指向头节点。当循环双链表为空时，头节点的$prior$域和$next$域均指向自身。

#### 静态链表

就是用数组表示的链表。数组中每个元素包含两个域：$data$和$next$，因此一般用结构体数组表示。这里的$next$保存的是节点所在的数组下标。结构定义如下：

```c
# define MaxSize 50
typedef struct 
{
	ElemType data;
	int next;
}SLinkList[MaxSize];
```

一般静态链表以$next == -1$作为结束标志，插入、删除操作只需要修改对应指针下标。

### 相关题目

**$1$、在带头结点的单链表中删除所有值为$x$的节点并释放其空间，假设值为$x$的节点不唯一**

```c
void DeleteAllX(LinkList L, ElemType x) 
{
	LNode* pre = L;          // pre 指向当前节点的前驱，初始为头结点
	LNode* p = L->next;      // p 从第一个实际节点开始

	while (p != NULL) 
	{
		if (p->data == x) 
		{
			pre->next = p->next;  // 前驱跳过当前节点
			free(p);              // 释放被删节点空间
			p = pre->next;        // p 指向新的后继节点
		}
		else 
		{
			pre = p;              // 前驱后移
			p = p->next;          // 当前指针后移
		}
	}
}
```

**$2$、编写在带头节点的单链表L中删除最小值节点的高效算法，假设节点唯一**

```c
void DeleteMinNode(LinkList L) 
{
	if (L == NULL || L->next == NULL) 
	{
		return;                     // 空表或只有头结点，无需删除
	}

	LNode* pre = L;                 // pre 指向 p 的前驱
	LNode* p = L->next;             // p 用于遍历
	LNode* minpre = pre;            // 最小值节点的前驱
	ElemType min = p->data;         // 当前最小值

	while (p != NULL) 
	{
		if (p->data < min) 
		{
			min = p->data;
			minpre = pre;           // 记录最小值节点的前驱
		}
		pre = p;
		p = p->next;
	}

	// 删除最小值节点
	LNode* q = minpre->next;
	minpre->next = q->next;
	free(q);
}
```

**$3$、编写算法将带头结点的单链表就地逆置，就地指使用的空间复杂度是$O(1)$**

利用头插法重建链表：从头到尾扫描原链表的每个实际节点，依次将其摘下并插入到头结点之后。由于每次插入都在头部，最终链表的顺序恰好被逆置。

```c
void ReverseList(LinkList L) 
{
	if (L == NULL || L->next == NULL) 
	{
		return;                     // 空表或只有一个实际节点，无需逆置
	}

	LNode* p = L->next;             // p 指向第一个实际节点
	L->next = NULL;                 // 头结点与原链表断开，准备头插

	while (p != NULL) 
	{
		LNode* q = p->next;         // 暂存 p 的后继，防止断链
		p->next = L->next;          // 将 p 插入到头结点之后
		L->next = p;
		p = q;                      // p 继续处理原链表的下一个节点
	}
}
```

**$4$、设在一个带头节点的单链表中，所有节点的元素均无须，编写一个函数，删除表中所有处于给定两个值之间的元素（如果存在），该两个值由函数参数给出**

```c
void DeleteBetween(LinkList L, ElemType low, ElemType high) 
{
	if (L == NULL || L->next == NULL) 
	{
		return;                     // 空表或只有头结点，无需处理
	}

	// 确保 low <= high，若参数顺序颠倒则交换
	if (low > high) 
	{
		ElemType temp = low;
		low = high;
		high = temp;
	}

	LNode* pre = L;                 // pre 指向当前节点的前驱
	LNode* p = L->next;             // p 用于遍历实际节点

	while (p != NULL) 
	{
		if (p->data >= low && p->data <= high)		// 处于闭区间 [low, high] 内
		{ 
			pre->next = p->next;    // 前驱跳过当前节点
			free(p);                // 释放被删节点空间
			p = pre->next;          // p 指向新的后继节点
		}
		else 
		{
			pre = p;                // 前驱后移
			p = p->next;            // 当前指针后移
		}
	}
}
```

**$5$、设$C = \{a_1, b_1, a_2, b_2, \dots, a_n, b_n\}$为线性表，采用带头结点的单链表存放，设计一个就地算法，将其拆分成两个线性表为$A = \{a_1, a2, \dots, a_n\}$和$B = \{b_1, b_2, \dots, b_n\}$**

```c
void SplitList(LinkList C, LinkList* A, LinkList* B) 
{
	*A = C;                     // A 复用原头结点
	*B = NULL;                  // B 初始为空（不带头结点）
	LNode* pa = C;              // pa 指向 A 的尾结点
	LNode* pb_tail = NULL;      // pb_tail 指向 B 的尾结点
	LNode* p = C->next;         // p 指向当前 a 结点

	while (p != NULL) 
	{
		// 1. 将当前 a 结点保留在 A 中
		pa->next = p;
		pa = p;

		// 2. 处理紧随其后的 b 结点
		LNode* q = p->next;     // q 指向当前 b 结点
		if (q != NULL) 
		{
			p->next = q->next;  // 从原链中摘除 b 结点，a 直接指向下一个 a
			// 将 q 尾插到 B 中
			if (*B == NULL) 
			{
				*B = q;
				pb_tail = q;
			}
			else 
			{
				pb_tail->next = q;
				pb_tail = q;
			}
			p = p->next;        // p 移向下一个 a 结点
		}
		else 
		{
			p = p->next;        // 没有 b 结点了，p 变为 NULL
		}
	}

	pa->next = NULL;            // A 的尾结点置空
	if (pb_tail != NULL) 
	{
		pb_tail->next = NULL;   // B 的尾结点置空
	}
}
```