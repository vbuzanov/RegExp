
let sf = document.forms.sf;
let what = sf.elements.what;
let but = sf.elements.but;
let icase = sf.elements.icase;
let exact = sf.elements.exact;
let str = document.getElementById('srcText').innerHTML;
let str1 = document.getElementById('srcText');
let res = document.querySelector('#res>strong')
let userText = '';
let flag = '';
let pattern1;
let newAr;

but.addEventListener('click', regExp1)
function regExp1(){
    userText = what.value.replace(/[-.+()^\[\]\$\|\?]/gi, '\\$&')

    if(icase.checked && exact.checked){
        if(/,/.test(userText)){
            userText = '\\b'+userText+'(?!\\w)';
        } 
        else if(/(\\\.){3,}/.test(userText)){
            userText = userText.replace(/(\\\.){3,}/g, '(?!=\\w)\$&(?!\\.)');
        }
        else if((/\\\./.test(userText)) && !(/[a-z]/.test(userText))){
            userText = userText.replace(/\\\./g, '(\\b)\$&(?!\\.)')
        }
        else{
            userText = '\\b'+userText+'\\b';
        }
        flag = 'gi';
    }
    else if(!icase.checked && exact.checked){
        if(/,/.test(userText)){
            userText = '\\b'+userText+'(?!\\w)';
        } 
        else if(/(\\\.){3,}/.test(userText)){
            userText = userText.replace(/(\\\.){3,}/g, '(?!=\\w)\$&(?!\\.)');
        }
        else if((/\\\./.test(userText)) && !(/[a-z]/.test(userText))){
            userText = userText.replace(/\\\./g, '(\\b)\$&(?!\\.)')
        }
        else{
            userText = '\\b'+userText+'\\b';
        }
        flag = 'g';
    }
    else if(icase.checked && !exact.checked){
        userText = userText.replace(/\s/gi, '\\n*\\s*');
        flag = 'gi';
    }
    else{
        userText = userText.replace(/\s/gi, '\\n*\\s*');
        flag = 'g';
    }

    pattern1 = new RegExp(`${userText}`, `${flag}`)
    newAr = str.match(pattern1);

    if(newAr){
        res.innerHTML = newAr.length;
    }
    else{
        res.innerHTML = 0;
    } 
    str1.innerHTML = str.replace(pattern1, '<span style="color:red">$&</span>')
}

sf.addEventListener('submit', (event)=>{
    event.returnValue = false;
    regExp1();
})