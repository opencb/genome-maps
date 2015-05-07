# Overview
Genome Maps is a modern and high-performance web-based HTML5 genome browser. Genome Maps can browse data from [CellBase](https://github.com/opencb/cellbase) and render remote big data from [OpenCGA](https://github.com/opencb/opencga) server such as BAM and VCFs files.

Genome Maps constitutes the genome browser component of [OpenCB](http://www.opencb.org/) for [CellBase](https://github.com/opencb/cellbase) and [OpenCGA](https://github.com/opencb/opencga) data visualization. It is used by other OpenCB projects such as [OpenCGA](https://github.com/opencb/opencga) as well as other external applications such as [ICGC](https://dcc.icgc.org/) or [Babelomics](http://www.babelomics.org/).

Note: This repository is a major refactoring of https://github.com/opencb-bigdata-viz/genome-maps. All users must update to this one.

### Documentation
You can find Genome Maps documentation and tutorials at: https://github.com/opencb/genome-maps/wiki.

### Issues Tracking
You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/genome-maps/issues).

### Release Notes and Roadmap
Releases notes are available at [GitHub releases](https://github.com/opencb/genome-maps/releases).

Roadmap is available at [GitHub milestones](https://github.com/opencb/genome-maps/milestones). You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/genome-maps/issues).

### Versioning
Genome Maps is versioned following the rules from [Semantic versioning](http://semver.org/).

### Maintainers
We recommend to contact Genome Maps developers by writing to OpenCB mailing list opencb@googlegroups.com. The main developers and maintainers are:
* Ignacio Medina (im411@cam.ac.uk) (_Founder and Project Leader_)
* Francisco Salavert (fsalavert@cipf.es)

##### Contributing
Genome Maps is an open-source and collaborative project. We appreciate any help and feeback from users, you can contribute in many different ways such as simple bug reporting and feature request. Dependending on your skills you are more than welcome to develop client tools, new features or even fixing bugs.


# How to build 
Genome Maps is developed in HTML5, therefore it is mainly developed in JavaScript and makes a heavy usage of HTML and CSS. It uses [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) as building tools. Genome Maps requires of [OpenCB JSorolla](https://github.com/opencb/jsorolla) to be built, this is a JavaScript library developed for several OpenCB web-based projects, this can be found as Git submodule in Genome Maps.

Stable releases are merged and tagged at **_master_** branch, you are encourage to use latest stable release for production. Current active development is carried out at **_develop_** branch, only building is guaranteed and bugs are expected, use this branch for development or for testing new functionalities. The only dependency of Genome Maps from OpenCB is JSorolla. Genome Maps **_master_** branch depends on stable branches in JSorolla, while **_develop_** branch of Genome Maps depends on JSorolla **_develop_**.

### Cloning
Genome Maps is an open-source and free project, you can download **_develop_** branch by executing:

    imedina@ivory:~$ git clone https://github.com/opencb/genome-maps.git
    Cloning into 'genome-maps'...
    remote: Counting objects: 2274, done.
    remote: Compressing objects: 100% (16/16), done.
    remote: Total 2274 (delta 5), reused 0 (delta 0), pack-reused 2256
    Receiving objects: 100% (2274/2274), 12.01 MiB | 678.00 KiB/s, done.
    Resolving deltas: 100% (952/952), done.

Latest stable release at **_master_** branch can be downloaded executing:

    imedina@ivory:~$ git clone -b master https://github.com/opencb/genome-maps.git
    Cloning into 'genome-maps'...
    remote: Counting objects: 2274, done.
    remote: Compressing objects: 100% (16/16), done.
    Receiving objects:  13% (296/2274)   
    remote: Total 2274 (delta 5), reused 0 (delta 0), pack-reused 2256
    Receiving objects: 100% (2274/2274), 12.01 MiB | 507.00 KiB/s, done.
    Resolving deltas: 100% (952/952), done.


### Build
We use npm, bower and grunt to build Genome Maps to do so you can execute the following commands:

...

You can copy the content of the _build_ folder into any directory such as _/opt/cellbase_.

### Testing
You can run the unit tests using Maven or your favorite IDE. Just notice that some tests may require of certain database back-ends such as MongoDB and may fail if they are not available.


# Supporters
JetBrains is supporting this open source project with:

[![Intellij IDEA](https://www.jetbrains.com/idea/docs/logo_intellij_idea.png)]
(http://www.jetbrains.com/idea/)
