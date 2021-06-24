import '../scss/styles.scss'
//引入fontawesome樣式
import { library } from '@fortawesome/fontawesome';
import { faPencilAlt, faStar, faPlus } from '@fortawesome/fontawesome-free-solid';
import { faFile, faCommentDots, faCalendarAlt } from '@fortawesome/fontawesome-free-regular';

library.add(faPlus, faPencilAlt, faFile, faStar, faCommentDots, faCalendarAlt)

const addInput = document.querySelector('.addInput');
const addTaskBtn = document.querySelector('#addTaskBtn');

const editCheck = document.querySelector('.editCheck'); //勾選是否完成
const editTitle = document.querySelector('.editTitle'); //編輯 新增 標題
//const editPencilBtn = document.querySelector('.edit-pencil-btn');
const editStar = document.querySelector('#editStar'); // 編輯 新增 重要
const editBtn = document.querySelector('.editBtn'); //  編輯 
const editContent = document.querySelector('.edit-content');
const editFileName = document.querySelector('#editFileName');
const editFileTime = document.querySelector('#editFileTime');
const editDateTime = document.querySelector('#editDateTime');
const editMessage = document.querySelector('#editMessage');

const navLinkDom = [...document.querySelectorAll('.nav-link')];
const fupload = document.querySelector('#fupload');
const formCancel = document.querySelector('.form-cancel');
const formAdd = document.querySelector('.form-add');
const formEdit = document.querySelector('#formEdit');
//const formEdit = document.forms["formEdit"];
const taskList = document.querySelector('.task-list');


let url = 'http://localhost:3030/data';
let alldata=[];
let editObj = {
  //id: "",
  reminder: false,
  status: "",
  title: "",
  upLoadFileName: {
    name: "",
    lastModifiedDate: ""
  },
  dateTime: '',
  comment: ""
};

//console.log('formEdit', formEdit);

function delTitleDom(t) {
  // let str = ` <del class="text-gray-200">
  //          <span class="ff-Rob fs-3 todo-title">
  //             Type Something Here…  
  //          </span>
  //       </del>`;
  let title = document.createTextNode(t);
  let del_dom = document.createElement('del');
  del_dom.classList.add('text-gray-200');
  let span_dom = document.createElement('span');
  span_dom.classList.add('ff-Rob', 'fs-3', 'todo-title');
  span_dom.appendChild(title);
  del_dom.appendChild(span_dom);
  console.log(del_dom);
  return del_dom;
}

function spanTitleDom(t) {
  let title = document.createTextNode(t);
  let sapn = document.createElement('span');
  sapn.classList.add('ff-Rob', 'fs-3');
  sapn.appendChild(title);
  return sapn;
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

/**
 * 將mark放在最上面
 */
// function filterData_Event() {

//   let mark = alldata.filter(d => {
//     return d.reminder == true;
//   });

//   let nomark = alldata.filter(d => {
//     return d.reminder !== true;
//   });

//   //alldata.length = 0;
//   alldata = mark.concat(nomark);
//   console.log("alldata", alldata);
// }

function getSelectData(id) {
  //console.log(id);
  console.log("getSelectData",alldata);
  let data = alldata.find(d => {
    d.id == '1';
  });
  console.log(data);
  return data;
  //console.log(gg)
}

function removeData(id) {
  return alldata.filter(d => {
    d.id != id;
  })
}

class Event {
  /**
 * 將mark放在最上面
 */
  filterData_Event(data) {

    let mark = data.filter(d => {
      return d.reminder == true;
    });

    let nomark = data.filter(d => {
      return d.reminder !== true;
    });

     console.log(mark);
     console.log(nomark);
    //alldata.length = 0;
    alldata = [...mark,...nomark];
    console.log("alldata:",typeof alldata);
  }
}

//display products UI
class UI {
  /**
   * 改變 標題 樣式 加上 <del></del>
   */
  inputcheck_change() {
    const inputCheckDom = [...document.querySelectorAll('.hascheck')];
    inputCheckDom.forEach(el => {
      el.addEventListener('change', (event) => {
        //el.insertAdjacentHTML("afterend", delHtml());
        //console.log(el.parentNode);
        //console.log(event.currentTarget.checked);
        let elParentNode = el.parentNode;
        let elNextEleSib = el.nextElementSibling;
        //console.log(el.nextElementSibling.textContent);

        if (event.currentTarget.checked) {
          editObj.status = 'Completed';
          elParentNode.replaceChild(delTitleDom(elNextEleSib.textContent), elNextEleSib);
        } else {
          editObj.status = '';
          elParentNode.replaceChild(spanTitleDom(elNextEleSib.textContent), elNextEleSib);
        }
      })
    })
  }

  markStar_click() {
    const markStar = [...document.querySelectorAll('.markStar')];
    markStar.forEach(s => {
      s.addEventListener('click', (e) => {
        e.preventDefault();
        //console.log(s.dataset.id)        
        let seldata = getSelectData(s.dataset.id);//選出要改變的data
        //console.log(seldata);
        console.log(e.target.parentElement);
        let fdata = removeData(s.dataset.id);//從集合移除data，
        fdata.unshift(seldata);//再加入最前面
        alldata.length = 0;
        alldata = fdata;

        //this.listUI(alldata);
      })
    })
  }

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

  listUI(data) {
    let str = '';
    data.forEach(d => {
      str += ` <li class="w-100 px-4 py-3 ${d.reminder ? 'bg-info' : 'bg-light'} mb-3">
  <div class="d-flex">
    <div class="me-auto d-inline-block">
      <input type="checkbox" class="w-6 h-6 me-3 hascheck">
      <span class="ff-Rob fs-3 todo-title">${d.title}</span>               
    </div>
    <div class="d-inline-block fs-3">
      <a href="" data-id=${d.id} class="markStar ${d.reminder ? 'text-warning' : 'text-black'}  text-decoration-no">
        <i class="${d.reminder ? 'fas' : 'far'} fa-star"></i>
      </a>
      <a href="" class="edit-pencil text-black text-decoration-no">
        <i class="fas fa-pencil-alt"></i>
      </a>
    </div>
  </div>
  <div class="record ps-4 ms-4 text-dark ">
    ${(d.comment !== '') ? '<i class="far fa-comment-dots fs-5 me-3"></i>' : ''}
    ${d.upLoadFileName.name !== '' ? '<i class="far fa-file fs-5 me-3"></i>' : ''}    
    <span class="calendar me-3">
      ${d.dateTime !== '' ? ` <i class="far fa-calendar-alt fs-5 me-2"></i><span>${d.dateTime}</span>`
          : ''}       
    </span>              
  </div>
</li>`;
    })
    taskList.innerHTML = str;
  }

  setup() {
    this.navLink_click_UI();
    addTaskBtn.addEventListener('click', (event) => {
      // console.log(addInput.value);
      if (addInput.value == '') {
        alert('請輸入任務')
        return;
      }
      this.addTaskBtn_hide_UI();
      this.editBtn_show_UI();
      this.editContent_show_UI();
    })

    /***
     * 鍵盤事件
     */
    addInput.addEventListener('keyup', (event) => {
      //console.log(event.keyCode)
      if (addInput.value.length == 0) {
        //alert('請輸入任務')
        return;
      }

      if (event.keyCode == 13) {
        this.addTaskBtn_hide_UI();
        this.editBtn_show_UI();
        this.editContent_show_UI();
      }
    })

    /**
     * 新增標題
     */
    addInput.addEventListener('change', (e) => {
      //console.log(e.target.value); 
      //editTitle.textContent = e.target.value
      editTitle.value = e.target.value;
      editObj.title = e.target.value;
      //editObj.title =editTitle.value ;
    })

    /***
     * 修改標題
     */
    editTitle.addEventListener('change', (e) => {
      editObj.title = e.target.value;
    })


    fupload.addEventListener('change', (event) => {
      let date = new Date()
      //var selectedFile = document.getElementById('input').files[0];
      //console.log(event.target.files[0])
      editFileName.textContent = event.target.files[0].name;
      editFileTime.textContent = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      editObj.upLoadFileName.name = event.target.files[0].name;
      editObj.upLoadFileName.lastModifiedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      //console.log(editObj)
    })

    editStar.addEventListener('change', (e) => {
      e.preventDefault();
      //console.log(bmark);
      //console.log(e.currentTarget.checked);
      editObj.reminder = e.currentTarget.checked;
      console.log(editStar.previousElementSibling.children);
      //editStar.previousElementSibling.childNodes
      if (e.currentTarget.checked) {
        //editStar.classList.remove('text-black');
        editStar.previousElementSibling.children[0].classList.remove('far', 'text-black');
        editStar.previousElementSibling.children[0].classList.add('fas', 'text-warning');
        //editStar.classList.add('text-warning');    
      } else {
        editStar.previousElementSibling.children[0].classList.remove('fas', 'text-warning');
        editStar.previousElementSibling.children[0].classList.add('far', 'text-black');
      }
    })

    formCancel.addEventListener('click', () => {
      this.addTaskBtn_show_UI();
      this.editBtn_hide_UI();
      this.editContent_hide_UI();
      addInput.value = '';
      //editTitle.textContent = '';
      editTitle.value = ''
    })

    formAdd.addEventListener('click', (e) => {
      //e.preventDefault();
      const formData = new FormData(formEdit);
      const formProps = Object.fromEntries(formData);
      // console.log(editMessage.value);
      editObj.comment = editMessage.value;
      //editObj.id = 123;
      editObj.dateTime = formProps.editDateTime;
      //DTO.postData(editObj);
      postData(editObj);
      //console.log(editObj);     
    })
  }
};

function sendHttpReq(method, url, data) {

  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    if (data) {
      //xhr.setRequestHeader('Content-type', 'applcation/json; charset=UTF-8');
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    //var data = JSON.stringify(account);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || xhr.status === 201)) {
        //console.log(xhr.response);
        //resolve(JSON.parse(xhr.response));
        resolve(xhr.response)
      }
    }

    xhr.onerror = () => {
      reject('Error');
    }
    xhr.send(JSON.stringify(data));
    console.log(xhr)

  });
  return p;
}

async function getData() {
  let data;
  await sendHttpReq('GET', url).then(res => {
    //console.log(res)
    data = res;
  });
  return data;
}

async function postData(data) {
  let ui = new UI();
  await sendHttpReq('POST', url, data).then(res => {
    console.log("POST =>", res); //xhr.status === 201 才有回應
    getData().then(data => {
      //console.log(data);
      alldata = data;
      ui.listUI(alldata);
      ui.addTaskBtn_show_UI();
      ui.editBtn_hide_UI();
      ui.editContent_hide_UI();
      addInput.value = '';
      editTitle.textContent = '';
    })
  });


}

//console.log('POST =>', data);
//const ui = new UI();

//local storage
// class Storage {
//   static saveTask(task) {
//     localStorage.setItem("task", JSON.stringify(task));
//   }
//   static getTask(id) {
//     let tasks = JSON.parse(localStorage.getItem('task'));
//     return tasks.find(t => t.id === id)
//   }
// };


/**
 * init
 */
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const event = new Event();
  //const dto = new DTO();
  ui.setup();

  getData().then(data => {
    //console.log(data);
    //alldata = data;
    event.filterData_Event(data);
    ui.listUI(alldata);
  }).then(() => {
    ui.inputcheck_change();
    ui.markStar_click();
  })
  //navLink_click();

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