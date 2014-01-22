#jscomplexity


Command-line tool to generate a complexity report on file tree Javascript files. It is based on [complexityReport.js](https://github.com/philbooth/complexityReport.js) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

NB: **/!\** Linux/OS compliant only for now.


###Installation 

<code>npm install [-g] jscomplexity</code>


###Command-line usage

` $ jscr &lt;directory containing JS&gt; [optional : &lt;generated report directory, defaults current&gt;] `

e.g.: 
`$ jscr .`
will generate report in current directory, using it as root for file tree walk-through.


###Module usage

```javascript
var jscr = require('jscomplexity');
// jscr() returns a promise (using bluebird)
jscr('/path/to/js/dir').then(console.log);
```
