$(function(){
    $('.st-menu').mCustomScrollbar({
        theme:'minimal-dark',
        axis:'y',
        scrollInertia:1000,
        autoHideScrollbar: true
    });
    var long=$('.long');
    for(var i=0,len=long.length;i<len;i++){
        $(long[0].children[0]).addClass('checking-now'+i.toString());
        jss.set('.st-menu .checking-now'+i.toString()+' div',{
            'top':(($('.checking-now'+i.toString())[0].clientHeight-10)/2).toString()+'px'
        });
    };
});

function ajaxLoad(page){
    $.ajax(
        {
            url: '/page/' + page
        }
    )
    .done(
        function(data){
            rewritePage(data);
            $('#st-container').removeClass('st-menu-open');
            $('.st-content').scrollTop(0);
        });
}

function rewritePage(data){
    $('head style:first-of-type').replaceWith(data.head);
    $('.header').html(data.header);
    $('.main').html(data.content);
    if($('.custom-script')[0]!=undefined){
        $('.custom-script').replaceWith(data.scripts);
    } else {
        $('body').append(data.scripts.toString());
    }
    window.history.pushState({}, '', '/'+data.name);
}

