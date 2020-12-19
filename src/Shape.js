
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from './colors.js'
import { randomInt, isOutsideBounds } from './helpers.js'

const DIR_X         = 'x'
const DIR_Y         = 'y'
const SHAPE_CIRCLE  = 'circle'
const SHAPE_SQUARE  = 'square'


const offset = 30
const width = 800
const height = 600


const SPAWN_MIN_X = 0 - offset
const SPAWN_MIN_Y = 0 - offset
const SPAWN_MAX_X = width + offset
const SPAWN_MAX_Y = height + offset



class Shape {

    constructor(state) {

        this.dir     = ''
        this.vector  = 0
        this.x       = 0
        this.y       = 0
        this.speed   = 1
        this.scale   = 10
        this.shape   = ''

        this.init()
    }


    init() {

        this.dir    = (Math.random() > 0.5) ? DIR_X         : DIR_Y
        this.shape  = (Math.random() < 0.2) ? SHAPE_CIRCLE  : SHAPE_SQUARE
        this.color  = (Math.random() < 0.4) ? COLOR_RED     : COLOR_BLACK
        this.speed  = round(Math.random(), 3)
        this.scale  *= randomInt(5)

        this.vector = (Math.random() > 0.5) ? -1 : 1

        if (this.dir === DIR_X) {
            this.x = this.vector > 0 ? SPAWN_MIN_X : SPAWN_MAX_X
            this.y = randomInt(window.height)

        } else {
            this.x = randomInt(window.width)
            this.y = this.vector > 0 ? SPAWN_MIN_Y : SPAWN_MAX_Y
        }

    }


    draw() {

        this.update()

        push()
        noStroke()

        translate(this.x, this.y)

        fill(this.color)

        if (this.shape === SHAPE_SQUARE) {
            square(0, 0, this.scale)
        } else {
            circle(0, 0, this.scale)
        }
        pop()

    }


    update() {

        let deltaT = Math.floor(window.deltaTime)

        let move = deltaT * this.speed * this.vector

        if (this.dir === DIR_X) {
            this.x += move
        } else {
            this.y += move
        }
    }
}


export default Shape
