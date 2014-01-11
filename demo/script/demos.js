$(function() {
  new Dragdealer('demo-simple-slider');

  var tooltipValue = $('#just-a-slider .tooltip .value').get(0);
  new Dragdealer('just-a-slider', {
    animationCallback: function(x, y) {
      tooltipValue.innerHTML = Math.round(x * 100);
    }
  });
});
