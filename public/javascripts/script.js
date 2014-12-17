var onPurposeChange=false;
console.log("purspose changed1: "+onPurposeChange);

$(function(){
    var hash=location.hash;
    console.log('hash: '+hash);
    console.log('hash[0]: '+hash[0]);
    console.log('hash[1]: '+hash[1]);
    console.log('hash[2]: '+hash[2]);
    if(hash.toString())
    {
        console.log('will ajax load: '+hash.substr(1))
        ajaxLoad(hash.substr(1));
    }
    
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
    console.log('ajax loading '+ page);
    onPurposeChange=true;
    console.log("purspose changed: "+onPurposeChange);
    $.ajax(
        {
            url: '/page/' + page +'#'
        }
    )
    .done(
        function(data){
            rewritePage(data);
            $('#st-container').removeClass('st-menu-open');
            $('.st-content').scrollTop(0);
            onPurposeChange=false;
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
    window.history.pushState({}, '', '/#'+data.name);

}

window.onhashchange=function(){
    if(!onPurposeChange)
    {
        var hash=location.hash.substr(1);
        if(hash!="") {
            ajaxLoad(hash);
        } else {
            location.reload();
        }
    }
    console.log('on purpose: '+onPurposeChange);
    onPurposeChange=false;
    console.log("purspose changed: "+onPurposeChange);
};



