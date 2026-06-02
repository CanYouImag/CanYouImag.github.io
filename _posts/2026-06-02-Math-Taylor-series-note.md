---
layout: post
title: "考研数学个人笔记（一）——泰勒公式（高等数学）"
date: 2026-06-02 16:30:00 +0800
categories: math
tags: [blog, 数学, 公式, 考研]
cover_image: /../assets/formula.png
---

近日，贫道潜心钻研考研数学时，发现天下士子皆苦于背不下来泰勒公式，用不活泰勒展开式。因此贫道以身为引，亲笔写就这篇道诀，以助后来者越过背诵泰勒展开式之艰难困苦。



# 泰勒公式

$$
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)
 = \sum_{n = 0} ^ {\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n + R_n(x)
$$

​	其中，$R_n(x)$是$(x-a)^n$的高阶无穷小，在实际应用中有两种表示形式：

### 拉格朗日型余项（Lagrange Remainder）

$$
R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1} \quad (\xi \text{ 介于 } a \text{ 与 } x \text{ 之间})
$$

### 皮阿诺型余项（Peano Remainder）

$$
R_n(x) = o((x-a)^n)
$$

​	当$a = 0$时，泰勒公式变为麦克劳林公式

$$
f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \cdots + \frac{f^{(n)}(0)}{n!}x^n + R_n(x)
 = \sum_{n = 0} ^ {\infty} \frac{f^{(n)}(0)}{n!}x^n + R_n(x)
$$

​	其中，$R_n(x)$是$(x-a)^n$的高阶无穷小，在实际应用中有两种表示形式：

### 拉格朗日型余项（Lagrange Remainder）

$$
R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1} \quad (\xi \text{ 介于 } a \text{ 与 } x \text{ 之间})
$$

### 皮阿诺型余项（Peano Remainder）

$$
R_n(x) = o((x-a)^n)
$$

# 常用泰勒展开式

## 指数函数

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots + \frac{x^n}{n!}
 = \sum_{n=0}^{\infty} \frac{x^n}{n!}, \quad \forall x \in \mathbb{R}
$$

## 对数函数

$$
\ln(1 + x) = x - \frac{x^2}{2!} + \frac{x^3}{3!} - \cdots + (-1)^{n - 1}\frac{x^n}{n!} + o(x^n)
 = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} x^n, \quad \forall x \in (-1, 1]
$$

## 三角正弦函数

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + (-1)^k\frac{x^{2k+1}}{(2k+1)!}
$$

## 	三角余弦函数

$$
\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots + (-1)^k\frac{x^{2k}}{(2k)!}
$$

## 三角正切函数

$$
\tan x = \sum_{n=1}^{\infty} \frac{B_{2n}(-4)^n(1-4^n)}{(2n)!} x^{2n-1}, \quad |x| < \frac{\pi}{2}
$$
**注：$\tan x$展开式中字母B代表伯努利数，以下为前几个非零的伯努利数：**
$$
B_0 = 1
$$
$$
B_2 = \frac{1}{6}
$$
$$
B_4 = -\frac{1}{30}
$$
$$
B_6 = \frac{1}{42}
$$
$$
B_8 = -\frac{1}{30}
$$

## 反三角正弦函数

$$
\arcsin x = x + \frac{1}{2} \cdot \frac{x^3}{3} + \frac{1 \times 3}{2 \times 4} \cdot \frac{x^5}{5} + \frac{1 \times 3 \times 5}{2 \times 4 \times 6} \cdot \frac{x^7}{7} + o(x^7)
 = \sum_{n=0}^{\infty} \frac{(2n)!}{4^n (n!)^2 (2n+1)} x^{2n+1}, \quad |x| < 1
$$

## 反三角余弦函数

$$
\arccos x = \frac{\pi}{2} - \sum_{n=0}^{\infty} \frac{(2n)!}{4^n (n!)^2 (2n+1)} x^{2n+1}, \quad |x| < 1
$$

​	**注：$\arccos x$的泰勒展开式的推导是基于反三角函数之间的恒等关系而来：**
$$
\arccos x = \frac{\pi}{2} - \arcsin x
$$
​	**由于$\arcsin x$的泰勒展开已知，具体求的时候只需要将$\arcsin x$的数值带回上式。因为具体计算时，$\arccos x$的形式依赖于$\arcsin x$，且常数项$\frac{\pi}{2}$会干扰极限计算中的抵消过程，所以考研时更倾向于考察诸如$\arcsin x$，$\arctan x$这样的纯奇函数。**

## 反三角正切函数

$$
\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots + (-1)^k \frac{x^{2k+1}}{2k+1} + o(x^{2k+1})
 = \sum_{n=0}^{\infty} \frac{(-1)^n}{2n+1} x^{2n+1}, \quad |x| < 1
$$

## 幂函数与分式函数

$$
(1+x)^a = 1 + ax + \frac{a(a-1)}{2!}x^2 + \frac{a(a-1)(a-2)}{3!}x^3 + o(x^3)
$$

$$
\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots + x^n + o(x^n)
$$

$$
\frac{1}{1+x} = 1 - x + x^2 - x^3 + \cdots + (-1)^n x^n + o(x^n)
$$
# 结语

​	以上就是泰勒公式和我迄今为止发现的考过的（**$\arccos x$**不算，它是贫道突发奇想查的）所有高等数学题目中使用过的泰勒展开式的全部内容，希望能给后世的学弟学妹们留下一道窥探数学天机的窍门。

​	最后，看到这里的小友，贫道再送你一句箴言，如果你是一只鹤，你不要去鹤立鸡群，你要去与鹤为伍。
