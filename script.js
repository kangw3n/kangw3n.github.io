
var scope = 'global variables';
        function test(){
            var newBlanks = document.createElement('div');
            newBlanks.setAttribute('id','main');
            document.body.appendChild(newBlanks);
            document.writeln(scope + '<br />');
             var scope = 1.79769123890218E340 + 1e292; // with or without var will change the behaviour of global variations
            document.writeln(scope);
            document.writeln((-1.79769123890218E340) -1e292);
        } ;
test(); 

$('<img>',
  {
  src: 'http://photojournal.jpl.nasa.gov/jpeg/PIA17555.jpg',
  alt:'stars',
  title:'images grabs from XXX',
    width:'30%',
      click:function(){
          alert($(this).attr('title'));
      }
  })
.css({
    cursor:'pointer',
    border:'1px solid black',
    padding:'12px',
    backgroundColor:'white'
})
.appendTo('body');