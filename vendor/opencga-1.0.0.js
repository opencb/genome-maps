/*! Genome Viewer - v1.0.2 - 2013-09-09
* http://https://github.com/opencb-bigdata-viz/js-common-libs/
* Copyright (c) 2013  Licensed GPLv2 */
function UserListWidget (args){
	var _this = this;
	this.id = "UserListWidget_"+ Math.round(Math.random()*10000000);
	this.data = new Array();
	
	this.args = new Object();
	this.timeout = 4000;
	this.pagedViewList = args.pagedViewList;
	this.suiteId=-1;
	this.tools = [];
	
	if (args != null){
        if (args.timeout != null && args.timeout > 4000){
        	this.timeout = args.timeout;
        }
        if (args.suiteId != null){
        	this.suiteId = args.suiteId;
        }
        if (args.tools != null){
        	this.tools = args.tools;
        }
    }
//	console.warn(this.id+' Minimum period is 4000 milliseconds, smaller values will be ignored');
};

UserListWidget.prototype.draw =  function (){
	var _this = this;
	
	this.getResponse();
	this.interval = setInterval(function () {_this.getResponse(); }, this.timeout);
};


UserListWidget.prototype.getData =  function (){
	return this.data;
};

UserListWidget.prototype.getCount = function() {
	return this.data.length;
};

UserListWidget.prototype.getResponse = function(){
	/**Que cada clase hija llame a la funcion de WumDataAdapter que necesite**/
	throw "abstract method must be implemented in child classes";
};

UserListWidget.prototype.render =  function (data){
	/**Que cada clase hija renderize como quiera los datos, ya sea con sencha o con sencho**/
	throw "abstract method must be implemented in child classes";
};

function GenericFormPanel(analysis) {
    this.analysis = analysis;
    this.form = null;
    this.paramsWS = {};
    this.opencgaManager = new OpencgaManager();
    this.panelId = this.analysis + "-FormPanel";
    this.testing = false;

    this.opencgaManager.onRunAnalysis.addEventListener(function (sender, response) {
        if (response.data.indexOf("ERROR") != -1) {
            Ext.Msg.show({
                title: "Error",
                msg: response.data,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else console.log(response.data);
    });
}

GenericFormPanel.prototype.draw = function (args) {
    if (args != null && args.type == "window") {
        Ext.create('Ext.ux.Window', {
            title: args.title || "",
            resizable: args.resizable || false,
            width: args.width || 500,
            height: args.height,
            overflowY: 'auto',
            taskbar: args.taskbar,
            items: this.getForm()
        }).show();
    }
    else {
        return Ext.create('Ext.container.Container', {
            id: this.panelId,
            title: args.title,
            closable: true,
            defaults: {margin: 30},
            autoScroll: true,
            items: this.getForm()
        });
    }
};

GenericFormPanel.prototype.getForm = function () {
    if (this.form == null) {
        var items = this.getPanels();
        items.push(this.getJobPanel());
        items.push(this.getRunButton());

        this.form = Ext.create('Ext.form.Panel', {
            border: false,
            bodyPadding: '5',
            width:'95%',
            layout: 'vbox',
            items: items
        });
    }

    return this.form;
};

GenericFormPanel.prototype.getPanels = function () {
    // To be implemented in inner class
};

GenericFormPanel.prototype.getJobPanel = function () {
    var _this = this;
    var jobNameField = Ext.create('Ext.form.field.Text', {
        id: "jobname",
        name: "jobname",
        fieldLabel: 'Name',
        emptyText: "Job name",
        allowBlank: false,
        margin: '5 0 0 5'
    });

    var jobDescriptionField = Ext.create('Ext.form.field.TextArea', {
        id: "jobdescription",
        name: "jobdescription",
        fieldLabel: 'Description',
        emptyText: "Description",
        margin: '5 0 0 5'
    });

//	var bucketList= Ext.create('Ext.data.Store', {
//		fields: ['value', 'name'],
//		data : [
//		        {"value":"default", "name":"Default"}
//		       ]
//	});
//	var jobDestinationBucket = this.createCombobox("jobdestinationbucket", "Destination bucket", bucketList, 0, 100);
    var jobFolder = this.createOpencgaBrowserCmp({
        fieldLabel: 'Folder:',
        dataParamName: 'outdir',
        mode: 'folderSelection',
        btnMargin: '0 0 0 66',
        defaultFileLabel: 'Default job folder',
        allowBlank: true
    });

    var jobPanel = Ext.create('Ext.panel.Panel', {
        title: 'Job',
        border: true,
        bodyPadding: "5",
        margin: "0 0 5 0",
        width:'99%',
        buttonAlign: 'center',
        items: [jobNameField, jobDescriptionField, jobFolder]
    });

    return jobPanel;
};

GenericFormPanel.prototype.getRunButton = function () {
    var _this = this;
    return Ext.create('Ext.button.Button', {
        text: 'Run',
        width: 300,
        height: 35,
        disabled: true,
        formBind: true, // only enabled if the form is valid
        handler: function () {
            var formParams = _this.getForm().getForm().getValues();
            for (var param in formParams) {
                _this.paramsWS[param] = formParams[param];
            }
            _this.beforeRun();
            _this.run();
        }
    });
};

GenericFormPanel.prototype.setAccountParams = function () {
    this.paramsWS["sessionid"] = $.cookie('bioinfo_sid');
    this.paramsWS["accountid"] = $.cookie('bioinfo_account');
};

GenericFormPanel.prototype.beforeRun = function () {
    // To be implemented in inner class

};

GenericFormPanel.prototype.run = function () {
    this.setAccountParams();
    (this.paramsWS['outdir'] === '') ? delete this.paramsWS['outdir'] : console.log(this.paramsWS['outdir']);

    if(!this.testing){
        this.opencgaManager.runAnalysis(this.analysis, this.paramsWS);
    }

    Ext.example.msg('Job Launched', 'It will be listed soon');
    //debug
    console.log(this.paramsWS);
};


/////////////////////////////////////////
/////////////////////////////////////////
//Functions to create sencha components//
/////////////////////////////////////////
/////////////////////////////////////////
GenericFormPanel.prototype.createCombobox = function (name, label, data, defaultValue, labelWidth, margin) {
    return Ext.create('Ext.form.field.ComboBox', {
        id: name,
        name: name,
        fieldLabel: label,
        store: data,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        value: data.getAt(defaultValue).get('value'),
        labelWidth: labelWidth,
        margin: margin,
        editable: false,
        allowBlank: false
    });
};

GenericFormPanel.prototype.createCheckBox = function (name, label, checked, margin, disabled, handler) {
    return Ext.create('Ext.form.field.Checkbox', {
        id: name,
        name: name,
        boxLabel: label,
        checked: (checked || false),
        disabled: disabled,
        margin: (margin || '0 0 0 0')
    });
};

GenericFormPanel.prototype.createRadio = function (name, group, checked, hidden) {
    var cb = Ext.create('Ext.form.field.Radio', {
        id: name + "_" + this.id,
        boxLabel: name,
        inputValue: name,
        checked: checked,
        name: group,
        hidden: hidden
    });
    return cb;
};

GenericFormPanel.prototype.createLabel = function (text, margin) {
    var label = Ext.create('Ext.form.Label', {
        id: text + "_" + this.id,
        margin: (margin || "15 0 0 0"),
        html: '<span class="emph">' + text + '</span>'
    });
    return label;
};
GenericFormPanel.prototype.createTextFields = function (name) {
    var tb = Ext.create('Ext.form.field.Text', {
        id: name + "_" + this.id,
        fieldLabel: name,
        name: name
//		allowBlank: false
    });
    return tb;
};


GenericFormPanel.prototype.createOpencgaBrowserCmp = function (args) {//fieldLabel, dataParamName, mode, btnMargin, defaultFileLabel
    var _this = this;
    var btnBrowse = Ext.create('Ext.button.Button', {
        text: 'Browse...',
        margin: args.btnMargin || '0 0 0 10',
        handler: function () {
            _this.opencgaBrowserWidget.allowedTypes = args.allowedTypes;
            if(args.beforeClick != null){
                args.beforeClick();
            }
            var listenerIdx = _this.opencgaBrowserWidget.onSelect.addEventListener(function (sender, response) {
                fileSelectedLabel.setText('<span class="emph">' + response.bucketId + '/' + response.id + '</span>', false);
                hiddenField.setValue(response.bucketId + ':' + response.id.replace(/\//g, ":"));//this is send to the ws
                _this.opencgaBrowserWidget.onSelect.removeEventListener(listenerIdx);
            });
            _this.opencgaBrowserWidget.draw(args.mode);
        }
    });

    var fileSelectedLabel = Ext.create('Ext.form.Label', {
        id: args.dataParamName,
        text: args.defaultFileLabel || "No file selected",
        margin: '5 0 0 15'
    });

    //not shown, just for validation
    var hiddenField = Ext.create('Ext.form.field.Text', {
        id: args.dataParamName+'hidden',
        name: args.dataParamName,
        hidden: true,
        allowBlank: (args.allowBlank || false),
        margin: '5 0 0 15'
    });

    return Ext.create('Ext.container.Container', {
//		bodyPadding:10,
//		defaults:{margin:'5 0 0 5'},
        margin: '5 0 5 0',
        items: [
            {xtype: 'label', text: args.fieldLabel, margin: '5 0 0 5'},
            btnBrowse,
            fileSelectedLabel,
            hiddenField
        ]
    });
};

function OpencgaManager(host){

    this.host = OPENCGA_HOST || this.host;
    this.host = host || this.host;

    //deprecated
    //this.host = "http://bioinfo.cipf.es/dqs-naranjoma-ws/rest";
    //if(window.location.host.indexOf("ralonso")!=-1){
    //this.host = "http://ralonso:8080/dqs-naranjoma-ws/rest";
    //}

    /** Events **/
    /*ACCOUNT*/
    this.onGetAccountInfo = new Event(this);
    this.onLogin = new Event(this);
    this.onCreateAccount = new Event(this);
    this.onResetPassword = new Event(this);
    this.onChangePassword = new Event(this);
    this.onChangeEmail = new Event(this);
    this.onLogout = new Event(this);

    /*Bucket*/
    this.onCreateBucket = new Event(this);
    this.onRefreshBucket = new Event(this);
    this.onRenameBucket = new Event(this);
    this.onUploadObjectToBucket = new Event(this);
    this.onDeleteObjectFromBucket = new Event(this);
    this.onCreateDirectory = new Event(this);

    /*Jobs*/
    this.onJobStatus = new Event(this);
    this.onJobResult = new Event(this);
    this.onTable = new Event(this);
    this.onPoll = new Event(this);
    this.onDeleteJob = new Event(this);

    /*ANALYSIS*/
    this.onRunAnalysis = new Event(this);
    this.onIndexer = new Event(this);
    this.onIndexerStatus = new Event(this);

    /*BAM*/
    this.onBamList = new Event(this);
    this.onGetAccountInfo = new Event(this);
    this.onRegion = new Event(this);


    this.onLocalFileList = new Event(this);

    this.onError = new Event(this);
}

OpencgaManager.prototype = {
    host : 'http://ws.bioinfo.cipf.es/opencga/rest',
    getHost : function(){
        return this.host;
    },
    setHost : function(hostUrl){
        this.host = hostUrl;
    },
    doGet : function (url, successCallback, errorCallback){
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: successCallback,
            error: errorCallback
        });
    },
    doPost : function (url, formData, successCallback, errorCallback){
        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: successCallback,
            error: errorCallback
        });
    },
    getQuery : function(paramsWS){
        var query = "";
        for ( var key in paramsWS) {
            if(paramsWS[key]!=null)
                query+=key+'='+paramsWS[key]+'&';
        }
        if(query!='')
            query = "?"+query.slice(0,-1);
        return query;
    },


    getAccountUrl : function(accountId){
        return this.getHost()+'/account/'+accountId;
    },
    getStorageUrl : function(accountId){
        return this.getAccountUrl(accountId)+'/storage';
    },
    getAdminProfileUrl : function(accountId){
        return this.getAccountUrl(accountId)+'/admin/profile';
    },
    getAdminBucketUrl : function(accountId,bucketId){
        return this.getAccountUrl(accountId)+'/admin/bucket/'+bucketId;
    },
    getAdminProjectUrl : function(accountId,projectId){
        return this.getAccountUrl(accountId)+'/admin/project/'+projectId;
    },
    getBucketUrl : function(accountId, bucketId){
        return this.getStorageUrl(accountId)+'/'+bucketId;
    },
    getObjectUrl : function(accountId, bucketId, objectId){
        return this.getStorageUrl(accountId)+'/'+bucketId+'/'+objectId;
    },
    getAnalysisUrl : function(accountId, analysis){
        return this.getAccountUrl(accountId)+'/analysis/'+analysis;
    },
    getJobAnalysisUrl : function(accountId, jobId){
        return this.getAccountUrl(accountId)+'/analysis/job/'+jobId;
    },
    /*ACCOUNT METHODS*/
    createAccount : function (accountId, email, name, password, suiteId){
        var _this = this;
        var queryParams = {
            'name':name,
            'email':email,
            'password':password,
            'suiteid':suiteId
        };
        var url =  this.getAccountUrl(accountId)+'/create'+this.getQuery(queryParams);
        function success(data){
            _this.onCreateAccount.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    login : function(accountId, password, suiteId){
        var _this=this;
        var queryParams = {
            'password':password,
            'suiteid':suiteId
        };
        var url =  this.getAccountUrl(accountId)+'/login'+this.getQuery(queryParams);
        function success(data){
            if(data.indexOf("ERROR") == -1){
                _this.onLogin.notify(JSON.parse(data));
            }else{
                _this.onLogin.notify({errorMessage:data});
            }
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
    },
    logout : function(accountId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAccountUrl(accountId)+'/logout'+this.getQuery(queryParams);
        function success(data){
            _this.onLogout.notify(data);
        }

        function error(data){
            $.cookie('bioinfo_sid', null);
            $.cookie('bioinfo_sid', null, {path: '/'});
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    getAccountInfo : function(accountId, sessionId, lastActivity){
        console.log(lastActivity)
        var _this=this;
        var queryParams = {
            'last_activity':lastActivity,
            'sessionid':sessionId
        };
        var url =  this.getAccountUrl(accountId)+'/info'+this.getQuery(queryParams);
        function success(data){
            if(data.indexOf("ERROR") == -1){
                _this.onGetAccountInfo.notify(JSON.parse(data));
            }else{
                console.log(data);
            }
        }
        function error(data){
            console.log("ERROR: " + data);
            console.log(data);
        }
        this.doGet(url, success, error);
//        console.log(url);
    },
    changePassword : function(accountId, sessionId, old_password, new_password1, new_password2){
        var _this=this;
        var queryParams = {
            'old_password':old_password,
            'new_password1':new_password1,
            'new_password2':new_password2,
            'sessionid':sessionId
        };
        var url =  this.getAdminProfileUrl(accountId)+'/change_password'+this.getQuery(queryParams);
        function success(data){
            _this.onChangePassword.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    resetPassword : function(accountId, email){
        var _this=this;
        var queryParams = {
            'email':email
        };
        var url =  this.getAdminProfileUrl(accountId)+'/reset_password'+this.getQuery(queryParams);
        function success(data){
            _this.onResetPassword.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    changeEmail : function(accountId, sessionId, new_email){
        var _this=this;
        var queryParams = {
            'new_email':new_email,
            'sessionid':sessionId
        };
        var url =  this.getAdminProfileUrl(accountId)+'/change_email'+this.getQuery(queryParams);
        function success(data){
            _this.onChangeEmail.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    /* BUCKET METHODS */
    getBuckets : function(){
        return 'TODO';
    },

    createBucket : function(bucketId, description, accountId, sessionId){
        var _this=this;
        var queryParams = {
            'description':description,
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/create'+this.getQuery(queryParams);
        function success(data){
            _this.onCreateBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    refreshBucket : function(accountId, bucketId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/refresh'+this.getQuery(queryParams);
        function success(data){
            _this.onRefreshBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },

    renameBucket : function(accountId, bucketId, newBucketId, sessionId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getAdminBucketUrl(accountId,bucketId)+'/rename/'+newBucketId+this.getQuery(queryParams);
        function success(data){
            _this.onRenameBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },
    deleteBucket : 'TODO',
    shareBucket : 'TODO',

    uploadObjectToBucket : function(accountId, sessionId, bucketId, objectId, formData, parents){
        var _this=this;
        var queryParams = {
            'parents':(parents || false),
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/upload'+this.getQuery(queryParams);

        function success(data){
            console.log(data);
            _this.onUploadObjectToBucket.notify({status:"done",data:data});
        }

        function error(data){
            _this.onUploadObjectToBucket.notify({status:"fail",data:data});
        }

        this.doPost(url, formData, success, error);
        //	console.log(url);
    },
    createDirectory : function(accountId, sessionId, bucketId, objectId, parents){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        var queryParams = {
            'parents':(parents || false),
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/create_directory'+this.getQuery(queryParams);
        function success(data){
            console.log(data);
            _this.onCreateDirectory.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
    },
    deleteObjectFromBucket : function(accountId, sessionId, bucketId, objectId){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/delete'+this.getQuery(queryParams);

        function success(data){
            console.log(data);
            _this.onDeleteObjectFromBucket.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },
    region : function(accountId, sessionId, bucketId, objectId, region, queryParams){
        objectId = objectId.replace(new RegExp("/", "gi"),":");
        var _this=this;
        queryParams["sessionid"] = sessionId;
        queryParams["region"] = region;
        queryParams["cellbasehost"] = CELLBASE_HOST+'/'+CELLBASE_VERSION;

        if(this.host.indexOf("localhost")!=-1){
            queryParams["region"] = region;
            queryParams["filepath"] = objectId;
            var url =  this.host+'/storage/fetch'+this.getQuery(queryParams);
        }else{
            var url = this.getObjectUrl(accountId,bucketId,objectId)+'/fetch'+this.getQuery(queryParams);
        }


        function success(data){
            if(!(data.substr(0,5).indexOf('ERROR') != -1)){
                _this.onRegion.notify({resource:queryParams["category"],result:JSON.parse(data),filename:objectId,query:region,params:queryParams});
            }
        }

        function error(data){
            console.log("ERROR: " + data);
            console.log(data);
        }

        this.doGet(url, success, error);
        console.log(url);
    },

    /* JOB METHODS */
    jobResult : function(accountId, sessionId, jobId, format){
        var _this=this;
        //@Path("/{accountid}/{bucketname}/job/{jobid}/result.{format}")
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/result.js'+this.getQuery(queryParams);
        //var url = this.getHost() + '/job/'+jobId+'/result.'+format+'?incvisites=true&sessionid='+sessionId;
        function success(data){
            _this.onJobResult.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        	console.log(url);
    },
    jobResultUrl : function(accountId, sessionId, jobId, format){
        var queryParams = {
            'sessionid':sessionId
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/result.js'+this.getQuery(queryParams);
    },
    jobStatus : function(accountId, sessionId,  jobId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/status'+this.getQuery(queryParams);
        function success(data){
            _this.onJobStatus.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        	console.log(url);
    },

    table : function(accountId, sessionId, jobId, filename, colNames, colVisibility){
        var _this=this;
        var queryParams = {
            'filename':filename,
            'colNames':colNames,
            'colVisibility':colVisibility,
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/table'+this.getQuery(queryParams);
        function success(data){
            _this.onTable.notify(data);
        }

        function error(data){
            console.log("ERROR: " + data);
        }

        this.doGet(url, success, error);
        //	console.log(url);
    },

    tableurl : function(accountId, sessionId, jobId, filename, colNames, colVisibility){
        var queryParams = {
            'filename':filename,
            'colNames':colNames,
            'colVisibility':colVisibility,
            'sessionid':sessionId
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/table'+this.getQuery(queryParams);
    },

    poll : function(accountId, sessionId, jobId, filename, zip){
        var _this=this;
        var queryParams = {
            'filename':filename,
            'sessionid':sessionId
        };
        var url;
        if(zip==true){
            url = this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
            open(url);
        }else{
            queryParams['zip']=false;
            url = this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
            function success(data){
                _this.onPoll.notify(data);
            }
            function error(data){
                console.log("ERROR: " + data);
            }
            this.doGet(url, success, error);
        }
        //	console.log(url);
    },

    pollurl : function(accountId, sessionId, jobId, filename){
        var queryParams = {
            'filename':filename,
            'sessionid':sessionId,
            'zip':false
        };
        return this.getJobAnalysisUrl(accountId,jobId)+'/poll'+this.getQuery(queryParams);
        //debugger
    },

    deleteJob : function(accountId, sessionId, jobId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url = this.getJobAnalysisUrl(accountId,jobId)+'/delete'+this.getQuery(queryParams);
        function success(data){
            _this.onDeleteJob.notify(data);
        }
        function error(data){
            console.log("ERROR: " + data);
        }
        this.doGet(url, success, error);
        //	console.log(url);
    },

    downloadJob : function(accountId, sessionId, jobId){
        var queryParams = {
            'sessionid':sessionId
        };
        open(this.getJobAnalysisUrl(accountId,jobId)+'/download'+this.getQuery(queryParams));
    },



    /* ANALYSIS */
    runAnalysis : function(analysis, paramsWS){
        var _this=this;
        var accountId = paramsWS.accountid;
        var queryParams = {
//            'projectId':'default'
        };
        var url = this.getAnalysisUrl(accountId, analysis)+'/run'+this.getQuery(queryParams);
        console.log(url);
        console.log(paramsWS);

        function success(data){
            _this.onRunAnalysis.notify({status:"done",data:data});
        }

        function error(data){
            _this.onRunAnalysis.notify({status:"fail",data:data});
        }

        $.ajax({type:"POST", url:url, data:paramsWS, success:success, error:error});
    },
    indexer : function(accountId, sessionId, bucketId, objectId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId
        };
        var url =  this.getObjectUrl(accountId,bucketId,objectId)+'/index'+this.getQuery(queryParams);
        console.log(url);

        function success(data){
            _this.onIndexer.notify(data);
        }

        function error(data){
            _this.onIndexer.notify(data);
        }
        this.doGet(url, success, error);
    },
    indexerStatus : function(accountId, sessionId, bucketId, objectId, indexerId){
        var _this=this;
        var queryParams = {
            'sessionid':sessionId,
            'indexerid':indexerId
        };
        var url = this.getObjectUrl(accountId,bucketId,objectId)+'/index_status'+this.getQuery(queryParams);
        console.log(url);

        function success(data){
            _this.onIndexerStatus.notify(data);
        }
        function error(data){
            _this.onIndexerStatus.notify(data);
        }
        this.doGet(url, success, error);
    },

    localFileList : function(){
        var _this=this;

        var url = this.host+'/getdirs';
        console.log(url);

        function success(data){
            _this.onLocalFileList.notify(data);
        }

        function error(data){
            _this.onLocalFileList.notify(data);
        }
        this.doGet(url, success, error);
    }
};

function CheckBrowser(appName){

    if(Ext.isIE){
        //console.time implementation for IE
        if(window.console && typeof(window.console.time) == "undefined") {
            console.time = function(name, reset){
                if(!name) { return; }
                var time = new Date().getTime();
                if(!console.timeCounters) { console.timeCounters = {} };
                var key = "KEY" + name.toString();
                if(!reset && console.timeCounters[key]) { return; }
                console.timeCounters[key] = time;
            };

            console.timeEnd = function(name){
                var time = new Date().getTime();
                if(!console.timeCounters) { return; }
                var key = "KEY" + name.toString();
                var timeCounter = console.timeCounters[key];
                if(timeCounter) {
                    var diff = time - timeCounter;
                    var label = name + ": " + diff + "ms";
                    console.info(label);
                    delete console.timeCounters[key];
                }
                return diff;
            };
        }
    }

	var browserOk = false;
	switch (appName){
	case "renato":
		if(Ext.chromeVersion>=16){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
		if(Ext.firefoxVersion>=10){
			browserOk = true;
		}
		break;
	case "variant":
		if(Ext.chromeVersion>=16){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
		if(Ext.firefoxVersion>=10){
			browserOk = true;
		}
		break;
	default:
		if(Ext.chromeVersion>=14){
			browserOk = true;
		}
		if(Ext.safariVersion>=5){
			browserOk = true;
		}
        if(Ext.isIE10>=5){
            browserOk = true;
        }
	}
//if(Ext.operaVersion<=0){
//	browserOk = true;
//}
//if(Ext.firefoxVersion<=0){
//	browserOk = true;
//}
	if(browserOk==false){
		console.log("--------------------------------------------"+browserOk)
//		Ext.create("Ext.window.Window",{
//			title:'Supported browsers',
//		modal:true,
//		resizable:false,
//		bodyStyle:"background:#ffffff;",
//		bodyPadding:15,
//		width:330,
//		height:200,
//			html:'<p>This release makes an intensive use of new web technologies and standards like HTML5, so the browsers that are fully supported from now on are:</p>'+ 
//			'<br><p class="emph">Chrome 14+</p>'+ 
//			'<p class="emph">Safari 5+</p>'+ 
//			'<br>Other browsers or may rise some errors.'
//		}).show();
		$("#checkBrowser")
//		.html('<p>This release makes an intensive use of new web technologies and standards like HTML5 and SVG, so the browsers that are fully supported and will provide the best user experience are:</p>'+ 
//				'<p class="emph">Google Chrome 14+</p>'+ 
//				'<p class="emph">Apple Safari 5+</p>'+ 
//				'Other browsers may rise some errors. Firefox11+ works very slow on Linux and Windows 7 and the usage it is not recommended. Internet Explorer 9 is not supported since they not support many of the features of HTML5, Internet Explorer 10 Consumer Preview works fine.')
		.html('This application provides the best user experience with Google Chrome and Apple Safari, otherwise some latencies may be experienced when browsing due to some problems in Firefox.')
		.css('width','540px')
		.css('height','40px')
		.css('position','absolute')
		.css('margin-left','300px')
		.css('margin-top','26px')
		.css('padding','5px')
		.css('border','1px solid #F1D031')
		.css('background','#FFFFA3')
		.css('color','#555')
		.css('position','absolute')
		.css('z-index','50000')
		.click(function(){
			$("#checkBrowser").fadeOut(function (){ $(this).remove(); });  
		});
	}
}

function HeaderWidget(args){

    _.extend(this, Backbone.Events);

    var _this = this;
    this.id = Utils.genId("HeaderWidget");


	this.targetId;
	this.height = 67;
	this.accountData;

	this.appname="My new App";
	this.description='';
	this.suiteId=-1;
	this.news='';
    this.checkTimeInterval = 4000;
    this.version = '';
    this.allowLogin = true;

    //set instantiation args, must be last
    _.extend(this, args);

	this.adapter = new OpencgaManager();
	
	/** Events **/
	this.onLogin = new Event();
	this.onLogout = new Event();
	this.onGetAccountInfo = new Event();

	/** create widgets **/
	this.loginWidget= new LoginWidget(this.suiteId);
	this.editUserWidget = new ProfileWidget();
	this.uploadWidget = new UploadWidget({suiteId:this.suiteId});//used now from opencga-browser
	this.opencgaBrowserWidget = new OpencgaBrowserWidget({suiteId:this.suiteId});
	
	/**Atach events i listen**/
	this.loginWidget.onSessionInitiated.addEventListener(function(){
		_this.sessionInitiated();
		_this.onLogin.notify();
	});

	this.adapter.onLogout.addEventListener(function(sender, data){
		console.log(data);
		//Se borran todas las cookies por si acaso
		$.cookie('bioinfo_sid', null);
		$.cookie('bioinfo_sid', null, {path: '/'});
		$.cookie('bioinfo_account', null);
		$.cookie('bioinfo_account', null, {path: '/'});
		_this.sessionFinished();
		_this.onLogout.notify();
	});
    this.opencgaBrowserWidget.onNeedRefresh.addEventListener(function(){
        _this.getAccountInfo();
    });
    this.adapter.onGetAccountInfo.addEventListener(function (evt, response){
        if(response.accountId != null){
            _this.setAccountData(response);
            _this.onGetAccountInfo.notify(response);
            console.log("accountData has been modified since last call");
        }
    });

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }
}

HeaderWidget.prototype = {
    setAccountData : function (data){
        this.accountData = data;
        this.opencgaBrowserWidget.setAccountData(data);
        Ext.getCmp(this.id+'textUser').setText(this._getAccountText());
    },
    getAccountInfo : function() {
        var lastActivity = null;
        if(this.accountData != null){
            lastActivity =  this.accountData.lastActivity;
        }
        if(!$.cookie('bioinfo_account')){
            console.log('cookie: bioinfo_account, is not set, session will be finished...');
            this.sessionFinished();
        }else{
            this.adapter.getAccountInfo($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), lastActivity);
        }

    },
    _getAccountText : function(){
        var nameToShow = this.accountData.accountId;
        if(nameToShow.indexOf('anonymous_')!=-1){
            nameToShow='anonymous';
        }
        return 'logged in as <span style="color:darkred">'+nameToShow+'</span>'
    },
    sessionInitiated : function(){
        var _this = this;
        /**HIDE**/
        this.loginWidget.clean();
        Ext.getCmp(this.id+'btnSignin').hide();
        /**SHOW**/
        Ext.getCmp(this.id+'btnLogout').show();
        Ext.getCmp(this.id+'btnEdit').show();
        Ext.getCmp(this.id+'btnOpencga').show();

        /**START OPENCGA CHECK**/
        if(!this.accountInfoInterval){
            this.getAccountInfo();//first call
            this.accountInfoInterval = setInterval(function(){_this.getAccountInfo();}, this.checkTimeInterval);
        }
    },
    sessionFinished : function(){
        /**HIDE**/
        Ext.getCmp(this.id+'btnOpencga').hide();
        Ext.getCmp(this.id+'btnLogout').hide();
        Ext.getCmp(this.id+'btnEdit').hide();
        /**SHOW**/
        Ext.getCmp(this.id+'btnSignin').show();

        Ext.getCmp(this.id+'textUser').setText('');
        /**CLEAR OPENCGA**/
        clearInterval(this.accountInfoInterval);
        delete this.accountInfoInterval;
    },
    setDescription : function (text){
        $("#"+this.id+'description').html(text);
    },
    draw : function(){
        if (!this.rendered) {
            console.info('Header Widget is not rendered yet');
            return;
        }
        var _this = this;

        if($.cookie('bioinfo_sid') != null){
            this.sessionInitiated();
        }else{
            this.sessionFinished();
        }
    },
    getPanel : function (){
        this.draw();
        return this.panel;
    },
    setWidth : function (width){
        this.width=width;
        this.getPanel().setWidth(width);
        this.getPanel().updateLayout();//sencha 4.1.0 : items are not allocated in the correct position after setWidth
    },
    render : function (targetId){
        var _this=this;
        this.targetId = (targetId) ? targetId : this.targetId;
        if ($('#' + this.targetId).length < 1) {
            console.log('targetId not found in DOM');
            return;
        }
        if (this.panel==null){
//		console.log(this.args.suiteId);
            switch(this.suiteId){
                case 11://Renato
                    this.homeLink="http://renato.bioinfo.cipf.es";
                    this.helpLink="http://bioinfo.cipf.es/docs/renato/";
                    this.tutorialLink="http://bioinfo.cipf.es/docs/renato/tutorial";
                    this.aboutText = '';
                    break;
                case 6://Variant
                    this.homeLink="http://variant.bioinfo.cipf.es";
                    this.helpLink="http://docs.bioinfo.cipf.es/projects/variant";
                    this.tutorialLink="http://docs.bioinfo.cipf.es/projects/variant/wiki/Tutorial";
                    this.aboutText = '';
                    break;
                case 9://GenomeMaps
                    this.homeLink="http://www.genomemaps.org";
                    this.helpLink="http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:overview";
                    this.tutorialLink="http://wiki.opencb.org/projects/visualization/doku.php?id=genome-maps:tutorial";
                    this.aboutText = 'Genome Maps is built with open and free technologies like HTML5 and SVG inline, ' +
                        'so no plug-in is needed in modern internet browsers. We’ve focused on providing the ' +
                        'best user experience possible with a modern drag navigation and many features included.<br><br>' +
                        'Genome Maps project has been developed in the <b>Computational Biology Unit</b> led by <b>Ignacio Medina</b>, at <b>Computational Genomic'+
                        ' Institute</b> led by <b>Joaquin Dopazo</b> at CIPF. Two people from my lab deserve special mention for their fantastic job done: '+
                        '<br><b>Franscisco Salavert</b> and <b>Alejandro de Maria</b>.<br><br>'+
                        'Genome Maps has been designed to be easily be embedded in any project with a couple of lines of code,' +
                        ' and it has been implemented as a plugin framework to extend the standard features.<br><br>' +
                        'Supported browsers include: Google Chrome 14+, Apple Safari 5+, Opera 12+ and Mozilla Firefox 14+ ' +
                        '(works slower than in the other browsers). Internet Explorer 10 is under RC and seems to work properly.<br><br>' +
                        'For more information or suggestions about Genome Maps please contact <br><b>Ignacio Medina</b>:  <span class="info">imedina@cipf.es</span>'
                    break;
                case 10://CellBrowser
                    this.homeLink="http://www.cellbrowser.org";
                    this.helpLink="http://docs.bioinfo.cipf.es/projects/cellbrowser";
                    this.tutorialLink="http://docs.bioinfo.cipf.es/projects/cellbrowser/wiki/Tutorial";
                    this.aboutText = '';
                    break;
                case 12://UNTBgen
                    this.homeLink="http://bioinfo.cipf.es/apps/untbgen";
                    this.helpLink="http://bioinfo.cipf.es/ecolopy/";
                    this.tutorialLink="http://bioinfo.cipf.es/ecolopy/";
                    this.aboutText = '';
                    break;
                case 22://Pathiways
                    this.homeLink="http://pathiways.bioinfo.cipf.es";
                    this.helpLink="http://bioinfo.cipf.es/pathiways";
                    this.tutorialLink="http://bioinfo.cipf.es/pathiways/tutorial";
                    this.aboutText = 'PATHiWAYS is built with open and free technologies like HTML5 and SVG inline, ' +
                        'so no plug-in is needed in modern internet browsers<br><br>'+
                        'PATHiWAYS project has been developed in the <b>Computational Biology Unit</b>, at <b>Computational Medicine'+
                        ' Institute</b> at CIPF in Valencia, Spain.<br><br>'+
                        'For more information please visit our web page  <span class="info"><a target="_blank" href="http://bioinfo.cipf.es">bioinfo.cipf.es</a></span>';
                    break;
                default:
                    this.homeLink="http://docs.bioinfo.cipf.es";
                    this.helpLink="http://docs.bioinfo.cipf.es";
                    this.tutorialLink="http://docs.bioinfo.cipf.es";
                    this.aboutText = '';
            }

            var linkbar = new Ext.create('Ext.toolbar.Toolbar', {
                id:this.id+'linkbar',
                dock: 'top',
                cls:'bio-linkbar',
                height:40,
                minHeight:40,
                maxHeight:40,
                items: [{
                    xtype:'tbtext',
                    id:this.id+"speciesTextItem",
                    text:''
                },{
                    xtype:'tbtext',
                    id:this.id+"assemblyTextItem",
                    text:''
                },'->',{
                    id: this.id + "homeButton",
                    text: 'home',
                    handler: function () {
                        window.location.href = _this.homeLink;
                    }
                },{
                    id: this.id + "helpButton",
                    text: 'documentation',
                    handler: function () {
                        window.open(_this.helpLink);
                    }
                },{
                    id: this.id + "tutorialButton",
                    text: 'tutorial',
                    handler: function () {
                        window.open(_this.tutorialLink);
                    }
                },{
                    id: this.id + "aboutButton",
                    text: 'about',
                    handler: function () {
                        Ext.create('Ext.window.Window', {
                            id: _this.id + "aboutWindow",
                            bodyStyle: 'background:#fff; color:#333;',
                            bodyPadding: 10,
                            title: 'About',
                            height: 340,
                            width: 500,
                            modal: true,
                            layout: 'fit',
                            html: _this.aboutText
                        }).show();
                    }
                }]
            });

            var userbar = new Ext.create('Ext.toolbar.Toolbar', {
                id : this.id+'userbar',
                dock: 'top',
                border:false,
//                cls:'bio-userbar',
                cls:'gm-login-bar',
                height:27,
                minHeight:27,
                maxHeight:27,
                layout:'hbox',
                items:[{
                    xtype:'tbtext',
                    id:this.id+'textNews',
                    text:this.news
                },'->',{
                    xtype:'tbtext',
                    id:this.id+'textUser',
                    text:''
                },{
                    id:this.id+'btnOpencga',
                    text: '<span class="emph">Upload & Manage</span>',
                    iconCls: 'icon-project-manager',
                    handler: function() {
                        _this.opencgaBrowserWidget.draw("manager");
                    }
                },{
                    id: this.id+'btnSignin',
                    disabled:!this.allowLogin,
                    text: '<span class="emph">sign in</span>',
                    handler: function (){
                        _this.loginWidget.draw();
                    }
                },{
                    id: this.id+'btnEdit',
                    text: '<span class="emph">profile</span>',
                    handler: function (){
                        _this.editUserWidget.draw();
                    }
                },{
                    id :this.id+'btnLogout',
                    text: '<span class="emph">logout</span>',
                    handler: function (){
                        _this.adapter.logout($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'));
                    }
                }]
            });

            this.panel = Ext.create('Ext.panel.Panel', {
                id:this.id+"panel",
                region: 'north',
                border:false,
                renderTo:this.targetId,
                height : this.height,
                minHeight: this.height,
                maxHeigth: this.height,
                layout:'hbox',
                items:[{
                    xtype:'container',
//                    flex:1,
                    items:[{
                        id: this.id + "appTextItem",
                        xtype: 'tbtext',
                        margin:'25 0 0 20',
                        //		        	html: '<span class="appName">Vitis vinifera&nbsp; '+this.args.appname +'</span> <span class="appDesc">'+this.args.description+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><img height="30" src="http://www.demeter.es/imagenes/l_demeter.gif"></span>',
                        text: '<span class="appName">' + this.appname + '</span> ' +
                            '<span id="' + this.id + 'description" class="appDesc">' + this.description + '</span>' +
                            '<span id="' + this.id + 'version" class="appVersion"></span>' +
                            '',
                        padding: '0 0 0 10',
                        listeners:{
                            afterrender:function(){
                                $("#"+_this.id+"appTextItem").qtip({
                                    content: '<span class="info">'+_this.version+'</span>',
                                    position: {my:"bottom center",at:"top center",adjust: { y: 12, x:-25 }}

                                });
                            }
                        }
                    }]
                },{
                    xtype:'container',
                    flex:2,
                    layout:{type:'vbox',align:'right'},
                    items:[userbar,linkbar]
                }]
            });
        }
        this.rendered = true;
    }
};



JobListWidget.prototype.draw = UserListWidget.prototype.draw;
JobListWidget.prototype.getData = UserListWidget.prototype.getData;
JobListWidget.prototype.getCount = UserListWidget.prototype.getCount;

function JobListWidget (args){
	var _this = this;
	UserListWidget.prototype.constructor.call(this, args);
	this.counter = null;
	var jobstpl = [
					'<tpl for=".">',
					'<div class="joblist-item">',
						'<div style="color:'+
											'<tpl if="visites == 0">green</tpl>'+
											'<tpl if="visites &gt; 0">blue</tpl>'+
											'<tpl if="visites == -1">red</tpl>'+
											'<tpl if="visites == -2">Darkorange</tpl>'+
											'">{name}</div>',
						'<div style="color: #15428B"><i>{date}</i></div>',
						'<div style="color:steelblue"><i>{toolName}</i></div>',
						'<div style="color:grey"><i>',
//						'<tpl if="visites == 0">finished and unvisited</tpl>',
//						'<tpl if="visites &gt; 0">{visites} visites</tpl>',
//						'<tpl if="visites == -1">',
						//'<div style="height:10px;width:{percentage/100*180}px;background:url(\'http://jsapi.bioinfo.cipf.es/ext/sencha/4.0.2/resources/themes/images/default/progress/progress-default-bg.gif\') repeat-x;">&#160;</div>',
						//'{percentage}%',
//						'running, please wait...',
//						'</tpl>',
                        '{status}',
						'<tpl if="visites &gt; -1"> - {visites} views</tpl>',
						'</i>' +
//                        '  - {id}' +
                        '</div>',
					'</div>',
					'</tpl>'
					];

	var	jobsfields = ['commandLine','date','description','diskUsage','status','finishTime','inputData','jobId','message','name','outputData','ownerId','percentage','projectId','toolName','visites'];

	this.pagedViewList.storeFields = jobsfields;
	this.pagedViewList.template = jobstpl;
	
	if (args.pagedViewList != null){
        if (args.pagedViewList.storeFields != null){
        	this.pagedViewList.storeFields = args.pagedViewList.storeFields;       
        }
        if (args.pagedViewList.template != null){
        	this.pagedViewList.template = args.pagedViewList.template;       
        }
    }
	
	this.pagedListViewWidget = new PagedViewListWidget(this.pagedViewList);
	
	this.btnAllId = 	this.id + "_btnAll";
	this.btnActivePrjId = 	this.id + "_btnActivePrj";
	this.btnFinishedId =this.id + "_btnFinished";
	this.btnVisitedId = this.id + "_btnVisited";
	this.btnRunningId = this.id + "_btnRunning";
	this.btnQueuedId = 	this.id + "_btnQueued";
	
	this.projectFilterButton = Ext.create("Ext.button.Button",{
	    id : this.btnActivePrjId,
	    iconCls: 'icon-project-all',
	    tooltip:'Toggle jobs from all projects or active project',
	    enableToggle: true,
	    pressed: false,
	    listeners: {
	    	toggle:function(){
	    	//_this.selectProjectData();
			_this.render();
	    	}
	    }
	});
	
	
	
	this.bar = new Ext.create('Ext.toolbar.Toolbar', {
//		vertical : true,
		id:this.id+"jobsFilterBar",
		dock : 'top',
		items :  [
                  //this.projectFilterButton,
                  {
                	  id : this.btnAllId,
                	  text: ' ',
                	  tooltip:'Total jobs'
                  },
                  {
                	  id : this.btnFinishedId,
                	  text: ' ',
                	  tooltip:'Finished jobs'
                  },
                  {
                	  id : this.btnVisitedId,
                	  text: ' ',
                	  tooltip:'Visited jobs'
                  },
                  {
                	  id : this.btnRunningId,
                	  text: ' ',
                	  tooltip:'Running jobs'
                  },
                  {
                	  id : this.btnQueuedId,
                	  text: ' ',
                	  tooltip:'Queued jobs'
                  }
		]
	});	
	
	Ext.getCmp(this.btnAllId).on('click', this.filter, this);
	Ext.getCmp(this.btnFinishedId).on('click', this.filter, this);
	Ext.getCmp(this.btnVisitedId).on('click', this.filter, this);
	Ext.getCmp(this.btnRunningId).on('click', this.filter, this);
	Ext.getCmp(this.btnQueuedId).on('click', this.filter, this);
	
	this.allData = [];


///*HARDCODED check job status*/
//	var checkJobsStatus = function(){
//		if(_this.accountData != null){
//			var opencgaManager = new OpencgaManager();
//			for ( var i = 0; i < _this.accountData.jobs.length; i++) {
//				if(_this.tools.indexOf(_this.accountData.jobs[i].toolName) != -1){
//					if(_this.accountData.jobs[i].visites<0){
//						opencgaManager.jobStatus($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), _this.accountData.jobs[i].id);
//					}
//				}
//			}
//		}
//	}
//
//	this.accountInfoInterval = setInterval(function(){checkJobsStatus();}, 4000);
//
///*HARDCODED check job status*/

	
};

JobListWidget.prototype.show = function (){
    this.pagedListViewWidget.show();
};
JobListWidget.prototype.hide = function (){
    this.pagedListViewWidget.hide();
};

//override
JobListWidget.prototype.draw = function (){
	
};

JobListWidget.prototype.clean =  function (){
	clearInterval(this.interval);
	if(this.bar.isDescendantOf(Ext.getCmp(this.pagedListViewWidget.panelId))==true){
		Ext.getCmp(this.pagedListViewWidget.panelId).removeDocked(this.bar,false);
	}
	this.pagedListViewWidget.clean();
};

//JobListWidget.prototype.getResponse = function (){
	//this.adapter.listProject($.cookie("bioinfo_sid"), this.suiteId);
//};

JobListWidget.prototype.setAccountData = function (data){

	this.accountData = data;
	console.log("joblistwidget");
	var jobs = [];
    var job;
	for ( var i = 0; i < this.accountData.projects.length; i++) {
        for ( var j = 0; j < this.accountData.projects[i].jobs.length; j++) {
            job = this.accountData.projects[i].jobs[j];
            if(this.tools.indexOf(job.toolName) != -1){
                job.date = Utils.parseDate(job.date);
                jobs.push(job);
            }
        }
	}
	this.data = jobs;
	this.render();
};


JobListWidget.prototype.render =  function (){
	this.pagedListViewWidget.draw(this.getData());
	if(this.bar.isDescendantOf(Ext.getCmp(this.pagedListViewWidget.panelId))==false){
		Ext.getCmp(this.pagedListViewWidget.panelId).addDocked(this.bar);
	}
	
	var jobcount = this.getJobCounter();

	if (jobcount.all == 0) {
		Ext.getCmp(this.btnAllId).hide();
	} else {
		Ext.getCmp(this.btnAllId).show();
	}
	if (jobcount.finished == 0) {
		Ext.getCmp(this.btnFinishedId).hide();
	} else {
		Ext.getCmp(this.btnFinishedId).show();
	}
	if (jobcount.visited == 0) {
		Ext.getCmp(this.btnVisitedId).hide();
	} else {
		Ext.getCmp(this.btnVisitedId).show();
	}
	if (jobcount.running == 0) {
		Ext.getCmp(this.btnRunningId).hide();
	} else {
		Ext.getCmp(this.btnRunningId).show();
	}
	if (jobcount.queued == 0) {
		Ext.getCmp(this.btnQueuedId).hide();
	} else {
		Ext.getCmp(this.btnQueuedId).show();
	}
	Ext.getCmp(this.btnAllId).setText('<b style="color:black;font-size: 1.3em;">'+jobcount.all+'</b>');
	Ext.getCmp(this.btnFinishedId).setText('<b style="color:green;font-size: 1.3em;">'+jobcount.finished+'</b>');
	Ext.getCmp(this.btnVisitedId).setText('<b style="color:blue;font-size: 1.3em;">'+jobcount.visited+'</b>');
	Ext.getCmp(this.btnRunningId).setText('<b style="color:red;font-size: 1.3em;">'+jobcount.running+'</b>');
	Ext.getCmp(this.btnQueuedId).setText('<b style="color:Darkorange;font-size: 1.3em;">'+jobcount.queued+'</b>');				
};


JobListWidget.prototype.getJobCounter = function() {
	var finished = 0;
	var visited = 0;
	var running = 0;
	var queued = 0;
	for (var i =0 ; i < this.getData().length; i++) {
		if (this.getData()[i].visites > 0){
			visited++;
		}else {
			if (this.getData()[i].visites == 0){
				finished++;
			}
			if (this.getData()[i].visites == -1){
				running++;
			}
			if (this.getData()[i].visites == -2){
				queued++;
			}
		}
	}
	return {"all":this.getData().length,"visited": visited, "finished": finished, "running": running, "queued": queued};
};

/**Filters**/
//var functionAssertion = function(item){return item.data.visites > 2;};

JobListWidget.prototype.filter = function (button){
	switch (button.id) {
		case this.btnFinishedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == 0;});
			break;
		case this.btnVisitedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites > 0;});
			break;
		case this.btnRunningId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == -1;});
			break;
		case this.btnQueuedId:
			this.pagedListViewWidget.setFilter(function(item){return item.data.visites == -2;});
			break;
		default:
			this.pagedListViewWidget.setFilter(function(item){return true;});
			break;
	}
	this.pagedListViewWidget.draw(this.getData());
};

JobListWidget.prototype.selectProjectData = function (){
	if(!this.projectFilterButton.pressed){
		for ( var i = 0; i < this.allData.length; i++) {
			if(this.allData[i].active){
				this.data=this.allData[i].jobs;
				break;
			}
		}
	}else{
		var allJobs = new Array();
		for ( var i = 0; i < this.allData.length; i++) {
			if(this.allData[i].jobs!=null){
				for ( var j = 0; j < this.allData[i].jobs.length; j++) {
					
					//TODO care with date order
					allJobs.push(this.allData[i].jobs[j]);
				}
			}
		}
		this.data=allJobs;
	}
	if(this.data==null){
		this.data=[];
	}
	this.pagedListViewWidget.draw(this.getData());
};

function LoginWidget (suiteId, args){
	var _this=this;
	this.id = "LoginWidget_";
	this.targetId = null;
	this.suiteId = suiteId;
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
    }

	/**Events i send**/
	this.onSessionInitiated = new Event(this);

	this.adapter = new OpencgaManager();
	
	/**Atach events i listen**/
	this.adapter.onLogin.addEventListener(function (sender, data){
        if(_this.panel != null){
		    _this.panel.setLoading(false);
        }
		console.log(data);
		if(data.errorMessage == null){
			$.cookie('bioinfo_sid', data.sessionId /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			$.cookie('bioinfo_account', data.accountId);
			$.cookie('bioinfo_bucket', data.bucketId);
			_this.onSessionInitiated.notify();
		}else{
			Ext.getCmp(_this.labelEmailId).setText('<span class="err">'+data.errorMessage+'</span>', false);
			//Delete all cookies
			$.cookie('bioinfo_sid', null);
			$.cookie('bioinfo_sid', null, {path: '/'});
			$.cookie('bioinfo_account',null);
			$.cookie('bioinfo_account', null, {path: '/'});
		}
	});
	this.adapter.onCreateAccount.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
		data = data.replace(/^\s+|\s+$/g, '');
		if(data.indexOf("OK")!=-1){
			Ext.getCmp(_this.labelEmailId).setText('<span class="ok">Account created</span>', false);
//			console.log(_this.id+' LOGIN RESPONSE -> '+data);
			//$.cookie('bioinfo_sid', data /*,{path: '/'}*/);//TODO ATENCION si se indica el path el 'bioinfo_sid' es comun entre dominios
			//_this.onSessionInitiated.notify();
		}else{
			data = data.replace(/ERROR: /gi," ");
			Ext.getCmp(_this.labelEmailId).setText('<span class="err">Account already exists</span>', false);
			//Se borran las cookies por si acaso
			$.cookie('bioinfo_sid', null);
			$.cookie('bioinfo_sid', null, {path: '/'});
			$.cookie('bioinfo_account',null);
			$.cookie('bioinfo_account', null, {path: '/'});
		}
	});
	this.adapter.onResetPassword.addEventListener(function (sender, data){
		_this.panel.setLoading(false);
		Ext.getCmp(_this.labelEmailId).setText('<span class="emph">'+data+'</span>', false);
	});
	
	
	
	/**ID**/
	this.labelEmailId = this.id+"labelEmail";
	this.labelPassId = this.id+"labelPass";
	 
	this.fldEmailId = this.id+"fldEmail";
	this.fldPasswordId = this.id+"fldPassword";
	this.fldNpass1Id = this.id+"fldNpass1";
	this.fldNpass2Id = this.id+"fldNpass2";
	
	this.btnSignId = this.id+"fldSign";
	this.btnAnonymousId = this.id+"btnAnonymous";
	this.btnForgotId =  this.id+"btnForgot";
	this.btnNewaccId =  this.id+"btnNewacc";
	
	this.btnSendId = this.id+"btnSend";
	this.btnBackId = this.id+"btnBack";
	
	this.btnRegisterId =  this.id+"btnRegister";
	
}

LoginWidget.prototype.sign = function (){
	if(Ext.getCmp(this.btnAnonymousId).getValue()){
        this.anonymousSign();
        this.panel.setLoading('Waiting server...');
	}else{
		if(this.checkAccountId()){
            this.adapter.login(this.getLogin(), this.getPassword(), this.suiteId );
			this.panel.setLoading('Waiting server...');
            $.cookie('bioinfo_user', null, {path: '/'});
			$.cookie('bioinfo_user', this.getLogin(), {expires: 7});
		}
	}
};

LoginWidget.prototype.anonymousSign = function (){
    this.adapter.login("anonymous", "", this.suiteId );
};

LoginWidget.prototype.register = function (){ 
	if(this.checkAccountId()  && this.checkemail() && this.checkName() && this.checkpass()){
		this.adapter.createAccount(this.getLogin(), this.getEmail(), this.getAccountName(),this.getPasswordReg(), this.suiteId );
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Fill all fields</span>', false);
	}
};

LoginWidget.prototype.sendRecover = function (){
	if(this.checkAccountId() && this.checkemail()){
		this.adapter.resetPassword(this.getLogin(), this.getEmail());
		this.panel.setLoading('Waiting server...');
	}
};

LoginWidget.prototype.getLogin = function (){
	return Ext.getCmp(this.id+"accountId").getValue();
};
LoginWidget.prototype.getAccountName = function (){
	return Ext.getCmp(this.id+"accountName").getValue();
};
LoginWidget.prototype.getEmail = function (){
	return Ext.getCmp(this.fldEmailId).getValue();
};

LoginWidget.prototype.getPassword = function (){
	return $.sha1(Ext.getCmp(this.fldPasswordId).getValue());
};

LoginWidget.prototype.getPasswordReg = function (){
	return $.sha1(Ext.getCmp(this.fldNpass1Id).getValue());
};

LoginWidget.prototype.draw = function (){
	this.render();		
};

LoginWidget.prototype.clean = function (){
	if (this.panel != null){
		this.panel.destroy();
	}
};

LoginWidget.prototype.render = function (){
	var _this=this;
	if (this.panel == null){
		
		var labelEmail = Ext.create('Ext.toolbar.TextItem', {
			id : this.labelEmailId,
			padding:3,
			text: '<span class="info">Type your account ID and password</span>'
		});
		this.pan = Ext.create('Ext.form.Panel', {
			id : this.id+"formPanel",
			bodyPadding:20,
		    width: 350,
		    height: 145,
		    border:false,
		    bbar:{items:[labelEmail]},
		    items: [{
		    	id: this.id+"accountId",
		    	xtype:'textfield',
		    	value:$.cookie('bioinfo_user'),
		        fieldLabel: 'account ID',
		        hidden: false,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkAccountId
			    }
		    },{
		    	id: this.fldPasswordId,
		    	xtype:'textfield',
		        fieldLabel: 'password',
		        inputType: 'password' ,
//		        emptyText:'please enter your password',
		        listeners:{
					specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	_this.sign();
	                    }
	                }
				}
		    },{
		    	id: this.fldEmailId,
		    	xtype:'textfield',
		        fieldLabel: 'e-mail',
		        hidden: true,
//		        enableKeyEvents: true,
//		        emptyText:'please enter your email',
		        listeners: {
			        change: function(){
			        	_this.checkemail();
			        },
			        specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	_this.sign();
	                    }
	                }
			    }
		    },{
		    	id: this.id+"accountName",
		    	xtype:'textfield',
		        fieldLabel: 'name',
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkName
			    }
		    },{
		    	id: this.fldNpass1Id,
		    	xtype:'textfield',
		        fieldLabel: 'password',
		        inputType: 'password' ,
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    },{
		    	id: this.fldNpass2Id,
		    	xtype:'textfield',
		        fieldLabel: 're-password',
		        inputType: 'password' ,
		        hidden: true,
//		        enableKeyEvents: true,
		        listeners: {
			        scope: this,
			        change: this.checkpass
			    }
		    },{
		    	id: this.btnAnonymousId,
		    	xtype:'checkboxfield',
		    	padding:"10 0 0 0",
		    	boxLabel:'Anonymous login <p class="tip s90">Your work will be lost after logout</p>',
		    	margin:"0 0 0 50",
		    	listeners:{
					change:function(me, newValue, oldValue, eOpts){
						if(newValue){
							Ext.getCmp(_this.id+"accountId").disable();
							Ext.getCmp(_this.fldPasswordId).disable();
						}else{
							Ext.getCmp(_this.id+"accountId").enable();
							Ext.getCmp(_this.fldPasswordId).enable();
						}
					}
				}
		    }
		    ]
		});
		
		this.panel = Ext.create('Ext.window.Window', {
			id : this.id+"windowPanel",
		    title: 'Sign in',
		    resizable: false,
		    minimizable :true,
			constrain:true,
		    closable:true,
		    modal:true,
		    items:[this.pan],
		    buttonAlign:'center',
		    buttons:[{
		    	id: this.btnSignId,
		    	text:'Sign in'
		    },{
		    	id: this.btnForgotId,
		    	text:'Forgot yout password?',
		    	width:130,
		    	minWidth:130
		    },{
		    	id: this.btnNewaccId,
		    	text:'New account',
		    	width:100,
		    	minWidth:100
		    },{
				id : this.btnSendId,
				text:'Send',	
				hidden: true
			},{ 
				id : this.btnRegisterId,
				text:'Register',
				hidden: true
			},{ 
				id : this.btnBackId,
				text:'Back',
				hidden: true
			}
		    ],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.hide();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
		
		Ext.getCmp(this.btnForgotId).on('click', this.ShowForgot, this);
		Ext.getCmp(this.btnBackId).on('click', this.ShowBack, this);
		Ext.getCmp(this.btnNewaccId).on('click', this.ShowNewacc, this);
		
		Ext.getCmp(this.btnSignId).on('click', this.sign, this);
		Ext.getCmp(this.btnSendId).on('click', this.sendRecover, this);
		Ext.getCmp(this.btnRegisterId).on('click', this.register, this);
		Ext.getCmp(this.btnAnonymousId).on('change', this.anonymousSelected, this);
	}
	this.panel.show();
};

LoginWidget.prototype.ShowForgot = function (){
	Ext.getCmp(this.fldEmailId).reset();
	Ext.getCmp(this.fldEmailId).show();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).hide();
	Ext.getCmp(this.btnAnonymousId).hide();
	Ext.getCmp(this.fldNpass1Id).hide();
	Ext.getCmp(this.fldNpass2Id).hide();
	
	Ext.getCmp(this.btnSignId).hide();
	Ext.getCmp(this.btnForgotId).hide();
	Ext.getCmp(this.btnNewaccId).hide();
	
	Ext.getCmp(this.btnSendId).show();
	Ext.getCmp(this.btnBackId).show();
	Ext.getCmp(this.btnRegisterId).hide();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").hide();
	
	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and email to send a new password</span>', false);
	Ext.getCmp(this.id+"formPanel").setHeight(145);

	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
	Ext.getCmp(this.fldEmailId).setFieldLabel('e-mail', false);
};
LoginWidget.prototype.ShowBack = function (){
	Ext.getCmp(this.fldEmailId).hide();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).show();
	Ext.getCmp(this.btnAnonymousId).show();
	Ext.getCmp(this.fldNpass1Id).hide();
	Ext.getCmp(this.fldNpass2Id).hide();
	
	Ext.getCmp(this.btnSignId).show();
	Ext.getCmp(this.btnForgotId).show();
	Ext.getCmp(this.btnNewaccId).show();
	
	Ext.getCmp(this.btnSendId).hide();
	Ext.getCmp(this.btnBackId).hide();
	Ext.getCmp(this.btnRegisterId).hide();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").hide();

	Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and password</span>', false);
	Ext.getCmp(this.id+"formPanel").setHeight(145);

	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
};
LoginWidget.prototype.ShowNewacc = function (){
	
	Ext.getCmp(this.fldEmailId).reset();
	Ext.getCmp(this.fldEmailId).show();
	Ext.getCmp(this.fldPasswordId).reset();
	Ext.getCmp(this.btnAnonymousId).reset();
	Ext.getCmp(this.fldNpass1Id).reset();
	Ext.getCmp(this.fldNpass2Id).reset();
	
	Ext.getCmp(this.fldPasswordId).hide();
	Ext.getCmp(this.btnAnonymousId).hide();
	Ext.getCmp(this.fldNpass1Id).show();
	Ext.getCmp(this.fldNpass2Id).show();
	
	Ext.getCmp(this.btnSignId).hide();
	Ext.getCmp(this.btnForgotId).hide();
	Ext.getCmp(this.btnNewaccId).hide();
	
	Ext.getCmp(this.btnSendId).hide();
	Ext.getCmp(this.btnBackId).show();
	Ext.getCmp(this.btnRegisterId).show();

	Ext.getCmp(this.id+"accountId").reset();
	Ext.getCmp(this.id+"accountName").reset();
	Ext.getCmp(this.id+"accountName").show();
	
	Ext.getCmp(this.labelEmailId).setText('&nbsp;', false);
	Ext.getCmp(this.id+"formPanel").setHeight(200);
	
	Ext.getCmp(this.id+"accountName").setFieldLabel('name', false);
	Ext.getCmp(this.id+"accountId").setFieldLabel('account ID', false);
	Ext.getCmp(this.fldEmailId).setFieldLabel('e-mail', false);
	Ext.getCmp(this.fldNpass1Id).setFieldLabel('password', false);
	Ext.getCmp(this.fldNpass2Id).setFieldLabel('re-password', false);
	Ext.getCmp(this.id+"accountId").setValue("");
};

LoginWidget.prototype.checkpass = function (){
	var passwd1 = Ext.getCmp(this.fldNpass1Id).getValue();
	var passwd2 = Ext.getCmp(this.fldNpass2Id).getValue();
	var patt = new RegExp("[ *]");
	
		if(!patt.test(passwd1) && passwd1.length > 3){
			if (passwd1 == passwd2){
				Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="ok">password</span>', false);
				Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="ok">re-password</span>', false);
				Ext.getCmp(this.labelEmailId).setText('&nbsp;', false);
				return true;
			}else{
				Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="err">password</span>', false);
				Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="err">re-password</span>', false);
				Ext.getCmp(this.labelEmailId).setText('<span class="err">Password does not match</span>', false);
				return false;
			}
		}else{
			Ext.getCmp(this.fldNpass1Id).setFieldLabel('<span class="err">password</span>', false);
			Ext.getCmp(this.fldNpass2Id).setFieldLabel('<span class="err">re-password</span>', false);
			Ext.getCmp(this.labelEmailId).setText('<span class="err">Password minimum length is 4</span>', false);
			return false;
		}
};

LoginWidget.prototype.anonymousSelected = function (este,value){ 
	if(value){
		Ext.getCmp(this.labelEmailId).setText('<span class="ok">Anonymous selected</span>', false);
	}else{
		Ext.getCmp(this.labelEmailId).setText('<span class="info">Type your account ID and password</span>', false);
	}
	
};

LoginWidget.prototype.checkemail = function (a,b,c){
	Ext.getCmp(this.btnAnonymousId).reset();
	var email = Ext.getCmp(this.fldEmailId).getValue();
	var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (patt.test(email)){
        Ext.getCmp(this.fldEmailId).setFieldLabel('<span class="ok">e-mail</span>', false);
        return true;
    }else{
        Ext.getCmp(this.fldEmailId).setFieldLabel('<span class="err">e-mail</span>', false);
        return false;
    }
};
LoginWidget.prototype.checkName = function (a,b,c){
	var name = Ext.getCmp(this.id+"accountName").getValue();
	if(name!="" && name!=null){
		Ext.getCmp(this.id+"accountName").setFieldLabel('<span class="ok">name</span>', false);
		return true;
	}else{
		Ext.getCmp(this.id+"accountName").setFieldLabel('<span class="err">name</span>', false);
		return false;
	}
};
LoginWidget.prototype.checkAccountId = function (a,b,c){
	var accountId = Ext.getCmp(this.id+"accountId").getValue();
	if(accountId!="" && accountId!=null){
		Ext.getCmp(this.id+"accountId").setFieldLabel('<span class="ok">account ID</span>', false);
		return true;
	}else{
		Ext.getCmp(this.id+"accountId").setFieldLabel('<span class="err">account ID</span>', false);
		return false;
	}
};

function OpencgaBrowserWidget(args) {
    var _this = this;
    if (typeof args != 'undefined') {
        this.targetId = args.targetId || this.targetId;
        this.title = args.title || this.title;
        this.width = args.width || this.width;
        this.height = args.height || this.height;
    }

    this.adapter = new OpencgaManager();
    this.adapter.onCreateBucket.addEventListener(function (sender, data) {
        if (data.indexOf("ERROR") != -1) {
            Ext.Msg.alert("Create project", "ERROR: could not create this project.");
        } else {
            _this.onNeedRefresh.notify();
        }
        _this.panel.setLoading(false);
        Ext.getBody().unmask();
    });

    this.uploadWidget = new UploadWidget({suiteId: args.suiteId, opencgaBrowserWidget: this});

    this.uploadWidget.adapter.onUploadObjectToBucket.addEventListener(function (sender, res) {
        if (res.status == 'done') {
            _this.onNeedRefresh.notify();
        }
    });
    /**ID**/
    this.searchFieldId = this.id + "_searchField";
}

OpencgaBrowserWidget.prototype = {
    /* Default properties */
    id: "OpencgaBrowserWidget_" + Math.round(Math.random() * 10000000),
//	targetId:undefined,
    title: 'Cloud data',
    onSelect: new Event(this),
    onNeedRefresh: new Event(this),
    width: 800,
    height: 375,
    rendered: false,
//    selectedFolderNode:undefined,
//    selectedFileNode:undefined,//can be set by the tree panel or the grid panel

    /* Methods */
    draw: function (mode) {
        //Ext.getBody().mask("Loading...");
        //this.adapter.getData(sessionID, -1);
        this.render(mode);
        this.rendered = true;
    },

    setAccountData: function (data) {
        this.accountData = data;
        if (this.rendered) {
            this._updateFolderTree();
        }
    },

    _updateFolderTree: function () {
        var _this = this;
        console.log("updating folder tree");
        var find = function (str, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].text == str) {
                    return i;
                }
            }
            return -1;
        };

        if (this.accountData != null && this.accountData.accountId != null) {
            this.folderStore.getRootNode().removeAll();
            this.allStore.getRootNode().removeAll();
            this.filesStore.removeAll();
//            this.folderTree.getSelectionModel().deselectAll();
            for (var i = 0; i < this.accountData.buckets.length; i++) {
                var folders = [];
                for (var j = 0; j < this.accountData.buckets[i].objects.length; j++) {
                    var data = this.accountData.buckets[i].objects[j];
                    data["bucketId"] = this.accountData.buckets[i].id;
                    //sencha uses id so need to rename to oid, update: sencha can use id but dosent like char '/' on the id string

                    if (data.id != null) {
                        data["oid"] = data.id;
                        delete data.id;
                    }
                    var pathArr = data.oid.split("/");
                    if (data.fileType == "dir") {
                        data["expanded"] = true;
                        data["icon"] = Utils.images.dir;
                    } else {
                        data["leaf"] = true;
                        data["icon"] = Utils.images.r;
                    }
                    //console.log(pathArr)

                    var current = folders;
                    for (var k = 0; k < pathArr.length; k++) {
                        var found = find(pathArr[k], current);
                        if (found != -1) {
                            current = current[found].children;
                        } else {
                            var children = [];
                            var idx = current.push({text: pathArr[k], children: children}) - 1;
                            if (typeof pathArr[k + 1] == 'undefined') {//isLast
                                for (key in data) {
                                    if (key != "children") {
                                        current[idx][key] = data[key];
                                    }
                                }
                            }
                            current = children;
                        }
                    }
                }
                folders = JSON.stringify(folders);
                this.allStore.getRootNode().appendChild({text: this.accountData.buckets[i].name, bucketId: this.accountData.buckets[i].name, oid: "", icon: Utils.images.bucket, expanded: true, isBucket: true, children: JSON.parse(folders)});
                this.folderStore.getRootNode().appendChild({text: this.accountData.buckets[i].name, bucketId: this.accountData.buckets[i].name, oid: "", icon: Utils.images.bucket, expanded: true, isBucket: true, children: JSON.parse(folders)});
            }
        }

        //collapse and expand to update the view after append, possible ExtJS 4.2.0 bug
        this.folderStore.getRootNode().collapse();
        this.folderStore.getRootNode().expand();


        //reselect nodes after account update
        if (this.selectedFolderNode != null) { //devuelve el value y el field porque el bucket no tiene oid
            var lastNode = this.folderTree.getRootNode().findChild(this.selectedFolderNode.field, this.selectedFolderNode.value, true);
            if (lastNode != null) {
                this.folderTree.getSelectionModel().select(lastNode);
            }
        }
        if (this.selectedFileNode != null) { //devuelve el value y el field porque el bucket no tiene oid
            var index = this.filesGrid.getStore().findExact('oid', this.selectedFileNode.oid);
            if (index != -1) {
                this.filesGrid.getSelectionModel().select(index);
            }
        }
    },

    addUpload: function (file, fileuploadWorker) {
        var pbar = Ext.create('Ext.ProgressBar', {
            text: 'Ready',
            width: 250,
            margin: '4 6 0 6'
        });
        var nameBox = Ext.create('Ext.Component', {
            html: file.name.substr(0, 67),
            width: 430,
            margin: '7 6 0 6'
        });
//        #ffffd6  amarillete
        // #1155cc azulete
        var btn = Ext.create('Ext.Button', {
            text: '<span style="color:#1155cc">Cancel</span>',
            margin: '3 6 0 4',
            width: 50,
            handler: function () {
                fileuploadWorker.terminate();
                cont.destroy();
            }
        });
        var cont = Ext.create('Ext.container.Container', {
            padding: '3 6 0 6',
            layout: 'hbox',
            items: [nameBox, pbar, btn]
        });
        fileuploadWorker.onmessage = function (e) {
            var res = e.data;
            console.log("@@@@@@@@@@@@@@@@ WORKER event message");
            console.log(res);
            pbar.updateProgress((res.chunkId + 1) / res.total, 'uploading part ' + (res.chunkId + 1) + ' of ' + res.total, false);
            if (res.finished == true) {
                btn.setText('<span style="color:#1155cc">Done </span>');
            }
//            _this.adapter.onIndexer(function(data){
//                console.log(data);
//            });
//            _this.adapter.indexer($.cookie("bioinfo_account"),objectId);
        };
        this.activeUploadsCont.add(cont);
        Ext.getCmp(this.id + 'activeUploadsButton').toggle(true);
    },
    viewBuckets: function () {
        var _this = this;
        _this.panel.removeAll(false);
        _this.panel.add(_this.panAccordion);
        _this.panel.add(_this.filesGrid);

    },
    viewUploads: function () {
        var _this = this;
        _this.panel.removeAll(false);
        _this.panel.add(_this.activeUploadsCont);
    }
    //endclass
};

OpencgaBrowserWidget.prototype.render = function (mode) {
    var _this = this;
    if (this.panel == null) {

        this.folderStore = Ext.create('Ext.data.TreeStore', {
            id:this.id+'folderStore',
            fields: ['text', 'oid'],
            root: {
                expanded: true,
                text: 'Drive',
                children: []
            },
            listeners: {
                beforeappend: function (este, node) {
                    if (node.isLeaf()) {
//                        console.log(node.raw.oid + " is a file");
                        return false; //cancel append because is leaf
                    }
                }
            }
        });
        this.allStore = Ext.create('Ext.data.TreeStore', {
            id:this.id+'allStore',
            fields: ['text', 'oid'],
            root: {
                expanded: true,
                text: 'Drive',
                children: []
            }
        });
        this.filesStore = Ext.create('Ext.data.Store', {
            fields: ['oid', 'fileBioType', 'fileType', 'fileFormat', 'fileName', 'multiple', 'diskUsage', 'creationTime', 'responsible', 'organization', 'date', 'description', 'status', 'statusMessage', 'members'],
            data: []
        });

        var refreshBucketAction = Ext.create('Ext.Action', {
            icon: Utils.images.refresh,
            text: 'Refresh bucket',
            handler: function(widget, event) {
                var record = _this.folderTree.getSelectionModel().getSelection()[0];
                if (record) {
                    if (record.raw.isBucket) {
                        var opencgaManager = new OpencgaManager();
                        opencgaManager.onRefreshBucket.addEventListener(function (sender, res) {
                            Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
                            if (res.indexOf("ERROR") != -1) {
                                console.log(res);
                            } else {
                                _this.onNeedRefresh.notify();
                            }
                        });
                        opencgaManager.refreshBucket($.cookie("bioinfo_account"), record.raw.text, $.cookie("bioinfo_sid"));
                    }
                }
            }
        });

        var renameBucketAction = Ext.create('Ext.Action', {
//            icon: Utils.images.refresh,
            text: 'Rename bucket',
            handler: function(widget, event) {
                var record = _this.folderTree.getSelectionModel().getSelection()[0];
                if (record) {
                    if (record.raw.isBucket) {
                        Ext.Msg.prompt('Rename bucket', 'Please enter a new name:', function (btn, text) {
                            if (btn == 'ok') {
                                text = text.replace(/[^a-z0-9-_.\/\s]/gi, '').trim();

                                var opencgaManager = new OpencgaManager();
                                opencgaManager.onRenameBucket.addEventListener(function (sender, res) {
                                    Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
                                    if (res.indexOf("ERROR") != -1) {
                                        console.log(res);
                                    } else {
                                        _this.onNeedRefresh.notify();
                                    }
                                });
//                                accountId, bucketId, newBucketId, sessionId
                                opencgaManager.renameBucket($.cookie("bioinfo_account"), record.raw.bucketId, text, $.cookie("bioinfo_sid"));
                            }
                        }, null, null, "new name");
                    }
                }
            }
        });

        this.folderTree = Ext.create('Ext.tree.Panel', {
            //xtype:"treepanel",
            id: this.id + "activeTracksTree",
            title: "Upload & Manage",
            bodyPadding: "5 0 0 0",
            margin: "-1 0 0 0",
            border: false,
            autoScroll: true,
            flex: 4,
            useArrows: true,
            rootVisible: false,
            hideHeaders: true,
//			selType: 'cellmodel',
            //plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2,listeners:{
            //edit:function(editor, e, eOpts){
            //var record = e.record; //en la vista del cliente
            /*todo, ahora q llame la servidor. y lo actualize*/
            //}
            //}})],
            columns: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    flex: 1,
                    editor: {xtype: 'textfield', allowBlank: false}
                }
//                ,
//                {
//                    xtype: 'actioncolumn',
//                    menuDisabled: true,
//                    align: 'center',
//                    width: 30,
//                    renderer: function (value, metaData, record) {
//                        if (record.raw.isBucket) {
//                            this.icon = Utils.images.refresh;
//                            this.tooltip = 'Refresh bucket to find new files';
//                        } else {
//                            this.tooltip = null;
//                            this.icon = null;
//                        }
//                    },
//                    handler: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
//                        if (record.raw.isBucket) {
//                            var opencgaManager = new OpencgaManager();
//                            opencgaManager.onRefreshBucket.addEventListener(function (sender, res) {
//                                Ext.example.msg('Refresh Bucket', '</span class="emph">' + res + '</span>');
//                                if (res.indexOf("ERROR") != -1) {
//                                    console.log(res);
//                                } else {
//                                    _this.onNeedRefresh.notify();
//                                }
//                            });
//                            opencgaManager.refreshBucket($.cookie("bioinfo_account"), record.raw.text, $.cookie("bioinfo_sid"));
//                        }
//
//                    }
//                }
            ],
            viewConfig: {
                markDirty: false,
                plugins: {
                    ptype: 'treeviewdragdrop'
                },
                listeners: {
                    drop: function (node, data, overModel, dropPosition, eOpts) {
                        var record = data.records[0];
                        //check if is leaf and if the record has a new index
                        if (record.isLeaf() && record.data.index != record.removedFrom && record.data.checked) {
                            var id = record.data.trackId;
                            _this.setTrackIndex(id, record.data.index);
                        }
                    },
                    itemcontextmenu: function(este, record, item, index, e) {
                        e.stopEvent();
                        var items = [];
                        console.log(record)
                        if (record.raw.isBucket) {
                            items.push(refreshBucketAction);
                            items.push(renameBucketAction);
                            var contextMenu = Ext.create('Ext.menu.Menu', {
                                items: items
                            });
                            contextMenu.showAt(e.getXY());
                        }
                        return false;
                    }
                }
            },
            listeners: {
                selectionchange: function (este, selected, eOpts) {
                    var record = selected[0];
                    if (typeof record != 'undefined') {//avoid deselection
                        var field, deep;
                        if (record.raw.isBucket != null) {//is a bucket
                            field = 'text';
                            deep = false;
                        } else {
                            field = 'oid';
                            deep = true;
                        }
                        var node = _this.allStore.getRootNode().findChild(field, record.raw[field], deep);
                        var childs = [];
                        _this.selectedFolderNode = {value: node.data[field], field: field};
                        node.eachChild(function (n) {
                            childs.push(n.raw);
                        });
                        _this.filesGrid.setTitle(node.getPath("text", " / "));
                        _this.filesStore.loadData(childs);
                        if (mode == "folderSelection") {
                            _this.selectedFileNode = node.raw;
                            _this.selectButton.enable();
                        }
                    }
                },
                viewready: function (este, eOpts) {//Fires when the grid view is available (use this for selecting a default row).
                    setTimeout(function(){ // forced to do this because some ExtJS 4.2.0 event problem
                        var node = este.getRootNode().getChildAt(0);
                        if (typeof node != 'undefined') {
                            este.getSelectionModel().select(node);
                        }
                    },0);
                },
                checkchange: function (node, checked) {
                },
                itemmouseenter: function (este, record) {
                },
                itemmouseleave: function (este, record) {
                }
            },
            store: this.folderStore
        });


        /*MANAGE BUCKETS*/
        var newProjectButton = Ext.create('Ext.button.Button', {
            text: 'OK',
            handler: function () {
                _this.createProject();
                _this.folderTree.toggleCollapse();
                //manageProjects.toggleCollapse();
            }
        });
        var newProjectNameField = Ext.create('Ext.form.field.Text', {
            id: this.id + "newProjectNameField",
//        	width: 160,
            emptyText: 'name',
            allowBlank: false
        });
        var newProjectDescriptionField = Ext.create('Ext.form.field.TextArea', {
            id: this.id + "newProjectDescriptionField",
//        	width: 160,
            emptyText: 'description'
        });
        var newProjectCont = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: { type: 'hbox', align: 'stretch'},
            items: [newProjectNameField, newProjectDescriptionField]
        });
        var manageProjects = Ext.create('Ext.panel.Panel', {
            title: "Create bucket",
            bodyPadding: 5,
            border: false,
            items: [newProjectNameField, newProjectDescriptionField, newProjectButton]
        });
        /*END MANAGE PROJECTS*/





        /*Files grid*/
        var indexAction = Ext.create('Ext.Action', {
            icon   : Utils.images.info,  // Use a URL in the icon config
            text: 'Create index',
//            disabled: true,
            handler: function(widget, event) {
                var record = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (record) {
                    var opencgaManager = new OpencgaManager();
                    opencgaManager.onIndexer.addEventListener(function (sender, response) {
                        console.log(response);
                        Ext.example.msg("indexer", response);
                        record.raw.indexerId = response;
//                                if (response.indexOf("ERROR:") != -1){
//                                }else{
//                                    //delete complete
////                                    record.destroy();
//                                    _this.onNeedRefresh.notify();
//                                }
                    });
                    opencgaManager.indexer($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);


//                    console.log(record.raw.status);
//                    if (record.raw.status.indexOf('indexer') == -1) {
//                        opencgaManager.onIndexer.addEventListener(function (sender, response) {
//                            console.log(response)
//                            Ext.example.msg("indexer", response);
//                            record.raw.indexerId = response;
////                                if (response.indexOf("ERROR:") != -1){
////                                }else{
////                                    //delete complete
//////                                    record.destroy();
////                                    _this.onNeedRefresh.notify();
////                                }
//                        });
//                        opencgaManager.indexer($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);
//                    } else {
//                        Ext.example.msg('Indexer', 'The file is already being indexed');
//                        opencgaManager.onIndexerStatus.addEventListener(function (sender, response) {
//                            console.log(response)
//                            Ext.example.msg("indexer status", response);
////                                if (response.indexOf("ERROR:") != -1){
////                                }else{
////                                    //delete complete
//////                                    record.destroy();
////                                    _this.onNeedRefresh.notify();
////                                }
//                        });
//                        opencgaManager.indexerStatus($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid, record.raw.status);
//                    }
                }
            }
        });
        var showName = Ext.create('Ext.Action', {
//            icon: Utils.images.info,
            text: 'Show name',
//            disabled: true,
            handler: function(widget, event) {
                var rec = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (rec) {
                    Ext.example.msg('objectId', '' + rec.get('oid'));
                }
            }
        });

        var deleteAction = Ext.create('Ext.Action', {
            icon: Utils.images.del,
            text: 'Delete this file',
//            disabled: true,
            handler: function(widget, event) {
                var record = _this.filesGrid.getSelectionModel().getSelection()[0];
                if (record) {
                    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this file?<p class="emph">' + record.data.fileName + '<p>', function (answer) {
                        if (answer == "yes") {
                            console.log("deleting")
                            var opencgaManager = new OpencgaManager();
                            opencgaManager.onDeleteObjectFromBucket.addEventListener(function (sender, response) {
                                if (response.indexOf("ERROR:") != -1) {
                                    Ext.example.msg("Deleting", response);
                                } else {
                                    //delete complete
                                    record.destroy();
                                    _this.onNeedRefresh.notify();
                                }
                            });
                            opencgaManager.deleteObjectFromBucket($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), record.raw.bucketId, record.data.oid);
                        }
                    });
                }
            }
        });

        this.filesGrid = Ext.create('Ext.grid.Panel', {
            title: this.allStore.getRootNode().getPath("text", " / "),
            store: this.filesStore,
            flex: 4,
            border: false,
            viewConfig: {
                stripeRows: true,
                listeners: {
                    itemcontextmenu: function(este, record, item, index, e) {
                        e.stopEvent();
                        var items = [showName];
                        console.log(record)
                        if (record.raw.fileFormat == 'bam' || record.raw.fileFormat == 'vcf') {
                            items.push(indexAction);
                        }
                        items.push(deleteAction);
                        var contextMenu = Ext.create('Ext.menu.Menu', {
                            items: items
                        });
                        contextMenu.showAt(e.getXY());
                        return false;
                    }
                }
            },
            selModel: {
                mode: 'SINGLE',
                //allowDeselect:true,
                listeners: {
                    selectionchange: function (este, item) {
                        if (item.length > 0) {//se compr
                            _this.selectedFileNode = item[0].raw;
                            if (mode == "fileSelection" && item[0].raw.fileType == "dir") {
                                return;
                            }
                            _this.selectButton.enable();
                            //this.selectedLabel.setText('<p>The selected file <span class="emph">'+item[0].data.fileName.substr(0,40)+'</span><span class="ok"> is allowed</span>.</p>',false);
                            //TODO por defecto cojo el primero pero que pasa si el data contiene varios ficheros??
                        } else {
                            _this.selectButton.disable();
                        }
                    }
                }
            },
            columns: [
                { text: 'File type', xtype: 'actioncolumn', menuDisabled: true, align: 'center', width: 54, icon: Utils.images.bluebox,
                    renderer: function (value, metaData, record) {
                        this.icon = Utils.images[record.data.fileType];
                        this.tooltip = record.data.fileType;
                    }
                },
                { text: 'Name', dataIndex: 'fileName', flex: 2 },
                { text: 'Creation time', dataIndex: 'creationTime', flex: 1 }
            ]
        });
        /**/

        this.panAccordion = Ext.create('Ext.panel.Panel', {
            minWidth: 125,
            minHeight: 250,
            flex: 1,
            cls: 'panel-border-right',
            border: false,
            layout: 'accordion',
            items: [this.folderTree, manageProjects /*, panFilter*/]
        });

        this.selectButton = Ext.create('Ext.button.Button', {
            text: 'Ok',
            disabled: true,
            handler: function () {
                _this.onSelect.notify({id: _this.selectedFileNode.oid, bucketId: _this.selectedFileNode.bucketId});
                _this.panel.close();
            }
        });

        this.activeUploadsCont = Ext.create('Ext.container.Container', {
            autoScroll: true,
            items: []
        });


        /**MAIN PANEL**/
//		this.height=205+(26*suites.length);//segun el numero de suites

        var tbarObj = {items: []};
        switch (mode) {
            case "folderSelection" :
                var item;
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                this.filesStore.filter("fileType", /dir/);
                break;
            case "manager" :
                var item;
                item = {text: 'Upload', handler: function () {
                    _this.drawUploadWidget();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                this.selectButton.hide();
                break;
            default :
                var item;
                item = {text: 'Upload', handler: function () {
                    _this.drawUploadWidget();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New folder', handler: function () {
                    _this.folderTree.expand();
                    _this.createFolder();
                }};
                tbarObj.items.splice(0, 0, item);
                item = {text: 'New bucket', handler: function () {
                    manageProjects.expand();
                }};
                tbarObj.items.splice(0, 0, item);
                break;
        }

        tbarObj.items.push({
            id: this.id + 'activeUploadsButton',
            text: 'Active uploads',
            enableToggle: true,
            pressed: false,
            toggleHandler: function () {
                if (this.pressed) {
                    _this.viewUploads();
                } else {
                    _this.viewBuckets();
                }
            }
        });
        this.panel = Ext.create('Ext.window.Window', {
            title: 'Upload & Manage',
            resizable: false,
            minimizable: true,
            constrain: true,
            closable: false,
            modal: true,
            height: this.height,
            width: this.width,
            layout: { type: 'hbox', align: 'stretch'},
            tbar: tbarObj,
            items: [this.panAccordion, this.filesGrid],
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close', handler: function () {
                    _this.onSelect = new Event();
                    _this.panel.hide();
                }},
                this.selectButton
            ],
            listeners: {
                scope: this,
                minimize: function () {
                    this.panel.hide();
                },
                destroy: function () {
                    delete this.panel;
                }
            }
        });
    }//if null

    this._updateFolderTree();
    this.panel.show();
};

OpencgaBrowserWidget.prototype.setFilter = function () {
    var _this = this;
    var recordOrigin = this.viewOrigin.getSelectionModel().getSelection()[0];
    var recordSuite = this.viewSuite.getSelectionModel().getSelection()[0];

    this.folderStore.clearFilter();

    if (recordOrigin != null) {
        switch (recordOrigin.data.suiteId) {
            case  "all":
                break;
            case  "Uploaded Data":
                this.folderStore.filter(function (item) {
                    return item.data.jobId < 0;
                });
                break;
            case  "Job Generated":
                this.folderStore.filter(function (item) {
                    return item.data.jobId > 0;
                });
                break;
        }
    }
    if (recordSuite != null) {
        switch (recordSuite.data.suiteId) {
            case  1:
                break;
            default :
                this.folderStore.filter(function (item) {
                    return item.data.suiteId == recordSuite.data.suiteId;
                });
        }
    }

    this.folderStore.filter(function (item) {
        var str = Ext.getCmp(_this.searchFieldId).getValue().toLowerCase();
        if (item.data.name.toLowerCase().indexOf(str) < 0) {
            return false;
        }
        return true;
    });
};

OpencgaBrowserWidget.prototype.checkTags = function (tags) {
    for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].indexOf('|') > -1) {
            var orTags = this.tags[i].split('|');
            var orMatch = false;
            for (var j = 0; j < orTags.length; j++) {
                if (tags.indexOf(orTags[j]) > -1) {
                    orMatch = true;
                }
            }
            if (!orMatch) {
                return false;
            }
        } else {
            if (tags.indexOf(this.tags[i]) == -1) {
                return false;
            }
        }
    }
    return true;

};


OpencgaBrowserWidget.prototype.createProject = function () {
    var _this = this;
    var name = Ext.getCmp(this.id + "newProjectNameField").getValue();
    var desc = Ext.getCmp(this.id + "newProjectDescriptionField").getValue();
    if (name != "") {
        Ext.getBody().mask();
        _this.panel.setLoading("Creating project");
        this.adapter.createBucket(name, desc, $.cookie("bioinfo_account"), $.cookie("bioinfo_sid"));
    }
};

OpencgaBrowserWidget.prototype._getFolderTreeSelection = function () {
    var selectedBuckets = this.folderTree.getSelectionModel().getSelection();
    if (selectedBuckets.length < 1) {
        Ext.example.msg('No folder selected', 'Please select a bucket or a folder.');
        return null;
    } else {
        var record = selectedBuckets[0];
        var bucketName;
        var parent = '';
        if (record.raw.fileType != null && record.raw.fileType == "dir") {
            var path = record.getPath("text", "/").substr(1);
            var pathArr = path.split("/", 2);
            parent = path.replace(pathArr.join("/"), "").substr(1) + "/";
            bucketName = pathArr[1];
        } else {
            bucketName = record.raw.text;
        }
        return {bucketId: bucketName, directory: parent};
    }
};

OpencgaBrowserWidget.prototype.drawUploadWidget = function () {
    var _this = this;
    var folderSelection = this._getFolderTreeSelection();
    if (folderSelection != null) {
        _this.uploadWidget.draw(folderSelection);
    }
};

OpencgaBrowserWidget.prototype.createFolder = function () {
    var _this = this;
    if (this.accountData.buckets.length < 1) {
        Ext.MessageBox.alert('No buckets found', 'Please create and select a bucket.');
    } else {
        var folderSelection = this._getFolderTreeSelection();
        if (folderSelection != null) {
            Ext.Msg.prompt('New folder', 'Please enter a name for the new folder:', function (btn, text) {
                if (btn == 'ok') {
                    text = text.replace(/[^a-z0-9-_.\s]/gi, '');
                    text = text.trim() + "/";
                    var opencgaManager = new OpencgaManager();
                    opencgaManager.onCreateDirectory.addEventListener(function (sender, res) {
                        Ext.example.msg('Create folder', '</span class="emph">' + res + '</span>');
                        if (res.indexOf("ERROR") != -1) {
                            console.log(res);
                        } else {
                            _this.onNeedRefresh.notify();
                        }
                    });
                    opencgaManager.createDirectory($.cookie("bioinfo_account"), $.cookie("bioinfo_sid"), folderSelection.bucketId, folderSelection.directory + text);
                }
            }, null, null, "New Folder");
        }
    }
};

function PagedViewListWidget(args){
	var _this=this;
	this._data = null;
	this.id = "PagedViewListWidget_"+ Math.round(Math.random()*10000);
	this.targetId = null;
	
	this.pageSize = 6;
	this.storeFields = new Object();
	this.template = new Object();
	this.width = 280;
	this.height = 550;
	this.title = "";
	this.order = 0;
	this.border = 0;
	this.mode = "view";
	this.sort = 'DESC';

	
	if (args != null){
		if (args.pageSize != null){
			this.pageSize = args.pageSize; 
		}
		if (args.storeFields != null){
			this.storeFields = args.storeFields;
		}
		if (args.template != null){
			this.template = args.template;
		}
		if (args.targetId != null){
			this.targetId = args.targetId;
		}
		if (args.width != null){
        	this.width = args.width;
        }
        if (args.height != null){
        	this.height = args.height;      
        }
        if (args.title != null){
        	this.title = args.title;      
        }
        if (args.order != null){
        	this.order = args.order;      
        }
        if (args.border != null){
        	this.border = args.border;      
        }
        if (args.mode != null){
        	this.mode = args.mode;      
        }
    }
    
	this.currentPage = 1;
	this.pageFieldId = this.id + '_pageField';
	this.pageLabelId = this.id + '_pageLabel';
	this.pagbarId = this.id + '_pagbar';
	this.panelId = this.id + '_panel';
	
	/**Events i send**/
	this.onItemClick = new Event(this);
	
	
	this.textFilterFunction = function(item){
		var str = Ext.getCmp(_this.id+"searchField").getValue().toLowerCase();
		if(item.data.name.toLowerCase().indexOf(str)<0){
			return false;
		}
		return true;
	};
	
};

PagedViewListWidget.prototype.getData = function (){
	return this._data;
};

PagedViewListWidget.prototype._setData = function (data){
	this._data = data;
};

//PagedViewListWidget.prototype.getPageSize = function (){
//	return this.pageSize;
//};

//PagedViewListWidget.prototype.getItemsCount = function (){
//	return this.getData().length;
//};

//PagedViewListWidget.prototype.getPageCount = function (){
//	return Math.ceil(this.getItemsCount() / this.getPageSize());
//};

/**FILTER **/
PagedViewListWidget.prototype.setFilter = function(filterFunction) {
	this.store.clearFilter();
	
	if(filterFunction!=null){
		this.filterFunction = filterFunction;
		this.store.filter([filterFunction,this.textFilterFunction]);
	}else{
		this.store.filter([this.textFilterFunction]);
	}
	
};

/** DRAW **/
PagedViewListWidget.prototype.draw = function(data) {
	
	this._setData(data);
//	this.changeOrder();
	this.render();
	
	this.store.loadData(this.getData());
	if (this.filterFunction != null ){
		this.setFilter(this.filterFunction);
//		this._setData(this.store.data.items);
	}
//	this.changePage(this.currentPage, this.getData(), true);
	
};
/** CLEAN **/
PagedViewListWidget.prototype.clean =  function (){
	if (this.panel != null){
		this.panel.destroy();
		delete this.panel;
	}
};


//PagedViewListWidget.prototype.changePage = function (numberPage, data, restUpdated){
//	if((data != null) && (data.length > 0)){
//		if ((numberPage > 0) && (numberPage <= this.getPageCount())){
//			this.currentPage = numberPage;
//			Ext.getCmp(this.pageLabelId).setText(numberPage+' of '+ this.getPageCount());
//			if (restUpdated != true){				
//				Ext.getCmp(this.pageFieldId).setValue(numberPage);
//			} 
//			var dataPage = new Array(); 
//			for ( var i = (this.getPageSize() * numberPage)- this.getPageSize(); i < this.getPageSize() * numberPage; i++) {
//				if (data[i] != null){
//					dataPage.push(data[i]);
//				}
//			}
//			this.store.loadData(dataPage, false);
//			}
//	}
//	else{
//		this.store.removeAll();
//		this.currentPage=1;
//		Ext.getCmp(this.pageFieldId).setValue(this.currentPage);
//		Ext.getCmp(this.pageLabelId).setText('No data found');
//		
//	}	
//};

//PagedViewListWidget.prototype.changeOrder = function (){
////	console.log(this.id+": "+this.sort);
//	if(this.sort == "desc"){
//		var aux = new Array();
//		var data = this.getData();
//		if(data != null){		
//			for ( var i = data.length-1; i >= 0; i--) {
//				aux.push(data[i]);
//			}
//		}
//		this._setData(aux);
//	}
//};

PagedViewListWidget.prototype.render = function() {
	var _this = this;
	if (this.panel == null){
				this.tpl = new Ext.XTemplate(this.template);
				
				this.store = Ext.create('Ext.data.Store', {
			    	fields: this.storeFields,
			    	sorters: [{ property : 'date', direction: 'DESC'}],
					autoLoad: false
			    });
				
			   var pan=null;
				
			   if(this.mode == "view"){
				   	this.view = Ext.create('Ext.view.View', {
				   		id : this.id+"view",
						padding:15,
						store: this.store,
					    tpl: this.tpl,
					    height:this.height,
					    trackOver: true,
					    autoScroll:true,
	           			overItemCls: 'list-item-hover',
	           			itemSelector: '.joblist-item',
					    listeners : {
					    	scope: this,
					    	itemclick : function (este,record){
							console.log(record.data);
					    		this.onItemClick.notify(record);
				    		}
	//				    	itemmouseenter : function (este, record, item){
	//				    		item.style.cursor="pointer";
	//				    		item.firstChild.style.cursor="pointer";
	//				    		item.style.border = "1px solid deepSkyBlue";
	//				    		item.style.background = "honeydew";
	//				    	},
	//			    		itemmouseleave : function (este, record, item){
	//				    		item.style.background = "white";	
	//				    		item.style.border = "1px solid #ffffff";
	//				    	}
					    }
					});
				   	
					pan = this.view;
				}
				
				
				if(this.mode == "grid"){
					var columns = [];
					for (var j=0;j<this.storeFields.length; j++){
						columns.push({header:this.storeFields[j],dataIndex:this.storeFields[j], flex:1});
					}
					this.grid = Ext.create('Ext.grid.Panel', {
					    store: this.store,
					    columns: columns,
					    border:0
					});
					pan = this.grid;
				}
				
				/**TEXT SEARCH FILTER**/
		        var searchField = Ext.create('Ext.form.field.Text',{
		        	 id:this.id+"searchField",
			         flex:1,
			         margin:"0 1 0 0",
					 emptyText: 'enter search term',
					 enableKeyEvents:true,
					 listeners:{
					 	change:function (){
					 		_this.setFilter(null);
					 	}
					 }
		        });
				
				this.pagBar = Ext.create('Ext.toolbar.Toolbar', {
					id : this.pagbarId,
					style:'border: '+this.border,
				    items: [
//							{
//							    id : this.id+'btnPrev',
//							    iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
//							    tooltip:'Previous Page',
//							    listeners: {
//							        scope: this,
//							        click: this.onPrevClick
//							    }
//							},
//							'-',
//							{	
//							    xtype: 'numberfield',
//							    id: this.pageFieldId,
//							    cls: Ext.baseCSSPrefix + 'tbar-page-number',
//							    allowDecimals: false,
//							    minValue: 1,
//							    value:1,
//							    hideTrigger: true,
//							    enableKeyEvents: true,
//							    selectOnFocus: true,
//							    submitValue: false,
//							    width: 30,
//							    margins: '-1 2 3 2',
//							    listeners: {
//							        scope: this,
//							        keyup: this.onPageChange
//							    }
//							},
//							'-',
//							{
//							    id : this.id+'btnNext',
//							    iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
//							    tooltip:'Next Page',
//							    listeners: {
//							        scope: this,
//							        click: this.onNextClick
//							    }
//							},
//			//				'-',
//							{
//							    xtype: 'label',
//							    id: this.pageLabelId,
//							    text: '',
//							    margins: '5 0 0 5'
//							},
							{
							    id : this.id+'btnSort',
							    iconCls: 'icon-order-desc',
							    tooltip:'Change order',
							    handler: function(){
							    	if(_this.sort=="DESC") {
							    		_this.sort = "ASC";
							    		_this.store.sort('date', 'ASC');
							    		this.setIconCls('icon-order-asc');
							    	}
							    	else {
							    		_this.sort = "DESC";
							    		_this.store.sort('date', 'DESC');
							    		this.setIconCls('icon-order-desc');
							    	}
							    }
							},
							searchField,
							{
							    id : this.id+'btnClear',
//							    iconCls: 'icon-delete',
							    text: 'X',
							    margin: "0 2 0 0",
							    tooltip: 'Clear search box',
							    handler: function(){
							    	searchField.reset();
							    }
							}
							
				    ]
				});
//				this.currentPage = Ext.getCmp(this.pageFieldId).getValue();
				
				this.panel = Ext.create('Ext.panel.Panel', {
					id : this.panelId,
					title : this.title,
					border:this.border,
				    width: this.width,
				    tbar : this.pagBar,
				    items: [pan]
				});

//				this.view.setHeight(this.panel.getHeight());
				var target = Ext.getCmp(this.targetId);
				if (target instanceof Ext.panel.Panel){
					target.insert(this.order, this.panel);
					//target.setActiveTab(1);//si no se pone el active da un error de EXT
					//target.setActiveTab(0);//si no se pone el active da un error de EXT
					//pan.setHeight = this.panel.getHeight();
				}else{
					this.panel.render(this.targetId);
				}
	}
};

PagedViewListWidget.prototype.show = function (){
    if (this.panel != null){
        this.panel.show();
    }
};
PagedViewListWidget.prototype.hide = function (){
    if (this.panel != null){
        this.panel.hide();
    }
};

/** Paging bar Events **/
//PagedViewListWidget.prototype.onPageChange = function (object, event, option){
//	this.changePage(Ext.getCmp(this.pageFieldId).getValue(), this.getData());
//};
//PagedViewListWidget.prototype.onPrevClick = function () {
//	this.changePage(this.currentPage - 1, this.getData());
//};
//PagedViewListWidget.prototype.onNextClick = function () {
//	this.changePage(this.currentPage + 1, this.getData());
//};
/** END Paging bar Events **/

function ProfileWidget(args){
	var _this=this;
	this.id = "EditUserWidget_"+ Math.round(Math.random()*10000);
	this.targetId = null;

    if(typeof args != 'undefined'){
        this.targetId = args.targetId || this.targetId;
    }

	this.adapter = new OpencgaManager();
	
	this.adapter.onChangePassword.addEventListener(function (sender, data){
			_this.panel.setLoading(false);
			if(data.indexOf("ERROR")==-1){
				Ext.getCmp(_this.id+'fldOld').setValue(null);
				Ext.getCmp(_this.id+'fldNew1').setValue(null);
				Ext.getCmp(_this.id+'fldNew2').setValue(null);
			}
            Ext.getCmp(_this.id+'labelPass').setText('<span class="info">'+data+'</span>', false);
	});
	this.adapter.onChangeEmail.addEventListener(function (sender, data){
			_this.panel.setLoading(false);
			if(data.indexOf("ERROR")==-1){
				Ext.getCmp(_this.id+'fldEmail').setValue(null);
				Ext.getCmp(_this.id+'fldEmail').setFieldLabel('e-mail', false);
			}
            Ext.getCmp(_this.id+'labelPass').setText('<span class="info">'+data+'</span>', false);
	});
}

ProfileWidget.prototype = {
    getOldPassword : function (){
        return $.sha1(Ext.getCmp(this.id+'fldOld').getValue());
    },
    getNewPassword : function (){
        return $.sha1(Ext.getCmp(this.id+'fldNew1').getValue());
    },
    getLogin : function (){
        return Ext.getCmp(this.id+'fldEmail').getValue();
    },
    clearAllFields:function(){
        Ext.getCmp(this.id+'fldOld').setValue(null);
        Ext.getCmp(this.id+'fldNew1').setValue(null);
        Ext.getCmp(this.id+'fldNew2').setValue(null);
        Ext.getCmp(this.id+'fldEmail').setValue(null);
        Ext.getCmp(this.id+'labelPass').setText('&nbsp', false);
    },
    changeEmail : function (){
        if(this.checkemail()){
            this.adapter.changeEmail($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), this.getLogin());
            this.panel.setLoading('Waiting for the server to respond...');
        }
    },
    changePassword : function (){
        if(this.checkpass()){
            this.adapter.changePassword($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), this.getOldPassword(), this.getNewPassword(), this.getNewPassword());
            this.panel.setLoading('Waiting for the server to respond...');
        }
    },
    draw : function (){
        this.render();
    },
    clean : function (){
        if (this.panel != null){
            this.panel.destroy();
            delete this.panel;
            console.log(this.id+' PANEL DELETED');
        }
    },
    render : function (){
        var _this=this;
        if (this.panel == null){
            console.log(this.id+' CREATING PANEL');

            var labelPass = Ext.create('Ext.toolbar.TextItem', {
                id : this.id+'labelPass',
                padding:3,
                text:'&nbsp'
            });
            var changePasswordForm = Ext.create('Ext.form.Panel', {
                title:'Change password',
                bodyPadding:15,
                width: 350,
                height:155,
                border:false,
                items: [{
                    id:this.id+"fldOld",
                    name: 'password',
                    xtype:'textfield',
                    fieldLabel: 'Old password',
                    inputType: 'password'
                },{
                    id:this.id+"fldNew1",
                    name: 'new_password1',
                    xtype:'textfield',
                    fieldLabel: 'New password',
                    inputType: 'password' ,
//		        enableKeyEvents: true,
                    listeners: {
                        scope: this,
                        change: this.checkpass
                    }
                },{
                    id:this.id+"fldNew2",
                    name: 'new_password2',
                    xtype:'textfield',
                    fieldLabel: 'Confirm new',
                    inputType: 'password' ,
//		        enableKeyEvents: true,
                    listeners: {
                        scope: this,
                        change: this.checkpass
                    }
                },{
                    xtype:'button',
                    text:'Change',margin:'0 0 0 105',
                    handler:function(){
                        _this.changePassword();
                    }
                }
                ]
            });
            var changeEmailForm = Ext.create('Ext.form.Panel', {
                title:'Change email',
                bodyPadding:15,
                width: 350,
                height:155,
                border:false,
                items: [{
                    id:this.id+"fldEmail",
                    name: 'new_email',
                    xtype:'textfield',
                    fieldLabel: 'e-mail',
//		        enableKeyEvents: true,
//		        emptyText:'please enter your email',
                    listeners: {
                        change: function(){
                            _this.checkemail();
                        }
                    }
                },{
                    xtype:'button',
                    text:'Change',margin:'0 0 0 105',
                    handler:function(){
                        _this.changeEmail();
                    }
                }
                ]
            });
            var profileTabPanel = Ext.create('Ext.tab.Panel', {
                width: 350,
                height:175,
                border:false,
                bbar:{items:[labelPass]},
                items: [changePasswordForm,changeEmailForm],
                listeners:{
                    tabchange:function(){
                        _this.clearAllFields();
                    }
                }
            });
            this.panel = Ext.create('Ext.window.Window', {
                title: 'Profile',
                resizable: false,
                minimizable :true,
                constrain:true,
                closable:true,
                modal:true,
                items:[profileTabPanel],
                buttonAlign:'center',
                buttons:[{
                    text:'Close',handler:function(){_this.panel.close();}
                }],
                listeners: {
                    scope: this,
                    minimize:function(){
                        this.panel.hide();
                    },
                    destroy: function(){
                        delete this.panel;
                    }
                }
            });
        }
        this.panel.show();
    },
    checkpass : function (){
        var passwd1 = Ext.getCmp(this.id+'fldNew1').getValue();
        var passwd2 = Ext.getCmp(this.id+'fldNew2').getValue();
        var oldPass = Ext.getCmp(this.id+'fldOld').getValue();
        var patt = new RegExp("[ *]");

        if(oldPass != ''){
            if(!patt.test(passwd1) && passwd1.length > 3){
                if (passwd1 == passwd2){
                    Ext.getCmp(this.id+'labelPass').setText('<p class="ok">Passwords match</p>', false);
                    return true;
                }else{
                    Ext.getCmp(this.id+'labelPass').setText('<p class="err">Passwords does not match</p>', false);
                    return false;
                }
            }else{
                Ext.getCmp(this.id+'labelPass').setText('<p class="err">Password must be at least 4 characters</p>', false);
                return false;
            }
        }else{
            Ext.getCmp(this.id+'labelPass').setText('<p class="err">Old password is empty</p>', false);
            return false;
        }

    },
    checkemail : function (){
        var email = Ext.getCmp(this.id+'fldEmail').getValue();
        var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (patt.test(email)){
            Ext.getCmp(this.id+'fldEmail').setFieldLabel('<span class="ok">e-mail</span>', false);
            return true;
        }else{
            Ext.getCmp(this.id+'fldEmail').setFieldLabel('<span class="err">e-mail</span>', false);
            if(email==''){
                Ext.getCmp(this.id+'fldEmail').setFieldLabel('e-mail', false);
            }
            return false;
        }
    }
};


function ResultTable(jobId, filename, tags, args){
	var _this = this;
	this.id = "ResultTable"+ Math.round(Math.random()*10000000);
	this.targetId = null;
	
	this.jobId = jobId;
	this.fileName=filename;
	this.tags=tags;
	this.numRows=10;
	this.flex=null;
	this.collapsible=true;
	this.border=true;
	this.cls=null;

    if(typeof args != 'undefined'){
        this.targetId = args.targetId || this.targetId;
        this.numRows = args.numRows || this.numRows;
        this.flex  = args.flex  || this.flex;
        this.collapsible  = args.collapsible  || this.collapsible;
        this.border  = args.border  || this.border;
        this.cls  = args.cls  || this.cls;
        this.tableLayout  = args.tableLayout  || this.tableLayout;
    }

	this.adapter = new OpencgaManager();
	
    this.table = null;
    
    this.onRendered = new Event();
	this.onRendered.addEventListener(function (sender, targetId){
		_this.draw();
	});
};



ResultTable.prototype.draw = function (){
	this.render();
};

ResultTable.prototype.render = function (){
	var _this = this;
	
	var rows=null;
	
	var filteredGridNames = new Array();
	var filteredColNames = new Array();
//	for( var i =0; i < tables.length; i++){
//		if (this.tags.indexOf(tables[i].name)!= -1){//me quedo con la primera que encuentro
//			this.tableSkel = tables[i];
//			this.colNames = tables[i].colNames;
//			this.colVisibilty = tables[i].colVisibility;
//			this.colTypes = tables[i].colTypes;
//			rows = tables[i].numRows;
//
//			filteredGridNames = new Array();
//			filteredColNames = new Array();
//			for (var j=0;j<this.colNames.length; j++){
//				if (this.colVisibilty[j]==1){
//					filteredGridNames.push({header:this.colNames[j],dataIndex:this.colNames[j], flex:1});
//					filteredColNames.push({name:this.colNames[j],type:this.colTypes[j]});
//				}
//			}
//		break;
//		}
//	}
    this.tableSkel = this.tableLayout;
    this.colNames = this.tableSkel.colNames;
    this.colVisibilty = this.tableSkel.colVisibility;
    this.colTypes = this.tableSkel.colTypes;
    rows = this.tableSkel.numRows;

    filteredGridNames = new Array();
    filteredColNames = new Array();
    for (var j=0;j<this.colNames.length; j++){
        if (this.colVisibilty[j]==1){
            filteredGridNames.push({header:this.colNames[j],dataIndex:this.colNames[j], flex:1});
            filteredColNames.push({name:this.colNames[j],type:this.colTypes[j]});
        }
    }


	if(this.tableSkel.type == "text"){
		
		var adapterPoll = new WumAdapter();
		adapterPoll.onPoll.addEventListener(function(sender,data){
			var altura = 75+22*2;
			
			var lines = _this.parse(data);
			var items = [];
			for ( var i = 0; i < lines.length; i++){
				var cont = Ext.create('Ext.container.Container', {
					data:lines[0],
					tpl:_this.getTemplate(_this.tableSkel.colNames)
				});
				items.push(cont);
			}
			
			this.table = Ext.create('Ext.container.Container', {
				items:items,
				margin:"0 0 0 50",
				renderTo: _this.targetId
			});
			
		});
		adapterPoll.poll(this.jobId,this.fileName,false,$.cookie('bioinfo_sid'));
		
	}else{
		//accountId, sessionId, bucketname, jobId, filename, colNames, colVisibilty, sessionId
		//var url = this.adapter.tableurl(this.jobId,this.fileName,this.colNames,this.colVisibilty,$.cookie('bioinfo_sid'));

		var url = this.adapter.tableurl($.cookie("bioinfo_account"),$.cookie('bioinfo_sid'),this.jobId,this.fileName,this.colNames,this.colVisibilty);
		console.log(url);
		
		/*
		http://ws.bioinfo.cipf.es/opencga/rest/job/86232/table?
				sessionid=QtjXeeOwKsRdTcyCF1vOiM2xbIC57fhlNvXafCjZMXCAFH2M6iZPfEXETt1Lp7F4
				&filename=significant_your_annotation_0.1.txt
				&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids
				&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0
				&_dc=1326109874569
				&page=1
				&start=0
				&limit=10
				&sort=%5B%7B%22property%22%3A%22List1%20unannotateds%22%2C%22direction%22%3A%22DESC%22%7D%5D
				&callback=Ext.data.JsonP.callback5
		
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?
				sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll
				&filename=significant_your_annotation_0.1.txt
				&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids
				&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0
				&_dc=1326278871739
				&page=1
				&start=0
				&limit=5
				&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%2C%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D
				&callback=Ext.data.JsonP.callback3
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279241960&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D
		&callback=Ext.data.JsonP.callback7
		http://ws.bioinfo.cipf.es/opencga-beta/rest/job/42/table?sessionid=6tpGsjjphxDMkCG74E89qMZTYTU26WGTXXoDLApUYoOJL07WyM2NGd0SbMhKe2Ll&filename=significant_your_annotation_0.1.txt&colNames=Term,Term%20size,Term%20size%20(in%20genome),List1%20annotateds,List1%20unannotateds,list1_per,List2%20annotateds,List2%20unannotateds,list2_per,List1%20annotated%20genes,List2%20annotated%20genes,Odds%20ratio%20(log%20e),pvalue,Adjusted%20pvalue,Term%20annotation%20%%20per%20list,Annotated%20ids&colVisibility=1,0,0,1,1,0,1,1,0,0,0,1,1,1,0,0&_dc=1326279394677&page=1&start=0&limit=5
		&filter=%5B%7B%22property%22%3A%22Term%22%2C%22value%22%3Aundefined%7D%5D&callback=Ext.data.JsonP.callback2
		*
		*/
		if(rows==null){
			rows = this.numRows;
		}
		var itemsPerPage = rows; 

		this.st = Ext.create('Ext.data.Store', {
			fields: filteredColNames, //las colNames no pueden tener el caracter "."
	    	pageSize: itemsPerPage,
		    remoteSort:true,
//		    remoteFilter:true,//TODO o no
	    	proxy: {
		        type: 'jsonp',
		        url : url,
		        reader: {
		            type: 'json',
		            root: 'items',
	            	totalProperty: 'total'
		        }
	    	}
		});
		this.st.loadPage(1);
		
		var altura = 75+22*itemsPerPage;
		this.table = Ext.create('Ext.grid.Panel', {
			title: /*this.tableName+" - "+*/this.fileName,
			collapsible:this.collapsible,
			flex:this.flex,
		    store: this.st,
		    border:this.border,
		    cls:this.cls,
		    columns: filteredGridNames,
		    height: altura,
//			selType: 'cellmodel',
			dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: this.st,   // same store GridPanel is using
		        dock: 'top',
		        displayInfo: true
	    	}],
		    renderTo: this.targetId
		});	
		
	}
};

/***/
ResultTable.prototype.parse = function (data){
	var _this = this;
	var lines = data.split("\n");
	var objLines=[];
	for ( var i = 0; i < lines.length; i++) {
		if(lines[i].charAt(0)!="#" && lines[i]!=""){
			var fields = lines[i].split("\t");
			var obj = {};
			for ( var j = 0; j < fields.length; j++) {
				if(fields[j]!=""){
					obj[_this.tableSkel.colNames[j].replace(/ /g,"_")]=fields[j];
				}
			}
			objLines.push(obj); 
		}
	}
	return objLines;
};
ResultTable.prototype.getTemplate = function (keys){
	var str = "<p>";
	for ( var i = 0; i < keys.length; i++) {
		str+='<span class="dis s90">'+keys[i]+' </span> {'+keys[i].replace(/ /g,"_")+'} &nbsp; &nbsp; &nbsp;';
	}
	str +="</p>";
	return  new Ext.XTemplate(	str);
};

function ResultWidget(args){
	var _this = this;
	this.id = "ResultWidget"+ Math.round(Math.random()*10000);
	this.targetId = null;
	
	if (args != null){
		if (args.targetId!= null){
        	this.targetId = args.targetId;       
        }
		if (args.application!= null){
        	this.application = args.application;       
        }
		if (args.app!= null){
        	this.app = args.app;       
        }
    }
	
	this.adapter = new OpencgaManager();
	
	this.adapter.onJobResult.addEventListener(function (sender, data){
//		console.log(data);
		_this.data = JSON.parse(data);
		Ext.getBody().unmask();
		_this.panel.setLoading(false);
		_this.render();
	});

	this.panelId=null;
	this.networkViewerId = null;
	this.genomeMapsId = null;
	
	this.resultTables = new Object();
	this.resultHistograms = new Object();
	this.resultGCharts = new Object();
	this.variantFiles = new Object();
	
//	this.onRendered = new Event();
	
	this.onViewRendered = new Event();
	this.onViewRendered.addEventListener(function (sender, targetId){
		_this.drawTables();
		_this.drawHistograms();
		_this.drawGCharts();
		_this.drawApplicationItems();
	});
};

ResultWidget.prototype.draw = function (sid, record){
//	console.log(record.data);
	this.record = record;
	this.jobId = this.record.data.id;
	this.id = this.jobId+this.id;
	this.panelId = "ResultWidget_"+this.jobId;
	this.networkViewerId = this.panelId+"_CellBrowserId";
	this.genomeMapsId = this.panelId+"_GenomeMapsId";
	
	
		this.panel = Ext.getCmp(this.panelId);
		if(this.panel==null){
			this.panel = Ext.create('Ext.panel.Panel', {
				id :this.panelId,
				border: 0,
			    title: this.record.data.name,
			    closable:true,
			    autoScroll:true
		//		html: this.tpl.applyTemplate(outputItems)
			});
			
			Ext.getCmp(this.targetId).add(this.panel);
			Ext.getCmp(this.targetId).setActiveTab(this.panel);
			this.panel.setLoading("Loading job info...");
			Ext.getBody().mask();
			
			//this.adapter.jobResult(this.jobId, "json", sid);
			//accountId, sessionId, bucketname, jobId, format
			this.adapter.jobResult($.cookie("bioinfo_account"), sid, this.jobId, "json");
			//this.adapter.jobResult(this.jobId, "json", sid);
		}else{
//			this.panel.setLoading(false);
			Ext.getCmp(this.targetId).setActiveTab(this.panel);
		}
};

ResultWidget.prototype.render = function (){
	var _this=this;
	
	console.log(this.application);
	debugger
		if(this.data.outputItems.length != 0){
			
			var outputItems = this.data.inputItems.concat(this.data.outputItems);
			
			//obtener todos los grupos quitando los repetidos
			var obj = {};
			for(var i = 0; i < outputItems.length; i++){
				var group = outputItems[i].group;
				
				if(group != "" ){ //no meter items con grupo distinto a ""
					if(group.indexOf(".")!=-1){//comprobar si alguno tiene un subgrupo
						var parent_group = group.split(".")[0];
						var sub_group = group.split(".")[1];
						if(obj[parent_group]==null) {
							obj[parent_group]={};
						}
						if(obj[parent_group][sub_group]==null){
							obj[parent_group][sub_group]=[];
						}
						
						//ESTE if quita los resultados para los pvalue = 0.005, 0.01, 0.1, deja solo los 0.05
						if(this.checkPValue(outputItems[i].title)){
							obj[parent_group][sub_group].push(outputItems[i]);
						}
					}else {
						if(obj[group]==null){
							obj[group]={};
							obj[group]["items"]=[];
						}
						
						//QUITAR la cadena de texto ${pvalue} si existe y la sustituye por 0.05
						this.renamePValue(outputItems[i]);
						obj[group]["items"].push(outputItems[i]);			
					}
					

				}
			}

			if(this.application == 'renato' || this.application == 'variant'){
				obj["Interactive Results"]={items:[]};
			}
			console.log(obj);
			
			var topLink = Ext.create('Ext.container.Container', {html:'<a name="'+this.jobId+'top"></a>'});
			var info = Ext.create('Ext.container.Container', {
				margin: "15 0 5 15",
				html:'<p >The job named <span class="info">'+this.record.data.name+' </span>'+
				'was launched on <span class="err">'+this.record.data.date+' </span>'+
				//'and has been visited <span class="dis">'+this.record.data.visites+' times</span></p>'+
				//'You can download the job results by pressing the <b>download</b> button.'
				'<br>'
			});
			
			var result = [];
			//Solo grupos juntos al principio
			var i=1;
			for (key in obj){
				var groupId = this.jobId+key.replace(/\s/g, '_')+"group";
				var groupBox = Ext.create('Ext.container.Container', {
					padding:"0 0 2 15",
					width:(key.length*14),
					//html:'<p class="s110 emph">'+i+'. <a href="#'+key+'">'+key+'</a></p>'
					groupId:groupId,
					html:'<span class="s110 emph">'+i+'. '+key+'</span>',
					listeners:{
						afterrender:function(){
							this.getEl().addClsOnOver("ssel u");
							this.getEl().addCls("dedo");
							var groupId = this.groupId;
							//inlineblock
							this.getEl().on("click",function(){
								var pos = $('#'+groupId).position().top;
								$(_this.panel.getEl().dom).children().scrollTop(pos);
							});
						}
					}
				});
				result.push(groupBox);
				i++;
			}
			
			//Grupos con resultados a continuacion
			var i=1;
			for (key in obj){
				//Grupo
				var infoId = (this.jobId+key+"info").replace(/ /gi, "");
				var groupId = this.jobId+key.replace(/\s/g, '_')+"group";
				var groupBox = Ext.create('Ext.container.Container', {
					infoId:infoId,
					groupName:key,
					padding:"60 15 5 15",
					//html:'<p class="panel-border-bottom"><span class="s140 emph">'+i+'. <a name="'+key+'" href="#'+this.jobId+'top">'+key+'</a>'+
						//' </span><span class="info" id="'+infoId+'"></span></p>',
					html:'<p id="'+groupId+'" class="panel-border-bottom"><span class="s140 emph">'+i+'. '+key+' &nbsp;&nbsp; &uarr;'+
						' </span><span class="info" id="'+infoId+'"></span></p>',
					listeners:{
						afterrender:function(){
							this.getEl().addClsOnOver("ssel");
							this.getEl().addCls("dedo");
							this.getEl().on("click",function(){
								$(_this.panel.getEl().dom).children().scrollTop(0);
							});
							
							var text = _this.getInfo(this.groupName);
							if(text!=""){
								$("#"+this.infoId).html("+info");
								var infoTip = Ext.create('Ext.tip.Tip',{
									html:text,
									listeners:{
										show:function(){
											var este = this;
											this.getEl().on("mouseleave",function(){
												este.hide();
											});
										}
									}
								});
								$("#"+this.infoId).mouseover(function(ev){
									$(this).css({cursor:"pointer"});
									infoTip.showAt(ev.clientX,ev.clientY);
								});
								$("#"+this.infoId).click(function(){
									infoTip.hide();
								});
							}
							
						}
					}
					
				});
				result.push(groupBox);
				
				//Resultados - se le pasa el array de items
				result.push(this.getResults(obj[key].items));
				
				//Comprobamos si tiene subgrupos 1 - nivel solo
				var c = 1;
				for(clave in obj[key]){
					if (clave != "items"){
						//Grupo
						var groupBox = Ext.create('Ext.container.Container', {
							padding:"15 15 5 30",
							cls:"inlineblock",
							html:'<p class="panel-border-bottom s120 emph">'+i+'.'+c+' '+clave+'</p>'
						});
						//si la clave es Your annotation tratarlo de otra manera... para mas adelante
//						console.log(clave)
						result.push(groupBox);
						
//						debugger
						//Resultados - se le pasa el array de items
						result.push(this.getResults(obj[key][clave]));
					c++;
					}
				}//subgrupos
				i++;
			}
			
			
			var downloadButton = Ext.create('Ext.button.Button', {
				 text: 'Download',
				 margin: "0 0 25 15",
				 handler: function (){
					 _this.adapter.download(_this.jobId, $.cookie('bioinfo_sid'));
				 }
			});
			

			var deleteJobButton = Ext.create('Ext.button.Button', {
				 text: 'Delete',
				 margin: "0 0 25 30",
				 handler: function (){
					 Ext.Msg.confirm("Delete job", "Are you sure you want to delete this job?", function (btnClicked){
//						 console.log(btnClicked);
						 if(btnClicked == "yes") {
							 _this.adapter.onDeleteJob.addEventListener(function (sender, data){
								 var msg = "";
								 if(data.response.indexOf("OK") != -1) {
									 Ext.getCmp(_this.targetId).getActiveTab().close();
									 msg = "The job has been succesfully deleted.";
								 }
								 else {
									 msg = "ERROR: could not delete job.";
								 }
								 Ext.Msg.alert("Delete job", msg);
							 });
//							 console.log("Job id: "+_this.jobId+" Cookie: "+$.cookie('bioinfo_sid'));
							 _this.adapter.deleteJob(_this.jobId, $.cookie('bioinfo_sid'));
						 }
					 });
				 }
			});


			this.panel.add(topLink);
			this.panel.add(info);
			//this.panel.add(downloadButton);
			//this.panel.add(deleteJobButton);
			this.panel.add(result);

			_this.onViewRendered.notify();			

		}//else
};


ResultWidget.prototype.getResults = function (items){
	//Resultados
	var boxes = [];
	for (var j = 0; j < items.length; j++){
		var item = items[j];
		
		//Obtener el container con el resultado
		var itemBox = this.showInfo(item);
		boxes.push(itemBox);
		
		//Añadir el container para resultados adicionales segun el type y el tag si procede
		var container = this.showTypeInfo(item);
		if(container){
			boxes.push(container);
		}
		var container = this.showTagInfo(item);
		if(container!=null){
			boxes.push(container);
		}
	}
	var itemsBox = Ext.create('Ext.container.Container', {
		layout: {type: 'table',columns: 1, tableAttrs: {style: {width: '100%'}}},					       
		items:boxes
	});
	return itemsBox;
};


ResultWidget.prototype.showInfo = function (item){
	var _this=this;
	
	
	var itemTpl = new Ext.XTemplate(
//			'<tpl for="tags">',
//			'<span class="ok">{.} </span>:: ',
//			'</tpl>',
//			'<span class="err">{type} </span>',
			'<span class="key">{title} </span>',
			'<span class="{[ this.setCSS(values) ]}">{value}</span><br>'
	,
	{
	 // XTemplate configuration:
	disableFormats: true,
    // member functions:
	setCSS: function(item){
    	switch(item.type){
    		case 'FILE':
			return 'file';
			break;
			case 'MESSAGE':
				//Setting species code 
				if (item.name == "species"){
					_this.species=item.value;
				}
			return 'message';
			break;
    	}
    }
    
	});
	//fin template
	
	return itemBox = Ext.create('Ext.container.Container', {
		data:item,
		datos:item,
		margin:"0 10 0 20",
		padding:5,
		tpl:itemTpl,
		cls:"inlineblock",
		listeners:{
			afterrender:function(){
				var datos = this.datos;
				if(this.datos.type == 'FILE'){
					this.getEl().addClsOnOver("encima");
					this.getEl().addCls("whiteborder");
					
	    			if(_this.application=="variant" && datos.title.toLowerCase().indexOf("filter")!=-1){
	    				_this.filteredVcfFile=datos.value;
	    			}
					
	    			this.getEl().on("click",function(){
	    				console.log(datos);
	    				var value = datos.value.trim();
		    			_this.adapter.poll($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId, value, true);
	    			});
	    		}
			}
		}
	});
};


ResultWidget.prototype.showTypeInfo = function (item){
	var _this=this;
	var box = Ext.create('Ext.container.Container',{
		margin:"0 10 0 10",
		padding:5
	});
	switch(item.type){
		case 'IMAGE':
				/*width="400" height="200" */
			var filename = item.value.trim();
			box.html =  '<div><img src="'+_this.adapter.pollurl($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId,filename)+'"></div>';
			return box;
		break;
		default: return null;
	}
};

ResultWidget.prototype.showTagInfo = function (item){
	var _this=this;
	var box = Ext.create('Ext.container.Container',{
		margin:"0 10 0 10",
		flex:1,
		padding:5,
		html:""
	});
	for(var i = 0; i < item.tags.length ; i++){
    	switch(item.tags[i]){
    		case 'TABLE':
        		var value = item.value.trim();
        		var id = _this.jobId+value+item.tags;
				_this.resultTables[id] =  new ResultTable (_this.jobId, value, item.tags,{targetId:'resultTable_'+id});
//							_this.resultTables[id].onRendered.
				box.html +=  '<div id="resultTable_'+id+'" style="padding:5px;"></div>';
				return box;
			break;
    		case 'HISTOGRAM':
    			var id = "histogram_"+_this.jobId+item.value+item.tags;
    			_this.resultHistograms[id] = item.value;
    			box.html =  '<div id="'+id+'" style="padding:5px;"></div>';
    			return box;
			break;
    		case 'GCHART':
    			var id = 'gchart_'+item.name;
    			_this.resultGCharts[id] = item.value;
    			box.html =  '<div id="'+id+'"></div>';
    			return box;
    		break;
    		case 'CONSEQUENCE_TYPE_VARIANTS':
    			this.variantFiles[item.name] = item.title;
    		break;
    	}
	}
	return null;
};

ResultWidget.prototype.drawTables = function (){
//	console.log(this.resultTables);
	for(id in this.resultTables){
		this.resultTables[id].draw();
	}	
};

ResultWidget.prototype.drawHistograms = function (){
	//se dibujan todas las tablas
//	console.log(this.resultHistograms);
	for(id in this.resultHistograms){
		
		var adapterPoll = new OpencgaManager();
		adapterPoll.onPoll.addEventListener(function(sender,data){
			if(data!=""){
				var lines = data.split("\n");
				var fields=[];
				var names=[];
				var values=[];
				var normValues=[];
				var total = 0;
				for ( var i = 0; i < lines.length; i++) {
					fields.push(lines[i].split("\t"));
					if(fields[i][0]!=""){
						names.push(fields[i][0]);
					}
					if(fields[i][1]!=null){
						total = total + parseFloat(fields[i][1]);
						values.push(fields[i][1]);
					}
				}
				for ( var i = 0; i < values.length; i++) {
					normValues.push(Math.round(parseFloat(values[i])/total*100));
				}
				names = names.toString().replace(/,/gi,"|");
				var img = '<img src="https://chart.googleapis.com/chart?cht=p&chs=600x300&chd=t:'+normValues+'&chl='+names+'&chtt=Consequence+types&chts=000000,14.5">';
				document.getElementById(id).innerHTML=img;
			}
		});
		
		//adapterPoll.poll(this.jobId,this.resultHistograms[id],false,$.cookie('bioinfo_sid'));
		adapterPoll.poll($.cookie("bioinfo_account"), $.cookie('bioinfo_sid'), this.jobId, this.resultHistograms[id], false);
	}	
};
ResultWidget.prototype.drawGCharts = function (){
	for(id in this.resultGCharts){
		drawChart(id, this.resultGCharts[id]);
	}
};

ResultWidget.prototype.drawApplicationItems  = function (){
	var _this=this;
	var viewerContainer = Ext.create('Ext.container.Container', {
		id:this.application+this.id+"Container",
		border: true,
		margin:"50 50 0 50",
		html:'<div class="greyborder" id="'+this.id+'Container"></div><div style="height:40px"></div>'
	});
		
	switch (this.application){
	case "variant":
		viewerContainer.on("afterrender",function(){
			_this.createGenomeViewer(_this.id+"Container");
		});
		break;
	case "renato":
		//***********bar
		var pbar = Ext.create('Ext.ProgressBar', {id:this.id+'pbar',margin:"5 0 0 50",width: 500});
		// Wait for 5 seconds, then update the status el (progress bar will auto-reset)
		pbar.wait({
			interval: 500, //bar will move fast!
			duration: 50000,
			increment: 15,
			text: 'Getting database information and drawing the network, please wait...',
			scope: this,
			fn: function(){
				pbar.updateText('Done!');
			}
		});
		//Add de bar to the main panel
		this.panel.add(pbar);
		/*************************/
		viewerContainer.on("afterrender",function(){
			_this.createCellBrowser(_this.id+"Container");
		});
		break;
	
	default: return null;
	}
		
	this.panel.add(viewerContainer);
};


ResultWidget.prototype.createGenomeViewer = function (targetId){
	var _this = this;

	var width = Ext.getCmp(this.application+targetId).getWidth();
	var height = Ext.getCmp(this.application+targetId).getHeight();
		
	//var genomeViewer = new GenomeViewer(targetId, AVAILABLE_SPECIES[0],{
		//version:"",
		//zoom:75,
		//width:width-2,
		//height:height-2
	//});
	//genomeViewer.setMenuBar(this.getGenomeViewerResultBar(genomeViewer));
	

	genomeViewer = new GenomeViewer(targetId, DEFAULT_SPECIES,{
		sidePanelCollapsed:true,
		width:width-2,
		height:700-2
	});
	genomeViewer.afterRender.addEventListener(function(sender,event){
		_this.app.setTracks(genomeViewer);
		genomeViewer.addSidePanelItems();
		var variantFilterWidget = new VariantFilterWidget(_this.jobId,{
				width:width-2,
				targetId:_this.application+targetId,
				viewer:genomeViewer,
				fileNames:_this.variantFiles
		});
	});
	genomeViewer.draw();
	
	var adapter = new OpencgaManager();
	adapter.onPoll.addEventListener(function(sender, data){
		if(data.indexOf("ERROR")!=1){
			console.error(data);
		}
		var vcfDataAdapter = new VCFDataAdapter(new StringDataSource(data),{async:false,species:genomeViewer.species});
		var vcfTrack = new TrackData("VCF file",{
			adapter: vcfDataAdapter
		});
		genomeViewer.addTrack(vcfTrack,{
			id:"VCF file",
			featuresRender:"MultiFeatureRender",
			histogramZoom:50,
			height:150,
			visibleRange:{start:0,end:100},
			featureTypes:FEATURE_TYPES
		});
		//var feature = vcfDataAdapter.featureCache.getFirstFeature();
		//genomeViewer.region.load(feature);
		//genomeViewer.setRegion({sender:""});
//		genomeViewer.setZoom(75);
	});
	
	
//	console.log(this.filteredVcfFile)
	if(this.filteredVcfFile != null){
		adapter.poll($.cookie("bioinfo_account"), $.cookie('bioinfo_sid'), _this.jobId, this.filteredVcfFile, false);
		//adapter.poll(_this.jobId, this.filteredVcfFile, false, $.cookie('bioinfo_sid'));
	}else{
		console.log("No filtered VCF file.");
	}
};



var mostSignificativesFeatures = new Array();
ResultWidget.prototype.createCellBrowser = function (targetId){
	var _this = this;
	record = this.record;
	
	//hide network-viewer, all nodes mut be rendered before show
	Ext.getCmp(this.application+targetId).disable();
	
	var width = Ext.getCmp(this.application+targetId).getWidth();
	var height = Ext.getCmp(this.application+targetId).getHeight();
	
	//Pako creating cellBrowser
	this.networkViewer = new NetworkViewer(targetId,this.getSpeciesItem(this.species),{
		width:width-2,
		height:height-2
	});
//	this.networkViewer.setSpeciesMenu(AVAILABLE_SPECIES);
	this.networkViewer.draw();

	
	
	
	//setting a empty data and format, nodes will be draw later using the interface
	var dataset = new GraphDataset();
	var layout = new LayoutDataset();
	var formatter = new NetworkDataSetFormatter({
		"defaultFormat": {"type":"LineEdgeNetworkFormatter","opacity":1, "fill":"#000000", "radius":"5", "strokeWidth":"1", "stroke":"#000000", "size":"2", "title":{"fontSize":10, "fill":"#000000"}},
		"selected": {"opacity":0.9, "fill":"#FF0000", "radius":"5", "stroke":"#000000",  "size":"2"},
		"over": {"opacity":1, "fill":"#DF0101", "radius":"5", "stroke":"#000000",   "size":"2", "strokeWidth":"1"}
	}, 
	{
		"defaultFormat": {  "opacity":0.8,"stroke":"#000000", "strokeWidth":"1", "strokeOpacity":0.5, "title":{"fontSize":6, "fontColor":"#000000"}},
		"selected": {"stroke":"#DF0101", "fill":"#FF0000"},
		"over": { "stroke":"#DF0101","strokeOpacity":1, "strokeWidth":"4"}
	},
//		{ "labeled":false, "height":height,"width":this.width,"right":this.width,"backgroundColor":"#FFFFFF", "balanceNodes":false, "nodesMaxSize":4, "nodesMinSize":2});		
	{ "labeled":false, "backgroundColor":"#FFFFFF", "balanceNodes":false, "nodesMaxSize":4, "nodesMinSize":2});		
	formatter.dataBind(dataset);
	layout.dataBind(dataset);
	
	formatter.setHeight(height - 140);
	formatter.setWidth(width-2-13);
	this.networkViewer.drawNetwork(dataset, formatter, layout);
	
	
	
	//Getting significant_your_annotation_0.05.txt
	var adapter2 = new WumRestAdapter();
	adapter2.onPoll.addEventListener(function(sender, data){
		var lines = data.split("\n");
		var significativesFeatures = new Array();
		for ( var i = 1; i < lines.length; i++) {
			var column = 13;
			if(record.data.toolName == "fatiscan"){
				if(lines[i].split("\t").length==7){
					//we are in the case of logistic model
					column = 6;
				}
			}
			var significativeValue = lines[i].split("\t")[column];
			if(significativeValue < 1000000){
				significativesFeatures.push(lines[i].split("\t")[0]);
			} 
		}
		console.log('significativesFeatures.length: '+significativesFeatures.length);
		
		
		/** TFBS **/
		var adapter3 = new WumRestAdapter();
		adapter3.onPoll.addEventListener(function(sender, data){
			var genes = data.split("\n");
			/** Para elminar la linea en blanco: Gorrion Rules! **/
			genes.pop();
			console.log('genes.length: '+genes.length);
			_this.loadNetworkOnCellBrowser(genes, significativesFeatures, targetId);
		});

		var file = "clean_list1.txt";
		if(record.data.toolName == "fatiscan")
			file = "id_list.txt";
		adapter3.poll(_this.jobId, file, false, $.cookie('bioinfo_sid'));
	});
	adapter2.poll(this.jobId, "significant_your_annotation_0.05.txt", false, $.cookie('bioinfo_sid'));
	//END getting significant_your_annotation_0.05.txt
		
	
	
	
	// By Nacho
	// getting 50 most significant genes
	console.log('getting ranked_list...');
	var cleanListWumAdapater = new WumRestAdapter();
	cleanListWumAdapater.onPoll.addEventListener(function(sender, data) {
		var lines = data.split("\n");
		var numGenes = lines.length;
		var cont = 0;
		console.log('getting top clean_list...');
		for(var i = 0; cont < 50 && i < numGenes; i++) {
			if(lines[i].indexOf('#') < 0) {
//				console.log('getting top ranked_list... '+lines[i]);
//				console.log('getting top ranked_list... '+lines[i].split("\t")[0]);
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
		cont = 0;
		console.log('getting bottom clean_list...');
		for(var i = numGenes-1; cont < 50 && i > 0; i--) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
	});
	cleanListWumAdapater.poll(this.jobId, "clean_list1.txt", false, $.cookie('bioinfo_sid'));
	// END getting 50 most significant genes
	
	
	
	
	// getting ranked_list
	console.log('getting ranked_list...');
	var rankedListWumAdapater = new WumRestAdapter();
	rankedListWumAdapater.onPoll.addEventListener(function(sender, data) {
		var lines = data.split("\n");
		var numGenes = lines.length;
		var cont = 0;
		console.log('getting top ranked_list...');
		for(var i = 0; cont < 50 && i < numGenes; i++) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
		cont = 0;
		console.log('getting bottom ranked_list...');
		for(var i = numGenes-1; cont < 50 && i > 0; i--) {
			if(lines[i].indexOf('#') < 0) {
				mostSignificativesFeatures[lines[i].split("\t")[0]] = true;
				cont++;
			}
		}
	});
	rankedListWumAdapater.poll(this.jobId, "ranked_list.txt", false, $.cookie('bioinfo_sid'));
	//END getting ranked_list	
		
};


ResultWidget.prototype.loadNetworkOnCellBrowser = function (genes, tfbs, targetId){
	var _this = this;

	//tfbs and mirna nodes are rendered
	//2 indicates that mirna and tfbs are done 
	var nodesRendered = 0;

	//Getting tfbs by gene
	var cellBaseManager = new CellBaseManager(this.networkViewer.species);
	cellBaseManager.success.addEventListener(function (evt, response){
		var data_tfbs = response.result;
		var tfbsByGene = new Object();
		for (var i = 0; i < data_tfbs.length; i++){
			for ( var j = 0; j < data_tfbs[i].length; j++) {
				if(tfbs.toString().indexOf(data_tfbs[i][j].tfName) != -1){
					if (tfbsByGene[data_tfbs[i][j].tfName] == null){
						tfbsByGene[data_tfbs[i][j].tfName] = new Object();
					}

					if(tfbsByGene[data_tfbs[i][j].tfName][genes[i]] == null){
						tfbsByGene[data_tfbs[i][j].tfName][genes[i]] = true;
					}
				}
			}
		}
		console.log(tfbsByGene);
		console.log(data_tfbs.length);
		console.log('contando TFBSs...');
		// check the number of elemts to be rendered
		// if there are more than 500 then select the most significant
		var numElements = 0;
		for ( var tf in tfbsByGene) {
			if(numElements > 500) {
				break;
			}
			for ( var gene in tfbsByGene[tf]) {
				numElements++;
			}
		}
		console.log('menos de 500: '+numElements);
		for ( var tf in tfbsByGene) {
			_this.networkViewer.networkWidget.getDataset().addNode(tf, {type:"tf"});
			var verticeId = _this.networkViewer.networkWidget.getDataset().getVerticesCount() - 1;
			_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId).getDefault().setFill("#DF0101");

//			console.log(tfbsByGene[tf]);
//			console.log(_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId));
			for ( var gene in tfbsByGene[tf]) {
				if(numElements < 500 || mostSignificativesFeatures[gene] == true) {
//					console.log(gene);
					/** Conecto los tfbs con sus genes **/
					if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene).length == 0){
						_this.networkViewer.networkWidget.getDataset().addNode(gene, {type:"gene"});
					}

//					console.log(_this.networkViewer.networkWidget.getDataset());
					// getVertexByName returns an array

					var vertexGeneId = _this.networkViewer.networkWidget.getDataset().getVertexByName(gene)[0].id;
					var vertexTfbsId = _this.networkViewer.networkWidget.getDataset().getVertexByName(tf)[0].id;
					_this.networkViewer.networkWidget.getDataset().addEdge("tfbs_" + vertexGeneId + "_" + vertexTfbsId, vertexTfbsId, vertexGeneId);
					_this.networkViewer.networkWidget.getFormatter().getVertexById(vertexGeneId).getDefault().setFill("#0000FF");
				}
			}
		}


		_this.networkViewer.networkWidget.getLayout().getLayout("neato");
		_this.networkViewer.networkWidget.getLayout().layoutDone.addEventListener(function (evt){
			nodesRendered++;
			if(nodesRendered==2){
				Ext.getCmp(_this.id+'pbar').destroy();
				Ext.getCmp(_this.application+targetId).enable();
			}
		});
	});
	if(genes.length>0){
		cellBaseManager.get("feature", "gene", genes, "tfbs");
	}
	//getting mirna target by gene
	var cellBaseManagerMirna = new CellBaseManager(this.networkViewer.species);
	cellBaseManagerMirna.success.addEventListener(function (evt, response){
		var data_tfbs = response.result;
		var tfbsByGene = new Object();
		for (var i = 0; i < data_tfbs.length; i++){
			for ( var j = 0; j < data_tfbs[i].length; j++) {

				if(tfbs.toString().indexOf(data_tfbs[i][j].mirbaseId) != -1){
					if (tfbsByGene[data_tfbs[i][j].mirbaseId] == null){
						tfbsByGene[data_tfbs[i][j].mirbaseId] = new Object();
					}

					if(tfbsByGene[data_tfbs[i][j].mirbaseId][genes[i]] == null){
						tfbsByGene[data_tfbs[i][j].mirbaseId][genes[i]] = true;
					}
				}
			}
		}
		console.log(tfbsByGene);
		console.log(data_tfbs.length);
		console.log('contando miRNAs...');
		// check the number of elemts to be rendered
		// if there are more than 500 then select the most significant
		var numElements = 0;
		for ( var tf in tfbsByGene) {
			if(numElements > 500) {
				break;
			}
			for ( var gene in tfbsByGene[tf]) {
				numElements++;
			}
		}
		console.log('menos de 500: '+numElements);
		for ( var mirna in tfbsByGene) {
			_this.networkViewer.networkWidget.getDataset().addNode(mirna, {type:"mirna"});
			var verticeId = _this.networkViewer.networkWidget.getDataset().getVerticesCount() - 1;
			_this.networkViewer.networkWidget.getFormatter().getVertexById(verticeId).getDefault().setFill("red");
			for ( var gene in tfbsByGene[mirna]) {
				if(numElements < 500 || mostSignificativesFeatures[gene] == true) {
//					console.log(gene);
					if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene).length == 0){
//						if(_this.networkViewer.networkWidget.getDataset().getVertexByName(gene) == null) {
						_this.networkViewer.networkWidget.getDataset().addNode(gene, {type:"gene"});
					}

					var vertexGeneId = _this.networkViewer.networkWidget.getDataset().getVertexByName(gene)[0].id;
					var vertexTfbsId = _this.networkViewer.networkWidget.getDataset().getVertexByName(mirna)[0].id;
					_this.networkViewer.networkWidget.getDataset().addEdge("tfbs_" + vertexGeneId + "_" + vertexTfbsId, vertexTfbsId, vertexGeneId);
					_this.networkViewer.networkWidget.getFormatter().getVertexById(vertexGeneId).getDefault().setFill("blue");

					var edgeId = _this.networkViewer.networkWidget.getDataset().getEdgesCount() - 1;


					_this.networkViewer.networkWidget.getFormatter().changeEdgeType(edgeId, "CutDirectedLineEdgeNetworkFormatter");
				}

			}
		}    


		_this.networkViewer.networkWidget.getLayout().getLayout("neato");
		_this.networkViewer.networkWidget.getLayout().layoutDone.addEventListener(function (evt){
			nodesRendered++;
			if(nodesRendered==2){
				Ext.getCmp(_this.id+'pbar').destroy();
				Ext.getCmp(_this.application+targetId).enable();
			}
		});

	});
	if(genes.length>0){
		cellBaseManagerMirna.get("feature", "gene", genes, "mirna_target");    
	}else{
		Ext.getCmp(_this.id+'pbar').destroy();
		Ext.getCmp(_this.application+targetId).enable();
	}
};



ResultWidget.prototype.getGenomeViewerResultBar = function(genomeViewer) {
	var _this=this;

	switch (this.application){
	case "variant":
		var toolbarMenu = Ext.create('Ext.container.Container', {
			cls:'bio-toolbar',
			defaults:{margin:'1 0 0 2'},
			layout:'vbox',
			height:27,
			items : [
				{xtype:'button',text:'<span class="info">Variant filter tool...</span>',handler:function(){
						var variantFilterWidget = new VariantFilterWidget(_this.jobId,{viewer:genomeViewer,fileNames:_this.variantFiles});
//						variantFilterWidget.draw();
//						variantFilterWidget.parseData(data);
//						var wumRestAdapter = new WumRestAdapter();
//						wumRestAdapter.onPoll.addEventListener(function(sender, data){
//						});
						
//						wumRestAdapter.poll(_this.jobId, "variant.txt", false, $.cookie('bioinfo_sid'));
					}
				}
			]
		});
		return toolbarMenu;
		break;
		
	
	default: return null;
	}
};


ResultWidget.prototype.getSpeciesItem = function(species) {
	//selecciona el objeto AVAILABLE_SPECIES segun el species code
	for ( var i = 0; i < AVAILABLE_SPECIES.length; i++) {
		if(AVAILABLE_SPECIES[i].species==species){
			return AVAILABLE_SPECIES[i];
		}
	}
};

//Quita los resultados para your annotation
ResultWidget.prototype.checkPValue = function(str) {
	//return false si es 0.005, 0.01 ó 0.1
	if(str.indexOf("pvalue<0.005")!= -1 ||
		str.indexOf("pvalue<0.01")!= -1 ||
		str.indexOf("pvalue<0.1")!= -1
	){
		return false;
	}
	return true;
};

//Quita los resultados para your annotation
ResultWidget.prototype.renamePValue = function(item) {
	//reemplaza la cadena ${pvalue} por 0.05
	if(item.value.indexOf("${pvalue}") != -1){
		item.value = item.value.replace(/\$\{pvalue\}/gi, "0.05");
	}
};

//XXX no se usa por ahora...Para mas adelante
ResultWidget.prototype.setPValue = function(value) {
	console.log(this.id);
	var divId="#pvalue"+this.id;
	$(divId).html(value);
};

//Quita los resultados para your annotation
ResultWidget.prototype.getInfo = function(groupName) {
	switch (this.application){
	case "renato":
		switch (groupName){
			case "Input data": return "This section is a reminder of the parameters or settings you have submitted to run the analysis.";
			case "Summary": return "<p>This section shows the number of genes annotated to each database in each list.</p><br><p>Gene list: contains three elements, the number of genes in your gene list annotated in the database over the total number of genes remaining in your gene list after the duplicates management, a percentage of genes in your gene list annotated in the database and the ratio of regulators per gene.<br> Genome: the same structure explained above but applied to the whole genome (TFBS or miRNA) or Your Annotations after the duplicates management.</p>";
			case "Significant Results":  return "<p>We consider a significant enrichment after correcting the results by a multiple testing correction method. Enrichment p-values are corrected applying the False discovery rate (FDR) method (Benjamini et al., 1995; Storey andTibshirani, 2003). The threshold of signification applied to the correction has been set to 0.05.</p><br><p>The table provided summarizes the information about the enrichment test for each of the significant regulatory elements that have an Adjusted p-value < 0.05. The table is originally sorted by adjusted p-value and can be sorted up and down by clicking in any of the other column headings. When the number of significant results in a table is higher than five, results are split into different pages. You can move forward or backward in the page list using the arrow buttons.</p>";
			case "All results": return "This section contains a downloadable individual text file containing all results for all significant and not significant regulators. This file follows the same structure described above.";
			case "Annotation files": return "<p>When significant results are obtained, we can suppose that there is one or several regulatory elements behaving different when comparing groups. The list of genes included in the analysis have pointed to a significantly over-represented set of common regulators to these genes. The interpretation of the results will be different in the case of TFs (transcription factors) and miRNAs given that (generally) the first are positive regulators and the latter are negative regulators.</p><br><p>TFs generally bind to the promoter region of their target genes to assist and promote the transcription. miRNAs, on the other hand, bind to transcript products preventing them from being translated. Significant TF and miRNAs can be pointed to be responsible for the differential expression of the genes observed in the list. We must take special care in the interpretation of over-expressed or under-expressed genes in a functional analysis. In the case of TFs, if we are working with the list of over-expressed genes, the significant results makes reference to active TFs in one condition with respect to the other; while significant results of under-expressed genes makes reference to inactive TFs. In miRNAs, significant results of over-expressed genes will point to inactive miRNAs, while significant results of under-expressed genes will point to active miRNAs when comparing conditions.</p>";
			default: return "";
		}
	break;
	case "variant":
		switch (groupName){
			case "Variants by Consequence Type": return "Click this link: <a class='ok' target='_blank' href='http://docs.bioinfo.cipf.es/projects/variant/wiki/Output_columns'>Output columns</a>";
			default: return "";
		}
	break;
	
	default: return "";
	}
};

function ResultWidget(args){
	var _this = this;

    if(typeof args != 'undefined'){
        this.targetId = args.targetId || this.targetId;
        this.application = args.application || this.application;
        this.app  = args.app  || this.app;
    }

	this.adapter = new OpencgaManager();
	
	this.panelId=null;
	this.networkViewerId = null;
	this.genomeMapsId = null;
}

ResultWidget.prototype = {
    id : "ResultWidget"+ Math.round(Math.random()*10000),
    draw : function(sid, record){
        var _this = this;
        this.job = record.raw;
        this.jobId = this.job.id;
        this.id = this.jobId+this.id;
        this.panelId = "ResultWidget_"+this.jobId;

        this.panel = Ext.getCmp(this.panelId);
        if(this.panel==null){
            this.panel = Ext.create('Ext.panel.Panel', {
                id :this.panelId,
                border: 0,
                title: this.job.name,
                closable:true,
                autoScroll:true
            });

            Ext.getCmp(this.targetId).add(this.panel);
            Ext.getCmp(this.targetId).setActiveTab(this.panel);
            this.panel.setLoading("Loading job info...");

            var url = this.adapter.jobResultUrl($.cookie("bioinfo_account"), sid, this.jobId, "json");
            $.getScript(url,function(){
		        _this.panel.setLoading(false);
                var layout = RESULT[_this.job.toolName].layout;
                layout.outputItems = _this.job.outputData.sort(layout.sortOutputItems);
		        _this.render(RESULT);
            });
        }else{
            Ext.getCmp(this.targetId).setActiveTab(this.panel);
        }
    },
    render : function(resultData){
        var _this=this;
        console.log(this.application);

//        Ext.create('Ext.button.Button', {
//            text: 'Delete',
//            margin: "0 0 25 30",
//        });

        var getJobInfo = function(){
            var itemTpl = new Ext.XTemplate(
                '<p><span class="ssel border-bot s120">Information </span><span style="color:gray"> &nbsp; &nbsp; {id}</span></p><br>',
                '<p><span class="emph">{name}</span> - <span class="info"> {toolName} </span> - <span style="color:orangered"> {date}</span></p>',
                '<p class="tip emph">{description}</p>',
                '<p class="">{[ this.getInfo(values) ]}</p>',{
                    getInfo: function(item){
                        switch(item.toolName){
                            case 'pathiways':
                                var arr = item.commandLine.split(/ --/g);
                                console.log(arr)
                                var str = arr[1].replace(/ /g,': ')+'<br>';
                                str +=  arr[2].replace(/ /g,': ')+'<br>';
                                str +=  arr[3].replace(/ /g,': ').replace('/httpd/bioinfo/opencga/analysis/pathiways/examples/','').replace('/httpd/bioinfo/opencga/accounts/','')+'<br>';
                                str +=  arr[4].replace(/ /g,': ')+'<br>';
                                str +=  arr[5].replace(/ /g,': ')+'<br>';
                                str +=  arr[6].replace(/ /g,': ').replace('/httpd/bioinfo/opencga/analysis/pathiways/examples/','').replace('/httpd/bioinfo/opencga/accounts/','')+'<br>';
                                str +=  arr[7].replace(/ /g,': ')+'<br>';
//                                str +=  arr[8].replace(/ /g,': ')+'<br>';
//                                str +=  arr[9].replace(/ /g,': ')+'<br>';
                                str +=  arr[10].replace(/ /g,': ')+'<br>';
                                str +=  arr[12].replace(/ /g,': ');
                                str +=  '<div style="width:400px">'+arr[11].replace(/ /g,': ').replace(/,/g,', ')+'</div>';
                                return str;
                            default : return '';
                        }
                    }
                }
            );
            return Ext.create('Ext.container.Container',{
                margin:'15 0 15 15',
                items:[{
                    xtype:'box',
                    data:_this.job,
                    tpl:itemTpl
                },{
                    xtype:'container', layout:'hbox', margin:'10 0 0 0',defaults:{margin:'0 5 0 5'},
                    items:[{
                        xtype:'button',
                        text:'download',
                        handler: function (){
                            _this.adapter.downloadJob( $.cookie('bioinfo_account'), $.cookie('bioinfo_sid'),_this.jobId);
                        }
                    },{
                        xtype:'button',
                        text:'delete',
                        handler: function () {
                            Ext.Msg.confirm("Delete job", "Are you sure you want to delete this job?", function (btnClicked) {
                                if (btnClicked == "yes") {
                                    _this.adapter.onDeleteJob.addEventListener(function (sender, data) {
                                        var msg = "";
                                        if (data.indexOf("OK") != -1) {
                                            Ext.getCmp(_this.targetId).getActiveTab().close();
                                            msg = "The job has been succesfully deleted.";
                                        }else {
                                            msg = "ERROR: could not delete job.";
                                        }
                                        Ext.Msg.alert("Delete job", msg);
                                    });
                                    _this.adapter.deleteJob($.cookie('bioinfo_account'), $.cookie('bioinfo_sid'), _this.jobId);
                                }
                            });
                        }
                    }]
                }]
            });
        };

        var getResultIndex = function(children){
            var boxes = [{xtype:'box',cls:'inlineblock ssel border-bot s120',html:'Index',margin:15}];
            for(var i = 0; i<children.length; i++){
                boxes.push(Ext.create('Ext.Component',{
                    margin:"0 15 0 15",
                    cls:'dedo emph',
                    overCls:'err',
                    resultId:_this.jobId+children[i].title.replace(/ /g,''),
                    html:children[i].title,
                    listeners:{
                        afterrender:function(este){
                            this.getEl().on("click",function(){
                                var pos = $('#'+este.resultId).position();
                                if(typeof pos != 'undefined'){
                                    var top = pos.top;
                                    $(_this.panel.getEl().dom).children().scrollTop(top-10);
                                }
                                
                                var tab = Ext.getCmp(este.resultId);//for tab mode
                                var parent = tab.up();
                                if(parent.isXType('tabpanel')){
                                    parent.setActiveTab(tab);
                                }
                            });
                        }
                    }
                }));
            }
            return Ext.create('Ext.container.Container', {
                margin:'0 0 20 0',
                items:boxes
            });
        };

        var itemTpl = new Ext.XTemplate(
            '<span class="s140 emph">{title}</span>',
            '<span class="ok"> {pathi} </span>',
            '<span class="info"> {date}</span><br>'
        );

        var processLeafItem = function(item){
            var boxes = [];
            var itemBox;
            for(var j = 0; j<item.renderers.length; j++){
                var renderer = item.renderers[j];
                switch(renderer.type){
                    case 'file':
                        itemBox = Ext.create('Ext.Component', {
                            html:'<span class="key">'+item.title+'</span><span class="file">'+item.file+'</span>',
                            item:item,
                            padding:3,
                            overCls:'encima',
                            cls:'inlineblock whiteborder',
                            listeners:{
                                afterrender:function(){
                                    var item = this.item;
                                    this.getEl().on("click",function(){
                                        console.log(item);
                                        _this.adapter.poll($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId, item.file, true);
                                    });
                                }
                            }
                        });
                        break;
                    case 'image':
                        itemBox = Ext.create('Ext.Component',{
                            html:'<div><img src="'+_this.adapter.pollurl($.cookie('bioinfo_account'),$.cookie('bioinfo_sid'), _this.jobId,item.file)+'"></div>'
                        });
                        break;
                    case 'grid':
                        var id = 'resultTable_'+_this.jobId+item.file;
                        var resultTable = new ResultTable (_this.jobId, item.file, item.tags,{targetId:id,tableLayout:renderer.tableLayout});
                        itemBox = Ext.create('Ext.Component',{
                            flex:1,
                            resultTable:resultTable,
                            html:'<div id="'+id+'" style="padding:5px;"> </div>',
                            listeners:{
                                afterrender:function(este){
                                    este.resultTable.draw();
                                }
                            }
                        });
                        break;
                }
                boxes.push(itemBox);
            }
            return Ext.create('Ext.container.Container', {
                title:item.title,
                margin:'0 0 15 0',
                items : boxes
            });
        };

        var getDetailsAsDocument = function(item, isRoot){
            var boxes;
            if(typeof item.children != 'undefined'){
                if(typeof item.children == 'function'){
                    item.children = item.children();
                }
                boxes = [];
                for(var i = 0; i<item.children.length; i++){
                    boxes.push(getDetailsAsDocument(item.children[i]));
                }
                if(isRoot == true){
                    var detailsItemsContainer = {
                        xtype:'container',
                        items:boxes
                    };
                    if(item.presentation == 'tabs'){
                        detailsItemsContainer = {
                            xtype:'tabpanel',
                            padding:'0 30 15 15',
                            plain: true,
                            border:0,
                            defaults:{
                                overflowX:'scroll',
                                height:2000,
                                padding: 10
                            },
                            items:boxes
                        };
                    }
                    return Ext.create('Ext.container.Container', {
                        title:item.title,
                        items:[{
                            xtype:'box',
                            cls:'inlineblock ssel border-bot s120', margin:'15',
                            html:'Details'
                        },detailsItemsContainer]
                    });
                }else{
                    return Ext.create('Ext.container.Container', {
                        id:_this.jobId+item.title.replace(/ /g,''),
                        title:item.title,
                        margin:'0 0 0 10',
                        items:[{
                            xtype:'box',
                            overCls:'dedo',
                            cls:'panel-border-bottom', margin:'0 0 10 0',
                            data:item,tpl:itemTpl,
                            listeners:{
                                afterrender:function(){
                                    this.getEl().on("click",function(){
                                        $(_this.panel.getEl().dom).children().scrollTop(0);
                                    });
                                }
                            }
                        },{
                            xtype:'container',
                            items:boxes
                        }]
                    });
                }
            }else{
                return processLeafItem(item);
            }
        };

        var detailedResutls = getDetailsAsDocument(resultData[this.job.toolName].layout,true);
        var indexResutl = getResultIndex(resultData[this.job.toolName].layout.children);
        this.panel.add(getJobInfo());
        this.panel.insert(indexResutl);
        this.panel.add(detailedResutls);

    }//end render
};
function UploadWidget (args){
	var _this=this;
	this.id = Utils.genId("uploadWidget");
	this.targetId = null;
	this.suiteId=null;
	
    if(typeof args !== 'undefined'){
        this.targetId = args.targetId || this.targetId;
        this.suiteId = args.suiteId || this.suiteId;
        this.opencgaBrowserWidget = args.opencgaBrowserWidget || this.opencgaBrowserWidget;
    }

	this.adapter = new OpencgaManager();
	this.adapter.onUploadObjectToBucket.addEventListener(function(sender,res){
		if(res.status == 'done'){

//            _this.adapter.onIndexer.addEventListener(function(sender,data){
//                console.log(data);
//                _this.uploadComplete(data);
//            });
//            _this.adapter.indexer($.cookie("bioinfo_account"),_this.objectID);
            console.log(_this.objectID);
			_this.uploadComplete(res.data);
		}else if (res.status == 'fail'){
			_this.uploadFailed(res.data);
		}
	});
	
	this.uploadButtonId = this.id+'_uploadButton';
	this.uploadFieldId = this.id+'_uploadField';
	
	this.selectedDataType = null;
}

//UploadWidget.prototype.getsdf = function(){
//	return this.id+'_uploadButton';
//};

UploadWidget.prototype = {
    getTypeValidation : function(types){
        return function(filename){
            var regex = new RegExp('^.*\\.('+types+')$', 'i');
            return regex.test(filename);
        }
    }
};


UploadWidget.prototype.draw = function(opencgaLocation){
	this.opencgaLocation = opencgaLocation;
	var dataTypes = {};
	dataTypes["9"]=[
		            { text: "ID List", children: [
		                { text: "SNP", tag:"idlist:snp"},//el tag es para introducirlo en la base de datos al subir los datos
		                { text: "Gene/Transcript",tag:"idlist:gene:transcript"}//si son varios van separados por ->  :
		            ] },
		            { text: "Feature", children: [
		                { text: "VCF 4.0", tag:"vcf", validate:this.getTypeValidation('vcf')},
//		                { text: "Tabix index", tag:"tbi"},
		                { text: "GFF2", tag:"gff2"},
		                { text: "GFF3", tag:"gff3"},
		                { text: "GTF", tag:"gtf"},
		                { text: "BED", tag:"bed"},
		                { text: "BAM", tag:"bam", validate:this.getTypeValidation('bam')},
		                { text: "BAI", tag:"bai", validate:this.getTypeValidation('bai')},
		                { text: "Expression", tag:"expression"}
		            ] }
		        ];
	dataTypes["6"]=[
		            { text: "Feature", children: [
		                { text: "VCF 4.0", tag:"vcf"},
		                { text: "GFF2", tag:"gff2"},
		                { text: "GFF3", tag:"gff3"},
		                { text: "GTF", tag:"gtf"},
		                { text: "BED", tag:"bed"}
		            ] }
		        ];
	dataTypes["11"]=[
	             {text : "Annotation", tag:"annotation"},
	             {text : "ID List", children : [ 
		         { text : "Gene",tag : "idlist:gene"	}, 
		         { text : "Ranked", tag : "ranked"	} 
		         ]
	} ];
	dataTypes["12"]=[
		             {text : "Abundances", tag:"abundances"}
		        ];
	dataTypes["100"]=[
		             {text : "Sequence", tag:"sequence"}
		        ];
    dataTypes["22"]=[
        {text : "Tabbed text file", tag:"txt", validate:this.getTypeValidation('txt|text')},
        {text : "CEL compressed file", tag:"cel", validate:this.getTypeValidation('zip|tar|tar.gz|tgz')}
    ];
	switch (this.suiteId){
		case 9: this.checkDataTypes(dataTypes["9"]); this.render(dataTypes["9"]); break;
		case 6: this.checkDataTypes(dataTypes["6"]); this.render(dataTypes["6"]); break;
		case 11: this.checkDataTypes(dataTypes["11"]); this.render(dataTypes["11"]); break;
		case 12: this.checkDataTypes(dataTypes["12"]); this.render(dataTypes["12"]); break;
		case 22: this.checkDataTypes(dataTypes["22"]); this.render(dataTypes["22"]); break;
		case 100: this.checkDataTypes(dataTypes["100"]); this.render(dataTypes["100"]); break;
		case -1: break;
		default: this.render([{text: "No data types defined"}]);		
	}
};

UploadWidget.prototype.clean = function (){
	if (this.panel != null){
		this.panel.destroy();
		delete this.panel;
		console.log(this.id+' PANEL DELETED');
	}
};

UploadWidget.prototype.checkDataTypes = function (dataTypes){
	for (var i = 0; i<dataTypes.length; i++){
		if(dataTypes[i]["children"]!=null){
			dataTypes[i]["iconCls"] ='icon-box';
			dataTypes[i]["expanded"] =true;
			this.checkDataTypes(dataTypes[i]["children"]);
		}else{
			dataTypes[i]["iconCls"] ='icon-blue-box';
			dataTypes[i]["leaf"]=true;
		}
	}
	
};

UploadWidget.prototype.render = function(dataTypes){
	var _this=this;
	if (this.panel == null){
		var store = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "Data type",
		        children: dataTypes
		    }
		});
		var height = Object.keys(store.tree.nodeHash).length*23;
		if (height<250){
				height=250;
		} 
		
		
		var pan1Width = 250;		
		var pan1 = Ext.create('Ext.tree.Panel', {
		    title: 'Select your data type',
		    bodyPadding:10,
		   	height : height,
		   	border:false,
		   	cls:'panel-border-right',
		   	width: pan1Width,
		    store: store,
		    useArrows: true,
		    rootVisible: false,
		    listeners : {
			    	scope: this,
			    	itemclick : function (este,record){
			    		if(record.data.leaf){
			    			this.selectedDataType = record.raw.tag;
			    			this.selectedDataTypeObj = record.raw;
			    			this.dataTypeLabel.setText('<span class="info">Type:</span><span class="ok"> OK </span>',false);
			    		}else{
			    			this.selectedDataType = null;
			    			this.selectedDataTypeObj = null;
			    			this.dataTypeLabel.setText('<span class="info">Select a data type</span><span class="err"> !!!</span>',false);
			    		}
			    		this.validate();
		    		}
			}
		});
		
		this.nameField = Ext.create('Ext.form.field.Text', {
	        name: 'datalabel',
	        fieldLabel: 'Data name',
	        labelWidth: 110,
	        msgTarget: 'side',
	        //allowBlank: false,
	        enableKeyEvents: true,
	        listeners: {
		        scope: this,
		        change: function(el) {
		        		if(el.getValue()!=""){
			        		this.dataNameLabel.setText('<span class="info">Name:</span><span class="ok"> OK </span>',false);			        			
		        		}else{
		        			this.dataNameLabel.setText('<span class="info">Enter the data name</span><span class="err"> !!!</span>',false);
		        		}
						this.validate();
		       	}
	        }
		});
		this.textArea = Ext.create('Ext.form.field.TextArea', {
			   name: 'datadescription',
			   fieldLabel: 'Data description',
			   labelWidth: 110,
			   msgTarget: 'side'
		});
		this.organizationField = Ext.create('Ext.form.field.Text', {
	        name: 'organization',
	        fieldLabel: 'Organization',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		this.responsableField = Ext.create('Ext.form.field.Text', {
	        name: 'responsable',
	        fieldLabel: 'Responsible',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		this.acquisitiondate = Ext.create('Ext.form.field.Text', {
	        name: 'acquisitiondate',
	        fieldLabel: 'Acquisition date',
	        labelWidth: 110,
	        msgTarget: 'side'
		});
		
		var pan2Width = 350;
		var pan2 = Ext.create('Ext.panel.Panel', {
			title: 'Some aditional data',
		    width: pan2Width,
		    border:false,
		    height : height,
		    bodyPadding: 15,
		    items: [this.nameField,this.textArea,this.organizationField,this.responsableField,this.acquisitiondate]
	
		});
				  
		this.dataTypeLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Select a data type</span>'
		});
		this.dataNameLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Enter the data name</span>'
		});
		this.dataFieldLabel = Ext.create('Ext.toolbar.TextItem', {
			text:'<span class="info">Select a data file</span>'
		});		
		this.originCheck = Ext.create('Ext.form.field.Checkbox', {
			xtype:'checkbox',
			margin:'0 0 5 5',
			boxLabel : 'Text mode',
			listeners: {
			      scope: this,
			      change: function(){
			      		if(this.originCheck.getValue()){
			      			this.dataFieldLabel.setText('<span class="ok">'+this.editor.getValue().length+'</span><span class="info"> chars</span>',false);
							this.uploadBar.hide();
			      			this.editor.show();
			      			this.uploadField.destroy();
			      			this.uploadField.setRawValue(null);
			       		}else{
			       			this.dataFieldLabel.setText('<span class="info">Select a data file</span>',false);
			       			this.editor.hide();
							this.uploadBar.show();
			       			this.editor.setRawValue(null);
			       			this.createUploadField();
			       		}
			       		this.validate();
			       }
			}
		});		
		var uploadButton = Ext.create('Ext.button.Button', {
			 id:this.uploadButtonId,
			 text: 'Upload',
			 disabled:true,
			 handler: function() {
//				_this.uploadMsg =  Ext.Msg.show({
//					 closable:false,
//				     title:'Uploading file',
//				     msg: 'Please wait...'
//				});
				_this.uploadFile2();
	        }
		});
		
		
        
		this.editor = Ext.create('Ext.form.field.TextArea', {
       	 	xtype: 'textarea',
        	width: 602,
        	flex:1,
        	height: 100,
        	emptyText:'Paste or write your file directly',
        	hidden:true,
        	name: 'file',
        	margin:"-1",
        	enableKeyEvents:true,
        	listeners: {
			       scope: this,
			       change: function(){
			       			this.dataFieldLabel.setText('<span class="ok">'+this.editor.getValue().length+'</span> <span class="info"> chars</span>',false);
			       			this.validate();
			       }
			       
	        }
		});
		
		this.uploadBar = Ext.create('Ext.toolbar.Toolbar',{cls:"bio-border-false"});
		this.createUploadField();
		
		this.modebar = Ext.create('Ext.toolbar.Toolbar',{
			dock:'top',
			height:28,
			border:false,
			items:[this.originCheck,'->',this.dataTypeLabel,'-',/*this.dataNameLabel,'-',*/this.dataFieldLabel]
		});
		
		var pan3 = Ext.create('Ext.panel.Panel', {
			title: 'File origin',
		    colspan:2,
		    border:false,
		    width: pan1Width+pan2Width,
		    cls:'panel-border-top',
//		    bodyStyle:{"background-color":"#d3e1f1"}, 
		    items:[this.uploadBar,this.editor],
		    bbar:this.modebar
		});

		this.panel = Ext.create('Ext.window.Window', {
		    title: 'Upload a data file'+' -  <span class="err">ZIP files will be allowed shortly</span>',
		    iconCls:'icon-upload',
		    resizable: false,
//		    minimizable :true,
			constrain:true,
		    closable:false,
		    modal:true,
			layout: {
       			 		type: 'table',
       			 		columns: 2,
       			 		rows:2
    				},
		    items: [pan1,pan2,pan3],
		    buttonAlign:'right',
		    buttons : [{text:"Close",handler:function(){_this.panel.destroy();}}, uploadButton],
		    listeners: {
			       scope: this,
			       minimize:function(){
			       		this.panel.destroy();
			       },
			       destroy: function(){
			       		delete this.panel;
			       }
	        }
		});
		
	}
	this.panel.show();
};


UploadWidget.prototype.createUploadField = function()  {
	this.uploadField = Ext.create('Ext.form.field.File', {
			id:this.uploadFieldId,
			xtype: 'filefield',
			name: 'file',
	        flex:1,
	        padding:1,
	        msgTarget: 'side',
	        emptyText: 'Choose a file',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: 'Open file...',
	        listeners: {
			       scope: this,
			       change:  function() {
		             		this.fileSelected();
							this.validate();
			       }
	        }
        });
    this.uploadBar.add(this.uploadField);
};

UploadWidget.prototype.validate = function (){
//	console.log(this.selectedDataType != null);
//	console.log(this.nameField.getValue() !="");
//	console.log((this.uploadField.getRawValue()!="" || this.editor.getValue()!=""));

    var extensionValid = true;
    if(this.selectedDataTypeObj.validate != null){
        extensionValid = this.selectedDataTypeObj.validate(Ext.getCmp(this.uploadFieldId).getValue());
    }

    if (extensionValid && this.selectedDataType != null /*&& this.nameField.getValue() !=""*/ && (this.uploadField.getRawValue()!="" || this.editor.getValue()!="") ){
        Ext.getCmp(this.uploadButtonId).enable();
        this.dataTypeLabel.setText('<span class="info">Type:</span><span class="ok"> OK </span>',false);
    }else{
        Ext.getCmp(this.uploadButtonId).disable();
        this.dataTypeLabel.setText('<span class="info">Type:</span><span class="err"> Not valid </span>',false);
    }
};


UploadWidget.prototype.fileSelected = function (){
		var inputId=this.uploadField.fileInputEl.id;
        var file = document.getElementById(inputId).files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1024 * 1024)
        	  fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
          else
        	  fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

           
          this.dataFieldLabel.setText('<span class="info">Size: </span><span class="ok">'+fileSize+'</span>',false);
//          document.getElementById('fileName').innerHTML = '<b>Name</b>: ' + file.name;
//          document.getElementById('fileSize').innerHTML = '<b>Size</b>: ' + fileSize;
//          document.getElementById('fileType').innerHTML = '<b>Type</b>: ' + file.type;
        }
};

UploadWidget.prototype.uploadFile = function()  {
	var _this=this;
	Ext.getBody().mask('Uploading file...');
	this.panel.disable();

    var fd = new FormData();
    var inputFileName = null;
    if(this.originCheck.getValue()){
    	inputFileName = this.nameField.getValue();
    	fd.append("file", this.editor.getValue());
    }else{
		var inputFile = document.getElementById(Ext.getCmp(this.uploadFieldId).fileInputEl.id).files[0];
		inputFileName = inputFile.name;
	    fd.append("file", inputFile);
    }
    var sessionId = $.cookie('bioinfo_sid');
    var objectId = this.opencgaLocation.directory+inputFileName;
    objectId = objectId.replace(new RegExp("/", "gi"),":");

   	fd.append("name", this.nameField.getValue()); 
   	fd.append("fileFormat", this.selectedDataType);
   	fd.append("responsible", this.responsableField.getValue());
   	fd.append("organization", this.organizationField.getValue());
   	fd.append("date", this.acquisitiondate.getValue());
   	fd.append("description", this.textArea.getValue());
   	fd.append("objectid", objectId);
   	fd.append("sessionid", sessionId);


    //TODO DELETE THIS
    this.objectID = this.opencgaLocation.bucketId+":"+objectId;

	//accountid, sessionId, projectname, formData
	this.adapter.uploadObjectToBucket($.cookie("bioinfo_account"), sessionId, this.opencgaLocation.bucketId, objectId, fd);
	
};

UploadWidget.prototype.uploadFile2 = function()  {
	var _this=this;

    var inputFile = document.getElementById(Ext.getCmp(this.uploadFieldId).fileInputEl.id).files[0];

    var objectId = this.opencgaLocation.directory+inputFile.name;
    objectId = objectId.replace(new RegExp("/", "gi"),":");

    var fileuploadWorker = new Worker(UPLOAD_WORKER);
    this.opencgaBrowserWidget.addUpload(inputFile, fileuploadWorker);
    fileuploadWorker.postMessage({
        'host':OPENCGA_HOST,
        'accountId': $.cookie("bioinfo_account"),
        'sessionId': $.cookie("bioinfo_sid"),
        'file' : inputFile,
        'objectId':objectId,
        'fileFormat': this.selectedDataType,
        'bucketId':this.opencgaLocation.bucketId,
        'resume' : true
    });
    this.panel.close();
};

//UploadWidget.prototype.uploadProgress = function(evt)  {
//	console.log("Progress...");
//    if (evt.lengthComputable) {
//      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
//  		console.log(percentComplete);
////      document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
//    }
//    else {
//    	console.log('unable to compute');
////      document.getElementById('progressNumber').innerHTML = 'unable to compute';
//    }
//};

UploadWidget.prototype.uploadComplete = function(response)  {
	/* This event is raised when the server send back a response */
//	this.dataFieldLabel.setText('<span class="info">Upload </span><span class="ok">finished successfully</span> '+response,false);
	var msg = "Uploaded sucessfully";
	if (response.indexOf("ERROR")!=-1){//el createErrorResponse devuelte la palabra error siempre o deberia
		msg = response;
	}
	Ext.Msg.show({
		title:'Upload status',
		msg: msg
	});
	this.panel.enable();
	Ext.getBody().unmask();
	if (msg == "Uploaded sucessfully"){
		this.panel.close();
	}
};

UploadWidget.prototype.uploadFailed = function(response)  {
	console.log(response);
	Ext.Msg.show({
		title:'Upload status',
		msg: 'There was an error attempting to upload the file.'
	});
//	alert("There was an error attempting to upload the file.");
	this.panel.enable();
	Ext.getBody().unmask();
};

UploadWidget.prototype.uploadCanceled = function(response)  {
	console.log(response);
	Ext.Msg.show({
		title:'Upload status',
		msg: 'The upload has been canceled by the user or the browser dropped the connection.'
	});
//	alert("The upload has been canceled by the user or the browser dropped the connection.");
	this.panel.enable();
	Ext.getBody().unmask();
};
