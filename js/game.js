
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


const Game = {
    height: 600,
    name:   'squares 3',
    byline: 'by Brandtley McMinn',
    offset: 30,
    state:  null,
    width:  800,
}



const SCENE_HOME      = 0
const SCENE_HELP      = 1
const SCENE_GAME      = 2
const SCENE_GAMEOVER  = 3




const COLOR_BLACK   = '#000000'
const COLOR_RED     = '#CD3131'
const COLOR_WHITE   = '#FFFFFF'
const DIR_X         = 'x'
const DIR_Y         = 'y'
const SHAPE_CIRCLE  = 'circle'
const SHAPE_SQUARE  = 'square'
const TIME_SECONDS  = 60

let SPAWN_MAX_X     = Game.width + Game.offset
let SPAWN_MAX_Y     = Game.height + Game.offset
let SPAWN_MIN_X     = 0 - Game.offset
let SPAWN_MIN_Y     = 0 - Game.offset

let SOUND_MAIN_LOOP
let SOUND_LOFI_LOOP

let STATE_PLAYING_LOFI = true


let PlayButton




class Shape {

    dir     = ''
    vector  = 0
    x       = 0
    y       = 0
    speed   = 1
    scale   = 10
    shape   = ''


    constructor() {
        this.init()
    }


    init() {

        this.dir    = (Math.random() > 0.5) ? DIR_X         : DIR_Y
        this.shape  = (Math.random() < 0.2) ? SHAPE_CIRCLE  : SHAPE_SQUARE
        this.color  = (Math.random() < 0.4) ? COLOR_RED     : COLOR_BLACK
        this.speed  = round(Math.random() * 2, 3)
        this.scale  *= randomInt(5)

        this.vector = (Math.random() > 0.5) ? -1 : 1

        if (this.dir === DIR_X) {
            this.x = this.vector < 0 ? SPAWN_MIN_X : SPAWN_MAX_X
            this.y = randomInt(Game.height)

        } else {
            this.x = randomInt(Game.width)
            this.y = this.vector < 0 ? SPAWN_MIN_Y : SPAWN_MAX_Y
        }

    }


    draw() {

        noStroke()
        fill(this.color)

        if (this.shape === SHAPE_SQUARE) {
            square(this.x, this.y, this.scale)
        } else {
            circle(this.x, this.y, this.scale)
        }

    }


    update() {

        if (this.dir === DIR_X) { this.x += deltaTime * this.speed * this.dir }
        else { this.y += deltaTime * this.speed * this.dir }

        return this

    }

}



function Scene() {
    this.name = ''
    this.setup = function() {}
    this.destroy = function() {}
    this.draw = function() {}
    this.mousePressed = function() {}
    this.keyDown = function() {}
    this.keyPressed = function() {}
}

// class HomeScene extends Scene {

//     shapes = []
//     title
//     subtitle
//     helpButton
//     playButton

//     setup() {

//         console.debug('setup', this.name)

//         this.shapes = new Array(20).fill({}).map(el => new Shape())

//         this.title = createElement('h1', Game.name)
//         this.title.position(Game.width / 2 - 200, Game.height / 2 - 200)

//         this.subtitle = createElement('p', Game.byline)
//         this.subtitle.position(this.title.x + 80, this.title.y + 80)

//         this.playButton = createButton('play')
//         this.playButton.position(Game.width / 2, Game.height / 3 * 2)
//         this.playButton.mousePressed(transitionScene.bind(this, SCENE_GAME))

//         this.helpButton = createButton('help')
//         this.helpButton.position(Game.width / 2, this.playButton.y + this.playButton.height + 5)
//         this.helpButton.mousePressed(transitionScene.bind(this, SCENE_HELP))

//         toggleAudioTracks(true)
//     }



//     draw() {

//         console.debug('draw', this.shapes)

//         for (var i = this.shapes.length - 1; i >= 0; i--) {
//             this.shapes[i].update()
//             this.shapes[i].draw()
//         }

//     }

// }


// let SceneHomeScreen = new HomeScene()

let SceneHomeScreen = new Scene()

SceneHomeScreen.prototype.shapes        = []
SceneHomeScreen.prototype.title         = null
SceneHomeScreen.prototype.subtitle      = null
SceneHomeScreen.prototype.helpButton    = null
SceneHomeScreen.prototype.playButton    = null

SceneHomeScreen.prototype.setup = function() {

    this.shapes = new Array(20).fill({}).map(el => new Shape())

    this.title = createElement('h1', Game.name)
    this.title.position(Game.width / 2 - 200, Game.height / 2 - 200)

    this.subtitle = createElement('p', Game.byline)
    this.subtitle.position(this.title.x + 80, this.title.y + 80)

    this.playButton = createButton('play')
    this.playButton.position(Game.width / 2, Game.height / 3 * 2)
    this.playButton.mousePressed(transitionScene.bind(this, SCENE_GAME))

    this.helpButton = createButton('help')
    this.helpButton.position(Game.width / 2, this.playButton.y + this.playButton.height + 5)
    this.helpButton.mousePressed(transitionScene.bind(this, SCENE_HELP))

    toggleAudioTracks(true)
}


SceneHomeScreen.prototype.draw = function() {

    console.debug('draw', this.shapes)

    for (var i = this.shapes.length - 1; i >= 0; i--) {
        this.shapes[i].update()
        this.shapes[i].draw()
    }

}








let SceneHelpScreen     = new Scene()// = new Scene('help')
let SceneGameScreen     = new Scene()// = new Scene('game')
let SceneGameOverScreen = new Scene()// = new Scene('gameover')




const SCENES_LIST = [
    SceneHomeScreen,
    SceneHelpScreen,
    SceneGameScreen,
    SceneGameOverScreen,
]



// =============================================
//  P5 Runtime Methods
// =============================================


function preload() {
    SOUND_MAIN_LOOP = loadSound('audio/main-loop.mp3')
    SOUND_LOFI_LOOP = loadSound('audio/main-lofi.mp3')
}


function setup() {

    createCanvas(Game.width, Game.height)

    // setup audio
    SOUND_MAIN_LOOP.loop() // song is ready to play during setup() because it was loaded during preload
    SOUND_LOFI_LOOP.loop() // song is ready to play during setup() because it was loaded during preload

    transitionScene(SCENE_HOME)

    background(COLOR_WHITE)
}


function windowResized() {

}



function draw() {

    SCENES_LIST[Game.sceneId].draw()

}




function mousePressed() {

    SCENES_LIST[Game.sceneId].mousePressed()

}


function keyPressed() {

    SCENES_LIST[Game.sceneId].keyPressed()

}




function toggleAudioTracks(bool) {

    STATE_PLAYING_LOFI = !STATE_PLAYING_LOFI

    if (bool === true || bool === false) {
        STATE_PLAYING_LOFI = bool
    }

    let crossfadeDuration = 0.3

    SOUND_LOFI_LOOP.setVolume(Number(STATE_PLAYING_LOFI), crossfadeDuration)
    SOUND_MAIN_LOOP.setVolume(Number(!STATE_PLAYING_LOFI), crossfadeDuration)
}


function transitionScene(newSceneId) {

    if (Game.sceneId && Game.sceneId === newSceneId) { return }


    if (Game.sceneId) {
        SCENES_LIST[Game.sceneId].destroy()
    }

    Game.sceneId = newSceneId

    console.debug('SCENES_LIST[Game.sceneId]', SCENES_LIST[Game.sceneId])

    SCENES_LIST[Game.sceneId].setup()
}




// function mousePressed() {

//  STATE_PLAYING_LOFI = !STATE_PLAYING_LOFI

//  if (STATE_PLAYING_LOFI) {
//      SOUND_MAIN_LOOP.setVolume(0)
//      SOUND_LOFI_LOOP.setVolume(1)
//      background(255, 0, 0)

//  } else {
//      SOUND_MAIN_LOOP.setVolume(1)
//      SOUND_LOFI_LOOP.setVolume(0)
//      background(0, 255, 0)
//  }
// }








// ========================================
//  SCENE METHODS
// ========================================





// ========================================
//  HELPER METHODS
// ========================================

function randomInt(range = 1) {
    return Math.floor(Math.random() * range)
}



function outside(i, r1, r2) {

}

