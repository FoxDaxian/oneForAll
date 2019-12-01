import utils from '../utils';
import glob from 'glob';
import path from 'path';

test('utils.getPkg: 获取所有npm package', () => {
    expect(utils.getPkg()).toMatchObject(
        glob.sync(path.join(process.cwd(), 'packages', '*'))
    );
});
