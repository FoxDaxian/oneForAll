import 'jest';
import {mount} from '@vue/test-utils';
import Vue from 'vue';
import IScroll from 'iscroll/build/iscroll-probe';
import scroll from '../src/scroll';

describe('vue组件测试', () => {
    test('openpullDown', () => {
        const wrapper = mount(scroll, {
            propsData: {
                openPullDown: false
            }
        });
        expect(wrapper.props().openPullDown).toBe(false);
        expect(wrapper.find('div.refreshDefault').exists()).toBe(false);
    });
    test('myScroll', () => {
        const wrapper = mount(scroll, {});
        expect(wrapper.vm.myScroll.__proto__).toMatchObject(IScroll.prototype);
    });
});
