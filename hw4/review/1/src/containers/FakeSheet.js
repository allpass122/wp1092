import React, { Component, useState, useEffect } from "react";
import Header from "../components/Header";


function RenderSheet(){
    const [num, setNum] = useState([100, 26]) // num:[row, col]
    const [index, setIndex] = useState([0,0])
    const [op, setOp] = useState([0,0])
    var x=new Array(100)
    for(var i=0; i<100; i++){
        x[i]= new Array(26)
        for(var j=0; j<26; j++) x[i][j]=''
    }
    const [text, setText] = useState(x)
    const ref = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const words = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                   "a",'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                   '1','2','3','4','5','6','7','8','9','0','-','=','[',']',';',',','.','/','<','>','?',':','"',"'",'{','}','|',
                   '~','!','@','#','$','%','^','&','*','(',')','_','+',' '
                    ]
    // console.log(1)
    useEffect(()=>{
        // console.log(2)
        const top=document.getElementById('top');
        const left=document.getElementById('left');
        const index_bar=document.getElementById('index_bar')
        var top_bar_width=30+80*(num[1]+2)
        var left_bar_height=30+24*(num[0]+2)
        index_bar.style.width=`${top_bar_width}px`
        top.style.width=`${top_bar_width}px`
        left.style.height=`${left_bar_height}px`
    })
    // console.log(3)
    const getIndex=(e)=>{
        const id = e.target.id;
        const indexs = id.split('_')
        return {row:parseInt(indexs[1]), col:parseInt(indexs[2])}
    }
    var v_Result=null;
    const TwoClick=(e)=>{
        if (v_Result) {
            window.clearTimeout(v_Result);
            v_Result = null;
        }
        const temp=getIndex(e)
        const row=temp.row
        const col=temp.col
        setIndex([row,col])
        e.target.readOnly=false
        // your click process code here
    
    }
    const OneClick=(e)=>{
        if (v_Result) {
            window.clearTimeout(v_Result);
            v_Result = null;
        }
        v_Result = window.setTimeout(()=>{
            // your click process code here
            const temp=getIndex(e)
            const row=temp.row
            const col=temp.col
            setIndex([row,col])
            e.target.readOnly=true
        },0);

    }
    useEffect(()=>{
        // console.log('clearing color')
        clearColor()
        const focused=document.activeElement
        const front=focused.id.split('_')[0]
        if(front==='row' || front==='col'){
            focused.style.backgroundColor='#dadce0'
        }
        // console.log('changing color')
        changeColor(index[0],index[1])
        if ((index[0]!==0 && index[1]!==0) && (index[0]<=num[0])){
            const next=document.getElementById(`content_${index[0]}_${index[1]}`)
            if (next!=null) window.setTimeout(()=>next.focus(), 0)
        }
    })
    const changeColor=(row, col)=>{
        const row_bar=document.getElementById('row_'+row+'_0')
        const col_bar=document.getElementById('col_0_'+col)
        // const target =document.getElementById('content_'+row+'_'+col)
        if (row_bar!=null && col_bar!=null){
            row_bar.style.backgroundColor='#dadce0'
            col_bar.style.backgroundColor='#dadce0'
        }
    }
    const clearColor=()=>{
        for(var i=0; i<num[0]; i++){
            const cell=document.getElementById('row_'+String(i+1)+'_0')
            if(cell!=null){
                cell.style.backgroundColor='white'
            }
        }
        for(var j=0; j<num[1]; j++){
            const cell=document.getElementById('col_0_'+String(j+1))
            if(cell!=null){
                cell.style.backgroundColor='white'
            }
        }
    }
    const clickOut = ()=>{
        setIndex([0,0])
    }
    const IncreaseRow = (e)=>{
        e.stopPropagation()
        const new_row=new Array(num[1])
        for(var i=0; i<num[1]; i++) new_row[i]=''
        var temp=text
        temp.splice(index[0]-1,0,new_row)
        setText(temp)
        setNum([num[0]+1,num[1]])
    }
    const DecreaseRow = (e)=>{
        e.stopPropagation()
        var temp=text
        temp.splice(index[0]-1,1)
        setText(temp)
        setNum([num[0]-1,num[1]])
    }
    const IncreaseCol = (e)=>{
        e.stopPropagation()
        var temp=text
        for (var j=0;j<num[1];j++){
            const new_cell=''
            temp[j].splice(index[1]-1,0,new_cell)
        }
        setText(temp)
        setNum([num[0],num[1]+1])
    }
    const DecreaseCol = (e)=>{
        e.stopPropagation()
        var temp=text
        for (var j=0;j<num[1];j++){
            temp[j].splice(index[1]-1,1)
        }
        setText(temp)
        setNum([num[0],num[1]-1])
    }
    useEffect(()=>{
        for(var i=0; i<num[0]; i++){
            for(var j=0; j<num[1]; j++){
                const cell = document.getElementById('content_'+String(i+1)+'_'+String(j+1))
                cell.value = text[i][j]
            }
    }})
    const type = (e)=>{
        if(e.key==='Enter'){
            if(index[0] < num[0]) setIndex([index[0]+1,index[1]])
            const next=document.getElementById(`content_${index[0]}_${index[1]}`)
            window.setTimeout(()=>next.focus(), 0)
        }
        if(e.target.readOnly===true){
            e.target.value=''
            e.target.readOnly=false
        }
        var temp=text
        words.forEach((item)=>{
            if (e.key === item){
                const tmp = e.target.value
                const row=index[0]
                const col=index[1]
                temp[row-1][col-1] = tmp+e.key
                setText(temp)
                return
            }
        })
    }
    var row=[]
    for(var i=1; i<num[1]+1; i++){
        if(i<=26){
            row.push(ref[i])
        }
        else{// i=676
            var temp=i-26
            var digits=2
            while((temp/26)>26){
                digits += 1
                temp = Math.ceil(temp/26)
            }
            var temp=i-26
            var final=''
            // 1: AA, 26: AZ 675: ZY, 676:ZZ, 677: AAA
            for(var iter=digits; iter>0; iter--){
                var r = (temp%26===0)? 26:temp%26
                final=ref[r]+final
                temp=Math.ceil(temp/26)
            }
            row.push(final)
        }
    }
    var first_row=[<button className='index' id={'neutral'} onClick={()=>clickOut()}></button>]
    for (var i=0; i<num[1]; i++){
        // TODO: add id to each cell
        const id='col_0_'+String(i+1)
        first_row.push(<button className='index' id={id} onClick={(e)=>OneClick(e)}>{row[i]}</button>);
    }
    var rows=[<tr>{first_row}</tr>]
    for(var i=0; i<num[0]; i++){
        var cells=[]
        for (var j=0; j<row.length; j++){
            const id='content_'+String(i+1)+'_'+String(j+1)
            cells.push(
                <input readOnly={true} id={id} onKeyDown={(e)=>type(e)} className='contents' onClick={(e)=>OneClick(e)} onDoubleClick={TwoClick}></input>)
            }
        rows.push(
            <tr>
                <button className='index' id={'row_'+String(i+1)+'_0'} onClick={(e)=>OneClick(e)}>{i+1}</button>
                {cells}
            </tr>
        )
    }
    return (
        <table>
            <thead/>
            <tbody>
                <tr id='top' onClick={()=>clickOut()}>
                    <button onClick={(e)=>IncreaseCol(e)}>+</button>
                    <button onClick={(e)=>DecreaseCol(e)}>-</button>
                </tr>
                <tr id='left' onClick={()=>clickOut()}>
                    <button onClick={(e)=>IncreaseRow(e)}>+</button>
                    <button onClick={(e)=>DecreaseRow(e)}>-</button>
                </tr>
                <tr id='index_bar'>
                    {rows}
                </tr>
            </tbody>
        </table>
    )
}
class FakeSheet extends Component {

    render() {
        return (
            <>
                <Header />
                <RenderSheet />
            </>
        );
    }
}

export default FakeSheet;
