$(()=>{

    // Variables
    var nouns = [];
    var adjectives = [];
    var loaded = 0;
    var myChar;

    // Load nouns and adjectives
    $.get('assets/nouns.txt',n=>nouns=n.split('\n'));
    $.get('assets/adjectives.txt',a=>adjectives=a.split('\n'));

    // Randomize seed
    $('#menu .random').click(()=>$('#menu input').val(`${adjectives[Math.floor(Math.random()*adjectives.length)]}_${nouns[Math.floor(Math.random()*nouns.length)]}`));

    // Enter => Go
    $('#menu input').on('keydown',e=>{
        if(e.key=='Enter') $('#menu .go').click();
    })

    // Start game
    $('#menu .go').click(()=>{
        if($('#menu input').val()){
            $('#menu').addClass('off');
            var chars = sha512($('#menu input').val()).match(/.{1,8}/g);
            chars.forEach(load);
            $('#loading').removeClass('off');
        }
    });

    // Load characters
    function load(hash){
        var img=new Image();
        img.onload = ()=>{
            loaded++;
            $('#pick div,#game div').append(`<img draggable="false" hash="${hash}" src="https://avatars.dicebear.com/api/avataaars/${hash}.svg">`);
            $('#loading .progress').text(Math.round(loaded*6.25));
            if(loaded==16){
                $('#loading').addClass('off');
                $('#pick').removeClass('off');
            }
        }
        img.onerror = ()=>load(c);
        img.src = `https://avatars.dicebear.com/api/avataaars/${hash}.svg`;
    }

    // Pick character
    $('#pick div').on('click','img',function(){
        $('#pick').addClass('off');
        myChar = $(this).attr('hash');
        $('#myChar').attr('src',`https://avatars.dicebear.com/api/avataaars/${myChar}.svg`);
        $('#game,#myChar').removeClass('off');
    });

    // Show/hide character
    $('#game div').on('click','img',function(){
        $(this).toggleClass('hide');
    });

    // Show myChar
    $('#myChar').click(function(e){
        e.stopPropagation();
        $('#game').addClass('off');
        $(this).addClass('show');
    });
    $(window).click(()=>{
        if($('#myChar').hasClass('show')){
            $('#myChar').removeClass('show');
            $('#game').removeClass('off');
        }
    });

})