$(function() {
	$("#cateLi .cate-more").click(function(){
	
	$("#cateLi .cate-block").css("height","auto");
	
})
		$("#secondCateLi .cate-more").click(function(){
	
	$("#secondCateLi .cate-block").css("height","auto");
	
})
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
	function getParam() {
		var param = {};
		var cat_id = 0;
		var brand_id = 0;
		var type = 2;
		var sub = 0;
		var page = 0;

		//获取变量cat_id
		sub = $("#secondCateLi a.active").attr("data-id");
		cat_id = $("#cateLi a.active").attr("data-id");

		if (sub) {
			cat_id = sub;

		}

		//获取变量brand_id
		brand_id = $('#brandLi a.active').attr('data-id');

		param['cat_id'] = cat_id;
		param['type'] = 2;

		if (cat_id > 0) {
			param['cat_id'] = cat_id;
		}

		if (brand_id > 0) {
			param['brand_id'] = brand_id;
		}

		return param;
	}

	function getData(param) {
		$.ajax({
			type: 'GET',
			url: '/index.php/goods/ajax_goods_list',
			data: param,

			dataType: 'json',
			success: function(data) {
				//清空填充列表

				if (data.status == false) {
					$('#goodsListUl li').remove();
					$('#pagination').hide();
					$('#goodsListUl ').html('<div style="width: 100%;text-align:center;">' + data.msg + '</div>');
				} else if (data.status == true) {
					$('#goodsListUl').html(" ");
					$('#pagination').show();
					$('.pagination span, .pagination a').remove();
					$('.pagination').prepend(data.data.page);

					$('#total_page').html(data.data.total_page_num);
					//											$('#cur_page').val(data.data.total_count_num);
					$('#total_count').html(data.data.total_count_num);

					var html = template('goodslist', data);

					$('#goodsListUl').append(html);

				}

			}
		});
	}

	$(".d_setting").click(function() {
		$('#d_fenkai').show();
	});
	$("#d_fenkai").mouseover(function() {
		$(this).show();
	});
	$("#d_fenkai").mouseout(function() {
		$(this).hide();
	});
	$("#allType").mouseover(function() {
		$("#typeList").show();
	});
	$("#typeList").mouseover(function() {
		$("#typeList").show();
	});
	$("#typeList").mouseout(function() {
		$("#typeList").hide();
	});
	//
	$(".fixed-container").on('click', '.cate-block a',
		function() {
			var _this = $(this);
			_this.addClass("active");
			//		
			_this.siblings().removeClass('active');
			_this.find("i").show();
			_this.siblings().find("i").hide();
		});
	//品牌点击icon
	$(".fixed-container").on('click', '#brandLi .cate-block a i',
		function() {

			$(this).parent().removeClass('active');
			$(this).hide();
			$('.brand-crumbs').hide();
			return false
		});
	//品牌点击
	$(".fixed-container").on('click', '#brandLi .cate-block a ',
		function() {
			$('.brand-crumbs').show();
			var _brandCrumbs = $('.brand-crumbs>span');
			var _text = $(this).find("span").text();

			_brandCrumbs.text(_text);

			return false
		});
	//分类点击icon
	$(".fixed-container").on('click', '#secondCateLi .cate-block a i',
		function() {

			$(this).parent().removeClass('active');
			$(this).hide();
			$('.subcate-crumbs').hide();
			$('.subcate-crumbs').next('i').hide();
			return false
		});
	//分类点击i
	$(".fixed-container").on('click', '#secondCateLi .cate-block a ',
		function() {

			var subcate_crumbs = $('.subcate-crumbs>span');
			var _text = $(this).find("span").text();
			subcate_crumbs.text(_text);
			$('.subcate-crumbs').show();
			$('.subcate-crumbs').next('i').show();
			var id = $(this).attr('data-id');
			return false
		});
	//类目
	$(".fixed-container").on('click', '#cateLi .cate-block a',
		function() {
			$(".subcate-crumbs").hide();
			$(".subcate-crumbs").next().hide();
			$('.brand-crumbs').hide();
			$('.brand-crumbs').next().hide();
			var _text = $(this).text();
			$('#searchCrumbs').show();
			$('#cateLi .cate-block a').next()
			$("#secondCateLi").show();
			$('#brandLi').show();
			$(".cate-crumbs i").show();
			$(".cate-crumbs ").next().show();
			$(".cate-crumbs span").text(_text);
			var id = $(this).attr('data-id');

			//取二级分类
			for (var i = 0; i < cats_json['cat_list_2'].length; i++) {
				console.log(cats_json['cat_list_2'][i]);
				if (id == cats_json['cat_list_2'][i]['cid']) {
					var cat_sub_list = cats_json['cat_list_2'][i]['sub_cat_list'];
					var brand_list = cats_json['cat_list_2'][i]['brand_list'];
					if (cat_sub_list != undefined) {
						var html = '';
						var _html = '';
						for (var j = 0; j < cat_sub_list.length; j++) {
							html += '<a      class="d-ib subcate-a" data-type="subcate"     data-id="' + cat_sub_list[j]['cid'] + '"><span>' + cat_sub_list[j]['cat_name'] + '</span><i class="iconfont ml-5"></i></a>';
						}
						for (var k = 0; k < brand_list.length; k++) {
							_html += '<a      class="d-ib subcate-a" data-type="subcate"     data-id="' + brand_list[k]['brand_id'] + '"><span>' + brand_list[k]['brand_name'] + '</span><i class="iconfont ml-5"></i></a>';
						}
						$('#secondCateLi .inner-cate').html(html);
						$('#brandLi .inner-cate').html(_html);
					}
				}
			}
			//取品牌类目
		});
	//searchCrumbs  icon点击	
	$(".fixed-container").on('click', '.cate-crumbs i',
		function() {
			$("#secondCateLi").hide();
			$('#brandLi').hide();
			$('.cate-crumbs').siblings().hide();
			$(this).hide();
			$('#searchCrumbs').hide();
		})
	$(".fixed-container").on('click', '.brand-crumbs i',
		function() {
			$(this).parent().hide();
			$("#brandLi .cate-block a").removeClass("active");
			$("#brandLi .cate-block a i").hide();
		});
	$(".fixed-container").on('click', '.subcate-crumbs i',
		function() {
			$(this).parent().hide();
			$(this).parent().next().hide();
			$("#secondCateLi .cate-block a").removeClass("active");
			$("#secondCateLi .cate-block a i").hide();
		});
	//分类AJAX三级index点的
	$(".fixed-container").on('click', '#secondCateLi .cate-block  a , #cateLi .cate-block  a ', function() {
		//		var cat_id = $(this).attr('data-id');
		var data = getParam();
		$('#goodsListUl li').html();

		getData(data);
	});

	$(".fixed-container").on('click', '#brandLi .cate-block  a ', function() {
		//		var brand_id = $(this).attr('data-id');
					var data = getParam();
		$('#goodsListUl li').html();

		getData(data);
	});

	//点关闭AJAX刷新
	$("#searchWrap").on('click', 'i', function() {
			$(this).parent().removeClass("active");
			var data = getParam();
		//		var cat_id = $(this).parents("li").prev("li").find(".active").attr('data-id');
	
		//		
		$('#goodsListUl li').html();

		getData(data);

	});
	$('#pagination').delegate('a, input[type="button"]', 'click', function() {
		var data = getParam();
		var page = parseInt($(this).attr('data-ci-pagination-page'));

		if ($(this).is('input')) {
			var page = parseInt($('#cur_page').val());
		}
		data['page'] = page;

		getData(data);

		return false;
	});

});