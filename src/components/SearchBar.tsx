type SearchBarProps = {
    query: string
    onChange: (newQuery: string) => void
}

const SearchBar = ({ query, onChange }: SearchBarProps) => {
    return (
            <div className="header-search">
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <circle cx={11} cy={11} r={8}/>
                        <line x1={21} y1={21} x2={16.65} y2={16.65}/>
                    </svg>
                    <input
                        type="text" 
                        className="search-input"
                        placeholder="Search movies, plot keywords, titles..."
                        autoComplete="off"
                        onChange={(e) => onChange(e.target.value)}
                        value={query}
                    />
                </div>
            </div>
    )
}

export default SearchBar