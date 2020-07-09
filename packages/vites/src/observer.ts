import {obTypes} from './type';

export interface Observer {
    (type: obTypes, time: number | undefined): Promise<number>;
}

let Observer: Observer = function(type, firstHiddenTime) {
    let entryType: string;
    let name: string;

    switch (type) {
        case 'fp':
            entryType = 'paint';
            name = 'first-paint';
            break;
        case 'fcp':
            entryType = 'paint';
            name = 'first-contentful-paint';
            break;
    }

    return new Promise(resolve => {
        function observeCb(
            entries: PerformanceObserverEntryList,
            po: PerformanceObserver
        ) {
            const entriesList: PerformanceEntryList = entries.getEntries();
            const result: PerformanceEntry = entriesList.find(
                item => item.name === name
            );
            // 如果没有后台加载，那么startTime肯定比hiddenTime小
            if (firstHiddenTime > result.startTime) {
                po.disconnect();
                resolve(Math.floor(result.startTime + result.duration));
            } else {
                resolve(null);
            }
        }
        try {
            if (!PerformanceObserver.supportedEntryTypes.includes(entryType)) {
                return;
            }
            const ob = new PerformanceObserver(observeCb);
            // entryTypes 代表 多个类型，也就是类型列表，不能与type和buffered公用
            ob.observe({type: entryType, buffered: true});
        } catch (e) {}
    });
};

export default Observer;
