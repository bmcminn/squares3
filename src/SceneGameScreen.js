import Scene from './Scene.js'
import Shape from './Shape.js'
import { randomInt, transitionScene } from './helpers.js'

class SceneGameScreen extends Scene {

    constructor(...args) {
        super(...args)

    }

    setup() {

        this.shapes = this.shapes ?? new Array(20).fill({}).map(el => new Shape())

        toggleAudioTracks()
    }


    draw() {

        clear()

        for (var i = this.shapes.length - 1; i >= 0; i--) {
            this.shapes[i].draw()
        }
    }



    mousePressed(event) {

        if (transitionScene(event)) { return }


        console.debug('scene home screen @ mousePressed', event)

    }

}


export default SceneGameScreen
