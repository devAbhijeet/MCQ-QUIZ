<?php
	if(isset($_GET['test']) && !empty($_GET['test'])){
		$test = $_GET['test'];   
?>    
	 
	<html lang="en">  
		<head>
			<meta charset="UTF-8">
			<title>Document</title>
			<link rel="stylesheet" href="mcq.css">    
		</head>
		<body> 
			<div class="mcq">
	  			<div class="quiz"></div>
	  			<div id="next" class="button">Start the test</div>
	  			<div class="next button">Next</div>   
			</div>
		</body>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="mcq.js"></script> 
	</html> 

<?php	}else{
		header('Location:../index.html'); 
	}
	 
?>


