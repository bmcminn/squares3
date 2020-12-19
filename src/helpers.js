
// ========================================
//  HELPER METHODS
// ========================================

export function randomInt(range = 1) {
    return Math.floor(Math.random() * range)
}



export function isOutsideBounds(x, y, xmin, ymin, xmax, ymax) {
    return x < xmin || xmax < x || y < ymin || ymax < y
}



export function transitionScene(event) {

    let newSceneId = event?.target?.dataset?.sceneId ?? -1

    if (event?.buttons && event.buttons > 1) { return }

    if (newSceneId < 0) { return false }

    if (window.Game?.ACTIVE_SCENE_ID === newSceneId) { return }

    if (SCENES_LIST[window.Game.ACTIVE_SCENE_ID]) {
        SCENES_LIST[window.Game.ACTIVE_SCENE_ID].destroy()
    }

    window.Game.ACTIVE_SCENE_ID = newSceneId

    SCENES_LIST[window.Game.ACTIVE_SCENE_ID].setup()

    return true
}


export function isArray(value) { return Array.isArray(value) }
export function isBool(value) { return value === true || value === false }
export function isNull(value) { return value === null }
export function isNumber(value) { return (typeof value) === 'number'}
export function isString(value) { return (typeof value) === 'string'}
export function isUndefined(value) { return value === undefined }


