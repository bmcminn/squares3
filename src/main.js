
// [ ] - ability to collect black squares for points
// [ ] - ability to generate black shapes on screen (random x,y speed determines starting X,Y) [x,y,dir,scale,color]
// [ ] - ability to generate red shapes on screen (random x,y speed determines starting X,Y) [x,y,dir,scale,color]
// [ ] - ability to score +1 point per second
// [ ] - convert audio files to .mp3 for filesize reasons
// [ ] - define class for player
// [ ] - define class for shape (circle, square)
// [ ] - game intensity multiplier, increases number of shapes, speed
// [ ] - game initial state: run homescreen
// [ ] - game state 2: run helpscreen
// [ ] - game state 3: run game runtime
// [ ] - game state 4: run gameover screen
// [ ] - ability to toggle between scene states
// [ ] -
// [x] - able to play audio
// [x] - able to toggle audio between main and lofi loop


// @SAUCE: https://p5js.org/examples/sound-sound-effect.html
// @SAUCE: https://p5js.org/examples/sound-sound-effect.html

// import 'app.css'

import p5 from 'p5'
window.p5 = p5
// import 'p5/lib/addons/p5.sound'
// import { preload, setup, update, draw, windowResized } from './sketch'

import { COLOR_WHITE } from './colors.js'
import { randomInt, transitionScene } from './helpers.js'


window.offset   = 30
window.height   = 600
window.width    = 800

window.Game = {
    name:    'squares 3',
    byline:  'by Brandtley McMinn',
    offset:  30,
    state:   null,
    height:  600,
    width:   800,

    SCENE_HOME: 0,
    SCENE_HELP: 1,
    SCENE_GAME: 2,
    SCENE_GAMEOVER: 3,

    ACTIVE_SCENE_ID: null,

    SOUND_LOFI_LOOP: null,
    SOUND_MAIN_LOOP: null,

    STATE_PLAYING_LOFI: true,
}


import SceneGameOverScreen from './SceneGameOverScreen.js'
import SceneGameScreen from './SceneGameScreen.js'
import SceneHelpScreen from './SceneHelpScreen.js'
import SceneHomeScreen from './SceneHomeScreen.js'



window.SCENES_LIST = [
    new SceneHomeScreen('Home Screen'),
    new SceneHelpScreen('Help Screen'),
    new SceneGameScreen('Game Screen'),
    new SceneGameOverScreen('Game Over Screen'),
]


// =============================================
//  P5 Runtime Methods
// =============================================

window.preload = function() {
    window.Game.SOUND_MAIN_LOOP = loadSound('assets/audio/main-loop.mp3')
    window.Game.SOUND_LOFI_LOOP = loadSound('assets/audio/main-lofi.mp3')
}


window.setup = function() {

    window.app = createCanvas(window.Game.width, window.Game.height)

    // setup audio
    window.Game.SOUND_MAIN_LOOP.setVolume(0, 0)
    window.Game.SOUND_LOFI_LOOP.setVolume(0, 0)
    window.Game.SOUND_MAIN_LOOP.loop() // song is ready to play during setup() because it was loaded during preload
    window.Game.SOUND_LOFI_LOOP.loop() // song is ready to play during setup() because it was loaded during preload


    let event = { target: { dataset: { sceneId: window.Game.SCENE_HOME }}}

    transitionScene(event)

    background(COLOR_WHITE)
}


window.windowResized = function() {

}


window.draw = function() {

    window.SCENES_LIST[window.Game.ACTIVE_SCENE_ID].draw()

}


window.mousePressed = function(event) {

    window.SCENES_LIST[window.Game.ACTIVE_SCENE_ID].mousePressed(event)

}


window.keyPressed = function() {

    window.SCENES_LIST[window.Game.ACTIVE_SCENE_ID].keyPressed()

}


window.toggleAudioTracks = function(bool) {

    window.Game.STATE_PLAYING_LOFI = !window.Game.STATE_PLAYING_LOFI

    if (bool === true || bool === false) {
        window.Game.STATE_PLAYING_LOFI = bool
    }

    let crossfadeDuration = 0.2

    window.Game.SOUND_LOFI_LOOP.setVolume(Number(window.Game.STATE_PLAYING_LOFI), crossfadeDuration)
    window.Game.SOUND_MAIN_LOOP.setVolume(Number(!window.Game.STATE_PLAYING_LOFI), crossfadeDuration)
}
