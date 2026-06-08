export const vueList=[
  {
    "id": 1,
    "title": "Vue 的双向数据绑定原理",
    "content": "<p>Vue 2 使用 <strong>Object.defineProperty()</strong> 劫持对象属性的 getter 和 setter。Vue 3 升级为使用 ES6 的 <strong>Proxy</strong>，能够监听整个对象的变化，解决了数组下标和对象新增属性无法监听的缺陷。</p>",
    "createTime": 1717808880000
  },
  {
    "id": 2,
    "title": "v-if 和 v-show 的区别",
    "content": "<ul><li><code>v-if</code> 是真正的条件渲染，条件为假时元素不会渲染到 DOM，切换时会触发组件的销毁与重建。</li><li><code>v-show</code> 只是切换元素的 CSS <code>display</code> 属性，DOM 始终存在。</li></ul><p><em>建议：频繁切换状态用 v-show，条件极少改变用 v-if。</em></p>",
    "createTime": 1717812480000
  },
  {
    "id": 3,
    "title": "Vue 3 组合式 API 的优势",
    "content": "<p>组合式 API (Composition API) 解决了 Vue 2 Options API 在大型组件中逻辑分散的问题。它允许我们将相关的逻辑（如状态、方法、生命周期）组织在一起，并且极大地提高了代码的复用性（通过 Composables）。</p>",
    "createTime": 1717816080000
  },
  {
    "id": 4,
    "title": "computed 和 watch 的区别",
    "content": "<p><code>computed</code> 具有缓存机制，只有依赖的响应式数据发生变化时才会重新计算，适合用于数据转换。</p><p><code>watch</code> 没有缓存，主要用于在数据变化时执行异步操作或复杂的业务逻辑（如防抖请求）。</p>",
    "createTime": 1717819680000
  },
  {
    "id": 5,
    "title": "Vue 组件的通信方式有哪些？",
    "content": "<ol><li>父子组件：<code>props</code> / <code>$emit</code></li><li>跨层级通信：<code>provide</code> / <code>inject</code></li><li>全局状态管理：<code>Pinia</code> 或 <code>Vuex</code></li><li>事件总线：<code>EventBus</code> (Vue3 中推荐用 mitt 替代)</li></ol>",
    "createTime": 1717823280000
  },
  {
    "id": 6,
    "title": "什么是虚拟 DOM (Virtual DOM)？",
    "content": "<p>虚拟 DOM 是用 JavaScript 对象（VNode）来描述真实 DOM 结构。当数据变化时，Vue 会在内存中生成新的虚拟 DOM，并通过 <strong>Diff 算法</strong>与旧虚拟 DOM 进行对比，找出最小差异后一次性更新到真实 DOM 上，从而减少浏览器的重排和重绘，提升性能。</p>",
    "createTime": 1717826880000
  },
  {
    "id": 7,
    "title": "nextTick 的原理和使用场景",
    "content": "<p>Vue 的 DOM 更新是异步的。<code>nextTick</code> 会在下次 DOM 更新循环结束之后执行延迟回调。</p><p><strong>使用场景</strong>：当你修改了响应式数据后，需要立即获取更新后的 DOM 状态（如获取元素高度、让输入框自动聚焦）时，必须在 <code>nextTick</code> 中执行。</p>",
    "createTime": 1717830480000
  },
  {
    "id": 8,
    "title": "v-for 为什么必须绑定 key？",
    "content": "<p><code>key</code> 是虚拟 DOM 对象的唯一标识。在 Diff 算法中，Vue 通过 <code>key</code> 来判断节点是否可复用。如果不绑定 key 或使用 index 作为 key，会导致列表更新时发生不必要的 DOM 重新渲染，甚至引发状态错乱。</p>",
    "createTime": 1717834080000
  },
  {
    "id": 9,
    "title": "ref 和 reactive 的区别",
    "content": "<ul><li><code>ref</code> 主要用于定义基本数据类型（String, Number），在 JS 中访问需要 <code>.value</code>，在模板中自动解包。</li><li><code>reactive</code> 用于定义引用数据类型（Object, Array），内部直接基于 Proxy 实现，访问时不需要 <code>.value</code>。</li></ul>",
    "createTime": 1717837680000
  },
  {
    "id": 10,
    "title": "Vue 的生命周期钩子有哪些？",
    "content": "<p>Vue 3 常用的生命周期钩子包括：<code>onBeforeMount</code>（挂载前）、<code>onMounted</code>（挂载后，常用于发请求）、<code>onBeforeUpdate</code>（更新前）、<code>onUpdated</code>（更新后）、<code>onBeforeUnmount</code>（卸载前，常用于清理定时器）。</p>",
    "createTime": 1717841280000
  },
  {
    "id": 11,
    "title": "什么是插槽 (Slot)？",
    "content": "<p>插槽是 Vue 的内容分发机制。分为：</p><ol><li><strong>默认插槽</strong>：未具名的内容填充。</li><li><strong>具名插槽</strong>：通过 <code>v-slot:name</code> 指定填充位置。</li><li><strong>作用域插槽</strong>：子组件可以向插槽传递数据，父组件通过 <code>v-slot=\"slotProps\"</code> 接收并自定义渲染。</li></ol>",
    "createTime": 1717844880000
  },
  {
    "id": 12,
    "title": "Vue Router 的 hash 模式和 history 模式",
    "content": "<p><strong>Hash 模式</strong>：URL 带有 <code>#</code>，利用 <code>window.onhashchange</code> 监听，兼容性好，无需后端配置。</p><p><strong>History 模式</strong>：URL 更美观，利用 HTML5 History API，但需要后端配合配置重定向，否则刷新会出现 404。</p>",
    "createTime": 1717848480000
  },
  {
    "id": 13,
    "title": "Pinia 和 Vuex 的区别",
    "content": "<p>Pinia 是 Vue 官方推荐的新一代状态管理库。它去除了 Vuex 中的 <code>mutations</code>，只有 <code>state</code>、<code>getters</code> 和 <code>actions</code>。Pinia 对 TypeScript 的支持更加友好，且体积更小，完美支持 Vue 3 的组合式 API。</p>",
    "createTime": 1717852080000
  },
  {
    "id": 14,
    "title": "什么是 Keep-alive？",
    "content": "<p><code>&lt;keep-alive&gt;</code> 是 Vue 的内置组件，用于缓存不活动的组件实例，避免重复渲染。常用于多标签页（Tabs）页面切换。它提供了 <code>include</code> 和 <code>exclude</code> 属性来精确控制哪些组件需要被缓存。</p>",
    "createTime": 1717855680000
  },
  {
    "id": 15,
    "title": "Vue 3 的 Teleport 组件是什么？",
    "content": "<p><code>&lt;teleport&gt;</code>（传送门）允许我们将组件的 HTML 结构渲染到 DOM 树中的其他位置（如 <code>body</code> 下），即使它在逻辑上仍属于当前组件。常用于实现全局的 Modal 弹窗、Tooltip 提示等，避免被父级 <code>overflow: hidden</code> 或 <code>z-index</code> 影响。</p>",
    "createTime": 1717859280000
  },
  {
    "id": 16,
    "title": "Vue 中的性能优化手段有哪些？",
    "content": "<ol><li>路由懒加载 (<code>() => import()</code>)</li><li>长列表使用虚拟滚动 (Virtual Scroll)</li><li>合理使用 <code>v-show</code> 和 <code>v-if</code></li><li>使用 <code>Object.freeze()</code> 冻结不需要修改的庞大静态数据</li><li>图片懒加载</li></ol>",
    "createTime": 1717862880000
  },
  {
    "id": 17,
    "title": "什么是 SSR (服务端渲染)？",
    "content": "<p>SSR 是指在服务器端将 Vue 组件渲染为 HTML 字符串并发送给浏览器。它的优势在于 <strong>SEO 友好</strong>（搜索引擎能抓取完整内容）和 <strong>首屏加载速度快</strong>。常见的 Vue SSR 框架有 Nuxt.js。</p>",
    "createTime": 1717866480000
  },
  {
    "id": 18,
    "title": "v-model 的实现原理",
    "content": "<p><code>v-model</code> 本质上是一个语法糖。在 Vue 3 中，<code>&lt;input v-model=\"val\"&gt;</code> 会被编译为：</p><p><code>&lt;input :modelValue=\"val\" @update:modelValue=\"val = $event\"&gt;</code></p><p>在自定义组件中，可以通过定义 <code>props</code> 和 <code>emits</code> 来实现双向绑定。</p>",
    "createTime": 1717870080000
  },
  {
    "id": 19,
    "title": "Vue 3 的 Fragment 特性",
    "content": "<p>在 Vue 2 中，组件的模板必须有一个根节点。Vue 3 引入了 Fragment（片段）特性，允许组件拥有多个根节点。这不仅让模板编写更灵活，也减少了不必要的 DOM 嵌套层级。</p>",
    "createTime": 1717873680000
  },
  {
    "id": 20,
    "title": "什么是 Tree-shaking？",
    "content": "<p>Tree-shaking 是一种打包优化技术（如 Webpack/Vite 中使用）。Vue 3 的 API 全面支持 ES Module，打包工具可以根据代码的实际引用情况，自动剔除那些未被使用的导出代码，从而大幅减小最终打包文件的体积。</p>",
    "createTime": 1717877280000
  }
]