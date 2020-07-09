import observer from './observer';

import pageHidden from './pageHidden';

export default pageHidden((time: number) => observer('fcp', time));
