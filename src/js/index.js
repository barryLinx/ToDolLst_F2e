import '../scss/styles.scss'
//引入fontawesome樣式
import { library } from '@fortawesome/fontawesome';
import { faPencilAlt, faStar, faPlus } from '@fortawesome/fontawesome-free-solid';
import { faFile, faCommentDots, faCalendarAlt } from '@fortawesome/fontawesome-free-regular';

library.add(faPlus, faPencilAlt, faFile, faStar, faCommentDots, faCalendarAlt)


const addTaskBtn = document.querySelector('#addTaskBtn');
const editPencilBtn = document.querySelector('.edit-pencil-btn');
const editBtn = document.querySelector('.editBtn');
const editContent = document.querySelector('.edit-content');
const navLinkDom = [...document.querySelectorAll('.nav-link')];
const fromCancel = document.querySelector('.from-cancel');
const fromAdd = document.querySelector('.from-add')

const inputCheckDom = [...document.querySelectorAll('.hascheck')];
let alldata = [];


function delTitleDom() {
  // let str = ` <del class="text-gray-200">
  //          <span class="ff-Rob fs-3 todo-title">
  //             Type Something Here…  
  //          </span>
  //       </del>`;
  let title = document.createTextNode("New Something Here… ");
  let del_dom = document.createElement('del');
  del_dom.classList.add('text-gray-200');
  let span_dom = document.createElement('span');
  span_dom.classList.add('ff-Rob', 'fs-3', 'todo-title');
  span_dom.appendChild(title);
  del_dom.appendChild(span_dom);
  console.log(del_dom);
  return del_dom;
}

function spanTitleDom(){
  let title = document.createTextNode('Type Something Here…');
  let sapn = document.createElement('span');
  sapn.classList.add('ff-Rob','fs-3', 'todo-title');
  sapn.appendChild(title);
  return sapn;
}

function inputcheck_change() {
  inputCheckDom.forEach(el => {
    el.addEventListener('change', (event) => {
      //el.insertAdjacentHTML("afterend", delHtml());
      //console.log(el.parentNode);
      console.log(event.currentTarget.checked);
      let elParentNode = el.parentNode;
      let elNextEleSib = el.nextElementSibling;
      //console.log(el.nextElementSibling);
      if(event.currentTarget.checked){
        elParentNode.replaceChild(delTitleDom(),elNextEleSib);
      }else{
        elParentNode.replaceChild(spanTitleDom(),elNextEleSib); 
      }         
    })
  })
}



function hasActive(element) {
  console.log("element", element);
  navLinkDom.forEach(n => {
    if (n.parentElement.classList.contains('active')) {
      n.parentElement.classList.remove('active');
    }
  })
  element.classList.add('active');

}


function filter_Event(param = '') {
  alldata.filter((val) => {
    return val.status == param
  })
}


//display products UI
class UI {
  // editUI(dataObj) {
  //   const editSection = document.querySelector('.edit');
  //   let str = `<div class="w-50 d-flex px-4 py-3 bg-light">
  //   <div class="me-auto d-inline-block">
  //     <input type="checkbox" class="w-6 h-6 me-3">
  //     <span class="ff-Rob fs-3">Type Something Here…</span>
  //   </div>
  //   <div class="d-inline-block fs-3">
  //     <a href="" class="markStar text-black text-decoration-no">
  //       <i class="far fa-star"></i>
  //     </a>
  //     <a href="" class="edit-pencil-btn text-primary text-decoration-no">
  //       <i class="fas fa-pencil-alt"></i>
  //     </a>
  //   </div>
  // </div>`;
  //   editSection.innerHTML = str;
  // }
  // editContent(dataObj) {
  //   const editcontent = document.querySelector('.edit-content');

  //   let str = `<div class="d-flex flex-column w-50">
  //   <form class="needvail bg-light p-5">
  //     <div class="form-control mb-5">
  //       <div class="ms-4">
  //         <label for="yeardate" class="ps-3">
  //           <span><i class="far fa-calendar-alt fs-4"></i>
  //           </span>
  //           <span class="ff-Rob fs-4 ps-1">Deadline</span>
  //         </label>
  //       </div>
  //       <div class="ps-5 ms-4">
  //         <input id="yeardate" class="border-0 py-1 px-2" placeholder="yyyy/mm/dd">
  //         <input id="timestamp" class="border-0 py-1 px-2" placeholder="hh:mm">
  //       </div>
  //     </div>
  //     <div class="form-control mb-5">
  //       <div class="ms-4">
  //         <label for="fupload" class="ps-3">
  //           <span> <i class="far fa-file fs-4"></i></span>
  //           <span class="ms-2 ff-Rob fs-4">File</span>
  //         </label>
  //       </div>
  //       <div class="ps-5 ms-4 d-flex">
  //         <div class="me-3">
  //           <p class="m-0 fs-6 ff-Rob">
  //             20180514.zip
  //           </p>
  //           <p class="m-0 text-dark ff-Rob">uploaded yesterday</p>
  //         </div>
  //         <label for="fupload" class="bg-gray px-3 py-2 c-p d-flex align-items-center">
  //           <i class="fas fa-plus fs-5 text-white"></i>
  //         </label>
  //         <input id="fupload" type="file" hidden>
  //       </div>
  //     </div>

  //     <div class="form-control mb-5">
  //       <div class="ms-4">
  //         <label for="message" class="ps-3">
  //           <span>
  //             <i class="far fa-comment-dots fs-4"></i>
  //           </span>
  //           <span class="ms-2 ff-Rob fs-4">Comment</span>
  //         </label>
  //       </div>
  //       <div class="ps-5 ms-4">
  //         <textarea id="message" rows="5" cols="42"></textarea>
  //       </div>
  //     </div>
  //   </form>
  //   <div class="footer d-flex justify-content-center">
  //     <button class="w-50 fs-3 p-3 border-0 bg-white text-danger ff-Rob">
  //       <i class="fas fa-times me-3"></i>
  //       Cancel
  //     </button>
  //     <button class="w-50 fs-3 p-3 border-0 bg-primary text-white ff-Rob">
  //       <i class="fas fa-plus me-3"></i>
  //       Add Task
  //     </button>
  //   </div>
  // </div>`;

  //   editcontent.innerHTML = str;
  // }
  addTaskBtn_hide_UI() {
    //let style = getComputedStyle(addTaskBtn, 'display');
    addTaskBtn.classList.add('d-none');
  }
  addTaskBtn_show_UI() {
    addTaskBtn.classList.remove('d-none');
  }
  editBtn_show_UI() {
    editBtn.classList.remove('d-none')
  }
  editBtn_hide_UI() {
    editBtn.classList.add('d-none')
  }

  editContent_show_UI() {
    editContent.classList.remove('d-none')
  }
  editContent_hide_UI() {
    editContent.classList.add('d-none')
  }
  navLink_click_UI() {
    //let hasActive=true;
    navLinkDom.forEach(n => {
      let status = n.dataset.st;
      n.addEventListener('click', (event) => {
        hasActive(n.parentElement)
        //console.log(hasActive(n.parentElement));

        //console.log(status);
        event.preventDefault();
        switch (status) {
          case 'Progress':
            filter_Event('Progress')
            break;
          case 'Completed':
            filter_Event('Completed')
            break;
          default:
            filter_Event();
            break;
        }
      })
    })
  }

  listUI() {

  }

  setup() {
    this.navLink_click_UI();
    addTaskBtn.addEventListener('click', () => {
      this.addTaskBtn_hide_UI();
      this.editBtn_show_UI();
      this.editContent_show_UI();
    })

    fromCancel.addEventListener('click', () => {
      this.addTaskBtn_show_UI();
      this.editBtn_hide_UI();
      this.editContent_hide_UI();
    })
    // fromAdd.addEventListener('click',()=>{
    //   // add  Comment   File Deadline

    // })
  }
}

//local storage
class Storage {
  static saveTask(task) {
    localStorage.setItem("task", JSON.stringify(task));
  }
  static getTask(id) {
    let tasks = JSON.parse(localStorage.getItem('task'));
    return tasks.find(t => t.id === id)
  }

}


/**
 * init
 */
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.setup();
  //navLink_click();
  inputcheck_change();
})






// <i class="fas fa-pencil-alt"></i>
// <i class="far fa-file"></i>
// <i class="far fa-comment-dots"></i>
// <i class="far fa-calendar-alt"></i>
// <i class="far fa-star"></i>
// <i class="fas fa-star"></i>