import {v4 as uuidv4} from 'uuid';
export class NoteData {
    constructor(title, content) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
    }
}
