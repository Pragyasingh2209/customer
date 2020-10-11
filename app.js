const ratingsEl = document.querySelectorAll(".rating");
const ratings1El = document.querySelectorAll(".rating1");
const sendBtn = document.querySelector("#send");
const panel = document.querySelector("#panel");
const loader = document.querySelector(".loader");

const rateList = [5, 3.5, 2];
const serviceList = [];
var error = document.getElementById("error") 


var rate = rateList[2];
var service = [];

ratings1El.forEach ((a) => {
  serviceList.push (a.id);
});

const config = {
  apiKey: "AIzaSyBh7K1AXVMC8m813vsFzjG_2Mtny7gts94",
  authDomain: "mount-meru.firebaseapp.com",
  databaseURL: "https://mount-meru.firebaseio.com",
  projectId: "mount-meru",
  storageBucket: "mount-meru.appspot.com",
  messagingSenderId: "139465501936",
  appId: "1:139465501936:web:f84a00a896a1c623942635",
  measurementId: "G-LQSXSJ4G18"
};

firebase.initializeApp(config);
const db = firebase.database().ref();

ratingsEl.forEach((el) => {

  el.addEventListener("click", () => {
    ratingsEl.forEach((innerEl) => {
      innerEl.classList.remove("active");
    });

    el.classList.add("active");   
  });
});

ratings1El.forEach((el) => {

  el.addEventListener("click", () => {
 
    el.classList.contains ("active") ?  el.classList.remove("active") :  el.classList.add("active");
  });
});

document.getElementById('send').onclick = function() {
  var checkboxes = document.getElementsByName('rating');
  for (var checkbox of checkboxes) {
    if (checkbox.checked){
      document.body.append(checkbox.value + ' ');

    }
  }
}

sendBtn.addEventListener("click", () => {

  const suggesstions = document.getElementsByClassName ("text-area")[0].value;

  loader.style.display = "none";
  panel.style = {
    filter: "blur(4px)",
    position: "absolute",
    width: "100%",
    height: "100%"
  };
  
  const urlParams = new URLSearchParams(window.location.search);
 
  const cty = urlParams.get('cty');
  const loc = urlParams.get('loc');
  let index = 0;
  
  for (let r of ratingsEl) {
    if (r.classList.contains('active'))
      rate = rateList [index];
      index++;
  }

  index = 0;
console.log (ratings1El)
  for (let r of ratings1El) {
    if (r.classList.contains ('active'))
      service.push (serviceList [index]);
      index ++;    
  }

  let data = {
    rate : rate,
    service : service,
    suggesstions : suggesstions,
    date : Date.now ()
  };

  db.child("feedback/" + cty + '/' + loc).push (data)
  .then ((v) => {  
    
  panel.innerHTML = `
  <i class="fas fa-heart"></i>
  <strong>Thank you</strong>
  <p>We'll use your feedback to improve our services.</p>
`;

  })

  .catch ((err) => {
    error.textContent ('Sorry an error occured while storing your feedback. Kindly try once again or contact admin');
    error.style.color ('red');
  })
  
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}