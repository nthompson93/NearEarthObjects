function getData()
{
	//TODAY'S DATE FOR JSON ARRAY - BEGIN
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if(dd < 10)
	{
		dd = "0" + dd;
	}
	if(mm < 10)
	{
		mm = "0" + mm;
	}
	today = yyyy + "-" + mm + "-" + dd;

	//REQUEST AND PARSE DATA - BEGIN
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + today + "&end_date=" + today + "&api_key=NnRe38qGPTpKPtsenpkqROMTtXvkWnVNyql9lmnP", false);
	//xhr.open("GET", "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=NnRe38qGPTpKPtsenpkqROMTtXvkWnVNyql9lmnP", false);
	xhr.send(null)
	var responseData = JSON.parse(xhr.response);

	//FIND NUMBER OF NEAR EARTH OBJECTS 
	var numObjects = responseData.element_count;

	//POPULATE PAGE WITH DIV TAGS EQUIVALENT TO "numObjects"
	for(i = 0; i < numObjects; i++)
	{
		//CREATE VARIABLES
		var box      = document.getElementById("buildTo"); //var that represents the tag on the html
		var divTag   = document.createElement("div");      // create containing div tag 
		var hTag     = document.createElement("h1");       // h1 tag for title bar of NEO 
		var pTag     = document.createElement("p");		   //SUB TEXT FOR HAZARD
		var pTagT    = document.createElement("p");        //SUB TEXT FOR DIAMETER
		var pTagTh   = document.createElement("p");		   //SUB TEXT FOR SPEED
		var pTagF    = document.createElement("p");	  	   //SUB TEXT FOR MISS DISTANCE
		var fRow     = document.createElement("row");      //1ST ROW WITHIN NEO BOX
		var sRow     = document.createElement("row");      //2ND ROW WITHING NEO BOX
		var fRowColO = document.createElement("div");      //FIRST ROW COLUMN ONE
		var fRowColT = document.createElement("div");      //FIRST ROW COLUMN TWO
		var sRowColO = document.createElement("div"); 	   //SECOND ROW COLUMN ONE
		var sRowColT = document.createElement("div");      //SECOND ROW COLUMN TWO

		//BUILD FRAME OF NEO BOX ******************************************
		box.appendChild(divTag);
		divTag.appendChild(hTag);
		divTag.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-4")
		divTag.setAttribute("id", "box");
		divTag.appendChild(fRow);
		divTag.appendChild(sRow);

		//FIRST ROW
		fRow.appendChild(fRowColO);
		fRowColO.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6")
		fRowColO.setAttribute("id", "boxQuarter");
		fRow.appendChild(fRowColT);
		fRowColT.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6")
		fRowColT.setAttribute("id", "boxQuarter");

		//SECOND ROW
		sRow.appendChild(sRowColO);
		sRowColO.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6")
		sRowColO.setAttribute("id", "boxQuarter");
		sRow.appendChild(sRowColT);
		sRowColT.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6")
		sRowColT.setAttribute("id", "boxQuarter");
		//*****************************************************************

		//BUILD AND POPULATE NEO NAME
		var neoName = responseData.near_earth_objects[today][i].name; //GET NEO NAME 
		var neoName = "NEO NAME: " + neoName;
		var neoNameNode = document.createTextNode(neoName);    		  //CREATE NODE OF NAME
		hTag.setAttribute("id", "boxHeader"); 						  //ASSIGN ID TO BOXHEADER
		hTag.appendChild(neoNameNode);        						  //APPEND NAME TO H1 TAG  

		//BUILD AND POPULATE NEO HAZARD
		var neoHazard = responseData.near_earth_objects[today][0].is_potentially_hazardous_asteroid; //GET NEO HAZARD
		if(neoHazard == false)
		{
			neoHazard = "Non-Hazardous";
		}
		else
		{
			neoHazard = "Hazardous";
		}
		var neoHazardNode = document.createTextNode(neoHazard);
		fRowColO.appendChild(neoHazardNode);
		fRowColO.appendChild(pTag);
		var hazText = "HAZARD LEVEL";
		var hazTextNode = document.createTextNode(hazText);
		pTag.setAttribute("class", "subText");
		pTag.appendChild(hazTextNode);
		
		//BUILD AND POPULATE NEO SIZE
		var neoDiamMin = responseData.near_earth_objects[today][i].estimated_diameter.feet.estimated_diameter_min;
		var neoDiamMin = Math.round(neoDiamMin);
		neoDiamMin = addCommas(neoDiamMin);
		var neoDiamMax = responseData.near_earth_objects[today][i].estimated_diameter.feet.estimated_diameter_max;
		var neoDiamMax = Math.round(neoDiamMax);
		neoDiamMax = addCommas(neoDiamMax);
		var neoDiameter = neoDiamMin + " FT - " + neoDiamMax + " FT";
		var neoDiamNode = document.createTextNode(neoDiameter);
		fRowColT.appendChild(neoDiamNode);
		fRowColT.appendChild(pTagT);
		var diamText = "ESTIMATED DIAMETER";
		var diamTextNode = document.createTextNode(diamText);
		pTagT.setAttribute("class", "subText");
		pTagT.appendChild(diamTextNode);

		//BUILD AND POPULATE NEO SPEED
		var neoSpeed = responseData.near_earth_objects[today][i]["close_approach_data"][0]["relative_velocity"]["miles_per_hour"];
		var neoSpeed = Math.round(neoSpeed);
		neoSpeed = addCommas(neoSpeed);
		var neoSpeed = neoSpeed + " MPH";
		var neoSpeedNode = document.createTextNode(neoSpeed)
		sRowColO.appendChild(neoSpeedNode);
		sRowColO.appendChild(pTagTh);
		var speedText = "ESTIMATED VELOCITY";
		var speedTextNode = document.createTextNode(speedText);
		pTagTh.setAttribute("class", "subText");
		pTagTh.appendChild(speedTextNode);

		//BUILD AND POPULATE NEO MISS DISTANCE
		var neoMiss = responseData.near_earth_objects[today][i]["close_approach_data"][0]["miss_distance"]["miles"];
		neoMiss = Math.round(neoMiss);
		neoMiss = addCommas(neoMiss);
		var neoMissNode = document.createTextNode(neoMiss + " MILES");
		sRowColT.appendChild(neoMissNode);
		sRowColT.appendChild(pTagF);
		var missText = "DISTANCE FROM EARTH";
		var missTextNode = document.createTextNode(missText);
		pTagF.setAttribute("class", "subText");
		pTagF.appendChild(missTextNode);	
	}
}

function addCommas(nStr){
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
 }
 return x1 + x2;
}