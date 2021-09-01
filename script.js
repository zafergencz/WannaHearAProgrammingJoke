const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Diasble/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    console.log('tellMe', joke);
    VoiceRSS.speech({
        key: 'a4f3260c343f4e7f9e9449ce43cd11c4',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3', 
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//  Get jokes from joke api
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    }catch(error){
        console.log('getJokes', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

