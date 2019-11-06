/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );
var OBJECTD ={};
require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('IPvisulualizations.qvf', config);
    console.log('app');
	console.log(app);

	//get objects -- inserted here --
	OBJECTD = app.getObject('QV01','cxpXqjn');
	console.log(OBJECTD);
	
	//create cubes and lists -- inserted here --

} );
function GetALLData(){
	var longitudeVsCityBar = OBJECTD;
    console.log('Prefix : ',prefix);
	console.log('Config : ',config);
	console.log(longitudeVsCityBar);
	console.log(longitudeVsCityBar.$$state);
	console.log(longitudeVsCityBar.$$state.value.layout.qHyperCube.qDataPages[0].qMatrix[0]);
    let A = longitudeVsCityBar.$$state.value.layout.qHyperCube.qDataPages[0].qMatrix;
    const CSVContent=[];
	var A11=['Dimension','Measure'];
	CSVContent.push(A11);
	for(let i in A){
	var A1=[];
	//console.log(i,A[i]);
	//console.log(i,A[i][0].qText,A[i][0].qNum);
//	console.log(i,A[i][1].qText,A[i][1].qNum);
	var td1 = $('<td/>').append(parseInt(i)+1);
	var td2 = $('<td/>').append(A[i][0].qText);
	A1.push(A[i][0].qText);
	var td3 = $('<td/>').append(A[i][1].qText);
	A1.push(A[i][1].qText);
	CSVContent.push(A1);
    $('#snd').append(td1).append('<br />');
	$("#countryd").append(td2).append('<br />');
	$('#spendd').append(td3).append('<br />');
	}
	console.log(CSVContent);
	let csvContent = "data:text/csv;charset=utf-8," 
    + CSVContent.map(e => e.join(",")).join("\n");
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link);
link.click();
	}
