---
layout: post
title: "考研数学个人笔记（六）——参数的区间估计（概率论与数理统计）"
date: 2026-09-08 17:30:00 +0800
categories: math
tags: [blog, 数学, 计算, 考研]
cover_image: /../assets/formula.png
---

众所周知，概率论与数理统计一直是考研数学中折磨广大学子的一大难项，而这其中，数理统计部分的参数的区间估计，又是劝退无数道友的险关一座。前几回咱们在随机变量与各类分布之间摸爬滚打，那不过开胃小菜；真正的硬仗，是从样本出发去推断总体的未知参数。今天，贫道便为各位道友带来区间估计的心法口诀，教你如何以置信区间丈量参数，做到心中有数。内容不多，但处处是考点，请各位道友竖起耳朵，认真听啊。

# 概念

设$\theta$是总体$X$的分布函数的一个未知参数，对于给定$\alpha(0 < \alpha < 1)$，如果由样本$X_1, X_2, \dots, X_n$确定的两个统计量$\hat{\theta_1} = \hat{\theta_1}(X_1, X_2, \dots, X_n)$，$\hat{\theta_2} = \hat{\theta_2}(X_1, X_2, \dots, X_n)$，使得：

$$
P\{\hat{\theta_1}(X_1, X_2, \dots, X_n) < \theta < \hat{\theta_2}(X_1, X_2, \dots, X_n)\} = 1 - \alpha
$$

则称随机区间$(\hat{\theta_1}, \hat{\theta_2})$是$\theta$的置信度为$1 - \alpha$的置信区间，$\hat{\theta_1}$和$\hat{\theta_2}$分别称为$\theta$的置信度为$1 - \alpha$的双侧置信区间的**置信上限**和**置信下限**。$1 - \alpha$称为置信度或置信水平，$\alpha$称为显著性水平。

# 单个正态总体均值和方差的置信区间

设$X \sim N(\mu, \sigma^2)$，从总体中抽取样本$X_1, X_2, \dots, X_n$，样本均值为$\bar{X}$，样本方差为$S^2$。$\alpha$为题干给定的显著性水平，$\Delta$为任意很小的正数。

## $\sigma^2$已知，$\mu$的置信水平是$1 - \alpha$的置信区间

$$
(\bar{x} - \frac{\sigma}{\sqrt{n}}z_{\frac{\alpha}{2}}, \bar{x} + \frac{\sigma}{\sqrt{n}}z_{\frac{\alpha}{2}})
$$

其中$z_{\frac{\alpha}{2}}$表示标准正态分布的上$\frac{\alpha}{2}$分位数。

证明过程：

  令$P\{\lvert\bar{X} - EX\rvert < \Delta\} = 1 - \alpha$，即令$\bar{X}$到$\mu$的距离小于某个正数的概率为$1 - \alpha$

  由于$\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$，记$Z = \frac{\bar{X} - \mu}{\frac{\sigma}{\sqrt{n}}} \sim N(0, 1)$（正态分布的标准化），则有：

$$
P\{\lvert\frac{\bar{X} - \mu}{\frac{\sigma}{\sqrt{n}}}\rvert < \frac{\Delta}{\frac{\sigma}{\sqrt{n}}}\} = 1 - \alpha
$$

  即
$$
\frac{\Delta}{\frac{\sigma}{\sqrt{n}}} = z_\frac{\alpha}{2}
$$
  解得$\Delta = z_{\frac{\alpha}{2}}·\frac{\sigma}{\sqrt{n}}$

  故称
$$
(\bar{x} - \frac{\sigma}{\sqrt{n}}z_{\frac{\alpha}{2}}, \bar{x} + \frac{\sigma}{\sqrt{n}}z_{\frac{\alpha}{2}})
$$
  是置信度为$1 - \alpha$的置信区间

## $\sigma^2$未知，$\mu$的置信水平是$1 - \alpha$的区间

$$
(\bar{X} - \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}(n - 1)}, \bar{X} + \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}(n - 1)})
$$

证明过程：

  令
$$
P\{\lvert\frac{\bar{X} - \mu}{\frac{S}{\sqrt{n}}}\rvert < \frac{\Delta}{\frac{S}{\sqrt{n}}}\} = 1 - \alpha
$$

则我们有代换：

$$
T = \frac{\bar{X} - \mu}{\frac{S}{\sqrt{n}}}\\\\
S = \sqrt{\frac{1}{n - 1}\Sigma_{i = 1}^{n}(X_i - \bar{X})^2}
$$

得到：

$$
P\{\lvert T\rvert < \frac{\Delta}{\frac{S}{\sqrt{n}}}\} = 1 - \alpha
$$

即

$$
P\{\lvert T\rvert > \frac{\Delta}{\frac{S}{\sqrt{n}}}\} = \alpha
$$

这个形式眼熟不？没错，他就是$t$分布的上$\alpha$分位点。由$t$分布的性质得：

$$
\frac{\Delta}{\frac{S}{\sqrt{n}}} = t_{\frac{\alpha}{2}}(n - 1)
$$

解得 $\Delta = t_{\frac{\alpha}{2}}(n - 1) \cdot \frac{S}{\sqrt{n}}$，代回不等式 $\lvert\bar{X} - \mu\rvert < \Delta$ 得：

$$
\bar{X} - \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n - 1) < \mu < \bar{X} + \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n - 1)
$$

故

$$
\left(\bar{X} - \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n - 1),\ \bar{X} + \frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n - 1)\right)
$$

是置信度为 $1 - \alpha$ 的置信区间。

## $\mu$已知，$\sigma^2$的置信水平是$1 - \alpha$的置信区间

$$
\left(\frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{\frac{\alpha}{2}}(n)},\ \frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{1 - \frac{\alpha}{2}}(n)}\right)
$$

证明过程：

由题设 $X_i \sim N(\mu, \sigma^2)$ 且 $\mu$ 已知，对每个 $X_i$ 标准化得 $\frac{X_i - \mu}{\sigma} \sim N(0, 1)$，于是：

$$
\sum_{i=1}^{n}\left(\frac{X_i - \mu}{\sigma}\right)^2 = \frac{1}{\sigma^2}\sum_{i=1}^{n}(X_i - \mu)^2 \sim \chi^2(n)
$$

这是因为$n$个独立标准正态随机变量的平方和服从自由度为$n$的卡方分布。

由卡方分布的上分位数定义，有：

$$
P\left\{\chi^2_{1 - \frac{\alpha}{2}}(n) < \frac{1}{\sigma^2}\sum_{i=1}^{n}(X_i - \mu)^2 < \chi^2_{\frac{\alpha}{2}}(n)\right\} = 1 - \alpha
$$

对不等式各部分取倒数（注意不等号方向改变）：

$$
P\left\{\frac{1}{\chi^2_{\frac{\alpha}{2}}(n)} < \frac{\sigma^2}{\sum_{i=1}^{n}(X_i - \mu)^2} < \frac{1}{\chi^2_{1 - \frac{\alpha}{2}}(n)}\right\} = 1 - \alpha
$$

各部分同乘 $\sum_{i=1}^{n}(X_i - \mu)^2$，得：

$$
P\left\{\frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{\frac{\alpha}{2}}(n)} < \sigma^2 < \frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{1 - \frac{\alpha}{2}}(n)}\right\} = 1 - \alpha
$$

故

$$
\left(\frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{\frac{\alpha}{2}}(n)},\ \frac{\sum_{i=1}^{n}(X_i - \mu)^2}{\chi^2_{1 - \frac{\alpha}{2}}(n)}\right)
$$

是置信度为 $1 - \alpha$ 的置信区间。

## $\mu$未知，$\sigma^2$的置信水平是$1 - \alpha$的置信区间

$$
\left(\frac{(n - 1)S^2}{\chi^2_{\frac{\alpha}{2}}(n - 1)},\ \frac{(n - 1)S^2}{\chi^2_{1 - \frac{\alpha}{2}}(n - 1)}\right)
$$

证明过程：

由于 $\mu$ 未知，我们用 $\bar{X}$ 替代 $\mu$。由正态总体的抽样分布性质知：

$$
\frac{(n - 1)S^2}{\sigma^2} \sim \chi^2(n - 1)
$$

这背后的原理是：$n$个独立标准正态随机变量在减去一个线性约束（即样本均值$\bar{X}$）后，自由度减少$1$，故自由度为$n-1$。

由卡方分布的上分位数定义，有：

$$
P\left\{\chi^2_{1 - \frac{\alpha}{2}}(n - 1) < \frac{(n - 1)S^2}{\sigma^2} < \chi^2_{\frac{\alpha}{2}}(n - 1)\right\} = 1 - \alpha
$$

对不等式各部分取倒数：

$$
P\left\{\frac{1}{\chi^2_{\frac{\alpha}{2}}(n - 1)} < \frac{\sigma^2}{(n - 1)S^2} < \frac{1}{\chi^2_{1 - \frac{\alpha}{2}}(n - 1)}\right\} = 1 - \alpha
$$

各部分同乘 $(n-1)S^2$，得：

$$
P\left\{\frac{(n - 1)S^2}{\chi^2_{\frac{\alpha}{2}}(n - 1)} < \sigma^2 < \frac{(n - 1)S^2}{\chi^2_{1 - \frac{\alpha}{2}}(n - 1)}\right\} = 1 - \alpha
$$

故

$$
\left(\frac{(n - 1)S^2}{\chi^2_{\frac{\alpha}{2}}(n - 1)},\ \frac{(n - 1)S^2}{\chi^2_{1 - \frac{\alpha}{2}}(n - 1)}\right)
$$

是置信度为 $1 - \alpha$ 的置信区间。