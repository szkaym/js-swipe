new swipeEvent();
document.addEventListener('drag', function(e) {
    console.log(e);
});

document.addEventListener('swipe', function(e) {
    console.log(e);
});