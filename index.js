var LOGIN=LOGIN||
{

	guardarUser: function() {
		var usuario = document.getElementById("usuarioregistro").value;
		var contrasena = document.getElementById("contrasenaregistro").value;
		LOGIN.validarEmailregistro(usuario,contrasena);
	},
	guardar:function(usuario,contrasena)
	{
		debugger;
		this.usuario=usuario;
		this.contrasena=contrasena;
       //lo obtiene todo en si
       dato = localStorage.getItem("Login");
       //lo obtiene en objetos 
       dato = JSON.parse(localStorage.getItem("Login"));
       if(!LOGIN.correosiguales(this.usuario)){
       	if(dato==null)
       	{
       		var datosLogin=new Array();
       		var date={'User':this.usuario,'Password':this.contrasena};
       		datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
          window.open("index.html");
          window.close("registrousuarios.html");
      }
      else
      {
      	var date={'User':this.usuario,'Password':this.contrasena};
      	dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));
        window.open("index.html");
        window.close("registrousuarios.html");}
    }else{

    	alert("El correo: "+usuario+" ya existe");
    }
},validar:function(usuario,contrasena)
{
	debugger;
	this.usuario=usuario;
	this.contrasena=contrasena;
    var dato=JSON.parse(localStorage.getItem("Login"));
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
	debugger;
	var usuario = document.getElementById("usuario").value;
	var contrasena = document.getElementById("contrasena").value;
	LOGIN.validar(usuario,contrasena);
},validarEmail:function ( usuario,contrasena ) {
	var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if ( !expr.test(usuario) ){
		alert("Error: La dirección de correo " + usuario + " es incorrecta.");
		return false;
	}
	return true;
},validarEmailregistro:function ( usuario,contrasena ) {

	var datosformulario=document.form_registro;
	if(!LOGIN.camposvacios(datosformulario))
	{
		if(LOGIN.validarEmail(usuario,contrasena)){
			LOGIN.guardar(usuario,contrasena);
		}
		
	}	
},camposvacios:function(datosf)
{
	var datosformulario=datosf;
	for (var i=0; i<datosformulario.length; i++) {
		if(datosformulario[i].type ==='text'||datosformulario[i].type ==='textarea')
		{
			if (datosformulario[i].value === null || datosformulario[i].value.length === 0)
			{
				alert("No se permiten campos vacios");
				return true;
			}
		}
		if(datosformulario[i].type ==='text'||datosformulario[i].type ==='password'||datosformulario[i].type ==='month') {
			if (datosformulario[i].value === null || datosformulario[i].value.length === 0 || /^\s*$/.test(datosformulario[i].value)){
				alert ( ' no pueden haber campos vacios ');
				return true;	
			}
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
       //lo obtiene todo en si en un arreglo de datos
       bentrada = JSON.parse(localStorage.getItem("Bandejaentrada"));
       bsalida = JSON.parse(localStorage.getItem("Bandejasalida"));
       if(bsalida===null&&bentrada===null)
       {
       	var enviados={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
       	var salida={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
       	bentrada.push(enviados);
       	bsalida.push(salida);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Bandejasalida",JSON.stringify(bsalida));
          localStorage.setItem("Bandejaenviados",JSON.stringify(bentrada));
      }
      else
      {
      	var enviados={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
      	var salida={'User':this.usuario,'para':"",'asunto':"",'contenido':""};
      	bsalida.push(salida);
      	bentrada.push(enviados);
      	localStorage.setItem("Bandejasalida",JSON.stringify(bsalida));
      	localStorage.setItem("Bandejaenviados",JSON.stringify(bentrada));
      }
  },correosiguales:function(usuario)
  {
  	this.usuarionuevo=usuario;
  	dato = JSON.parse(localStorage.getItem("Login"));
  	if(dato==null){
  		return false;
  	}else{
  		for (var i = 0; i < dato.length; i++) {
  			if(dato[i].User===this.usuarionuevo)
  			{
  				return true;
  			}
  		}
  	}
  },bandejaenviados:function()
  {
  	LOGIN.cambiarestilo();
  },cambiarestilo:function()
  {
  	var elemento = document.getElementById("bs");
  	var cambio=document.getElementById("be");
  	elemento.className = "btn btn-primary bajarunpoco grande ";
  	cambio.className="btn btn-primary bajarunpoco grande color marcado";
  	$('bs').html(elemento);
  	$('be').html(cambio);

  },bandejasalida:function()
  {
  	LOGIN.cambiarestilob();
  },cambiarestilob:function()
  {
  	var elemento = document.getElementById("bs");
  	var cambio=document.getElementById("be");
  	elemento.className = "btn btn-primary bajarunpoco grande color marcado";
  	cambio.className="btn btn-primary bajarunpoco grande";
  	$('bs').html(elemento);
  	$('be').html(cambio);

  }

  ,guardarbandejasalida:function()
  {
  	debugger;
  	var para=document.getElementById("mensajepara").value;
  	var asunto=document.getElementById("asuntomensaje").value;
  	var contenido=document.getElementsByClassName("contenidomensaje").value;
  	if(LOGIN.validarEmail(para)){
  		var datosformulario=document.formredactar;
  		if(!LOGIN.camposvacios(datosformulario))
  		{
  			var bandeja=new Array();
  			var band=JSON.parse(localStorage.getItem("Bandejasalida"));
  	    var nuevo={'User':usuacon,'para':para,'asunto':asunto,'contenido':contenido};
if(band===null){
  bandeja.push(nuevo);
  localStorage.setItem("Bandejasalida",JSON.stringify(bandeja));
}else{
  band.push(nuevo);  
  localStorage.setItem("Bandejasalida",JSON.stringify(band));
}
  			}
  		}
  	}

};
