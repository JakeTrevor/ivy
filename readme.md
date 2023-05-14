# ivy

Ivy is an Information Visualisation library for react.

## The problem

Visualising data in web development is a common enough task, and there are some great libraries for it. They fall broadly into two categories;

### d3

One category is D3 (and yes, it's basically a category on its own), which is a fantastic library for building amazing looking graphs. It provides minute control and it does a lot more than just IV - D3 is also concerned generally with processing data. In this regard, it's a bit like a combination numpy/matplotlib. This is one of it's problems; D3 is a huge library to learn, and getting started with it can be quite a task.

This is coupled with the fact that d3 has very few opinions of its own. In experienced hands, this is a superpower, because it allows you to produce virtually any kind of plot you want. The downside to this however is that very little work is done for you. If you want a graph in d3, you need to write the code for it yourself - and sometimes that is quite a complicated task indeed.

The final problem with D3 is that it doesn't feel very ergonomic in modern web development. It follows patterns similar to Jquery; everything is imperative. In this regard, it truly does not integrate into modern stacks built with react or a similar library.

### Component Libraries

In contrast to this, you have the second class of libraries, which provide pre-made graph components. These vary in quality, and they all have their own problems. None of the available libraries cover every single kind of graph, and so often you will end up using more than one if you are doing many kinds of visualisation.

Virtually all of the component libraries you will find are opinionated, and this is good; it makes using them much easier. But this comes at the cost of customisability. having a single component represent an entire graph means you lose control over smaller elements within it. This is not a problem you find with d3, where you create everything yourself, and thus, can control every aspect.

Finally, some component libraries use features that do not render properly on the server (the most obvious is canvas elements). If you are trying to build a static site (say with astro), then you can't ship the advertised 0 javascript because the graph requires client-side code to render. This isn't great for SSR either, so its something i'd like to avoid.

These 6 problems are the ones I set out to address, and while some are quite vain ambitions (for example, no high-level IV library will every be truly comprehensive), this is what, in an ideal world, I would like to achieve with Ivy.

- focused
- opinionated
- declarative
- comprehensive
- customisable
- SSR friendly

So the goal of ivy is high-level abstraction with low-level control.

For example, you probably don't need to be worrying about how you will convert a data point into a coordinate on a graph; but you very much might care about weather we display that data point as a dot or as part of a line, what colour it ends up being, and what happens when you click on it.
