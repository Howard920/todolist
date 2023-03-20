// 1. 新增
// 2. 渲染
// 3. tab 切換（CSS樣式）
// 4. 刪除 ＆ 切換 checked 狀態功能
// 5. 更新代辦清單
// 6. 刪除已完成 todo
// 7. 優化（keypress）

const txt = document.querySelector('.txt');
const btn_add = document.querySelector('.btn_add');
const btn_del = document.querySelectorAll('ul.list li a');
let todoData = [];

// 1. 新增
btn_add.addEventListener('click',addTo);
function addTo() {
    let data = {
        txt: txt.value,
        id: new Date().getTime(),
        isChecked: ''
    };
    if(txt.value == ''){
        alert('請重新輸入');
        return;
    }
    todoData.push(data);
    txt.value = '';
    updateList();
};

// 2. 渲染
const list = document.querySelector('.list');
function render(arr) {
    let str = '';
    arr.forEach(item => {
        str += `
        <li data-id=${item.id}>
            <label class="checkbox" for="">
                <input type="checkbox" ${item.isChecked}/>
                <span>${item.txt}</span>
            </label>
            <a href="#" class="delete"></a>
        </li>
        `;
    });
    list.innerHTML = str;
};

// 3. tab 切換（CSS樣式）
const tab = document.querySelector('.tab');
const tabs = document.querySelectorAll('ul.tab li');

// 紀錄當下的toggleStatus狀態
let toggleStatus = 'all';
tab.addEventListener('click',function (e) {
    toggleStatus = e.target.dataset.tab;

    // tabs加上active-class狀態
    tabs.forEach(function (item) {
        item.classList.remove('active');

        if(toggleStatus == item.dataset.tab){
            item.classList.add('active');
        }
    })
    updateList();
});

// 4. 刪除 ＆ 切換 checked 狀態功能
list.addEventListener('click',function (e) {
    let id = e.target.closest('li').dataset.id;

    console.log(e.target);
    if(e.target.getAttribute('class')=='delete'){
        todoData = todoData.filter(item=>{
            return item.id != id;
        });
    }else{
        todoData.forEach(item=>{
            //
           if(item.id == id){
                if(item.isChecked == ''){
                    item.isChecked = 'checked';
                }else if(item.isChecked == 'checked'){
                    item.isChecked = '';
                }
           }
        })
    }
    updateList();
});

// 5. 更新代辦清單
let showData = [];
const item_count = document.querySelector('.item_count');
function updateList() {
    if(toggleStatus == 'all'){
        showData = todoData;
    }else if(toggleStatus == 'work'){
        showData = todoData.filter(item=>{
            return item.isChecked == '';
        })
    }else if(toggleStatus == 'done'){
        showData = todoData.filter(item=>{
            return item.isChecked == 'checked';
        })
    }

    item_count.innerHTML = showData.length;
    console.log(showData);
    render(showData);
};

// 6. 刪除已完成 todo
const btn_del_all = document.querySelector('.btn_del_all');
console.log(btn_del_all);

btn_del_all.addEventListener('click',function (e) {
    e.preventDefault();
    todoData = todoData.filter(item=>{
        return item.isChecked == '';
    });
    console.log('clear all checked');
    console.log(showData);
    updateList();
})

// 7. 優化（keypress）
txt.addEventListener('keypress',function (e) {
    if(e.key == 'Enter'){
        addTo();
    }
});

updateList();
