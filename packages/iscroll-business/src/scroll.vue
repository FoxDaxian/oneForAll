<template>
    <div class="iscrollBusinessWrap" ref="wrap">
        <div class="scroller">
            <div
                v-if="openPullDown"
                class="refreshDefault"
                :style="{
                    opacity: canRefresh ? 1 : stylePercent,
                    transform: `scale(${canRefresh ? 1 : stylePercent})`,
                    height: `${refreshSize}px`,
                    marginTop: canRefresh ? 0 : `-${refreshSize}px`
                }"
            >
                <slot name="refresh">
                    <div class="refresh">
                        默认icon
                    </div>
                </slot>
            </div>
            <slot name="list">
                <div class="listDefault">
                    please insert custom lists
                </div>
            </slot>
            <div
                v-if="openPullUp"
                :class="{loadingDefault: true, [loadStatus]: true}"
            >
                <slot name="loading">
                    <div class="loading">加载中</div>
                    <div class="nomore">没有更多了</div>
                </slot>
            </div>
            <slot name="btmBlock"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import IScroll from 'iscroll/build/iscroll-probe';

interface loadStatusEnum {
    none: string;
    loading: string;
    nomore: string;
}

const loadStatus: loadStatusEnum = {
    none: 'none',
    loading: 'loadingBox',
    nomore: 'nomore'
};
export default {
    name: 'iscrollBusiness',
    props: {
        openPullDown: {
            type: Boolean,
            default: true
        },
        openPullUp: {
            type: Boolean,
            default: true
        },
        refreshSize: {
            type: Number,
            default: 90
        }
    },
    data() {
        return {
            wrap: null,
            myScroll: null,
            refreshH: 0,
            disAndHeiRatio: 0,
            stylePercent: 0,
            canRefresh: false,
            canLoad: false,
            canResetScroll: true,
            loadStatus: loadStatus.none
        };
    },
    mounted() {
        this.wrap = this.$refs.wrap;
        this.scroller = this.wrap.querySelector('.scroller');
        this.myScroll = new IScroll(this.wrap, {
            probeType: 3,
            mouseWheel: true,
            click: true,
            taps: true
        });
        this.init();
    },
    beforeDestroy() {
        this.destroy();
    },
    methods: {
        scrollHandler() {
            pullDownHandler.call(this);
            pullUpHandler.call(this);
            // 监听滚动 触发下面条件会自动回弹
            // 触发的时候修改下面条件(A)之一，A会在scrollEnd中重置
            // 但是，scroll会在触发touchEnd方法后，继续执行，导致死循环
            if (this.canResetScroll && this.myScroll.y > 0) {
                if (this.myScroll.pointY > window.innerHeight - 10) {
                    this.canResetScroll = false;
                    if (this.openPullDown) {
                        touchEnd.call(this);
                    } else {
                        this.myScroll.scrollTo(0, 0, 600);
                        this.onceScrollEnd();
                    }
                }
            }
        },
        scrollEnd() {
            if (!this.canResetScroll) {
                this.canResetScroll = true;
                this.myScroll.off('scrollEnd', this.scrollEnd);
            }
        },
        onceScrollEnd() {
            this.myScroll.on('scrollEnd', this.scrollEnd);
        },
        eventBindForWin(isDestroy: boolean) {
            operateEvent(window, 'resize', resetScroll, isDestroy);
        },
        eventBindForDoc(isDestroy: boolean) {
            operateEvent(document, 'touchmove', preventDefault, isDestroy);
        },
        eventBindForWrap(isDestroy: boolean) {
            operateEvent(this.wrap, 'touchend', touchEnd.bind(this), isDestroy);
        },
        init() {
            this.eventBindForDoc();
            this.eventBindForWin();
            this.myScroll.on('scroll', this.scrollHandler);
            this.eventBindForWrap();
        },
        destroy() {
            this.eventBindForDoc(true);
            this.eventBindForWin(true);
            this.myScroll.off('scroll', this.scrollHandler);
            this.eventBindForWrap(true);
            this.myScroll.destroy();
            this.wrap = this.myScroll = null;
        }
    },
    watch: {
        canRefresh() {
            this.$nextTick(() => {
                this.myScroll.refresh();
            });
        },
        loadStatus() {
            this.$nextTick(() => {
                this.myScroll.refresh();
            });
        }
    }
};

function pullUpHandler(): void {
    if (
        !this.openPullUp ||
        this.canLoad ||
        this.loadStatus === loadStatus.nomore
    ) {
        return;
    }
    const scrollInstance: IScroll = this.myScroll;
    const scrollH: number = this.scroller.clientHeight;
    const wrapH: number = this.wrap.clientHeight;
    const pullupDis: number = wrapH - scrollInstance.y;
    if (scrollH < wrapH) {
        return;
    }
    if (scrollH - pullupDis < 200) {
        this.canLoad = true;
        this.loadStatus = loadStatus.loading;
        this.$emit(
            'onPullUp',
            () => {
                this.canLoad = false;
                this.loadStatus = loadStatus.none;
            },
            () => {
                this.canLoad = false;
                this.loadStatus = loadStatus.nomore;
            }
        );
    }
}

function pullDownHandler(): void {
    if (!this.openPullDown) {
        return;
    }
    const scrollInstance: IScroll = this.myScroll;
    const scrollerChildren: HTMLElement = this.scroller.children;
    const refreshNode: HTMLElement = scrollerChildren[0];
    this.refreshH = refreshNode ? refreshNode.clientHeight : 0;
    if (scrollInstance.y > 0) {
        this.disAndHeiRatio = scrollInstance.y / this.refreshH;
        this.stylePercent = Math.min(this.disAndHeiRatio, 1);
    }
}
function touchEnd(): void {
    if (this.canRefresh) {
        return;
    }
    const scrollInstance: IScroll = this.myScroll;
    if (this.disAndHeiRatio >= 1) {
        scrollInstance.y = scrollInstance.y - this.refreshH;
        scrollInstance.resetPosition(600);
        this.canRefresh = true;
        scrollInstance.disable();
        this.$emit('onPullDown', () => {
            this.onceScrollEnd();
            this.canLoad = false;
            this.loadStatus = loadStatus.none;
            scrollInstance.y = this.refreshH;
            scrollInstance.resetPosition(600);
            this.canRefresh = false;
            scrollInstance.enable();
        });
    }
}

function operateEvent(
    target: HTMLElement | Window | Document,
    event: String,
    cb: Function,
    isDestroy: Boolean
): void {
    const action: any = isDestroy ? 'removeEventListener' : 'addEventListener';
    target[action](
        event,
        cb,
        isPassive()
            ? {
                  capture: false,
                  passive: false
              }
            : false
    );
}
function resetScroll(): void {
    window.scrollTo(0, 0); // https://stackoverflow.com/questions/4117377/how-do-i-hide-the-address-bar-on-iphone/7487346#7487346
}

function preventDefault(e: Event): void {
    e.preventDefault();
}
function isPassive(): Boolean {
    let supportsPassiveOption: Boolean = false;
    try {
        window.addEventListener(
            'test',
            null,
            Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassiveOption = true;
                }
            })
        );
    } catch (e) {}
    return supportsPassiveOption;
}
</script>

<style>
body {
    touch-action: none;
}
</style>
<style lang="scss" scoped>
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
.iscrollBusinessWrap {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        transform: translateZ(0);
        user-select: none;
        text-size-adjust: none;
        .contentDefault {
            color: #e24d48;
        }
        .refreshDefault {
            display: flex;
            justify-content: center;
            align-items: center;
            .refresh {
                position: relative;
                height: 20px;
            }
        }
        .loadingDefault {
            display: flex;
            justify-content: center;
            align-items: center;
            .loading {
                line-height: 30px;
                height: 30px;
            }
            .nomore {
                line-height: 30px;
                height: 30px;
            }
        }
        .none {
            display: none;
        }
        .loadingBox {
            .nomore {
                display: none;
            }
        }
        .nomore {
            .loading {
                display: none;
            }
        }
    }
}
</style>
