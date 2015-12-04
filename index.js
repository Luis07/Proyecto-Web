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
    }
    ,mostrarbotonesentrada:function(numero){
     debugger;
   document.getElementById("c"+numero).setAttribute("style"," border-left: solid #123959;");
     document.getElementById(numero).setAttribute("style","display:block;");
   },ocultarbotonesentrada:function(numero){
   document.getElementById("c"+numero).setAttribute("style"," border-left:none;");
    document.getElementById(numero).setAttribute("style","display:none;");
  }
  ,mostrarbotones:function(numero){
   debugger;
   document.getElementById("c"+numero).setAttribute("style"," border-left: solid #123959;");
   document.getElementById(numero).setAttribute("style","display:block;");
   document.getElementById(numero+"1").setAttribute("style","display:block;");
 },ocultarbotones:function(numero){
   document.getElementById("c"+numero).setAttribute("style"," border-left:none;");
  document.getElementById(numero).setAttribute("style","display:none;");
  document.getElementById(numero+"1").setAttribute("style","display:none;");
},eliminarcorreos:function(numero){
  var campo=numero;
  sal=JSON.parse(localStorage.getItem("Bandejasalida")); 
  usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
  var editado=JSON.parse(localStorage.getItem("Editado")); 
  var bandeja=new Array();
  if(sal===null){

  }else{
    for (var i = 0; i < sal.length; i++) {
      if(usuacon===sal[i].User){
       if(sal.length===1){
        localStorage.removeItem("Bandejasalida");
        break;
      }else{
        if(numero===i){

        }else{
         var nuevo={'User':sal[i].User,'para':sal[i].para,'asunto':sal[i].asunto,'contenido':sal[i].contenido};
         bandeja.push(nuevo);
         localStorage.setItem("Bandejasalida",JSON.stringify(bandeja));
       }
     }
   }
 }
 LOGIN.mostrarcantidadcorreosenlistas();
 LOGIN.cargarcorreosborrador();  
}
} ,eliminarcorreosentrada:function(numero){
  debugger;
  var campo=numero;
  sal=JSON.parse(localStorage.getItem("Bandejaenviados")); 
  usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;

  var bandeja=new Array();
  if(sal===null){

  }else{
    for (var i = 0; i < sal.length; i++) {
      if(usuacon===sal[i].User){
       if(sal.length===1){
        localStorage.removeItem("Bandejaenviados");
        break;
      }else{
        if(numero===i){

        }else{
         var nuevo={'User':sal[i].User,'para':sal[i].para,'asunto':sal[i].asunto,'contenido':sal[i].contenido};
         bandeja.push(nuevo);
         localStorage.setItem("Bandejaenviados",JSON.stringify(bandeja));
       }
     }
   }
 }
 LOGIN.mostrarcantidadcorreosenlistas();
 LOGIN.cargarcorreosenviados();  
}
} 
,
cargarcorreosborrador:function(numero) {
  debugger;
  users=JSON.parse(localStorage.getItem("Bandejasalida"));
  usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
  var user_html = "";
  if(users===null){
    $('#users_table').html(user_html);
  }
  else{
    for (var i = 0; i < users.length; i++) {
      if(usuacon===users[i].User){
    // add users to the table
    var u = users[i];
    var sumid=i+1;
    user_html = user_html +"<div id="+"c"+i+" onmouseout=LOGIN.ocultarbotones("+i+")"+" onmouseover=LOGIN.mostrarbotones("+i+") onclick=LOGIN.mostrarmensajessalida("+i+")"+"><div>"+"<p>"+"<h4>"+u.para+"</h4>"+"<h4 class=cazul>"+u.asunto+"</h4>"+"<p class=cgris>"+u.contenido+"</p>"
    +"</p>"+"</div>"+"<div id="+i+" class=divbtn ><button onclick=LOGIN.eliminarcorreos("+i+") type=button class='btn btn-default' aria-label=Left Align><span class="+"'glyphicon glyphicon-trash'"+" aria-hidden=true></span></button></div>"+
    "<div onclick=LOGIN.editarcorreos("+sumid+")"+" id="+i+1+" class='divbtn edit'><button type=button class='btn btn-default' aria-label=Left Align><span class="+"'glyphicon glyphicon-pencil'"+" aria-hidden=true></span></button></div></div>";
  }
}
$('#users_table').html(user_html);
}
},editarcorreos:function(numero){
 debugger;
 var campo=numero;
 var correoaedit=new Array();
 sal=JSON.parse(localStorage.getItem("Bandejasalida")); 
 usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
 var bandeja=new Array();
 {
  for (var i = 0; i < sal.length; i++) {
    if(usuacon===sal[i].User&&i+1===campo){
      document.getElementById("emensajepara").value=sal[i].para;
      document.getElementById("easuntomensaje").value=sal[i].asunto;
      document.getElementsByName("econtenidomensaje")[0].value=sal[i].contenido;
      correoaedit.push({'edit':i+1});
      localStorage.setItem("Editado",JSON.stringify(correoaedit));
    }         
  }  $("#exampleModal2").show(); 
}
},
cargarcorreosenviados:function(numero) {
  debugger;
  users=JSON.parse(localStorage.getItem("Bandejaenviados"));
  usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
  debugger;
  var user_html = "";
  if(users===null){
    $('#users_table').html(user_html);
  }
  else{
    for (var i = 0; i < users.length; i++) {
      if(usuacon===users[i].User){
    // add users to the table
    var u = users[i];
    user_html = user_html + "<tr id="+"c"+i+" onclick=LOGIN.mostrarmensajesenviados("+i+")"+" onmouseout=LOGIN.ocultarbotonesentrada("+i+")"+" onmouseover=LOGIN.mostrarbotonesentrada("+i+")"+">"+"<td><div class=divmarcado>"+"<p>"+"<h4>"+u.para+"</h4>"+"<h4>"+u.asunto+"</h4>"+"<p>"+u.contenido+"</p>"
    +"</p>"+"</div>"+"<div  id="+i+" class=divbtn ><button onclick=LOGIN.eliminarcorreosentrada("+i+") type=button class='btn btn-default' aria-label=Left Align><span class="+"'glyphicon glyphicon-trash'"+" aria-hidden=true></span></button></div>"+
    "</td>+</tr>";

  }}
  $('#users_table').html(user_html);
}
},  usuarioconectado:function(){   
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
    $("#exampleModal2").hide(); 
    $('#nban').html("Bandeja entrada");
  },bandejasalida:function()
  {
    LOGIN.cambiarestilob();
  },cambiarestilob:function()
  {debugger;
    var elemento = document.getElementById("bs");
    var cambio=document.getElementById("be");
    var guardaredita=new Array();
    elemento.className = "btn btn-primary bajarunpoco grande color marcado";
    cambio.className="btn btn-primary bajarunpoco grande";
    $('bs').html(elemento);
    $('be').html(cambio);
    $('#nban').html("Bandeja salida");
  }
  ,guardarbandejasalida:function()
  {
   debugger;
   var para=document.getElementById("mensajepara").value;
   var asunto=document.getElementById("asuntomensaje").value;
   var contenido=document.getElementsByName("contenidomensaje")[0].value;
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
,guardarbandejaenviados:function()
{
  debugger;
  var para=document.getElementById("mensajepara").value;
  var asunto=document.getElementById("asuntomensaje").value;
  var contenido=document.getElementsByName("contenidomensaje")[0].value;
  if(LOGIN.validarEmail(para)){
    var datosformulario=document.formredactar;
    if(!LOGIN.camposvacios(datosformulario))
    {
      debugger;
      var bandeja=new Array();
      var band=JSON.parse(localStorage.getItem("Bandejaenviados"));
      var nuevo={'User':usuacon,'para':para,'asunto':asunto,'contenido':contenido};
      if(band===null){
        bandeja.push(nuevo);
        localStorage.setItem("Bandejaenviados",JSON.stringify(bandeja));
      }else{
        band.push(nuevo);  
        localStorage.setItem("Bandejaenviados",JSON.stringify(band));
      }
    }
  }LOGIN.cambiardebandeja();
},enviareditado:function()
{
  debugger;
  var para=document.getElementById("emensajepara").value;
  var asunto=document.getElementById("easuntomensaje").value;
  var contenido=document.getElementsByName("econtenidomensaje")[0].value;
  if(LOGIN.validarEmail(para)){
    var datosformulario=document.formreditar;
    if(!LOGIN.camposvacios(datosformulario))
    {
      debugger;
      var bandeja=new Array();
      var band=JSON.parse(localStorage.getItem("Bandejaenviados"));
      var nuevo={'User':usuacon,'para':para,'asunto':asunto,'contenido':contenido};
      if(band===null){
        bandeja.push(nuevo);
        localStorage.setItem("Bandejaenviados",JSON.stringify(bandeja));
      }else{
        band.push(nuevo);  
        localStorage.setItem("Bandejaenviados",JSON.stringify(band));
      }
     $("#exampleModal2").hide(); 
  LOGIN.cambiardebandeja();
  LOGIN.limpiarcamposeditados();}
  } 
}
,cambiardebandeja:function()
{
  LOGIN.bandejasalida();
  LOGIN.cargarcorreosborrador();
},mostrarcantidadcorreosenlistas:function()
{
  debugger;
  env=JSON.parse(localStorage.getItem("Bandejaenviados"));
  sal=JSON.parse(localStorage.getItem("Bandejasalida")); 
  usuacon = JSON.parse(localStorage.getItem("Enlínea")).conectado;
  if(sal===null){
   document.getElementById("cbs").innerHTML=0;
 }else{
  for (var i = 0; i < sal.length; i++) {
    if(usuacon===sal[i].User){
      document.getElementById("cbs").innerHTML=i+1;
    }
  }
}
if(env===null){
  document.getElementById("cbe").innerHTML=0;
}else{
  for (var i = 0; i < env.length; i++) {
    if(usuacon===env[i].User){
      document.getElementById("cbe").innerHTML=i+1;
    }
  }
}

},
mostrarmensajessalida:function(numero){
  debugger;
  var campo=numero
  sal=JSON.parse(localStorage.getItem("Bandejasalida")); 
  if(sal===null){

  }else{
    for (var i = 0; i < sal.length; i++) {
      if(numero===i){
        var para=sal[i].para;
        var asunto=sal[i].asunto;
        var mensaje=sal[i].contenido;
        document.getElementById("vmensajepara").value=para;
        document.getElementById("vasuntomensaje").value=asunto;
        document.getElementById("vercm").value=mensaje;
   $("#exampleModal3").show(); 
        break;
      }
    }
  }
},mostrarmensajesenviados:function(numero){
  debugger;
  var campo=numero;
  sal=JSON.parse(localStorage.getItem("Bandejaenviados")); 
  if(sal===null){

  }else{
    for (var i = 0; i < sal.length; i++) {
      if(numero===i){
        var para=sal[i].para;
        var asunto=sal[i].asunto;
        var mensaje=sal[i].contenido;
       document.getElementById("vmensajepara").value=para;
        document.getElementById("vasuntomensaje").value=asunto;
        document.getElementById("vercm").value=mensaje;
   $("#exampleModal3").show(); 
         break;
      }
    }
  }
},cerrar:function(){
   $("#exampleModal3").hide(); 
 
 } ,guardareditado:function()
{
  debugger;
  var editado=JSON.parse(localStorage.getItem("Editado")); 
  var band=JSON.parse(localStorage.getItem("Bandejasalida"));
  var para=document.getElementById("emensajepara").value;
  var asunto=document.getElementById("easuntomensaje").value;
 var datosformulario=document.formreditar;
 var edito;
  var guardaredi=new Array();
  var contenido=document.getElementsByName("econtenidomensaje")[0].value;
  for (var i = 0; i < band.length; i++) {
    if(editado===null){

    }else{
        if(!LOGIN.camposvacios(datosformulario))
    {
      if(editado[0].edit===i+1)
      {
        var nuevo={'User':usuacon,'para':para,'asunto':asunto,'contenido':contenido};
        guardaredi.push(nuevo);
        edito=true;
      }else
      {
       var nuevo={'User':usuacon,'para':band[i].para,'asunto':band[i].asunto,'contenido':band[i].contenido};
       guardaredi.push(nuevo);
     }
   if(edito===true){
     localStorage.setItem("Bandejasalida",JSON.stringify(guardaredi));
     localStorage.removeItem("Editado");
     $("#exampleModal2").hide(); 
   LOGIN.limpiarcamposeditados();
   }
 }
}
}
},limpiarcamposeditados:function(){
 document.getElementById("emensajepara").value="";
 document.getElementById("easuntomensaje").value="";
 document.getElementsByName("econtenidomensaje")[0].value="";
},bloquearinicio:function(){
  debugger;
  var entrar=JSON.parse(localStorage.getItem("Enlínea"));
  if(entrar!=null){
    window.open("registrousuarios.html");
  }
}
};

