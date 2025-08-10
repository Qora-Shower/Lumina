// Haptic feedback (vibration) service

function triggerVibration(pattern = 50) {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (error) {
            console.warn("Could not trigger vibration:", error);
        }
    } else {
        console.log("Vibration API not supported on this browser.");
    }
}
