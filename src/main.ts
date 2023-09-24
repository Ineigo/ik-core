import { runExample } from './example/game';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="canvas">

  </div>
`;

runExample();
