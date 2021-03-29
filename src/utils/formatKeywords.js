function formatKeywords (keywords) {
    if (keywords.length === 1) {
        return (
        <>
          По ключевoму слову: <span className="saved-news__keyword-span">{keywords[0]}</span>
          </>);
    } else if (keywords.length === 2) {
        return (
        <>
          По ключевым словам: <span className="saved-news__keyword-span">{keywords[0]}</span> и <span className="saved-news__keyword-span">{keywords[1]}</span>
        </>);
    } else if (keywords.length > 2) {
        return (
        <>
          По ключевым словам: <span className="saved-news__keyword-span">{keywords[0]}</span>, <span className="saved-news__keyword-span">{keywords[1]}</span> и <span className="saved-news__keyword-span">{keywords[2]}</span>
        </>
        );
    }
};

export default formatKeywords;