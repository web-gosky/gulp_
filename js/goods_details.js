$(function() {
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

	$("#headerSearchBtn").click(function() {
		var key_word = $("#searchkeyIpt").val();
		window.location.href = '/index.php/goods/search?keyword=' + key_word + '';
		//		search("" ,""," ",key_word);
		return false
	});
	//enter键搜索
	$("#searchkeyIpt").bind('keypress', function(event) {
		if (event.keyCode == "13") {
			var key_word = $("#searchkeyIpt").val();
			window.location.href = '/index.php/goods/search?keyword=' + key_word + '';
			return false
		}
	});
	$("#typeList li").click(function() {
			var List_id = $("#typeList li a").attr("data-id");
			window.location.href = '/index.php/goods/search?cat_id=' + List_id + '';
		})
		//选择规格的bar
	var iconbar = $("#specificationsBox");
	var icon = $("#specificationsBox  .specifications-item ");
	icon.click(function() {
		//采购价	
		var e = $(this).attr("data-actualprice");
		//单价
		var r = $(this).attr("data-actualunitprice");
		var num = $(this).attr("data-specnum");
		$(this).addClass("specifications-checked").siblings().removeClass("specifications-checked");
		$('#actualPrice').html(e);
		$("#actualUnitPriceId").html("(单价: ¥ " + r + " )");
		$("#stockBox span").html(num);

		return false
	});
	$('#numReduce').click(function() {

		var a = parseInt($("#goodsNum").val());
		if (a > 1) {
			a = a - 1;
			$("#goodsNum").val(a);
		}
	});
	$('#numAdd').click(function() {
		var num = parseInt($("#stockBox span").text());
		var a = parseInt($("#goodsNum").val());
		if (a < num) {
			a = a + 1;
			$("#goodsNum").val(a);
		}

	});

	var ImgPrev = $("#goodsImgPrev");
	var ImgNext = $("#goodsImgNext");
	var ImgBox = $("#goodsImgBox");
	var Imgbox_top = ImgBox.offset().top;
	var SmallBox = $("#goodsImgBox .goods-img-small");
	var SmallSize = $("#goodsImgBox").children().size();
	var GoodsImg = $("#goodsImgBig");

	function Next(nIndex) {
		ImgNext.click(function() {
			nIndex = nIndex + 1;

			if (nIndex > SmallSize - 1) {
				nIndex = -1;

			}
			if (nIndex == 0) {

				$("#goodsImgBox").css("margin-top", '0px');

			}
			if (nIndex > 2) {
				$("#goodsImgBox").css("margin-top", '-200px');
			}
			SmallBox.eq(nIndex).addClass("img-checked").siblings().removeClass("img-checked");
			var n_src = SmallBox.eq(nIndex).children().attr("src");
			GoodsImg.attr("src", n_src);

			return false
		});
	}

	function Prev(nIndex) {

		var e = 0;
		ImgPrev.click(function() {
			nIndex = nIndex - 1;
			e = e + 1;
			if (nIndex < 0) {

				$("#goodsImgBox").css("margin-top", '-(SmallSize-3)*200px');
				nIndex = SmallSize - 1;
			}
			if (e == 4) {
				$("#goodsImgBox").css("margin-top", '0px');
				e = 0;
			}
			//					if(nIndex<-2){
			//				
			//					$("#goodsImgBox").css("margin-top", '0px');
			//					nIndex=0;
			//				}

			SmallBox.eq(nIndex).addClass("img-checked").siblings().removeClass("img-checked");
			var n_src = SmallBox.eq(nIndex).children().attr("src");
			GoodsImg.attr("src", n_src);

			return false
		});

	}

	$("#goodsImgBox .goods-img-small").click(function() {

		var _this = $(this);
		var nIndex = _this.index();
		_this.addClass("img-checked").siblings().removeClass("img-checked");
		var w_src = _this.children().attr("src");

		console.log(w_src);
		GoodsImg.attr("src", w_src);
		Next(nIndex);
		Prev(nIndex);
	})
	$("#goodsImgBox .goods-img-small:first").trigger('click');
	//tab商品详情和商品信息
	var infor = $("#goodsInfoTag");
	var detail = $("#goodsDetailTag");
	var goodsInfo = $("#goodsInfo");
	var goodsdetail = $("#goodsDetail");
	infor.click(function() {
		var t = goodsInfo.offset().top;
		$(this).addClass("info-checked");
		detail.removeClass("info-checked");
		$("html, body").animate({
			scrollTop: t - 138
		}, 200)
	});
	detail.click(function() {
		var g = goodsdetail.offset().top;
		$(this).addClass("info-checked");
		infor.removeClass("info-checked");
		$("html, body").animate({
			scrollTop: g - 138
		}, 200)
	});
	//scrollTitle
	$(window).on("scroll", function() {
			if ($(this).scrollTop() > 680) {
				$("#scrollTitle").addClass("scrollFix");
			} else {
				$("#scrollTitle").removeClass("scrollFix");
			}
			if ($(this).scrollTop() > 1330) {
				$("#goodsInfoTag").removeClass("info-checked");
				$("#goodsDetailTag").addClass("info-checked");
			} else {
				$("#goodsDetailTag").removeClass("info-checked");
				$("#goodsInfoTag").addClass("info-checked");
			}

		})
		//点击立即购买事件
	$("#buyBtn").on("click", function() {
		var item_id = $(this).attr("data-itemid");
		var num, sku_id, url;
		var $spec = $("#specificationsBox .specifications-checked");
		if ($spec.length == 0) {
			alert("请选择商品规格");
			return false;
		}
		sku_id = parseInt($spec.attr("data-specid"));
		num = $("#goodsNum").val();
		if (num==undefined) {
			num=1;
		}
		$.ajax({
			type: "get",
			url: "/index.php/Goods/get_goods_quantity",
			dataType:"json",
			
			data: {
				num: num,
				sku_id: sku_id,
				item_id: item_id
			},
			success: function(response) {
				if (response.status == true) {
		
					if (num == undefined) {
						url = "/index.php/Buy/index?item_id=" + item_id + "&sku_id=" + sku_id;
					} else {
						url = "/index.php/Buy/index?item_id=" + item_id + "&sku_id=" + sku_id + "&num=" + num;
					}
					window.location = url;
				

				}
			if (response.status==false) {
				alert(response.msg);
			}
			
			}
		});

	})

})