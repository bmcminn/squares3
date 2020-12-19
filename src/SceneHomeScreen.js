import Scene from './Scene.js'
import Shape from './Shape.js'
import { randomInt, transitionScene, isOutsideBounds } from './helpers.js'


class SceneHomeScreen extends Scene {

    constructor(...args) {
        super(...args)

        this.shapes     = null
        this.title      = null
        this.subtitle   = null
        this.helpButton = null
        this.playButton = null
        this.interval   = null
    }

    setup(state) {

        this.shapes = this.shapes ?? new Array(20).fill({}).map(el => new Shape())

        this.initInterval()


        this.title = this.title ?? createElement('h1', window.Game.name)
        this.title.show()
        this.title.addClass('page-title')
        this.title.position(20, 0)


        this.subtitle = this.subtitle ?? createElement('p', window.Game.byline)
        this.subtitle.show()
        this.subtitle.position(this.title.x + 125, this.title.y + 130)


        this.playButton = this.playButton ?? createButton('play')
        this.playButton.show()
        this.playButton.addClass('scene-button')
        this.playButton.position(window.Game.width / 2, window.Game.height / 5 * 3)
        // this.playButton.mousePressed(transitionScene.bind(null, window.Game.SCENE_GAME))
        this.playButton.elt.dataset.sceneId = window.Game.SCENE_GAME


        this.helpButton = this.helpButton ?? createButton('help')
        this.helpButton.show()
        this.helpButton.addClass('scene-button')
        this.helpButton.position(window.Game.width / 2, this.playButton.y + this.playButton.height + 60)
        this.helpButton.elt.dataset.sceneId = window.Game.SCENE_HELP
        // this.helpButton.mousePressed(transitionScene.bind(null, window.Game.SCENE_HELP))

        toggleAudioTracks(true)
    }

    destroy() {
        this.title.hide()
        this.subtitle.hide()
        this.playButton.hide()
        this.helpButton.hide()

        window.clearInterval(this.interval)
    }


    initInterval(duration=250) {
        if (this.interval) {
            window.clearInterval(this.interval)
        }

        this.interval = window.setInterval(this.addShape.bind(this), duration)
    }


    addShape() {

        let buffer = 50

        this.shapes = this.shapes.filter(el => {
            return !isOutsideBounds(el.x, el.y, -buffer, -buffer, 800+buffer, 600+buffer)
        })

        this.shapes.push(new Shape())
    }


    draw() {

        clear()

        for (var i = this.shapes.length - 1; i >= 0; i--) {
            this.shapes[i].draw()
        }

        fill('rgba(255,255,255,0.5)')
        rect(0,0, 800, 600)
    }


    mousePressed(event) {

        if (transitionScene(event)) { return }


        console.debug('scene home screen @ mousePressed', event)

    }
}


export default SceneHomeScreen
