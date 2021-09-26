function isVisibleInViewport(elem) {
      var y = elem.offsetTop;
      var height = elem.offsetHeight;
      while ( elem = elem.offsetParent )
          y += elem.offsetTop;
      var maxHeight = y + height;
      var isVisible = ( y < ( window.pageYOffset + window.innerHeight ) ) && ( maxHeight >= window.pageYOffset );
      return isVisible; 
  }

// document.addEventListener('DOMContentLoaded', () => {
//   this.setInterval(() => {
//     const balloon = document.createElement('div');
//     balloon.setAttribute("class", "balloon")
//     balloon.style.left = Math.random() * 99 + "%";
//     document.querySelector('body').appendChild(balloon);

//     for(let i = 0; i<document.getElementsByClassName('balloon').length; i++) {
//       if (!this.isVisibleInViewport(document.getElementsByClassName('balloon')[i])) {
//         document.getElementsByClassName('balloon')[i].remove();
//       }
//     }
//   }, 5000);
// })