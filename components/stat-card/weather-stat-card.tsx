import { WeatherStatCardProps } from './weather-stat-card-props'
import styles from './weather-stat-card.module.css'

export default function WeatherStatCard(props: WeatherStatCardProps) {
    return (
        <div className={styles.layout}>
            <div className={styles.iconContainer}>
                <img className="icon" src={props.icon} alt="Logo" />
            </div>
            <div className={styles.textContainer}>
                <p className={`${styles.value} ${props.value.length > 5 ? styles.small : ''}`}>{props.value}</p>
                <p className={styles.label}>{props.label}</p>
            </div>
        </div>
    )
}