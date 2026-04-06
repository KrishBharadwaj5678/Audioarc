let audio=document.querySelector("audio");
let show_Album=document.querySelector("img.show_album");
let musicName=document.querySelector("h1.musicName");
let musicArtist=document.querySelector("h2.musicArtist");
let pausebtn=document.querySelector("i.fa-play");
let playbtn=document.querySelector("i.fa-pause");
let backwardbtn=document.querySelector("i.fa-backward");
let forwardbtn=document.querySelector("i.fa-forward");
let startTime=document.querySelector("div.start-time");
let endTime=document.querySelector("div.end-time");
let progress=document.querySelector('input.range');

let value=0;
let k=1;

async function getMusic(value){
    data=await fetch("music.json");
    let jsData=await data.json();
    show_Album.src=jsData[value].albumImage;
    audio.src="Music/"+jsData[value].musicSrc;
    musicName.innerText=jsData[value].musicName;
    musicArtist.innerText=jsData[value].artist;
    audio.addEventListener("loadedmetadata",()=>{
       duration=audio.duration;
       let minutes=parseInt(duration/60);
       let seconds=parseInt(duration%60);
       startTime.innerText=`0:00`;
       endTime.innerText=`${minutes}:${seconds}`;
       progress.max=duration;
    })
}
getMusic(value);

// Pause to Play
pausebtn.addEventListener('click',(e)=>{
    if(k==1){
        pausebtn.style.display="none";
        playbtn.style.display="block";
        k=0;
        audio.play();

        if(audio.play()){
            // If audio is playing 
            // set progress max value to audio total duration
            let audDur=audio.duration;
            progress.max=audDur;
            setInterval(()=>{
                // Update Progress Values Every 1 second to audio currentTime
                progress.value=audio.currentTime;
                // This is used for updating minutes and second of music which is below progress bar 
                let timesecond=parseInt(audio.currentTime);
                let min=parseInt(timesecond/60);
                let second=parseInt(timesecond%60);
               
                if(second<10){
                 startTime.innerText=`${min}:0${second}`;
                }
                else{
                   startTime.innerText=`${min}:${second}`;
                }
            },1000)
        }
    }  
})

// When Changing the Range Bar
progress.addEventListener("change",()=>{
    // If audio is paused and user changes audio scroller then audio should not play.
    if(k==1){
        audio.pause();  
    }
    audio.currentTime=progress.value;
})

// Play to Pause
playbtn.addEventListener('click',()=>{
    if(k==0){
        pausebtn.style.display="block";
        playbtn.style.display="none";
        k=1;
        audio.pause();
    }
})

// Forward Button
forwardbtn.addEventListener('click',()=>{
    if(value>=0 && value<14){
        getMusic(++value);
        // If music is off i.e 1 and then clicking Forward button will not autoplay the audio
        if(k==1){
          audio.autoplay=false;
        }
        // If music is on i.e 0 and then clicking Forward button will autoplay the audio
        else{
          audio.autoplay=true;
         
        }
    }
    // If no more music in json data
    else{
        alert("End Of Playlist");
    }
})

// Backward Button
backwardbtn.addEventListener('click',()=>{
    if(value>0 && value<=14){
        getMusic(--value);
        // If music is off i.e 1 and then clicking backward button will not autoplay the audio
        if(k==1){
            audio.autoplay=false;
          }
        // If music is on i.e 0 and then clicking Backward button will autoplay the audio
        else{
            audio.autoplay=true;
        }
    }
    // If no more music in json data
    else{
        alert("End Of Playlist");
    }
})
