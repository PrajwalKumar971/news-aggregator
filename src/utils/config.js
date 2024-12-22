import moment from "moment";

export const header = (category) => `${category} Headlines`;
export const summary = "Channel and PublishedAt";
export const newsChannel = (channel) => `${channel}`;
export const lastUpdate = (published) => `${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`;
export const arrowImage = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
    </svg>
);
export const noResultFound = "No Results Found";

export const sources = [
    {
        name: "All Data Sources",
        key: "all",
    },
    {
        name: "News API",
        key: "news-api",
    },
    {
        name: "The Guardian API",
        key: "guardian-api",
    },
    {
        name: "New York Times API",
        key: "ny-times",
    },
];

export const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
