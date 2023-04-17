import { useEffect, useState } from "react";
import styles from "./date-time-label.module.css";

export default function DateTime() {
    const [date, setDate] = useState<string>(null);
    const [time, setTime] = useState<string>(null);

    useEffect(
        () => {
            const [date, time] = getDateTimeString(new Date())
            setDate(date)
            setTime(time)

            const timer = setInterval(() => {
                const [newDate, newTime] = getDateTimeString(new Date())

                if (newDate !== date) {
                    setDate(newDate)
                }
                setTime(newTime)
            }, 1000);

            return () => clearInterval(timer);
        }
    )

    return <div className={styles.dateTimeContainer}>
        <p className={styles.time}>{time}</p>
        <p className={styles.date}>{date}</p>
    </div>
}

function getDateTimeString(date: Date): [string, string] {
    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'long' });
    const hour = date.getHours();
    const minute = date.getMinutes();
    const timeOfDay = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    const seconds = date.getSeconds()

    return [`${dayOfWeek} ${dayOfMonth} ${month}`, `${hour12}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}${timeOfDay}`];
}