genome-maps
===========

A new web-based HTML5 genome browser. Genome Maps can also browse BAM and VCFs files among other formats.


## Compiling CSS and JavaScript

BierApp uses [Grunt](http://gruntjs.com/) task runner to build the code and run tests and other convenient tasks. 
To use it, install the required dependencies as directed and then run some Grunt commands. Grunt runs on top of Node.js, it must be installed first.

### Install Node
To install node click [here.](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

**What is `npm`?** npm stands for [node packaged modules](http://npmjs.org/) is the node dependency manager.


### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Navigate to the root `/` directory, then run `npm install`. npm will look at [package.json](package.json) and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the various Grunt commands provided from the command line.

### Available Grunt commands

#### Build - `grunt`
Run `grunt` to build BierApp, compiled files will be located in the `/build` dir.
