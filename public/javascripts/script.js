var onPurposeChange=false;
console.log("purspose changed1: "+onPurposeChange);

$(function(){
    var hash=location.hash;
    if(hash.toString())
    {
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
    
    fillPage();
});

function ajaxLoad(page){
    onPurposeChange=true;
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
    fillPage();
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

function change(){
    $('.st-menu li a input').css('display','inline-block');
}

function change2(){
    var name=$('#change-name')[0].value;
    window.location="http://"+window.location.host+"/change/"+name;
}

function fillPage(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    if($('.st-content-inner').height() < y){
        var difference=y-$('.st-content-inner').height();
        var boxesArray=$('.content-box-white, .content-box-blue');
        var element=boxesArray[boxesArray.length-1]; console.log(element);
        var oldHeight=element.offsetHeight;
        element.style.height=(oldHeight+difference)+"px";
    }
}

