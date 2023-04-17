import { useContext, useEffect, useState } from "react";
import styles from "./notes-card.module.css";
import { EnvironmentContext } from "../../pages/_app";

export default function NotesCard() {
    const noteService = useContext(EnvironmentContext).environment.noteService;
    const [notes, setNotes] = useState<string>("Notes here");

    useEffect(() => {
        const getNote = async () => {
            noteService.getNote().then((note) => {
                if (note.length > 0) {
                    setNotes(note);
                }
            });
        }
        getNote()
    }, [notes]);

    function onNotesFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
        if (e.target.value == "Notes here") {
            e.target.value = "";
        }
    }

    async function onNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setNotes(e.target.value);
        noteService.setNote(e.target.value)
    }

    return <textarea value={notes} className={styles.headerNotes} onChange={onNotesChange} onFocus={onNotesFocus} />
}