<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Demo 1</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="https://dl.dropboxusercontent.com/s/jgbx1icn4t7hach/jquery.colorbox-min.js"></script>
        <link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/cmmxfayqnsezoor/teach.css"/>
        
    </head>
    
    <body>
        <?php phpinfo(); ?>
        <div id="fb-root"></div>
        <script> //Facebook SDK
            window.fbAsyncInit = function() { // http://hayageek.com/facebook-javascript-sdk/
                FB.init({
                    appId      : '615789688470381',
                    status     : true, // check login status
                    frictionlessRequests : true,
                    xfbml      : true // parse XFBML 
                });
                
                FB.Event.subscribe('auth.authResponseChange', function(response) {
                    if (response.status === 'connected') {
                        var UserID = response.authResponse.userID;
                        var AccessToken = response.authResponse.accessToken;
                        var logging = "Your user ID is : " + UserID  + "\nAnd your access token is :" + AccessToken; 
                        console.log(logging);
                        //console.log( "Connected to Facebook");//SUCCESS
                        getUserInfo();
                    } else if (response.status === 'not_authorized')  {
                        console.log("Failed to Connect");//FAILED
                        FB.login();
                    } else {
                        console.log("Logged Out");//UNKNOWN ERROR
                    }
                });	
                
                // In your onload handler :edge.create , edge.remove ,xfbml.render , auth.authResponseChange , auth.statusChange , auth.login , auth.logout , comment.create , comment.remove , message.send.
                FB.Event.subscribe('edge.create', page_like_or_unlike_callback);
                FB.Event.subscribe('edge.remove', page_like_or_unlike_callback);
                FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
                FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
            };
            
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            
            //function start
            function login() {
                FB.login(function(response) { 
                    //AFTER LOGIN?
                },{scope: 'email,user_photos,user_videos'});
            };
            
            function getUserInfo() {
                FB.api('/me', function(response) {
                    var str="<strong>Name</strong> : "+response.name+"<br>";
                    str +="<strong>Link: </strong>"+response.link+"<br>";
                    str +="<strong>Username:</strong> "+response.username+"<br>";
                    str +="<strong>id: </strong>"+response.id+"<br>";
                    str +="<strong>Email:</strong> "+response.email+"<br>";
                    str +="<input type='button' id='photo' value='Get Photo' onclick='getPhoto();'>";
                    str +="<input type='button' value='Logout' onclick='logout();'>";
                    //str +="<br>" + response.videos.length;
                    document.getElementById("status").innerHTML=str;
                });
            };
            
            function getPhoto(){
                FB.api('/me/videos', function(response) {
                    //console.log(response);
                    //var str = response.data[1].embed_html;
                    //document.getElementById("status").innerHTML+=str;
                });
                FB.api('/me/picture?type=normal', function(response) { // http://api-portal.anypoint.mulesoft.com/facebook/api/facebook-graph-api/docs/reference/pictures 
                    var str="<img src="+ response.data.url +">";
                    $('#picture').html(str);
                    $('input')[0].setAttribute('disabled','disabled');
                    $('#photo').hide();
                });
            }
            
            function logout(){
                FB.logout();
            };
            
            /*window.onload = function () {
                $('#now, #detect').append($( window ).width());
                document.getElementsByTagName('input')[0].removeAttribute("disabled");
                document.getElementsByTagName("meter")[0].setAttribute("value",$( window ).width());
            };*/
            
            $( window ).resize(function() {
                document.getElementsByTagName("meter")[0].setAttribute("value",$( window ).width());
                $('#detect').html($( window ).width());
                //console.log($( window ).width());
            });
            
            var auth_response_change_callback = function(response) {
                if (response.status === "unknown" ) {
                    //window.location.reload(); 
                } 
                //window.location.reload();
                console.log(response);
            }
            
            var auth_status_change_callback = function(response) {
                //console.log("auth_status_change_callback: " + response.status);
                console.log(response);
            }
            
            var page_like_or_unlike_callback = function(url, html_element) {
                console.log("page_like_or_unlike_callback");
                console.log(url);
                console.log(html_element);
            }
            
            function picker(){
                FB.ui({method: 'apprequests',
                       message: 'My Great Request'
                      }, console.log("sucessfully"));
                
                FB.ui({
                    method: 'send',
                    link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
                });
            }
            
            
        </script>
        
        <div class="container">
            <article id="status">
                <input type="button" value="Click to login" disabled onclick="login()">
            </article>
            <figure id="picture"></figure>
            <!--<section>
<p>Better View in 1920 X 1680 Display.<br>
<meter id="meter" style="width:400px;" value="0" max="1920" low="500" min="0" high="1280" optimum="1290"></meter>
<br>
Your display resolution is:<span id="now"> </span> <br>
Your current display resolution is <span id="detect"> </span></p>
<div class="fb-like" data-href="http://comm.nccu.edu.tw/" data-layout="standard" data-action="like" data-show-faces="true" data-share="false"></div>
</section>-->
            <p><a class="youtube" href="https://www.youtube.com/embed/kdWQaecFyyo?rel=0&amp;wmode=transparent">Youtube Videos</a></p>
            <input type="button" value="Friend Picker" onclick="picker()">
            
        </div>
        
        
        
        <aside class="fbwidget">
            <div><iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2F%25E5%259C%258B%25E7%25AB%258B%25E6%2594%25BF%25E6%25B2%25BB%25E5%25A4%25A7%25E5%25AD%25B8%25E5%2582%25B3%25E6%2592%25AD%25E5%25AD%25B8%25E9%2599%25A2-College-of-Communication-National-Chengchi-University%2F497804236899418&amp;width=245&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=615789688470381" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:245px; height:258px;" allowTransparency="true"></iframe></div>
        </aside>
        
        
        <script type="text/javascript"> 
            $(document).ready(function() {
                $.colorbox({height:"290px",html:"<iframe src='//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2F%25E5%259C%258B%25E7%25AB%258B%25E6%2594%25BF%25E6%25B2%25BB%25E5%25A4%25A7%25E5%25AD%25B8%25E5%2582%25B3%25E6%2592%25AD%25E5%25AD%25B8%25E9%2599%25A2-College-of-Communication-National-Chengchi-University%2F497804236899418&amp;width=245&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=615789688470381' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:400px; height:258px;' allowTransparency='true'></iframe>"});
                $(".youtube").colorbox({iframe:true, innerWidth:720, innerHeight:480});
                $(".fbwidget").hover(function() {
                    $(this).stop().animate({right: "0"}, "medium");
                }, function() {   
                    $(this).stop().animate({right: "-250"}, "medium");
                }, 500);
            }); 
        </script>
        
        
        
        
        
        
    </body>
</html>
