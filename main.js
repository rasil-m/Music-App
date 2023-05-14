$(document).ready(function(){

    var list=[
        {
            "name":"Go Gyal",
            "album":"Ahzee",
            "url":"gogyal.mp3",
            "img":"gogyal.jpg"
        },
        {
            "name":"Infected",
            "album":"Sickick",
            "url":"sick.mp3",
            "img":"infected.jpg"
        },
        {
            "name":"Walking The Wire",
            "album":"Imagine Dragons",
            "url":"song1.mp3",
            "img":"img1.jpg"
        }


     ];

    var audio=document.createElement("audio");
    var src=document.createElement("source");
    audio.appendChild(src);
    document.body.appendChild(audio);
    var key=0;
    src.setAttribute("src","songs/"+list[key].url);
    $("#name h1").text(list[key].name);
    $("#name p").text(list[key].album);
    $("#song img").attr("src","img/"+list[key].img);
    audio.load();
    $(audio).on("loadedmetadata",function(){
        $(".end").text((audio.duration).toFixed(2));

       });
    var interval;


    function ended()
     {
        audio.pause();
        $("#play").removeClass('fa-pause-circle');
        $("#play").addClass('fa-play-circle');
        clearInterval(interval);
     }

     function getrange()
      {
        var per=((audio.currentTime/audio.duration)*100);
        $("#range").val(per);
        $(".progress .line").css({"width":per+"%"});
        var deg=360*(per/25);
        $("#song img").css({"transform":"rotate("+deg+"deg)"});
      }
      

    function update()
     {
        $(".start").text((audio.currentTime).toFixed(2));
         if(audio.currentTime==audio.duration)
          {
            ended();
          }
          getrange();
     }

     $("#range").click(function(){

        audio.currentTime=$(this).val();
        getrange();

     });

    $("#play").click(function(){

        if(audio.paused)
         {
            audio.play();
            $("#play").removeClass('fa-play-circle');
            $("#play").addClass('fa-pause-circle');
            $(".end").text((audio.duration).toFixed(2));
            interval=setInterval(update,audio.duration-audio.currentTime);
            

         }
         else
         {
            ended();
         }


    });

    function setit(e)
    {
       ended();
       
       src.setAttribute("src","songs/"+list[e].url);
       $("#name h1").text(list[e].name);
       $("#name p").text(list[e].album);
       $("#song img").attr("src","img/"+list[e].img);
       audio.load();
       $("#range").val(0);
       $(".progress .line").css({"width":"0%"});
       $(".start").text("0.00");
       $("#song img").css({"transform":"rotate(0deg)"});
       $(audio).on("loadedmetadata",function(){
        $(".end").text((audio.duration).toFixed(2));

       });
       

    }
    

    $("#next").click(function(){

        var len=list.length;
        key++;
        if(key>len-1)
        {
            key=0;
        }
        setit(key);

    });
    $("#prev").click(function(){

        var len=list.length;
        key--;
        if(key<0)
        {
            key=len-1;
        }
        setit(key);

    });


     

});