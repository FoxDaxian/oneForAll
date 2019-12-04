<template>
    <div class="imgOnerrorWrap">
        <img
            src="https://ra2w.githubusercontent.com/FoxDaxian/FoxDaxian.github.io/master/assets/picgo/20191201165050.png"
            v-imgOnerror="
                'https://raw.githubusercontent.com/FoxDaxian/FoxDaxian.github.io/master/assets/picgo/20191201163946.jpg'
            "
            alt=""
        />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class App extends Vue {
    data() {
        return {};
    }

    mounted() {}
}
</script>

<style lang="scss" scoped>
.imgOnerrorWrap {
}
</style>
