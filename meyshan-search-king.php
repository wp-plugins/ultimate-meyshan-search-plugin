<?php
/*
Plugin Name: Meyshans Ultimate Search King 
Version: 1.0
Plugin URI: http://www.spicyexpress.net/wordpress-plugin-2/
Description: <a href="http://www.meyshan.coml">Meyshan</a>  Meyshan's search King, has  build with yahoo ui, google suggeset style of result display while you tpe, google multi search, yahoo multi search including images, adsense, and google custom search engine,  snap prview, yahoo exit reult and  more and more...
Author: P Dayaparan 
Version: 1.0
Author URI: http://www.spicyexpress.net
*/


function meyshan_search_king_page() {

		$options = get_option('meyshan_search_king');
		if ( !is_array($options) )
			$options = array('google-api-key' => '', 'coop' => '', 'adsense' => '', 'adsense-top' => false);
		if ( $_POST['meyshan-search-king-submit'] ) {
			$options['google-api-key'] = strip_tags(stripslashes($_POST['meyshan-search-king-google-api-key']));
			$options['coop'] = strip_tags(stripslashes($_POST['meyshan-search-king-coop']));
			$options['adsense'] = stripslashes($_POST['meyshan-search-king-adsense']);
			$options['adsense-top'] = $_POST['meyshan-search-king-adsense-top']?true:false;
			update_option('meyshan_search_king', $options);
                        echo '<div style="background-color: rgb(207, 235, 247);" id="message" class="updated fade"><p><strong>Settings Updated</strong></p></div>';
		}

		echo '<form method="post" style="width:300px;margin:0 auto;">';
		echo '<p style="text-align:right;"><label for="meyshan-search-king-google-api-key">Google API Key <a href="http://code.google.com/apis/ajaxsearch/signup.html">(?)</a>:</label><br /> <input style="width: 200px;" id="meyshan-search-king-google-api-key" name="meyshan-search-king-google-api-key" type="text" value="'.$options['google-api-key'].'" /></p>';
		echo '<p style="text-align:right;"><label for="meyshan-search-king-coop">Custom Search Engine URL (optional) <a href="http://google.com/coop/cse/overview">(?)</a>:</label><br /> <input style="width: 200px;" id="meyshan-search-king-coop" name="meyshan-search-king-coop" type="text" value="'.$options['coop'].'" /></p>';
		echo '<p style="text-align:right;"><label for="meyshan-search-king-adsense-top">Adsense across top?</label><br /> <input id="meyshan-search-king-adsense-top" name="meyshan-search-king-adsense-top" type="checkbox"'.($options['adsense-top']?' checked="checked"':'').'" /></p>';
		echo '<p style="text-align:right;"><label for="meyshan-search-king-adsense">Adsense code (optional) <a href="http://google.com/adsense/">(?)</a>:</label><br /> <textarea style="width: 200px;" id="meyshan-search-king-adsense" name="meyshan-search-king-adsense">'.htmlentities($options['adsense']).'</textarea></p>';
		echo '<p style="text-align:right;"><input type="submit" id="meyshan-search-king-submit" name="meyshan-search-king-submit" value="Submit" /></p></form>';

}//end function meyshan_search_king_page

function meyshan_search_king_tab($s) {
   add_submenu_page('options-general.php', 'Meyshan Search', 'Meyshan Search', 1, __FILE__, 'meyshan_search_king_page');
   return $s;
}//end function social_networking_tab
add_action('admin_menu', 'meyshan_search_king_tab');

function meyshan_search_king_form() {
   $options = get_option('meyshan_search_king');
   $form = '';

   $form .= '<div id="meyshan-search-king-iframe-dialog" style="visibility:hidden;position:absolute;top:0px;"> <div class="ydlg-hd">Web Page</div>';
   $form .= '<div class="ydlg-bd">';
   $form .= '<div class="ydlg-tab" title="Web Page">';
   $form .= '<div class="inner-tab"><iframe src="" id="meyshan-search-king-iframe" name="meyshan-search-king-iframe" style="width:100%;height:100%;border-width:0px;"></iframe>';
   $form .= '</div></div>';
   $form .= '</div>';
   $form .= '</div>';

   $form .= '<div id="meyshan-search-king-dialog" style="visibility:hidden;position:absolute;top:0px;"> <div class="ydlg-hd">Search Results</div>';
   $form .= '<div class="ydlg-bd">';

   $form .= '<div class="ydlg-tab" title="This Blog">';
   $form .= '<div class="inner-tab">';
   $form .= '<div'.($options['adsense-top']?'':' style="float:right;margin-left:10px;position:absolute;right:5px;"').'>'.$options['adsense'].'</div>';
   $form .= '<div id="meyshan-search-king-blog-menu"></div>';
   $form .= '<div id="meyshan-search-king-blog"></div>';
   $form .= '<div id="meyshan-search-king-comments" style="display:none;"></div>';
   $form .= '<div id="meyshan-search-king-images" style="display:none;"><h2>Images</h2></div>';
   $form .= '<div id="meyshan-search-king-google-blog" style="display:none;"><h2>With Google</h2></div>';
   $form .= '<div id="meyshan-search-king-yahoo-blog" style="display:none;"><h2>With Yahoo</h2></div>';
   $form .= '</div></div>';

   $form .= '<div class="ydlg-tab" title="Google">';
   $form .= '<div class="inner-tab">';
   $form .= '<div'.($options['adsense-top']?'':' style="float:right;margin-left:10px;position:absolute;right:5px;"').'>'.$options['adsense'].'</div>';
   $form .= '<div id="meyshan-search-king-web"></div>';
   $form .= '</div></div>';


   $form .= '<div class="ydlg-tab" title="Yahoo">';
   $form .= '<div class="inner-tab">';
   $form .= '<div'.($options['adsense-top']?'':' style="float:right;margin-left:10px;position:absolute;right:5px;"').'>'.$options['adsense'].'</div>';
   $form .= '<div id="meyshan-search-king-yahoo-menu"><i>Loading...</i></div>';
   $form .= '<div id="meyshan-search-king-yahoo"></div>';
   $form .= '<div id="meyshan-search-king-yahoo-video" style="display:none;"></div>';
   $form .= '<div id="meyshan-search-king-yahoo-news" style="display:none;"></div>';
   $form .= '<div id="meyshan-search-king-yahoo-local" style="display:none;"></div>';
   $form .= '<div id="meyshan-search-king-yahoo-images" style="display:none;"></div>';
   $form .= '</div></div>';

   $form .= '</div>';
   $form .= '</div>';

   echo $form;
}//end function meyshan_search_king_form
add_action('get_footer','meyshan_search_king_form');

function meyshan_search_king_head() {
   $options = get_option('meyshan_search_king');
?>

 	<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/yahoo-dom-event/yahoo-dom-event.js"></script> 
	<!-- OPTIONAL: Connection (required only if using XHR DataSource) --> 
	<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/connection/connection-min.js"></script> 
	 
	<!-- OPTIONAL: Animation (required only if enabling animation) --> 
	<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/animation/animation-min.js"></script> 
	 
	<!-- Source file --> 
	<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/autocomplete/autocomplete-min.js"></script> 

        <style type="text/css">
        .meyshan-search-king-autocomplete {position:absolute;z-index:9050;} 
	.meyshan-search-king-autocomplete .yui-ac-content {position:absolute;left:0;top:0;width:20em;border:1px solid #404040;background:#fff;overflow:hidden;text-align:left;z-index:9050;} 
	.meyshan-search-king-autocomplete .yui-ac-shadow {position:absolute;left:0;top:0;margin:.3em;background:#a0a0a0;z-index:9049;} 
	.meyshan-search-king-autocomplete ul {padding:5px 0;width:100%;} 
	.meyshan-search-king-autocomplete li {padding:0 5px;cursor:default;white-space:no;wrap;} 
	.meyshan-search-king-autocomplete li.yui-ac-highlight {background:#ff0;} 
        #meyshan-search-king-dialog .gsc-branding {display:none;}
        #meyshan-search-king-google-blog .gsc-search-box {display:none;}
        #meyshan-search-king-images .gsc-control {display:none;}
        </style>

    <link href="<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/meyshan-search-king/styles.css"
        type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/meyshan-search-king/form.js">
       </script>
    <script type="text/javascript" src="<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/meyshan-search-king/yui-ext.js">
       </script>


    <link href="http://www.google.com/uds/css/gsearch.css"
        type="text/css" rel="stylesheet"/>
    <script src="http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=<?php echo $options['google-api-key']; ?>"
        type="text/javascript"></script>

<?php

   echo '<script type="text/javascript">var meyshan_search_king_loaded = false;';
   echo ' function meyshan_search_king_autocomplete_activate() {';
   echo ' meyshan_search_king_loaded = true;';
   echo ' var adiv = document.createElement("div");';
   echo ' adiv.id = "meyshan-search-king-autocomplete";';
   echo ' adiv.className = "meyshan-search-king-autocomplete";';
   echo ' document.getElementById("s").parentNode.appendChild(adiv);';
   echo ' document.getElementById("s").form.onsubmit = function() {meyshan_search_king_go(this.s.value,'."'".htmlentities(get_bloginfo('wpurl'))."/wp-content/plugins/meyshan-search-king/', '".htmlentities(get_bloginfo('home'))."','".$options['coop']."');return false;};";
   echo ' var myDataSource = new YAHOO.widget.DS_XHR("'.get_bloginfo('wpurl').'/wp-content/plugins/meyshan-search-king/searchJSON.php", ["items","d"]);';
   echo ' var myAutoComplete = new YAHOO.widget.AutoComplete("s","meyshan-search-king-autocomplete", myDataSource);';
   echo ' myAutoComplete.formatResult = function(oResultItem, sQuery) { return oResultItem[0]; };';
   echo ' }';
   echo ' function meyshan_search_king_autocomplete() {} addLoadEvent(meyshan_search_king_autocomplete_activate);</script>';

}//end function meyshan_search_king_head
add_action('wp_head','meyshan_search_king_head');

$meyshan_search_king_ie7done = false;

function meyshan_search_king_ie7hack($content) {
   global $meyshan_search_king_ie7done;
   if($meyshan_search_king_ie7done) return $content;
   $meyshan_search_king_ie7done = true;
   echo '<script type="text/javascript"> ';
   echo ' addLoadEvent(meyshan_search_king_autocomplete_activate); ';
   echo ' </script>';
   return $content;
}//end function meyshan_search_king_ie7hack
add_filter('the_content','meyshan_search_king_ie7hack');

?>
