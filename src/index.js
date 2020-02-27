import { series } from "async-es";

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

let p = document.querySelector('p');

series(
  [
     cb => loadScript('script-1.js', cb),
     cb => loadScript('script-2.js', cb),
     cb => loadScript('script-3.js', cb)
   ],
   (err, results) => p.innerHTML = results.map(s => s.src).join("<br/>")
);
