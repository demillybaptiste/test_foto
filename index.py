# coding: utf-8

import cgi 

form = cgi.FieldStorage()
print("Content-type: text/html; charset=utf-8\n")


html = """<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<script type="text/javascript" src="static/javascript.js"></script>
		<title>test foto</title>
	</head>
	<body>

		<div style='display:inline-block'>

     <video id="sourcevid" width='400' autoplay="true"></video>

     <div id="message" style='height:20px;width:350px;margin:5px;'>message:</div>
    </div>



    <div>
     <button onclick='ouvrir_camera()' >ouvrir camera</button>
     <button onclick='fermer()' >fermer camera</button>
     <br>
     <button onclick='photo()' >prise de photo</button>

    </div>



	</body>
</html>
"""

print(html)

