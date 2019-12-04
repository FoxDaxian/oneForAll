interface Binding {
    name: string;
    value: any;
    oldValue: any;
    expression: string;
    arg: string;
    modifiers: Object;
}

interface resolve {
    url: string;
}
export default {
    install(Vue: any): void {
        const imgInfo = (info: Binding): Promise<resolve> => {
            const url = info.value;
            const img: HTMLImageElement = new Image();
            return new Promise((resolve, reject) => {
                img.onload = function() {
                    img.onload = null;
                    resolve({
                        url
                    });
                };
                img.onerror = function() {
                    img.onerror = null;
                    reject(
                        new Error(`v-${info.name} => nest img src is incorrect`)
                    );
                };
                img.src = url;
            });
        };
        Vue.directive('imgOnerror', {
            inserted(el: HTMLImageElement, binding: Binding): void {
                el.onerror = () => {
                    imgInfo(binding).then(
                        (res: resolve) => {
                            el.src = res.url;
                            el.classList.add('imgOnerror');
                        },
                        () => {
                            el.classList.add('imgOnerror-error');
                            throw new Error(
                                `v-${binding.name} => ${binding.expression}.nest img src is incorrect`
                            );
                        }
                    );
                };
            }
        });
    }
};
