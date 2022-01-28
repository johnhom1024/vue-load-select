<!--
 * @Description: 
 * @Date: 2020-07-11 16:02:44
 * @Author: jawnwa22
 * @LastEditors: handsome_anthony
 * @LastEditTime: 2022-01-28 16:21:21
-->
<template>
    <el-select
        :value="value"
        v-loadmore="loadMore"
        @focus="focus"
        @clear="clear"
        filterable
        remote
        :filter-method="handleSearch"
        :loading="loading"
        clearable
        v-bind="$attrs"
        v-on="$listeners"
    >
        <el-option
            v-for="option in data"
            :label="option[dictLabel]"
            :value="option[dictValue]"
            :key="option.value"
        ></el-option>
        <!-- 此处加载中的value可以随便设置，只要不与其他数据重复即可 -->
        <el-option
            v-if="hasMore"
            disabled
            label="加载中..."
            value="-1"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        value: {
            default: ""
        },
        // 列表数据
        data: {
            type: Array,
            default: () => []
        },
        dictLabel: {
            type: String,
            default: "label"
        },
        dictValue: {
            type: String,
            default: "value"
        },
        // 调用页数的接口
        request: {
            type: Function,
            default: () => {}
        },
        // 传入的页码
        page: {
            type: [Number, String],
            default: 1
        },
        // 是否还有更多数据
        hasMore: {
            type: Boolean,
            default: true
        }
    },
    directives: {
        // 这里实现一个组件内部的自定义指令
        loadmore: {
            // 指令的定义
            bind(el, binding) {
                const SELECTWRAP = el.querySelector(
                    ".el-select-dropdown .el-select-dropdown__wrap"
                );
                if (!SELECTWRAP) {
                    throw new Error('获取不到"el-select-dropdown__wrap"节点');
                }
                SELECTWRAP.addEventListener("scroll", () => {
                    // scrollTop  这里可能因为浏览器缩放存在小数点的情况，导致了滚动到底部时
                    // scrollHeight 减去滚动到底部时的scrollTop ，依然大于clientHeight 导致无法请求更多数据
                    // 这里将scrollTop向上取整 保证滚到底部时，触发调用
                    const CONDITION =
                        SELECTWRAP.scrollHeight -
                            Math.ceil(SELECTWRAP.scrollTop) <=
                        SELECTWRAP.clientHeight;
                    // el.scrollTop !== 0 当输入时，如果搜索结果很少，以至于没看到滚动条，那么此时的CONDITION计算结果是true，会执行bind.value()，此时不应该执行，否则搜索结果不匹配
                    if (CONDITION && SELECTWRAP.scrollTop !== 0) {
                        binding.value();
                    }
                });
            }
        }
    },
    data() {
        return {
            keyword: "", // 存储关键字用
            loading: false
        };
    },
    methods: {
        // 请求下一页的数据
        loadMore() {
            // 如果没有更多数据，则不请求
            if (!this.hasMore) {
                return;
            }
            // 如果intercept属性为true则不请求数据，
            if (this.loadMore.intercept) {
                return;
            }
            this.loadMore.intercept = true;
            this.request({
                page: this.page + 1,
                more: true,
                keyword: this.keyword
            }).then(() => {
                this.loadMore.intercept = false;
            });
        },
        // 选中下拉框没有数据时，自动请求第一页的数据
        focus() {
            if (!this.data.length) {
                this.request({ page: 1 });
            }
        },
        handleSearch(keyword) {
            this.keyword = keyword;
            this.loading = true;
            console.log(keyword);
            this.request({ page: 1, keyword: keyword }).then(() => {
                this.loading = false;
            });
        },
        // 删除选中时，如果请求了关键字，则清除关键字再请求第一页的数据
        clear() {
            if (this.keyword) {
                this.keyword = "";
                this.request({ page: 1 });
            }
        }
    }
};
</script>
