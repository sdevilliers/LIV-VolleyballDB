/**
 * Module Import Guard
 *
 * @TeamName throwIfAlreadyLoaded
 * @param {any} parentModule Parent module.
 * @param {string} moduleName - Module TeamName.
 *
 * @returns {any}
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string): any {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
