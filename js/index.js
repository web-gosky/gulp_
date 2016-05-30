$(function() {
	$("#allType").mouseover(function() {
		$("#typeList").show();
	});
	$("#typeList").hover(function() {
		$("#typeList").show();
	},
	function() {
		$("#typeList").hide();
	});
	$("#headerSearchBtn").click(function() {
		var key_word = $("#searchkeyIpt").val();
		window.location.href = '/index.php/goods/search?keyword=' + key_word + '';
		//		search("" ,""," ",key_word);
		return false
	});
	//enter键搜索
	$("#searchkeyIpt").bind('keypress',function(event){
		if(event.keyCode == "13"){
			var key_word = $("#searchkeyIpt").val();
			window.location.href = '/index.php/goods/search?keyword=' + key_word + '';
			return false
		}
	});
	$("#typeList li a").click(function() {
			var List_id = $(this).attr("data-id");
			window.location.href = '/index.php/goods/search?cat_id=' + List_id + '';
		})
		//轮播
	$('#slidesWrap0 ul').carouFredSel({

		prev: '#slidesWrap0 .prev-btn',
		next: '#slidesWrap0 .next-btn',

		scroll: 800
	});
	$('#slidesWrap1 ul').carouFredSel({
		prev: '#slidesWrap1  .prev-btn',
		next: '#slidesWrap1  .next-btn',
		auto : false,
		scroll: 1000
	});
	$('#slidesWrap2 ul').carouFredSel({
		prev: '#slidesWrap2  .prev-btn',
		next: '#slidesWrap2  .next-btn',
		auto : false,
		scroll: 1000
	});

});