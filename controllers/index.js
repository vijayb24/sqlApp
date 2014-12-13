'use strict';


var IndexModel = require('../models/index');
var mysql =  require('mysql');

 var connection =  mysql.createConnection({
  	host : 'localhost',
  	user : 'root',
  	password: ''
  });
connection.query('use testsql');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
    	res.render('index', model); 
    });

    router.get('/displayData', function (req, res) {       
        //console.log(mysql);
                    
			var strQuery = 'select * from empdata';		

        	connection.query( strQuery, function(err, rows){
			  	if(err)	{
			  		throw err;
			  	}else{
			  		var data=[];
			  		for(var i=0;i<rows.length;i++) {
			  			data.push(rows[i]);
			  		}
			  		//console.log( data );
			  		//res.end(JSON.stringify(data));
			  		model.eData = data;
			  		console.log(model.eData);

			  		//res.render('displayData', { title: 'nodeJS', 'items':data }); 
			  		res.render('displayData', model); 

			  	}
			  });
        	console.log();
     			
     			  
    });
    router.get('/edit/:id/',function(req,res){
    var getEmpId=req.params.id;
     

			var strQuery = 'select * from empdata where empId='+ getEmpId;		  
            
        	  connection.query( strQuery, function(err, rows){
			  	if(err)	{
			  		throw err;
			  	}else{
			  		var data=[];
			  		for(var i=0;i<rows.length;i++) {
			  			data.push(rows[i]);
			  		}
			  		//res.end(JSON.stringify(data));
			  		res.render('editData', { title: 'nodeJS', 'items':data }); 

			  	}
			  });

    });


};
