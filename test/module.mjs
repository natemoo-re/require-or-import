import { test } from 'uvu';
import { is } from 'uvu/assert';
import requireOrImport from 'require-or-import';

test('requires .cjs file', async () => {
    const value = await requireOrImport('#fixtures/index.cjs');
    is(value.default, 'cjs')
})

test('requires .cjs file with named exports', async () => {
    const value = await requireOrImport('#fixtures/named.cjs');
    is(value.default.name, 'named');
    is(value.name, 'named')
})

test('imports .mjs file', async () => {
    const value = await requireOrImport('#fixtures/index.mjs');
    is(value.default, 'mjs')
})

test('requires .js file with type: commonjs', async () => {
    const value = await requireOrImport('#fixtures/cjs/index.js');
    is(value.default, 'js')
})

test('imports .js file with type: module', async () => {
    const value = await requireOrImport('#fixtures/mjs/index.js');
    is(value.default, 'js')
})

test.run();
