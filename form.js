var meyshan_search_king_dialog = false;
var meyshan_search_king_dialog_iframe = false;
var meyshan_search_king_query = '';
var meyshan_search_king_scripturl = '';
var meyshan_search_king_siteurl = '';
var meyshan_search_king_coop = '';

if( document.all && !document.getElementsByTagName )
  document.getElementsByTagName = function( nodeName )
  {
    if( nodeName == '*' ) return document.all;
    var result = [], rightName = new RegExp( nodeName, 'i' ), i;
    for( i=0; i<document.all.length; i++ )
      if( rightName.test( document.all[i].nodeName ) )
 result.push( document.all[i] );
    return result;
  };
document.getElementsByClassName = function( className, nodeName )
{
  var result = [], tag = nodeName||'*', node, seek, i;
  var rightClass = new RegExp( '(^| )'+ className +'( |$)' );
  seek = document.getElementsByTagName( tag );
  for( i=0; i<seek.length; i++ )
    if( rightClass.test( (node = seek[i]).className ) )
      result.push( seek[i] );
  return result;
};

//adds an onload event to the current page
function addLoadEvent(func) {
         var oldonload = window.onload;
         if (typeof window.onload != 'function') {
            window.onload = function() {func();};
         } else {
            window.onload = function() {
               oldonload();
               func();
            }
         }//end if
}//end function addLoadEvent


var bubbleImagePath = 'bg.png';
function meyshan_search_king_go(query,scripturl,siteurl,coop) {

   document.getElementById('meyshan-search-king-autocomplete').innerHTML = '<i>Loading...</i>';

   var yahoo_api_key = '7F5ZDfnV34HfYKJDjEMxvXLwgQOlAQkmYiv3Ez.Tap62E7lSnL0SHxL2mJuNCK.KS6Rs';

   var domain = siteurl.split('/');
   domain = domain[2];

   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = scripturl+'searchJSON.php?s='+encodeURIComponent(query)+'&callback=meyshan_search_king_callback';
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = scripturl+'searchJSON.php?s='+encodeURIComponent(query)+'&comments&callback=meyshan_search_king_comments';
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/ImageSearchService/V1/imageSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_images&site='+encodeURIComponent(domain);
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/WebSearchService/V1/webSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_yahoo_search_blog&site='+encodeURIComponent(domain);
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/WebSearchService/V1/webSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_yahoo_search';
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/VideoSearchService/V1/videoSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_yahoo_video';
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/NewsSearchService/V1/newsSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_yahoo_news';
   document.body.appendChild(script);

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'http://search.yahooapis.com/ImageSearchService/V1/imageSearch?appid='+yahoo_api_key+'&query='+encodeURIComponent(query)+'&output=json&callback=meyshan_search_king_yahoo_images';
   document.body.appendChild(script);

   meyshan_search_king_query = query;
   meyshan_search_king_scripturl = scripturl;
   meyshan_search_king_siteurl = siteurl;
   meyshan_search_king_coop = unescape(coop).split('/').reverse()[0].split('?').reverse()[0].split('=')[1];
   bubbleImagePath = scripturl + 'bg.png';
}//end function meyshan_search_king_go

function meyshan_search_king_yahoo_super(ajson) {
   var txt = '';
 if(ajson && ajson.ResultSet && ajson.ResultSet.Result.length > 0) {
  txt += '<ul>';
  for(var i in ajson.ResultSet.Result) {
     if(typeof(ajson.ResultSet.Result[i].Title) == 'undefined') continue;
     txt += ' <li><a class="previewlink" target="meyshan-search-king-iframe" onclick="meyshan_search_king_iframe();" href="'+ajson.ResultSet.Result[i].Url+'" title="'+ajson.ResultSet.Result[i].Title+'">'+ajson.ResultSet.Result[i].Title+'<\/a> <br\/> '+ajson.ResultSet.Result[i].Summary+' <\/li> ';
  }//end for ... in
  if(!ajson || ajson.ResultSet.Result.length < 1)
     txt += '<li>No Results<\/li>';
  txt += '<\/ul>';
 } else txt += 'No Results';
 return txt;
}//end function meyshan_search_king_images_super

function meyshan_search_king_yahoo_search(ajson) {
   var txt = '<h2>Web Search</h2>';
   txt += meyshan_search_king_yahoo_super(ajson);
   document.getElementById('meyshan-search-king-yahoo').innerHTML = txt;
}//end function meyshan_search_king_yahoo_search

function meyshan_search_king_yahoo_search_blog(ajson) {
   var txt = '<h2>With Yahoo</h2>';
   txt += meyshan_search_king_yahoo_super(ajson);
   document.getElementById('meyshan-search-king-yahoo-blog').innerHTML = txt;
}//end function meyshan_search_king_yahoo_search_blog

function meyshan_search_king_yahoo_video(ajson) {
   var txt = '<h2>Videos</h2>';
   txt += meyshan_search_king_yahoo_super(ajson);
   document.getElementById('meyshan-search-king-yahoo-video').innerHTML = txt;
}//end function meyshan_search_king_yahoo_video

function meyshan_search_king_yahoo_news(ajson) {
   var txt = '<h2>News</h2>';
   txt += meyshan_search_king_yahoo_super(ajson);
   document.getElementById('meyshan-search-king-yahoo-news').innerHTML = txt;
}//end function meyshan_search_king_yahoo_news

function meyshan_search_king_yahoo_local(ajson) {
   var txt = '<h2>Local</h2>';
   txt += meyshan_search_king_yahoo_super(ajson);
   document.getElementById('meyshan-search-king-yahoo-local').innerHTML = txt;
}//end function meyshan_search_king_yahoo_local

function meyshan_search_king_images_super(ajson,theid) {
  var txt = '<h2>Images</h2>';
 if(ajson && ajson.ResultSet) {
  txt += '<ul style="list-style-type:none;">';
  for(var i in ajson.ResultSet.Result)
     txt += ' <li style="display:inline;padding:5px;"><a target="meyshan-search-king-iframe" onclick="meyshan_search_king_iframe();" href="'+ajson.ResultSet.Result[i].Url+'" title="'+ajson.ResultSet.Result[i].Title+'"><img src="'+ajson.ResultSet.Result[i].Thumbnail.Url+'" alt="'+ajson.ResultSet.Result[i].Title+'" /><\/a><\/li> ';
  if(!ajson || ajson.ResultSet.Result < 1)
     txt += '<li>No Results<\/li>';
  txt += '<\/ul>';
 } else txt += 'No Results';
  document.getElementById(theid).innerHTML = txt;
}//end function meyshan_search_king_images_super

function meyshan_search_king_yahoo_images(ajson) {
   var txt = '<form onsubmit="meyshan_search_king_go(this.s.value,&quot;'+meyshan_search_king_scripturl+'&quot;);return false;">'+'<input type="text" value="'+meyshan_search_king_query+'" id="meyshan-search-king-dialog-s2" name="s" \/> <div id="meyshan-search-king-dialog-autocomplete2" class="meyshan-search-king-autocomplete"><\/div> '+'<input type="submit" value="Search" \/>'+'<\/form><br \/>';
   txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-yahoo\').style.display = 'block'; document.getElementById(\'meyshan-search-king-yahoo-video\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-news\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-local\').style.display = 'none'; return false;\">Web</a> | ";
   txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-yahoo\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-video\').style.display = 'block'; document.getElementById(\'meyshan-search-king-yahoo-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-news\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-local\').style.display = 'none'; return false;\">Video</a> | ";
   txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-yahoo\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-video\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-news\').style.display = 'block'; document.getElementById(\'meyshan-search-king-yahoo-local\').style.display = 'none'; return false;\">News</a> | ";
   txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-yahoo\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-video\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-images\').style.display = 'block'; document.getElementById(\'meyshan-search-king-yahoo-news\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-local\').style.display = 'none'; return false;\">Images</a> ";
   document.getElementById('meyshan-search-king-yahoo-menu').innerHTML = txt;
   meyshan_search_king_images_super(ajson,'meyshan-search-king-yahoo-images');
   var myDataSource = new YAHOO.widget.DS_XHR(meyshan_search_king_scripturl+'searchJSON.php', ["items","d"]);
   var myAutoComplete = new YAHOO.widget.AutoComplete("meyshan-search-king-dialog-s2","meyshan-search-king-dialog-autocomplete2", myDataSource);
   myAutoComplete.formatResult = function(oResultItem, sQuery) { return oResultItem[0]; };
}//end function meyshan_search_king_yahoo_images

function meyshan_search_king_images(ajson) {
   meyshan_search_king_images_super(ajson,'meyshan-search-king-images');
}//end function meyshan_search_king_images

function meyshan_search_king_comments(ajson) {
  var txt = '<h2>Comments</h2>';
  txt += '<ul>';
 if(ajson && ajson.items && ajson.items.length > 0) {
  for(var i in ajson.items) {
   if(ajson.items[i].u)
     txt += '<li><a class="previewlink" href="'+ajson.items[i].u+'" title="'+ajson.items[i].n+'">'+ajson.items[i].d+'<\/a><br \/>'+ajson.items[i].n+'<\/li>';
  }
 }//end if ajson
  if(!ajson || ajson.items.length < 1)
     txt += '<li>No Results<\/li>';
  txt += '<\/ul>';
  document.getElementById('meyshan-search-king-comments').innerHTML = txt;
}//end function meyshan_search_king_comments

function meyshan_search_king_callback(ajson) {

  var txt = '<form onsubmit="meyshan_search_king_go(this.s.value,&quot;'+meyshan_search_king_scripturl+'&quot;);return false;">'+'<input type="text" value="'+meyshan_search_king_query+'" id="meyshan-search-king-dialog-s" name="s" \/> <div id="meyshan-search-king-dialog-autocomplete" class="meyshan-search-king-autocomplete"><\/div> '+'<input type="submit" value="Search" \/>'+'<\/form><br \/>';
  txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-blog\').style.display = 'block'; document.getElementById(\'meyshan-search-king-comments\').style.display = 'none'; document.getElementById(\'meyshan-search-king-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-google-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-blog\').style.display = 'none'; return false;\">Posts</a> | ";
  txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-comments\').style.display = 'block'; document.getElementById(\'meyshan-search-king-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-google-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-blog\').style.display = 'none'; return false;\">Comments</a> | ";
  txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-comments\').style.display = 'none'; document.getElementById(\'meyshan-search-king-images\').style.display = 'block'; document.getElementById(\'meyshan-search-king-google-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-blog\').style.display = 'none'; return false;\">Images</a> | ";
  txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-comments\').style.display = 'none'; document.getElementById(\'meyshan-search-king-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-google-blog\').style.display = 'block'; document.getElementById(\'meyshan-search-king-yahoo-blog\').style.display = 'none'; return false;\">With Google</a> | ";
  txt += "<a href=\"#\" onclick=\"document.getElementById(\'meyshan-search-king-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-comments\').style.display = 'none'; document.getElementById(\'meyshan-search-king-images\').style.display = 'none'; document.getElementById(\'meyshan-search-king-google-blog\').style.display = 'none'; document.getElementById(\'meyshan-search-king-yahoo-blog\').style.display = 'block'; return false;\">With Yahoo</a> <br /> ";
  document.getElementById('meyshan-search-king-blog-menu').innerHTML = txt;
  txt = '<h2>Posts</h2>';
  txt += '<ul>';
 if(ajson && ajson.items && ajson.items.length > 0) {
  for(var i in ajson.items) {
   if(ajson.items[i].u)
     txt += '<li><a class="previewlink" href="'+ajson.items[i].u+'" title="'+ajson.items[i].n+'">'+ajson.items[i].d+'<\/a><br \/>'+ajson.items[i].n+'<\/li>';
  }//end for i in ajson.items
 }//end if ajson
  if(!ajson || ajson.items.length < 1)
     txt += '<li>No Results<\/li>';
  txt += '<\/ul>';
  document.getElementById('meyshan-search-king-blog').innerHTML = txt;

   var myDataSource = new YAHOO.widget.DS_XHR(meyshan_search_king_scripturl+'searchJSON.php', ["items","d"]);
   var myAutoComplete = new YAHOO.widget.AutoComplete("meyshan-search-king-dialog-s","meyshan-search-king-dialog-autocomplete", myDataSource);
   myAutoComplete.formatResult = function(oResultItem, sQuery) { return oResultItem[0]; };

   var options = new GsearcherOptions();
   options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);

   var drawOptions = new GdrawOptions();
   drawOptions.setDrawMode(GSearchControl.DRAW_MODE_TABBED);

   var searchControl = new GSearchControl();
   var siteSearch = new GwebSearch();
   searchControl.addSearcher(new GwebSearch(), options);
   if(typeof(meyshan_search_king_coop) != 'undefined' && meyshan_search_king_coop != '') {siteSearch.setSiteRestriction(meyshan_search_king_coop);
                                 siteSearch.setUserDefinedLabel("Custom Search");
                                 searchControl.addSearcher(siteSearch, options);}
   searchControl.addSearcher(new GblogSearch(), options);
   searchControl.addSearcher(new GvideoSearch(), options);
   searchControl.addSearcher(new GnewsSearch(), options);
   searchControl.addSearcher(new GlocalSearch());
   searchControl.draw(document.getElementById('meyshan-search-king-web'), drawOptions);
   searchControl.execute(meyshan_search_king_query);

   searchControl = new GSearchControl();
   siteSearch = new GwebSearch();
   siteSearch.setSiteRestriction(meyshan_search_king_siteurl);
   searchControl.addSearcher(siteSearch, options);
   searchControl.draw(document.getElementById('meyshan-search-king-google-blog'));
   searchControl.execute(meyshan_search_king_query);

   if(typeof(innerWidth) == 'undefined') var innerWidth = '900';
   if(typeof(innerHeight) == 'undefined') var innerHeight = '550';
   if(!meyshan_search_king_dialog)
      meyshan_search_king_dialog = new YAHOO.ext.BasicDialog( 'meyshan-search-king-dialog', {modal: true,  width: innerWidth - 100,  height: innerHeight - 100,  shadow: true, autoTabs: true} );
   meyshan_search_king_dialog.show(document.getElementById('s'));

   setTimeout("meyshan_search_king_process();",1500);

}//end function meyshan_search_king_callback

function meyshan_search_king_process() {
   var gfrm = document.getElementsByClassName('gsc-input','input');
   var div = document.createElement('div');
   div.id = 'meyshan-search-king-google-autocomplete';
   div.className = 'meyshan-search-king-autocomplete';
   gfrm[0].parentNode.appendChild(div);
   gfrm[0].id = 'meyshan-search-king-google-s';
   gfrm[0].autocomplete = 'on';
   gfrm[0].setAttribute('autocomplete','on');
   var myDataSource = new YAHOO.widget.DS_XHR(meyshan_search_king_scripturl+'searchJSON.php', ["items","d"]);
   var myAutoComplete = new YAHOO.widget.AutoComplete("meyshan-search-king-google-s","meyshan-search-king-google-autocomplete", myDataSource);
   myAutoComplete.formatResult = function(oResultItem, sQuery) { return oResultItem[0]; };
   var links = document.getElementsByClassName('gs-title','a');
   for(var i in links) {
      links[i].target = 'meyshan-search-king-iframe';
      links[i].onclick = meyshan_search_king_iframe;
      links[i].className += ' previewlink';
   }//end for var i in links
   var links = document.getElementsByClassName('gsc-trailing-more-results','a');
   for(var i in links) {
      links[i].target = 'meyshan-search-king-iframe';
      links[i].onclick = meyshan_search_king_iframe;
      links[i].className += ' previewlink';
   }//end for var i in links
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = meyshan_search_king_scripturl + '/previewbubble.js';
   document.body.appendChild(script);
   document.getElementById('meyshan-search-king-autocomplete').innerHTML = '';
}//end function meyshan_search_king_process

function meyshan_search_king_iframe() {
   if(typeof(innerWidth) == 'undefined') var innerWidth = '900';
   if(typeof(innerHeight) == 'undefined') var innerHeight = '550';
   document.getElementById('meyshan-search-king-iframe').style.width = (innerWidth-135)+'px';
   document.getElementById('meyshan-search-king-iframe').style.height = (innerHeight-150)+'px';
   if(!meyshan_search_king_dialog_iframe)
      meyshan_search_king_dialog_iframe = new YAHOO.ext.BasicDialog( 'meyshan-search-king-iframe-dialog', {modal: true,  width: innerWidth - 100,  height: innerHeight - 100,  shadow: true, autoScroll: false} );
   meyshan_search_king_dialog_iframe.show();
}//end function meyshan_search_king_iframe
