function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $("#lat").text("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	$("#lat").text(position.coords.latitude);
	$("#long").text(position.coords.longitude);
}
$(document).ready(function(){
	$("#city").autocomplete({
		source: function (request, response){
			$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
				function (data) {
			 		response(data);
				}
		 	);
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 $("#city").val(selectedObj.value);
		 return false;
		},
		open: function () {
		 $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 	$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	});
	$("#city").autocomplete("option", "delay", 100);
	$( "#city" ).autocomplete({
   		search: function(event, ui) { 
       		$("#semantic").addClass("loading");
   		},
   		open: function(event, ui) {
       		$("#semantic").removeClass("loading");
   		}
	});
	$("#city").keyup(function(event){
		if(event.keyCode == 13){
			var city = $("#city").val();
			if(city != ""){
				$.simpleWeather({
    				location: city,
    				woeid: '',
    				unit: 'c',
    				success: function(weather) {
    					$("#temperature").animate({opacity: '0'}, function(){
    						$(this).html(weather.temp + '&deg;'+ weather.units.temp).animate({opacity: '1'});
    					});
    					$("#weathericon").animate({opacity: '0'}, function(){
    						$(this).html('<img src="' + weather.image + '" id= "wicon">').animate({opacity: '1'});
    					});
    					$("#cityname").animate({opacity: '0'}, function(){
    						$(this).html(weather.city).animate({opacity: '1'});
    					});
    					$("#description").animate({opacity: '0'}, function(){
    						$(this).html(weather.currently).animate({opacity: '1'});
    					});
    					$("#country").animate({opacity: '0'}, function(){
    						$(this).html(weather.country).animate({opacity: '1'});
    					});
    					$("#hdata").animate({opacity: '0'}, function(){
    						$(this).html(weather.humidity + '%').animate({opacity: '1'});
    					});
    					$("#vis").animate({opacity: '0'}, function(){
    						$(this).html(weather.visibility + " " +weather.units.distance).animate({opacity: '1'});
    					});
    					$("#wind").animate({opacity: '0'}, function(){
    						$(this).html(weather.wind.speed + " " + weather.units.speed).animate({opacity: '1'});
    					});
    					$("#humidity").animate({opacity: '0'}, function(){
    						$(this).animate({opacity: '1'});
    					});
    					$("#visibility").animate({opacity: '0'}, function(){
    						$(this).animate({opacity: '1'});
    					});
    					$("#windicon").animate({opacity: '0'}, function(){
    						$(this).animate({opacity: '1'});
    					});
    				}
    			});
				$("#error").animate({opacity: '1'}, function(){
					$(this).text("").animate({opacity: '0'});
				});
				$("#header").animate({
					margin: '5% auto auto auto'
				});
				$(".weather").animate({
					opacity: '1'
				});
			}
			else{
				$("#error").animate({opacity: '0'}, function(){
					$(this).text('Field cannot be empty!').animate({opacity: '1'});
				});
			}
		}
	});
});
