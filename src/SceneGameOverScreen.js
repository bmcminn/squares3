import Scene from './Scene.js'
import { randomInt, transitionScene } from './helpers.js'


class SceneGameOverScreen extends Scene {

    constructor(...args) {
        super(...args)

    }


    mousePressed(event) {

        if (transitionScene(event)) { return }

    }
}


export default SceneGameOverScreen
