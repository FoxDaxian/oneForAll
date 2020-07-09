import {Observer} from './observer';

export default (cb: Observer) => {
    let firstHiddenTime: number =
        document.visibilityState === 'hidden' ? 0 : Infinity;

    document.addEventListener(
        'visibilitychange',
        (event: Event) => {
            firstHiddenTime = Math.min(firstHiddenTime, event.timeStamp);
        },
        {once: true}
    );
    return cb.bind(null, firstHiddenTime);
};
