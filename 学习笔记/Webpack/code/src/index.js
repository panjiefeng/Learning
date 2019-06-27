import _ from 'lodash';
import printMe from './print';
import './style.css';
function component() {
    var element = document.createElement('div');
    var btn = document.createElement("button");
  
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = "Click Me";
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}
let element = component();
document.body.appendChild(element);

console.log(`module.hot`,module.hot);
if(module.hot){
    module.hot.accept("./print.js", function(){
        console.log('Accepting the updated  8888 printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });
}