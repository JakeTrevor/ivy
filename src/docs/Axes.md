# axes

## scale

An axis can also define a scale. What is a scale? Well, from the perspective of a programmer, its just a function that converts one number to annother. Specifically, it converts the numerical data you provide to a set of coordinates that can be used to draw the graph.

Here's an example to help you Understand. imagine I create a chart, and its 100 units tall. The simplest way to draw a graph is to use the actual data as the coordinates. this would work great for say, temperature, the value of which is well below 100.

Now imagine my data records the price of bitcoin over time. bitcoin typically sells for around $16,000 (at time of writing). That is a lot more than 100, and so the plot would be outside the area of the graph - it wouldn't even be visible. This is the point of a scale - to make sure we can plot that data on the graph. If we say that the top of the graph should represent $17,000, we can work out a value for the scale factor like this:

for $y_{raw}=17,000; y=100$;

$y=m\cdot y_{raw}$

$$
\begin{align}
1700 \cdot \text{Scale factor} &= 100\\
\text{scale factor} &= \frac{100}{17000} = \frac{1}{170}\\
y &= \frac{y_{raw}}{170}
\end{align}
$$

and so our scale function would look like this:

```ts
let scale = (n: number) => n / 170;
```

You also have the option of setting an offset - which means the graph starts at something other than 0. for bitcoin, we might want to only start at say $15,000. You can derive the scale function like this:

for $y_{raw}=15,000;y=0$

for $y_{raw}=17,000;y=100$

$y = m\cdot y_{raw} + c$

$$
\begin{align}
0 &= m\cdot 15,000 + c \\
c &= -m\cdot 15,000\\\\
100 &= m\cdot 17,000 -m\cdot 15,000\\
&= m \cdot (17,000 -15,000)\\
&= m\cdot 2,000\\\\
m &= \frac{100} {2,000} = \frac{1}{20}\\
c &=-\frac{15,000}{20} = -750 &\text {from (5)}\\
y &= \frac{x}{20} - 750
\end{align}
$$

```ts
let scale = (n: number) => -68 + n / 220;
```

If we plug in a real number, for example 16k:

$$\frac{16,000}{20}-750 =50$$

Which is right in the middle of the graph.

An important thing to note is that you can set a scale for both x and y. In our equations, we aren't translating from x to y; we are actually scaling the value of y so that it will fit on our graph.

Of course this is a very simple example. This is a linear scale, but you may choose a logarithmic scale or something else entirely. !x has many good built-in scales ready to go - you only need to write your own if you want some fancy logic with it. or for fun!
