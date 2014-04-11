window.boosley = function(){
    //setInterval(function(){
        var jColl = $('.active_date');
        for(var i = 0; i < jColl.length; i++){
            var jEle = $(jColl[i]);
            var _date = new Date(jEle.attr('data-date'));

            var seconds = _date.getTime() - new Date().getTime();
            console.log(jEle.attr('data-date'), _date, new Date());
            var display = seconds;
            var measurement = 'Seconds';
            if(display > 60){
                display = display / 60;
                measurement = 'Minutes';
            }
            if(display > 60){
                display = display / 60;
                measurement = 'Hours';
            }
            if(display > 24){
                display = display / 24;
                measurement = 'Days';
            }
            jEle.html(Math.round(display) + ' ' + measurement);
        }
    //}, 1000);
}