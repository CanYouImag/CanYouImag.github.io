---
layout: post
title: "考研数据结构个人笔记——算法大题编码之图"
date: 2026-10-20 10:00:00 +0800
categories: data structure
tags: [blog, 数据结构, 算法设计, 考研]
cover_image: /../assets/data_structure.jpg
---

欢迎各位道友来到$408$大题系列里关系最复杂的一章——图。前面线性表是一条线，树是一棵树，到了图，节点们彻底放飞自我：谁都可以和谁连边，连得有向叫有向图，连得无向叫无向图，连上权值叫带权图，连得学生们脑子打结，那就叫复习时的脑图。这一章概念多、算法多，大题也容易下狠手，请各位道友系好安全带，别急着图穷匕见，先把概念捋顺，再和图论算法慢慢过招。

# 图

## 相关概念

### 图的定义

- **图：**由顶点集$V$和边集$E$组成，记作$G = (V, E)$。$V$是顶点的非空有限集合，$E$是边的有限集合。图可以没有边，但不能没有顶点。
- **无向图：**边没有方向，边$(v, w)$和$(w, v)$表示同一条边。
- **有向图：**边有方向，有向边也叫**弧**，记作$\langle v, w \rangle$，表示从$v$指向$w$。一般$\langle v, w \rangle$和$\langle w, v \rangle$是两条不同的弧。
- **邻接与关联：**一条边连接的两个顶点互为**邻接点**；这条边与这两个顶点**相关联**。

### 图的分类

- **简单图：**不存在重复边，也不存在自环（顶点到自身的一条边）。$408$默认讨论简单图，除非题目特别说明。
- **多重图：**存在重复边或自环的图。
- **完全图：**
  - **无向完全图$K_n$：**任意两个顶点之间都有一条边，共有$\frac{n(n-1)}{2}$条边。
  - **有向完全图：**任意两个顶点之间都有两条方向相反的弧，共有$n(n-1)$条弧。
- **稠密图与稀疏图：**边数相对较多的叫稠密图，边数相对较少的叫稀疏图。这个概念没有绝对界限；有的教材把$\lvert E\rvert < \lvert V\rvert \log \lvert V\rvert$视为稀疏图，考研一般按题目意思判断。
- **网：**带权的图。边上的权可以表示距离、花费、时间等。

### 顶点的度

- **无向图的度：**顶点$v$的度$TD(v)$是与它关联的边的数目。
- **有向图的度：**
  - **入度$ID(v)$：**以$v$为终点的弧的数目；
  - **出度$OD(v)$：**以$v$为起点的弧的数目；
  - **总度：**$TD(v) = ID(v) + OD(v)$。
- **自环：**无向图中自环给顶点贡献$2$度；有向图中自环贡献$1$个入度和$1$个出度。
- **孤立点与悬挂点（无向图）：**度为$0$的顶点叫孤立点；度为$1$的顶点叫悬挂点，和它关联的边叫悬挂边。
- **握手定理：**无向图中，所有顶点的度之和等于边数的$2$倍：$\sum_{v \in V} TD(v) = 2\lvert E\rvert$。
- **有向图的度：**所有顶点的入度之和等于出度之和，都等于弧数：$\sum_{v \in V} ID(v) = \sum_{v \in V} OD(v) = \lvert E\rvert$。
- **奇度顶点：**无向图中度为奇数的顶点个数一定是偶数。

### 路径、回路与连通性

- **路径：**顶点序列$v_0, v_1, \dots, v_k$，其中相邻两个顶点之间都有边；有向图的路径必须顺着弧的方向走。路径长度是边数$k$，不是顶点数。
- **简单路径：**路径中顶点不重复。
- **回路（环）：**起点和终点相同的路径。**简单回路**是除起点和终点外，其余顶点不重复的回路。
- **距离：**两个顶点之间最短路径的长度；如果不存在路径，距离记为$\infty$。
- **连通（无向图）：**任意两个顶点之间都有路径，称该无向图连通。
- **连通分量：**无向图中的**极大连通子图**。连通图只有一个连通分量，非连通图有多个连通分量。
- **强连通（有向图）：**任意两个顶点$u, v$之间，既存在$u \to v$的路径，也存在$v \to u$的路径。
- **强连通分量：**有向图中的**极大强连通子图**。强连通图只有一个强连通分量，非强连通图有多个强连通分量。

> 有向图里“$u$能到$v$”不代表“$v$能到$u$”，所以强连通要求双向都能到，别把单向可达当成强连通。

### 子图、生成树与特殊图

- **子图：**从原图中取一部分顶点和一部分边，并且边两端的顶点都要在取出的顶点集中。
- **生成子图：**包含原图全部顶点的子图。
- **生成树：**连通无向图的一个**极小连通子图**，包含全部$n$个顶点和$n-1$条边。生成树不唯一；任意加一条边会形成回路，任意删一条边会变成非连通。
- **生成森林：**非连通无向图的每个连通分量各取一棵生成树，合起来就是生成森林。一个有$k$个连通分量的无向图，其生成森林有$n-k$条边。
- **有向树：**有向图中恰有一个顶点的入度为$0$，其余顶点的入度都为$1$，且从入度为$0$的顶点可以到达所有顶点。$408$里一般了解即可。
- **有向无环图（$\mathrm{DAG}$）：**不含回路的有向图，后面拓扑排序会用到。

> 别把“极大”和“极小”记反：连通分量是极大连通子图，生成树是极小连通子图。

### 图的性质（选择题会考）

- 无向简单图的边数范围：$0 \le \lvert E\rvert \le \frac{n(n-1)}{2}$；有向简单图的边数范围：$0 \le \lvert E\rvert \le n(n-1)$。
- 无向图中所有顶点的度之和等于$2\lvert E\rvert$，所以度之和一定是偶数，奇度顶点个数一定是偶数。
- 有向图中$\sum ID(v) = \sum OD(v) = \lvert E\rvert$。
- $n$个顶点的连通无向图至少有$n-1$条边；恰好有$n-1$条边的连通无向图是一棵树。
- $n$个顶点的无向图，如果边数小于$n-1$，一定不连通。
- $n$个顶点的无向简单图，如果边数大于$\frac{(n-1)(n-2)}{2}$，一定连通。
- $n$个顶点的强连通有向图至少有$n$条弧（$n > 1$），例如一个包含所有顶点的有向环。
- 路径长度按边数算，不按顶点数算。
- 连通分量是“极大连通子图”，生成树是“极小连通子图”，别记反。
- 完全图、稠密图、稀疏图、网这些概念不要混：完全图看“任意两点之间有没有边”，稠密/稀疏看边数相对多少，网看边上有没有权。

## 图的存储及基本操作

### 邻接矩阵法

用一个$n \times n$的二维数组，即$n$阶矩阵表示顶点数是$n$的图$G = (V, E)$，将图$G$顶点编号为$v_1, v_2, \cdots, v_n$，那么有

$$
A[i][j] =
\begin{cases}
1, & (v_i, v_j)\text{或}\langle v_i, v_j\rangle\text{是}E(G)\text{中的边}\\
0, & (v_i, v_j)\text{或}\langle v_i, v_j\rangle\text{不是}E(G)\text{中的边}
\end{cases}
$$

对于带权图，邻接矩阵就存放对应位置的边的权值，

$$
A[i][j] =
\begin{cases}
w_{ij}, & (v_i, v_j)\text{或}\langle v_i, v_j\rangle\text{是}E(G)\text{中的边}\\
0\text{或}\infty, & (v_i, v_j)\text{或}\langle v_i, v_j\rangle\text{不是}E(G)\text{中的边}
\end{cases}
$$

图的邻接矩阵存储的代码定义如下（我就用$\mathrm{C++}$的类了）：

```cpp
class MGraph
{
public:
	vector<char> vex;
	vector<vector<int>> edges;
	int vexnum, edgenum;

	MGraph(int n)
		: vex(n), edges(n, vector<int>(n, 0)), vexnum(n), edgenum(0)
	{}
};
```

邻接矩阵表示法有以下特点：

- **空间复杂度：**$O(n^2)$，只和顶点数有关，和边数无关。稠密图用它很划算，稀疏图会浪费大量空间。
- **无向图的矩阵是对称矩阵：**$A[i][j] = A[j][i]$，实际存储时可以只存上三角或下三角，但$408$答题一般按完整矩阵算。
- **度：**在简单图中，无向图第$i$行（或第$i$列）非零元素的个数就是顶点$v_i$的度；有向图第$i$行非零元素的个数是出度$OD(v_i)$，第$i$列非零元素的个数是入度$ID(v_i)$。
- **判断边很快：**判断$(v_i, v_j)$或$\langle v_i, v_j \rangle$是否存在，直接看$A[i][j]$，时间复杂度$O(1)$。
- **找邻接点不快：**要找出$v_i$的所有邻接点，必须把第$i$行扫一遍，时间复杂度$O(n)$。
- **表示唯一：**只要顶点编号顺序确定，邻接矩阵就是唯一的；邻接表则会因为边表的插入顺序不同而不唯一。
- **带权图：**矩阵里存权值；不存在的边用$\infty$表示，对角线一般置$0$。如果题目允许权值为$0$，一定要用$\infty$而不是$0$表示“没有边”，否则$0$权边和不存在边就分不清了。

### 邻接表法

邻接表指给$G$中每个顶点$v_i$建立一个单链表，第$i$个单链表中的节点表示依附于顶点$v_i$的边，该链表称为$v_i$的边表，边表的头指针和顶点的数据信息采用顺序存储，称为$v_i$的顶点表。有向图的邻接表只存出边，所以求出度很方便，求入度就得把整个邻接表扫一遍。

顶点表节点由两个域组成：顶点域$\mathrm{data}$存储顶点$v_i$的信息；边表头指针域$\mathrm{firstarc}$指向第一条邻接边的边表节点。

边表节点至少包含两个域：邻接点域$\mathrm{adjvex}$存储与该顶点邻接的另一顶点编号；指针域$\mathrm{nextarc}$指向下一条边的边表节点。

图的邻接表存储结构定义如下：

```cpp
#include <vector>
using namespace std;

class ArcNode                    // 边表结点
{
public:
	int adjvex;                  // 该弧指向的顶点在 vex 数组中的下标
	ArcNode* nextarc;            // 指向下一条弧

	ArcNode(int v = 0)           // 构造函数：adjvex 默认 0，nextarc 置空
		: adjvex(v), nextarc(nullptr)
	{}
};

class VNode                      // 顶点表结点
{
public:
	int data;                    // 顶点信息
	ArcNode* firstarc;           // 指向第一条依附该顶点的弧

	VNode(int d = 0)             // 构造函数：data 默认 0，firstarc 置空
		: data(d), firstarc(nullptr)
	{}
};

class ALGraph
{
public:
	vector<VNode> vex;           // 邻接表（顶点数组）
	int vexnum, arcnum;          // 顶点数和弧数

	ALGraph(int n)               // 构造函数：n 个顶点，0 条弧
		: vex(n),                // 创建 n 个 VNode，firstarc 全为 nullptr
		vexnum(n),
		arcnum(0)
	{}
};
```

邻接表表示法有以下特点：

- **空间复杂度：**$O(n+e)$，其中$n$是顶点数，$e$是边数。稀疏图用邻接表很省空间，稠密图反而不如邻接矩阵直观。
- **无向图存两条：**无向图的一条边$(v_i, v_j)$会在$v_i$和$v_j$的边表里各出现一次，所以无向图邻接表的边节点总数是$2e$。
- **有向图只存出边：**有向图的一条弧$\langle v_i, v_j \rangle$只在$v_i$的边表里出现，所以边节点总数是$e$。求$v_i$的出度就是数它边表的长度；求入度则要把所有边表扫一遍，或者额外建一个逆邻接表。
- **求度：**无向图中顶点$v_i$的度就是它边表的长度；有向图中边表长度是出度$OD(v_i)$。
- **判断边：**要判断$(v_i, v_j)$或$\langle v_i, v_j \rangle$是否存在，得在$v_i$的边表里找$v_j$，时间复杂度$O(TD(v_i))$，最坏$O(e)$。
- **找邻接点：**顺着$v_i$的边表走一遍即可，时间复杂度$O(TD(v_i))$，比邻接矩阵的$O(n)$更适合稀疏图。
- **表示不唯一：**同一个图，边表里节点的插入顺序不同，得到的邻接表就不同。考试画邻接表时，一般按顶点编号从小到大挂边，或者按题目给定顺序挂。
- **带权图：**在边表节点里再加一个权值域即可。邻接矩阵和邻接表都能表示带权图，只是邻接矩阵存的是矩阵元素，邻接表存的是边节点。

> 有向图如果经常要求入度，可以再建一个**逆邻接表**，边表里存的是指向该顶点的弧。十字链表本质上就是把邻接表和逆邻接表合到了一起。

### 十字链表法

十字链表法是**有向图**的一种链式存储结构，每条弧用一个节点表示，称为弧节点，每个顶点也用一个节点表示，称为顶点节点。

弧节点包含五个域：$\mathrm{tailvex}$和$\mathrm{headvex}$域分别存放弧尾顶点和弧头顶点的编号；头链域$\mathrm{hlink}$指向弧头相同的下一条弧；尾链域$\mathrm{tlink}$指向弧尾相同的下一条弧；$\mathrm{info}$域存储弧相关信息，比如权值。

顶点节点包含三个域：$\mathrm{data}$域存放顶点的数据信息，$\mathrm{firstin}$域指向以该顶点为弧头的第一条弧，$\mathrm{firstout}$域指向以该顶点为弧尾的第一条弧。

十字链表中，很容易找到以$v_i$为尾的弧，也很容易找到以$v_i$为头的弧，因此很容易求得顶点的入度和出度。空间复杂度和邻接表一样，都是$O(n+e)$，只是指针多了一些，结构稍微绕一点。

```cpp
class ArcBox                      // 弧节点
{
public:
	int tailvex;                  // 弧尾顶点编号
	int headvex;                  // 弧头顶点编号
	ArcBox* hlink;                // 弧头相同的下一条弧
	ArcBox* tlink;                // 弧尾相同的下一条弧
	int info;                     // 权值等附加信息
};

class VexBox                      // 顶点节点
{
public:
	int data;                     // 顶点信息
	ArcBox* firstin;              // 第一条入弧
	ArcBox* firstout;             // 第一条出弧
};
```

> 十字链表只适合有向图。无向图里一条边没有“弧头”“弧尾”之分，硬套十字链表会把一条边拆成两条弧，反而麻烦；无向图要用下面的邻接多重表。

### 邻接多重表

邻接多重表是**无向图**的一种链式存储结构。邻接表里一条无向边会在两个顶点的边表里各出现一次，删除边、标记边是否访问过时很不方便；邻接多重表让每条边只对应一个边节点，两个顶点共享这个节点。

边节点包含五个域：$\mathrm{ivex}$和$\mathrm{jvex}$存放这条边的两个端点编号；$\mathrm{ilink}$指向下一条依附于$\mathrm{ivex}$的边；$\mathrm{jlink}$指向下一条依附于$\mathrm{jvex}$的边；$\mathrm{info}$存储权值等附加信息。

顶点节点包含两个域：$\mathrm{data}$存放顶点信息，$\mathrm{firstedge}$指向第一条依附于该顶点的边。

```cpp
class EBox                        // 边节点
{
public:
	int ivex, jvex;               // 一条边的两个端点
	EBox* ilink;                  // 下一条依附于 ivex 的边
	EBox* jlink;                  // 下一条依附于 jvex 的边
	int info;                     // 权值等附加信息
};

class VexBox2                     // 顶点节点
{
public:
	int data;                     // 顶点信息
	EBox* firstedge;              // 第一条依附于该顶点的边
};
```

从顶点$v_i$出发遍历它的所有邻边时，先顺着$\mathrm{firstedge}$找到第一条边；如果当前边节点的$\mathrm{ivex} = i$，下一条就走$\mathrm{ilink}$，否则就走$\mathrm{jlink}$。这样每条边只存一次，空间复杂度是$O(n+e)$，特别适合需要频繁删除边、或者给边打访问标记的无向图算法。

> 记法很简单：**有向图用十字链表，无向图用邻接多重表。** 十字链表管入度和出度，邻接多重表管一条无向边只存一份。

### 图的基本操作

图的基本操作看起来零碎，其实就是围绕“边”和“邻接点”做文章。$408$选择题喜欢考某种存储结构下操作的时间复杂度，算法题里则经常直接调用$\mathrm{FirstNeighbor}$和$\mathrm{NextNeighbor}$。

- **$\mathrm{Adjacent}(G, x, y)$：**判断顶点$x$和$y$之间是否存在边，或者判断有向图中是否存在弧$\langle x, y \rangle$。
- **$\mathrm{Neighbors}(G, x)$：**列出顶点$x$的所有邻接点。
- **$\mathrm{InsertVertex}(G, x)$：**在图中插入顶点$x$。
- **$\mathrm{DeleteVertex}(G, x)$：**删除顶点$x$，同时删除所有与$x$相关联的边。
- **$\mathrm{AddEdge}(G, x, y)$：**在$x$和$y$之间添加一条边；有向图则添加弧$\langle x, y \rangle$。
- **$\mathrm{RemoveEdge}(G, x, y)$：**删除$x$和$y$之间的边。
- **$\mathrm{FirstNeighbor}(G, x)$：**返回$x$的第一个邻接点；如果$x$没有邻接点，返回$-1$。
- **$\mathrm{NextNeighbor}(G, x, y)$：**已知$y$是$x$的邻接点，返回$x$在$y$之后的下一个邻接点；如果没有，返回$-1$。
- **$\mathrm{GetEdgeValue}(G, x, y)$、$\mathrm{SetEdgeValue}(G, x, y, v)$：**读取或修改边$(x, y)$上的权值。

同样是这些操作，邻接矩阵和邻接表的代价并不一样：

- **邻接矩阵：**判断边$\mathrm{Adjacent}$是$O(1)$；找所有邻接点$\mathrm{Neighbors}$要扫一行，是$O(n)$；$\mathrm{FirstNeighbor}$和$\mathrm{NextNeighbor}$也要扫一行，最坏$O(n)$；插入或删除顶点要搬动整个矩阵，是$O(n^2)$；加边、删边、读写权值都是$O(1)$。
- **邻接表：**判断边$\mathrm{Adjacent}$要在$x$的边表里找$y$，最坏$O(e)$；找所有邻接点$\mathrm{Neighbors}$是$O(TD(x))$；$\mathrm{FirstNeighbor}$是$O(1)$，$\mathrm{NextNeighbor}$最坏$O(TD(x))$；插入顶点是$O(1)$；删除顶点要把所有与它相关的边都删掉，是$O(n+e)$；加边用头插法是$O(1)$，删边是$O(TD(x))$。
- **怎么选：**稠密图、经常判断两点之间有没有边、要跑$\mathrm{Floyd}$，用邻接矩阵；稀疏图、经常遍历邻接点、要跑$\mathrm{BFS}$或$\mathrm{DFS}$，用邻接表；有向图既要频繁求入度又要频繁求出度，用十字链表；无向图经常删边或者给边打标记，用邻接多重表。

> 考试里如果题目没有特别说明，写算法时用邻接表更常见，因为图算法大多数是$O(n+e)$的；但如果题目给了邻接矩阵，就老老实实按矩阵写，别自己换存储结构。

## 图的遍历

图的遍历从某个顶点出发，沿着边访问所有可达顶点，并且每个顶点只访问一次。图可能不连通，所以一次遍历只能走完一个连通分量（有向图里是从起点可达的那一部分）；外层要扫描所有顶点，遇到没访问过的就再起一次遍历。

为了避免重复访问，必须设一个$\mathrm{visited}$数组。这个数组既可以在遍历前统一初始化，也可以在函数里按顶点数动态开。

### 广度优先搜索

广度优先搜索（$\mathrm{BFS}$）的思想和树的层次遍历一模一样：先访问起点，然后把它的所有邻接点依次访问一遍，再访问这些邻接点的邻接点，像水波一样一层一层往外扩。

算法步骤：

1. 把起点标记为已访问，并入队。
2. 队列非空时，取出队头顶点$u$，访问$u$。
3. 依次检查$u$的所有邻接点$v$，如果$v$没被访问过，就标记$v$已访问，并把$v$入队。
4. 重复第$2$、$3$步，直到队列为空。

```cpp
#include <queue>
#include <vector>
using namespace std;

void BFS(const vector<vector<int>>& adj, int start, vector<bool>& visited)
{
	queue<int> q;
	visited[start] = true;
	q.push(start);

	while (!q.empty())
	{
		int u = q.front();
		q.pop();

		// 在这里访问 u，具体操作按题目要求来
		for (int v : adj[u])
		{
			if (!visited[v])
			{
				visited[v] = true;      // 入队时就标记，避免同一个点重复入队
				q.push(v);
			}
		}
	}
}

void BFSTraverse(const vector<vector<int>>& adj)
{
	int n = adj.size();
	vector<bool> visited(n, false);

	for (int i = 0; i < n; i++)
	{
		if (!visited[i])
			BFS(adj, i, visited);
	}
}
```

- **为什么入队时就标记：**如果等出队才标记，同一个顶点可能被多个邻接点重复入队，队列里会出现一堆重复元素，虽然最后还能跑对，但白白浪费时间和空间。入队就标记，保证每个顶点最多进一次队列。
- **复杂度：**邻接表存储时，每个顶点进队一次，每条边被检查两次（无向图）或一次（有向图），时间复杂度$O(n+e)$；邻接矩阵存储时，每个顶点都要扫一整行，时间复杂度$O(n^2)$。空间复杂度都是$O(n)$，主要花在队列和$\mathrm{visited}$数组上。
- **遍历序列不唯一：**同一个图，邻接表中边节点的顺序不同，$\mathrm{BFS}$序列就可能不同；邻接矩阵按顶点编号从小到大扫，序列相对固定。考试如果问“可能的$\mathrm{BFS}$序列”，要按题目给的存储结构来推。
- **$\mathrm{BFS}$生成树：**从某个顶点出发做$\mathrm{BFS}$，把每个顶点第一次被访问时经过的边留下来，就得到一棵$\mathrm{BFS}$生成树。非连通图得到的是$\mathrm{BFS}$生成森林。$\mathrm{BFS}$生成树的高度最小，也就是从起点到其他顶点的边数最少。

$\mathrm{BFS}$还有一个很实用的性质：**在无权图里，它求出来的就是最短路径**。因为$\mathrm{BFS}$是按层扩展的，第一次到达某个顶点时经过的边数一定最少。把$\mathrm{visited}$换成一个记录距离的数组即可：

```cpp
#include <queue>
#include <vector>
using namespace std;

vector<int> BFSDistance(const vector<vector<int>>& adj, int start)
{
	int n = adj.size();
	vector<int> dist(n, -1);        // -1 表示还没访问到
	queue<int> q;

	dist[start] = 0;
	q.push(start);

	while (!q.empty())
	{
		int u = q.front();
		q.pop();

		for (int v : adj[u])
		{
			if (dist[v] == -1)
			{
				dist[v] = dist[u] + 1;
				q.push(v);
			}
		}
	}

	return dist;
}
```

> 注意：$\mathrm{BFS}$只能处理**无权图**或者**边权全相同**的图。边权不一样时，层数少不代表总权值小，这时候得上$\mathrm{Dijkstra}$。

### 深度优先搜索

深度优先搜索（$\mathrm{DFS}$）像走迷宫：从起点出发，能往深处走就一直往深处走，走到头再退回来找别的岔路。递归写法最自然，也最符合$408$答题习惯。

```cpp
#include <vector>
using namespace std;

void DFS(const vector<vector<int>>& adj, int u, vector<bool>& visited)
{
	visited[u] = true;

	// 在这里访问 u，具体操作按题目要求来
	for (int v : adj[u])
	{
		if (!visited[v])
			DFS(adj, v, visited);
	}
}

void DFSTraverse(const vector<vector<int>>& adj)
{
	int n = adj.size();
	vector<bool> visited(n, false);

	for (int i = 0; i < n; i++)
	{
		if (!visited[i])
			DFS(adj, i, visited);
	}
}
```

如果不想用递归，也可以用栈模拟。递归的本质就是系统帮你维护了一个函数调用栈，自己开一个$\mathrm{stack}$效果一样：

```cpp
#include <stack>
#include <vector>
using namespace std;

void DFS_NonRecursive(const vector<vector<int>>& adj, int start, vector<bool>& visited)
{
	stack<int> st;
	st.push(start);

	while (!st.empty())
	{
		int u = st.top();
		st.pop();

		if (visited[u])
			continue;

		visited[u] = true;

		// 在这里访问 u
		for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it)
		{
			if (!visited[*it])
				st.push(*it);
		}
	}
}
```

非递归写法里，邻接点要**倒着压栈**，这样出栈顺序才和递归从小到大访问的顺序一致。这个细节选择题不一定考，但自己写代码时很容易在这里翻车。

- **复杂度：**邻接表存储时，每个顶点访问一次，每条边检查一次或两次，时间复杂度$O(n+e)$；邻接矩阵存储时，每个顶点都要扫一整行，时间复杂度$O(n^2)$。空间复杂度是$O(n)$，递归写法还要算上递归工作栈的深度，最坏$O(n)$。
- **$\mathrm{DFS}$生成树：**把每个顶点第一次被访问时经过的边留下来，就得到$\mathrm{DFS}$生成树；非连通图得到$\mathrm{DFS}$生成森林。
- **$\mathrm{DFS}$序列不唯一：**和$\mathrm{BFS}$一样，邻接表中边节点的顺序不同，$\mathrm{DFS}$序列就可能不同。
- **$\mathrm{DFS}$不能求最短路：**它只保证能走遍，不保证第一次到达某个顶点时走的是最短路径。求无权图最短路还是得用$\mathrm{BFS}$。

$\mathrm{BFS}$和$\mathrm{DFS}$的对比可以记成一句话：**$\mathrm{BFS}$用队列一层层扫，$\mathrm{DFS}$用栈或递归一条路走到黑。** 两者在邻接表上的时间复杂度都是$O(n+e)$，在邻接矩阵上都是$O(n^2)$，区别主要在访问顺序和适用场景。

### 遍历的应用

图的遍历不只是“把点走一遍”，很多图论问题都能套$\mathrm{BFS}$或$\mathrm{DFS}$的框架。

#### 求连通分量个数

无向图中，每调用一次$\mathrm{DFS}$或$\mathrm{BFS}$，就会走完一个连通分量。外层循环每发现一个没访问过的顶点，计数器加$1$，就得到了连通分量个数。

```cpp
#include <vector>
using namespace std;

void DFS(const vector<vector<int>>& adj, int u, vector<bool>& visited)
{
	visited[u] = true;
	for (int v : adj[u])
	{
		if (!visited[v])
			DFS(adj, v, visited);
	}
}

int CountComponents(const vector<vector<int>>& adj)
{
	int n = adj.size();
	int count = 0;
	vector<bool> visited(n, false);

	for (int i = 0; i < n; i++)
	{
		if (!visited[i])
		{
			DFS(adj, i, visited);
			count++;
		}
	}

	return count;
}
```

时间复杂度$O(n+e)$（邻接表）或$O(n^2)$（邻接矩阵），空间复杂度$O(n)$。

#### 判断无向图是否连通

连通分量个数等于$1$，图就是连通的；大于$1$，图就不连通。所以直接调用上面的$\mathrm{CountComponents}$，判断返回值是不是$1$即可。

#### 判断有向图是否强连通

有向图不能只从某个顶点走一遍就下结论。常用做法是：

1. 从任意顶点$v$出发，在原图上做一次$\mathrm{DFS}$或$\mathrm{BFS}$，如果还有顶点没访问到，说明$v$到不了它们，图不强连通。
2. 再把所有边反向，建一个反图，从同一个$v$出发再做一次遍历。如果还有顶点没访问到，说明那些顶点到不了$v$，图也不强连通。
3. 两次都能访问所有顶点，图才是强连通的。

这个做法的依据是：原图能到达所有顶点，说明$v$能到所有点；反图能到达所有顶点，说明所有点都能到$v$。两边一合，任意两点之间都能互相到达。

#### 判断无向图是否有环

在$\mathrm{DFS}$过程中，如果当前顶点$u$的邻接点$v$已经被访问过，而且$v$不是$u$的父节点，就说明找到了一条回到祖先的边，图中存在环。注意无向图里每条边会正反各走一次，所以必须排除“走回父节点”这种情况，否则会把正常的树边误判成环。

> 图的遍历是后面所有图算法的地基。最小生成树、最短路径、拓扑排序、关键路径，本质上都离不开“怎么系统地访问所有顶点和边”。这一节要是没捋顺，后面的算法只会越看越像天书。

## 图的应用

图的应用这一块，$408$主要考四个东西：最小生成树、最短路径、拓扑排序和关键路径。前两个是“选边”，后两个是“排顺序”。算法名字不少，但核心思想都不复杂，关键是别把$\mathrm{Prim}$和$\mathrm{Dijkstra}$、$\mathrm{AOV}$和$\mathrm{AOE}$这几对兄弟搞混。

### 最小生成树

最小生成树（$\mathrm{MST}$）是带权连通无向图的一个生成树，要求树上所有边的权值之和最小。$n$个顶点的生成树一定恰好有$n-1$条边，而且不能有回路。

- **不一定唯一：**同一个图可能有多棵最小生成树，但它们的总权值一定相同。如果所有边的权值互不相同，最小生成树就是唯一的。
- **不是最短路径树：**最小生成树保证的是“所有边权之和最小”，不是“从某个点到其他点的距离最短”。这两件事经常被混为一谈。
- **非连通图：**没有生成树，只能对每个连通分量各求一棵最小生成树，合起来叫最小生成森林。

求最小生成树常用两种贪心算法：$\mathrm{Prim}$和$\mathrm{Kruskal}$。一个从顶点出发“加点”，一个从边出发“加边”。

#### $\mathrm{Prim}$算法

$\mathrm{Prim}$算法又叫“加点法”。从任意一个顶点开始，每次选择一条连接“当前生成树”和“树外顶点”的权值最小的边，把对应的树外顶点加进来，直到所有顶点都加入。

算法步骤：

1. 任选一个起点加入生成树。
2. 维护一个$\mathrm{lowcost}$数组，表示每个树外顶点到当前生成树的最短边权。
3. 每次从树外顶点中选出$\mathrm{lowcost}$最小的那个，加入生成树，并把这条边计入总权值。
4. 用新加入的顶点去更新其他树外顶点的$\mathrm{lowcost}$。
5. 重复第$3$、$4$步，直到所有顶点都加入，或者发现剩下的顶点都不可达。

下面的代码假设邻接矩阵中不存在的边用$\mathrm{INF}$表示，对角线为$0$；如果图不连通，函数返回$\mathrm{INF}$。

```cpp
#include <vector>
using namespace std;

int Prim(const vector<vector<int>>& g)
{
	int n = g.size();
	if (n == 0)
		return 0;

	const int INF = 0x3f3f3f3f;
	vector<int> lowcost(n, INF);      // 每个顶点到当前生成树的最小边权
	vector<bool> used(n, false);      // 是否已经加入生成树
	int ans = 0;

	lowcost[0] = 0;                   // 从顶点 0 开始

	for (int i = 0; i < n; i++)
	{
		int u = -1;
		for (int v = 0; v < n; v++)
		{
			if (!used[v] && (u == -1 || lowcost[v] < lowcost[u]))
				u = v;
		}

		if (u == -1 || lowcost[u] == INF)
			return INF;               // 图不连通，没有生成树

		used[u] = true;
		ans += lowcost[u];

		for (int v = 0; v < n; v++)
		{
			if (!used[v] && g[u][v] < lowcost[v])
				lowcost[v] = g[u][v];
		}
	}

	return ans;
}
```

- **复杂度：**邻接矩阵实现是$O(n^2)$，适合稠密图。用邻接表加优先队列可以优化到$O(e \log n)$，但$408$手写题一般用邻接矩阵的$O(n^2)$版本。
- **$\mathrm{lowcost}$的含义：**它是“顶点到当前生成树”的最短距离，不是“顶点到起点”的距离。这一点和$\mathrm{Dijkstra}$的$\mathrm{dist}$很像，但含义不同，千万别混。
- **适用场景：**边多、顶点少的稠密图，用$\mathrm{Prim}$更舒服。

#### $\mathrm{Kruskal}$算法

$\mathrm{Kruskal}$算法又叫“加边法”。把所有边按权值从小到大排序，依次考察每条边：如果这条边的两个端点还不属于同一个连通块，就把它加入生成树；如果已经属于同一个连通块，加入就会成环，直接跳过。选够$n-1$条边就结束。

判断两个端点是否在同一个连通块，用并查集最方便。并查集的“查”负责找根，“并”负责合并两个集合。

```cpp
#include <algorithm>
#include <vector>
using namespace std;

struct Edge
{
	int u, v, w;
};

class DSU
{
public:
	vector<int> parent, rnk;

	DSU(int n) : parent(n), rnk(n, 0)
	{
		for (int i = 0; i < n; i++)
			parent[i] = i;
	}

	int find(int x)
	{
		if (parent[x] != x)
			parent[x] = find(parent[x]);   // 路径压缩
		return parent[x];
	}

	bool unite(int a, int b)
	{
		int ra = find(a);
		int rb = find(b);

		if (ra == rb)
			return false;                  // 已经在同一个集合，加入会成环

		if (rnk[ra] < rnk[rb])
			swap(ra, rb);

		parent[rb] = ra;
		if (rnk[ra] == rnk[rb])
			rnk[ra]++;

		return true;
	}
};

int Kruskal(int n, vector<Edge>& edges)
{
	if (n <= 1)
		return 0;

	const int INF = 0x3f3f3f3f;

	sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b)
	{
		return a.w < b.w;
	});

	DSU dsu(n);
	int ans = 0;
	int count = 0;

	for (const Edge& edge : edges)
	{
		if (dsu.unite(edge.u, edge.v))
		{
			ans += edge.w;
			count++;

			if (count == n - 1)
				break;
		}
	}

	return count == n - 1 ? ans : INF;    // 选不够 n-1 条边，说明图不连通
}
```

- **复杂度：**排序是$O(e \log e)$，并查集的操作近似$O(1)$，总复杂度$O(e \log e)$，适合稀疏图。
- **为什么不会成环：**并查集只合并两个不同集合的顶点。如果两个端点已经在同一个集合里，说明它们之间已经有一条路径，再加这条边就会形成回路。
- **和$\mathrm{Prim}$怎么选：**稠密图用$\mathrm{Prim}$，稀疏图用$\mathrm{Kruskal}$。考试里如果给了邻接矩阵，一般写$\mathrm{Prim}$；如果给的是边集，一般写$\mathrm{Kruskal}$。

> $\mathrm{Prim}$和$\mathrm{Kruskal}$都是贪心算法，但贪心策略不同：$\mathrm{Prim}$每次选“离树最近的顶点”，$\mathrm{Kruskal}$每次选“当前最小的边”。两种算法都能得到最小生成树，但中间过程不一定一样。

### 最短路径

最短路径问题分两类：一类是**单源最短路径**，求从一个起点到其他所有顶点的最短路径，代表算法是$\mathrm{Dijkstra}$；另一类是**多源最短路径**，求任意两个顶点之间的最短路径，代表算法是$\mathrm{Floyd}$。如果图是无权的，直接用$\mathrm{BFS}$就行，前面已经讲过了。

#### $\mathrm{Dijkstra}$算法

$\mathrm{Dijkstra}$算法解决的是**非负权图**的单源最短路径。它的贪心思想和$\mathrm{Prim}$有点像：维护一个$\mathrm{dist}$数组，表示起点到每个顶点的当前最短距离；每次从未确定的顶点中选出$\mathrm{dist}$最小的那个，把它确定下来，再用它去松弛其他顶点。

算法步骤：

1. 起点$s$的$\mathrm{dist}[s] = 0$，其余顶点的$\mathrm{dist}$初始化为$\infty$。
2. 每次从未确定的顶点中选出$\mathrm{dist}$最小的顶点$u$，标记$u$已确定。
3. 遍历$u$的所有邻接点$v$，如果$\mathrm{dist}[u] + w(u, v) < \mathrm{dist}[v]$，就更新$\mathrm{dist}[v]$。
4. 重复第$2$、$3$步，直到所有顶点都确定，或者剩下的顶点都不可达。

下面的代码同样假设邻接矩阵中不存在的边用$\mathrm{INF}$表示，对角线为$0$。

```cpp
#include <vector>
using namespace std;

vector<int> Dijkstra(const vector<vector<int>>& g, int start)
{
	int n = g.size();
	const int INF = 0x3f3f3f3f;

	vector<int> dist(n, INF);         // 起点到各顶点的最短距离
	vector<bool> used(n, false);      // 是否已经确定最短路

	dist[start] = 0;

	for (int i = 0; i < n; i++)
	{
		int u = -1;
		for (int v = 0; v < n; v++)
		{
			if (!used[v] && (u == -1 || dist[v] < dist[u]))
				u = v;
		}

		if (u == -1 || dist[u] == INF)
			break;                    // 剩下的顶点都不可达

		used[u] = true;

		for (int v = 0; v < n; v++)
		{
			if (!used[v] && g[u][v] < INF && dist[u] + g[u][v] < dist[v])
				dist[v] = dist[u] + g[u][v];
		}
	}

	return dist;
}
```

- **复杂度：**邻接矩阵实现是$O(n^2)$；用邻接表加优先队列可以优化到$O((n+e) \log n)$。
- **不能处理负权边：**$\mathrm{Dijkstra}$的正确性建立在“当前$\mathrm{dist}$最小的顶点已经不可能再被更短的路径更新”这个前提上。如果存在负权边，后面可能出现一条更短的路径，把这个前提推翻。所以负权图不能用$\mathrm{Dijkstra}$，$408$里一般也不会让你用。
- **和$\mathrm{Prim}$的区别：**$\mathrm{Prim}$的$\mathrm{lowcost}$是“顶点到生成树”的距离，$\mathrm{Dijkstra}$的$\mathrm{dist}$是“起点到顶点”的距离。两个算法代码长得像，但更新对象和最终目的完全不同。
- **记录路径：**如果题目要求输出具体路径，再加一个$\mathrm{prev}$数组，松弛成功时令$\mathrm{prev}[v] = u$，最后从终点沿着$\mathrm{prev}$往回倒推即可。

#### $\mathrm{Floyd}$算法

$\mathrm{Floyd}$算法求的是**任意两点之间**的最短路径，也叫多源最短路径。它的核心是动态规划：先允许经过顶点$0$中转，再允许经过顶点$1$中转，依次类推，最后允许经过所有顶点中转。

设$\mathrm{dist}[i][j]$表示从$i$到$j$、且中间只允许经过前$k$个顶点时的最短距离，则转移方程为：

$$
\mathrm{dist}[i][j] = \min(\mathrm{dist}[i][j], \mathrm{dist}[i][k] + \mathrm{dist}[k][j])
$$

代码只有三重循环，但**$k$必须放在最外层**：

```cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<vector<int>> Floyd(vector<vector<int>> dist)
{
	int n = dist.size();
	const int INF = 0x3f3f3f3f;

	for (int k = 0; k < n; k++)
	{
		for (int i = 0; i < n; i++)
		{
			for (int j = 0; j < n; j++)
			{
				if (dist[i][k] < INF && dist[k][j] < INF)
					dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
			}
		}
	}

	return dist;
}
```

- **初始化：**对角线$\mathrm{dist}[i][i] = 0$；如果$i$到$j$有边，$\mathrm{dist}[i][j]$就是边权；没有边就是$\infty$。
- **复杂度：**时间$O(n^3)$，空间$O(n^2)$。$n$比较小的时候用起来很舒服，$n$大了就老老实实换算法。
- **$k$为什么必须在最外层：**第$k$轮表示“允许经过顶点$k$中转”。如果把$k$放到内层，相当于每对$(i, j)$只尝试一个中转点，动态规划的状态就乱了，结果会错。
- **负权边：**$\mathrm{Floyd}$可以处理负权边，但不能有负权回路。如果跑完以后发现某个$\mathrm{dist}[i][i] < 0$，说明存在负权回路，最短路径没有意义。
- **记录路径：**可以再开一个$\mathrm{path}[i][j]$数组，记录$i$到$j$的中转点；更新成功时令$\mathrm{path}[i][j] = k$，最后递归还原路径。

> 最短路径这一块的记忆口诀：**无权$\mathrm{BFS}$，非负$\mathrm{Dijkstra}$，多源$\mathrm{Floyd}$。** 遇到负权边，$408$一般不会让你硬上$\mathrm{Dijkstra}$，先看清楚题目条件。

### 拓扑排序

拓扑排序针对的是**有向无环图**（$\mathrm{DAG}$）。在有向图中，如果顶点表示活动、弧表示活动之间的先后关系，这样的图叫$\mathrm{AOV}$网。拓扑排序要把所有顶点排成一个线性序列，使得图中任意一条弧$\langle u, v \rangle$都满足$u$排在$v$前面。

$\mathrm{Kahn}$算法的思路很直观：每次找入度为$0$的顶点，把它输出，然后删掉它和它的所有出边；删完之后如果又出现了入度为$0$的顶点，就继续输出。如果最后输出的顶点数小于总顶点数，说明图里有环，拓扑排序不存在。

```cpp
#include <queue>
#include <vector>
using namespace std;

bool TopologicalSort(const vector<vector<int>>& adj, vector<int>& order)
{
	int n = adj.size();
	vector<int> indeg(n, 0);

	for (int u = 0; u < n; u++)
	{
		for (int v : adj[u])
			indeg[v]++;
	}

	queue<int> q;
	for (int i = 0; i < n; i++)
	{
		if (indeg[i] == 0)
			q.push(i);
	}

	order.clear();

	while (!q.empty())
	{
		int u = q.front();
		q.pop();
		order.push_back(u);

		for (int v : adj[u])
		{
			if (--indeg[v] == 0)
				q.push(v);
		}
	}

	return (int)order.size() == n;
}
```

- **复杂度：**每个顶点进队一次，每条边被处理一次，时间复杂度$O(n+e)$，空间复杂度$O(n)$。
- **拓扑序列不唯一：**如果某一时刻有多个入度为$0$的顶点，先输出哪个都可以，所以拓扑序列可能有很多个。考试如果问“是否存在”，只要判断最后输出个数是不是$n$；如果问“写出一个”，按题目给的顺序选就行。
- **判断有环：**如果函数返回$\mathrm{false}$，说明有顶点始终没能变成入度$0$，它们互相卡住了，图中存在环。
- **$\mathrm{DFS}$做法：**也可以用$\mathrm{DFS}$求拓扑排序，把顶点按“完成时间”从晚到早排列，或者把完成序列反过来。$\mathrm{Kahn}$算法更好写，也不容易递归爆栈，推荐优先用$\mathrm{Kahn}$。
- **$\mathrm{AOV}$和$\mathrm{AOE}$：**$\mathrm{AOV}$网的顶点表示活动，弧表示先后关系；$\mathrm{AOE}$网的边表示活动，顶点表示事件。拓扑排序是$\mathrm{AOV}$的活，关键路径是$\mathrm{AOE}$的活，别搞混。

### 关键路径

$\mathrm{AOE}$网是一个带权有向无环图：顶点表示事件，有向边表示活动，边上的权表示活动持续时间。$\mathrm{AOE}$网一般只有一个入度为$0$的源点（开始事件）和一个出度为$0$的汇点（结束事件）。

关键路径是**从源点到汇点的最长路径**，它决定了整个工程的最短完成时间。注意这里“最长”和“最短”不矛盾：路径越长，说明这条路上的活动拖得越久，工程最早完工时间就被它卡得越死。

关键路径算法要算四个量：

**事件最早发生时间$\mathrm{ve}(v)$：**从源点走到$v$的最长路径长度。按拓扑顺序正推：

$$
\mathrm{ve}(v) = \max_{(u, v) \in E}\lbrace \mathrm{ve}(u) + w(u, v) \rbrace
$$

源点的$\mathrm{ve}$为$0$。汇点的$\mathrm{ve}$就是整个工程的工期，也就是关键路径的长度。

**事件最迟发生时间$\mathrm{vl}(v)$：**在不推迟整个工程的前提下，$v$最晚可以什么时候发生。按逆拓扑顺序反推：

$$
\mathrm{vl}(u) = \min_{(u, v) \in E}\lbrace \mathrm{vl}(v) - w(u, v) \rbrace
$$

汇点的$\mathrm{vl}$等于它的$\mathrm{ve}$。

**活动最早开始时间$e(i)$：**活动$i$对应的弧$\langle u, v \rangle$，最早开始时间就是$u$的最早发生时间：

$$
e(i) = \mathrm{ve}(u)
$$

**活动最迟开始时间$l(i)$：**活动$i$最晚必须什么时候开始，才能不推迟汇点：

$$
l(i) = \mathrm{vl}(v) - w(u, v)
$$

如果某个活动的$e(i) = l(i)$，说明这个活动一点时间都拖不得，它是**关键活动**。所有关键活动连起来就是关键路径。关键路径可能不止一条，但长度一定相同。

```cpp
#include <queue>
#include <vector>
using namespace std;

struct Edge
{
	int to;
	int w;
};

bool CriticalPath(const vector<vector<Edge>>& g, vector<int>& ve, vector<int>& vl)
{
	int n = g.size();
	if (n == 0)
		return true;

	vector<int> indeg(n, 0);
	for (int u = 0; u < n; u++)
	{
		for (const Edge& edge : g[u])
			indeg[edge.to]++;
	}

	queue<int> q;
	for (int i = 0; i < n; i++)
	{
		if (indeg[i] == 0)
			q.push(i);
	}

	vector<int> topo;
	ve.assign(n, 0);

	while (!q.empty())
	{
		int u = q.front();
		q.pop();
		topo.push_back(u);

		for (const Edge& edge : g[u])
		{
			if (ve[u] + edge.w > ve[edge.to])
				ve[edge.to] = ve[u] + edge.w;

			if (--indeg[edge.to] == 0)
				q.push(edge.to);
		}
	}

	if ((int)topo.size() != n)
		return false;                  // 有环，不是 AOE 网

	int sink = topo.back();
	vl.assign(n, ve[sink]);

	for (int i = n - 1; i >= 0; i--)
	{
		int u = topo[i];

		for (const Edge& edge : g[u])
		{
			if (vl[edge.to] - edge.w < vl[u])
				vl[u] = vl[edge.to] - edge.w;
		}
	}

	return true;
}
```

求出$\mathrm{ve}$和$\mathrm{vl}$之后，再扫一遍所有边，就能找出关键活动：

```cpp
for (int u = 0; u < n; u++)
{
	for (const Edge& edge : g[u])
	{
		int earliest = ve[u];                    // 活动最早开始时间
		int latest = vl[edge.to] - edge.w;       // 活动最迟开始时间

		if (earliest == latest)
		{
			// 这条边 u -> edge.to 就是关键活动
		}
	}
}
```

- **复杂度：**拓扑排序$O(n+e)$，正推和反推各扫一遍边，总复杂度$O(n+e)$。
- **源点和汇点：**标准$\mathrm{AOE}$网只有一个源点和一个汇点。如果题目给的图有多个源点或多个汇点，可以加一个虚拟源点、一个虚拟汇点，用权值为$0$的边连起来，再套上面的算法。
- **关键路径不唯一：**一个$\mathrm{AOE}$网可能有多条关键路径。只缩短某一条关键路径上的活动，不一定能缩短整个工期；只有把所有关键路径都缩短，工期才会变。
- **关键活动会变：**缩短某些活动之后，原来的非关键活动可能变成关键活动，原来的关键路径也可能改变。所以每调整一次，都要重新算一遍。

> 图的应用到这里就差不多了。最小生成树管“修路省钱”，最短路径管“导航最快”，拓扑排序管“先修课程”，关键路径管“工期别拖”。四个场景，四套算法，名字可以混，思想不能混。

## 图的算法题

终于来到图的练习题环节了。图的算法题比树更容易出综合题，因为既要会遍历，又要会套$\mathrm{BFS}$、$\mathrm{DFS}$、拓扑排序这些框架。下面几道题都不算偏，重点是把“存储结构—遍历—具体操作”这条线走通。

### 相关题目

**$1$、已知一个无向图采用邻接矩阵存储，矩阵中$1$表示有边，$0$表示无边。设计算法把它转换成邻接表。**

这道题就是照着矩阵扫一遍：对每个顶点$i$，把第$i$行中所有值为$1$的列$j$挂到$i$的边表里。无向图的矩阵是对称的，所以$i$和$j$会各自挂一次，正好得到无向图的邻接表。

```cpp
#include <vector>
using namespace std;

vector<vector<int>> MatrixToList(const vector<vector<int>>& matrix)
{
	int n = matrix.size();
	vector<vector<int>> adj(n);

	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < n; j++)
		{
			if (i != j && matrix[i][j] == 1)
				adj[i].push_back(j);
		}
	}

	return adj;
}
```

时间复杂度$O(n^2)$，空间复杂度$O(n+e)$。如果是有向图，矩阵不一定对称，但这段代码照样能用，因为第$i$行存的就是$i$的出边。

**$2$、设计算法求无向图的连通分量个数。**

每做一次$\mathrm{DFS}$或$\mathrm{BFS}$，就会走完一个连通分量。外层循环扫描所有顶点，遇到没访问过的就启动一次遍历，计数器加$1$。

```cpp
#include <vector>
using namespace std;

void DFS(const vector<vector<int>>& adj, int u, vector<bool>& visited)
{
	visited[u] = true;

	for (int v : adj[u])
	{
		if (!visited[v])
			DFS(adj, v, visited);
	}
}

int CountComponents(const vector<vector<int>>& adj)
{
	int n = adj.size();
	int count = 0;
	vector<bool> visited(n, false);

	for (int i = 0; i < n; i++)
	{
		if (!visited[i])
		{
			DFS(adj, i, visited);
			count++;
		}
	}

	return count;
}
```

时间复杂度$O(n+e)$（邻接表）或$O(n^2)$（邻接矩阵），空间复杂度$O(n)$。如果题目还要求输出每个连通分量的顶点，把$\mathrm{DFS}$里的访问操作改成往一个临时数组里存顶点即可。

**$3$、设计算法判断一个有向图是否存在环。**

有向图判环最省事的办法就是拓扑排序：如果能排出包含所有顶点的拓扑序列，说明图是$\mathrm{DAG}$，没有环；如果排到一半卡住了，说明剩下的顶点互相依赖，存在环。

```cpp
#include <queue>
#include <vector>
using namespace std;

bool HasCycle(const vector<vector<int>>& adj)
{
	int n = adj.size();
	vector<int> indeg(n, 0);

	for (int u = 0; u < n; u++)
	{
		for (int v : adj[u])
			indeg[v]++;
	}

	queue<int> q;
	for (int i = 0; i < n; i++)
	{
		if (indeg[i] == 0)
			q.push(i);
	}

	int count = 0;

	while (!q.empty())
	{
		int u = q.front();
		q.pop();
		count++;

		for (int v : adj[u])
		{
			if (--indeg[v] == 0)
				q.push(v);
		}
	}

	return count != n;
}
```

时间复杂度$O(n+e)$，空间复杂度$O(n)$。也可以用$\mathrm{DFS}$的三色标记法：白色表示没访问，灰色表示正在当前递归栈里，黑色表示已经访问完；如果$\mathrm{DFS}$过程中碰到灰色顶点，就说明有环。两种方法都可以，拓扑排序写起来更直接。

**$4$、设计算法求无权无向图中顶点$s$到顶点$t$的最短路径长度。如果$s$到$t$不可达，返回$-1$。**

无权图的最短路径就是边数最少的路径，直接用$\mathrm{BFS}$。$\mathrm{dist}$数组记录起点到每个顶点的边数，第一次访问到$t$时，$\mathrm{dist}[t]$就是答案。

```cpp
#include <queue>
#include <vector>
using namespace std;

int ShortestPathLength(const vector<vector<int>>& adj, int s, int t)
{
	int n = adj.size();
	vector<int> dist(n, -1);
	queue<int> q;

	dist[s] = 0;
	q.push(s);

	while (!q.empty())
	{
		int u = q.front();
		q.pop();

		if (u == t)
			return dist[u];

		for (int v : adj[u])
		{
			if (dist[v] == -1)
			{
				dist[v] = dist[u] + 1;
				q.push(v);
			}
		}
	}

	return -1;
}
```

时间复杂度$O(n+e)$，空间复杂度$O(n)$。这里在出队时判断$u == t$，第一次出队的$t$一定是最短的；如果写成入队时判断，也能提前返回，结果一样。注意这个算法只适用于无权图或边权全相同的图。

**$5$、设计算法判断一个无向图是否为二分图。**

二分图是指可以把顶点分成两个集合，使得每条边的两个端点分别属于不同集合。用$\mathrm{BFS}$给顶点染色：起点染$0$，它的邻接点染$1$，再往下的邻接点染回$0$。如果某条边的两个端点颜色相同，说明冲突，不是二分图。

```cpp
#include <queue>
#include <vector>
using namespace std;

bool IsBipartite(const vector<vector<int>>& adj)
{
	int n = adj.size();
	vector<int> color(n, -1);        // -1 表示未染色，0 和 1 是两种颜色
	queue<int> q;

	for (int s = 0; s < n; s++)
	{
		if (color[s] != -1)
			continue;

		color[s] = 0;
		q.push(s);

		while (!q.empty())
		{
			int u = q.front();
			q.pop();

			for (int v : adj[u])
			{
				if (color[v] == -1)
				{
					color[v] = color[u] ^ 1;   // 染成相反颜色
					q.push(v);
				}
				else if (color[v] == color[u])
				{
					return false;              // 相邻顶点同色，冲突
				}
			}
		}
	}

	return true;
}
```

时间复杂度$O(n+e)$，空间复杂度$O(n)$。这个算法同样适用于非连通图，外层循环保证每个连通分量都会被染色。二分图在$408$里不算高频，但它的染色思想和$\mathrm{BFS}$完全一致，拿来练手很合适。

**$6$、设计算法输出无向图中从顶点$u$到顶点$v$的所有简单路径。**

简单路径要求顶点不重复，所以用$\mathrm{DFS}$加回溯：先把当前顶点加入路径并标记，如果当前顶点就是终点，就输出这条路径；否则继续递归它的未访问邻接点。递归返回时，把当前顶点从路径里弹出，并取消标记，让它可以出现在别的路径里。

```cpp
#include <vector>
using namespace std;

void FindAllPaths(const vector<vector<int>>& adj, int u, int target,
	vector<bool>& visited, vector<int>& path)
{
	visited[u] = true;
	path.push_back(u);

	if (u == target)
	{
		// 在这里输出 path，具体格式按题目要求来
	}
	else
	{
		for (int v : adj[u])
		{
			if (!visited[v])
				FindAllPaths(adj, v, target, visited, path);
		}
	}

	path.pop_back();
	visited[u] = false;               // 回溯：撤销标记，允许其他路径再次经过
}
```

这道题的时间复杂度不能简单写成$O(n+e)$，因为要输出所有路径，路径数量本身就可能是指数级的，最坏情况下是指数时间。考试如果考这道题，重点写对“标记—递归—回溯”这三步，复杂度按“与路径条数和路径长度成正比”来说明即可。

> 图的题做多了会发现，真正需要背的代码不多，更多是“看到问题想用哪种遍历”。求连通性、判环、找路径，优先想$\mathrm{DFS}$；求无权最短路、分层扩展、染色，优先想$\mathrm{BFS}$；求先后顺序，想拓扑排序；求工期，想关键路径。把这几个对应关系记牢，比死背代码管用得多。

