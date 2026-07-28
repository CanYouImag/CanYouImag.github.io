---
layout: post
title: "考研数学个人笔记（三）——随机变量基础（概率论与数理统计）"
date: 2026-07-26 15:30:00 +0800
categories: math
tags: [blog, 数学, 计算, 考研]
cover_image: /../assets/formula.png
---

​	众所周知，概率论与数理统计一直是考研数学中折磨广大学子的一大难项。喂，考数二的那几位，别看了，没说你们，数二不考概率论（至少26年12月的27考研不考）。今天，贫道就为大家带来概率论这一部分的基础——随机变量以及相关的基础内容。内容很多，请各位道友耐心观看，看到一半看不下去了就去喝喝茶，上个厕所也行。

​	来，把背打直认真听，啊。

# 随机变量

## 定义

​	设E的样本空间为 $\Omega$，对于每一个样本点 $\omega \in \Omega$，都有唯一的实数 $X(\omega)$ 与之对应，且对于任意实数x，事件$\{ \omega \mid X(\omega) \leq x \}$ 都有确定的概率 $P\{ \omega \mid X(\omega) \leq x \}$ 与之对应，则称 $X(\omega)$ 为随机变量。

​	按照随机变量的取值是有限或可数无穷，还是随机变量取值散布在一个区间内，可分为离散型随机变量和连续型随机变量。

## 分布函数（CDF）

### 公式

$$
F(x) = P\{ X \leq x\}, x \in (-\infty, +\infty)
$$

### 性质

​	$1$、单调不减

​	$2$、右连续

​	$3$、$F(-\infty) = 0, F(+\infty) = 1$

# 离散型随机变量

## 特点

​	取值是有限个或可列无穷多个（如抛硬币的正面/反面，射箭命中的环数）。

## 分布律（PMF）

$$
P\{ X = x_k \} = p_k, k = 1,2,\dots
$$
（满足 $\Sigma p_k = 1$，$p_k \geq 0$）

## 分布函数

$$
F(x) = \Sigma_{x_k \leq x}p_k
$$

## 期望

$$
E(X) = \Sigma_kx_kp_k
$$

## 方差

$$
\begin{aligned}
D(X) &= \Sigma_k(x_k - E(X))^2 \\
     &= E(X^2) - [E(X)]^2
\end{aligned}
$$

# 连续型随机变量

## 特点

​	取值充满一个区间，无法一一列举。**任意一点的取值的概率都是 0**，即：
$$
P\{X = a\} = 0
$$

## 概率密度（PDF）

​	$f(x)$，满足 $\int_{-\infty}^{+\infty}f(x)dx = 1$，$f(x) \geq 0$

## 分布函数

$$
F(x) = \int_{-\infty}^xf(t)dt
$$

​	其中$F^\prime(x) = f(x)$

## 期望

$$
E(X) = \int_{-\infty}^{+\infty}xf(x)dx
$$

## 方差

$$
\begin{aligned}
D(X) &= \int_{-\infty}^{+\infty}(x - E(X))^2f(x)dx \\
     &= E(X^2) - [E(X)]^2
\end{aligned}
$$

# 常用离散型随机变量

## 0-1分布（$X \sim B(1 , p)$）

### 定义

​	单次伯努利实验中，一个事件发生的概率。（伯努利实验：在同样的条件下重复地、相互独立地进行的一种随机试验，其特点是该随机试验只有两种可能结果：发生或者不发生。）

### 分布律$P(X = k)$

$$
p^k(1 - p)^{1 - k},\quad k = 0,1
$$

### 分布函数$F(x)$

​	阶梯函数（不是Sigmoid函数）：

$$
F(x) = \begin{cases}
0, & x \le 0 \\
1 - p, & 0 \leq x \le 1 \\
1, & x \geq 1
\end{cases}
$$

### 期望

$$
E(X) = p
$$

### 方差

$$
D(X) = p(1 - p)
$$

## 二项分布（$X \sim B(n , p)$）

### 定义

​	描述了一系列独立重复伯努利试验的成功次数的概率分布。

### 分布律$P(X = k)$

$$
C_n^kp^k(1 - p)^{n - k},\quad k = 0,1,\dots,n
$$

### 分布函数$F(x)$

$$
F(x) = \Sigma_{k = 0}^{[x]}C_n^kp^k(1 - p)^{n - k}
$$

### 期望

$$
E(X) = np
$$

### 方差

$$
D(X) = np(1 - p)
$$

### 特殊性质

​	当$n = 1$时，退化为0-1分布。

​	当$n$很大，$p$很小的时候，$np = \lambda$，则近似为泊松分布。

## 泊松分布（$X \sim P(\lambda)$）

### 定义

​	描述单位时间或单位空间内稀有事件发生的次数。

### 分布律$P(X = k)$

$$
\frac{\lambda^k}{k!}e^{-\lambda},\quad k = 0,1,2,\dots
$$

### 分布函数$F(x)$

$$
F(x) = e^{-\lambda}\Sigma_{k = 0}^{[x]}\frac{\lambda^k}{k!}
$$

### 期望

$$
E(X) = \lambda
$$

### 方差

$$
D(X) = \lambda
$$

### 特殊性质

​	当$\lambda$较大时，近似于正态分布

​	期望与方差相等，选择题常用。

## 几何分布

### 定义

​	描述在一系列独立的伯努利试验中，直到第一次成功所需的试验次数。

### 分布律$P(X = k)$

$$
p(1 - p)^{k - 1}
$$

​	即在失败（$1 - p$）发生$k - 1$次后成功一次

### 分布函数$F(x)$

$$
F(x) = \begin{cases} 
0, & x < 1 \\ 
1 - (1-p)^{\lfloor x \rfloor}, & x \ge 1 
\end{cases}
$$

### 期望

$$
E(X) = \frac{1}{p}
$$

### 方差

$$
D(X) = \frac{1 - p}{p ^ 2}
$$

### 特殊性质

​	无记忆性：
$$
P(X \ge m + n \mid X \ge m) = P(X \ge n)
$$

# 常用连续型随机变量

## 均匀分布（$X \sim U(a , b)$）

### 定义

​	描述在一定区间内所有值出现概率均等的情况。

### 概率密度$f(x)$

$$
f(x) = \begin{cases}
\frac{1}{b - a}, & a \le x \le b \\\\
0, & \text{其他}
\end{cases}
$$

### 分布函数$F(x)$

$$
F(x) = \begin{cases}
0, & x \leq a \\\\
\frac{x - a}{b - a}, & a \le x \le b \\\\
1, & x \geq b
\end{cases}
$$

### 期望

$$
E(X) = \frac{a + b}{2}
$$

### 方差

$$
D(X) = \frac{(b - a)^2}{12}
$$

## 指数分布（$X \sim E(\lambda)$）

### 定义

​	用于描述独立随机事件发生的时间间隔。

### 概率密度$f(x)$

$$
f(x) = \begin{cases}
\lambda e^{-\lambda x}, & x \ge 0\\\\
0, & x \leq 0
\end{cases}
$$

### 分布函数$F(x)$

$$
F(x) = \begin{cases}
1 - e^{-\lambda x}, & x \geq 0 \\\\
0, & x < 0
\end{cases}
$$

### 期望

$$
E(X) = \frac{1}{\lambda}
$$

### 方差

$$
D(X) = \frac{1}{\lambda^2}
$$

## 正态分布（$X \sim N(\mu , \sigma^2)$）

### 定义

​	又称为常态分布或高斯分布，在现实世界中，许多自然和社会现象如考试成绩和人体身高等，都近似遵循正态分布。

### 概率密度$f(x)$

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x - \mu)^2}{2\sigma^2}}
$$

### 分布函数$F(x)$

$$
F(x) = P\{X \leq x\} = \frac{1}{\sqrt{2\pi}\sigma}\int_{-\infty}^{x}e^{-\frac{(t - \mu)^2}{2\sigma^2}}\, dt
$$

​	但是，可但是，但可是，考研的时候绝对不可能考你这个公式的计算，因为正态分布的概率密度$f(x)$的原函数不是初等函数，不能用指数函数，对数函数，幂函数，三角函数等初等函数表示，所以我们可以不记这个东西。

### 期望

$$
E(X) = \mu
$$

### 方差

$$
D(X) = \sigma^2
$$

### 特殊性质

​	正态分布的曲线关于$x = \mu$曲线对称。

​	标准正态分布的$3\sigma$原则（约等于的值按照题目要求或试卷要求找）：

​		（1）$P(\lvert X - \mu \rvert \le \sigma) =P(\mu + \sigma \le X \le \mu + \sigma) = \Phi(1) - \Phi(-1) \approx 0.6827$

​		（2）$P(\lvert X - \mu \rvert \le 2\sigma) = P(\mu + 2\sigma \le X \le \mu + 2\sigma) = \Phi(2) - \Phi(-2) \approx 0.9545$

​		（3）$P(\lvert X - \mu \rvert \le 3\sigma) = P(\mu + 3\sigma \le X \le \mu + 3\sigma) = \Phi(3) - \Phi(-3) \approx 0.9973$

### 标准正态分布（$X \sim N(0 , 1)$）

**概率密度：**$\phi(x) = \frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$

**分布函数：**$\Phi(x) = \int_{-\infty}^{x}\frac{1}{\sqrt{2\pi}}e^{-\frac{t^2}{2}}\, dt$

**标准化公式（任何正态分布转换成标准正态分布）：**

​	若$X \sim N(\mu , \sigma^2)$，则令$Z = \frac{X - \mu}{\sigma}$，必有$Z \sim N(0 , 1)$。

**性质：**

​	（1）对称性：$\Phi(-x) = 1 - \Phi(x)$

​	（2）中点值：$\Phi(0) = 0.5$
