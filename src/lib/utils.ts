export function formatDateTimeIST(dateString: string) {
    return new Date(dateString).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDateIST(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

export function formatTimeIST(dateString: string) {
    return new Date(dateString).toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function getISTDate(dateString: string) {
    const date = new Date(dateString);
    return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}
