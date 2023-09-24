import IKCore from '../IKCore';
import Scene from '../objects/Scene';
import NodeRect from '../objects/NodeRect';
import Layer from '../objects/Layer';
import NodeImage from '../objects/NodeImage';
import NodeText from '../objects/NodeText';

export const runExample = () => {
  const core = new IKCore('canvas', true);

  const image2 = new NodeImage({
    position: core.vector2(400, 10),
    size: core.vector2(50, 50),
    scale: 0.2,
    filename: 'https://cards.scryfall.io/large/front/e/3/e3450882-d791-4172-b02a-ee7fdb36acfc.jpg?1673310369',
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

  const image = new NodeImage({
    position: core.vector2(100, 100),
    scale: 0.3,
    size: core.vector2(50, 50),
    angle: 45,
    filename: 'https://cards.scryfall.io/large/front/8/7/8736fd50-312e-47e2-8337-997c2acf48d9.jpg?1562615429',
    children: [
      new NodeRect({
        position: core.vector2(0, 0),
        size: core.vector2(20, 20),
        color: 'red',
      }),
    ],
  });

  core.add_layer('back', new Layer(core.size, -1, core.canvas_offset), false);

  core.add_scene(
    'rect',
    new Scene({
      core,
      init(scene) {
        console.log('init', this, core.get_layer('main'));
        scene.add(image);
        scene.add(image2);
        scene.add(text);
        core.get_layer('back').draw(back);
      },
      update() {
        image2.rotate(1);
        text.text = 'Time: ' + new Date().toLocaleString();
      },
    })
  );

  core.start('rect');
};
