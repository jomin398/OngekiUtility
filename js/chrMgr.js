function addFileZone() {
      let w = document.querySelector('selection#fileMgr');
      let h = document.createElement('h1');
      h.id = 'fileMgrText';
      h.appendChild(document.createTextNode(Patch[0]));
      let fw = document.createElement('div');
      fw.className = 'upload-box';
      let f = document.createElement('input');
      f.id = 'fileInput';
      f.type = 'file';
      f.accept = 'application/JSON';
      f.required = true;
      fw.appendChild(f);
      let t = document.createElement('div');
      t.innerText = Patch[1];
      w.append(h, fw);
      if (isPC()) {
        h.insertAdjacentElement('afterend', t)
      }
    };
   

function appendChr() {
  let sIndex = DB.nowSelect;
  let toJtoS = (Json) => JSON.stringify(Json);
  let chr = DB.chrCard.userCardList[sIndex];
  let t = document.querySelector('#character-detail > div.content.character-detail > img');
  let br = document.querySelector("#character-detail > div.modal-btn.modal-btn--next");
  let bl = document.querySelector("#character-detail > div.modal-btn.modal-btn--prev");
  let tb = document.querySelector("#character-detail div div.content-title ul");
  let vc = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container div");

  if (!t) {
    let img = document.createElement('img')
    img.className = "character-detail__body";
    t = document.querySelector('#character-detail > div.content.character-detail div.content-title').insertAdjacentElement('afterend', img);
  }
  if (sIndex != chr.length - 1) {
    br.style.opacity = 1;
    if (sIndex != 0) {
      bl.style.opacity = 1;
    }
  } else if (sIndex == chr.length - 1) {
    br.style.opacity = 0.6;
    bl.style.opacity = 1;
  }
  if (sIndex == 0) {
    bl.style.opacity = 0.6;
  }
  document.querySelector('#masthead').dataset.type = "img";
  br.onclick = function() {
    if (sIndex != chr.length - 1) {
      document.querySelector("#character-detail div div.content-title ul").remove();
      if (vc) { vc.remove(); }
      delete document.querySelector("#character-detail > div.content.character-detail").dataset.name;
      sIndex++;
      if (t) { t.remove(); }
      console.log("Button Event", "======== Character Changed ========")
      //initChr(sIndex);
      if (sIndex == chr.length - 1) {
        br.onclick = () => console.log("right button onPressed.");
      }
    }
  };
  bl.onclick = function() {
    if (sIndex == 0) {
      bl.onclick = () => console.log("left button onPressed.");
    }
    if (sIndex > 0 && sIndex != 0) {

      document.querySelector("#character-detail div div.content-title ul").remove();

      if (vc) { vc.remove(); }
      delete document.querySelector("#character-detail > div.content.character-detail").dataset.name;
      if (t) { t.remove(); }
      console.log("Button Event", "======== Character Changed ========")
    }
  }
}

function initChr(sIndex, langN) {
  console.log("selected Index :", sIndex)
  appendChr();
  appendChrNameF(sIndex, !langN ? 0 : langN);
}