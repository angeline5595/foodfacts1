var fs=require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv') //reading csv file
});
var dataArray=[],countryArray=[],regionArray=[];
var indexSugar=0,indexSalt=0,indexCountry=0,indexFat=0,indexProtein=0,indexCarbo=0;
var country=0,sugar=0,salt=0,sugarsalt=0,i=0,fat=0,protein=0,carbohydrate=0,j=0,country1="",region1="",len=0,len1=0,len2=0,len3=0;
var barChart = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var northEurope = ['United Kingdom' , 'Denmark' , 'Sweden' , 'Norway'];
var centralEurope = ['France','Belgium' , 'Germany' , ' Switzerland' , 'Netherlands'];
var southEurope = ['Portugal', 'Greece' , 'Italy' , 'Spain' , 'Croatia' , 'Albania'];
var group=['NorthernEurope','CentralEurope','SouthernEurope'];
var temp="",temp1="";
var k=0,k1=0,k2=0,k3=0;
var addinfo=0;
var addfat=0;
var addprotein=0;
var addcarbohydrate=0;
var finalCountry=[];
var finalRegion=[];
var count=0;
function countryBar(sugarySalt,countries) {  //function for countryArray
  this.sugarySalt = sugarySalt;
  this.countries = country;
};//end function
function regionChart(fat1,protein1,carbohydrate1,region1) {   //function for regionArray
  this.fat1=fat1;
  this.protein1=protein1;
  this.carbohydrate1=carbohydrate1;
  this.region1=region1;
};//end function
function countChart(countriess,saltsugarInfo1)  {   //function for finalCountry
  this.countriess=countriess;
  this.saltsugarInfo1=saltsugarInfo1;
};//end function
function regChart(fatss,proteinss,carbos,regionss){ //function for finalRegion
  this.fatss=fatss;
  this.proteinss=proteinss;
  this.carbos=carbos;
  this.regionss=regionss;
};//end function
lineReader.on('line', function (line) {    //start
  k=0,k1=0,k2=0,k3=0;
     dataArray=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); //date spliting
     while(i<1) //start while loop for reading index
     {
        indexCountry=dataArray.indexOf('countries_en');
        indexSugar=dataArray.indexOf('sugars_100g');
        indexSalt=dataArray.indexOf('salt_100g');
        indexFat=dataArray.indexOf('fat_100g');
        indexProtein=dataArray.indexOf('proteins_100g');
        indexCarbo=dataArray.indexOf('carbohydrates_100g');
        i++;
    }  //end while loop for reading index
   country=dataArray[indexCountry];
   sugar=dataArray[indexSugar];
   salt=dataArray[indexSalt];
   fat=dataArray[indexFat];
   protein=dataArray[indexProtein];
   carbohydrate=dataArray[indexCarbo];
   if(sugar=="")
   {
     sugar=0;
   }
   if(salt=="")
   {
     salt=0;
   }
   if(country=="")
   {
     country="N";
   }
   if(fat=="")
   {
     fat=0;
   }
   if(protein=="")
   {
     protein=0;
   }
   if(carbohydrate=="")
   {
     carbohydrate=0;
   }
   sugarSalt=parseFloat(sugar)+parseFloat(salt); //adding the sugar and salt values
   len=barChart.length;
   while(k>=0&&k<len) //start while loop to check country
   {
       if((country).includes(barChart[k]))
           country1=barChart[k];
               k++;
   }  ////end while loop to check country
  if(country1)
  {
       countryArray.push(new countryBar(sugarSalt.toFixed(2),country1)); //passing the values
  }
  len1=northEurope.length;
  while(k1>=0 && k1<len1) //start while loop to find region
  {
       if((country).includes(northEurope[k1]))
           region1="NorthernEurope";
           k1++;
  } //end while loop

  len2=centralEurope.length;
  while(k2>=0&&k2<len2) //start while loop to find region
  {
       if((country).includes(centralEurope[k2]))
           region1="CentralEurope";
           k2++;
  }//end while loop
  len3=southEurope.length;
  while(k3>=0&&k3<len3)//start while loop to find region
  {
       if((country).includes(southEurope[k3]))
           region1='SouthernEurope';
           k3++;
  }//end while loop
   if(region1){
       regionArray.push(new regionChart(fat,protein,carbohydrate,region1));//passig the values
  }
});//end

  lineReader.on('close', function() { //start
  for(var m=0;m<barChart.length;m++) //start forloop to read barchart array values
  {
    addinfo=0;
    for(var n=0;n<countryArray.length;n++){ //start forloop to read country array values
       if((countryArray[n].countries).includes(barChart[m]))
       {
          temp=barChart[m];
          addinfo=addinfo+parseFloat(countryArray[n].sugarySalt); //adding the salt and sugar info
       }
  }//end forloop to read country array values
  finalCountry.push(new countChart(temp,addinfo.toFixed(2)));//passing the final values
}//end forloop to read barchart array values

  for(var m=0;m<group.length;m++)//start forloop to read group array values
  {
    addfat=0;
    addprotein=0;
    addcarbohydrate=0;
    for(var n=0;n<regionArray.length;n++){//start forloop to read region array values
      if((regionArray[n].region1).includes(group[m]))
      {
        temp1=group[m];
        addfat=addfat+parseFloat(regionArray[n].fat1);//adding fat values
        addprotein=addprotein+parseFloat(regionArray[n].protein1);//assing protein values
        addcarbohydrate=addcarbohydrate+parseFloat(regionArray[n].carbohydrate1);//adding carbohydrate values
      }
  }//end forloop to read group array values
  finalRegion.push(new regChart(addfat.toFixed(2),addprotein.toFixed(2),addcarbohydrate.toFixed(2),temp1));//passing the final values

}//end forloop to read region array values
//console.log(JSON.stringify(finalCountry));
//console.log(JSON.stringify(finalRegion));
fs.writeFile('country5.json', JSON.stringify(finalCountry) , 'utf-8');//writing json values into file
fs.writeFile('region.json', JSON.stringify(finalRegion) , 'utf-8');//writing json values into file
});//end
