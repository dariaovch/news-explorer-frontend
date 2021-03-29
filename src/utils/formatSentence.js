function formatSentence(news) {
    if (news.length === 0 || news.length >= 5) {
        return 'сохраненных статей';
    } else if (news.length === 1) {
        return 'сохраненная статья';
    } else if (news.length > 1 && news.length < 5) {
        return 'сохраненные статьи';
    }
}

export default formatSentence;