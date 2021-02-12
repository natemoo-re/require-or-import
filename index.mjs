/**
 * Dynamically `require` a CJS file or `import` an ESM file
 *
 * @param {string} id Path to the file to load
 * @returns {Promise<any>}
 */
function requireOrImport(id) {
  return import(id);
}

export default requireOrImport;
