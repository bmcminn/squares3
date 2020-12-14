
// ========================================
//  HELPER METHODS
// ========================================

export function randomInt(range = 1) {
    return Math.floor(Math.random() * range)
}



export function outside(i, r1, r2) {

}



export function transitionScene(newSceneId) {

    if (window.ACTIVE_SCENE_ID && window.ACTIVE_SCENE_ID === newSceneId) { return }

    if (SCENES_LIST[window.ACTIVE_SCENE_ID]) {
        console.debug('transition::destroy', SCENES_LIST[window.ACTIVE_SCENE_ID].name)
        SCENES_LIST[window.ACTIVE_SCENE_ID].destroy()
    }

    window.ACTIVE_SCENE_ID = newSceneId

    console.debug('transition::setup', SCENES_LIST[window.ACTIVE_SCENE_ID].name)

    SCENES_LIST[window.ACTIVE_SCENE_ID].setup()
}
