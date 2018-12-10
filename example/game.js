import IKCore from '../IKCore';
import Scene from '../objects/Scene';
import NodeRect from '../objects/NodeRect';
import Layer from '../objects/Layer';
import NodeImage from '../objects/NodeImage';
import NodeText from '../objects/NodeText';

const core = new IKCore('canvas', true);

const rect = new NodeRect({
    position: core.vector2(10, 20),
    size: core.vector2(20, 20),
    color: 'red',
});

const image = new NodeImage({
    position: core.vector2(100, 100),
    scale: 0.3,
    angle: 45,
    filename: 'https://img.scryfall.com/cards/large/ru/soi/243a.jpg',
});

const image2 = new NodeImage({
    position: core.vector2(400, 10),
    scale: 0.2,
    filename: 'https://img.scryfall.com/cards/large/front/9/9/9937507f-3944-4d7e-a012-0f7309837b89.jpg',
});

const text = new NodeText({
    position: core.vector2(10, core.size.y - 10),
    size: core.vector2(500, 36),
    color: '#555',
});

const back = new NodeRect({
    position: core.vector2(0, 0),
    size: core.size,
});

core.add_layer('back', new Layer(core.size, -1, core.canvas_offset), false);

core.add_scene(
    'rect',
    new Scene({
        core,
        init() {
            console.log(this, core.get_layer('main'));
            this.add(rect);
            this.add(image);
            this.add(image2);
            this.add(text);
            core.get_layer('back').draw(back);
        },
        update() {
            image2.rotate(1);
            text.text = 'Time: ' + new Date().toLocaleString();
        },
    })
);

core.start('rect');
