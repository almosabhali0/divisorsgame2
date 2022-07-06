
let n=30;
let flag=-1;
let s=(2**(n+1))-2;
console.log(s);
let tt=2;
function get_bit(a,i) {
  return (a>>i)&1;
}
console.log(2**32);
const sleep = ms => new Promise(r => setTimeout(r, ms));
function lonly(a) {
    for(let i=1;i*i<=a;i++) {
        if(a%i==0) return 0;
    }
    for(let i=a;i<=n;i+=a) {
        if(get_bit(s,a)) return 0;
    }
    return 1;
}
let vis={};
function solve(turn) {
    if(s==0) return (turn==2? 1:-1);
    if(vis[s]) return (turn==1? vis[s]:-vis[s]);
    let found=0;
    for(let a=1;a<=n;a++) {
        if(!get_bit(s,a)) continue;
        if(lonly(a)) {
            if(found) continue;
            else found=1;
        } 
        let ret=[];
        for(let j=1;j<=a;j++) {
            if(a%j==0 && get_bit(s,j)==1) {
                ret.push(j);
            }
        }
        for(let j=0;j<ret.length;j++) s-=(2**ret[j]);

        let res=solve(3-turn);

        for(let j=0;j<ret.length;j++) s+=(2**ret[j]);

        if(turn==1) {
            if(res==1) {
                flag=a;

                vis[s]=1;
                return 1;
            }
        }else {
            if(res==-1) {
                vis[s]=1;
                return -1;
            }
        }

    }
    vis[s]=-1;
    if(turn==1) return -1;
    else return 1;
}
let buttons=[];
for(let i=1;i<=n;i++) {
    buttons[i]=document.createElement("button");
    buttons[i].className+="number";
    let di=document.createElement("div");
    document.getElementById("mydiv").appendChild(di);
    di.appendChild(buttons[i]);
    di=document.createElement("div");
    di.innerText=i;
    buttons[i].appendChild(di);
}
function start() {
    s=(2**(n+1))-2;
    flag=-1;
    tt=2;
    for(let i=1;i<=n;i++) buttons[i].style.backgroundColor="blue";
    for(let i=1;i<=n;i++) buttons[i].style.visibility="visible";
    // computer_play();

}
// for(let i=1;i<=5;i++) buttons[i].style.visibility="hidden";
for(let i=1;i<=n;i++) {
    buttons[i].addEventListener("mouseover",(event) => {
        if(tt==1) return;
        let num=Number(event.target.firstChild.innerText);
        for(let j=1;j<=num;j++) {
            if(num%j==0) buttons[j].style.backgroundColor="red";
        }
    });
    buttons[i].firstChild.addEventListener("mouseover",(event) => {
        if(tt==1) return;
        let num=Number(event.target.innerText);
        for(let j=1;j<=num;j++) {
            if(num%j==0) buttons[j].style.backgroundColor="red";
        }
    });
    buttons[i].addEventListener("mouseout",(event) => {
        if(tt==1) return;
        for(let j=1;j<=n;j++) buttons[j].style.backgroundColor="blue";
    });
    buttons[i].addEventListener("click",(event)=> {
        if(tt==2 && event.target.tagName=="BUTTON") {
            let num=Number(event.target.firstChild.innerText);
            console.log("player choosed ",num);
            
            for(let j=1;j<=num;j++) {
                if(num%j==0) {
                    if(get_bit(s,j)) {
                        buttons[j].style.visibility="hidden";
                        s-=(2**j);
                    }
                }
            }
            
            tt=1;
            console.log(s);
            if(s==0) alert("you win");
            else computer_play();
        }
    });

    buttons[i].firstChild.addEventListener("click",(event)=> {
        if(tt==2 && event.target.tagName!="BUTTON") {
            let num=Number(event.target.innerText);
            console.log("player choosed ",num);
            for(let j=1;j<=num;j++) {
                if(num%j==0) {
                    if(get_bit(s,j)) {
                        buttons[j].style.visibility="hidden";
                        s-=(2**j);
                    }
                }
            }
            tt=1;
            console.log(s);

            if(s==0) alert("you win");
            else computer_play();
        }
    });
}
async function computer_play() {
    if(tt==1) {
        vis={};
        let x=solve(1);
        // alert(flag);
        if(x==-1) {
            let choices=[];
            for(let i=1;i<=n;i++) {
                if(get_bit(s,i)) {
                    choices.push(i);
                }
            }
            flag=choices[math.randomInt(0,choices.length-1)];
        }
        await sleep(1000);
        console.log("computer choosed ",flag);
        buttons[flag].style.backgroundColor="purple";
        for(let i=1;i<flag;i++) {
            if(flag%i==0) {
                if(get_bit(s,i)) {
                    buttons[i].style.backgroundColor="red";
                }
            }
        }
        await sleep(1000);
        for(let i=1;i<=flag;i++) {
            if(flag%i==0) {
                if(get_bit(s,i)) {
                    // buttons[i].style.transitionDelay="10s";
                    buttons[i].style.visibility="hidden";
                    s-=(2**i);
                }
            }
        }
        console.log(s);
        if(s==0) alert("The computer wins");
        else tt=2;
    }

}