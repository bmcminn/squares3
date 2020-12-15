
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
import Scene from './Scene.js'
import Shape from './Shape.js'
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from './colors.js'
import { randomInt, transitionScene } from './helpers.js'


window.ACTIVE_SCENE_ID = null


const Game = {
    name:   'squares 3',
    byline: 'by Brandtley McMinn',
    offset: 30,
    state:  null,
    height:  600,
    width:  800,
}






const SCENE_HOME      = 0
const SCENE_HELP      = 1
const SCENE_GAME      = 2
const SCENE_GAMEOVER  = 3



let SOUND_MAIN_LOOP
let SOUND_LOFI_LOOP

let STATE_PLAYING_LOFI = true


class SceneHomeScreen extends Scene {

    constructor(...args) {
        super(...args)

        this.shapes        = null
        this.title         = null
        this.subtitle      = null
        this.helpButton    = null
        this.playButton    = null
    }

    setup() {

        this.shapes = this.shapes ?? new Array(20).fill({}).map(el => new Shape())

        this.title = this.title ?? createElement('h1', Game.name)
        this.title.show()
        this.title.position(window.width / 2 - 200, window.height / 2 - 200)

        this.subtitle = this.subtitle ?? createElement('p', Game.byline)
        this.subtitle.show()
        this.subtitle.position(this.title.x + 80, this.title.y + 80)

        this.playButton = this.playButton ?? createButton('play')
        this.playButton.show()
        this.playButton.position(window.width / 2, window.height / 3 * 2)
        this.playButton.mousePressed(transitionScene.bind(null, SCENE_GAME))

        this.helpButton = this.helpButton ?? createButton('help')
        this.helpButton.show()
        this.helpButton.position(window.width / 2, this.playButton.y + this.playButton.height + 5)
        this.helpButton.mousePressed(transitionScene.bind(null, SCENE_HELP))

        toggleAudioTracks(true)
    }

    destroy() {
        this.title.hide()
        this.subtitle.hide()
        this.playButton.hide()
        this.helpButton.hide()
    }

    draw() {

        for (var i = this.shapes.length - 1; i >= 0; i--) {
            this.shapes[i].update()
            this.shapes[i].draw()
        }

    }
}


class SceneHelpScreen extends Scene {

    constructor(...args) {
        super(...args)

        this.backButton = null
        this.directions = null
    }

    setup() {
        this.directions = this.directions ?? window.select('#directions')
        this.directions.show()
        this.directions.position(window.width / 2, window.height / 2)

        this.backButton = this.backButton ?? createButton('back')
        this.backButton.show()
        this.backButton.position(window.width / 2, window.height / 2)
        this.backButton.mousePressed(transitionScene.bind(null, SCENE_HOME))
    }


    destroy() {
        this.backButton.hide()
        this.directions.hide()
    }


    draw() {


    }
}


class SceneGameScreen extends Scene {

    constructor(...args) {
        super(...args)

    }
}


class SceneGameOverScreen extends Scene {

    constructor(...args) {
        super(...args)

    }
}


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
    SOUND_MAIN_LOOP = loadSound('assets/audio/main-loop.mp3')
    SOUND_LOFI_LOOP = loadSound('assets/audio/main-lofi.mp3')
}


window.setup = function() {

    window.app = createCanvas(Game.width, Game.height)

    // setup audio
    SOUND_MAIN_LOOP.setVolume(0, 0)
    SOUND_LOFI_LOOP.setVolume(0, 0)
    SOUND_MAIN_LOOP.loop() // song is ready to play during setup() because it was loaded during preload
    SOUND_LOFI_LOOP.loop() // song is ready to play during setup() because it was loaded during preload

    transitionScene(SCENE_HOME)

    background(COLOR_WHITE)
}


window.windowResized = function() {

}


window.draw = function() {

    window.SCENES_LIST[window.ACTIVE_SCENE_ID].draw()

}


window.mousePressed = function() {

    window.SCENES_LIST[window.ACTIVE_SCENE_ID].mousePressed()

}


window.keyPressed = function() {

    window.SCENES_LIST[window.ACTIVE_SCENE_ID].keyPressed()

}


window.toggleAudioTracks = function(bool) {

    STATE_PLAYING_LOFI = !STATE_PLAYING_LOFI

    if (bool === true || bool === false) {
        STATE_PLAYING_LOFI = bool
    }

    let crossfadeDuration = 0.2

    SOUND_LOFI_LOOP.setVolume(Number(STATE_PLAYING_LOFI), crossfadeDuration)
    SOUND_MAIN_LOOP.setVolume(Number(!STATE_PLAYING_LOFI), crossfadeDuration)
}
