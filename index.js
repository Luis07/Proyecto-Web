var LOGIN=LOGIN||
{

	guardarUser: function() {

		var usuario = document.getElementById("usuario").value;
		var contrasena = document.getElementById("contrasena").value;


		LOGIN.guardar(usuario,contrasena);


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
      }else
      {

      	var date={'User':this.usuario,'Password':this.contrasena};
      	dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));

    }


},validar:function(usuario,contrasena)
{
	this.usuario=usuario;
	this.contrasena=contrasena;

	dato = localStorage.getItem("Login");

	dato = JSON.parse(localStorage.getItem("Login"));

	debugger;

	for (var i = 0; i <dato.length; i++) {
		/*validacion de los usuarios*/

		if(dato[i].User==this.usuario&&dato[i].Password==this.contrasena){
debugger;
			alert(dato[i].User + dato[i].Password);
			window.open("http://localhost/Luis/correo.html","_self").value;

		}
	}


},Login:function()

{
	var usuario = document.getElementById("usuario").value;
	var contrasena = document.getElementById("contrasena").value;
debugger;

	LOGIN.validar(usuario,contrasena);

}

};

