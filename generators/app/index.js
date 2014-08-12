var clc = require('cli-color'),
    fs = require('fs'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    error_col = clc.bold.red.underline,
    warn_col = clc.magentaBright,
    notice_col = clc.yellowBright;

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        // Calling the super constructor is important so our generator is
        // correctly set up
        yeoman.generators.Base.apply(this, arguments);

        // Add custom code here
        this.userAnswers = {};
        this.folderOriginalName = 'demo-pattern-template';
    },

    // Add custom methods here, they will be run in order
    _printContext: function () {
        this.log(this.sourceRoot());
        this.log(this.destinationRoot());
        this.log('-------------------');
        this.log(this.dest);
        this.log(this.src);
    },

    _endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    _getFiles: function (basedir, addeddir, files_) {
        /**
         * Recursively walk over the directory tree and return relative paths
         * to directories and files.
         */
        var wholedir = path.join(basedir, addeddir),
            files = fs.readdirSync(wholedir),
            i = 0;

        files_ = files_ || [];
        if (typeof files_ === 'undefined') {
            files_=[];
        }

        for (i in files) {
            if (!files.hasOwnProperty(i)) {
                continue;
            }

            var name = path.join(wholedir, files[i]),
                newaddeddir = path.join(addeddir, files[i]);

            if (fs.statSync(name).isDirectory()){
                this._getFiles(basedir, newaddeddir, files_);
            } else {
                files_.push(path.join(addeddir, files[i]));
            }
        }

        return files_;
    },

    prompting: {
        welcomeMessage: function () {
            this.log("Please answer the following questions!");
        },

        askPatternName: function () {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'patternName',
                message: 'Your pattern name',
                default: 'MyPlonePattern'
            }, function (answers) {
                this.userAnswers.patternName = answers.patternName;
                this.userAnswers.patternNameLower = answers.patternName
                    .toLowerCase();
                done();
            }.bind(this));
        },

        askVersion: function () {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'version',
                message: 'Version',
                default: '0.0.1'
            }, function (answers) {
                this.userAnswers.version = answers.version;
                done();
            }.bind(this));
        },

    },

    configuring: {
        printContext: function () {
            // this._printContext();
        }
    },

    writing: {
        parseGenerator: function () {
            var files = this._getFiles(this.sourceRoot(), ''),
                i = 0;

            for (i in files) {
                // if it's a template file
                if (files[i].substring(
                        files[i].length - 4, files[i].length) === '.tpl') {

                    var newTemplateName = files[i].replace(
                        this.folderOriginalName,
                        this.userAnswers.patternName
                    );
                    newTemplateName = newTemplateName.substring(0,
                        newTemplateName.length - 4);

                    if (this._endsWith(newTemplateName, 'helloworld.js')) {
                        this.template(
                            files[i],
                            newTemplateName.replace(
                                'helloworld.js',
                                this.userAnswers.patternNameLower + '.js'
                            ),
                            this.userAnswers
                        );
                    } else if (this._endsWith(newTemplateName,
                            'helloworld-demo.html')) {
                        this.template(
                            files[i],
                            newTemplateName.replace(
                                'helloworld-demo.html',
                                this.userAnswers.patternNameLower + '-demo.html'
                            ),
                            this.userAnswers
                        );
                    } else if (this._endsWith(newTemplateName,
                            'test-helloworld.js')) {
                        this.template(
                            files[i],
                            newTemplateName.replace(
                                'test-helloworld.js',
                                ('test' + this.userAnswers.patternNameLower +
                                    '.js')
                            ),
                            this.userAnswers
                        );
                    } else {
                        this.template(
                            files[i],
                            newTemplateName,
                            this.userAnswers
                        );
                    }
                } else {
                    this.copy(
                        files[i],
                        files[i].replace(
                            this.folderOriginalName,
                            this.userAnswers.patternName
                        )
                    );
                }
            }
        },
    },

    end: {
        printAnswers: function () {
            this.log(this.userAnswers);

            // kunta really wants this here, please do not delete ☻
            this.log();
            this.log(notice_col('###############################'));
            this.log(notice_col('#  All done, happy coding! ☻  #'));
            this.log(notice_col('###############################'));
        }
    }

});
