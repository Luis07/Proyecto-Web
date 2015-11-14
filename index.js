var LOGIN=LOGIN||
{

	guardarUser: function() {
		debugger;
		var usuario = document.getElementById("usuarioregistro").value;
		var contrasena = document.getElementById("contrasenaregistro").value;
		LOGIN.validarEmail(usuario,contrasena);
	},
	guardar:function(usuario,contrasena)
	{
		this.usuario=usuario;
		this.contrasena=contrasena;
       //lo obtiene todo en si
       dato = localStorage.getItem("Login");
       //lo obtiene en objetos 
       dato = JSON.parse(localStorage.getItem("Login"));
       debugger;
       if(!LOGIN.correosiguales(this.usuario)){
       if(dato==null)
       {
       	var datosLogin=new Array();
       	var date={'User':this.usuario,'Password':this.contrasena};
       	datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
          LOGIN.crearbandejas();
          window.open("index.html");
          window.close("registrousuarios.html");
      }
      else
      {
      	var date={'User':this.usuario,'Password':this.contrasena};
      	dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));
        LOGIN.crearbandejas();
        window.open("index.html");
        window.close("registrousuarios.html");}
    }else{

alert("El correo: "+usuario+" ya existe");
    }
    },validar:function(usuario,contrasena)
    {
    	this.usuario=usuario;
    	this.contrasena=contrasena;
    	dato = localStorage.getItem("Login");
    	dato = JSON.parse(localStorage.getItem("Login"));
    	for (var i = 0; i <dato.length; i++) {
    		/*validacion de los usuarios*/
    		if(dato[i].User===this.usuario&&dato[i].Password===this.contrasena)
    		{
    			var conectado={'conectado':this.usuario};
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Enlínea",JSON.stringify(conectado));
        window.open("correo.html");
    }
}
},Login:function()
{
	var usuario = document.getElementById("usuario").value;
	var contrasena = document.getElementById("contrasena").value;
	LOGIN.validar(usuario,contrasena);
},validarEmail:function ( usuario,contrasena ) {
	var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!LOGIN.camposvacios())
	{

		if ( !expr.test(usuario) ){
			alert("Error: La dirección de correo " + usuario + " es incorrecta.");
		}else{
			LOGIN.guardar(usuario,contrasena);
		}
	}	
},camposvacios:function()
{
	var datosformulario=document.form_registro;
	for (var i=0; i<datosformulario.length; i++) {
		if(datosformulario[i].type ==='text'||datosformulario[i].type ==='password'||datosformulario[i].type ==='month') {
			if (datosformulario[i].value === null || datosformulario[i].value.length === 0 || /^\s*$/.test(datosformulario[i].value)){
				alert (datosformulario[i].name+ ' no puede estar vacío');
				return true;	}
			}
		}
	},imagen:function() {
		files=document.getElementById('imagen').value;
		if(LOGIN.comprueba_extension(files)){
			var file = files;
			var imageType = /image.*/;
			var img = document.createElement("img");
			img.classList.add("obj");
			img.file = file;
			debugger;
			document.getElementById("foto").src =img.file;
		}
	}, comprueba_extension:function(archivo) { 
		debugger;	
		extensiones_permitidas = new Array(".png", ".jpg"); 
		mierror = ""; 
       //recupero la extensión de este nombre de archivo 
       extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      //compruebo si la extensión está entre las permitidas 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
      	if (extensiones_permitidas[i] === extension) { 
      		return true; 
      	} 
      } 
      alert("Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join()); 
      return false; 
  },

  listacorreos:function() {

	// read users from localstorage
	// loop users
	var user_html = "";
	for (var i = 0; i < users.length; i++) {
		// add users to the table
		var u = users[i];
		user_html = user_html + "<tr><td>"+u.username+"</td><td>"+
		u.password+"</td></tr>";
	}

	$('#users_table').html(user_html);

},	usuarioconectado:function(){   
	usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
	$('#conectado').html(usuacon);	
	
},
	crearbandejas: function() {
		var usuario = document.getElementById("usuarioregistro").value;
		LOGIN.crear(usuario);
	},
	crear:function(usuario)
	{
		debugger;
		this.usuario=usuario;
       //lo obtiene todo en si
       bentrada = JSON.parse(localStorage.getItem("Bandejaentrada"));
       bsalida = JSON.parse(localStorage.getItem("Bandejasalida"));
       if(bsalida===null&&bentrada===null)
       {
       	var datosenviados=new Array();
       	var datosbsalida=new Array();
       	var enviados={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
       	var salida={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
       	datosenviados.push(enviados);
        datosbsalida.push(salida);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Bandejasalida",JSON.stringify(salida));
          localStorage.setItem("Bandejaenviados",JSON.stringify(enviados));
      }
      else
      {
       	var enviados={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
       	var salida={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
      	bsalida.push(salida);
      	bentrada.push(enviados);
        localStorage.setItem("Bandejasalida",JSON.stringify(salida));
        localStorage.setItem("Bandejaenviados",JSON.stringify(enviados));
      }
},correosiguales:function(usuario)
{
	debugger;
	this.usuarionuevo=usuario;
  dato = JSON.parse(localStorage.getItem("Login"));
     for (var i = 0; i < dato.length; i++) {
     	if(dato[i].User===this.usuarionuevo)
     	{
return true;
     	}
     }
}
};

