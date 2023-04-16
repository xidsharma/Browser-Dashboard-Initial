import { useEffect, useState } from "react";

export default function TabIcon() {
    const [isDarkTheme, setIsDarkTheme] = useState(true)

    useEffect(() => {
        setIsDarkTheme(getIsDarkTheme())
    })

    const getIsDarkTheme = () => {
        const bodyBackgroundColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
        const rgbValues = bodyBackgroundColor.match(/\d+/g).map(Number);
        const relativeLuminance = (0.2126 * rgbValues[0] + 0.7152 * rgbValues[1] + 0.0722 * rgbValues[2]) / 255;

        if (relativeLuminance < 0.5) {
            return true;
        } else {
            return false;
        }
    }

    return isDarkTheme
        ? <link rel="icon" href="/tab-icon-light.svg" />
        : <link rel="icon" href="/tab-icon.svg" />
}


