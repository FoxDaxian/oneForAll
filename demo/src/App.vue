<template>
    <div class="app" ref="app">
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
    mounted() {
        setTimeout(() => {
            const test = document.createElement('p');
            this.$refs.app.appendChild(test);
        }, 2000);
    }
}
</script>

<style>
body {
    margin: 0;
}
</style>

<style lang="scss">
.app {
    height: 100vh;
    box-sizing: border-box;
}
p {
    width: 200px;
    height: 200px;
    background-color: red;
}
</style>
