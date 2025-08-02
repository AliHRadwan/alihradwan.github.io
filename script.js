const colors = ['#7f7f7f', '#000000', '#7f7f7f','#ffffff'];
var index = 0;

function changeLogoColor() {
    const logo = document.getElementById('logo');
    logo.style.color = colors[index];

    if (index < (colors.length - 1)) {
        index++;
    } else {
        index = 0;
    }
}

window.onload = function() {
    setInterval(changeLogoColor, 1500);
};