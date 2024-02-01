/* 
MIT License

Copyright (c) 2023 Siemens AG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const concat = require('concat');
const fs = require('fs-extra');

(async function build() {
  const name = process.env.npm_package_name;
  const version = process.env.npm_package_version;
  const nameWithVersion = `${name}_${version}`

  const files = [
    `./dist/${name}/runtime.js`,
    `./dist/${name}/polyfills.js`,
    `./dist/${name}/scripts.js`,
    `./dist/${name}/main.js`,
  ];

  await fs.ensureDir(`./dist/releases/${nameWithVersion}`);
  await concat(files, `./dist/releases/${nameWithVersion}/${nameWithVersion}.js`);

  await fs.copy(`./dist/${name}/styles.css`, `./dist/releases/${nameWithVersion}/${nameWithVersion}-styles.css`);
  await fs.copy(`./dist/${name}/3rdpartylicenses.txt`, `./dist/releases/${nameWithVersion}/3rdpartylicenses.txt`);
})();
