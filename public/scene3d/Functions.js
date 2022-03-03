function scrollUpdate(){
    if(c.scrollDist<15&&c.scrollPos>0){
        c.scrollDist += c.scrollPos;
      }else if(c.scrollDist>-100&&c.scrollPos<0){
        c.scrollDist += c.scrollPos;
      }
    c.scrollPos *= 0.9;
    camera.position.z = c.scrollDist;
}
function onMouseWheel(event) {
 c.scrollPos = -0.001 * event.deltaY;
}