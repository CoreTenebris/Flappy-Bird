document.addEventListener('DOMContentLoaded',()=>{
   const moveObject = document.querySelector('.bird')
   const mainArea = document.querySelector('.container')
//    const platform=document.querySelector('.ground')


   let moveObjectLeft=220
   let moveObjectBottom=100
   let pullingForce=2
   let isGameOver = false
   let gap=430

   function gameStart(){
    moveObjectBottom-=pullingForce
    moveObject.style.bottom=moveObjectBottom+'px'
    moveObject.style.left=moveObjectLeft +'px'


   }

   let gametimerId=setInterval(gameStart,20)

   function control(e){
       if(e.keyCode==32){
           moveUp()
       }
   }
   
   function moveUp(){
       if(moveObjectBottom<490)
       moveObjectBottom+=50
       moveObject.style.bottom=moveObjectBottom+'px'

   }

   document.addEventListener('keyup',control)
   
   function generateBlock(){
       let blockLeft=500
       let randomHeight=Math.random()*60
       let blockBottom=randomHeight
    //    let randomHeight2=Math.random()*90
    //    let topBlockBottom=randomHeight2
       const block=document.createElement('div')
       const topblock=document.createElement('div')
       if(!isGameOver){ block.classList.add('block')
       topblock.classList.add('topBlock')
        } 
       mainArea.appendChild(block)
       mainArea.appendChild(topblock)
       block.style.left = blockLeft + 'px'
       topblock.style.left=blockLeft +'px'
       block.style.bottom = blockBottom +'px'
       topblock.style.bottom=blockBottom +gap+'px'

       function moveBlock(){
           blockLeft-=2
           block.style.left=blockLeft +'px'
           topblock.style.left=blockLeft + 'px'

           if(blockLeft===-60){
               clearInterval(timerId)
               mainArea.removeChild(block)
               mainArea.removeChild(topblock)
           }
           if(
               blockLeft>200 && blockLeft<280 && moveObjectLeft === 220 && (moveObjectBottom < blockBottom + 153 || moveObjectBottom > blockBottom +gap-200)||
               moveObjectBottom===0
               ){
               gameOver()
               clearInterval(timerId)
           }

       }
       let timerId=setInterval(moveBlock,20)
       if(!isGameOver) setTimeout(generateBlock,3000)

   }

   generateBlock()


   function gameOver(){
        
        moveObject.classList.add('bird2')
        document.getElementById('tune').play();
        // var audio = new Audio('../tune.mp3');
        // audio.play();
        // // audio.play();

        clearInterval(gametimerId)
    
       isGameOver=true
       document.removeEventListener('keyup',control)


   }
   



})