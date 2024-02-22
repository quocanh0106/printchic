import toast from 'react-hot-toast'

const openInNewTab = (url) => {
    // Checking if 'window' is defined to avoid errors during server-side rendering
    if (typeof window !== "undefined" && url) {
        window.open(url, "_blank", "noopener,noreferrer");
    } else {
        toast.error('This function is under maintenance', {
            duration: 2000
        })
    }
};

export {
    openInNewTab,
}