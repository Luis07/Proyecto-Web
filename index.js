var LOGIN=LOGIN||
{

	guardarUser: function() {
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

       if(dato==null)
       {
       	var datosLogin=new Array();

       	var date={'User':this.usuario,'Password':this.contrasena};
       	datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
          window.open("index.html");
          window.close("registrousuarios.html");
      }else
      {

      	var date={'User':this.usuario,'Password':this.contrasena};
      	dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));
        window.open("index.html");
        window.close("registrousuarios.html");}


    },validar:function(usuario,contrasena)
    {
    	this.usuario=usuario;
    	this.contrasena=contrasena;

    	dato = localStorage.getItem("Login");

    	dato = JSON.parse(localStorage.getItem("Login"));

    	for (var i = 0; i <dato.length; i++) {
    		/*validacion de los usuarios*/
    		if(dato[i].User==this.usuario&&dato[i].Password==this.contrasena)
    		{
    			window.open("correo.html");
    			window.close("index.html");
    			/*alert(dato[i].User + dato[i].Password);*/
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
    	debugger;
    	var datosformulario=document.form_registro;
    	for (var i=0; i<datosformulario.length; i++) {
    		if(datosformulario[i].type =='text'||datosformulario[i].type =='password'||datosformulario[i].type =='month') {
    			if (datosformulario[i].value == null || datosformulario[i].value.length == 0 || /^\s*$/.test(datosformulario[i].value)){
    				alert (datosformulario[i].name+ ' no puede estar vacío');
    		return true;	}
    		}
    	}
    }
};

