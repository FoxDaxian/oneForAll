<template>
    <div class="app">
        <div class="menu" v-if="curRoute === '/'">
            <div class="item" @click="jumpScroll">scroll-business</div>
            <div class="item" @click="jumpimg">img-onerror</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
    data() {
        return {};
    }
    jumpScroll(): void {
        this.$router.push({
            name: 'scroll'
        });
    }
    jumpimg(): void {
        this.$router.push({
            name: 'imgOnerror'
        });
    }
    get curRoute(): String {
        return this.$route.fullPath;
    }
}
</script>

<style>
body {
    margin: 0;
}
</style>

<style lang="scss" scoped>
.app {
    height: 100vh;
    box-sizing: border-box;
}
</style>
