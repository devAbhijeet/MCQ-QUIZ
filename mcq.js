$(document).ready(function(){  
	var xmlhttp,
		json,  
	    q_array = [],
	    a_array = [],
	    outputs = $('.quiz'),
	    button  = $('#next'),
	    nexq    = $('.next');

	     button.on('click',function(){
	    	var ajax = new Ajax(callBack);
	    	$(this).css('display','none');
	    	nexq.css('display','inline-block');  
	    });

	    var callBack = function(reponse){
	    	json = reponse;

	    	$(json.questions).each(function(index,value){
				q_array[index] = value;   
			});
			display.index   = 0;
			display.correct = 0;  
			display();

			nexq.on('click',next);
	    }

	    var next = function(){
	    	check();
	    	outputs.empty();  
	    	display.index++;
	    	display();
	    }

	    var check = function(){
	    	var radios = document.getElementsByName('answer'),
	    		ans;
	    	for(var i=0;i<radios.length;i++){
	    		if(radios[i].checked){
	    			ans = radios[i].value;
	    			a_array.push(Number(ans));
	    		}	
	    	} 
	    }

	    var display = function(){

	    	if(display.index<q_array.length){
				var div    = $('<div></div>',{class:'output'});
				var	header = $('<h2>Question '+(display.index+1)+'</h2>'); 
				div.append(header);

				var	paraq  = $('<p>').append(q_array[display.index].question);
				div.append(paraq);

				var radio = createRadio(display.index);
				div.append(radio); 

				outputs.append(div);
 
			}else{
				var greet = $('<h3>'); 
				var message     = right(q_array,a_array);				
				greet.text('Congratualtions you got '+display.correct+' questions right outoff '+q_array.length);
				outputs.append(greet);
				outputs.append(message);  
				display.index   = 0;
				display.correct = 0;
			} 
 
	    }

	    var createRadio = function(index){
	    	var ulist = $('<ul>');
			var items;
			var bli = $('<li>');
			var input;
			for(var i=0;i<q_array[index].choices.length;i++){
				items = $('<li>'); 
				input = '<input type="radio" id="answer" name="answer" value='+ q_array[index].choices[i] +'>';
				input+=q_array[index].choices[i];  
				items.append(input);
				ulist.append(items);
			}

			return ulist;
	    }

	    function right(question,answer){
	    	var div  = $('<div></div>',{class:'output'});
			var ul   = $('<ul>',{class:'final'});
			var li; 
			var input;
			var paraq;
	    	for(var i=0;i<question.length;i++){
	    		if(question[i].answer === answer[i]){
	    			display.correct++;
	    			li = $('<li>');
	    			paraq = $('<p style="color:#008000;">',{class:'success'});
	    			paraq.append(question[i].question);    
	    			li.append(paraq);
	    			for(var j=0;j<question[i].choices.length;j++){
	    				if(question[i].choices[j] === answer[i]){
	    					input='<input type="radio" id="answer" name=answer-'+i+' value='+ question[i].choices[j] +' checked="checked">';
							input+=question[i].choices[j];
	    				}else{
	    					input='<input type="radio" id="answer" name=answer-'+i+' value='+ question[i].choices[j] +'>';
							input+=question[i].choices[j];  
	    				} 
						li.append(input);  
						ul.append(li);
	    			}
	    			
	    		}else{
	    			li = $('<li>');
	    			paraq = $('<p style="color:#F00;">',{class:'error'});
	    			paraq.append(question[i].question+'  <small>('+question[i].answer+')</small>');
	    			li.append(paraq);
	    			for(var j=0;j<question[i].choices.length;j++){
	    				if(question[i].choices[j] === answer[i]){
	    					input='<input type="radio" name=answer-'+i+' value='+ question[i].choices[j] +' checked>';
							input+=question[i].choices[j];  
	    				}else{
	    					input='<input type="radio" name=answer-'+i+' value='+ question[i].choices[j] +'>';
							input+=question[i].choices[j]; 
	    				}
						li.append(input); 
						ul.append(li);
	    			}
	    		}
	    	} 
	    	div.append(ul); 
	    	return div;
	    }
	    function Ajax(callBack){

		    	xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState == 4 && xmlhttp.status ==200){
						callBack(JSON.parse(xmlhttp.responseText));
					} 
				}

				xmlhttp.open('GET','mcq.json'); 
				xmlhttp.send();
		    }
});                                                                                                                                                                                                                                         
 
