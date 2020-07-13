# vue-load-select

> 基于 el-select 二次封装的 Vue.js 下拉加载组件

![image](https://github.com/blank1024/vue-load-select/raw/master/example.jpg)

## 构建

```
# 安装依赖
npm install

# 启动项目
npm run serve
```

## 食用方法

下面的例子将会说明如何在`Vue.js`中使用该下拉加载组件：

```javascript
<template>
    <div id="app">
        <load-select
            v-model="selected"
            :data="data"
            :page="page"
            :hasMore="more"
            :request="getData"
        ></load-select>
    </div>
</template>

<script>
// 导入该组件
import loadSelect from "@/components/load-select/index";

export default {
    name: "app",
    components: {
        loadSelect
    },
    data() {
        return {
            selected: "",
            page: 1,
            more: true,
            data: []
        };
    },
    methods: {
        // 传入给load-select组件的函数
        getData({ page = 1, more = false, keyword = "" } = {}) {
            return new Promise(resolve => {
                // 访问后端接口API
                this.requestAPI({ page, keyword }).then(res => {
                    if (more) {
                        this.data = [...this.data, ...res.result];
                    } else {
                        this.data = res.result;
                    }

                    this.page = res.page;
                    let { total, page, size } = res;
                    this.more = page * size < total;
                    this.page = page;
                    resolve();
                });
            });
        }
    }
</script>
```

项目的运行结果如下：
![image](https://github.com/blank1024/vue-load-select/raw/master/example.gif)

enjoy it!