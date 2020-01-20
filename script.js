var id,loaded=0;

function load(c){
    var img=new Image();
    img.onload=function(){
        loaded++;
        $('#game').append('<img title="'+c+'" src="https://robohash.org/'+c+'.png?set=set5&size=250x250">');
        $('#loading').text(Math.round(loaded*6.25)+'%');
        if(loaded==16){
            $('#loading').fadeOut();
            $('#game').fadeIn();
        }
    };
    img.onerror=function(){
        load(c);
    };
    img.src='https://robohash.org/'+c+'.png?set=set5&size=250x250';
}

$(function(){
    
    $('#play').click(function(){
        $('#home').fadeOut();
        $('#loading').fadeIn();
        var d=new Date().getTime().toString();
        id=md5(d.substring(0,d.length-4));
        console.log("Game ID: "+id);
        $('#game').html('');
        var chars=id.match(/.{1,2}/g),html='';
        chars.forEach(function(c){
            load(c);
        });
    });
    
    $('#game').on('click','img',function(){
        $(this).toggleClass('off');
    });
    
});