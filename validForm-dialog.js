/**
 *  formValid를 위한 기본 알림 다이얼로그
 *  부트스트랩 버튼 테마를 사용.
 *  
 */
function Dialog(icon){
	var dialogTemplate = 
	'<div>'+
	'    <div style="z-index:99999; display: none">'+
	'		<div style="font-size: 30px; ">'+
				icon+
	'		</div>'+
	'		<div>'+
	'			<p class="modal_msg"  style="margin-top: 10px; margin-bottom: 10px">'+
	'			</p>'+
	'				<a id="dismiss" href="#;" class="btn btn-lg btn-danger" style="margin-bottom:10px">'+
	'					확인'+
	'				</a>'+
	'		</div>'+
	'	</div>'+
	'</div>';
	var $dialog = $($(dialogTemplate).html());
	var $dismiss = $dialog.find('#dismiss');
	
	$(document.body).append($dialog);

	return {
		dialog: $dialog,
		alert: function(message, callback){
			this.dialog.find('p.modal_msg').html(message);
			
			$dismiss.click(function(){
				$('div#big_block').unblock({
						fadeOut:150, 
						onUnblock: function(){
							$('div#big_block').remove();
							$(this).find('p.modal_msg').empty();
							$(this).find('p.modal_msg_detail').empty();
							if(_.isFunction(callback))
								callback();
						}
				});
			});
			
			$('<div id="big_block" style="position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:99999" />')
				.appendTo(document.body)
			    .block({	
					baseZ: 99999,
					fadeIn: 500,
					opacity: 0.2,
					message : this.dialog ,
					css:{
						width:		'322px',
						
						border: 		  0,
						'border-radius': '20px',
//						'-webkit-box-shadow': '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
//						'-moz-box-shadow':    '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
//						'box-shadow':         '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
						top:		(document.body.clientHeight / 2) - 200 ,
						left:		(document.body.clientWidth / 2) - 161
					},
					effect : {name : 'bounce', option : {distance: 10, times: 2 }}
				}); 
		}
	} 
}

$.validDialog = new Dialog('<span class="glyphicon glyphicon-warning-sign" style="	color: #B33A3A;"></span>');
