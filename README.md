# EVENT HANDLERS

El sistema notifica activamente cuando realizamos una acción, en los exploradores eso ocurre porque se registran funciones que recogen estos eventos.

> \<p>Este documento es para probar el addEventListener\</p>  
 \<script>  
  window.addEventListener("click", () => {  
 &nbsp;&nbsp; console.log("¿Llamaste?");  
  });  
 \</script>

La variable `window` es un objeto que representa la ventana del explorador, cuando se le aplica el `addEventListener`, se ejecuta el segundo argumento si el evento ocurrido coincide con el tipo de evento del primer argumento.


# EVENTS AND DOM NODES

Todos los eventos se almacenan en el dominio en el que han ocurrido, por ejemplo, si el evento se registra en un botón, el `addEventListener` tendrá que ser llamado a partir de ese botón.

>\<button>Clickeame\</button>
\<p>Ningun manejador de eventos aquí.\</p>
\<script>
  let button = document.querySelector("button");
  button.addEventListener("click", () => {
   &nbsp;&nbsp;console.log("Botón clickeado");
  });
\</script>

También existe otro metodo que permite eliminar los eventos, `removeEventListener`

>\<button>Una vez\</button>
\<script>
  let button = document.querySelector("button");
  function once() {
  &nbsp;&nbsp;console.log("Hecho");
  &nbsp;&nbsp;button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);
\</script>

La función que se le pasa a `removeEventListener` tiene que ser la misma que se le pasa también a `addEventListener`.

# EVENT OBJECTS

Los objetos de evento almacenan información adicional que nos permite averiguar que tipo de acción se realizó, por ejemplo:

>\<button>Clickea con los 3 botones\</button>
\<script>
  let button = document.querySelector("button");
  button.addEventListener("mousedown", event => {
     &nbsp;&nbsp;if (event.button == 0) {
      &nbsp;&nbsp; &nbsp;&nbsp; console.log("Left button");
     &nbsp;&nbsp;} else if (event.button == 1) {
      &nbsp;&nbsp; &nbsp;&nbsp; console.log("Middle button");
     &nbsp;&nbsp;} else if (event.button == 2) {
      &nbsp;&nbsp; &nbsp;&nbsp; console.log("Right button");
    &nbsp;&nbsp;}
  });
\</script>

La información almacenada también difiere por el tipo de objeto también.

# PROPAGACIÓN

Para la mayor parte de tipos de eventos, los manejadores de eventos registrados en nodos con hijos, también recibirán el evento que pasó en el hijo. Por ejemplo si clickeas un botón dentro de un párrafo, el manejador de eventos del párrafo también verá el evento del click.
  
Sin embargo, si el párrafo y el botón tienen manejadores de eventos, el más manejador más especifico(el del botón) irá primero. El evento se propaga hacia afuera, desde el nodo donde pasó hacia su nodo padre y así hasta llegar a la raíz del documento. Finalmente cuando todos han registrado el evento, se van ejecutando de uno en uno.

Esta propagación puede ser detenida con el método `stopPropagation`  
Si clickeas con el botón izquierdo se detendrá la propagación, con el resto de botones se propagará hacia el párrafo.

>\<p>Un párrafo con un  \<button>botón\</button>.\</p>
\<script>
  let para = document.querySelector("p");
  let button = document.querySelector("button");
  para.addEventListener("mousedown", () => {
  &nbsp;&nbsp;console.log("Párrafo");
  });
  button.addEventListener("mousedown", event => {
    &nbsp;&nbsp;console.log("Ratón");
   &nbsp;&nbsp; if (event.button == 0) event.stopPropagation();
  });
\</script>

La mayor parte de los eventos tienen una propiedad de objetivo que dice en que nodo fue originado. Esto se usa para asegurar que no manejas el evento accidentalmente propagado. También se usa para reducir código, en vez de escribir varios manejadores para varios botones, puedes usar un solo manejador para todos.

>\<button>A\</button>
\<button>B\</button>
\<button>C\</button>
\<script>
  document.body.addEventListener("click", event => {
  &nbsp;&nbsp; if (event.target.nodeName == "BUTTON") {
    &nbsp;&nbsp; &nbsp;&nbsp; console.log("Botón", event.target.textContent);
  &nbsp;&nbsp;   }
  });
\</script>

# ACCIONES POR DEFECTO

Muchos eventos tienen acciones por defecto, como por ejemplo cuando clickeas un link, te redirige a la página, esto se puede evitar usando `preventDefault`.

>\<a href="https://developer.mozilla.org/">MDN\</a>
\<script>
  let link = document.querySelector("a");
  link.addEventListener("click", event => {
    &nbsp;&nbsp;event.preventDefault();
  });
\</script>

Este link no te llevará a la página.
`Dependiendo del explorador algunos eventos por defecto no pueden ser interceptados.`

## EVENTOS DE TECLADO

Cuando presionas una tecla el explorador lanza un evento de "keydown", cuando la levantas lanza "keyup"

>\<p>La página se vuelve violeta cuando presionas la tecla v\</p>
\<script>
  window.addEventListener("keydown", event => {
  &nbsp;&nbsp;if (event.key == "v") {
     &nbsp;&nbsp;&nbsp;&nbsp;document.body.style.background = "violet";
   &nbsp;&nbsp; }
  });
  window.addEventListener("keyup", event => {
   &nbsp;&nbsp; if (event.key == "v") {
      &nbsp;&nbsp;&nbsp;&nbsp;document.body.style.background = "";
   &nbsp;&nbsp; }
  });
\</script>

Las combinaciones de teclas como shift, control, alt o cmd en mac también se aplican a los eventos de teclado, no es lo mismo presionar la tecla 1 que presionar shift-1 que devuelve "!"
  
Dichas teclas también tienen su propio evento, `shiftKey`, `ctrlKey`, `altKey`

> \<p>Presiona Control-Espacio\</p>
\<script>
  window.addEventListener("keydown", event => {
  &nbsp;&nbsp;if (event.key == " " && event.ctrlKey) {
  &nbsp;&nbsp;&nbsp;&nbsp;console.log("Presionado");
   &nbsp;&nbsp; }
  });
\</script>



# EVENTOS DE RATÓN

Presionar el botón del ratón lanza el evento `mousedown` y levantarlo `mouseup`
Despues del evento `mouseup`, el evento `click` es lanzado en el nodo que contuvo el `mousedown` y el `mouseup`. Por ejemplo, si presiono dentro de un párrafo y suelto el botón en otro párrafo, el evento click será lanzado en el nodo que contiene ambos párrafos.
  
Si es un doble click, se lanza el evento `dblclick`. Tambien se pueden obtener las coordenadas X e Y del click del evento lanzado por el ratón.
` clientX y clientY contienen las coordenadas en pixeles relativas a la esquina superior izquierda de la ventana
` pageX y pageY contienen las coordenadas en pixeles relativas a la esquina superior izquierda de todo el documento

>\<style>
  body {
   &nbsp;&nbsp; height: 200px;
  &nbsp;&nbsp;  background: beige;
  }
  .dot {
   &nbsp;&nbsp; height: 8px; width: 8px;
   &nbsp;&nbsp; border-radius: 4px; /` rounds corners `/
  &nbsp;&nbsp;  background: blue;
  &nbsp;&nbsp;  position: absolute;
  }
\</style>
\<script>
  window.addEventListener("click", event => {
   &nbsp;&nbsp; let dot = document.createElement("div");
   &nbsp;&nbsp; dot.className = "dot";
  &nbsp;&nbsp;  dot.style.left = (event.pageX - 4) + "px";
  &nbsp;&nbsp;  dot.style.top = (event.pageY - 4) + "px";
   &nbsp;&nbsp; document.body.appendChild(dot);
  });
\</script>

# MOVIMIENTO DEL RATÓN

Cada vez que el ratón se mueve, el evento `mousemove` es lanzado y se puede usar para obtener la posición del ratón.

> \<style>
.trail { 
&nbsp;&nbsp;position: absolute;
&nbsp;&nbsp;height: 6px; width: 6px;
&nbsp;&nbsp;border-radius: 3px;
&nbsp;&nbsp;background: rgb(248, 0, 0);
}
body {
&nbsp;&nbsp;height: 300px;
}
\</style>
\<body>
\<script>
var  dots = [];
for (var  i = 0; i < 24; i++) {
&nbsp;&nbsp;var  node = document.createElement("div");
&nbsp;&nbsp;node.className = "trail";
&nbsp;&nbsp;document.body.appendChild(node);
&nbsp;&nbsp;dots.push(node);
}
var  currentDot = 0;
addEventListener("mousemove", function(event) {
&nbsp;&nbsp;var  dot = dots[currentDot];
&nbsp;&nbsp;dot.style.left = (event.pageX - 3) + "px";
&nbsp;&nbsp;dot.style.top = (event.pageY - 3) + "px";
&nbsp;&nbsp;currentDot = (currentDot + 1) % dots.length;
});
\</script>
\</body>

# EVENTOS TOUCH

Los touchpads y los móviles funcionan diferentes a los ratones, es por esto que se usan diferentes tipos de eventos aunque al principio se intentara falsear esto con eventos de ratón aunque no fuera la mejor manera.
  
Ahora se usan los eventos `touchstart`, `touchmove` y `touchend`. Estos tienen sus propios `clientX`,`clientY`,`pageX` y `pageY`.

Enseña círculos rojos alrededor de donde tocas

>\<style>
  dot { position: absolute; display: block;
  &nbsp;&nbsp;      border: 2px solid red; border-radius: 50px;
   &nbsp;&nbsp;     height: 100px; width: 100px; }
\</style>
\<p>Touch this page\</p>
\<script>
  function update(event) {
 &nbsp;&nbsp;   for (let dot; dot = document.querySelector("dot");) {
 &nbsp;&nbsp;&nbsp;&nbsp;     dot.remove();
 &nbsp;&nbsp;   }
&nbsp;&nbsp;    for (let i = 0; i < event.touches.length; i++) {
&nbsp;&nbsp; &nbsp;&nbsp;     let {pageX, pageY} = event.touches[i];
&nbsp;&nbsp; &nbsp;&nbsp;     let dot = document.createElement("dot");
&nbsp;&nbsp; &nbsp;&nbsp;      dot.style.left = (pageX - 50) + "px";
&nbsp;&nbsp; &nbsp;&nbsp;     dot.style.top = (pageY - 50) + "px";
&nbsp;&nbsp; &nbsp;&nbsp;     document.body.appendChild(dot);
&nbsp;&nbsp;    }
  }
  window.addEventListener("touchstart", update);
  window.addEventListener("touchmove", update);
  window.addEventListener("touchend", update);
\</script>

Normalmente se usa `preventDefault` para evitar los comportamientos por defectos(que suelen incluir mover página).

# EVENTOS DE DESPLAZAMIENTO

Cuando nos desplazamos por la página se lanza un evento de `scroll`. Tiene varios usos, como por ejemplo para saber que está mirando actualmente el usuario, para mostrar una barra de progreso, etc.

El siguiente código muestra una barra de progreso por encima del documento mientras te desplazas.
>\<style>
  #progress {
 &nbsp;&nbsp;   border-bottom: 2px solid blue;
  &nbsp;&nbsp;  width: 0;
  &nbsp;&nbsp;  position: fixed;
  &nbsp;&nbsp;  top: 0; left: 0;
  }
\</style>
\<div id="progress">\</div>
\<script>
  document.body.appendChild(document.createTextNode(
> &nbsp;&nbsp;   "supercalifragilisticexpialidocious ".repeat(1000)));
>
> let bar = document.querySelector("#progress");
  window.addEventListener("scroll", () => {
&nbsp;&nbsp;    let max = document.body.scrollHeight - innerHeight;
&nbsp;&nbsp;    bar.style.width = `${(pageYOffset / max) ` 100}%`;
  });
\</script>

# EVENTO DE ATENCIÓN

Cuando un elemento obtiene atención se lanza el evento `focus` en este y cuando pierde la atención se lanza el evento `blur`. Estos dos eventos no se propagan a los padres.

El siguiente ejemplo muestra el funcionamiento del focus en input.

> \<p>Name: \<input type="text" data-help="Tu nombre">\</p>
\<p>Age: \<input type="text" data-help="Tus años">\</p>
\<p id="help">\</p>

\<script>
  let help = document.querySelector("#help");
  let fields = document.querySelectorAll("input");
  for (let field of Array.from(fields)) {
&nbsp;&nbsp;    field.addEventListener("focus", event => {
  &nbsp;&nbsp;&nbsp;&nbsp;    let text = event.target.getAttribute("data-help");
 &nbsp;&nbsp;&nbsp;&nbsp;     help.textContent = text;
  &nbsp;&nbsp;  });
&nbsp;&nbsp;    field.addEventListener("blur", event => {
  &nbsp;&nbsp; &nbsp;&nbsp;   help.textContent = "";
&nbsp;&nbsp;    });
  }
\</script>



# EVENTO DE CARGA

Cuando una página se carga, se lanza el evento `load` en la ventana y en los objetos del cuerpo del documento. Esto se usa normalmente para organizar inicializaciones.

Y cuando la página se cierra o se sale de ella se lanza el evento `beforeunload`, el objetivo principal es evitar que el usuario se salga sin perder trabajo no guardado. Si previenes el comportamiento por defecto y estableces el `returnValue` a un string, el explorador mostrará al usuario un texto preguntando si realmente quieren abandonar la página, aunque esta función se está dejando de permitir porque hay muchas paginas maliciosas que lo usan para confundir.

# EVENTOS Y EL BUCLE DE EVENTOS

Los eventos tienen que esperar a realizarse al que el resto de scripts que se están ejecutando se acaben. Esto puede ralentizar mucho ya que puede que hayan procesos muy grandes. Es por esto que los exploradores proporcionan algo llamado `web workers`. Un worker es un proceso de JavaScript que se ejecuta a la vez que el script principal.

Por ejemplo, almacenamos en *code/worker.js* este código.
>addEventListener("message", event => {
 &nbsp;&nbsp; postMessage(event.data ` event.data);
});

Para evitar tener varios hilos tocando los mismos datos, los workers no comparten ningún dato con el script principal, además debes comunicarte con ellos por mensajes.
Este código carga un wroker, le manda unos mensajes y muestra la salida.

> let squareWorker = new Worker("code/worker.js");
squareWorker.addEventListener("message", event => {
 &nbsp;&nbsp; console.log("El worker respondió", event.data);
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);

# TEMPORIZADORES

Los temporizadores se pueden cancelar. Esto se hace almacenando el temporizador en una variable y despues llamando a `clearTimeout`

>let bombTimer = setTimeout(() => {
  &nbsp;&nbsp;console.log("BOOM!");
}, 500);
>
>if (Math.random() < 0.5) {
  &nbsp;&nbsp;console.log("Defused.");
  &nbsp;&nbsp;clearTimeout(bombTimer);
}

# REBOTE

Algunos tipos de eventos tienen el potencial de ser lanzados muchas veces seguidas sin parar. Cuando se manejan los eventos se debe tener cuidado de no hacer nada que consuma mucho tiempo.
Si se necesita hacer algo que no es trivial en un manejador de eventos puedes usar `setTimeout` para asegurarte que no lo haces todo el rato. Esto es lo que se considera rebotar el evento.

Por ejemplo:

> \<textarea>Escribe algo\</textarea>
\<script>
  let textarea = document.querySelector("textarea");
  let timeout;
  textarea.addEventListener("input", () => {
   &nbsp;&nbsp; clearTimeout(timeout);
   &nbsp;&nbsp; timeout = setTimeout(() => console.log("Recibido"), 500);
  });
\</script>

Esto deja al usuario escribir, si en 500 milisegundos no ha recibido un evento desde el último input mostramos por pantalla un mensaje de que se recibió el mensaje, si no añadieramos el `setTimeout` mostrariamos el mensaje con cada input y acabaría siendo pesado para nuestra página y ralentizarían otros porcesos.