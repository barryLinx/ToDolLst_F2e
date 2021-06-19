import '../scss/styles.scss'
//引入fontawesome樣式
import {library } from '@fortawesome/fontawesome';
import {faPencilAlt,faStar,faPlus} from '@fortawesome/fontawesome-free-solid';
import {faFile,faCommentDots,faCalendarAlt} from '@fortawesome/fontawesome-free-regular';

library.add(faPlus,faPencilAlt, faFile, faStar,faCommentDots,faCalendarAlt)


const addTaskBtn = document.querySelector('.addtaskBtn');
const editPencilBtn = document.querySelector('.edit-pencil-btn');


/**
 * init
 */
document.addEventListener('DOMContentLoaded',()=>{

})




// <i class="fas fa-pencil-alt"></i>
// <i class="far fa-file"></i>
// <i class="far fa-comment-dots"></i>
// <i class="far fa-calendar-alt"></i>
// <i class="far fa-star"></i>
// <i class="fas fa-star"></i>