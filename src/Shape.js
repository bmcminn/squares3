
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from './colors.js'
import { randomInt } from './helpers.js'

const DIR_X         = 'x'
const DIR_Y         = 'y'
const SHAPE_CIRCLE  = 'circle'
const SHAPE_SQUARE  = 'square'


const SPAWN_MAX_X     = window.width + window.offset
const SPAWN_MAX_Y     = window.height + window.offset
const SPAWN_MIN_X     = 0 - window.offset
const SPAWN_MIN_Y     = 0 - window.offset


class Shape {

    constructor() {

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
        this.speed  = round(Math.random() * 2, 3)
        this.scale  *= randomInt(5)

        this.vector = (Math.random() > 0.5) ? -1 : 1

        if (this.dir === DIR_X) {
            this.x = this.vector < 0 ? SPAWN_MIN_X : SPAWN_MAX_X
            this.y = randomInt(window.height)

        } else {
            this.x = randomInt(window.width)
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

        if (this.dir === DIR_X) { this.x += window.deltaTime * this.speed * this.dir }
        else { this.y += deltaTime * this.speed * this.dir }

        return this

    }
}


export default Shape
