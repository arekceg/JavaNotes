import React from "react";

const Greetings = () => {
    const timeConfig = {
        morning: { textColor: "red", text: "Morning", endHour: 12 },
        afternoon: { textColor: "green", text: "Afternoon", endHour: 18 },
        evening: { textColor: "blue", text: "Evening", endHour: 24 }
    };

    const getTimeOfDay = () => {
        const currentHour = new Date().getHours();
        return Object.values(timeConfig).find(period => currentHour < period.endHour)
            || timeConfig.evening;
    };

    const { textColor, text: message } = getTimeOfDay();

    return <h2 className="heading" style={{ color: textColor }}>Good {message}!</h2>;
};

export default Greetings;
