import enhancedResolve from 'enhanced-resolve';
import pkgDir from 'pkg-dir';
import process from 'process';

const CWD = process.cwd();

/**
 * Our own Node.js resolver that can ignore symlinks resolution and can support PnP
 */
const resolve = enhancedResolve.create.sync({
  symlinks: false,
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  mainFields: ['main', 'source']
});

/**
 * Return the root path (package.json directory) of a given module
 * @param {string} module
 */
const getPackageRootDirectory = module => {
  let packageDirectory;
  let packageRootDirectory;

  try {
    // Get the module path
    packageDirectory = resolve(CWD, module);

    if (!packageDirectory) {
      throw new Error(
        `transpile modules - could not resolve module "${module}". Are you sure the name of the module you are trying to transpile is correct?`
      );
    }

    try {
      // Get the location of its package.json
      packageRootDirectory = pkgDir.sync(packageDirectory);
    } catch (err) {
      throw new Error(
        `transpile modules - an error happened when trying to get the root directory of "${module}". Is it missing a package.json?\n${err}`
      );
    }
  } catch (err) {
    throw new Error(
      `transpile modules - an unexpected error happened when trying to resolve "${module}"\n${err}`
    );
  }

  return packageRootDirectory;
};

/**
 * Resolve modules to their real paths
 * @param {string[]} modules
 */
export const generateModulesPaths = modules => {
  const packagesPaths = modules.map(getPackageRootDirectory);

  return packagesPaths;
};
