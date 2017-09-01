export default class Canvas {
    static canvas = null;
    static context = null;
    static create2d(canvas_tag_id = '') {
        const canvas = document.getElementById(canvas_tag_id);
        if(!canvas) throw new Error('Not element exists');
        Canvas.canvas = canvas;
        Canvas.context = canvas.getContext('2d');
        console.info('2d Context created from', "#" + canvas_tag_id);
        return Canvas.context;
    }
};