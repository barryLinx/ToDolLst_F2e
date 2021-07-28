import '../scss/styles.scss'
//引入fontawesome樣式
import { library } from '@fortawesome/fontawesome';
import { faPencilAlt, faStar, faPlus } from '@fortawesome/fontawesome-free-solid';
import { faFile, faCommentDots, faCalendarAlt } from '@fortawesome/fontawesome-free-regular';

library.add(faPlus, faPencilAlt, faFile, faStar, faCommentDots, faCalendarAlt)

// /進行clean code
// const addInput = document.querySelector('#addInput');
// const addTaskBtn = document.querySelector('#addTaskBtn');

//const editCheck = document.querySelector('.editCheck'); //勾選是否完成
// const editTitle = document.querySelector('#editTitle'); //編輯 新增 標題

// const editStar = document.querySelector('#editStar'); // 編輯 新增 重要
// const editBtn = document.querySelector('#editBtn'); //  編輯 
// const editContent = document.querySelector('#editContent');
// const editFileName = document.querySelector('#editFileName');
// const editFileTime = document.querySelector('#editFileTime');
// const editDateTime = document.querySelector('#editDateTime');
// const editMessage = document.querySelector('#editMessage');

const navLinkDom = [...document.querySelectorAll('.nav-link')];
// const fupload = document.querySelector('#fupload');
// const formCancel = document.querySelector('#formCancel');
// const formAdd = document.querySelector('#formAdd');
// //const formEdit = document.querySelector('#formEdit');
// //const formEdit = document.forms["formEdit"];
// const TaskList = document.querySelector('#TaskList');
// const Total = document.querySelector('#Total');

let element = {};//進行clean code

['addInput', 'addTaskBtn',
  'editTitle', 'editStar', 'editBtn',
  'editContent', 'editFileName',
  'editFileTime', 'editDateTime',
  'editMessage', 'fupload', 'formCancel',
  'formAdd', 'TaskList', 'Total']
  .forEach(item => element = {
    ...element,
    [item]: document.getElementById(item)
  });
const { addInput, addTaskBtn, editTitle,
  editStar, editBtn,
  editContent, editFileName,
  editFileTime, editDateTime,
  editMessage, fupload,
  formCancel, formAdd,
  TaskList, Total } = element;

// const element = {}; 進行clean

let url = 'http://localhost:3030/data';
let alldata;
let editObj = {
  //id: "",
  reminder: false,
  status: "Progress",
  title: "",
  upLoadFileName: {
    name: "",
    lastModifiedDate: ""
  },
  dateTime: '',
  comment: ""
};
let addedit;

//console.log('formEdit', formEdit);


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


function getSelectData(id) {
  //console.log("getSelectData", alldata);
  return alldata.find(d => d.id === parseInt(id));   //直接return
}

function removeData(id) {
  return alldata.filter(d => d.id != parseInt(id)) //直接return
}

function sortData_Event(data) {
  let mark = data.filter(d => {
    return d.reminder == true;
  });

  let nomark = data.filter(d => {
    return d.reminder !== true;
  });

  //console.log(mark);
  //console.log(nomark);
  //alldata.length = 0;
  alldata = [...mark, ...nomark];
  Total.textContent = `${alldata.length} tasks left`;
  //index.jsconsole.log("filterData_Event:", alldata);
}

function filterData_Event(status) {
  return alldata.filter(d =>
    d.status == status
  );
}





//display products UI
class UI {
  // delTitleDom(t) {
  //   // let str = ` <del class="text-gray-200">
  //   //          <span class="ff-Rob fs-3 todo-title">
  //   //             Type Something Here…  
  //   //          </span>
  //   //       </del>`;
  //   let title = document.createTextNode(t);
  //   let del_dom = document.createElement('del');
  //   del_dom.classList.add('text-gray-200');
  //   let span_dom = document.createElement('span');
  //   span_dom.classList.add('ff-Rob', 'fs-3', 'todo-title');
  //   span_dom.appendChild(title);
  //   del_dom.appendChild(span_dom);
  //   console.log(del_dom);
  //   return del_dom;
  // }

  // spanTitleDom(t) {
  //   let title = document.createTextNode(t);
  //   let sapn = document.createElement('span');
  //   sapn.classList.add('ff-Rob', 'fs-3');
  //   sapn.appendChild(title);
  //   return sapn;
  // }

  /**
   * 改變 標題 樣式 加上 <del></del>
   */
  inputcheck_change() {
    const inputCheckDom = [...document.querySelectorAll('.hascheck')];
    inputCheckDom.forEach(el => {
      el.addEventListener('change', (event) => {
        //event.preventDefault();
        //el.insertAdjacentHTML("afterend", delHtml());
        //console.log(el.parentNode);
        //console.log(event.currentTarget.checked);
        //let elParentNode = el.parentNode;
        //let elNextEleSib = el.nextElementSibling;
        //console.log(el.nextElementSibling.textContent);
        let sdata = getSelectData(el.dataset.id);// refence address

        if (event.currentTarget.checked) {
          editObj.status = 'Completed';
          sdata.status = 'Completed'; //alldata之中 的data,status狀態 
          //elParentNode.replaceChild(this.delTitleDom(elNextEleSib.textContent), elNextEleSib);
          //fdata.push(sdata);
        } else {
          editObj.status = 'Progress';
          sdata.status = 'Progress'; //alldata之中 的data,status狀態 
          // elParentNode.replaceChild(this.spanTitleDom(elNextEleSib.textContent), elNextEleSib);
        }

        this.listUI(alldata);//因為是記憶體位置參考，sdata改變後 alldata中的那筆相同記憶體位置資料也會改變

        //把資料 傳回 db.json alldata
        putData(sdata);
      })
    })
  }

  /**
   * 做資料至頂處理，不必處理樣式
   */
  markStar_click() {
    //console.log("mark",alldata);
    const markStar = [...document.querySelectorAll('.markStar')];
    markStar.forEach(el => {
      //console.log(el);
      el.addEventListener("change", (e) => {
        //e.preventDefault();
        console.log(e.target);
        let seldata = getSelectData(el.dataset.id);//選出要改變的data
        //console.log((e.currentTarget.checked));
        //console.log(el.previousElementSibling);
        //putData()
        //console.log(el.previousElementSibling.children[0]);
        let fdata = removeData(el.dataset.id);//從集合移除data，
        //console.log(fdata);

        // alldata 更改處理      
        if (e.currentTarget.checked) {
          seldata.reminder = true;
          fdata.unshift(seldata);  //加入最前面
        } else {
          seldata.reminder = false; //沒有標記，不用再加入最前面
        }
        alldata = fdata;
        //alldata = Object.assign({},fdata);
        //console.log(alldata);
        //做Http put
        putData(seldata);
        this.listUI(alldata);

        //alldata.length = 0;   
      })
    })
  }

  editpencel() {
    const editPencilBtn = [...document.querySelectorAll('.edit-pencil')];
    //console.log(editPencilBtn);
    editPencilBtn.forEach(el => {
      //console.log(el)
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.addTaskBtn_hide_UI();
        this.editBtn_show_UI();
        this.editContent_show_UI();
        //el.dataset.id;
        let sdata = getSelectData(el.dataset.id);

        let { title, reminder, comment, dateTime } = sdata;

        editTitle.value = title;
        editStar.checked = reminder;
        editDateTime.value = dateTime;
        editMessage.value = comment;
        //editObj = sdata; 
        editObj = Object.assign({}, sdata); //clean code

        //scroll 卷軸向上
        window.scrollTo({
          top: 0,
          behavior: "instant"
        });
        //save 更新資料 put
        // formAddEdit_click(sdata, 'Save')
        addedit = 'Save';
        formAdd.innerHTML = ' <i class="fas fa-plus me-3"></i> Save';

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
    let fdata;
    //let hasActive=true;
    navLinkDom.forEach(n => {
      let status = n.dataset.st;
      n.addEventListener('click', (event) => {
        hasActive(n.parentElement)
        //console.log(hasActive(n.parentElement));
        //console.log(status);
        event.stopPropagation();
        event.preventDefault();
        console.log(status);
        switch (status) {
          case 'Progress':
            fdata = filterData_Event(status);
            Total.textContent = `${fdata.length} tasks left`;
            this.listUI(fdata);
            // restart render UI 
            //filter_Event('Progress')
            break;
          case 'Completed':
            fdata = filterData_Event(status);
            Total.textContent = `${fdata.length} tasks left`;
            this.listUI(fdata);
            // restart render UI
            //filter_Event('Completed')
            break;
          default:
            sortData_Event(alldata);
            Total.textContent = `${fdata.length} tasks left`;
            this.listUI(alldata);
            //filterData_Event();
            break;
        }
      })
    })
  }

  listUI(data) {
    let str = '';
    //console.log(data);
    data.forEach(d => {
      str += ` <li class="w-100 px-4 py-3 ${d.reminder ? 'bg-info' : 'bg-light'} mb-3">
  <div class="d-flex">
    <div class="me-auto d-inline-block">
      <input id="hascheck_${d.id}" data-id='${d.id}'  type="checkbox" class="w-6 h-6 me-3 hascheck" ${d.status == 'Completed' ? 'checked' : ''}>
      ${d.status == 'Completed' ?
          `<del class="text-gray-200"> <span class="ff-Rob fs-3 todo-title">${d.title}</span></del>`
          : `<span class="ff-Rob fs-3 todo-title">${d.title}</span>  `}
                   
    </div>
    <div class="d-inline-block fs-3">
       <label for="markStar_${d.id}" class="text-decoration-no">
           <i class="${d.reminder ? 'fas text-warning' : 'far text-black'} fa-star"></i>
        </label>
       <input id="markStar_${d.id}" data-id="${d.id}" class="markStar" type="checkbox" ${d.reminder ? 'checked' : ''}  hidden>
    
      <a href="" data-id='${d.id}' class="edit-pencil text-black text-decoration-no">
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
    TaskList.innerHTML = str;
     this.inputcheck_change(); //不知為何要放這，難道是記憶體問題
     this.markStar_click(); //不知為何要放這，難道是記憶體問題
    this.editpencel(); //不知為何要放這，難道是記憶體問題
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
        formAdd.innerHTML = `<i class="fas fa-plus me-3"></i>
        Add Task`;
        addedit = 'Add';
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

      editTitle.value = ''
      editDateTime.value = '';
      editMessage.value = '';
    })

    formAdd.addEventListener('click', (e) => {
      //e.preventDefault();
      // const formData = new FormData(formEdit);
      // const formProps = Object.fromEntries(formData);
      // console.log(editMessage.value);
      // console.log();   
      //addedit = 'Add';    
      formAddEdit_click();

      //console.log(editObj);
    })
    //this.editpencel();
  }
};

function formAddEdit_click() {
  editObj.comment = editMessage.value;
  editObj.dateTime = editDateTime.value;
  console.log(editObj);

  switch (addedit) {
    case 'Save':
      console.log('PUT');
      putData(editObj);
      break;
    case 'Add':
      console.log('POST');
      postData(editObj);
      break;
    default:
      break;
  }

}

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
  // await sendHttpReq('GET', url).then(res => {
  //   console.log(res)
  //   data = res;
  // });
  data = await sendHttpReq('GET', url);
  //console.log('data',data);
  return data;
}

// 有 async /await 不用 .then(res=>{})
async function postData(data) {
  let ui = new UI();
  await sendHttpReq('POST', url, data).then(res => {
    console.log("POST =>", res); //xhr.status === 201 才有回應
    getData().then(data => {
      //console.log(data);
      //alldata = data;
      sortData_Event(data);//排序
      ui.listUI(alldata);
      ui.addTaskBtn_show_UI();
      ui.editBtn_hide_UI();
      ui.editContent_hide_UI();
      addInput.value = '';
      editTitle.textContent = '';
    })
  });
}

// 有 async /await 不用 .then(res=>{})
async function putData(data) {
  let ui = new UI();
  await sendHttpReq('PUT', url + `/${data.id}`, data).then(res => {
    console.log("PUT =>", res); //xhr.status == 201   
    ui.addTaskBtn_show_UI();
    ui.editBtn_hide_UI();
    ui.editContent_hide_UI();
  }).then(() => {

    getData().then(data => {
      sortData_Event(data);//排序
      ui.listUI(alldata);
    })
  })
}


/**
 * init
 */
document.addEventListener('DOMContentLoaded', async () => {
  const ui = new UI();
  //const event = new Event();
  //const dto = new DTO();
  ui.setup();


  let data = await getData(); // clean promise
  sortData_Event(data);
  ui.listUI(alldata);
  // ui.editpencel(); // 記憶體執行環境問題
  // ui.inputcheck_change(); // 記憶體執行環境問題
  // ui.markStar_click(); // 記憶體執行環境問題

  console.log("DOMContentLoaded", data);
  // getData().then(data => {
  //   //console.log(data);
  //   //alldata = data;
  //   sortData_Event(data);
  //   ui.listUI(alldata);
  //   //ui.editpencel();
  //   //ui.inputcheck_change();
  //   //ui.markStar_click();
  // })

  //navLink_click();
  //  ui.inputcheck_change();
  //   ui.markStar_click();

})




// <i class="fas fa-pencil-alt"></i>
// <i class="far fa-file"></i>
// <i class="far fa-comment-dots"></i>
// <i class="far fa-calendar-alt"></i>
// <i class="far fa-star"></i>
// <i class="fas fa-star"></i>