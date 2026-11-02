---
layout: post
title: "考研数学个人笔记（九）——微分方程求解（高等数学）"
date: 2026-10-25 10:00:00 +0800
categories: math
tags: [数学, 计算, 考研]
cover_image: /../assets/formula.png
---

微分方程这玩意儿，说难也难，说简单也简单。难在你得先认出它是什么类型；简单在，认出来之后基本都是固定套路。考研高数里常见的就那么几类：可分离变量、齐次、一阶线性、伯努利、全微分，外加可降阶、二阶常系数线性、欧拉方程。下面按类型逐个过，每类给三个例子，尽量把步骤写完整。

# 一、基本概念

- **微分方程：**含有未知函数及其导数的方程。
- **阶：**方程中出现的最高阶导数的阶数。
- **通解：**含有与方程阶数相同个数的独立任意常数的解。
- **特解：**用初始条件把通解中的任意常数确定以后得到的解。
- **线性与非线性：**未知函数及其各阶导数都是一次的，叫线性微分方程；否则叫非线性微分方程。
- **齐次与非齐次：**线性方程右端为$0$的叫齐次线性方程，右端不为$0$的叫非齐次线性方程。

> 注意：一阶方程里说的“齐次方程”，通常指$y'=\varphi(y/x)$这一类；线性方程里说的“齐次”，指右端为$0$。两个“齐次”不是一回事，别混。

# 二、一阶微分方程

一阶方程一般写成$y'=f(x,y)$，或者$P(x,y)\mathrm{d}x+Q(x,y)\mathrm{d}y=0$。拿到题先看能不能分离变量；不能分离再看是不是齐次；不是齐次再看能不能整理成一阶线性；最后考虑伯努利或全微分。

## （一）可分离变量方程

能写成$g(y)\mathrm{d}y=f(x)\mathrm{d}x$的，两边直接积分。常数写一个就行，别两边各写一个$C$。另外，除以$y$的时候要留意$y=0$是不是丢了解。

**例$1$：**求$y'=xy$。

**解：**当$y\ne0$时，分离变量得

$$
\frac{\mathrm{d}y}{y}=x\mathrm{d}x.
$$

两边积分：

$$
\ln\lvert y\rvert=\frac{x^2}{2}+C_1.
$$

所以

$$
y=C e^{\frac{x^2}{2}}.
$$

另外$y=0$也是解，已经包含在$C=0$里。

**例$2$：**求$y'=\frac{1+y^2}{1+x^2}$。

**解：**分离变量：

$$
\frac{\mathrm{d}y}{1+y^2}=\frac{\mathrm{d}x}{1+x^2}.
$$

两边积分：

$$
\arctan y=\arctan x+C.
$$

所以通解为

$$
y=\tan(\arctan x+C).
$$

**例$3$：**求$y'=e^{x+y}$。

**解：**把右端拆开：

$$
y'=e^x e^y.
$$

分离变量：

$$
e^{-y}\mathrm{d}y=e^x\mathrm{d}x.
$$

两边积分：

$$
-e^{-y}=e^x+C.
$$

整理得

$$
e^x+e^{-y}=C.
$$

## （二）齐次方程

能写成$y'=\varphi\left(\frac{y}{x}\right)$的，令$u=\frac{y}{x}$，则$y=ux$，$y'=u+xu'$，代回去就变成可分离方程。

**例$1$：**求$y'=1+\frac{y}{x}$。

**解：**令$u=\frac{y}{x}$，则

$$
u+xu'=1+u.
$$

所以

$$
xu'=1.
$$

分离变量并积分：

$$
u=\ln\lvert x\rvert+C.
$$

代回$u=\frac{y}{x}$，得

$$
y=x\ln\lvert x\rvert+Cx.
$$

**例$2$：**求$y'=\frac{x^2+y^2}{xy}$。

**解：**右端写成

$$
y'=\frac{x}{y}+\frac{y}{x}=\frac{1}{u}+u.
$$

令$u=\frac{y}{x}$，则

$$
u+xu'=u+\frac{1}{u}.
$$

所以

$$
xu'=\frac{1}{u}.
$$

分离变量：

$$
u\mathrm{d}u=\frac{\mathrm{d}x}{x}.
$$

积分得

$$
\frac{u^2}{2}=\ln\lvert x\rvert+C.
$$

代回$u=\frac{y}{x}$，得

$$
y^2=2x^2\ln\lvert x\rvert+Cx^2.
$$

**例$3$：**求$y'=\frac{y}{x}+\tan\frac{y}{x}$。

**解：**令$u=\frac{y}{x}$，则

$$
u+xu'=u+\tan u.
$$

所以

$$
xu'=\tan u.
$$

分离变量：

$$
\cot u\mathrm{d}u=\frac{\mathrm{d}x}{x}.
$$

积分得

$$
\ln\lvert\sin u\rvert=\ln\lvert x\rvert+C.
$$

代回$u=\frac{y}{x}$，得

$$
\sin\frac{y}{x}=Cx.
$$

## （三）一阶线性方程

标准形是

$$
y'+P(x)y=Q(x).
$$

先化成这个形式，注意$y'$前面的系数必须是$1$。积分因子取

$$
\mu(x)=e^{\int P(x)\mathrm{d}x}.
$$

两边乘$\mu(x)$，左边就凑成$(\mu y)'$：

$$
(\mu y)'=\mu Q.
$$

所以通解为

$$
y=e^{-\int P(x)\mathrm{d}x}\left(\int Q(x)e^{\int P(x)\mathrm{d}x}\mathrm{d}x+C\right).
$$

不想背公式也行，用常数变易法，本质一样。

**例$1$：**求$y'+y=e^x$。

**解：**这里$P(x)=1$，$Q(x)=e^x$，积分因子为

$$
\mu(x)=e^{\int 1\mathrm{d}x}=e^x.
$$

方程两边乘$e^x$：

$$
(y e^x)'=e^{2x}.
$$

积分得

$$
y e^x=\frac{1}{2}e^{2x}+C.
$$

所以

$$
y=\frac{1}{2}e^x+C e^{-x}.
$$

**例$2$：**求$y'-\frac{2}{x}y=x^2$，$x>0$。

**解：**这里$P(x)=-\frac{2}{x}$，积分因子为

$$
\mu(x)=e^{-\int\frac{2}{x}\mathrm{d}x}=e^{-2\ln x}=x^{-2}.
$$

方程两边乘$x^{-2}$：

$$
(yx^{-2})'=1.
$$

积分得

$$
yx^{-2}=x+C.
$$

所以

$$
y=x^3+Cx^2.
$$

**例$3$：**求$y'+y\tan x=\sec x$，$\cos x>0$。

**解：**积分因子为

$$
\mu(x)=e^{\int\tan x\mathrm{d}x}=e^{-\ln\cos x}=\sec x.
$$

方程两边乘$\sec x$：

$$
(y\sec x)'=\sec^2 x.
$$

积分得

$$
y\sec x=\tan x+C.
$$

所以

$$
y=\sin x+C\cos x.
$$

## （四）伯努利方程

伯努利方程的标准形是

$$
y'+P(x)y=Q(x)y^n,\qquad n\ne0,\ n\ne1.
$$

令$z=y^{1-n}$，则

$$
z'=(1-n)y^{-n}y'.
$$

原方程两边除以$y^n$，再代入$z$，就化成一阶线性方程：

$$
z'+(1-n)P(x)z=(1-n)Q(x).
$$

解出$z$以后，别忘了换回$y=z^{\frac{1}{1-n}}$。

**例$1$：**求$y'+y=y^2$。

**解：**这是$n=2$的伯努利方程。令$z=y^{-1}$，则

$$
z'-z=-1.
$$

这是一阶线性方程，解得

$$
z=1+C e^x.
$$

所以

$$
y=\frac{1}{1+C e^x}.
$$

**例$2$：**求$y'-y=xy^2$。

**解：**令$z=y^{-1}$，方程化为

$$
z'+z=-x.
$$

积分因子为$e^x$，所以

$$
(z e^x)'=-x e^x.
$$

积分得

$$
z e^x=-(x-1)e^x+C.
$$

因此

$$
z=1-x+C e^{-x}.
$$

代回$z=y^{-1}$，得

$$
y=\frac{1}{1-x+C e^{-x}}.
$$

**例$3$：**求$y'-\frac{1}{x}y=y^2$，$x\ne0$。

**解：**令$z=y^{-1}$，方程化为

$$
z'+\frac{1}{x}z=-1.
$$

积分因子为$x$，所以

$$
(xz)'=-x.
$$

积分得

$$
xz=-\frac{x^2}{2}+C.
$$

因此

$$
z=-\frac{x}{2}+\frac{C}{x}.
$$

代回$z=y^{-1}$，得

$$
y=\frac{2x}{2C-x^2}.
$$

## （五）全微分方程

方程写成

$$
P(x,y)\mathrm{d}x+Q(x,y)\mathrm{d}y=0.
$$

如果

$$
\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x},
$$

就称它是全微分方程。此时存在一个函数$u(x,y)$，使得

$$
\mathrm{d}u=P\mathrm{d}x+Q\mathrm{d}y.
$$

通解就是

$$
u(x,y)=C.
$$

如果$P_y\ne Q_x$，可以尝试找积分因子，不过考研里先把“判断全微分、凑出$u$”练熟更重要。

**例$1$：**求$(2x+y)\mathrm{d}x+(x+2y)\mathrm{d}y=0$。

**解：**这里

$$
P=2x+y,\qquad Q=x+2y.
$$

因为

$$
\frac{\partial P}{\partial y}=1=\frac{\partial Q}{\partial x},
$$

所以是全微分方程。取

$$
u=x^2+xy+y^2,
$$

则

$$
\mathrm{d}u=(2x+y)\mathrm{d}x+(x+2y)\mathrm{d}y.
$$

通解为

$$
x^2+xy+y^2=C.
$$

**例$2$：**求$(y\cos x+2xe^y)\mathrm{d}x+(\sin x+x^2e^y)\mathrm{d}y=0$。

**解：**这里

$$
P=y\cos x+2xe^y,\qquad Q=\sin x+x^2e^y.
$$

因为

$$
\frac{\partial P}{\partial y}=\cos x+2xe^y=\frac{\partial Q}{\partial x},
$$

所以是全微分方程。取

$$
u=y\sin x+x^2e^y,
$$

则

$$
\mathrm{d}u=(y\cos x+2xe^y)\mathrm{d}x+(\sin x+x^2e^y)\mathrm{d}y.
$$

通解为

$$
y\sin x+x^2e^y=C.
$$

**例$3$：**求$(3x^2+2y)\mathrm{d}x+(2x-3y^2)\mathrm{d}y=0$。

**解：**这里

$$
P=3x^2+2y,\qquad Q=2x-3y^2.
$$

因为

$$
\frac{\partial P}{\partial y}=2=\frac{\partial Q}{\partial x},
$$

所以是全微分方程。取

$$
u=x^3+2xy-y^3,
$$

则

$$
\mathrm{d}u=(3x^2+2y)\mathrm{d}x+(2x-3y^2)\mathrm{d}y.
$$

通解为

$$
x^3+2xy-y^3=C.
$$

# 三、可降阶的高阶微分方程

可降阶的题，核心就一句话：缺谁，就换谁。这一类内部有三种常见情形，下面三个例子分别对应$y^{(n)}=f(x)$、$y''=f(x,y')$、$y''=f(y,y')$。

## （一）$y^{(n)}=f(x)$型

这种方程右端只含$x$，直接积分$n$次即可。

**例$1$：**求$y''=xe^x$。

**解：**先积分一次：

$$
y'=\int xe^x\mathrm{d}x=(x-1)e^x+C_1.
$$

再积分一次：

$$
y=\int\left[(x-1)e^x+C_1\right]\mathrm{d}x=(x-2)e^x+C_1x+C_2.
$$

所以通解为

$$
y=(x-2)e^x+C_1x+C_2.
$$

## （二）$y''=f(x,y')$型

这种方程缺$y$。令$p=y'$，则$p'=y''$，原方程化成一阶方程。

**例$2$：**求$y''=\frac{y'}{x}$，$x>0$。

**解：**令$p=y'$，则

$$
p'=\frac{p}{x}.
$$

分离变量：

$$
\frac{\mathrm{d}p}{p}=\frac{\mathrm{d}x}{x}.
$$

积分得

$$
p=C_1x.
$$

因为$p=y'$，所以

$$
y'=C_1x.
$$

再积分：

$$
y=\frac{C_1}{2}x^2+C_2.
$$

## （三）$y''=f(y,y')$型

这种方程缺$x$。令$p=y'$，并把$y$看成自变量，则

$$
y''=\frac{\mathrm{d}p}{\mathrm{d}x}=\frac{\mathrm{d}p}{\mathrm{d}y}\frac{\mathrm{d}y}{\mathrm{d}x}=p\frac{\mathrm{d}p}{\mathrm{d}y}.
$$

**例$3$：**求$y''=\frac{(y')^2}{y}$，$y>0$。

**解：**令$p=y'$，则

$$
p\frac{\mathrm{d}p}{\mathrm{d}y}=\frac{p^2}{y}.
$$

当$p\ne0$时，约去$p$：

$$
\frac{\mathrm{d}p}{p}=\frac{\mathrm{d}y}{y}.
$$

积分得

$$
p=C_1y.
$$

因为$p=y'$，所以

$$
y'=C_1y.
$$

分离变量并积分：

$$
\frac{\mathrm{d}y}{y}=C_1\mathrm{d}x,
$$

$$
y=C_2e^{C_1x}.
$$

$p=0$对应常数解，已经包含在$C_1=0$中。

# 四、二阶常系数线性微分方程

二阶常系数线性方程的一般形式是

$$
y''+py'+qy=f(x).
$$

先解对应的齐次方程，再求一个非齐次特解，最后把两部分加起来。

## （一）齐次方程

齐次方程为

$$
y''+py'+qy=0.
$$

特征方程是

$$
r^2+pr+q=0.
$$

根据特征根的情况，通解有三种形式：

- 两个不相等的实根$r_1,r_2$：

$$
y=C_1e^{r_1x}+C_2e^{r_2x}.
$$

- 两个相等的实根$r_1=r_2=r$：

$$
y=(C_1+C_2x)e^{rx}.
$$

- 一对共轭复根$r=\alpha\pm\beta i$：

$$
y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x).
$$

下面三个例子正好对应这三种情况。

**例$1$：**求$y''-3y'+2y=0$。

**解：**特征方程为

$$
r^2-3r+2=0,
$$

解得$r_1=1$，$r_2=2$。所以通解为

$$
y=C_1e^x+C_2e^{2x}.
$$

**例$2$：**求$y''+2y'+y=0$。

**解：**特征方程为

$$
r^2+2r+1=(r+1)^2=0,
$$

所以$r=-1$是二重根。通解为

$$
y=(C_1+C_2x)e^{-x}.
$$

**例$3$：**求$y''+4y=0$。

**解：**特征方程为

$$
r^2+4=0,
$$

解得$r=\pm2i$。所以通解为

$$
y=C_1\cos2x+C_2\sin2x.
$$

## （二）非齐次方程

非齐次方程的通解等于“齐次通解$Y$”加上“非齐次特解$y_p$”：

$$
y=Y+y_p.
$$

特解用待定系数法。常见的右端有两种：

| 右端$f(x)$ | 特解形式 |
| --- | --- |
| $P_m(x)e^{\lambda x}$ | $x^kQ_m(x)e^{\lambda x}$ |
| $e^{\alpha x}(P_l\cos\beta x+P_n\sin\beta x)$ | $x^ke^{\alpha x}(R_m\cos\beta x+S_m\sin\beta x)$ |

其中$m=\max\lbrace l,n\rbrace$，$k$看$\lambda$或$\alpha\pm\beta i$是不是特征根：不是特征根取$k=0$，是单根取$k=1$，是重根取$k=2$。如果右端是几项相加，可以用叠加原理，分别求特解再相加。

**例$1$：**求$y''-y=e^x$。

**解：**齐次方程的特征根为$r=\pm1$，所以

$$
Y=C_1e^x+C_2e^{-x}.
$$

右端是$e^x$，$\lambda=1$是特征方程的单根，因此设

$$
y_p=Axe^x.
$$

代入$y''-y=e^x$：

$$
y_p''-y_p=2Ae^x=e^x.
$$

所以$A=\frac{1}{2}$，从而

$$
y_p=\frac{x}{2}e^x.
$$

通解为

$$
y=C_1e^x+C_2e^{-x}+\frac{x}{2}e^x.
$$

**例$2$：**求$y''+y=x^2$。

**解：**齐次方程的特征根为$r=\pm i$，所以

$$
Y=C_1\cos x+C_2\sin x.
$$

右端是二次多项式，$\lambda=0$不是特征根，因此设

$$
y_p=Ax^2+Bx+C.
$$

则$y_p''=2A$，代入$y''+y=x^2$：

$$
Ax^2+Bx+(C+2A)=x^2.
$$

比较系数得$A=1$，$B=0$，$C=-2$。所以

$$
y_p=x^2-2.
$$

通解为

$$
y=C_1\cos x+C_2\sin x+x^2-2.
$$

**例$3$：**求$y''+y=\cos x$。

**解：**齐次通解仍为

$$
Y=C_1\cos x+C_2\sin x.
$$

右端是$\cos x$，而$\pm i$正好是特征根，所以设

$$
y_p=x(A\cos x+B\sin x).
$$

求导：

$$
y_p'=A\cos x+B\sin x+x(-A\sin x+B\cos x),
$$

$$
y_p''=-2A\sin x+2B\cos x-x(A\cos x+B\sin x).
$$

代入$y''+y=\cos x$：

$$
-2A\sin x+2B\cos x=\cos x.
$$

比较系数得$A=0$，$B=\frac{1}{2}$。所以

$$
y_p=\frac{x}{2}\sin x.
$$

通解为

$$
y=C_1\cos x+C_2\sin x+\frac{x}{2}\sin x.
$$

# 五、欧拉方程

欧拉方程的一般形式是

$$
x^2y''+axy'+by=f(x),\qquad x>0.
$$

令$x=e^t$，并记$D=\frac{\mathrm{d}}{\mathrm{d}t}$，则

$$
xy'=Dy,\qquad x^2y''=D(D-1)y.
$$

代回去就变成二阶常系数线性方程。解完以后，记得把$t$换回$\ln x$。如果$x<0$，可以令$x=-e^t$，最后用$\lvert x\rvert$处理。

**例$1$：**求$x^2y''-2xy'+2y=0$，$x>0$。

**解：**令$x=e^t$，则

$$
\left[D(D-1)-2D+2\right]y=0.
$$

整理得

$$
(D^2-3D+2)y=0.
$$

特征方程为

$$
r^2-3r+2=0,
$$

解得$r=1,2$。所以

$$
y=C_1e^t+C_2e^{2t}.
$$

换回$x$：

$$
y=C_1x+C_2x^2.
$$

**例$2$：**求$x^2y''-xy'+y=0$，$x>0$。

**解：**令$x=e^t$，则

$$
\left[D(D-1)-D+1\right]y=0.
$$

整理得

$$
(D^2-2D+1)y=0,
$$

即

$$
(D-1)^2y=0.
$$

所以

$$
y=(C_1+C_2t)e^t.
$$

换回$x$：

$$
y=(C_1+C_2\ln x)x.
$$

**例$3$：**求$x^2y''+xy'=1$，$x>0$。

**解：**令$x=e^t$，则

$$
\left[D(D-1)+D\right]y=1,
$$

即

$$
D^2y=1.
$$

积分两次：

$$
y=\frac{t^2}{2}+C_1t+C_2.
$$

换回$x$：

$$
y=\frac{1}{2}(\ln x)^2+C_1\ln x+C_2.
$$

# 六、最后叮嘱

- 先认类型，再套方法，不要一上来就硬算。
- 一阶线性方程先化成标准形，$P(x)$、$Q(x)$的符号别弄错。
- 伯努利方程换元后，别忘了$z=y^{1-n}$和$z'$的系数。
- 可降阶的题：缺$y$设$p=y'$，缺$x$设$p=y'$并用$y''=p\frac{\mathrm{d}p}{\mathrm{d}y}$。
- 非齐次特解先看右端是不是特征根，是的话要乘$x$；是重根就乘$x^2$。
- 欧拉方程换元$x=e^t$，最后一定要换回$x$。
- 通解里任意常数的个数要等于方程的阶数，少一个多一个都不对。
