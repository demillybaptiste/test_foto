    function ouvrir_camera() { // le code utlilisé provient de https://codes-sources.commentcamarche.net/faq/11265-recuperer-et-sauvegarder-un-cliche-avec-la-webcam-grace-a-l-api-mediadevices#exemple-complet

     navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 400 } }).then(function(mediaStream) {

      var video = document.getElementById('sourcevid');
      video.srcObject = mediaStream;

      var tracks = mediaStream.getTracks();

      document.getElementById("message").innerHTML="message: "+tracks[0].label+" connecté"

      console.log(tracks[0].label)
      console.log(mediaStream)

      video.onloadedmetadata = function(e) {
       video.play();
      };
       
     }).catch(function(err) { console.log(err.name + ": " + err.message);

     document.getElementById("message").innerHTML="message: connection refusé"});
    }

    function photo(){
	    // changement apporté
	    var vivi = document.getElementById('sourcevid');

	    var id="cvs0";
	    var itteration=0;
	    while (document.getElementById(id)){
	    	itteration+=1;
	    	id='cvs'+parseInt(itteration);
	    }

	    var elt = document.getElementById('photo');
	    var newCanvas = document.createElement("canvas");
	    newCanvas.id=id;
	    document.body.appendChild(newCanvas, elt);
		var canvas1 = document.getElementById(id)
		var ctx =canvas1.getContext('2d');
	    canvas1.height=vivi.videoHeight
	    canvas1.width=vivi.videoWidth
	    console.log(vivi.videoWidth)
	    newCanvas.style.display="flex";
	    newCanvas.insertAdjacentHTML('beforeend',elt);

	   	var newContent = ctx.drawImage(vivi, 0,0, vivi.videoWidth, vivi.videoHeight);
	    newCanvas.insertAdjacentHTML('beforeend',newContent);
  		document.body.appendChild(newCanvas, elt);

  		//bouton 1
  		var btn = document.createElement("BUTTON");       
		var t = document.createTextNode("fermer cet image");      
		btn.id="btn"+itteration;
		btn.appendChild(t);                               
		document.body.appendChild(btn);
		btn.addEventListener("click", function() {
			var canvas = document.getElementById(id);
  			document.body.removeChild(canvas);
  			var button = document.getElementById("btn"+itteration);
  			document.body.removeChild(button);
  			var button2 = document.getElementById("secondbtn"+itteration);
  			document.body.removeChild(button2);
		});

		//bouton2
		var btn2 = document.createElement("BUTTON");       
		var t = document.createTextNode("télécharger");      
		btn2.id="secondbtn"+itteration;
		btn2.appendChild(t);                               
		document.body.appendChild(btn2);
		btn2.addEventListener("click", 	function(){
			sauver(itteration);
		});



    }
    


    function sauver(id){

	    if(navigator.msSaveOrOpenBlob){

		    var blobObject=document.getElementById("cvs"+id).msToBlob()

		    window.navigator.msSaveOrOpenBlob(blobObject, "image.png");
	    }

	    else{

		    var canvas = document.getElementById("cvs"+id);
		    var elem = document.createElement('a');
		    elem.href = canvas.toDataURL("image/png");
		    elem.download = "nom"+id+".png";
		    var evt = new MouseEvent("click", { bubbles: true,cancelable: true,view: window,});
		    elem.dispatchEvent(evt);
	    }
    }

    function fermer(){

     var video = document.getElementById('sourcevid');
     var mediaStream=video.srcObject;
     console.log(mediaStream)
     var tracks = mediaStream.getTracks();
     console.log(tracks[0])
     tracks.forEach(function(track) {
      track.stop();
      document.getElementById("message").innerHTML="message: "+tracks[0].label+" déconnecté"
     });

     video.srcObject = null;
    }