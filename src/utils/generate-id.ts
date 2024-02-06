import { v4 as uuidv4 } from 'uuid';
import ShortId from 'shortid';
const longId = () => {
    return uuidv4();
};

const shortId = () => {
    return ShortId.generate();
};

export { longId, shortId };
