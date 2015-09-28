/**
 *	common.js
 *
 *	@date 2015.07.13
 */

(function($){
	$.fn.extend({
		// 高さ揃え
		heightAlign: function(options) {
			var self = this;

			var defaults = {
				target: 'a'
			};
			var settings = $.extend({}, defaults, options);

			var adjustHeight = function(elm){
				var maxHeight = 0;

				elm.each(function(){
					if($(this).height() > maxHeight){
						maxHeight = $(this).height();
					}
				});
				elm.css('height', maxHeight);
			};

			if(settings.base){
				self.find(settings.base).each(function(){
					adjustHeight($(this).find(settings.target));
				});
			} else {
				adjustHeight(self.find(settings.target));
			}
		return this;
		},

		// グラフ：パイチャート表示
		showPieChart: function( options ){
			var defaults = {
				title: '',
				unit: '%',
				data: []
			};
			var settings = $.extend( defaults, options );
			var pointFromat;

			if( settings.unit == '%' ) {
				pointFormat = '<b>{point.percentage:.1f}%</b>';
			} else {
				pointFormat = '<b>{point.y}' + settings.unit + '</b> ({point.percentage:.1f}%)';
			}

			$(this).highcharts({
				chart: {
					backgroundColor: 'transparent',
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				// colors: ['#3366cc', '#dc3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00'],
				title: {
					text: settings.title,
					align: 'left'
				},
				tooltip: {
					pointFormat: pointFormat
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: [{
					type: 'pie',
					name: settings.title,
					data: settings.data,
					size: '100%'
				}],
				credits: {
					enabled: false
				}
			});
		},

		// グラフ：棒グラフ＋折れ線グラフ表示
		showGraphColLine: function( options ){
			var defaults = {
				title: '',
				// unit: '%',
				x_axis: [],
				series_name: [],
				data: []
			};
			var settings = $.extend( defaults, options );

			var seriesLength = settings.series.length;
			var seriesData = [];
			var seriesTemp = {};

			// series の type にデフォルト設定
			for(i=0,l=seriesLength; i<l; ++i){
				seriesTemp = settings.series[i];
				if(!seriesTemp.type) {
					seriesTemp.type = 'column';
				}
				seriesData.push(seriesTemp);
				seriesTemp = {};
			}

			$(this).highcharts({
				chart: {
					zoomType: 'xy'
				},
				title: {
					text: settings.title,
					align: 'left'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				xAxis: [{
					categories: settings.x_axis,
					title: {
						enabled: false
					},
					labels: {
						enabled: true
					}
				}],
				yAxis: {
					title: {
						enabled: false
					},
					labels: {
						enabled: true
					}
				},
				series: seriesData,
				credits: {
					enabled: false
				}
			});
		},

		// グラフ：9BOX（散布図）表示
		show9Box: function( options ){
			var defaults = {
				title: '',
				x_title: '',
				x_unit: '',
				y_title: '',
				y_unit: '',
				data: []
			};
			var settings = $.extend( defaults, options );

			$(this).highcharts({
				chart: {
					type: 'scatter',
					zoomType: 'xy'
				},
				title: {
					text: settings.title,
					align: 'left'
				},
				xAxis: {
					title: {
						enabled: true,
						text: settings.x_title
					},
					labels: {
						enabled: false
					},
					max: 100,
					min: 0,
					tickPositions: [0, 33.3, 66.6, 100],
					gridLineWidth: 1
				},
				yAxis: {
					title: {
						text: settings.y_title
					},
					labels: {
						enabled: false
					},
					max: 100,
					min: 0,
					tickWidth: 1,
					tickPositions: [0, 33.3, 66.6, 100]
				},
				legend: {
					enabled: false
				},
				plotOptions: {
					scatter: {
						marker: {
							radius: 2,
							states: {
								hover: {
									enabled: true
								}
							}
						},
						tooltip: {
							headerFormat: '',
							pointFormat: [
								'{point.options.name}<br>',
								settings.x_title + ': {point.x}' + settings.x_unit + '<br>',
								settings.y_title + ': {point.y}' + settings.y_unit
							].join('')
						}
					},
					series: {
						cursor: 'pointer',
						point: {
							events: {
								click: function () {
									window.open(this.options.url);
								}
							}
						}
					}
				},
				series: [{
					name: settings.title,
					data: settings.data
				}],
				credits: {
					enabled: false
				}
			});
		}
	});
}(jQuery));


(function($){
	({
		init: function(){
			var self = this;

			$(function(){
				self.setSidebar();
				self.setSelectMenu();
				self.setAccordion();
				self.setSwitchCheck();
				self.setSmoothScroll();
			});
		},

		/**
		 *	チェックきりかえ
		 *
		 *	@date 2015.08.05
		 */
		setSwitchCheck: function(){
			$('#main .switch-check').each(function(){
				var img = $(this).children('img');
				var hidden = $(this).children('input[type=hidden]');

				var imgOn = '/img/ico_check_gray.png';
				var imgOff = '/img/ico_x.png';

				$(this).on('click', function(){
					if($(this).data('checked') === 0) {
						$(this).data('checked', 1);
						hidden.val(1);
						img.attr('src', imgOn);
					} else {
						$(this).data('checked', 0);
						hidden.val(0);
						img.attr('src', imgOff);
					}
				});
			});
		},

		/**
		 *	セレクトメニュー
		 *
		 *	@date 2015.07.09
		 */
		setSelectMenu: function(){
			$('#main .select-wrap select').selectmenu();
			$('#main .route .select-wrap select').selectmenu({
				width: 100
			});
		},

		/**
		 *	アコーディオン
		 *
		 *	@date 2015.07.09
		 */
		setAccordion: function(){
			$('#main .accordion-section').accordion({
				collapsible: true,
				active: false,
				heightStyle: "content"
			});
		},

		/**
		 *	サイドバー
		 *
		 *	@date 2015.07.09
		 */
		setSidebar: function(){
			var win = $(window);
			var body = $('#body');
			var sidebar = $('#side');
			var btnOpen = sidebar.find('span.ico');
			var btnClose = sidebar.find('.btn-close');
			var openClass = 'side-open';
			var fixClass = 'side-fixed';
			var sideTop = sidebar.offset().top;

			btnOpen.on('mouseenter', function(){
				body.addClass(openClass);
			});
			btnClose.on('click', function(){
				body.removeClass(openClass);
			});

			win.on('load scroll resize', function(){
				if(win.scrollTop() > sideTop){
					body.addClass(fixClass);
				} else {
					body.removeClass(fixClass);
				}
			})
		},

		/**
		 *	スムーススクロール
		 *
		 *	@date 2015.05.20
		 */
		setSmoothScroll: function(){
			var anchors = $('a[href^=#]').not('.noscroll');

			$(window).on('load', function(){
				anchors.each(function(){
					var hash = this.hash;
					var hashOffset = (hash === '')? {top:0,left:0} : $(hash).offset();

					$(this).on('click', function(e){
						e.preventDefault();

						// モバイル
						if($.isMobile){
							$('body').animate({ scrollTop: hashOffset.top }, 600, 'swing');

						// モバイル以外
						} else {
							$('html, body').animate({ scrollTop: hashOffset.top, scrollLeft: hashOffset.left }, 600, 'swing');
						}
					});
				});
			});
		}
	}.init());

}(jQuery));
