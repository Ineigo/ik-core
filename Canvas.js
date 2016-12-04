export default class Canvas {
    static canvas = null;
    static context = null;
    static create(canvas_tag_id) {
        const canvas = document.getElementById(canvas_tag_id);
        if(!canvas) throw new Error('Not element exists');
        Canvas.canvas = canvas;
        Canvas.context = canvas.getContext('2d');
        console.info('Context created from', "#" + canvas_tag_id);
        return Canvas.context;
    }
};