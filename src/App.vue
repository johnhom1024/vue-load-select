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
        },
        // 模拟后端接口的API
        requestAPI({ page = 1, size = 10, keyword = "" } = {}) {
            return new Promise(resolve => {
                if (keyword) {
                    setTimeout(() => {
                        resolve({
                            total: 3,
                            page: 1,
                            size: 10,
                            result: [
                                {
                                    label: keyword,
                                    value: 1
                                },
                                {
                                    label: keyword + 1,
                                    value: 2
                                },
                                {
                                    label: keyword + 2,
                                    value: 3
                                }
                            ]
                        });
                    }, 500);
                    return;
                }

                let responseData = [];
                let total = 50; // 假设总共的数据有50条
                for (let index = 1; index <= size; index++) {
                    // serial：处于第几个元素，就显示多少序号
                    let serial = index + (page - 1) * size;
                    if (serial <= 50) {
                        responseData.push({
                            label: serial,
                            value: serial
                        });
                    }
                }
                setTimeout(() => {
                    resolve({
                        total,
                        page,
                        size,
                        result: responseData
                    });
                }, 500);
            });
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
