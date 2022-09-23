const video = document.getElementsById('video');
let vttText = '';
video.addEventListener('ended',e => {
    const vttBlob = new Blob([vttText], {
    type: 'text/plain'
  });
    const url = window.URL.createObjectURL(vttBlob);
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.target="_blank";
    anchor.click();
});
//Element contains subtitle document.getElementsByClassName('vjs-text-track')[0];
const targetNode = document.getElementsByClassName('vjs-text-track')[0];
const track = document.querySelector("track");
const config = { attributes: true, childList: true, subtree: true };
const callback = (mutationList, observer) => {
  let cont = 0;
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      if(cont == 0){
        cont ++;
        vttText += document.getElementsByClassName('vjs-text-track')[0].getInnerHTML();
      }
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);