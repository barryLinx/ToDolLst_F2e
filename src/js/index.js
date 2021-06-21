import '../scss/styles.scss'
//引入fontawesome樣式
import { library } from '@fortawesome/fontawesome';
import { faPencilAlt, faStar, faPlus } from '@fortawesome/fontawesome-free-solid';
import { faFile, faCommentDots, faCalendarAlt } from '@fortawesome/fontawesome-free-regular';

library.add(faPlus, faPencilAlt, faFile, faStar, faCommentDots, faCalendarAlt)

const addInput = document.querySelector('.addInput');
const addTaskBtn = document.querySelector('#addTaskBtn');

const editCheck = document.querySelector('.editCheck');
const editTitle = document.querySelector('.editTitle');
const editPencilBtn = document.querySelector('.edit-pencil-btn');
const editStar = document.querySelector('.editStar');
const editBtn = document.querySelector('.editBtn');
const editContent = document.querySelector('.edit-content');
const editFileName = document.querySelector('#editFileName');
const editFileTime = document.querySelector('#editFileTime');
const editDateTime = document.querySelector('#editDateTime');
const editMessage = document.querySelector('#editMessage');

const navLinkDom = [...document.querySelectorAll('.nav-link')];
const fupload = document.querySelector('#fupload');
const fromCancel = document.querySelector('.from-cancel');
const fromAdd = document.querySelector('.from-add')

const inputCheckDom = [...document.querySelectorAll('.hascheck')];
let alldata = [];
let editObj={};


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
  sapn.classList.add('ff-Rob','fs-3');
  sapn.appendChild(title);
  return sapn;
}

/**
 * 改變 標題 樣式 加上 <del></del>
 */
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


/**
 * Tab 頁籤切換樣式
 * @param {*} element 
 */
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
  
  addTaskBtn_hide_UI() {
    //let style = getComputedStyle(addTaskBtn, 'display');
    addTaskBtn.parentNode.parentNode.classList.add('d-none');
  }
  addTaskBtn_show_UI() {
    addTaskBtn.parentNode.parentNode.classList.remove('d-none');
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
        event.stopPropagation();
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
    let str ='';

    str+=` <li class="w-100 px-4 py-3 bg-info mb-3">
    <div class="d-flex">
      <div class="me-auto d-inline-block">
        <input type="checkbox" class="w-6 h-6 me-3 hascheck">
        <span class="ff-Rob fs-3 todo-title">Type Something Here…</span>               
      </div>
      <div class="d-inline-block fs-3">
        <a href="" class="markStar text-warning text-decoration-no">
          <i class="fas fa-star"></i>
        </a>
        <a href="" class="edit-pencil text-black text-decoration-no">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </div>
    </div>
    <div class="record ps-4 ms-4 text-dark ">
      <i class="far fa-comment-dots fs-5 me-3"></i>
      <i class="far fa-file fs-5 me-3"></i>
      <span class="calendar me-3">
        <i class="far fa-calendar-alt fs-5 me-2"></i>
        <span>6/18</span>
      </span>              
    </div>
  </li>`;

  }

  setup() {
    this.navLink_click_UI();
    addTaskBtn.addEventListener('click', (event) => {
      console.log(addInput.value);
      if(addInput.value == ''){
        alert('請輸入任務')
        return;
      }
      this.addTaskBtn_hide_UI();
      this.editBtn_show_UI();
      this.editContent_show_UI();
    })

    addInput.addEventListener('keyup',(event)=>{
      //console.log(event.keyCode)
      if(addInput.value.length == 0  ){
        //alert('請輸入任務')
        return;
      }

      if(event.keyCode == 13){
        this.addTaskBtn_hide_UI();
        this.editBtn_show_UI();
        this.editContent_show_UI();
      }
    })

    addInput.addEventListener('change',(e)=>{
      //console.log(e.target.value); 
      editTitle.textContent = e.target.value 
      editObj.title = e.target.value ;
      
    })
    
    fupload.addEventListener('change',(event)=>{
      let date = new Date()
      //var selectedFile = document.getElementById('input').files[0];
      //console.log(event.target.files[0])
      editFileName.textContent = event.target.files[0].name;
      editFileTime.textContent =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    })

    // editCheck.addEventListener('change',(event)=>{
      
    // })


    fromCancel.addEventListener('click', () => {
      this.addTaskBtn_show_UI();
      this.editBtn_hide_UI();
      this.editContent_hide_UI();
      addInput.value='';
      editTitle.textContent='';
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


// addInput.on('keyup ',(event)=>{
//   console.log("Code: " + event.keyCode);
//     console.log("Code: " + event.which);
//     console.log("Code: " + window.event ? event.keyCode : event.which);
// });


// <i class="fas fa-pencil-alt"></i>
// <i class="far fa-file"></i>
// <i class="far fa-comment-dots"></i>
// <i class="far fa-calendar-alt"></i>
// <i class="far fa-star"></i>
// <i class="fas fa-star"></i>