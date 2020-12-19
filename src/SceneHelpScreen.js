import Scene from './Scene.js'
import { randomInt, transitionScene } from './helpers.js'


class SceneHelpScreen extends Scene {

    constructor(...args) {
        super(...args)

        this.playerRotate = 0

        this.backButton = null
        this.directions = null
        this.title      = null
        this.player     = null
    }

    setup() {

        this.title = this.title ?? createElement('h2', 'help')
        this.title.show()
        this.title.position(20, 0)
        this.title.addClass('page-title')

        this.directions = this.directions ?? window.select('#directions')
        this.directions.show()
        this.directions.position(window.width / 2, window.height / 2)

        this.backButton = this.backButton ?? createButton('back')
        this.backButton.show()
        this.backButton.position(window.width / 2, window.height / 2)
        this.backButton.addClass('scene-button')
        this.backButton.elt.dataset.sceneId = window.Game.SCENE_HOME

        // this.backButton.mousePressed(transitionScene.bind(null, window.Game.SCENE_HOME))
    }


    destroy() {
        this.backButton.hide()
        this.directions.hide()
        this.title.hide()
        // this.player.hide()
    }



    draw() {
        clear()

        this.drawPlayer()
        this.drawPowerDown()
    }


    drawPlayer() {
        push()
        this.playerRotate += (window.deltaTime * 0.00165) //  + window.deltaTime / 2
        translate(30, 300)
        rotate(this.playerRotate)
        fill(0,0,0)
        rectMode(window.CENTER)
        square(0, 0, 30)
        pop()
    }

    drawPowerDown() {
        push()
        translate(30, 350)
        this.playerRotate += (window.deltaTime * 0.00165) //  + window.deltaTime / 2
        rotate(this.playerRotate)
        fill(0,0,0)
        rectMode(window.CENTER)
        square(0, 0, 30)
        pop()
    }

    mousePressed(event) {

        if (transitionScene(event)) { return }


        console.debug('scene home screen @ mousePressed', event)

    }
}


export default SceneHelpScreen
