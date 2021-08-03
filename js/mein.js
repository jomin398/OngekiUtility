const SitePatch = {
  kor: [
        "UserCard.json 파일을 업로드 해주세요.",
        "드래그 드롭가능",
        "카드 파일 뷰어",
        ["유저 카드확인 : ", "UserCard.json 파일이 아닙니다.", "(열린 애러창은 5초후 사라집니다.)"],
        ["시작", "결정", "확인", "네", "아니요"],
        [
          ["디버그 모드에 진입하시겠습니까?", "진입하게되면 유저카드는 가상카드인 DevCard로 기본설정됩니다."],
          ["디버그 모드에 진입하였습니다.", "가상카드 (DevCard)가 읽혀졌습니다."],
          ["디버그 모드를 활성시키지 않으려면,", "\"시작\" 버튼을 누르기전에 이미지를 클릭하지 마세요."]
        ],
        [
          "경고",
          "본 홈페이지 이하 사이트는 공유목적을 위해 사용되어야되며,",
          "컨텐츠의 저작권은 각각 컨텐츠들의 주인에게 있습니다.",
          "크래이티브 커먼즈 라이센스 이하 CCL을 따르기에",
          "컨텐츠의 저작권에 따라서 리버스엔지니어링, 무단 디컴파일, 재배포는 절대금지 합니다."
        ]
      ],
  eng: [
        "plz...upload UserCard.json file",
        "(you can drop-down file here)",
        "Card file viewer",
        ["UserCard Check : ", "invalid UserCatd.json", "(will be closed with 5sec.)"],
        ["Start", "Conform", "Conform", "Yes", "No"],
        [
          ["Are you Sure to entering dev mode?", "by entering it, User card is will be changed to DevCard"],
          ["Entered Dev mode.", "simulated User Card, now dev mode is on"],
          ["To Avoiding dev mode,", "do not touch image before press \"START\" btn."]
        ],
        [
          "WARNING",
          "THIS WEBSITE(AS CALL AS SITE) SHALL BE USED FOR SHARING PURPOSES.",
          "THE COPYRIGHT OF THE CONTENT BELONGS TO THE OWNER OF THE CONTENT.",
          "FOLLOW THE COPYRIGHT OF CONTENT BELONGS THE CCL, NAMED AS CREATIVE COMMONS LICENSE",
          "REVERSE ENGINEERING, DECOMPILE, REDISTRIBUTION IS ABSOLUTELY PROHIBITED."
        ]
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
  document.querySelector('zero-md').onclick = () => {
    console.log("System :", "User tryout to entering Dev Mode.")
    let input = confirm(Patch[5][0].join("\n"));
    if (input == true) {
      window.isDebug = true;
      console.log("Developer Mode :", "initiated. ")
      alert(Patch[5][1].join("\n"))
    } else {
      alert(Patch[5][2].join("\n"))
      location.reload();
    }
  };
};

function BiosInit() {
  Patch = !isKor ? SitePatch.eng : SitePatch.kor;
  document.body.style.backgroundColor = 'black';
  //for black screen
  //UserInit()

  let warn = document.createElement('div');
  warn.className = 'warn fade-in';
  let h1 = document.createElement('h1');
  h1.innerText = Patch[6][0];
  let text = document.createElement('div');
  text.innerText = Patch[6].slice(1).join('\n');
  warn.append(h1,text);
  setTimeout(()=>{
    warn.classList.remove("fade-in");
    warn.classList.add("fade-out");
    setTimeout(() => {
      warn.remove();
      document.body.style.backgroundColor = 'initial';
      logoInit()
    }, 3100)
  },3100);
  document.body.insertAdjacentElement('afterbegin', warn)
}

function logoInit(){
  let b= document.createElement('div');
  b.id ="init-logo";
  let im = document.createElement('img');
  im.src = "./images/SEGA_logo.png";
  im.id="init-logo";
  b.appendChild(im);
  document.body.insertAdjacentElement('afterbegin', b);
  setTimeout(()=>{
    b.style.animation ="fadeout 1s";
    setTimeout(()=>{
      b.remove();
      UserInit();
    },1000)
  },3000)
}


function UserInit() {
  upload = document.getElementById('fileInput');
  let titleScr = document.createElement("zero-md");

  titleScr.setAttribute('src', 'README.md');
  document.body.insertAdjacentElement('beforeend', titleScr);
  acadebtn(() => {
    addFileZone();
    if (upload && !isDebug) {
      upload.addEventListener('change', onFileChange);
    } else if (isDebug) {
      renderJson();
    }
  });
}