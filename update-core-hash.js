/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs').promises;
const execa = require('execa');

(async () => {
  try {
    const coreFileName = 'shared/given-core/given-core.ts';
    const jestCacheOfHashFileName = 'packages/jest-given/.core-version';
    const jasmineCacheOfHashFileName = 'packages/jasmine-given/.core-version';
    const vitestCacheOfHashFileName = 'packages/vitest-given/.core-version';

    const { stdout } = await execa('git', ['hash-object', coreFileName]);
    const latestCoreHash = stdout;

    const jestCachedHash = await fs.readFile(jestCacheOfHashFileName, 'utf8');
    const jasmineCachedHash = await fs.readFile(jasmineCacheOfHashFileName, 'utf8');
    const vitestCachedHash = await fs.readFile(vitestCacheOfHashFileName, 'utf8');

    if (
      jestCachedHash === latestCoreHash &&
      jasmineCachedHash === latestCoreHash &&
      vitestCachedHash === latestCoreHash
    ) {
      console.log('No changes in given-core');
      return;
    }

    await fs.writeFile(jestCacheOfHashFileName, latestCoreHash);
    await fs.writeFile(jasmineCacheOfHashFileName, latestCoreHash);
    await fs.writeFile(vitestCacheOfHashFileName, latestCoreHash);

    console.log(
      'Updated given-core hash to help lerna know that it needs to bump versions'
    );

    // await execa('git', ['add', jestCacheOfHashFileName, jasmineCacheOfHashFileName, vitestCacheOfHashFileName]);

    // const { stdout } = await execa('git', ['commit', '--amend', '--no-edit']);
    console.log(stdout);
  } catch (error) {
    console.error(error);
  }
})();
