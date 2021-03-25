function formatDate(date) {
    const monthes = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const publishedAt = new Date(date);
    const formattedDate = `${publishedAt.getDate()} ${monthes[publishedAt.getMonth()]}, ${publishedAt.getFullYear()}`;

    return formattedDate;
}

export default formatDate;