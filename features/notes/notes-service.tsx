import { KeyValueStore } from "../../storage/key-value-store";

export interface NoteService {
    getNote(): Promise<string>;
    setNote(note: string): Promise<void>;
}

export class NoteServiceImpl implements NoteService {

    constructor(
        private keyValueStore: KeyValueStore,
    ) {
    }

    async getNote(): Promise<string> {
        return this.keyValueStore.get('note') || '';
    }

    async setNote(note: string): Promise<void> {
        this.keyValueStore.set('note', note);
    }
}