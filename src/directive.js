/**
 * @Description:
 * @Date: 2020-07-11 15:31:09
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2020-07-11 15:34:24
 */

import Vue from "vue";

export default () => {
    // el-select下拉刷新
    Vue.directive("loadmore", {
        bind(el, binding) {
            const SELECTWRAP = el.querySelector(
                ".el-select-dropdown .el-select-dropdown__wrap"
            );
            SELECTWRAP.addEventListener("scroll", function() {
                const CONDITION =
                    this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (CONDITION) {
                    binding.value();
                }
            });
        },
    });
};
