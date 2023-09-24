const _player = document.querySelector('.player')
const _playBtn = document.querySelector('#play')
const _nextBtn = document.querySelector('#nextplay')
const _prevBtn = document.querySelector('#prevplay')
const _song = document.querySelector('#song')
const _progressContainer = document.querySelector('.progress-container')
const _progress = document.querySelector('#progress')
const _img = document.querySelector('#img>img')
const _title = document.querySelector('#title')
const _video = document.getElementById('video')
const _endDuration = document.getElementById('end')
const _startDuration = document.getElementById('start')

// song title

const _songs = ['The Weeknd - After Hours', 'The Weeknd - Is There Someone Else', 'Travis Scott - FRANCHIS' , 'Travis Scott -  HIGHEST IN THE ROOM']


//keep track of songs

let _songIndex = 0

// load song info

loadSong(_songs[_songIndex])

// updata song details

function loadSong(song) {
    _title.innerHTML = song
    _song.src = `assets/media/music/${song}.mp3`
    _img.src = `assets/media/images/${song}.jpg`
    _video.src = `assets/media/video/${song}.mp4`

}

function playSong() {
    _player.classList.add('play')

    _playBtn.querySelector('i.bx').classList.remove('bx-play')
    _playBtn.querySelector('i.bx').classList.add('bi-pause')

    _song.play()
    _video.play()

    _video.classList.remove('blur')
}

function pauseSong() {
    _player.classList.remove('play')

    _playBtn.querySelector('i.bx').classList.add('bx-play')
    _playBtn.querySelector('i.bx').classList.remove('bi-pause')

    _song.pause()
    _video.pause()

    _video.classList.add('blur')
}

function updateProgress(e) {
    setInterval(() => {
        let min = Math.floor(song.duration / 60);
        let sec = Math.floor(song.duration % 60);

        let curMin = Math.floor(song.currentTime / 60);
        let curSec = Math.floor(song.currentTime % 60);

        if (sec < 10) {
            sec = "0" + sec;
        }
        if (curSec < 10) {
            curSec = "0" + curSec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (curMin < 10) {
            curMin = "0" + curMin;
        }

        _endDuration.innerHTML = min + ":" + sec;
        _startDuration.innerHTML = curMin + ":" + curSec;
    }, 200);

    // let _duration = (e.srcElement.duration)/60
    // _durationMin = parseInt(_duration)
    // _durationSec = _duration.toPrecision(3)
    // _endDuration.innerHTML = `${_durationMin}:${_durationSec}`
}

if (_song.play()) {
    setInterval(() => {
        _progress.value = _song.currentTime;
        if (_song.currentTime == _song.duration) {
            nextSong();
        }
    }, 400);
}

_progress.onchange = function () {
    // playSong()
    _song.play();
    _song.currentTime = _progress.value;
};

_song.onloadedmetadata = function(){
    _progress.max = _song.duration
    _progress.value = _song.currentTime
}

function prevSong() {
    _songIndex--

    if (_songIndex < 0) {
        _songIndex = _songs.length - 1
    }

    loadSong(_songs[_songIndex])
    playSong()
}

function nextSong() {
    _songIndex++

    if (_songIndex > _songs.length - 1) {
        _songIndex = 0
    }

    loadSong(_songs[_songIndex])
    playSong()
}

//add event listener

_playBtn.addEventListener('click', () => {
    const isPlaying = _player.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


//change song

_prevBtn.addEventListener('click', prevSong)
_nextBtn.addEventListener('click', nextSong)

_song.addEventListener('timeupdate', updateProgress)
_song.addEventListener('ended' , nextSong)