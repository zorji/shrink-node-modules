# shrink-node-modules
CLI to shrink node_modules size by removing non-runtime files.

Remove files match patterns defined [here](https://github.com/zorji/shrink-node-modules/blob/main/src/vendor-shrink-list.js).

Inspired by

- https://itnext.io/3x-smaller-lambda-artifacts-by-removing-junk-from-node-modules-2b50780ca1f5

## Usage

```shell
# shrink files
npx shrink-node-modules ./node_modules

# delete ./node_modules/.bin too
npx shrink-node-modules --no-bin ./node_modules
```
