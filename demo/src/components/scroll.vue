<template>
    <div class="scrollWrap">
        <div class="demo">
            <iscroll-business
                ref="iscrollBusiness"
                :openPullDown="false"
                :refreshSize="40"
                @onPullDown="onPullDown"
                @onPullUp="onPullUp"
            >
                <template v-slot:list>
                    <div
                        class="item"
                        v-for="(list, index) in lists"
                        :key="index"
                    >
                        {{ index }}
                    </div>
                </template>
            </iscroll-business>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class App extends Vue {
    data() {
        const lists = new Array(50).fill(1);
        return {
            lists
        };
    }
    onPullDown(completed: Function) {
        setTimeout(function() {
            completed();
        }, 2000);
    }
    onPullUp(completed: Function, nomore: Function) {
        setTimeout(() => {
            // this.lists = [...this.lists, ...this.lists];
            nomore();
        }, 2000);
    }
    mounted() {}
}
</script>

<style lang="scss" scoped>
.scrollWrap {
    height: 100vh;
    box-sizing: border-box;
    border: 1px solid red;
    .demo {
        height: 100%;
        position: relative;
    }

    .item {
        height: 50px;
        text-align: center;
        border: 1px solid blue;
        box-sizing: border-box;
        line-height: 50px;
    }
}
</style>
