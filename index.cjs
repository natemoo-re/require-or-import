const { parse } = require('cjs-module-lexer');
const { basename } = require('path');
const { readFileSync } = require('fs');
module.exports = requireOrImport;

/**
 * Dynamically `require` a CJS file or `import` an ESM file
 *
 * @param {string} id Path to the file to load
 * @returns {Promise<any>}
 */
function requireOrImport(id) {
  return new Promise((resolve) => {
    let mdl = undefined;
    try {
      mdl = require(id);
    } catch (e) {
      if (e.code === 'ERR_REQUIRE_ESM') {
        return resolve(import(id));
      }
      throw e;
    }

    /*
     * If we were able to require the `id`, 
     * emulate Node's CJS `import` behavior via `cjs-module-lexer`
     * to ensure consistency across `import` and `require`
     */
    if (mdl) {
      const contents = readFileSync(require.resolve(id)).toString();
      const { exports, reexports } = parse(contents, basename(id));
      const cjs = { default: mdl };
      for (const name of [...exports, ...reexports]) {
        cjs[name] = mdl[name];
      }
      resolve(cjs);
    }
  })
}
