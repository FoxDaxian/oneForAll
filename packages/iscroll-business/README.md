### iscroll-business

##### iscroll for business

```html
<!-- demo -->
<!-- ref="iscrollBusiness": get iscroll-probe instance, so you can absolute control -->
<!-- openPullDown: toggle pull down refresh -->
<!-- refreshSize: refresh block height, necessary if openPullDown is true -->
<iscroll-business
    ref="iscrollBusiness"
    :openPullDown="true"
    :refreshSize="40"
    @onPullDown="onPullDown"
    @onPullUp="onPullUp"
>
    <template v-slot:refresh>
        <div>pull down action: refresh</div>
    </template>
    <template v-slot:list>
        <div
            class="item"
            v-for="(list, index) in lists"
            :key="index"
        >
            {{ index }}
        </div>
    </template>
    <template v-slot:loading>
        <div>pull up action: loading</div>
    </template>
    <template v-slot:btmBlock>
        <div>this block for fixed bottom bar or other fixed block</div>
    </template>
</iscroll-business>
```