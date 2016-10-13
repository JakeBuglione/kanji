import { Template } from 'meteor/templating';
import './canvas.html';
// Functions for events
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
 function addClick(x,y,dragging)
 {
     
        clickX.push(x);
        console.log('click');
        clickY.push(y);
        clickDrag.push(dragging);
};
   function redraw()
   {
        //clear the canvas
        context.clearRect(0,0,canvas.width,canvas.height);
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth - 5;
        
        for(var i=0; i<clickX.length; i++){
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            }else{
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            context.lineTo(clickX[i],clickY[i]);
            context.closePath();
            context.stroke();
            }
        };
Template.canvas.onCreated(function(){

});
Template.canvas.onRendered(function () {
    canvas = document.getElementById('kanjiCanvas');
    context = canvas.getContext('2d');

    //context.fillStyle = 'green';
    //context.fillRect(10,10,200,200);
});

Template.canvas.helpers({
});

Template.canvas.events({
    'mousedown canvas'(event){
        var mouseX = event.pageX - canvas.offsetLeft;
        var mouseY = event.pageY - canvas.offsetTop;
        console.log(mouseY);
        
        paint = true;
        
        addClick(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, true);
        console.log(canvas.offsetLeft);
        redraw();
    //context.fillStyle = 'green';
    //context.fillRect(10,10,200,200);
    //console.log(canvas.offsetLeft);
    },
    'mousemove canvas'(event){
        if(paint){
            addClick(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop,false);
            redraw();
        }
    },
    'mouseup canvas'(){
        paint = false;
    },
    'mouseleave canvas'(){
        paint = false;
    },


});