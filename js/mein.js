const SitePatch = {
  kor: [
        "UserCard.json 파일을 업로드 해주세요.",
        "드래그 드롭가능",
        "카드 파일 뷰어",
        ["유저 카드확인 : ", "UserCard.json 파일이 아닙니다.", "(열린 애러창은 5초후 사라집니다.)"],
        ["시작", "결정", "확인", "네", "아니요"]
      ],
  eng: [
        "plz...upload UserCard.json file",
        "(you can drop-down file here)",
        "Card file viewer",
        ["UserCard Check : ", "invalid UserCatd.json", "(will be closed with 5sec.)"],
        ["Start", "Conform", "Conform", "Yes", "No"]
      ]
};

function errorThrow(str, focus, fn, imp) {
  let errDisp = document.querySelector("#errorDisplay");
  if (errDisp) {
    errDisp.remove();
  }
  errDisp = document.createElement('div');
  errDisp.id = "errorDisplay";
  errDisp.className = 'balloon';
  errDisp.appendChild(document.createTextNode(str));
  errDisp.addEventListener('click', () => errDisp.remove());
  if (!focus) {
    errDisp.append(document.createElement('br'), document.createTextNode(Patch[3][2]));
    setTimeout(() => { if (errDisp) { errDisp.remove() } }, 5000);
  }
  upload.parentElement.appendChild(errDisp);
  if (fn) { fn() };
  if (imp) { console.error(str) };
};

function getData() {
  upload = document.getElementById('fileInput');

  const isCard = (n) => n.toLowerCase().includes("card");
  let r = null;
  if (!isDebug) {
    if (isCard(upload.files[0].name)) {
      console.log("card check :", true);
      console.log("renderJson :", "read and parsing....")
      try {
        r = JSON.parse(FS.result); // Parse the result into an object
      } catch (e) {
        errorThrow(e, true, () => { upload.value = null }, true);
      }
    } else {
      console.log("card check :", isCard(upload.files[0].name));
      errorThrow(Patch[3][0] + new ReferenceError(Patch[3][1]), false, () => { upload.value = null })
    }
  } else {
    console.log("card check :", true);
    r = devCard;
    console.log("renderJson :", "read and parsing....")
  }
  console.log(r);
  DB.chrCard = r;
}

function renderJson() {
  upload = document.getElementById('fileInput');

  const parent = upload.parentElement;
  const titleDisp = document.getElementById('fileMgrText');
  let tree = null;
  let res = null;
  console.log("card check :", "Check Out UserCard.json");
  getData();
  res = DB.chrCard;

  //rendering...
  if (res) {
    console.log("renderJson :", "rendering....")
    titleDisp.innerText = Patch[2];
    upload.remove();
    parent.style.overflow = 'auto';
    tree = document.createElement('div');
    tree.id = 'jsonTree';
    parent.appendChild(tree);
    $(function() {
      $('#jsonTree').jsonViewer(res);
    });
    CardVisual();
  }
};

function CardVisual() {
  let chrs = DB.chrCard;
  DB.nowSelect = 0;
  console.log(chrs.length);
  document.querySelector("#fileMgr .upload-box").style.height = "10%";
  disp = document.getElementById('masthead')
  disp.style.display = 'block';
  appendChr();
}

function onFileChange() {
  upload = document.getElementById('fileInput');
  // Make sure a file was selected
  if (upload.files.length > 0) {
    FS.readAsText(upload.files[0]); // Read the uploaded file
    // This event listener will happen when the reader has read the file
    FS.addEventListener('load', renderJson);
  }
};

function acadebtn(fn) {
  let btnw = document.createElement('div');
  btnw.className = 'ShowPageBtnWrapper';
  let ShowPageBtn = document.createElement('button');
  ShowPageBtn.className = 'push--skeuo';
  ShowPageBtn.innerText = Patch[4][0]; //start
  ShowPageBtn.onclick = () => {
    setTimeout(() => {
      document.querySelector('zero-md').remove();
      ShowPageBtn.remove();
      fn();
    }, 1500);
  }
  btnw.appendChild(ShowPageBtn);
  document.querySelector('zero-md').insertAdjacentElement('afterend', btnw)
};

function UserInit() {
  Patch = !isKor ? SitePatch.eng : SitePatch.kor;
  upload = document.getElementById('fileInput');
  acadebtn(() => {
    addFileZone();
    if (upload && !isDebug) {
      upload.addEventListener('change', onFileChange);
    } else if (isDebug) {
      renderJson();
    }
  });
}