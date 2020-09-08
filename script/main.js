const buttonMenu = document.querySelector('.button-menu'),
      itemsMenu  = document.querySelectorAll('.item'),
      male = document.querySelectorAll(".calculator__inner-gender input"),
      height = document.querySelector('.calculator__inner-height input'),
      weight = document.querySelector('.calculator__inner-weight input'),
      age = document.querySelector('.calculator__inner-age input'),
      btnSum = document.querySelector('.calculator__inner-button button'),
      result = document.querySelector('.calculator__inner-result'),
      select = document.querySelectorAll('.calculator__inner-select option'),
      infoSafe = document.querySelector('.info-safe'),
      infoFast = document.querySelector('.info-fast'),
      infoExtra = document.querySelector('.info-extra'),
      tabs = document.querySelectorAll('.slider__tab'),
      tabsParent = document.querySelector('.slider__tabs'),
      tabsContent = document.querySelectorAll('.slider__item');

buttonMenu.addEventListener('click', event => {
   let target = event.target;

   if (target.classList.contains('btn-active')) {
      target.classList.remove('btn-active');
      target.classList.add('btn-nonactive');

      itemsMenu.forEach(item => {
         item.classList.add('menu-nonactive');
         item.classList.remove('menu-active');
      });

   } else {
      target.classList.add('btn-active');
      target.classList.remove('btn-nonactive');

      itemsMenu.forEach(item => {
         item.classList.add('menu-active');
         item.classList.remove('menu-nonactive');
      });
   }
});

male.forEach(item => {
   item.addEventListener('click', event => {
      if (event.target.dataset.type === 'male') {
         male[1].checked = false;
      } else {
         male[0].checked = false;
      }
   });
});

btnSum.addEventListener('click', () => {
   let wgt = +weight.value;
   let hgt = +height.value;
   let agt = +age.value;
   let activity;
   let gnd;

   if (male[0].checked === true && male[1].checked === false) {
      gnd = 5;
   } else {
      gnd = -161;
   }

   select.forEach((item, index) => {
      if(item.selected === true) {
         activity =  select[index].value;
         }
      });

   let x = ((10 * wgt) + (6.25 * hgt) - (5 * agt) + gnd) * activity;
   
   if (typeof(x) !== 'number' || isNaN(x)) {
      alert('Вы ввели данные некорректно.');
      return;
   } else {
      result.innerText = '';
      let res = document.createElement('span');
      res.innerHTML = x;
      result.append(`Ваша суточная норма калорий ${x.toFixed(1)}`);
      info(x.toFixed(1));
   }
});

function info (num) {
   infoSafe.innerText = '';
   infoFast.innerText = '';
   infoExtra.innerText = '';

   let safemodKk = Math.floor(num * 0.85),
       fastmodKk = Math.floor(num * 0.75),
       extramodKk = Math.floor(num * 0.6);

   let safemodKkWeek = (num - safemodKk) * 0.00013 * 7,
       fastmodKkWeek = (num - fastmodKk) * 0.00013 * 7,
       extramodKkWeek = (num - extramodKk) * 0.00013 * 7;
      
   infoSafe.append(`Для похудения в безопасном режиме уменьшите норму 
                   потребления до ${safemodKk} ккал. Через неделю вы 
                   похудеете на ${safemodKkWeek.toFixed(2)} кг, а через месяц 
                   на ${(safemodKkWeek * 4.3).toFixed(2)} кг`);
   infoFast.append(`Для похудения в быстром режиме уменьшите норму 
                   потребления до ${fastmodKk} ккал. Через неделю вы 
                   похудеете на ${fastmodKkWeek.toFixed(2)} кг, а через месяц 
                   на ${(fastmodKkWeek * 4.3).toFixed(2)} кг`);
   infoExtra.append(`Для похудения в экстремальном режиме уменьшите норму 
                   потребления до ${extramodKk} ккал. Через неделю вы 
                   похудеете на ${extramodKkWeek.toFixed(2)} кг, а через месяц 
                   на ${(extramodKkWeek * 4.3).toFixed(2)} кг`);
}

function hide() {
   tabs.forEach( item => {
      item.classList.remove('active');
   });

   tabsContent.forEach( item => {
      item.classList.remove('active-content');
      item.classList.add('nonactive-content');
   });
}

function show(i = 0) {
   tabs[i].classList.add('active');
   tabsContent[i].classList.remove('nonactive-content');
   tabsContent[i].classList.add('active-content');
}

hide();
show();

let countTab = 0;

setInterval(() => {
   countTab++;
   if (countTab > 3) {
      countTab = 0;
   }

   hide();
   show(countTab);
}, 3000);

tabsParent.addEventListener('click', event => {
   let target = event.target;

   if (target.classList.contains('slider__tab')) {
      tabs.forEach((item,index) => {
         if(item == target) {
            countTab = index;
            hide();
            show(index);
         }
      });
   }
});

// modal
const modal = document.querySelectorAll('.modal'),
      btnsModal = document.querySelectorAll('.computation__wrapper-item'),
      btnClose = document.querySelectorAll('.btn__close');

function openModal(item) {
   item.classList.add('modal__active');
   item.classList.remove('modal__nonactive');
   document.body.style.overflow = 'hidden';
}

function closeModal(item) {
   item.classList.remove('modal__active');
   item.classList.add('modal__nonactive');
   document.body.style.overflow = 'auto';
}

btnsModal.forEach(item => {
   item.addEventListener('click', (e) => {
      let type = e.target.parentElement.dataset.type;
   
      modal.forEach(item  => {
         if(item.dataset.type == type) {
            openModal(item);
         }
      });
   });
});

btnClose.forEach(item => {
   item.addEventListener('click', (e) => {
      let type = e.target.dataset.type;

      modal.forEach(item => {
         if (item.dataset.type == type) {
            closeModal(item);
         }
      });
   });
});

modal.forEach(item => {
   item.addEventListener('click', (e) => {
      if (e.target == item) {
         closeModal(item);
      }
   });
});

document.addEventListener('keydown', (e) => {
   if(e.code === 'Escape') {
      modal.forEach(item => {
         closeModal(item);
      });
   }
});

// accumulator

const itemsAccum = document.querySelectorAll('.modal__items'),
      wrapperAcum = document.querySelector('.accum__wrapper'),
      accCcal = document.querySelector('.accum__all-ccal'),
      accProt = document.querySelector('.accum__all-proteins'),
      accFats = document.querySelector('.accum__all-fats'),
      accCarb = document.querySelector('.accum__all-carbo');
let closeBtn;
      

function resetAllCcal(item, value) {
   item.innerText = '';
   item.append(value);
}
function iterator(i) {
   let counter = 0;
   i.forEach(item => {
      counter += +item.textContent;
   });
   return counter.toFixed(1);
}   

function accum(...arr) {
   let ccal = 0,
      prot = 0,
      fats = 0,
      carb = 0;

   for (let i = 0; arr.length > i; i++) {
      switch (i) {
         case 0:
            ccal = iterator(arr[i]);
            resetAllCcal(accCcal, ccal);
            break;

         case 1:
            prot = iterator(arr[i]);
            resetAllCcal(accProt, prot);
            break;

         case 2:
            fats = iterator(arr[i]);
            resetAllCcal(accFats, fats);
            break;

         case 3:
            carb = iterator(arr[i]);
            resetAllCcal(accCarb, carb);
            break;
         default:
            break;
      }
   }
}

function Extract(name, ccal, proteins, fats, carbo ) {
   this.name = name;
   this.ccal = ccal;
   this.proteins = proteins;
   this.fats = fats;
   this.carbo = carbo;
   this.show = function (item) {
      let div = document.createElement('div');
      div.innerHTML =`<div class="accum__col">
               <div class="accum__item-name accum__item">${this.name}</div>
               <div class="accum__item-ccal accum__item">${this.ccal}</div>
               <div class="accum__item-proteins accum__item">${this.proteins}</div>
               <div class="accum__item-fats accum__item">${this.fats}</div>
               <div class="accum__item-carbo accum__item">${this.carbo}</div>
               <div class="accum__item-delete accum__item"><span>x</span></div>
               </div>`;
      item.append(div);
   };
}

itemsAccum.forEach(item => {
   item.addEventListener('click', (e) => {
      const itemInfo = e.target.parentElement.children[2],
            name = e.target.parentElement.children[1].textContent,       
            ccal = +itemInfo.querySelector('.modal__item-ccal span').textContent,
            proteins = +itemInfo.querySelector('.modal__item-proteins span').textContent,
            fats = +itemInfo.querySelector('.modal__item-fats span').textContent,
            carbo = +itemInfo.querySelector('.modal__item-carbohydrates span').textContent;
      
            let obj = new Extract(name, ccal, proteins, fats, carbo);
            obj.show(wrapperAcum);
      
            closeBtn = document.querySelectorAll('.accum__item-delete span');

            closeBtn.forEach(item => {
               item.addEventListener('click', (e) => {
                  e.target.parentElement.parentElement.remove();
                  let
                     allCcal = document.querySelectorAll('.accum__item-ccal'),
                     allProt = document.querySelectorAll('.accum__item-proteins'),
                     allFats = document.querySelectorAll('.accum__item-fats'),
                     allCarb = document.querySelectorAll('.accum__item-carbo');

                  accum(allCcal, allProt, allFats, allCarb);
               });
            });

            let
               allCcal = document.querySelectorAll('.accum__item-ccal'),
               allProt = document.querySelectorAll('.accum__item-proteins'),
               allFats = document.querySelectorAll('.accum__item-fats'),
               allCarb = document.querySelectorAll('.accum__item-carbo');
            
         accum(allCcal, allProt, allFats, allCarb);
   });
});





