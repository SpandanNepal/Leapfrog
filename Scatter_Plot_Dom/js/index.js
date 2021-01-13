var points = [
    { x: 10, y: 20 },
    { x: 100, y: 100 },
    { x: 300, y: 200 },
    { x: 390, y: 288 },
    { x: 250, y: 410 },
    { x: 100, y: 260 },
    { x: 400, y: 350 },
    { x: 360, y: 470 },
    { x: 340, y: 450 },
    { x: 150, y: 410 }
];

var points_container = document.getElementById('points_container');
var points_array = [];

for (var i = 0; i < points.length; i++) {
    var point = document.createElement('div');
    point.setAttribute('class', 'scatter_points');
    point.style.top = points[i]['x'] + 'px';
    point.style.left = points[i]['y'] + 'px';
    points_container.appendChild(point);   
} 

points_container.addEventListener('click', function (event)
{
    points_container.removeChild(event.target);
});